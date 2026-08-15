import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { makeDotTexture } from '../utils/geometry'
import { useTheme } from '../context/ThemeContext'

const DARK_PALETTE = [
  [0.31, 0.49, 1],
  [0.61, 0.36, 1],
  [0.29, 0.91, 1],
]

const LIGHT_PALETTE = [
  [0.0, 0.65, 0.26],
  [0.02, 0.75, 0.4],
  [0.1, 0.5, 0.3],
]

export default function Particles({ isMobile }) {
  const pointsRef = useRef()
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const count = isMobile ? 120 : 650

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = isLight ? LIGHT_PALETTE : DARK_PALETTE
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
    }
    return { positions, colors }
  }, [count, isLight])

  const dotTexture = useMemo(() => new THREE.CanvasTexture(makeDotTexture()), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = t * 0.012
    pointsRef.current.rotation.x = t * 0.005
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isLight ? 0.06 : 0.05}
        map={dotTexture}
        transparent
        opacity={isLight ? 0.55 : 0.75}
        vertexColors
        blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={!isMobile}
      />
    </points>
  )
}
