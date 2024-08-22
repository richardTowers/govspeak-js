import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import allowedTags from './allowed-tags'
import allowedAttributes from './allowed-attributes'

const purify = DOMPurify(new JSDOM('').window)

export async function render(input: string) {
  const dirtyHtml = await marked(input, { async: true })

  // TODO: allow these allow lists to be customized, as govspeak ruby does
  purify.addHook('uponSanitizeAttribute', (currentNode, data) => {
    const attributesAllowedOnThisElement = allowedAttributes[currentNode.tagName.toLowerCase()] || []
    const attrs = [...allowedAttributes.all, ...attributesAllowedOnThisElement]
    data.keepAttr = attrs.includes(data.attrName)
  })

  const cleanHtml = purify.sanitize(dirtyHtml, { ALLOWED_TAGS: allowedTags })

  return cleanHtml
}
