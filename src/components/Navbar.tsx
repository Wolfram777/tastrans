import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/tastrans-logo.png'
import Sidebar from './Sidebar'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <nav
          className={`
            h-20 flex items-center justify-between pl-16 pr-6 transition-all duration-300 ease-in-out
            ${scrolled
              ? 'mt-3 mx-6 w-full rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-white/40'
              : 'w-full bg-white border-b border-gray-200'
            }
          `}
        >
          <Link to="/">
            <img
              src={logo}
              alt="Tastrans"
              className="h-24 w-auto object-contain"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
