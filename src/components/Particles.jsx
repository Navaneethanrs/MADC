import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { makeDotTexture } from '../utils/geometry'

const PALETTE = [
  [0.31, 0.49, 1],
  [0.61, 0.36, 1],
  [0.29, 0.91, 1],
]

export default function Particles() {
  const pointsRef = useRef()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 760
  const count = isMobile ? 260 : 650

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      colors[i * 3] = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
    }
    return { positions, colors }
  }, [count])

  const dotTexture = useMemo(() => new THREE.CanvasTexture(makeDotTexture()), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = t * 0.015
    pointsRef.current.rotation.x = t * 0.006
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        map={dotTexture}
        transparent
        opacity={0.75}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
