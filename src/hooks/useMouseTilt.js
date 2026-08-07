import { useEffect, useRef } from 'react'

/**
 * Tracks normalized mouse position (-1..1) for use as a tilt target.
 * Returns a ref you can read inside useFrame without causing re-renders.
 */
export function useMouseTilt() {
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    function handleMove(e) {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return target
}

export function useReducedMotion() {
  const ref = useRef(false)
  useEffect(() => {
    ref.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
  return ref
}

export function useIsMobile() {
  const ref = useRef(typeof window !== 'undefined' && window.innerWidth < 760)
  return ref
}
