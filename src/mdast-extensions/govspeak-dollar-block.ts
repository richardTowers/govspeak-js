import type {CompileContext, Extension as FromMarkdownExtension, Token} from 'mdast-util-from-markdown'
import { Parent } from 'mdast'

interface GovspeakCallToAction extends Parent {
  type: 'govspeakCallToAction'
}
interface GovspeakPlace extends Parent {
  type: 'govspeakPlace'
}

interface GovspeakDollarBlockContent extends Parent {
  type: 'govspeakDollarBlockContent'
}

declare module 'mdast' {
  interface RootContentMap {
    govspeakCallToAction: GovspeakCallToAction,
    govspeakPlace: GovspeakPlace,
    govspeakDollarBlockContent: GovspeakDollarBlockContent
  }
}

export function govspeakDollarBlockFromMarkdown(): FromMarkdownExtension {
  return {
    enter: {
      govspeakCallToAction: enterGovspeakCallToAction,
      govspeakPlace: enterGovspeakPlace,
      govspeakDollarBlockContent: enterGovspeakDollarBlockContent,
    },
    exit: {
      govspeakCallToAction: exit,
      govspeakPlace: exit,
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

  function enterGovspeakPlace(this: CompileContext, token: Token) {
    this.enter(
      {
        type: 'govspeakCallToAction',
        children: [],
        data: {
          hName: 'div',
          hProperties: {
            className: ['place']
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