import React, { useState } from 'react'
import MadcLogo from './MadcLogo'

export default function JoinUs() {
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('both')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) {
      setError('Email is required')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section id="join" className="relative py-24 px-6 md:px-16 lg:px-24 bg-void overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-text-faint/15 to-transparent" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08] filter blur-[120px]"
        style={{ background: 'radial-gradient(circle, #00ff66, #00e676, transparent)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div 
          className="p-8 md:p-14 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative"
          style={{
            background: 'rgba(9, 16, 12, 0.55)',
            borderColor: 'rgba(0, 255, 102, 0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Subtle background glow card gradient */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'radial-gradient(circle at 100% 100%, rgba(0, 255, 102, 0.18) 0%, transparent 60%)'
            }}
          />

          <div className="flex-1 text-center md:text-left">
            <span className="font-mono text-xs tracking-[0.3em] text-green-bright uppercase">
              Launch Your Journey
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mt-3 tracking-tight">
              Ready to build <span className="text-gradient">apps</span>?
            </h2>
            <p className="font-body text-sm md:text-base text-text-dim mt-4 leading-relaxed max-w-md">
              Whether you are an experienced mobile developer or writing your first line of code, there is a place for you in our community.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[280px] md:min-w-[380px] relative z-10">
            {submitted ? (
              <div 
                className="p-6 rounded-2xl border text-center transition-all duration-500 animate-fadeIn"
                style={{
                  background: 'rgba(0, 255, 102, 0.05)',
                  borderColor: 'rgba(0, 255, 102, 0.3)',
                }}
              >
                <div className="w-12 h-12 bg-green/10 border border-green/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg text-text">Welcome to the Club!</h3>
                <p className="font-body text-xs text-text-dim mt-2">
                  We have sent details about our next workshop to {email}. See you there!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="user-email" className="sr-only">Email address</label>
                  <input
                    id="user-email"
                    type="email"
                    placeholder="Enter your student email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border text-sm font-body text-text focus:outline-none focus:border-green focus:shadow-[0_0_15px_rgba(0,255,102,0.2)] transition-all"
                    style={{
                      background: 'rgba(5, 8, 6, 0.85)',
                      borderColor: 'rgba(0,255,102,0.15)',
                    }}
                  />
                  {error && (
                    <span className="text-xs text-red-400 mt-1 block font-mono">
                      {error}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setInterest('ios')}
                    className={`flex-1 py-2 px-3 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all ${
                      interest === 'ios' ? 'border-green text-green bg-green/10' : 'border-white/5 text-text-dim hover:text-text'
                    }`}
                  >
                    iOS
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterest('android')}
                    className={`flex-1 py-2 px-3 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all ${
                      interest === 'android' ? 'border-green text-green bg-green/10' : 'border-white/5 text-text-dim hover:text-text'
                    }`}
                  >
                    Android
                  </button>
                  <button
                    type="button"
                    onClick={() => setInterest('both')}
                    className={`flex-1 py-2 px-3 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all ${
                      interest === 'both' ? 'border-green text-green bg-green/10' : 'border-white/5 text-text-dim hover:text-text'
                    }`}
                  >
                    Both
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full font-mono text-xs tracking-wider text-void font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,102,0.4)]"
                  style={{
                    background: 'linear-gradient(100deg,#00ff66,#00e676)',
                  }}
                >
                  Request Invite
                </button>
              </form>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 font-mono text-xs text-text-faint">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <MadcLogo className="h-7" showSubtitle={false} />
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-green-bright font-semibold tracking-wider uppercase text-[11px]">
              Innovate &middot; Build &middot; Deploy
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/madc_of_kec?igsh=MWhmNzR1cnNmeWp5MQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 hover:text-white hover:bg-pink-500 hover:border-pink-500 transition-all duration-300 shadow-[0_0_12px_rgba(236,72,153,0.2)] text-[11px] font-bold"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @madc_of_kec
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-text-dim text-[11px] sm:text-xs">
            <span>Developed by</span>
            <span className="text-green-bright font-bold hover:underline cursor-pointer">
              Navaneethan RS
            </span>
          </div>
        </footer>
      </div>
    </section>
  )
}
