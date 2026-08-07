export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left lg:px-10">
        <p className="font-mono text-xs text-text-faint">
          <span className="text-cyan">&gt;</span> app.dev.club — est. this semester
        </p>
        <div className="flex gap-6 font-mono text-xs text-text-dim">
          <a href="#top" className="hover:text-text">
            back to top
          </a>
          <a href="mailto:hello@appdevclub.edu" className="hover:text-text">
            hello@appdevclub.edu
          </a>
        </div>
      </div>
    </footer>
  )
}
