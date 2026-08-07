import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Lights() {
  const blueRef = useRef()
  const violetRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (blueRef.current) blueRef.current.position.x = -4 + Math.sin(t * 0.3) * 0.6
    if (violetRef.current) violetRef.current.position.x = 4 + Math.cos(t * 0.25) * 0.6
  })

  return (
    <>
      <ambientLight color="#081a10" intensity={1.5} />
      <pointLight ref={blueRef} color="#00ff66" intensity={6} distance={20} position={[-4, 2, 4]} />
      <pointLight ref={violetRef} color="#00e676" intensity={6} distance={20} position={[4, -1, 3]} />
      <pointLight color="#39ff14" intensity={2.5} distance={15} position={[0, 5, 5]} />
    </>
  )
}
