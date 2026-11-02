import { $$ } from '../utils/dom.js'
import { prefersReducedMotion } from '../utils/helpers.js'

export function initMagnetic() {
  if (prefersReducedMotion()) return

  const buttons = $$('.btn--primary')
  buttons.forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      button.style.transform = `translate(${x * 0.04}px, ${y * 0.04}px) scale(1.02)`
    })

    button.addEventListener('pointerleave', () => {
      button.style.transform = ''
    })
  })
}
