import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MadcLogo from './MadcLogo'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md py-3.5 px-4 sm:px-8 md:px-16 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="hover:opacity-95 transition-opacity z-50">
          <MadcLogo className="h-8 md:h-10" showSubtitle={false} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs text-text-dim">
          <Link
            to="/"
            className={`transition-colors hover:text-green ${
              currentPath === '/' ? 'text-green font-bold' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/features"
            className={`transition-colors hover:text-green ${
              currentPath === '/features' ? 'text-green font-bold' : ''
            }`}
          >
            Inside MADC
          </Link>
          <Link
            to="/achievements"
            className={`transition-colors hover:text-green ${
              currentPath === '/achievements' ? 'text-green font-bold' : ''
            }`}
          >
            Achievements
          </Link>
          <Link
            to="/team"
            className={`transition-colors hover:text-green ${
              currentPath === '/team' ? 'text-green font-bold' : ''
            }`}
          >
            Our Team
          </Link>
        </nav>

        {/* Desktop Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="/#join"
            className="font-mono text-xs tracking-wide text-text border rounded-full px-4 py-2 transition-all hover:border-green hover:shadow-[0_0_15px_rgba(0,255,102,0.3)]"
            style={{ borderColor: 'rgba(0,255,102,0.25)', background: 'rgba(0,255,102,0.05)' }}
          >
            Join Club
          </a>
        </div>

        {/* Mobile Action & Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-xl border border-white/15 bg-black/60 text-text hover:text-green hover:border-green flex items-center justify-center transition-all duration-300 z-50 focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-[60px] z-40 bg-[#050906]/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-fade-in border-b border-white/10 lg:hidden overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileMenuOpen(false)
          }}
        >
          <div className="space-y-6 pt-4">
            <div className="font-mono text-[11px] text-green-bright font-bold uppercase tracking-widest px-2 mb-2">
              Navigation Menu
            </div>

            <nav className="flex flex-col space-y-3 font-mono text-base">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  currentPath === '/'
                    ? 'bg-green/15 border-green text-green-bright font-bold'
                    : 'border-white/10 text-text hover:bg-white/5'
                }`}
              >
                <span>Home</span>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/features"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  currentPath === '/features'
                    ? 'bg-green/15 border-green text-green-bright font-bold'
                    : 'border-white/10 text-text hover:bg-white/5'
                }`}
              >
                <span>Inside MADC</span>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/achievements"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  currentPath === '/achievements'
                    ? 'bg-green/15 border-green text-green-bright font-bold'
                    : 'border-white/10 text-text hover:bg-white/5'
                }`}
              >
                <span>Achievements</span>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/team"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  currentPath === '/team'
                    ? 'bg-green/15 border-green text-green-bright font-bold'
                    : 'border-white/10 text-text hover:bg-white/5'
                }`}
              >
                <span>Our Team</span>
                <span>&rarr;</span>
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3 mt-6">
            <a
              href="/#join"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-2xl font-mono text-sm font-bold text-center block text-black bg-gradient-to-r from-green to-emerald-400 shadow-[0_0_20px_rgba(0,255,102,0.4)]"
            >
              Join MADC Club &rarr;
            </a>

            <div className="text-center font-mono text-[10.5px] text-text-faint">
              Mobile Application Development Club &bull; 2026-2027
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
