import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype, {Options as RehypeOptions} from 'remark-rehype'
import remarkAbbr from '@richardtowers/remark-abbr'
import {unified} from 'unified'
import schema from './sanitize/allowed-schema'

export async function render(input: string) {
  const html = await unified()
    .use(remarkParse)
    .use(remarkAbbr)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: {
        abbrDefinition: () => undefined,
      }
    } as RehypeOptions)
    .use(rehypeRaw)
    .use(rehypeSanitize, schema)
    .use(rehypeStringify).process(input)

  return String(html)
}
