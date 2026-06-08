import { useState, useRef, useEffect } from 'react'
import { FaCircle, FaArrowRight } from 'react-icons/fa'
import CustomSelect from '../components/CustomSelect'

const routes = [
  'All Routes',
  'Metro Manila → Cebu',
  'Metro Manila → Davao',
  'Metro Manila → Iloilo',
  'Cebu → Davao',
  'Pampanga → Metro Manila',
  'CDO → Davao',
]

const schedules = [
  { route: 'Metro Manila → Cebu',     departure: '04:00 AM', arrival: '12:30 PM', type: 'Express',   price: '₱1,200', status: 'On Time' },
  { route: 'Metro Manila → Cebu',     departure: '07:00 AM', arrival: '03:30 PM', type: 'Regular',   price: '₱950',   status: 'On Time' },
  { route: 'Metro Manila → Cebu',     departure: '10:00 AM', arrival: '06:30 PM', type: 'Deluxe',    price: '₱1,500', status: 'Full' },
  { route: 'Metro Manila → Cebu',     departure: '01:00 PM', arrival: '09:30 PM', type: 'Regular',   price: '₱950',   status: 'On Time' },
  { route: 'Metro Manila → Cebu',     departure: '08:00 PM', arrival: '04:30 AM', type: 'Express',   price: '₱1,200', status: 'Delayed' },

  { route: 'Metro Manila → Davao',    departure: '05:00 AM', arrival: '05:00 PM', type: 'Deluxe',    price: '₱1,800', status: 'On Time' },
  { route: 'Metro Manila → Davao',    departure: '08:00 AM', arrival: '08:00 PM', type: 'Express',   price: '₱1,400', status: 'On Time' },
  { route: 'Metro Manila → Davao',    departure: '09:00 PM', arrival: '09:00 AM', type: 'Regular',   price: '₱1,100', status: 'On Time' },

  { route: 'Metro Manila → Iloilo',   departure: '06:00 AM', arrival: '02:00 PM', type: 'Express',   price: '₱1,100', status: 'On Time' },
  { route: 'Metro Manila → Iloilo',   departure: '12:00 PM', arrival: '08:00 PM', type: 'Regular',   price: '₱850',   status: 'Delayed' },
  { route: 'Metro Manila → Iloilo',   departure: '10:00 PM', arrival: '06:00 AM', type: 'Deluxe',    price: '₱1,400', status: 'On Time' },

  { route: 'Cebu → Davao',            departure: '05:30 AM', arrival: '01:30 PM', type: 'Regular',   price: '₱780',   status: 'On Time' },
  { route: 'Cebu → Davao',            departure: '11:00 AM', arrival: '07:00 PM', type: 'Express',   price: '₱1,000', status: 'Full' },
  { route: 'Cebu → Davao',            departure: '09:00 PM', arrival: '05:00 AM', type: 'Regular',   price: '₱780',   status: 'On Time' },

  { route: 'Pampanga → Metro Manila', departure: '04:30 AM', arrival: '06:00 AM', type: 'Express',   price: '₱220',   status: 'On Time' },
  { route: 'Pampanga → Metro Manila', departure: '06:00 AM', arrival: '07:30 AM', type: 'Regular',   price: '₱180',   status: 'On Time' },
  { route: 'Pampanga → Metro Manila', departure: '08:00 AM', arrival: '09:30 AM', type: 'Regular',   price: '₱180',   status: 'On Time' },
  { route: 'Pampanga → Metro Manila', departure: '12:00 PM', arrival: '01:30 PM', type: 'Express',   price: '₱220',   status: 'Delayed' },
  { route: 'Pampanga → Metro Manila', departure: '05:00 PM', arrival: '06:30 PM', type: 'Deluxe',    price: '₱300',   status: 'On Time' },

  { route: 'CDO → Davao',             departure: '05:00 AM', arrival: '09:00 AM', type: 'Regular',   price: '₱480',   status: 'On Time' },
  { route: 'CDO → Davao',             departure: '09:00 AM', arrival: '01:00 PM', type: 'Express',   price: '₱620',   status: 'On Time' },
  { route: 'CDO → Davao',             departure: '02:00 PM', arrival: '06:00 PM', type: 'Regular',   price: '₱480',   status: 'Full' },
  { route: 'CDO → Davao',             departure: '07:00 PM', arrival: '11:00 PM', type: 'Deluxe',    price: '₱750',   status: 'On Time' },
]

const typeColors: Record<string, string> = {
  Regular: 'bg-gray-100 text-gray-600',
  Express: 'bg-blue-50 text-blue-600',
  Deluxe:  'bg-yellow-50 text-yellow-700',
}

const statusConfig: Record<string, { dot: string; text: string; bg: string }> = {
  'On Time': { dot: '#11ae23', text: '#11ae23', bg: '#f0fdf4' },
  'Delayed':  { dot: '#f59e0b', text: '#b45309', bg: '#fffbeb' },
  'Full':     { dot: '#ef4444', text: '#dc2626', bg: '#fef2f2' },
}

const locations = [
  'Metro Manila', 'Cebu', 'Davao', 'Iloilo', 'Pampanga', 'CDO',
]

