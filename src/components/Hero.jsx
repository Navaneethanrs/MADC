import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import Scene from './Scene'
import OrbitCardsOverlay from './OrbitCardsOverlay'
import MadcLogo from './MadcLogo'
import ThemeToggle from './ThemeToggle'
import { useMouseTilt } from '../hooks/useMouseTilt'

export default function Hero() {
  const angleRef = useRef(0)
  const phoneScreenPos = useRef({ x: 0, y: 0 })
  const mouseTilt = useMouseTilt()
  const [activeIndex, setActiveIndex] = useState(0)
  const cursorGlowRef = useRef()
  const heroRef = useRef()

  const handleActiveChange = useCallback((idx) => setActiveIndex(idx), [])

  // cursor spotlight, moved via transform for perf (skip on touch / reduced motion)
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (reduceMotion || isTouch) return

    function handleMove(e) {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // entrance animation
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (reduceMotion) {
      tl.to(['.eyebrow', '.headline', '.subhead', '.cta-row', '.scroll-cue', '.stat-chip'], {
        opacity: 1,
        duration: 0.6,
      })
    } else {
      tl.fromTo('.eyebrow', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo('.headline', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
        .fromTo('.subhead', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.cta-row', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo(
          '.orbit-card',
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.08 },
          '-=0.5'
        )
        .fromTo(
          '.stat-chip',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
          '-=0.4'
        )
        .fromTo('.scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
    }

    return () => tl.kill()
  }, [])

  function handleExploreClick() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: window.innerHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section ref={heroRef} className="hero-bg relative w-full h-screen min-h-[640px] overflow-hidden">
      <Scene
        angleRef={angleRef}
        mouseTilt={mouseTilt}
        activeIndex={activeIndex}
        phoneScreenPos={phoneScreenPos}
      />

      <OrbitCardsOverlay
        angleRef={angleRef}
        phoneScreenPos={phoneScreenPos}
        activeIndex={activeIndex}
        onActiveChange={handleActiveChange}
      />

      {/* stat chips */}
      <div
        className="stat-chip absolute z-[16] flex flex-col gap-[2px] px-[18px] py-3 rounded-2xl border opacity-0"
        style={{
          left: '6%',
          top: '58%',
          background: 'rgba(9,16,12,0.65)',
          borderColor: 'rgba(0,255,102,0.2)',
          backdropFilter: 'blur(8px)',
          animation: 'floatChip 6s ease-in-out infinite',
        }}
      >
        <span className="font-display font-bold text-xl text-text">120+</span>
        <span className="font-mono text-[9.5px] tracking-wider text-text-faint uppercase">Members</span>
      </div>
      <div
        className="stat-chip absolute z-[16] flex flex-col gap-[2px] px-[18px] py-3 rounded-2xl border opacity-0"
        style={{
          right: '6%',
          top: '34%',
          background: 'rgba(9,16,12,0.65)',
          borderColor: 'rgba(0,255,102,0.2)',
          backdropFilter: 'blur(8px)',
          animation: 'floatChip 7s ease-in-out infinite 1s',
        }}
      >
        <span className="font-display font-bold text-xl text-text">40+</span>
        <span className="font-mono text-[9.5px] tracking-wider text-text-faint uppercase">Apps Shipped</span>
      </div>

      {/* film grain + vignette */}
      <div className="grain absolute -inset-[2px] pointer-events-none z-[7]" />
      <div
        className="absolute inset-0 pointer-events-none z-[6]"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 45%, transparent 45%, rgba(5,8,6,0.6) 85%, rgba(3,5,4,0.88) 100%)',
        }}
      />

      {/* nav */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-16 py-6">
        <MadcLogo className="h-9 md:h-11" showSubtitle={true} />
        <div className="hidden lg:flex items-center gap-8 font-mono text-xs text-text-dim">
          <Link to="/features" className="hover:text-green transition-colors">Inside MADC</Link>
          <Link to="/achievements" className="hover:text-green transition-colors">Achievements</Link>
          <Link to="/team" className="hover:text-green transition-colors">Our Team</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#join"
            className="hidden md:inline-block font-mono text-xs tracking-wide text-text-dim border rounded-full px-[18px] py-[9px] transition-all hover:text-text hover:border-green hover:shadow-[0_0_20px_rgba(0,255,102,0.3)]"
            style={{ borderColor: 'rgba(0,255,102,0.2)', background: 'rgba(0,255,102,0.04)' }}
          >
            Join the Club
          </a>
        </div>
      </nav>

      {/* hero content */}
      <div className="absolute left-0 right-0 top-[14%] md:top-[16%] z-20 flex flex-col items-center text-center px-5">
        <div className="eyebrow font-mono text-xs tracking-[0.32em] text-green-bright uppercase mb-[18px] opacity-0 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
          Innovate&nbsp;&middot;&nbsp;Build&nbsp;&middot;&nbsp;Deploy
        </div>
        <h1 className="headline font-display font-extrabold text-[38px] md:text-[84px] leading-[1.02] tracking-tight text-text opacity-0">
          Build what's
          <br />
          <span className="text-gradient">next.</span>
        </h1>
        <div className="cta-row mt-[36px] opacity-0">
          <button
            onClick={handleExploreClick}
            className="explore-btn relative font-mono text-[13px] tracking-wide text-void font-bold inline-flex items-center gap-[10px] rounded-full px-[34px] py-[15px] transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,255,102,0.5)]"
            style={{
              background: 'linear-gradient(100deg,#00ff66,#00e676)',
            }}
          >
            Explore
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[14px] h-[14px]">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* scroll cue */}
      <div className="scroll-cue absolute bottom-[34px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-text-faint opacity-0">
        SCROLL
        <div
          className="w-[14px] h-[14px]"
          style={{
            borderRight: '1.5px solid #565f82',
            borderBottom: '1.5px solid #565f82',
            transform: 'rotate(45deg)',
            animation: 'bob 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
