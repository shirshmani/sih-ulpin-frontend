import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import type { Group } from 'three'

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null)
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((state) => {
    if (!group.current || reducedMotion) return
    const targetX = state.pointer.y * 0.15
    const targetY = state.pointer.x * 0.25
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05
  })

  return <group ref={group}>{children}</group>
}

function WireBuilding() {
  const floors = 6
  return (
    <group position={[0, -1.4, 0]}>
      {Array.from({ length: floors }, (_, i) => (
        <mesh key={i} position={[0, i * 0.55, 0]}>
          <boxGeometry args={[2, 0.45, 2]} />
          <meshBasicMaterial visible={false} />
          <Edges color="#D9A055" />
        </mesh>
      ))}
      <gridHelper args={[8, 16, '#D9A055', '#294B6B']} position={[0, -0.3, 0]} />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [4, 3, 6], fov: 45 }} className="h-full w-full">
      <ambientLight intensity={0.7} />
      <ParallaxRig>
        <WireBuilding />
      </ParallaxRig>
    </Canvas>
  )
}
