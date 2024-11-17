import {ok as assert} from 'devlop'
import {markdownLineEnding} from 'micromark-util-character'
import {codes} from 'micromark-util-symbol'
import { Code, Construct, Effects, Extension, State, TokenizeContext } from 'micromark-util-types'

declare module 'micromark-util-types' {
  interface TokenTypeMap {
    govspeakCta: 'govspeakCta'
    govspeakCtaMarker: 'govspeakCtaMarker'
  }
}

const govspeakCta: Construct = {
  continuation: {tokenize: tokenizeCtaContinuation},
  exit,
  name: 'govspeakCta',
  tokenize: tokenizeCtaStart
}

function tokenizeCtaStart(this: TokenizeContext, effects: Effects, ok: State, nok: State) {
  const self = this
  const pattern = [codes.uppercaseC, codes.uppercaseT, codes.uppercaseA]
  let pointer = 0

  return start

  /**
   * Start of CTA
   *
   * ```markdown
   * $CTA
   * ^
   * ```
   */
  function start(code: Code): State | undefined {
    if (code === codes.dollarSign) {
      const state = self.containerState

      assert(state, 'expected `containerState` to be defined in container')

      if (!state.open) {
        effects.enter('govspeakCta', {_container: true})
        state.open = true
      }

      effects.enter('govspeakCtaMarker')
      effects.consume(code)
      return sequenceOpen
    }

    return nok(code)
  }

  function sequenceOpen(code: Code): State | undefined {
    if (pointer === 3) {
      pointer = 0
      if (markdownLineEnding(code)) {
        effects.consume(code)
        return after
      }
      if (code === codes.eof) {
        return after(code)
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
   * After `$CTA`
   *
   * ```markdown
   * $CTA
   *     ^
   * ```
   */
  function after(code: Code): State | undefined {
    effects.exit('govspeakCtaMarker')
    return ok(code)
  }
}

/**
 * Start of CTA continuation.
 *
 * ```markdown
 *  $CTA
 *  content
 *  ^
 * ```
 *
 */
function tokenizeCtaContinuation(this: TokenizeContext, effects: Effects, ok: State, nok: State) {
  // TODO - this is overly simplistic
  return effects.attempt(govspeakCta, ok, nok)
}

function exit(effects: Effects): undefined {
  effects.exit('govspeakCta')
}

export const extension: Extension = {
  document: {
    [codes.dollarSign]: govspeakCta
  }
}