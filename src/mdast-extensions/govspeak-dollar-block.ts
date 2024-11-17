import type {CompileContext, Extension as FromMarkdownExtension, Token} from 'mdast-util-from-markdown'
import { Parent } from 'mdast'

interface GovspeakCta extends Parent { type: 'govspeakCta' }

declare module 'mdast' {
  interface RootContentMap {
    govspeakCta: GovspeakCta,
  }
}

export const govspeakDollarBlockNodes = [
  { type: 'govspeakCta', className: 'call-to-action' },
] as const
type GovspeakDollarBlockNode = typeof govspeakDollarBlockNodes[number]

export function govspeakDollarBlockFromMarkdown(): FromMarkdownExtension {
  return {
    enter: {
      ...Object.fromEntries(govspeakDollarBlockNodes.map(node => [node.type, createEnterGovspeakDollarBlock(node)])),
      // govspeakDollarBlockContent: enterGovspeakDollarBlockContent,
    },
    exit: {
      ...Object.fromEntries(govspeakDollarBlockNodes.map(node => [node.type, exit])),
      // govspeakDollarBlockContent: exit,
    }
  }

  function createEnterGovspeakDollarBlock(node: GovspeakDollarBlockNode) {
    return function enterGovspeakDollarBlock(this: CompileContext, token: Token) {
      this.enter(
        {
          type: node.type,
          children: [],
          data: {
            hName: 'div',
            hProperties: { className: node.className }
          }
        },
        token
      )
    }
  }

  // function enterGovspeakDollarBlockContent(this: CompileContext, token: Token) {
  //   this.enter({
  //     type: 'govspeakDollarBlockContent',
  //     // TODO - make this a literal?
  //     children: [],
  //     data: {
  //       hName: 'p'
  //     }
  //   }, token)
  // }

  function exit(this: CompileContext, token: Token) {
    this.exit(token)
  }
}