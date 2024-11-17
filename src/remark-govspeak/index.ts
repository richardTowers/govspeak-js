import type { Processor } from "unified"
import { extension } from '../micromark-extensions/govspeak-dollar-block.js'
import { govspeakDollarBlockFromMarkdown } from '../mdast-extensions/govspeak-dollar-block.js'

export default function remarkGovspeak(this: Processor) {
  const self = this
  const data = self.data()

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])

  micromarkExtensions.push(extension)
  fromMarkdownExtensions.push(govspeakDollarBlockFromMarkdown())
}
