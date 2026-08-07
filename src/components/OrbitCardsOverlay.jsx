import { useEffect, useRef } from 'react'
import { platforms } from '../data/platforms'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 760

export default function OrbitCardsOverlay({ angleRef, phoneScreenPos, activeIndex, onActiveChange }) {
  const cardRefs = useRef([])
  const containerRef = useRef()
  const glowLineRef = useRef()
  const coreLineRef = useRef()
  const lastActive = useRef(-1)

  useEffect(() => {
    let raf
    const RX = () => (isMobile ? Math.min(window.innerWidth * 0.42, 190) : Math.min(window.innerWidth * 0.3, 400))
    const RY = () => (isMobile ? 90 : 130)

    function tick() {
      raf = requestAnimationFrame(tick)
      const container = containerRef.current
      if (!container) return
      const cx = container.clientWidth / 2
      const cy = container.clientHeight / 2
      const rx = RX()
      const ry = RY()

      let bestIdx = 0
      let bestZ = -Infinity
      let bestX = 0
      let bestY = 0

      platforms.forEach((p, i) => {
        const angle = angleRef.current * 0.5 * -1 + (i / platforms.length) * Math.PI * 2
        const x = cx + Math.cos(angle) * rx
        const y = cy + Math.sin(angle) * ry * 0.6 - 10
        const zFactor = (Math.sin(angle) + 1) / 2
        const scale = 0.72 + zFactor * 0.4
        const opacity = 0.35 + zFactor * 0.65
        const blur = (1 - zFactor) * 2.2

        const el = cardRefs.current[i]
        if (el) {
          el.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px) scale(${scale})`
          el.style.opacity = opacity.toFixed(2)
          el.style.filter = `blur(${blur.toFixed(1)}px)`
          el.style.zIndex = Math.round(zFactor * 100)
        }

        if (zFactor > bestZ) {
          bestZ = zFactor
          bestIdx = i
          bestX = x
          bestY = y
        }
      })

      if (bestIdx !== lastActive.current) {
        lastActive.current = bestIdx
        onActiveChange(bestIdx)
        cardRefs.current.forEach((el, i) => el && el.classList.toggle('active', i === bestIdx))
      }

      // connecting energy line
      const color = platforms[bestIdx].color
      const psp = phoneScreenPos.current
      ;[glowLineRef.current, coreLineRef.current].forEach((line) => {
        if (!line) return
        line.setAttribute('x1', psp.x)
        line.setAttribute('y1', psp.y)
        line.setAttribute('x2', bestX)
        line.setAttribute('y2', bestY)
        line.setAttribute('stroke', color)
      })
    }

    tick()
    return () => cancelAnimationFrame(raf)
  }, [angleRef, phoneScreenPos, onActiveChange])

  return (
    <div ref={containerRef} className="absolute inset-0 z-[15] pointer-events-none">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 14 }}>
        <line ref={glowLineRef} strokeWidth="4" opacity="0.35" style={{ filter: 'blur(4px)' }} />
        <line ref={coreLineRef} strokeWidth="1.3" opacity="0.8" />
      </svg>

      {platforms.map((p, i) => (
        <div
          key={p.label}
          ref={(el) => (cardRefs.current[i] = el)}
          className="orbit-card absolute top-0 left-0 flex items-center gap-[9px] rounded-full border pl-[9px] pr-[14px] py-[9px] whitespace-nowrap"
          style={{
            transform: 'translate(-50%,-50%)',
            background: 'rgba(9,16,12,0.65)',
            borderColor: 'rgba(255,255,255,0.09)',
            backdropFilter: 'blur(6px)',
            willChange: 'transform, opacity',
            '--glow': `rgba(${p.glow},0.55)`,
          }}
        >
          <span
            className="w-[26px] h-[26px] rounded-full flex items-center justify-center font-mono text-[10px] font-semibold text-void flex-shrink-0"
            style={{ background: p.color }}
          >
            {p.abbr}
          </span>
          <span>
            <span className="block font-body text-[13px] font-medium text-text">{p.label}</span>
            {!isMobile && (
              <span className="block font-mono text-[10px] text-text-faint mt-[1px]">{p.cmd}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  )
}
