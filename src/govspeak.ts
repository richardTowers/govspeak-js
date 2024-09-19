import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkAbbr from '@richardtowers/remark-abbr'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import schema from './sanitize/allowed-schema'
import remarkGovspeak from './remark-govspeak'


export async function render(input: string) {
  const html = await unified()
    .use(remarkParse)
    .use(remarkAbbr)
    .use(remarkGovspeak)
    .use(remarkRehype, {
        handlers: {
          abbrDefinition() {
            return undefined
          }
        }
      })
    .use(rehypeRaw)
    .use(rehypeSanitize, schema)
    .use(rehypeStringify).process(input)

  return String(html)
}
