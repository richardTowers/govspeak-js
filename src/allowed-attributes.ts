// From Govspeak::HtmlSanitizer.new('').sanitize_config[:attributes].to_json
const allowedAttributes = {
  all: [
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
  div: ["data"],
  "govspeak-embed-attachment": ["content-id"],
}

export default <{[key: string]: string[]}>allowedAttributes