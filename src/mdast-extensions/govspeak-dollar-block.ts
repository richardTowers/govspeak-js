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

export const govspeakDollarBlockNodes = [
  { type: 'govspeakAdditionalInformation', className: 'additional-information' },
  { type: 'govspeakAddress', className: 'address' },
  { type: 'govspeakCallToAction', className: 'call-to-action' },
  { type: 'govspeakContactBlock', className: 'contact' },
  { type: 'govspeakDownloads', className: 'form-download' },
  { type: 'govspeakExampleCallout', className: 'example' },
  { type: 'govspeakInformation', className: 'information' },
  { type: 'govspeakPlace', className: 'place' },
] as const
type GovspeakDollarBlockNode = typeof govspeakDollarBlockNodes[number]

export function govspeakDollarBlockFromMarkdown(): FromMarkdownExtension {
  return {
    enter: {
      ...Object.fromEntries(govspeakDollarBlockNodes.map(node => [node.type, createEnterGovspeakDollarBlock(node)])),
      govspeakDollarBlockContent: enterGovspeakDollarBlockContent,
    },
    exit: {
      ...Object.fromEntries(govspeakDollarBlockNodes.map(node => [node.type, exit])),
      govspeakDollarBlockContent: exit,
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