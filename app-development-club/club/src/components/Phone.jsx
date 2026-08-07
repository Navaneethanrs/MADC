import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { createRoundedBoxGeometry, drawTerminalTexture } from '../utils/geometry'

/**
 * The floating glass phone. Tilts toward the mouse, screen texture swaps to
 * show the active platform's terminal command, and every frame it projects
 * its own world position into 2D screen pixels (written into screenPosRef)
 * so the HTML overlay can draw an "energy line" from the active orbit card
 * to the phone without the overlay needing to know any 3D math.
 */
export default function Phone({
  platforms,
  activeIndex,
  mouseTiltRef,
  screenPosRef,
  reduced,
}) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const sheenRef = useRef()
  const { size, camera } = useThree()

  const bodyGeometry = useMemo(() => createRoundedBoxGeometry(1.4, 2.9, 0.14, 0.14), [])
  const rimGeometry = useMemo(() => createRoundedBoxGeometry(1.46, 2.96, 0.1, 0.16), [])

  const canvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512
    c.height = 1024
    return c
  }, [])

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [canvas])

  useEffect(() => {
    const platform = platforms[activeIndex]
    if (!platform) return
    drawTerminalTexture(canvas, platform)
    texture.needsUpdate = true
  }, [activeIndex, platforms, canvas, texture])

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.elapsedTime

    // gentle idle float
    const floatY = reduced ? 0 : Math.sin(t * 0.6) * 0.08
    groupRef.current.position.y = floatY

    // tilt toward mouse (lerped for smoothness)
    const target = mouseTiltRef.current
    const targetRotY = reduced ? 0 : target.x * 0.35
    const targetRotX = reduced ? 0 : -target.y * 0.22

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY + (reduced ? 0 : Math.sin(t * 0.25) * 0.06),
      0.06
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06
    )

    // sheen sweep across the glass rim
    if (sheenRef.current && !reduced) {
      const sweep = (Math.sin(t * 0.4) + 1) / 2
      sheenRef.current.material.opacity = 0.08 + sweep * 0.1
    }

    // project world position -> screen pixels for the energy line
    if (screenPosRef && bodyRef.current) {
      const worldPos = new THREE.Vector3()
      bodyRef.current.getWorldPosition(worldPos)
      worldPos.project(camera)
      screenPosRef.current = {
        x: (worldPos.x * 0.5 + 0.5) * size.width,
        y: (-worldPos.y * 0.5 + 0.5) * size.height,
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* outer glass rim */}
      <mesh ref={sheenRef} geometry={rimGeometry}>
        <meshPhysicalMaterial
          color="#0b0e22"
          transparent
          opacity={0.15}
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.3}
          clearcoat={1}
        />
      </mesh>

      {/* body */}
      <mesh ref={bodyRef} geometry={bodyGeometry}>
        <meshPhysicalMaterial
          color="#090b1c"
          roughness={0.35}
          metalness={0.6}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </mesh>

      {/* screen */}
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[1.18, 2.6]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  )
}
