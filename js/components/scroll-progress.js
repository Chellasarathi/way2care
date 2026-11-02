import { SELECTORS } from '../config.js'
import { $ } from '../utils/dom.js'
import { getScrollProgress } from '../utils/viewport.js'
import { prefersReducedMotion } from '../utils/helpers.js'

export function initScrollProgress() {
  if (prefersReducedMotion()) return

  const bar = $(SELECTORS.scrollProgressBar)
  if (!bar) return

  const update = () => {
    bar.style.width = `${getScrollProgress() * 100}%`
  }

  update()
  window.addEventListener('scroll', update, { passive: true })
}
