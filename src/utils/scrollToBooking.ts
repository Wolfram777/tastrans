type NavigateFn = (path: string) => void

export function scrollToBooking(navigate?: NavigateFn) {
  const target = document.getElementById('booking-card')

  if (!target) {
    // Not on homepage — flag and navigate there
    sessionStorage.setItem('pendingScrollToBooking', '1')
    if (navigate) navigate('/')
    return
  }

  const targetY = target.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2 - target.offsetHeight / 2)
  const startY = window.scrollY
  const distance = targetY - startY
  const duration = 900
  let startTime: number | null = null

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, startY + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
    else window.dispatchEvent(new Event('book-now-clicked'))
  }

  requestAnimationFrame(step)
}
