import type React from 'react'
import { useState } from 'react'
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
  'Metro Manila', 'Cebu', 'Davao del Sur', 'Iloilo', 'Pampanga',
  'Laguna', 'Batangas', 'Bulacan', 'Cavite', 'Rizal',
  'Bohol', 'Leyte', 'Negros Occidental', 'Pangasinan', 'Quezon',
  'Albay', 'Camarines Sur', 'Isabela', 'Zamboanga del Sur', 'Cagayan de Oro',
]

const passengerOptions = Array.from({ length: 10 }, (_, i) =>
  `${i + 1} ${i + 1 === 1 ? 'Passenger' : 'Passengers'}`
)

const dateInputClass = `
  w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700
  focus:outline-none focus:ring-2 focus:border-transparent cursor-pointer transition-all duration-150
`

function FieldWrapper({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <label
        className="text-xs font-bold uppercase tracking-widest text-gray-700"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

export default function BookingCard() {
  const [tripType, setTripType] = useState<TripType>('one-way')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departure, setDeparture] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState('')

  return (
    <div className="relative z-20 mx-auto w-11/12 max-w-5xl -mt-10 sm:-mt-16 md:-mt-20 rounded-3xl bg-white shadow-2xl border border-gray-100 px-4 sm:px-6 md:px-8 pt-5 pb-6 md:pb-8">

      {/* Trip type tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1 mb-5 w-full sm:w-auto">
        {tabs.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => setTripType(value)}
            className="relative flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer"
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

      {/* Form fields */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-row gap-3 items-end">

        <FieldWrapper label="From">
          <CustomSelect
            options={provinces}
            value={from}
            onChange={setFrom}
            placeholder="Choose origin"
          />
        </FieldWrapper>

        <FieldWrapper label="To">
          <CustomSelect
            options={provinces}
            value={to}
            onChange={setTo}
            placeholder="Choose destination"
          />
        </FieldWrapper>

        <FieldWrapper label="Departure">
          <input
            type="date"
            value={departure}
            onChange={e => setDeparture(e.target.value)}
            className={dateInputClass}
            style={{ fontFamily: 'Inter, sans-serif', color: '#374151' }}
          />
        </FieldWrapper>

        <div style={{ flex: 1, minWidth: 0, opacity: tripType === 'round-trip' ? 1 : 0.4, transition: 'opacity 0.2s ease' }}>
          <FieldWrapper label="Return">
            <input
              type="date"
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              disabled={tripType !== 'round-trip'}
              className={dateInputClass}
              style={{ fontFamily: 'Inter, sans-serif', color: '#374151', cursor: tripType === 'round-trip' ? 'pointer' : 'not-allowed', backgroundColor: tripType === 'round-trip' ? '#ffffff' : '#f3f4f6' }}
            />
          </FieldWrapper>
        </div>

        <FieldWrapper label="Passengers">
          <CustomSelect
            options={passengerOptions}
            value={passengers}
            onChange={setPassengers}
            placeholder="Select"
          />
        </FieldWrapper>

        {/* Search button */}
        <button
          className="btn-primary col-span-2 sm:col-span-3 lg:col-span-1 h-11 px-7 rounded-xl text-sm font-bold text-white cursor-pointer whitespace-nowrap flex-shrink-0 flex items-center justify-center gap-2 w-full lg:w-auto"
          style={{
            fontFamily: 'Inter, sans-serif',
            backgroundColor: '#11ae23',
            backgroundImage: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 4s infinite linear',
            marginTop: '22px',
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          Search
        </button>

      </div>
    </div>
  )
}
