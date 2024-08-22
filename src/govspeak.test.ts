import { expect, test } from 'vitest'
import { render } from './govspeak'

test('renders a simple paragraph', async () => {
  expect(await render('a simple paragraph')).toEqual('<p>a simple paragraph</p>\n')
})

test('renders a heading', async () => {
  expect(await render('## a heading')).toEqual('<h2>a heading</h2>\n')
})

test('does not allow injections', async () => {
  // Technically, this is valid markdown, according to the spec - https://spec.commonmark.org/0.28/#example-138

  expect(await render('<script>alert("lol pwned")</script>')).toEqual('&lt;script&gt;alert("lol pwned")&lt;/script&gt;')
})