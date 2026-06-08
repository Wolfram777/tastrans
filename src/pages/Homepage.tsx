import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cover from '../assets/images/cover.png'
import pic1 from '../assets/images/pic1.png'
import BookingCard from '../components/BookingCard'
import { useInView } from '../hooks/useInView'
import { scrollToBooking } from '../utils/scrollToBooking'

const slideFromRight = (delay: string): React.CSSProperties => ({
  animation: `fadeInFromRight 0.8s ease-out ${delay} both`,
})

const fadeIn = (delay: string): React.CSSProperties => ({
  animation: `fadeIn 0.8s ease-out ${delay} both`,
})

const stats = [
  { target: 120, suffix: '+', label: 'Active Buses' },
  { target: 38,  suffix: '',  label: 'Routes Covered' },
  { target: 2.4, suffix: 'M', label: 'Passengers Yearly', decimals: 1 },
  { target: 15,  suffix: '+', label: 'Years of Service' },
]

function StatCard({ target, suffix, label, decimals = 0, animate }: {
  target: number
  suffix: string
  label: string
  decimals?: number
  animate: boolean
}) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!animate || started.current) return
    started.current = true

    const duration = 1800
    const steps = 60
    const interval = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += 1
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(decimals)))
      if (current >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [animate, target, decimals])

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-gray-100 bg-gray-50">
      <span
        className="text-3xl md:text-4xl font-extrabold mb-1"
        style={{ fontFamily: 'Inter, sans-serif', color: '#11ae23' }}
      >
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
      </span>
      <span
        className="text-xs text-gray-500 uppercase tracking-widest"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200 }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Homepage() {
  const { ref: picRef, inView: picInView } = useInView(0.2)
  const { ref: statsRef, inView: statsInView } = useInView(0.2)
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('pendingScrollToBooking')) {
      sessionStorage.removeItem('pendingScrollToBooking')
      setTimeout(() => scrollToBooking(), 400)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full h-screen">
        <img
          src={cover}
          alt="Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 md:justify-end md:pr-24 lg:pr-48">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight w-full max-w-sm sm:max-w-md md:max-w-lg text-center md:text-right [&>br]:leading-none"
            style={{ fontFamily: 'Inter, sans-serif', color: '#def930', ...slideFromRight('0s') }}
          >
            LOREM IPSUM DOLOR SIT AMET CONSECTETUR
            <br />
            <span style={{
              color: '#ffffff',
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(14px, 2vw, 20px)',
              fontWeight: 200,
              lineHeight: '1.4',
              display: 'block',
              marginTop: '8px',
              ...slideFromRight('0.2s')
            }}>
              Vitae posuere integer nisl gravida quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat 
              Duis aute irure dolor in
            </span>

            <span className="flex flex-col sm:flex-row justify-center md:justify-end gap-3 mt-6">
              <button
                className="btn-primary"
                onClick={() => navigate('/terminals')}
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#11ae23', color: '#ffffff', fontWeight: 600, fontSize: '15px', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', border: 'none', ...fadeIn('0.5s') }}
              >
                View Terminals
              </button>
              <button
                className="btn-outline"
                onClick={() => navigate('/schedule')}
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'transparent', color: '#def930', fontWeight: 600, fontSize: '15px', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', border: '2px solid #def930', ...fadeIn('0.7s') }}
              >
                Check Schedule
              </button>
            </span>
          </h1>
        </div>
      </section>

      <BookingCard />

      {/* About Section */}
      <section className="w-full min-h-screen bg-white flex items-center px-6 sm:px-10 md:px-20 lg:px-32 pt-36 pb-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — text + stats */}
          <div className="flex flex-col gap-8">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ fontFamily: 'Inter, sans-serif', color: '#11ae23' }}
              >
                Who We Are
              </p>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                About Tas Trans
              </h2>

              <div
                className="w-16 h-1 rounded-full mb-8"
                style={{ backgroundColor: '#def930' }}
              />

              <p
                className="text-gray-600 leading-relaxed mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: '17px' }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: '17px' }}
              >
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Statistics */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <StatCard key={s.label} {...s} animate={statsInView} />
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div ref={picRef} className="flex items-center justify-center" style={{
            opacity: picInView ? 1 : 0,
            transform: picInView ? 'translateX(0)' : 'translateX(60px)',
            transition: 'opacity 0.9s ease-out, transform 0.9s ease-out',
          }}>
            <div className="w-full rounded-3xl overflow-hidden border-4 border-gray-200 shadow-2xl">
              <img
                src={pic1}
                alt="Tas Trans"
                className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
