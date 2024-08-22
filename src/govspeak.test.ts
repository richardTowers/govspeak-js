import { expect, test } from 'vitest'
import { render } from './govspeak'

test('renders a simple paragraph', async () => {
  expect(await render('a simple paragraph')).toEqual('<p>a simple paragraph</p>\n')
})

test('renders a heading', async () => {
  expect(await render('## a heading')).toEqual('<h2>a heading</h2>\n')
})