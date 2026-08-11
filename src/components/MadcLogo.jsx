import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function MadcLogo({ className = 'h-8 sm:h-9 md:h-10', showSubtitle = false, lightMode }) {
  let isLight = lightMode
  try {
    const context = useTheme()
    if (lightMode === undefined && context) {
      isLight = context.theme === 'light'
    }
  } catch (e) {
    // fallback
  }

  const primaryColor = isLight ? '#0D1712' : '#FFFFFF'
  const greenColor = isLight ? '#00A843' : '#00FF66'
  const subtextColor = isLight ? '#1B2E24' : '#E5E7EB'

  return (
    <div className={`inline-flex flex-col items-start justify-center flex-shrink-0 select-none ${className}`}>
      <svg
        viewBox="0 0 460 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-auto h-full max-h-full min-w-[110px] sm:min-w-[130px] ${
          isLight
            ? 'drop-shadow-[0_1px_4px_rgba(0,168,67,0.2)]'
            : 'drop-shadow-[0_0_12px_rgba(0,255,102,0.4)]'
        }`}
      >
        {/* --- LETTER M --- */}
        <path
          d="M 20 120 L 20 20 L 45 20 L 65 75 L 85 20 L 110 20 L 110 120 L 88 120 L 88 50 L 71 95 L 59 95 L 42 50 L 42 120 Z"
          fill={primaryColor}
        />
        {/* M Neon Green Slash Accent */}
        <path
          d="M 46 45 L 65 88 L 73 88 L 52 45 Z"
          fill={greenColor}
        />

        {/* --- LETTER A (ANDROID MASCOT) --- */}
        <g id="android-a">
          {/* Antennas */}
          <line x1="165" y1="26" x2="152" y2="10" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />
          <line x1="215" y1="26" x2="228" y2="10" stroke={primaryColor} strokeWidth="6" strokeLinecap="round" />

          {/* Android Head */}
          <path
            d="M 152 42 C 152 24 228 24 228 42 Z"
            fill={primaryColor}
          />
          {/* Head Eyes */}
          <circle cx="170" cy="34" r="3.5" fill={greenColor} />
          <circle cx="210" cy="34" r="3.5" fill={greenColor} />

          {/* Side Ears / Caps */}
          <rect x="142" y="44" width="7" height="18" rx="3.5" fill={primaryColor} />
          <rect x="231" y="44" width="7" height="18" rx="3.5" fill={primaryColor} />

          {/* Body */}
          <rect x="152" y="46" width="76" height="54" rx="4" fill={primaryColor} />
          
          {/* Arms */}
          <rect x="138" y="52" width="10" height="38" rx="5" fill={primaryColor} />
          <rect x="232" y="52" width="10" height="38" rx="5" fill={primaryColor} />

          {/* Legs */}
          <rect x="164" y="98" width="14" height="22" rx="4" fill={primaryColor} />
          <rect x="202" y="98" width="14" height="22" rx="4" fill={primaryColor} />

          {/* Neon Green Face/Chest Screen */}
          <rect x="160" y="52" width="60" height="42" rx="6" fill={greenColor} />
          {/* Inner Circuit/Tools Detail inside Green Screen */}
          <path
            d="M 168 62 H 212 M 168 73 H 202 M 174 84 H 212"
            stroke="#050806"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="206" cy="73" r="3" fill="#050806" />
          <path d="M 185 68 L 192 78" stroke="#050806" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* --- LETTER D --- */}
        <path
          d="M 258 20 H 305 C 332 20 348 38 348 70 C 348 102 332 120 305 120 H 258 V 20 Z M 282 42 V 98 H 303 C 318 98 325 87 325 70 C 325 53 318 42 303 42 H 282 Z"
          fill={primaryColor}
        />
        {/* D Neon Green Top Border Accent */}
        <path
          d="M 282 20 H 305 C 324 20 336 30 340 42 C 334 33 322 28 305 28 H 282 V 20 Z"
          fill={greenColor}
        />

        {/* --- LETTER C --- */}
        <path
          d="M 430 40 C 418 24 398 20 378 20 C 352 20 335 38 335 70 C 335 102 352 120 378 120 C 400 120 420 112 432 92 L 413 80 C 405 92 393 98 378 98 C 364 98 358 87 358 70 C 358 53 364 42 378 42 C 392 42 404 48 412 60 L 430 40 Z"
          fill={primaryColor}
        />
        {/* Cog/Gear inside C */}
        <g transform="translate(385, 68)">
          <circle cx="0" cy="0" r="10" fill={primaryColor} />
          <circle cx="0" cy="0" r="4" fill="#050806" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <rect
              key={i}
              x="-2"
              y="-14"
              width="4"
              height="5"
              fill={primaryColor}
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
        {/* C Neon Green Bottom Arc Accent */}
        <path
          d="M 370 114 C 390 114 410 108 422 92 L 413 84 C 403 98 388 104 370 104 Z"
          fill={greenColor}
        />
      </svg>

      {showSubtitle && (
        <span 
          className="block font-mono font-extrabold text-[8px] sm:text-[10px] md:text-[11px] tracking-[0.18em] sm:tracking-[0.35em] uppercase text-center mt-1"
          style={{ color: subtextColor }}
        >
          MOBILE APPLICATION DEVELOPMENT CLUB
        </span>
      )}
    </div>
  )
}
