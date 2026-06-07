import { useEffect, useRef, useState } from 'react'

interface CustomSelectProps {
  options: string[]
  value: string
  onChange: (val: string) => void
  placeholder: string
}

export default function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-sm text-left flex items-center justify-between gap-2 transition-all duration-150 cursor-pointer focus:outline-none"
        style={{
          fontFamily: 'Inter, sans-serif',
          color: value ? '#374151' : '#9ca3af',
          boxShadow: open ? '0 0 0 2px #11ae23' : undefined,
          borderColor: open ? '#11ae23' : undefined,
        }}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          className="w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <ul
          className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 py-2 max-h-60 overflow-y-auto"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {options.map(opt => (
            <li
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className="px-4 py-2.5 text-sm cursor-pointer transition-colors duration-100 rounded-xl mx-1"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: opt === value ? 700 : 400,
                color: opt === value ? '#11ae23' : '#374151',
                backgroundColor: opt === value ? '#f0fdf4' : 'transparent',
              }}
              onMouseEnter={e => {
                if (opt !== value) (e.currentTarget as HTMLElement).style.backgroundColor = '#f9fafb'
              }}
              onMouseLeave={e => {
                if (opt !== value) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
