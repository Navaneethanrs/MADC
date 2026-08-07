import { platforms } from '../data/platforms'

export default function Platforms() {
  return (
    <section id="platforms" className="relative bg-void py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="$ ls platforms/"
          title="Six platforms, one club."
          copy="Every workshop and project track maps to one of these. Pair up with people learning the same stack, or jump between them — most members do."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <div
              key={p.id}
              className="group rounded-2xl border border-white/5 bg-deep/60 p-6 transition-colors hover:border-white/10"
            >
              <div className="mb-4 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: p.color }}
                />
                <h3 className="font-display text-lg font-700 text-text">{p.label}</h3>
              </div>
              <p className="mb-4 text-sm text-text-dim">{p.note}</p>
              <code className="block truncate rounded-lg bg-void/80 px-3 py-2 font-mono text-xs text-text-dim">
                <span style={{ color: p.color }}>$</span> {p.command}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-800 text-text sm:text-4xl">{title}</h2>
      {copy && <p className="mt-4 text-text-dim">{copy}</p>}
    </div>
  )
}
