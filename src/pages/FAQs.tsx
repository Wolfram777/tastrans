import { useState } from 'react'
import {
  FaTicketAlt, FaCreditCard, FaTimesCircle, FaSuitcase,
  FaBus, FaMapMarkerAlt, FaShieldAlt, FaSearch as FaSearchIcon,
  FaPhoneAlt, FaTimes,
} from 'react-icons/fa'

interface FAQ {
  icon: React.ReactNode
  title: string
  description: string
  answer: string
}

const faqs: FAQ[] = [
  {
    icon: <FaTicketAlt size={28} />,
    title: 'Booking & Reservations',
    description: 'Learn how to book a seat, manage reservations, and check trip availability.',
    answer: 'You can book a seat online through our website or mobile app, or visit any Tas Trans terminal. Reservations must be made at least 1 hour before departure. You can manage, view, or modify your booking through the "My Trips" section on our platform. Seats are held for 15 minutes after booking initiation before being released.',
  },
  {
    icon: <FaCreditCard size={28} />,
    title: 'Payment Methods',
    description: 'We accept cash, GCash, Maya, credit cards, and online bank transfers.',
    answer: 'Tas Trans accepts the following payment methods: cash at terminals, GCash, Maya (PayMaya), major credit and debit cards (Visa, Mastercard), and online bank transfers via Instapay/PESONet. For online bookings, payment must be completed within 15 minutes to secure your seat. Receipts are issued for all transactions.',
  },
  {
    icon: <FaTimesCircle size={28} />,
    title: 'Cancellation & Refunds',
    description: 'Understand our cancellation policy and how to request a refund.',
    answer: 'Cancellations made 24 hours or more before departure are eligible for a full refund. Cancellations made 12–24 hours before departure receive a 50% refund. Cancellations within 12 hours of departure are non-refundable. Refunds are processed within 5–7 business days to the original payment method. To cancel, go to "My Trips" and select the booking you wish to cancel.',
  },
  {
    icon: <FaSuitcase size={28} />,
    title: 'Luggage Policy',
    description: 'Find out what you can bring, size limits, and extra baggage fees.',
    answer: 'Each passenger is allowed one (1) check-in bag up to 20 kg and one (1) carry-on bag up to 7 kg. Oversized or excess baggage is charged ₱50 per kg. Prohibited items include flammable materials, sharp weapons, and perishable goods. All baggage is subject to inspection at terminals. Fragile items must be declared and are carried at the passenger\'s risk.',
  },
  {
    icon: <FaBus size={28} />,
    title: 'Bus Types & Amenities',
    description: 'Explore the difference between Regular, Express, and Deluxe bus options.',
    answer: 'Tas Trans operates three bus types: Regular — standard seating with essential amenities for budget travel; Express — faster routes with air conditioning, reclining seats, and charging ports; Deluxe — premium experience with wider seats, WiFi, blankets, onboard entertainment, and complimentary refreshments. All buses are equipped with GPS tracking and are regularly maintained for passenger safety.',
  },
  {
    icon: <FaMapMarkerAlt size={28} />,
    title: 'Terminal Locations',
    description: 'Find the nearest Tas Trans terminal and get directions.',
    answer: 'Tas Trans operates terminals in Metro Manila (Pasay), Cebu City, Davao City, Iloilo City, San Fernando (Pampanga), and Cagayan de Oro. Each terminal offers parking, waiting lounges, ticketing counters, and food stalls. Terminal hours generally run from 4:00 AM to 11:00 PM. Visit our Terminals page for complete addresses, contact numbers, and operating hours.',
  },
  {
    icon: <FaShieldAlt size={28} />,
    title: 'Safety & Security',
    description: 'Learn about our safety standards, driver protocols, and emergency procedures.',
    answer: 'All Tas Trans buses undergo mandatory safety inspections every 30 days. Our drivers are LTFRB-certified, undergo regular drug testing, and complete annual defensive driving courses. Each bus is equipped with first-aid kits, fire extinguishers, emergency exits, and CCTV cameras. In case of an emergency, please contact our 24/7 hotline at +63 (2) 8123 4567 or alert the onboard staff immediately.',
  },
  {
    icon: <FaSearchIcon size={28} />,
    title: 'Lost & Found',
    description: 'What to do if you left something behind on a Tas Trans bus or terminal.',
    answer: 'If you left an item on board, please report it immediately to the terminal where your trip ended. You may also call our Lost & Found hotline at +63 (2) 8521 0099 or email lostfound@tastrans.com.ph. Provide your ticket number, trip date, and a description of the item. Found items are held at terminals for 30 days before being turned over to authorities. Tas Trans is not liable for lost valuables.',
  },
  {
    icon: <FaPhoneAlt size={28} />,
    title: 'Contact & Support',
    description: 'Reach our customer support team via phone, email, or social media.',
    answer: 'Our customer support team is available 24/7. Phone: +63 (2) 8123 4567. Email: support@tastrans.com.ph. You can also reach us via our official Facebook, Instagram, and X (Twitter) pages. For urgent concerns such as emergencies or trip disruptions, please call our hotline directly. For general inquiries, we aim to respond within 24 hours on email and social media channels.',
  },
]

import type React from 'react'

export default function FAQs() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<FAQ | null>(null)

  const filtered = faqs.filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">

      {/* Banner */}
      <div
        className="w-full pt-32 pb-16 px-6 sm:px-10 md:px-20 flex flex-col items-center text-center"
        style={{ backgroundColor: '#134730' }}
      >
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ fontFamily: 'Inter, sans-serif', color: '#def930' }}
        >
          Help Center
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          How can we help you?
        </h1>

        {/* Search bar */}
        <div className="relative w-full max-w-xl">
          <FaSearchIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for answers…"
            className="w-full pl-10 pr-4 py-4 rounded-2xl text-sm bg-white text-gray-700 focus:outline-none shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>

      {/* FAQ cards */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-16">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-12" style={{ fontFamily: 'Inter, sans-serif' }}>
              No results for "<span className="font-semibold text-gray-600">{search}</span>".
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((faq) => (
                <button
                  key={faq.title}
                  onClick={() => setSelected(faq)}
                  className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer bg-white group"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-200 group-hover:bg-[#11ae23]"
                    style={{ backgroundColor: '#f0fdf4', color: '#11ae23' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#11ae23'
                      ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#f0fdf4'
                      ;(e.currentTarget as HTMLElement).style.color = '#11ae23'
                    }}
                  >
                    {faq.icon}
                  </div>
                  <h3
                    className="text-base font-bold text-gray-900 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {faq.title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 200 }}
                  >
                    {faq.description}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: '#f0fdf4', color: '#11ae23' }}
            >
              {selected.icon}
            </div>

            <h2
              className="text-xl font-extrabold text-gray-900 mb-4"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {selected.title}
            </h2>

            <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: '#def930' }} />

            <p
              className="text-sm text-gray-600 leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              {selected.answer}
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
