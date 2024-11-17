import { expect, test } from 'vitest'
import { extension } from './govspeak-dollar-block.js'
import {preprocess, parse, postprocess} from 'micromark'

test('returns an extension', async () => {
  expect(extension).toBeInstanceOf(Object)
  expect(Object.keys(extension)).toEqual(["document"])
})

test('parses calls to action', async () => {
  const input = '$CTA\n*some rich content*\n$CTA\nsome text'
  const events = postprocess(
    parse({extensions: [extension]})
      .document()
      .write(preprocess()(input, null, true)),
  )
  const eventTypes = events.map((event) => [event[0], event[1].type])
  expect(eventTypes).toEqual(
    // prettier-ignore
    [
      ["enter", "govspeakCta"],
        ["enter", "govspeakCtaMarker"], ["exit", "govspeakCtaMarker"],
        ["enter", "content"],
          ["enter", "paragraph"],
            ["enter", "emphasis"],
              ["enter", "emphasisSequence"], ["exit", "emphasisSequence"],
              ["enter", "emphasisText"],
                ["enter", "data"], ["exit", "data"],
              ["exit", "emphasisText"],
              ["enter", "emphasisSequence"], ["exit", "emphasisSequence"],
            ["exit", "emphasis"],
          ["enter", "lineEnding"], ["exit", "lineEnding"],
          // TODO - this feels a bit spliced... The CTA marker should be outside the paragraph / content
          ["enter", "govspeakCtaMarker"], ["exit", "govspeakCtaMarker"],
          ["enter", "data"], ["exit", "data"],
          ["exit", "paragraph"],
        ["exit", "content"],
      ["exit", "govspeakCta"],
    ]
  )
})