export default function Schedule() {
  const [activeRoute, setActiveRoute] = useState('All Routes')
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')

  const topScrollRef = useRef<HTMLDivElement>(null)
  const tableScrollRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const [tableWidth, setTableWidth] = useState(0)
  const syncing = useRef(false)

  useEffect(() => {
    const update = () => setTableWidth(tableRef.current?.scrollWidth ?? 0)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  })

  const syncFromTop = () => {
    if (syncing.current) { syncing.current = false; return }
    if (topScrollRef.current && tableScrollRef.current) {
      syncing.current = true
      tableScrollRef.current.scrollLeft = topScrollRef.current.scrollLeft
    }
  }

  const syncFromTable = () => {
    if (syncing.current) { syncing.current = false; return }
    if (topScrollRef.current && tableScrollRef.current) {
      syncing.current = true
      topScrollRef.current.scrollLeft = tableScrollRef.current.scrollLeft
    }
  }

  const filtered = schedules.filter(s => {
    const routeMatch = activeRoute === 'All Routes' || s.route === activeRoute
    const [from, to] = s.route.split(' → ')
    const originMatch = !origin || from.toLowerCase().includes(origin.toLowerCase())
    const destMatch = !destination || to.toLowerCase().includes(destination.toLowerCase())
    return routeMatch && originMatch && destMatch
  })

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ fontFamily: 'Inter, sans-serif', color: '#11ae23' }}
        >
          Daily Trips
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Schedule
        </h1>

        <p
          className="text-gray-500 mb-2"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200, fontSize: '17px' }}
        >
          View available trips and departure times across all Tas Trans routes.
        </p>
        <div className="w-14 h-1 rounded-full mb-10" style={{ backgroundColor: '#def930' }} />

        {/* Origin / Destination search */}
        <div className="flex items-center gap-3 mb-8 p-4 rounded-2xl border border-gray-200 bg-gray-50 w-full max-w-xl">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              From
            </p>
            <CustomSelect
              options={locations}
              value={origin}
              onChange={val => { setOrigin(val); setActiveRoute('All Routes') }}
              placeholder="Origin"
              minimal
            />
          </div>

          <div className="flex-shrink-0 text-gray-300">
            <FaArrowRight size={16} style={{ color: '#11ae23' }} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              To
            </p>
            <CustomSelect
              options={locations}
              value={destination}
              onChange={val => { setDestination(val); setActiveRoute('All Routes') }}
              placeholder="Destination"
              minimal
            />
          </div>

          {(origin || destination) && (
            <button
              onClick={() => { setOrigin(''); setDestination('') }}
              className="text-xs text-gray-400 hover:text-gray-600 flex-shrink-0 cursor-pointer transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Route filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {routes.map(r => (
            <button
              key={r}
              onClick={() => setActiveRoute(r)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer"
              style={{
                fontFamily: 'Inter, sans-serif',
                backgroundColor: activeRoute === r ? '#11ae23' : '#f3f4f6',
                color: activeRoute === r ? '#ffffff' : '#374151',
              }}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Top horizontal scrollbar (synced with table) */}
        <div
          ref={topScrollRef}
          onScroll={syncFromTop}
          className="overflow-x-auto mb-2"
        >
          <div style={{ width: tableWidth, height: 1 }} />
        </div>

        {/* Table */}
        <div
          ref={tableScrollRef}
          onScroll={syncFromTable}
          className="rounded-2xl border border-gray-200 overflow-x-auto shadow-sm"
        >
          <table ref={tableRef} className="w-full min-w-[680px] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <thead>
              <tr style={{ backgroundColor: '#134730' }}>
                {['Route', 'Departure', 'Arrival', 'Bus Type', 'Fare', 'Status'].map(h => (
                  <th
                    key={h}
                    className="px-4 sm:px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-white whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const status = statusConfig[s.status]
                return (
                  <tr
                    key={i}
                    className="border-t border-gray-100 transition-colors duration-100"
                    style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#f9fafb' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f0fdf4')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = i % 2 === 0 ? '#ffffff' : '#f9fafb')}
                  >
                    <td className="px-4 sm:px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">{s.route}</td>
                    <td className="px-4 sm:px-5 py-4 text-gray-700 whitespace-nowrap">{s.departure}</td>
                    <td className="px-4 sm:px-5 py-4 text-gray-700 whitespace-nowrap">{s.arrival}</td>
                    <td className="px-4 sm:px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeColors[s.type]}`}>
                        {s.type}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">{s.price}</td>
                    <td className="px-4 sm:px-5 py-4">
                      <span
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold w-fit whitespace-nowrap"
                        style={{ backgroundColor: status.bg, color: status.text }}
                      >
                        <FaCircle size={6} style={{ color: status.dot }} />
                        {s.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-12" style={{ fontFamily: 'Inter, sans-serif' }}>
              No schedules available for this route.
            </p>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-6">
          {Object.entries(statusConfig).map(([label, cfg]) => (
            <div key={label} className="flex items-center gap-2 text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              <FaCircle size={8} style={{ color: cfg.dot }} />
              {label}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
