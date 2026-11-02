import { SELECTORS } from '../config.js'
import { $ } from '../utils/dom.js'

export function initMobileMenu() {
  const header = $(SELECTORS.header)
  const toggle = $(SELECTORS.menuToggle)
  const menu = $(SELECTORS.mobileMenu)
  if (!header || !toggle || !menu) return

  const links = menu.querySelectorAll('a')

  const setOpen = (open) => {
    header.classList.toggle('is-menu-open', open)
    menu.classList.toggle('is-open', open)
    menu.hidden = !open
    menu.setAttribute('aria-hidden', String(!open))
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    document.body.classList.toggle('is-menu-open', open)
  }

  toggle.addEventListener('click', () => {
    setOpen(!header.classList.contains('is-menu-open'))
  })

  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false))
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-menu-open')) {
      setOpen(false)
      toggle.focus()
    }
  })

  document.addEventListener('click', (event) => {
    if (!header.classList.contains('is-menu-open')) return
    const target = event.target
    if (!(target instanceof Element)) return
    if (header.contains(target)) return
    setOpen(false)
  })
}
