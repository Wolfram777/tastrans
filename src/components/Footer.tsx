import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaChevronRight, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import logo from '../assets/images/homelogo.png'
import { scrollToBooking } from '../utils/scrollToBooking'

const quickLinks: { label: string; to: string | null }[] = [
  { label: 'Home', to: '/' },
  { label: 'Online Booking', to: null },
  { label: 'Terminals', to: '/terminals' },
  { label: 'Schedule', to: '/schedule' },
  { label: 'FAQs', to: '/faqs' },
]

const socials = [
  { icon: <FaFacebook size={24} />, href: '#', label: 'Facebook' },
  { icon: <FaXTwitter size={24} />, href: '#', label: 'X' },
  { icon: <FaInstagram size={24} />, href: '#', label: 'Instagram' },
]

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer
      className="w-full pt-20 pb-10 px-6 sm:px-10 md:px-20 lg:px-32"
      style={{ backgroundColor: '#134730' }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-stretch gap-10 sm:gap-16">

        {/* Left — logo + social icons */}
        <div className="flex flex-col justify-between flex-shrink-0 gap-6 sm:gap-0">
          <img
            src={logo}
            alt="Tas Trans"
            className="h-16 w-auto object-contain"
          />
          <div className="flex items-center gap-8 mt-6">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: '#11ae23', color: '#ffffff' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#def930'
                  ;(e.currentTarget as HTMLElement).style.color = '#134730'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#11ae23'
                  ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ fontFamily: 'Inter, sans-serif', color: '#def930' }}
          >
            Quick Links
          </p>
          <ul className="flex flex-col gap-2">
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                {to === null ? (
                  <button
                    onClick={() => scrollToBooking(navigate)}
                    className="flex items-center gap-2 text-sm transition-colors duration-150 cursor-pointer"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    <FaChevronRight size={10} style={{ color: '#def930', flexShrink: 0 }} />
                    {label}
                  </button>
                ) : (
                  <Link
                    to={to}
                    className="flex items-center gap-2 text-sm transition-colors duration-150"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    <FaChevronRight size={10} style={{ color: '#def930', flexShrink: 0 }} />
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ fontFamily: 'Inter, sans-serif', color: '#def930' }}
          >
            Contact Info
          </p>
          <ul className="flex flex-col gap-4">
            {[
              {
                icon: <FaMapMarkerAlt size={14} />,
                text: 'Philippines Philippines Philippines Philippines',
              },
              {
                icon: <FaPhone size={14} />,
                text: '+63 (2) 8123 4567',
              },
              {
                icon: <FaEnvelope size={14} />,
                text: 'support@tastrans.com.ph',
              },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0" style={{ color: '#def930' }}>{icon}</span>
                <span
                  className="text-sm leading-snug"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, color: 'rgba(255,255,255,0.75)' }}
                >
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  )
}
