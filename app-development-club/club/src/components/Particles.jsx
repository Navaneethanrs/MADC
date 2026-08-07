import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 220, reduced = false }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current || reduced) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8bb1ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
