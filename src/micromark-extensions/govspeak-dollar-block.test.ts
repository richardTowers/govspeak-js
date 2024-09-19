import { expect, test } from 'vitest'
import { govspeakDollarBlock } from './govspeak-dollar-block.js'
import {preprocess, parse, postprocess} from 'micromark'

test('returns an extension', async () => {
  const extension = govspeakDollarBlock()
  expect(extension).toBeInstanceOf(Object)
  expect(Object.keys(extension)).toEqual(["flow"])
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
      ["enter", "govspeakCallToAction"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
        ["enter", "govspeakDollarBlockContent"],
          ["enter", "lineEnding"],
          ["exit", "lineEnding"],
          ["enter", "chunkFlow"],
          ["exit", "chunkFlow"],
          ["enter", "lineEnding"],
          ["exit", "lineEnding"],
        ["exit", "govspeakDollarBlockContent"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
      ["exit", "govspeakCallToAction"],
    ]
  )
})