import React, { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function CursorGlow() {
  const cursorRef = useRef(null)
  const { theme } = useTheme()
  const isLight = theme === 'light'

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(hover: none)').matches
    if (reduceMotion || isTouch) return

    function handleMove(e) {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-40 rounded-full"
      style={{
        width: 520,
        height: 520,
        margin: '-260px 0 0 -260px',
        background: isLight
          ? 'radial-gradient(circle, rgba(0, 168, 67, 0.22), rgba(5, 150, 105, 0.08) 45%, transparent 70%)'
          : 'radial-gradient(circle, rgba(0, 255, 102, 0.20), rgba(0, 230, 118, 0.08) 45%, transparent 70%)',
        filter: 'blur(4px)',
        willChange: 'transform',
        transition: 'background 0.3s ease',
      }}
    />
  )
}
