import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {plugin as remarkAbbr} from 'remark-abbr'
import {unified} from 'unified'
import schema from './sanitize/allowed-schema'

export async function render(input: string) {
  const html = await unified()
    .use(remarkParse)
    .use(remarkAbbr, { expandFirst: true }) // TODO - this doesn't work, and isn't typed correctly
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, schema)
    .use(rehypeStringify).process(input)

  return String(html)
}
