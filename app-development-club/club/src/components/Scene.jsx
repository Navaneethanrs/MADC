import { Canvas, useFrame } from '@react-three/fiber'
import Lights from './Lights'
import Particles from './Particles'
import Phone from './Phone'

/** Advances the shared angleRef every frame. Lives inside the Canvas so it
 * can use useFrame; the HTML orbit overlay reads the same ref from outside. */
function AngleDriver({ angleRef, reduced }) {
  useFrame((_, delta) => {
    const speed = reduced ? 0.03 : 0.22
    angleRef.current += delta * speed
  })
  return null
}

export default function Scene({
  platforms,
  activeIndex,
  angleRef,
  mouseTiltRef,
  screenPosRef,
  reduced,
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <Lights />
      <Particles reduced={reduced} count={reduced ? 60 : 220} />
      <Phone
        platforms={platforms}
        activeIndex={activeIndex}
        mouseTiltRef={mouseTiltRef}
        screenPosRef={screenPosRef}
        reduced={reduced}
      />
      <AngleDriver angleRef={angleRef} reduced={reduced} />
    </Canvas>
  )
}
