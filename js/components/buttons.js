import { $$ } from '../utils/dom.js'

export function initButtons() {
  const navLinks = $$('.site-nav__link, .mobile-menu__link')
  const sections = $$('main section[id]')

  if (!navLinks.length || !sections.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const id = entry.target.id
        navLinks.forEach((link) => {
          const href = link.getAttribute('href')
          link.classList.toggle('is-active', href === `#${id}`)
        })
      })
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 },
  )

  sections.forEach((section) => observer.observe(section))
}
