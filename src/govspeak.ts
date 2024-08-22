import { marked } from 'marked'

export async function render(input: string) {
  const dirtyHtml = await marked(input, { async: true })

  // The ruby version of govspeak also sanitizes HTML after running kramdown - https://github.com/alphagov/govspeak/blob/main/lib/govspeak/html_sanitizer.rb
  const cleanHtml = dirtyHtml.replace(/<(\/?script)/g, '&lt;$1').replace(/(script)>/g, '$1&gt;') // TODO!!! - santize this properly!!!

  return cleanHtml
}
