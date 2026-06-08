import { useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaClock, FaRoute, FaSearch } from 'react-icons/fa'

const terminals = [
  {
    name: 'Metro Manila Terminal',
    color: 'from-green-700 to-green-500',
    address: '145 EDSA cor. Libertad St., Pasay City, Metro Manila',
    contact: '+63 (2) 8521 0034',
    hours: 'Mon–Sun: 4:00 AM – 11:00 PM',
    routes: ['Pasay → Laguna', 'Pasay → Batangas', 'Pasay → Quezon', 'Pasay → Cavite'],
  },
  {
    name: 'Cebu Terminal',
    color: 'from-emerald-700 to-teal-500',
    address: '22 N. Bacalso Ave., South Bus Terminal, Cebu City, Cebu',
    contact: '+63 (32) 254 8891',
    hours: 'Mon–Sun: 3:30 AM – 10:30 PM',
    routes: ['Cebu → Bohol (via ferry)', 'Cebu → Negros Oriental', 'Cebu → Leyte'],
  },
  {
    name: 'Davao Terminal',
    color: 'from-lime-700 to-green-500',
    address: 'Ulas, Davao-Cotabato Highway, Davao City, Davao del Sur',
    contact: '+63 (82) 297 6610',
    hours: 'Mon–Sun: 5:00 AM – 10:00 PM',
    routes: ['Davao → South Cotabato', 'Davao → Sultan Kudarat', 'Davao → Bukidnon'],
  },
  {
    name: 'Iloilo Terminal',
    color: 'from-green-800 to-emerald-600',
    address: 'Brgy. Ungka, Pavia, Iloilo (Iloilo Integrated Bus Terminal)',
    contact: '+63 (33) 320 7745',
    hours: 'Mon–Sun: 4:00 AM – 9:00 PM',
    routes: ['Iloilo → Negros Occidental', 'Iloilo → Antique', 'Iloilo → Capiz'],
  },
  {
    name: 'Pampanga Terminal',
    color: 'from-teal-700 to-green-600',
    address: '78 MacArthur Highway, San Fernando City, Pampanga',
    contact: '+63 (45) 961 2233',
    hours: 'Mon–Sun: 4:30 AM – 10:00 PM',
    routes: ['Pampanga → Tarlac', 'Pampanga → Zambales', 'Pampanga → Bulacan', 'Pampanga → Metro Manila'],
  },
  {
    name: 'Cagayan de Oro Terminal',
    color: 'from-green-600 to-lime-600',
    address: 'Bulua National Highway, Cagayan de Oro City, Misamis Oriental',
    contact: '+63 (88) 858 4400',
    hours: 'Mon–Sun: 5:00 AM – 9:30 PM',
    routes: ['CDO → Bukidnon', 'CDO → Lanao del Norte', 'CDO → Surigao del Norte'],
  },
]

export default function Terminals() {
  const [query, setQuery] = useState('')

  const filtered = terminals.filter(t =>
    [t.name, t.address, ...t.routes].some(s =>
      s.toLowerCase().includes(query.toLowerCase())
    )
  )

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ fontFamily: 'Inter, sans-serif', color: '#11ae23' }}
        >
          Nationwide Coverage
        </p>
        <h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Terminals
        </h1>
        <p
          className="text-gray-500 mb-2"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: '17px' }}
        >
          List of Tas Trans terminals nationwide
        </p>
        <div className="w-14 h-1 rounded-full mb-8" style={{ backgroundColor: '#def930' }} />

        {/* Search bar */}
        <div className="relative mb-8 max-w-md">
          <FaSearch size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search terminals, locations or routes…"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#11ae23] focus:ring-2 focus:ring-[#11ae23]/20 transition-all"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>

        {/* Terminal cards */}
        {filtered.length === 0 && (
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            No terminals found matching "<span className="font-semibold text-gray-600">{query}</span>".
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((t) => (
            <div
              key={t.name}
              className="flex rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-auto sm:h-56"
            >
              {/* Left — image placeholder (40%) */}
              <div className={`hidden sm:flex w-2/5 bg-gradient-to-br ${t.color} items-end p-6 flex-shrink-0`}>
                <span
                  className="text-white font-extrabold text-lg leading-tight"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {t.name}
                </span>
              </div>

              {/* Right — info (60%) */}
              <div className="flex-1 p-6 bg-white flex flex-col justify-between gap-4">
                <span
                  className="sm:hidden font-extrabold text-lg"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#11ae23' }}
                >
                  {t.name}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#11ae23' }} />
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {t.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaPhone size={13} className="flex-shrink-0" style={{ color: '#11ae23' }} />
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {t.contact}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock size={13} className="flex-shrink-0" style={{ color: '#11ae23' }} />
                    <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {t.hours}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <FaRoute size={13} className="mt-0.5 flex-shrink-0" style={{ color: '#11ae23' }} />
                    <div className="flex flex-wrap gap-1">
                      {t.routes.map(r => (
                        <span
                          key={r}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f0fdf4', color: '#11ae23', fontWeight: 600 }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
