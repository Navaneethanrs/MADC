export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#8bb1ff" />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={8} color="#9b5cff" distance={12} />
      <pointLight position={[4, 3, -2]} intensity={6} color="#4be8ff" distance={12} />
    </>
  )
}
