import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Phone from './Phone'
import Particles from './Particles'
import Lights from './Lights'

export default function Scene({ angleRef, mouseTilt, activeIndex, phoneScreenPos }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 38 }}
      dpr={isMobile ? 1 : [1, 1.5]}
      gl={{ 
        alpha: true, 
        antialias: !isMobile, 
        powerPreference: 'high-performance',
        precision: isMobile ? 'mediump' : 'highp'
      }}
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    >
      <Lights />
      <Phone
        angleRef={angleRef}
        mouseTilt={mouseTilt}
        activeIndex={activeIndex}
        phoneScreenPos={phoneScreenPos}
        isMobile={isMobile}
      />
      <Particles isMobile={isMobile} />
    </Canvas>
  )
}
