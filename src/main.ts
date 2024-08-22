import './style.css'
import { render } from './govspeak.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Govspeak</h2>
    <textarea id="input" rows=20 cols=100></textarea>
    <h2>HTML</h2>
    <div id="output"></div>
  </div>
`

function go() {
  const result = render(document.querySelector<HTMLTextAreaElement>('#input')!.value)
  document.querySelector<HTMLDivElement>('#output')!.innerText = result
}
document.addEventListener('keyup', go)
go
