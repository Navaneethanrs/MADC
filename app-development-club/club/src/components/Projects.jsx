import { projects } from '../data/projects'
import { SectionHeading } from './Platforms'

export default function Projects() {
  return (
    <section id="projects" className="relative bg-deep/40 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="$ git log --oneline"
          title="Built by members, not for a grade."
          copy="Every project here started as a workshop idea and got carried past the finish line by whoever showed up on Tuesdays."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.id}
              className="overflow-hidden rounded-2xl border border-white/5 bg-void/60"
            >
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                <span className="font-mono text-xs text-text-dim">{p.file}</span>
                <span
                  className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide"
                  style={{
                    color: p.status === 'Shipped' ? '#4be8ff' : '#c79bff',
                    background:
                      p.status === 'Shipped'
                        ? 'rgba(75,232,255,0.1)'
                        : 'rgba(199,155,255,0.1)',
                  }}
                >
                  {p.status}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-700 text-text">{p.name}</h3>
                <p className="mt-1 font-mono text-xs" style={{ color: p.color }}>
                  {p.stack}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-dim">{p.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
