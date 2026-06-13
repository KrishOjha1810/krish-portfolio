import { Canvas } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

/**
 * A slowly morphing, floating icosahedron with the brand magenta/violet
 * lighting. Used as a section accent. Default export is the full <Canvas> for
 * lazy loading.
 */
function Knot() {
  return (
    <Float speed={1.3} rotationIntensity={1.1} floatIntensity={1.6}>
      <mesh>
        <icosahedronGeometry args={[1.5, 4]} />
        <MeshDistortMaterial
          color="#7b3fb8"
          emissive="#D81FC4"
          emissiveIntensity={0.75}
          roughness={0.2}
          metalness={0.75}
          distort={0.36}
          speed={1.8}
        />
      </mesh>
    </Float>
  )
}

export default function FloatingObject() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 4]} intensity={1.8} />
      <pointLight position={[-4, -2, 2]} color="#D81FC4" intensity={4.5} />
      <pointLight position={[3, -3, 1]} color="#FF7A1A" intensity={2.4} />
      <Knot />
    </Canvas>
  )
}
