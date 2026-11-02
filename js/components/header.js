import { SELECTORS } from '../config.js'

export function initHeader() {
  const header = document.querySelector(SELECTORS.header)
  if (!header) return

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8)
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}
