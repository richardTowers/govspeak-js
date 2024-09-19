import type {Extension, TokenizeContext, Effects, State, Code, Tokenizer, TokenTypeMap, Construct} from 'micromark-util-types'
import {codes, types} from 'micromark-util-symbol'
import {ok as assert} from 'devlop'
import { markdownLineEnding, } from 'micromark-util-character'

declare module 'micromark-util-types' {
  interface TokenTypeMap {
    // Generic types for the boilerplate around the outside
    govspeakDollarBlockOpening: 'govspeakDollarBlockOpening',
    govspeakDollarBlockClosing: 'govspeakDollarBlockClosing',
    // Specific token types for the specific things
    govspeakExampleCallout: 'govspeakExampleCallout',
    govspeakContactBlock: 'govspeakContactBlock',
    govspeakAddress: 'govspeakAddress',
    govspeakDownloads: 'govspeakDownloads',
    govspeakPlace: 'govspeakPlace',
    govspeakInformation: 'govspeakInformation',
    govspeakAdditionalInformation: 'govspeakAdditionalInformation',
    govspeakCallToAction: 'govspeakCallToAction',
  }
}

export function govspeakDollarBlock(): Extension {
  type BlockType = { token: keyof TokenTypeMap, pattern: number[] }
  const blockTypes: BlockType[] = [
    { token: 'govspeakExampleCallout', pattern: [codes.uppercaseE] },
    { token: 'govspeakContactBlock', pattern: [codes.uppercaseC] },
    { token: 'govspeakAddress', pattern: [codes.uppercaseA] },
    { token: 'govspeakDownloads', pattern: [codes.uppercaseD] },
    { token: 'govspeakPlace', pattern: [codes.uppercaseP]},
    { token: 'govspeakInformation', pattern: [codes.uppercaseI]},
    { token: 'govspeakAdditionalInformation', pattern: [codes.uppercaseA, codes.uppercaseI]},
    { token: 'govspeakCallToAction', pattern: [codes.uppercaseC, codes.uppercaseT, codes.uppercaseA]},
  ]

  return {
    // govspeak blocks are more like 
    document: {
      [codes.dollarSign]: blockTypes.map(blockType => { return {
        concrete: true,
        name: blockType.token,
        tokenize: govspeakDollarBlockTokenizeFactory(blockType.token, blockType.pattern),
        // TODO: the fact that we need an exit call here probably means we've got a bug somewhere
        exit: () => { console.log('exit called') }
      }})
    }
  }

  // Heavily based on code fences
  function govspeakDollarBlockTokenizeFactory(token: keyof TokenTypeMap, pattern: Code[]): Tokenizer {
    return tokenizeGovspeakDollarBlock

    function tokenizeGovspeakDollarBlock(this: TokenizeContext, effects: Effects, ok: State, nok: State): State {
      const closeStart: Construct = {partial: true, tokenize: tokenizeCloseStart}
      let pointer = 0

      return start

      /**
       * Start of dollar block.
       *
       * ```markdown
       * > | $CTA
       *     ^
       *   | Call to Action!
       *   | $CTA
       * ```
       */
      function start(code: Code): State | undefined {
        assert(code === codes.dollarSign, 'expected `$`')
        effects.enter('govspeakDollarBlockOpening')
        effects.consume(code)
        return sequenceOpen
      }

      /**
       * In opening pattern.
       *
       * ```markdown
       * > | $CTA
       *      ^
       *   | Call to Action!
       *   | $CTA
       * ```
       */
      function sequenceOpen(code: Code): State | undefined {
        if (pointer === pattern.length) {
          pointer = 0
          if (markdownLineEnding(code)) {
            effects.exit('govspeakDollarBlockOpening')
            // TODO - we're going to consume the first newline inside the token. Is that what we want?
            effects.enter(token)
            return atLineEnding(code)
          }
          return nok(code)
        }

        if (code === pattern[pointer]) {
          pointer++
          effects.consume(code)
          return sequenceOpen
        }

        return nok(code)
      }

      /**
       * At eol in block, before some content or the block close
       *
       * ```markdown
       * > | $CTA
       *         ^
       *   | Call to Action!
       *                    ^
       *   | $CTA
       * ```
       */
      function atLineEnding(code: Code): State | undefined {
        assert(markdownLineEnding(code), 'expected eol')
        return effects.attempt(closeStart, ok, contentBefore)(code)
      }

      /**
       * Before some content, not a block close, at eol.
       *
       * ```markdown
       * > | $CTA
       *         ^
       *   | Call to Action!
       *   | $CTA
       * ```
       */
      function contentBefore(code: Code): State | undefined {
        assert(markdownLineEnding(code), 'expected eol')
        effects.enter(types.lineEnding)
        effects.consume(code)
        effects.exit(types.lineEnding)
        return contentStart
      }

      /**
       * Before some content, not a block close.
       *
       * ```markdown
       * > | $CTA
       *   | Call to Action!
       *     ^
       *   | $CTA
       * ```
       */
      function contentStart(code: Code): State | undefined {
        effects.enter(types.chunkFlow)
        return contentChunk(code)
      }

      /**
       * In content.
       *
       * ```markdown
       * > | $CTA
       *   | Call to Action!
       *     ^^^^^^^^^^^^^^^
       *   | $CTA
       * ```
       */
      function contentChunk(code: Code): State | undefined {
        if (code === codes.eof || markdownLineEnding(code)) {
          effects.exit(types.chunkFlow)
          return atLineEnding(code)
        }

        effects.consume(code)
        return contentChunk
      }

      function tokenizeCloseStart(this: TokenizeContext, effects: Effects, ok: State, nok: State): State {
        let pointer = 0

        return startBefore

        /**
         * Line ending before the start of the block close
         * ```markdown
         * > | Call to Action!
         *                    ^
         *   | $CTA
         * ```
         */
        function startBefore(code: Code): State | undefined {
          assert(markdownLineEnding(code), 'expected eol')
          effects.enter(types.lineEnding)
          effects.consume(code)
          effects.exit(types.lineEnding)
          return start
        }

        /**
         * Start of the block close
         *
         * ```markdown
         *   | Call to Action!
         * > | $CTA
         *     ^
         * ```
         */
        function start(code: Code): State | undefined {
          if (code === codes.dollarSign) {
            effects.exit(token)
            effects.enter('govspeakDollarBlockClosing')
            effects.consume(code)
            return sequenceClose
          }

          return nok(code)
        }

        /**
         * In closing pattern
         *
         * ```markdown
         *   | Call to Action!
         * > | $CTA
         *      ^
         * ```
         */
        function sequenceClose(code: Code): State | undefined {
          if (pointer === pattern.length) {
            if (code === codes.eof || markdownLineEnding(code)) {
              effects.exit('govspeakDollarBlockClosing')
              return ok(code)
            }
            return nok(code)
          }

          if (code === pattern[pointer]) {
            pointer++
            effects.consume(code)
            return sequenceClose
          }

          return nok(code)
        }
      }
    }
  }
}