import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from '../context/ThemeContext'

export default function Lights() {
  const blueRef = useRef()
  const violetRef = useRef()
  const { theme } = useTheme()
  const isLight = theme === 'light'

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (blueRef.current) blueRef.current.position.x = -4 + Math.sin(t * 0.3) * 0.6
    if (violetRef.current) violetRef.current.position.x = 4 + Math.cos(t * 0.25) * 0.6
  })

  return (
    <>
      <ambientLight color={isLight ? "#ffffff" : "#081a10"} intensity={isLight ? 2.5 : 1.5} />
      <pointLight
        ref={blueRef}
        color={isLight ? "#00a843" : "#00ff66"}
        intensity={isLight ? 4 : 6}
        distance={20}
        position={[-4, 2, 4]}
      />
      <pointLight
        ref={violetRef}
        color={isLight ? "#059669" : "#00e676"}
        intensity={isLight ? 4 : 6}
        distance={20}
        position={[4, -1, 3]}
      />
      <pointLight
        color={isLight ? "#008837" : "#39ff14"}
        intensity={isLight ? 2 : 2.5}
        distance={15}
        position={[0, 5, 5]}
      />
    </>
  )
}

