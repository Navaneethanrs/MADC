import { Canvas } from '@react-three/fiber'
import Phone from './Phone'
import Particles from './Particles'
import Lights from './Lights'

export default function Scene({ angleRef, mouseTilt, activeIndex, phoneScreenPos }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 38 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    >
      <Lights />
      <Phone
        angleRef={angleRef}
        mouseTilt={mouseTilt}
        activeIndex={activeIndex}
        phoneScreenPos={phoneScreenPos}
      />
      <Particles />
    </Canvas>
  )
}
