let lastClampedScroll: number | null = null
const maxNegativeScroll = 40

export function transformBasedOnScroll(city: HTMLElement, header: HTMLElement) {
  const pos = window.scrollY
  const maxPositiveScroll = header.offsetTop
  const clamped = Math.min(maxPositiveScroll, Math.max(-maxNegativeScroll, pos))
  if (clamped == lastClampedScroll) {
    return
  } else {
    lastClampedScroll = clamped
  }
  if (clamped > 0) {
    city.style.transform = `translateY(${
      (clamped / maxPositiveScroll) * -30
    }px) rotateX(${(clamped / maxPositiveScroll) * 75}deg) rotateZ(45deg)`
    lastClampedScroll = clamped
  } else {
    city.style.transform = `scale(${
      1 + (clamped / maxNegativeScroll) * 0.15
    }) rotateZ(45deg)`
    lastClampedScroll = clamped
  }
}
