import type React from 'react'
import cover from '../assets/images/cover.png'

const slideFromRight = (delay: string): React.CSSProperties => ({
  animation: `fadeInFromRight 0.8s ease-out ${delay} both`,
})

const fadeIn = (delay: string): React.CSSProperties => ({
  animation: `fadeIn 0.8s ease-out ${delay} both`,
})

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative w-full h-screen">
        <img
          src={cover}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-center justify-end pr-48">
          <h1
            className="text-6xl font-extrabold leading-tight max-w-lg text-right [&>br]:leading-none"
            style={{ fontFamily: 'Inter, sans-serif', color: '#def930', ...slideFromRight('0s') }}
          >
            LOREM IPSUM DOLOR SIT AMET CONSECTETUR
            <br />
            <span style={{ color: '#ffffff', fontFamily: 'Inter, sans-serif', fontSize: '20px', fontWeight: 200, lineHeight: '1.4', display: 'block', marginTop: '8px', ...slideFromRight('0.2s') }}>
              Vitae posuere integer nisl gravida quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat 
              Duis aute irure dolor in
            </span>

            <span style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                className="btn-primary"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#11ae23', color: '#ffffff', fontWeight: 600, fontSize: '15px', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', border: 'none', ...fadeIn('0.5s') }}
              >
                View Terminals
              </button>
              <button
                className="btn-outline"
                style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'transparent', color: '#def930', fontWeight: 600, fontSize: '15px', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', border: '2px solid #def930', ...fadeIn('0.7s') }}
              >
                Check Schedule
              </button>
            </span>
          </h1>
        </div>
      </section>
    </div>
  )
}
