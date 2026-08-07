import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Scene from './Scene'
import OrbitCardsOverlay from './OrbitCardsOverlay'
import { platforms } from '../data/platforms'
import { useMouseTilt } from '../hooks/useMouseTilt'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const reduced = useReducedMotion()
  const mouseTiltRef = useMouseTilt()
  const angleRef = useRef(0)
  const screenPosRef = useRef({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = useState(0)

  const rootRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const chipsRef = useRef(null)
  const sceneWrapRef = useRef(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(eyebrowRef.current, { opacity: 0, y: 14, duration: 0.5 })
        .from(headlineRef.current, { opacity: 0, y: 28, duration: 0.7 }, '-=0.25')
        .from(subRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from(chipsRef.current?.children || [], {
          opacity: 0,
          y: 14,
          stagger: 0.08,
          duration: 0.5,
        }, '-=0.35')
        .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.4')
        .from(sceneWrapRef.current, { opacity: 0, scale: 0.92, duration: 0.9 }, '-=0.9')
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  const activePlatform = platforms[activeIndex]

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative min-h-screen overflow-hidden bg-void"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-blue/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-violet/20 blur-[130px]" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-28 lg:grid-cols-2 lg:gap-4 lg:px-10">
        {/* copy */}
        <div className="relative z-10 max-w-xl">
          <p
            ref={eyebrowRef}
            className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-cyan"
          >
            $ App Development Club
          </p>
          <h1
            ref={headlineRef}
            className="font-display text-4xl font-800 leading-[1.05] text-text sm:text-5xl lg:text-6xl"
          >
            Ship an app on{' '}
            <span className="bg-gradient-to-r from-blue-bright via-violet to-cyan bg-clip-text text-transparent">
              every platform
            </span>{' '}
            before graduation.
          </h1>
          <p ref={subRef} className="mt-6 text-base leading-relaxed text-text-dim sm:text-lg">
            We're a student-run club for anyone who wants to build real, working
            mobile apps — no experience required. Android, iOS, Flutter, React
            Native, Kotlin Multiplatform, SwiftUI: pick a card, meet the
            platform, come build with us.
          </p>

          <div ref={chipsRef} className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Stat value="140+" label="active members" />
            <Stat value="23" label="apps shipped" />
            <Stat value="6" label="platforms taught" />
          </div>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#join"
              className="rounded-full bg-gradient-to-r from-blue to-violet px-7 py-3 font-display text-sm font-700 text-text shadow-[0_0_30px_-8px_rgba(79,125,255,0.8)] transition-transform hover:scale-[1.03]"
            >
              Join the Club
            </a>
            <a
              href="#projects"
              className="font-mono text-sm text-text-dim underline decoration-faint underline-offset-4 transition-colors hover:text-cyan"
            >
              see what we've built &rarr;
            </a>
          </div>
        </div>

        {/* 3D phone + orbit cards */}
        <div
          ref={sceneWrapRef}
          className="relative z-0 mx-auto h-[420px] w-full max-w-md sm:h-[560px] lg:h-[680px]"
        >
          <Scene
            platforms={platforms}
            activeIndex={activeIndex}
            angleRef={angleRef}
            mouseTiltRef={mouseTiltRef}
            screenPosRef={screenPosRef}
            reduced={reduced}
          />
          <OrbitCardsOverlay
            platforms={platforms}
            angleRef={angleRef}
            screenPosRef={screenPosRef}
            onActiveChange={setActiveIndex}
            reduced={reduced}
          />
        </div>
      </div>

      {/* running command, echoing the phone screen */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <p className="font-mono text-xs text-text-faint">
          now showing: <span style={{ color: activePlatform.color }}>{activePlatform.command}</span>
        </p>
      </div>
    </section>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-2xl font-800 text-text">{value}</div>
      <div className="text-xs text-text-dim">{label}</div>
    </div>
  )
}
