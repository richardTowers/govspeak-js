import { expect, test } from 'vitest'
import { render } from './govspeak'

test('renders a simple paragraph', () => {
  expect(render('a simple paragraph')).toEqual('<p>a simple paragraph</p>\n')
})

test('renders a heading', () => {
  expect(render('## a heading')).toEqual('<h2 id="a-heading">a heading</h2>\n') // TODO - remove heading ids
})