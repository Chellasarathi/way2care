export function $(selector, scope = document) {
  return scope.querySelector(selector)
}

export function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector))
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
