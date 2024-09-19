import type {CompileContext, Extension as FromMarkdownExtension, Token} from 'mdast-util-from-markdown'
import { Parent } from 'mdast'

interface GovspeakAdditionalInformation extends Parent { type: 'govspeakAdditionalInformation' }
interface GovspeakAddress extends Parent { type: 'govspeakAddress' }
interface GovspeakCallToAction extends Parent { type: 'govspeakCallToAction' }
interface GovspeakContactBlock extends Parent { type: 'govspeakContactBlock' }
interface GovspeakDownloads extends Parent { type: 'govspeakDownloads' }
interface GovspeakExampleCallout extends Parent { type: 'govspeakExampleCallout' }
interface GovspeakInformation extends Parent { type: 'govspeakInformation' }
interface GovspeakPlace extends Parent { type: 'govspeakPlace' }

interface GovspeakDollarBlockContent extends Parent { type: 'govspeakDollarBlockContent' }

declare module 'mdast' {
  interface RootContentMap {
    govspeakAdditionalInformation: GovspeakAdditionalInformation,
    govspeakAddress: GovspeakAddress,
    govspeakCallToAction: GovspeakCallToAction,
    govspeakContactBlock: GovspeakContactBlock,
    govspeakDollarBlockContent: GovspeakDollarBlockContent
    govspeakDownloads: GovspeakDownloads,
    govspeakExampleCallout: GovspeakExampleCallout,
    govspeakInformation: GovspeakInformation,
    govspeakPlace: GovspeakPlace,
  }
}

type GovspeakNodeTypes =
  'govspeakAdditionalInformation' |
  'govspeakAddress' |
  'govspeakCallToAction' |
  'govspeakContactBlock' |
  'govspeakDownloads' |
  'govspeakExampleCallout' |
  'govspeakInformation' |
  'govspeakPlace'

export function govspeakDollarBlockFromMarkdown(): FromMarkdownExtension {
  return {
    enter: {
      govspeakCallToAction: createEnterGovspeakDollarBlock('govspeakCallToAction', 'call-to-action'),
      govspeakPlace: createEnterGovspeakDollarBlock('govspeakPlace', 'place'),
      govspeakAdditionalInformation: createEnterGovspeakDollarBlock('govspeakAdditionalInformation', 'additional-information'),
      govspeakAddress: createEnterGovspeakDollarBlock('govspeakAddress', 'address'),
      govspeakContactBlock: createEnterGovspeakDollarBlock('govspeakContactBlock', 'contact'),
      govspeakDownloads: createEnterGovspeakDollarBlock('govspeakDownloads', 'form-download'),
      govspeakExampleCallout: createEnterGovspeakDollarBlock('govspeakExampleCallout', 'example'),
      govspeakInformation: createEnterGovspeakDollarBlock('govspeakInformation', 'information'),
      govspeakDollarBlockContent: enterGovspeakDollarBlockContent,
    },
    exit: {
      govspeakCallToAction: exit,
      govspeakPlace: exit,
      govspeakAdditionalInformation: exit,
      govspeakAddress: exit,
      govspeakContactBlock: exit,
      govspeakDownloads: exit,
      govspeakExampleCallout: exit,
      govspeakInformation: exit,
      govspeakDollarBlockContent: exit,
    }
  }

  function createEnterGovspeakDollarBlock(type: GovspeakNodeTypes, className: string) {
    return function enterGovspeakDollarBlock(this: CompileContext, token: Token) {
      this.enter(
        {
          type: type,
          children: [],
          data: {
            hName: 'div',
            hProperties: { className }
          }
        },
        token
      )
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

  function exit(this: CompileContext, token: Token) {
    this.exit(token)
  }
}