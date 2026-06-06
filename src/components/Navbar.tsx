import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/images/homelogo.png'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Online Booking', to: '/booking' },
  { label: 'Terminals', to: '/terminals' },
  { label: 'Schedule', to: '/schedule' },
  { label: 'FAQs', to: '/faqs' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <nav
        className={`
          h-20 flex items-center justify-between pl-16 pr-32 overflow-hidden transition-all duration-300 ease-in-out
          ${scrolled
            ? 'mt-3 mx-6 w-full rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-white/40'
            : 'w-full bg-white border-b border-gray-200'
          }
        `}
      >
        <div className="flex items-center gap-32">
          <Link to="/">
            <img
              src={logo}
              alt="Tastrans"
              className="h-24 w-48 object-contain"
            />
          </Link>

          <ul className="flex h-20">
            {navLinks.map(({ label, to }) => (
              <li key={to} className="flex">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-4 text-sm font-medium border-b-4 transition-colors cursor-pointer
                    ${isActive
                      ? 'text-gray-900 border-gray-900'
                      : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="relative px-6 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer overflow-hidden"
          style={{
            backgroundColor: '#11ae23',
            backgroundImage: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 4s infinite linear',
          }}
        >
          Book Now
        </button>
      </nav>
    </div>
  )
}
