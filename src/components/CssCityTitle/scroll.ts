let lastClampedScroll: number | null = null;
const maxNegativeScroll = 40;

export function transformBasedOnScroll(header: HTMLElement) {
  const pos = window.scrollY;
  const maxPositiveScroll = header.offsetTop;
  const clamped = Math.min(
    maxPositiveScroll,
    Math.max(-maxNegativeScroll, pos)
  );
  if (clamped == lastClampedScroll) {
    return;
  } else {
    lastClampedScroll = clamped;
  }
  document.documentElement.style.setProperty(
    "--scale-factor",
    clamped > 0 ? "0" : (clamped / maxNegativeScroll).toString()
  );
  document.documentElement.style.setProperty(
    "--rotate-factor",
    clamped < 0 ? "0" : (clamped / maxPositiveScroll).toString()
  );
}
