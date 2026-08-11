import React, { useEffect } from 'react'

export default function AchievementModal({ photo, onClose, onNext, onPrev, totalCount, currentIndex }) {
  if (!photo) return null

  const {
    title,
    subtitle,
    tag,
    year = 'MADC 2K25',
    image,
    badgeColor = '#00ff66',
    glow = 'rgba(0, 255, 102, 0.35)',
    date,
    location,
    description,
    isFullCard,
  } = photo

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext()
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, onNext, onPrev])

  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in select-none bg-black/90 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      {/* Ambient glow orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 filter blur-[140px]"
        style={{ background: `radial-gradient(circle, ${badgeColor}, transparent)` }}
      />

      {/* Floating Previous Button */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="fixed left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black text-white hover:text-green-bright hover:border-green shadow-2xl transition-all duration-300 flex items-center justify-center font-mono text-2xl z-50 cursor-pointer modal-nav-prev"
          title="Previous Photo (Left Arrow)"
        >
          &#8249;
        </button>
      )}

      {/* Floating Next Button */}
      {onNext && (
        <button
          onClick={onNext}
          className="fixed right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black text-white hover:text-green-bright hover:border-green shadow-2xl transition-all duration-300 flex items-center justify-center font-mono text-2xl z-50 cursor-pointer modal-nav-next"
          title="Next Photo (Right Arrow)"
        >
          &#8250;
        </button>
      )}

      {/* Main Solid Opaque Modal Card */}
      <div
        className="modal-card relative w-full max-w-3xl rounded-3xl border overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 sm:p-8 md:p-9 transition-all duration-300 z-10 my-auto max-h-[90vh] overflow-y-auto achievement-modal-card bg-[#09100c]"
        style={{
          backgroundColor: '#09100c',
          borderColor: badgeColor,
          boxShadow: `0 0 50px ${glow}, 0 30px 80px rgba(0, 0, 0, 0.95)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-black/80 text-text-dim hover:text-white hover:border-green transition-all duration-300 flex items-center justify-center font-mono text-lg z-30 cursor-pointer"
          title="Close (Esc)"
        >
          &times;
        </button>

        {/* Left Section: Full Edge-to-Edge Image Box */}
        <div className="relative flex-shrink-0 flex flex-col items-center justify-center w-full md:w-72">
          <div
            className="w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border-2 shadow-2xl relative group bg-black flex items-center justify-center p-0 photo-box"
            style={{
              borderColor: badgeColor,
              boxShadow: `0 0 25px ${glow}`,
            }}
          >
            <img
              src={image}
              alt={title}
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="mt-3.5 flex items-center gap-2 flex-wrap justify-center">
            <span
              className="font-mono text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full border shadow-md text-center modal-role-badge"
              style={{
                borderColor: badgeColor,
              }}
            >
              {tag}
            </span>
            <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full border text-text-dim achievement-modal-counter">
              PHOTO {currentIndex + 1} OF {totalCount}
            </span>
          </div>
        </div>

        {/* Right Section: Details Panel */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center space-y-3.5 min-w-0 w-full">
          <div>
            <span className="font-mono text-[11px] tracking-widest text-green-bright uppercase block mb-1 font-semibold">
              {year} &bull; MEMORIES
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text tracking-tight uppercase leading-snug break-words">
              {title}
            </h3>
            <p className="font-mono text-xs text-green-bright font-medium mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* Date & Location Info */}
          <div className="pt-2 border-t border-white/10 font-mono text-xs text-text-dim flex flex-wrap items-center justify-center md:justify-start gap-4">
            {date && (
              <span className="flex items-center gap-1">
                <span>📅</span> <span className="text-text">{date}</span>
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1">
                <span>📍</span> <span className="text-text">{location}</span>
              </span>
            )}
          </div>

          {/* Description Box */}
          <p className="font-body text-xs sm:text-sm text-text-dim leading-relaxed p-4 rounded-xl border border-white/5 break-words achievement-modal-desc bg-black/60">
            {description}
          </p>

          {/* Footer note */}
          <div className="pt-3 border-t border-white/10 text-[10.5px] font-mono text-text-faint flex items-center justify-between">
            <span>Press Esc or use &#8249; &#8250; keys</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl font-mono text-xs font-bold text-black bg-gradient-to-r from-green to-emerald-400 hover:brightness-110 transition-all shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
