import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MadcLogo from './MadcLogo'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050806]/80 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-16 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="hover:opacity-95 transition-opacity">
          <MadcLogo className="h-8 md:h-10" showSubtitle={false} />
        </Link>

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

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="/#join"
            className="font-mono text-xs tracking-wide text-text border rounded-full px-4 py-2 transition-all hover:border-green hover:shadow-[0_0_15px_rgba(0,255,102,0.3)]"
            style={{ borderColor: 'rgba(0,255,102,0.25)', background: 'rgba(0,255,102,0.05)' }}
          >
            Join Club
          </a>
        </div>
      </div>
    </header>
  )
}
