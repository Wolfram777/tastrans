import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/homelogo.png'
import { scrollToBooking } from '../utils/scrollToBooking'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Online Booking', to: null },
  { label: 'Terminals', to: '/terminals' },
  { label: 'Schedule', to: '/schedule' },
  { label: 'FAQs', to: '/faqs' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <nav
        className={`
          w-full flex items-center justify-between px-6 md:pl-16 md:pr-32 overflow-hidden transition-all duration-300 ease-in-out
          ${scrolled
            ? 'mt-3 mx-4 md:mx-6 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-white/40'
            : 'bg-white border-b border-gray-200'
          }
        `}
      >
        {/* Logo */}
        <Link to="/" className="h-20 flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src={logo}
            alt="Tastrans"
            className="h-24 w-40 md:w-48 object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex h-20" style={{ fontFamily: 'Inter, sans-serif' }}>
          {navLinks.map(({ label, to }) => (
            <li key={label} className="flex">
              {to === null ? (
                <button
                  onClick={() => scrollToBooking(navigate)}
                  className="flex items-center px-4 text-sm font-bold border-b-4 border-transparent text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  {label}
                </button>
              ) : (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-4 text-sm font-bold border-b-4 transition-colors cursor-pointer
                    ${isActive
                      ? 'text-gray-900 border-[#11ae23]'
                      : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`
                  }
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Book Now — always visible */}
        <button
          className="btn-primary relative px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer overflow-hidden"
          style={{
            backgroundColor: '#11ae23',
            animation: 'scalePulse 2s ease-in-out infinite',
          }}
          onClick={() => scrollToBooking(navigate)}
        >
          Book Now
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mx-4 mt-1 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {navLinks.map(({ label, to }) =>
            to === null ? (
              <button
                key={label}
                onClick={() => { setMenuOpen(false); scrollToBooking(navigate) }}
                className="block w-full text-left px-6 py-4 text-sm font-bold border-l-4 border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {label}
              </button>
            ) : (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-4 text-sm font-bold border-l-4 transition-colors cursor-pointer
                  ${isActive
                    ? 'text-gray-900 border-gray-900 bg-gray-50'
                    : 'text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            )
          )}
        </div>
      )}
    </div>
  )
}
