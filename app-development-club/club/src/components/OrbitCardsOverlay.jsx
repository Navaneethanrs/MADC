import { useEffect, useRef, useState } from 'react'

/**
 * Renders the platform cards as real DOM elements positioned every frame
 * from angleRef (shared with the phone's rotation) instead of through React
 * state, so they stay perfectly in sync without a state update per frame.
 * Also draws the SVG line connecting the "front-most" card to the phone,
 * whose screen position is read from screenPosRef (written by Phone.jsx).
 */
export default function OrbitCardsOverlay({
  platforms,
  angleRef,
  screenPosRef,
  onActiveChange,
  reduced,
}) {
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const lineRef = useRef(null)
  const lastActive = useRef(-1)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let raf

    function tick() {
      const container = containerRef.current
      if (!container) {
        raf = requestAnimationFrame(tick)
        return
      }

      const rect = container.getBoundingClientRect()
      const cx = rect.width / 2
      const cy = rect.height / 2
      const radiusX = Math.min(rect.width * 0.42, 320)
      const radiusY = Math.min(rect.height * 0.4, 260)
      const angle = angleRef.current
      const count = platforms.length

      let frontIndex = 0
      let frontZ = -Infinity
      let frontCenterX = cx
      let frontCenterY = cy

      platforms.forEach((p, i) => {
        const cardAngle = angle + (i / count) * Math.PI * 2
        const x = Math.sin(cardAngle) * radiusX
        const z = Math.cos(cardAngle)
        const y = Math.sin(cardAngle * 0.5) * radiusY * 0.18

        const depthScale = 0.72 + ((z + 1) / 2) * 0.4
        const opacity = 0.35 + ((z + 1) / 2) * 0.65
        const centerX = cx + x
        const centerY = cy + y

        const el = cardRefs.current[i]
        if (el) {
          el.style.transform = `translate3d(${centerX - el.offsetWidth / 2}px, ${
            centerY - el.offsetHeight / 2
          }px, 0) scale(${depthScale})`
          el.style.opacity = opacity.toFixed(2)
          el.style.zIndex = String(Math.round((z + 1) * 100))
        }

        if (z > frontZ) {
          frontZ = z
          frontIndex = i
          frontCenterX = centerX
          frontCenterY = centerY
        }
      })

      if (frontIndex !== lastActive.current) {
        lastActive.current = frontIndex
        setActiveIndex(frontIndex)
        onActiveChange?.(frontIndex)
      }

      // energy line: front card center -> phone screen position
      if (lineRef.current && screenPosRef?.current) {
        lineRef.current.setAttribute('x1', frontCenterX)
        lineRef.current.setAttribute('y1', frontCenterY)
        lineRef.current.setAttribute('x2', screenPosRef.current.x)
        lineRef.current.setAttribute('y2', screenPosRef.current.y)
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [platforms, angleRef, screenPosRef, onActiveChange])

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="energyLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4be8ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9b5cff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <line
          ref={lineRef}
          stroke="url(#energyLine)"
          strokeWidth="1.5"
          className={reduced ? '' : 'animate-pulse-slow'}
        />
      </svg>

      {platforms.map((platform, i) => (
        <div
          key={platform.id}
          ref={(el) => (cardRefs.current[i] = el)}
          className="orbit-card absolute left-0 top-0 pointer-events-auto"
          style={{
            borderColor: i === activeIndex ? platform.color : 'transparent',
          }}
        >
          <span
            className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
            style={{ background: platform.color }}
          />
          <span className="align-middle font-mono text-xs text-text sm:text-sm">
            {platform.label}
          </span>
        </div>
      ))}
    </div>
  )
}
