import { marked } from 'marked'

export async function render(input: string) {
  return await marked(input)
}
