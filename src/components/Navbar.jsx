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
    <header
      className={`sticky top-0 z-50 w-full py-3.5 px-4 sm:px-8 md:px-16 transition-all ${
        isMobileMenuOpen
          ? 'bg-[#050906] border-b border-white/10 shadow-2xl nav-open-header'
          : 'bg-transparent backdrop-blur-md'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex-shrink-0 min-w-[120px] hover:opacity-95 transition-opacity z-50">
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
        <div className="hidden lg:flex items-center gap-3">
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
        <div className="flex lg:hidden items-center gap-2 sm:gap-3 flex-shrink-0 z-50">
          <ThemeToggle />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/20 bg-black/90 text-text hover:text-green hover:border-green flex items-center justify-center transition-all duration-300 flex-shrink-0 focus:outline-none shadow-lg cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5 text-green-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu - Solid Opaque Background */}
      {isMobileMenuOpen && (
        <div
          className="mobile-drawer fixed top-[60px] sm:top-[64px] left-0 right-0 bottom-0 z-40 bg-[#050906] flex flex-col justify-between p-6 animate-fade-in border-t border-white/10 lg:hidden overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileMenuOpen(false)
          }}
        >
          <div className="space-y-6 pt-4">
            <div className="font-mono text-[11px] text-green-bright font-bold uppercase tracking-widest px-2 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              Navigation Menu
            </div>

            <nav className="flex flex-col space-y-3 font-mono text-base">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  currentPath === '/'
                    ? 'bg-green/15 border-green text-green-bright font-bold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                    : 'border-white/10 text-text bg-black/40 hover:bg-white/5'
                }`}
              >
                <span>Home</span>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/features"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  currentPath === '/features'
                    ? 'bg-green/15 border-green text-green-bright font-bold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                    : 'border-white/10 text-text bg-black/40 hover:bg-white/5'
                }`}
              >
                <span>Inside MADC</span>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/achievements"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  currentPath === '/achievements'
                    ? 'bg-green/15 border-green text-green-bright font-bold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                    : 'border-white/10 text-text bg-black/40 hover:bg-white/5'
                }`}
              >
                <span>Achievements</span>
                <span>&rarr;</span>
              </Link>

              <Link
                to="/team"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                  currentPath === '/team'
                    ? 'bg-green/15 border-green text-green-bright font-bold shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                    : 'border-white/10 text-text bg-black/40 hover:bg-white/5'
                }`}
              >
                <span>Our Team</span>
                <span>&rarr;</span>
              </Link>
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3 mt-6">
            <a
              href="https://www.instagram.com/madc_of_kec?igsh=MWhmNzR1cnNmeWp5MQ=="
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-2xl font-mono text-sm font-bold flex items-center justify-center gap-2 text-white bg-gradient-to-r from-pink-600 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @madc_of_kec
            </a>

            <a
              href="/#join"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 rounded-2xl font-mono text-sm font-bold text-center block text-black bg-gradient-to-r from-green to-emerald-400 shadow-[0_0_25px_rgba(0,255,102,0.4)]"
            >
              Join MADC Club &rarr;
            </a>

            <div className="text-center font-mono text-[10.5px] text-text-faint pt-2">
              Mobile Application Development Club &bull; KEC
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
