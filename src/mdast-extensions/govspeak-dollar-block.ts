import type {CompileContext, Extension as FromMarkdownExtension, Token} from 'mdast-util-from-markdown'
import { Parent } from 'mdast'

interface GovspeakCallToAction extends Parent {
  type: 'govspeakCallToAction'
}

interface GovspeakDollarBlockContent extends Parent {
  type: 'govspeakDollarBlockContent'
}

declare module 'mdast' {
  interface RootContentMap {
    govspeakCallToAction: GovspeakCallToAction,
    govspeakDollarBlockContent: GovspeakDollarBlockContent
  }
}

export function govspeakDollarBlockFromMarkdown(): FromMarkdownExtension {
  return {
    enter: {
      govspeakCallToAction: enterGovspeakCallToAction,
      govspeakDollarBlockContent: enterGovspeakDollarBlockContent,
    },
    exit: {
      govspeakCallToAction: exit,
      govspeakDollarBlockContent: exit,
    }
  }

  function enterGovspeakDollarBlockContent(this: CompileContext, token: Token) {
    this.enter({
      type: 'govspeakDollarBlockContent',
      // TODO - make this a literal?
      children: [],
      data: {
        hName: 'p'
      }
    }, token)
  }

  function enterGovspeakCallToAction(this: CompileContext, token: Token) {
    this.enter(
      {
        type: 'govspeakCallToAction',
        children: [],
        data: {
          hName: 'div',
          hProperties: {
            className: ['call-to-action']
          }
        }
      },
      token
    )
  }

  function exit(this: CompileContext, token: Token) {
    this.exit(token)
  }
}