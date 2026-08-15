import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { createRoundedBoxGeometry, drawPhoneScreen, makeGlowTexture } from '../utils/geometry'
import { platforms } from '../data/platforms'
import { useTheme } from '../context/ThemeContext'

const PHONE_D = 0.2

export default function Phone({ angleRef, mouseTilt, activeIndex, phoneScreenPos, isMobile }) {
  const groupRef = useRef()
  const sheenRef = useRef()
  const sheenMatRef = useRef()
  const { camera, size } = useThree()

  const { theme } = useTheme()
  const isLight = theme === 'light'

  const bodyGeo = useMemo(() => createRoundedBoxGeometry(1.85, 3.75, PHONE_D, isMobile ? 0.16 : 0.32), [isMobile])
  const rimGeo = useMemo(() => createRoundedBoxGeometry(1.85, 3.75, PHONE_D, isMobile ? 0.16 : 0.32), [isMobile])
  const screenGeo = useMemo(() => new THREE.PlaneGeometry(1.55, 3.35), [])
  const sheenGeo = useMemo(() => new THREE.PlaneGeometry(0.5, 3.9), [])

  // Canvas texture for the phone "screen"
  const { canvas, texture } = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = isMobile ? 200 : 300
    canvas.height = isMobile ? 400 : 610
    const texture = new THREE.CanvasTexture(canvas)
    return { canvas, texture }
  }, [isMobile])

  const glowTexture = useMemo(() => new THREE.CanvasTexture(makeGlowTexture(isLight)), [isLight])

  useEffect(() => {
    const ctx = canvas.getContext('2d')
    drawPhoneScreen(ctx, platforms[activeIndex], isLight)
    texture.needsUpdate = true
  }, [activeIndex, canvas, texture, isLight])

  // Sheen sweep loop (skip on mobile to save GPU cycles)
  useEffect(() => {
    if (isMobile) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !sheenRef.current) return

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4 })
    tl.set(sheenRef.current.position, { x: -1.3 })
      .to(sheenMatRef.current, { opacity: isLight ? 0.35 : 0.5, duration: 0.3 })
      .to(sheenRef.current.position, { x: 1.3, duration: 1.1, ease: 'power2.inOut' }, '<')
      .to(sheenMatRef.current, { opacity: 0, duration: 0.4 }, '-=0.3')

    return () => tl.kill()
  }, [isLight, isMobile])

  const curTilt = useRef({ x: 0, y: 0 })
  const projected = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    angleRef.current += (reduceMotion || isMobile ? 0.08 : 0.18) * delta

    if (!isMobile) {
      const target = mouseTilt.current
      curTilt.current.x += (target.y * 0.28 - curTilt.current.x) * 0.06
      curTilt.current.y += (target.x * 0.45 - curTilt.current.y) * 0.06
    }

    const g = groupRef.current
    if (!g) return

    g.rotation.y = angleRef.current * 0.5 + curTilt.current.y
    g.rotation.x = curTilt.current.x * 0.6
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.02
    g.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.16

    // project phone center to screen-space pixels
    projected.set(0, 0, 0).applyMatrix4(g.matrixWorld).project(camera)
    phoneScreenPos.current.x = (projected.x * 0.5 + 0.5) * size.width
    phoneScreenPos.current.y = (-projected.y * 0.5 + 0.5) * size.height
  })

  return (
    <group ref={groupRef}>
      {/* body */}
      <mesh geometry={bodyGeo}>
        {isMobile ? (
          <meshStandardMaterial
            color={isLight ? '#e6f4ea' : '#08140c'}
            metalness={isLight ? 0.35 : 0.6}
            roughness={isLight ? 0.2 : 0.25}
          />
        ) : (
          <meshPhysicalMaterial
            color={isLight ? '#e6f4ea' : '#08140c'}
            metalness={isLight ? 0.35 : 0.6}
            roughness={isLight ? 0.12 : 0.14}
            clearcoat={1}
            clearcoatRoughness={0.05}
            reflectivity={1}
            transmission={isLight ? 0.02 : 0.08}
            ior={1.4}
          />
        )}
      </mesh>

      {/* rim glow shell */}
      <mesh geometry={rimGeo} scale={[1.045, 1.03, 1.4]}>
        <meshBasicMaterial
          color={isLight ? '#00a843' : '#00ff66'}
          transparent
          opacity={isLight ? 0.4 : 0.28}
          side={THREE.BackSide}
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* screen */}
      <mesh geometry={screenGeo} position={[0, 0, PHONE_D / 2 + 0.02]}>
        <meshBasicMaterial map={texture} transparent />
      </mesh>

      {/* sheen sweep */}
      {!isMobile && (
        <mesh
          ref={sheenRef}
          geometry={sheenGeo}
          position={[-1.3, 0, PHONE_D / 2 + 0.03]}
          rotation={[0, 0, 0.28]}
        >
          <meshBasicMaterial
            ref={sheenMatRef}
            color={isLight ? '#00a843' : '#ffffff'}
            transparent
            opacity={0}
            blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* halo glow sprite */}
      <sprite scale={isMobile ? [4.5, 4.5, 1] : [6.5, 6.5, 1]} position={[0, 0, -0.6]}>
        <spriteMaterial
          map={glowTexture}
          transparent
          opacity={isLight ? 0.6 : 0.85}
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>
    </group>
  )
}
