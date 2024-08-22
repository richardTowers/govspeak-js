import { expect, test } from 'vitest'
import { render } from './govspeak'

test('renders a simple paragraph', async () => {
  expect(await render('a simple paragraph')).toEqual('<p>a simple paragraph</p>\n')
})

test('renders a heading', async () => {
  expect(await render('## a heading')).toEqual('<h2>a heading</h2>\n')
})

test('does not allow JS injection', async () => {
  // Technically, markdown allows all HTML, including script tags and JS attributes - https://spec.commonmark.org/0.28/#example-138
  // Govspeak on the other hand, post-processes the dirty HTML to restrict the elements allowed - https://github.com/alphagov/govspeak/blob/main/lib/govspeak/html_sanitizer.rb

  expect(await render('<script>alert("lol pwned")</script>')).toEqual('')
  expect(await render('## Heading with injection <script>alert("lol pwned")</script>')).toEqual('<h2>Heading with injection </h2>\n')
  expect(await render('Paragraph with injection <script>alert("lol pwned")</script>')).toEqual('<p>Paragraph with injection </p>\n')
  expect(await render('<img src="example.com/404" onerror="javascript:alert()">')).toEqual('<img src="example.com/404">')
})

test('does not allow CSS injection', async () => {
  // Technically, markdown allows all HTML, including script tags and JS attributes - https://spec.commonmark.org/0.28/#example-138
  // Govspeak on the other hand, post-processes the dirty HTML to restrict the elements allowed - https://github.com/alphagov/govspeak/blob/main/lib/govspeak/html_sanitizer.rb

  expect(await render('<style>body { color: white; }</style>')).toEqual('')
  expect(await render('## Heading with injection <style>body { color: white; }</style>')).toEqual('<h2>Heading with injection </h2>\n') // !!
  expect(await render('Paragraph with injection <style>body { color: white; }</style>')).toEqual('<p>Paragraph with injection </p>\n')
  expect(await render('<img src="example.com/404" style="width: 100%">')).toEqual('<img src="example.com/404">')
})
