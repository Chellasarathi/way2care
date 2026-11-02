import { SELECTORS } from '../config.js'
import { $, $$ } from '../utils/dom.js'
import { isMobileCarousel } from '../utils/viewport.js'

export function initCarousel() {
  const root = $(SELECTORS.carousel)
  const track = $(SELECTORS.carouselTrack, root ?? document)
  const prev = $(SELECTORS.carouselPrev)
  const next = $(SELECTORS.carouselNext)
  if (!root || !track || !prev || !next) return

  const cards = $$('.category-card', track)
  let dragStartX = 0
  let dragging = false

  const getScrollContainer = () => (isMobileCarousel() ? root : root)

  const scrollByCard = (direction) => {
    const container = getScrollContainer()
    const card = cards[0]
    const gap = isMobileCarousel() ? 16 : 0
    const amount = card ? card.getBoundingClientRect().width + gap : 320

    if (isMobileCarousel()) {
      container.scrollBy({
        left: direction === 'next' ? amount : -amount,
        behavior: 'smooth',
      })
      return
    }

    const index = cards.findIndex((cardEl) => {
      const rect = cardEl.getBoundingClientRect()
      return rect.left >= 0 && rect.left < window.innerWidth * 0.5
    })

    const target = cards[Math.min(Math.max((index === -1 ? 0 : index) + (direction === 'next' ? 1 : -1), 0), cards.length - 1)]
    target?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
  }

  prev.addEventListener('click', () => scrollByCard('prev'))
  next.addEventListener('click', () => scrollByCard('next'))

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCard('next')
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCard('prev')
    }
  })

  root.addEventListener('pointerdown', (event) => {
    if (!isMobileCarousel()) return
    dragging = true
    dragStartX = event.clientX
    root.setPointerCapture(event.pointerId)
  })

  root.addEventListener('pointermove', (event) => {
    if (!dragging || !isMobileCarousel()) return
    const delta = dragStartX - event.clientX
    if (Math.abs(delta) > 2) {
      root.scrollLeft += delta
      dragStartX = event.clientX
    }
  })

  root.addEventListener('pointerup', (event) => {
    dragging = false
    root.releasePointerCapture(event.pointerId)
  })

  root.addEventListener('pointercancel', () => {
    dragging = false
  })
}
