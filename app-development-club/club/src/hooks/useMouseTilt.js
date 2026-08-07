import { useEffect, useRef } from 'react'

/**
 * Tracks normalized mouse position in [-1, 1] on both axes, relative to the
 * viewport center. Returns a ref (not state) so consumers can read it inside
 * an animation loop (e.g. useFrame) without triggering React re-renders.
 */
export function useMouseTilt() {
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    function handleMove(e) {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return target
}
