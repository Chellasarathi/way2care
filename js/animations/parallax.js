import { SELECTORS } from '../config.js'
import { $$ } from '../utils/dom.js'
import { clamp, prefersReducedMotion } from '../utils/helpers.js'

export function initParallax() {
  if (prefersReducedMotion()) return

  const items = $$(SELECTORS.parallax)
  if (!items.length) return

  let ticking = false

  const update = () => {
    const viewportCenter = window.innerHeight / 2
    items.forEach((el) => {
      const strength = Number(el.getAttribute('data-parallax')) || 0.05
      const rect = el.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const distance = (elementCenter - viewportCenter) / viewportCenter
      const offset = clamp(distance * strength * -120, -10, 10)
      el.style.transform = `translate3d(0, ${offset}px, 0)`
    })
    ticking = false
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
}
