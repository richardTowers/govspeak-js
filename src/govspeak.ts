import { default as k, KramedStatic } from 'kramed'

const kramed = k as unknown as KramedStatic // Use TypeScript, they said. It'll be fun, they said.

export function render(input: string) {
  return kramed(input)
}
