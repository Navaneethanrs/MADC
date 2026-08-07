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
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-text-faint">
          <MadcLogo className="h-7" showSubtitle={false} />
          <span>&copy; {new Date().getFullYear()} MADC. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-green transition-colors">GitHub</a>
            <a href="#" className="hover:text-green transition-colors">Figma</a>
            <a href="#" className="hover:text-green transition-colors">Docs</a>
          </div>
        </div>
      </div>
    </section>
  )
}
