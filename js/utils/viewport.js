export function isMobileCarousel() {
  return window.matchMedia('(max-width: 767px)').matches
}

export function getScrollProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  if (docHeight <= 0) return 0
  return scrollTop / docHeight
}
