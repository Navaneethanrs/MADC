import React, { useEffect, useState } from 'react'
import MadcLogo from './MadcLogo'

export default function LoadingScreen({ isFadingOut, onFinish }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 1800 // 1.8 seconds total progress fill time

    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const current = Math.min(Math.floor((elapsed / duration) * 100), 100)
      setProgress(current)

      if (current >= 100) {
        clearInterval(interval)
        if (onFinish) {
          setTimeout(onFinish, 200)
        }
      }
    }, 30)

    return () => clearInterval(interval)
  }, [onFinish])

  const getStatusText = (val) => {
    if (val < 30) return 'INITIALIZING CORE...'
    if (val < 65) return 'LOADING ASSETS...'
    if (val < 95) return 'PREPARING EXPERIENCE...'
    return 'SYSTEM READY'
  }

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-all duration-700 ease-out select-none overflow-hidden px-4 min-h-[100dvh] w-full ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #0a1b12 0%, #050907 60%, #020403 100%)',
      }}
    >
      {/* Dynamic Animated Multi-Layer Gradient Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left emerald glow */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full opacity-40 blur-[90px] sm:blur-[120px] animate-[pulse_6s_infinite_ease-in-out]"
          style={{
            background: 'radial-gradient(circle, #00ff66 0%, rgba(0,255,102,0) 70%)',
          }}
        />
        {/* Bottom-right cyan/teal glow */}
        <div
          className="absolute -bottom-[10%] -right-[10%] w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full opacity-35 blur-[90px] sm:blur-[120px] animate-[pulse_8s_infinite_ease-in-out_1s]"
          style={{
            background: 'radial-gradient(circle, #00e5ff 0%, rgba(0,229,255,0) 70%)',
          }}
        />
        {/* Center glowing halo */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[540px] h-[240px] sm:h-[540px] rounded-full opacity-30 blur-[60px] sm:blur-[90px]"
          style={{
            background:
              'radial-gradient(circle, rgba(0,255,102,0.8) 0%, rgba(0,200,100,0.3) 40%, transparent 70%)',
          }}
        />
        {/* Cyber Grid Overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 255, 102, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 102, 0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main Ultra-Responsive Glassmorphic Card */}
      <div className="relative z-10 flex flex-col items-center px-5 sm:px-8 py-6 sm:py-9 rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.09] to-white/[0.02] backdrop-blur-2xl shadow-[0_0_60px_rgba(0,255,102,0.2)] max-w-[340px] xs:max-w-[380px] sm:max-w-md w-full text-center">
        {/* Corner accent glow highlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00ff66]/70 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff]/50 to-transparent" />

        {/* Logo Container with Orbit Ring */}
        <div className="relative mb-5 sm:mb-7 p-2 flex items-center justify-center">
          {/* Animated Orbit Ring */}
          <div
            className="absolute inset-0 rounded-full border border-dashed border-[#00ff66]/40 animate-[spin_12s_linear_infinite]"
            style={{ padding: '6px' }}
          />
          {/* Back glow */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-r from-[#00ff66]/25 via-[#00e5ff]/25 to-[#00ff66]/25 blur-lg animate-pulse" />
          
          <MadcLogo className="relative z-10 h-12 sm:h-16 md:h-20 drop-shadow-[0_0_25px_rgba(0,255,102,0.6)]" showSubtitle={true} />
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#08120c] rounded-full h-2 sm:h-2.5 p-0.5 border border-[#00ff66]/40 shadow-[0_0_20px_rgba(0,255,102,0.25)] relative overflow-hidden mb-4 sm:mb-5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00a843] via-[#00ff66] to-[#00e5ff] transition-all duration-75 ease-out shadow-[0_0_12px_#00ff66] relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 w-full h-full opacity-70"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                animation: 'shimmer 1.5s infinite linear',
              }}
            />
          </div>
        </div>

        {/* Status Info Row */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-wider font-semibold">
          <span className="bg-gradient-to-r from-[#00ff66] via-[#66ffb2] to-[#00e5ff] bg-clip-text text-transparent flex items-center gap-1.5 truncate max-w-[80%]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping inline-block flex-shrink-0" />
            <span className="truncate">{getStatusText(progress)}</span>
          </span>
          <span className="bg-gradient-to-r from-white to-[#a3ffcb] bg-clip-text text-transparent font-extrabold flex-shrink-0">
            {progress}%
          </span>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 px-4 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.35em] uppercase text-[#00ff66]/80 text-center drop-shadow-[0_0_8px_rgba(0,255,102,0.3)]">
        MOBILE APPLICATION DEVELOPMENT CLUB &bull; MADC
      </div>
    </div>
  )
}
