import type React from 'react'
import { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaFlag, FaCalendarAlt, FaCalendarCheck, FaUser } from 'react-icons/fa'
import CustomSelect from './CustomSelect'

type TripType = 'one-way' | 'round-trip'

const tabs: { value: TripType; label: string; icon: React.ReactNode }[] = [
  {
    value: 'one-way',
    label: 'One-way Trip',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
  },
  {
    value: 'round-trip',
    label: 'Round Trip',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
]

const provinces = [
  'Bataan', 'Batangas', 'Benguet', 'Bohol', 'Bukidnon',
  'Bulacan', 'Cagayan', 'Camarines Norte', 'Camarines Sur', 'Cavite',
  'Cebu', 'Davao del Norte', 'Davao del Sur', 'Davao Occidental',
  'Ilocos Norte', 'Ilocos Sur', 'Iloilo', 'Isabela', 'Laguna',
  'Lanao del Norte', 'Leyte', 'Metro Manila', 'Misamis Oriental',
  'Negros Occidental', 'Negros Oriental', 'Nueva Ecija', 'Nueva Vizcaya',
  'Pampanga', 'Pangasinan', 'Quezon', 'Rizal', 'Samar',
  'Sorsogon', 'South Cotabato', 'Sultan Kudarat', 'Surigao del Norte',
  'Tarlac', 'Zambales', 'Zamboanga del Norte', 'Zamboanga del Sur',
]

const passengerOptions = Array.from({ length: 10 }, (_, i) => `${i + 1} Pax`)

function CellLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 mb-1">
      <span style={{ color: '#11ae23' }}>{icon}</span>
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
        {children}
      </p>
    </div>
  )
}

const dateInputClass = `
  w-full bg-transparent text-sm text-gray-700 focus:outline-none cursor-pointer
`

export default function BookingCard() {
  const [tripType, setTripType] = useState<TripType>('one-way')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departure, setDeparture] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('')

  const isRoundTrip = tripType === 'round-trip'
  const [titleAnim, setTitleAnim] = useState(false)

  useEffect(() => {
    const handler = () => {
      setTitleAnim(false)
      requestAnimationFrame(() => requestAnimationFrame(() => setTitleAnim(true)))
      setTimeout(() => setTitleAnim(false), 1000)
    }
    window.addEventListener('book-now-clicked', handler)
    return () => window.removeEventListener('book-now-clicked', handler)
  }, [])

  return (
    <div id="booking-card" className="relative z-20 mx-auto w-11/12 max-w-6xl -mt-10 sm:-mt-16 md:-mt-20 rounded-xl bg-white shadow-2xl border border-gray-100 pb-0">

      {/* Header row */}
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4">
        <h2
          className="text-xl font-extrabold inline-block"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: '#11ae23',
            animation: titleAnim ? 'bookHerePulse 1s ease-in-out forwards' : 'none',
            transformOrigin: 'left center',
          }}
        >
          BOOK HERE
        </h2>

        {/* Trip type tabs */}
        <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1">
        {tabs.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => setTripType(value)}
            className="relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer"
            style={{
              fontFamily: 'Inter, sans-serif',
              backgroundColor: tripType === value ? '#ffffff' : 'transparent',
              color: tripType === value ? '#11ae23' : '#9ca3af',
              boxShadow: tripType === value ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}
          >
            {icon}
            {label}
          </button>
        ))}
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* 6-column strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">

        {/* 1 — From */}
        <div className="flex flex-col justify-center px-4 py-3 border-r border-b lg:border-b-0 border-gray-300 rounded-bl-xl">
          <CellLabel icon={<FaMapMarkerAlt size={11} />}>From</CellLabel>
          <CustomSelect options={provinces} value={from} onChange={setFrom} placeholder="Select location" minimal />
        </div>

        {/* 2 — To */}
        <div className="flex flex-col justify-center px-4 py-3 sm:border-r border-b lg:border-b-0 border-gray-300">
          <CellLabel icon={<FaFlag size={11} />}>To</CellLabel>
          <CustomSelect options={provinces} value={to} onChange={setTo} placeholder="Select destination" minimal />
        </div>

        {/* 3 — Departure */}
        <div className="flex flex-col justify-center px-4 py-3 border-r border-b lg:border-b-0 border-gray-300">
          <CellLabel icon={<FaCalendarAlt size={11} />}>Departure</CellLabel>
          <input
            type="date"
            value={departure}
            onChange={e => setDeparture(e.target.value)}
            className={dateInputClass}
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>

        {/* 4 — Return */}
        <div
          className="flex flex-col justify-center px-4 py-3 sm:border-r border-b lg:border-b-0 border-gray-300 transition-opacity duration-200"
          style={{ opacity: isRoundTrip ? 1 : 0.4 }}
        >
          <CellLabel icon={<FaCalendarCheck size={11} />}>Return</CellLabel>
          <input
            type="date"
            value={returnDate}
            onChange={e => setReturnDate(e.target.value)}
            disabled={!isRoundTrip}
            className={dateInputClass}
            style={{ fontFamily: 'Inter, sans-serif', cursor: isRoundTrip ? 'pointer' : 'not-allowed' }}
          />
        </div>

        {/* 5 — Passengers */}
        <div className="flex flex-col justify-center px-4 py-3 border-r border-gray-300">
          <CellLabel icon={<FaUser size={11} />}>Passengers</CellLabel>
          <CustomSelect options={passengerOptions} value={passengers} onChange={setPassengers} placeholder="Select" minimal />
        </div>

        {/* 6 — Search */}
        <button
          className="btn-primary flex items-center justify-center gap-2 font-bold text-white cursor-pointer rounded-br-xl"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            backgroundColor: '#11ae23',
            backgroundImage: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 4s infinite linear',
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          Search
        </button>

      </div>
    </div>
  )
}
