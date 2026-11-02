import { $$ } from '../utils/dom.js'
import { prefersReducedMotion } from '../utils/helpers.js'

export function initHoverEffects() {
  if (prefersReducedMotion()) return

  $$('[data-hover-card] .category-card__arrow').forEach((arrow) => {
    arrow.closest('[data-hover-card]')?.addEventListener('focusin', () => {
      arrow.style.transform = 'translateX(4px)'
    })
    arrow.closest('[data-hover-card]')?.addEventListener('focusout', () => {
      arrow.style.transform = ''
    })
  })
}
