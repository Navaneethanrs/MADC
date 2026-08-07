import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      title={isLight ? 'Switch to Dark Cyber Green Theme' : 'Switch to Mint Cream Light Theme'}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
        isLight
          ? 'bg-white/90 border-[#00A843]/30 text-[#0d1712] shadow-md hover:border-[#00A843]'
          : 'bg-[#09100c]/80 border-green/30 text-text hover:border-green hover:shadow-[0_0_15px_rgba(0,255,102,0.3)]'
      } ${className}`}
    >
      <span className="w-4 h-4 flex items-center justify-center">
        {isLight ? (
          /* Sun Icon */
          <svg viewBox="0 0 24 24" fill="none" stroke="#00A843" strokeWidth="2.5" className="w-4 h-4">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          /* Moon Icon */
          <svg viewBox="0 0 24 24" fill="none" stroke="#00FF66" strokeWidth="2.5" className="w-4 h-4">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </span>
      <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
        {isLight ? 'Mint Mode' : 'Cyber Mode'}
      </span>
    </button>
  )
}
