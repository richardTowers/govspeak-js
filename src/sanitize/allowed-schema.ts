import { defaultSchema, type Options } from 'rehype-sanitize'
import { govspeakDollarBlockNodes } from '../mdast-extensions/govspeak-dollar-block'

// From Govspeak::HtmlSanitizer.new('').sanitize_config[:elements]
const allowedTags = `b em i strong u a abbr blockquote br cite code dd dfn dl dt kbd li mark ol p pre
q s samp small strike sub sup time ul var address article aside bdi bdo body
caption col colgroup data del div figcaption figure footer h1 h2 h3 h4 h5 h6
head header hgroup hr html img ins main nav rp rt ruby section span summary
table tbody td tfoot th thead title tr wbr govspeak-embed-attachment
govspeak-embed-attachment-link svg path`.split(' ')

// From Govspeak::HtmlSanitizer.new('').sanitize_config[:attributes].to_json
const allowedAttributes: typeof defaultSchema.attributes = {
  '*': [
    "class", "dir", "hidden", "id", "lang", "tabindex", "title", "translate",
    "role", "aria-label",
  ],
  a: ["href", "hreflang", "name", "rel", "data", "draggable"],
  abbr: ["title"],
  blockquote: ["cite"],
  dfn: ["title"],
  q: ["cite"],
  time: ["datetime", "pubdate"],
  col: ["span", "width"],
  colgroup: ["span", "width"],
  data: ["value"],
  del: ["cite", "datetime"],
  img: ["align", "alt", "border", "height", "src", "srcset", "width"],
  ins: ["cite", "datetime"],
  li: ["value"],
  ol: ["reversed", "start", "type"],
  style: ["media", "scoped", "type"],
  table: [
    "align", "bgcolor", "border", "cellpadding", "cellspacing", "frame",
    "rules", "sortable", "summary", "width",
  ],
  td: [
    "abbr", "align", "axis", "colspan", "headers", "rowspan", "valign", "width",
    "style",
  ],
  th: [
    "abbr", "align", "axis", "colspan", "headers", "rowspan", "scope", "sorted",
    "valign", "width", "style",
  ],
  ul: ["type"],
  svg: ["xmlns", "width", "height", "viewbox", "focusable"],
  path: ["fill", "d"],
  div: ["data", ["className", ...govspeakDollarBlockNodes.map(node => node.className)]],
  "govspeak-embed-attachment": ["content-id"],
}

const schema = <Options>{
  ...defaultSchema,
  attributes: allowedAttributes,
  tagNames: allowedTags,
  strip: [...defaultSchema.strip!, 'style']
}

export default schema