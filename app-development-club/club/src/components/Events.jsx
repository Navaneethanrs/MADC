import { events } from '../data/events'
import { SectionHeading } from './Platforms'

export default function Events() {
  return (
    <section id="events" className="relative bg-void py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="$ cat schedule.log"
          title="What's next."
          copy="We meet weekly during the semester, plus one build jam per term. Same room every week — Engineering 220 — so you never have to hunt for it."
        />

        <ol className="relative mt-14 space-y-8 border-l border-white/10 pl-8">
          {events.map((e, i) => (
            <li key={e.id} className="relative">
              <span
                className="absolute -left-[calc(2rem+1px)] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-blue/40 bg-void font-mono text-[11px] text-blue-bright"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="font-mono text-xs text-cyan">{e.when}</span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-text-faint">
                  {e.tag}
                </span>
              </div>
              <h3 className="mt-1 font-display text-lg font-700 text-text">{e.title}</h3>
              <p className="mt-1 text-sm text-text-dim">{e.where}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
