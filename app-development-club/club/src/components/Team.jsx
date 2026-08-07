import { team } from '../data/team'
import { SectionHeading } from './Platforms'

export default function Team() {
  return (
    <section id="team" className="relative bg-deep/40 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="$ whoami --all"
          title="Run by the people who show up."
          copy="Officers rotate every year — if you come to enough workshops, there's a good chance you'll be running one."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4">
          {team.map((m) => (
            <div key={m.id} className="text-center">
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full font-display text-lg font-700 text-void sm:h-20 sm:w-20"
                style={{ background: m.color }}
              >
                {m.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <h3 className="font-display text-sm font-700 text-text sm:text-base">
                {m.name}
              </h3>
              <p className="mt-0.5 text-xs text-text-dim">{m.role}</p>
              <p className="mt-1 font-mono text-[11px] text-text-faint">{m.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
