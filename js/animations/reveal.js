import { SELECTORS } from '../config.js'
import { $$ } from '../utils/dom.js'
import { prefersReducedMotion } from '../utils/helpers.js'

export function initRevealAnimations() {
  const revealElements = $$(SELECTORS.reveal)
  const heroElements = $$(SELECTORS.heroReveal)

  if (prefersReducedMotion()) {
    ;[...revealElements, ...heroElements].forEach((el) => el.classList.add('is-visible'))
    document.body.classList.add('is-loaded')
    return
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        obs.unobserve(entry.target)
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  )

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 0.04, 0.24)}s`
    observer.observe(el)
  })

  requestAnimationFrame(() => {
    document.body.classList.add('is-loaded')
    heroElements.forEach((el, index) => {
      el.style.transitionDelay = `${0.08 + index * 0.1}s`
      el.classList.add('is-visible')
    })
  })
}
