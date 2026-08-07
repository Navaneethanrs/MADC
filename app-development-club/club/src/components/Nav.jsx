const links = [
  { href: '#platforms', label: 'Platforms' },
  { href: '#projects', label: 'Projects' },
  { href: '#events', label: 'Events' },
  { href: '#team', label: 'Team' },
]

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-void/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="font-mono text-sm font-600 tracking-tight text-text">
          <span className="text-cyan">&gt;</span> app.dev.club
        </a>
        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-text-dim transition-colors hover:text-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#join"
          className="rounded-full border border-blue/40 px-4 py-1.5 font-mono text-xs text-blue-bright transition-colors hover:border-blue hover:text-text"
        >
          Join
        </a>
      </nav>
    </header>
  )
}
