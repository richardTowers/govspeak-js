import { expect, test } from 'vitest'
import { govspeakDollarBlock } from './govspeak-dollar-block.js'
import {preprocess, parse, postprocess} from 'micromark'

test('returns an extension', async () => {
  const extension = govspeakDollarBlock()
  expect(extension).toBeInstanceOf(Object)
  expect(Object.keys(extension)).toEqual(["document"])
})

test('parses calls to action', async () => {
  const input = '$CTA\nTake Some Action!\n$CTA'
  const events = postprocess(
    parse({extensions: [govspeakDollarBlock()]})
      .document()
      .write(preprocess()(input, null, true)),
  )
  const eventTypes = events.map((event) => [event[0], event[1].type])
  expect(eventTypes).toEqual(
    // prettier-ignore
    [
      ["enter", "govspeakDollarBlockOpening"],
      ["exit", "govspeakDollarBlockOpening"],
      ["enter", "govspeakCallToAction"],
        ["enter", "lineEnding"],
        ["exit", "lineEnding"],
        ["enter", "chunkFlow"],
        ["exit", "chunkFlow"],
        ["enter", "lineEnding"],
        ["exit", "lineEnding"],
      ["exit", "govspeakCallToAction"],
      ["enter", "govspeakDollarBlockClosing"],
      ["exit", "govspeakDollarBlockClosing"],
    ]
  )
})