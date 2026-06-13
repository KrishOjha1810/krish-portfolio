import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * A drifting 3D "node network" - points connected by faint links - that
 * parallaxes toward the cursor. Reads as a blockchain / graph motif behind the
 * hero. Default export is the full <Canvas> so it can be lazy-loaded.
 */
function Network({ count = 120, radius = 7 }: { count?: number; radius?: number }) {
  const group = useRef<THREE.Group>(null)

  const { positions, linePositions } = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < count; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * radius * 2,
          (Math.random() - 0.5) * radius * 2,
          (Math.random() - 0.5) * radius * 1.2,
        ),
      )
    }
    const pos = new Float32Array(count * 3)
    pts.forEach((p, i) => {
      pos[i * 3] = p.x
      pos[i * 3 + 1] = p.y
      pos[i * 3 + 2] = p.z
    })
    const lines: number[] = []
    const threshold = 2.6
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < threshold) {
          lines.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }
    return { positions: pos, linePositions: new Float32Array(lines) }
  }, [count, radius])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    // slow auto-rotation + cursor parallax (eased)
    group.current.rotation.y += (t * 0 + state.pointer.x * 0.35 - group.current.rotation.y) * 0.04 + 0.0008
    group.current.rotation.x += (state.pointer.y * 0.25 - group.current.rotation.x) * 0.04
  })

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.14} color="#EAF2F8" sizeAttenuation transparent opacity={1} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#b14bff" transparent opacity={0.55} />
      </lineSegments>
    </group>
  )
}

export default function HeroNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Network />
    </Canvas>
  )
}
