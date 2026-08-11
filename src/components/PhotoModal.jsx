import React, { useEffect } from 'react'

export default function PhotoModal({ member, onClose, onNext, onPrev }) {
  if (!member) return null

  const {
    name = '',
    posting = '',
    role = '',
    rollNo = '',
    phone = '',
    image = '',
    initials = '',
    color = '#00ff66',
    glow = 'rgba(0, 255, 102, 0.35)',
    category = '',
    designation = '',
  } = member

  const displayPosting = posting || role || designation || 'OFFICE BEARER'
  const accentColor = color || '#00ff66'

  const isFaculty = displayPosting.toLowerCase().includes('faculty') || designation
  const isCoreExec = displayPosting.toLowerCase().includes('secretary') || displayPosting.toLowerCase().includes('treasurer')

  let memberBio = 'Official member of the Mobile Application Development Club (MADC) Team for 2026-2027.'
  if (isFaculty) {
    memberBio = 'Faculty Coordinator & Mentor guiding MADC students towards technical excellence, innovative problem solving, and industry readiness.'
  } else if (isCoreExec) {
    memberBio = 'Executive Leadership Lead driving mobile app development, technical workshops, student projects, and community innovation at MADC.'
  }

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
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
      style={{
        background: 'rgba(3, 7, 4, 0.90)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 filter blur-[140px]"
        style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
      />

      {/* Outer Floating Previous Button */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="fixed left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/80 text-text hover:text-green-bright hover:border-green hover:bg-green/20 shadow-2xl transition-all duration-300 flex items-center justify-center font-mono text-2xl z-50 cursor-pointer"
          title="Previous Photo (Left Arrow)"
        >
          &#8249;
        </button>
      )}

      {/* Outer Floating Next Button */}
      {onNext && (
        <button
          onClick={onNext}
          className="fixed right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/80 text-text hover:text-green-bright hover:border-green hover:bg-green/20 shadow-2xl transition-all duration-300 flex items-center justify-center font-mono text-2xl z-50 cursor-pointer"
          title="Next Photo (Right Arrow)"
        >
          &#8250;
        </button>
      )}

      {/* Main Modal Container */}
      <div
        className="modal-card relative w-full max-w-3xl rounded-3xl border overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6 sm:p-8 md:p-10 transition-all duration-300 animate-scale-up z-10 my-auto max-h-[90vh] overflow-y-auto"
        style={{
          background: 'rgba(9, 16, 12, 0.94)',
          borderColor: accentColor,
          boxShadow: `0 0 50px ${glow}, 0 25px 60px rgba(0, 0, 0, 0.9)`,
        }}
      >
        {/* Close Button inside modal header */}
        <button
          onClick={onClose}
          className="modal-close-btn absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-black/70 text-text-dim hover:text-white hover:border-green hover:bg-green/20 transition-all duration-300 flex items-center justify-center font-mono text-lg z-30 cursor-pointer"
          title="Close (Esc)"
        >
          &times;
        </button>

        {/* Left Section: Large Image Display */}
        <div className="relative flex-shrink-0 flex flex-col items-center justify-center w-full md:w-auto">
          <div
            className="w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 p-1.5 shadow-2xl relative group"
            style={{
              borderColor: accentColor,
              background: 'rgba(4, 7, 5, 0.95)',
              boxShadow: `0 0 35px ${glow}`,
            }}
          >
            {image ? (
              <img
                src={image}
                alt={name}
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover object-top rounded-xl shadow-inner transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/60 rounded-xl">
                <span
                  className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-widest"
                  style={{ color: accentColor }}
                >
                  {initials || name.slice(0, 2)}
                </span>
              </div>
            )}
          </div>

          <span
            className="modal-role-badge mt-4 font-mono text-[11px] sm:text-xs font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border shadow-lg text-center max-w-full break-words"
            style={{
              background: '#050806',
              color: accentColor,
              borderColor: accentColor,
              boxShadow: `0 0 15px ${glow}`,
            }}
          >
            {displayPosting}
          </span>
        </div>

        {/* Right Section: Details */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center space-y-3.5 min-w-0 w-full">
          <div className="pr-6">
            {category && (
              <span className="font-mono text-[10.5px] sm:text-[11px] tracking-widest text-green-bright uppercase block mb-1">
                {category}
              </span>
            )}
            <h3 className="modal-member-name font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-text tracking-tight uppercase leading-snug break-words">
              {name}
            </h3>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/10 font-mono text-xs text-text-dim">
            {rollNo && (
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="text-text-faint font-semibold">Roll Number:</span>
                <span className="font-bold text-green-bright">{rollNo}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="text-text-faint font-semibold">Contact:</span>
                <a
                  href={`tel:${phone}`}
                  className="font-bold text-text hover:text-green transition-colors"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>

          <p className="font-body text-xs sm:text-sm text-text-dim leading-relaxed pt-1 break-words">
            {memberBio}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="modal-tag-badge font-mono text-[10px] px-3 py-1 rounded-lg border border-green/30 bg-green/10 text-green-bright font-bold">
              MADC 2026-2027
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
