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
          ["enter", "data"],
          ["exit", "data"],
          ["enter", "lineEnding"],
          ["exit", "lineEnding"],
        ["exit", "govspeakDollarBlockContent"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
      ["exit", "govspeakCallToAction"],
    ]
  )
})

test('parses places', async () => {
  const input = '$P\nCheck out this cool place!\n$P'
  const events = postprocess(
    parse({extensions: [govspeakDollarBlock()]})
      .document()
      .write(preprocess()(input, null, true)),
  )
  const eventTypes = events.map((event) => [event[0], event[1].type])
  expect(eventTypes).toEqual(
    // prettier-ignore
    [
      ["enter", "govspeakPlace"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
        ["enter", "govspeakDollarBlockContent"],
          ["enter", "lineEnding"],
          ["exit", "lineEnding"],
          ["enter", "data"],
          ["exit", "data"],
          ["enter", "lineEnding"],
          ["exit", "lineEnding"],
        ["exit", "govspeakDollarBlockContent"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
      ["exit", "govspeakPlace"],
    ]
  )
})

test('parses empty lines', async () => {
  const input = '$P\n\n$P'
  const events = postprocess(
    parse({extensions: [govspeakDollarBlock()]})
      .document()
      .write(preprocess()(input, null, true)),
  )
  const eventTypes = events.map((event) => [event[0], event[1].type])
  expect(eventTypes).toEqual(
    // prettier-ignore
    [
      ["enter", "govspeakPlace"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
        ["enter", "govspeakDollarBlockContent"],
          ["enter", "lineEnding"],
          ["exit", "lineEnding"],
          ["enter", "lineEnding"],
          ["exit", "lineEnding"],
        ["exit", "govspeakDollarBlockContent"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
      ["exit", "govspeakPlace"],
    ]
  )
})

test('parses empty places', async () => {
  const input = '$P\n$P'
  const events = postprocess(
    parse({extensions: [govspeakDollarBlock()]})
      .document()
      .write(preprocess()(input, null, true)),
  )
  const eventTypes = events.map((event) => [event[0], event[1].type])
  expect(eventTypes).toEqual(
    // prettier-ignore
    [
      ["enter", "govspeakPlace"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
        ["enter", "lineEnding"],
        ["exit", "lineEnding"],
        ["enter", "govspeakDollarBlockMarker"],
        ["exit", "govspeakDollarBlockMarker"],
      ["exit", "govspeakPlace"],
    ]
  )
})

