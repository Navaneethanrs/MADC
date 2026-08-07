import { useState } from 'react'
import { platforms } from '../data/platforms'

export default function Join() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="join" className="relative bg-void py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/10 blur-[140px]" />

      <div className="relative mx-auto max-w-2xl px-6 lg:px-10">
        <div className="mb-8 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            $ npm install membership
          </p>
          <h2 className="font-display text-3xl font-800 text-text sm:text-4xl">
            Join the club.
          </h2>
          <p className="mt-4 text-text-dim">
            Free to join, open to every major, zero experience required.
            First workshop is a good place to start.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-deep/70 shadow-[0_0_60px_-20px_rgba(79,125,255,0.4)]">
          <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd93d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#6bffb0]" />
            <span className="ml-3 font-mono text-xs text-text-faint">join.sh</span>
          </div>

          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="font-mono text-sm">
                <p className="text-cyan">$ ./join.sh --confirm</p>
                <p className="mt-3 text-text">
                  {'>'} welcome, {name || 'friend'}. check your inbox for the next
                  meeting time.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Field label="name" htmlFor="name">
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="terminal-input"
                  />
                </Field>
                <Field label="email" htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="ada@school.edu"
                    className="terminal-input"
                  />
                </Field>
                <Field label="platform" htmlFor="platform">
                  <select id="platform" defaultValue="" className="terminal-input">
                    <option value="" disabled>
                      choose one to start
                    </option>
                    {platforms.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                    <option value="undecided">not sure yet</option>
                  </select>
                </Field>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-gradient-to-r from-blue to-violet py-3 font-mono text-sm font-600 text-text transition-transform hover:scale-[1.01]"
                >
                  run --join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 flex items-center gap-2 font-mono text-xs text-text-dim">
        <span className="text-cyan">$</span> {label}
      </span>
      {children}
    </label>
  )
}
