import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Skip scroll-to-top if we're about to do a booking scroll instead
    if (sessionStorage.getItem('pendingScrollToBooking')) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
