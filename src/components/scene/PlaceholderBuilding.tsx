import { useRef, useLayoutEffect } from 'react'
import { Text, Edges } from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import { useSceneStore } from '@/store/useSceneStore'
import type { FlatRecord, TunnelRecord } from '@/types/flat'
import type { IntersectionResult } from '@/types/intersection'
import IntersectionHighlight from './IntersectionHighlight'

const FLOOR_HEIGHT = 1
const DEPTH_SCALE = 0.25 // visual scale only — not to real-world proportions
const FLAT_POSITIONS: [number, number][] = [
  [-0.85, -0.85],
  [0.85, -0.85],
  [-0.85, 0.85],
  [0.85, 0.85],
]

// Sleeker, glassy architectural colors
const DEFAULT_COLOR = new THREE.Color('#38bdf8') // Sky blue glass
const SELECTED_COLOR = new THREE.Color('#facc15') // Yellow glow

const boxGeom = new THREE.BoxGeometry(1.5, FLOOR_HEIGHT * 0.85, 1.5)
const defaultMat = new THREE.MeshStandardMaterial({ 
  color: '#ffffff',
  transparent: true,
  opacity: 0.85,
  roughness: 0.1,
  metalness: 0.5,
})

interface PlaceholderBuildingProps {
  flats: FlatRecord[]
  tunnel: TunnelRecord
  intersections: IntersectionResult
}

export default function PlaceholderBuilding({ flats, tunnel, intersections }: PlaceholderBuildingProps) {
  const selectedFlatId = useSceneStore((s) => s.selectedFlatId)
  const setSelectedFlatId = useSceneStore((s) => s.setSelectedFlatId)
  const tunnelY = -tunnel.depthMeters * DEPTH_SCALE

  const meshRef = useRef<THREE.InstancedMesh>(null)
  
  // Use layout effect to apply transforms and colors instantly before paint
  useLayoutEffect(() => {
    if (!meshRef.current) return
    const tempObj = new THREE.Object3D()
    
    flats.forEach((flat, i) => {
      const floorIndex = flat.floor - 1
      const [x, z] = FLAT_POSITIONS[i % 4]
      const isSelected = flat.id === selectedFlatId

      tempObj.position.set(x, floorIndex * FLOOR_HEIGHT + FLOOR_HEIGHT / 2, z)
      tempObj.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObj.matrix)
      meshRef.current!.setColorAt(i, isSelected ? SELECTED_COLOR : DEFAULT_COLOR)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  }, [flats, selectedFlatId])

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    if (e.instanceId === undefined) return
    const flat = flats[e.instanceId]
    setSelectedFlatId(flat.id === selectedFlatId ? null : flat.id)
  }

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[boxGeom, defaultMat, flats.length]}
        onClick={handleClick}
      />

      {/* Underground tunnel (directly beneath building) */}
      <mesh position={[0, tunnelY, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 6, 32]} />
        <meshStandardMaterial color="#57534e" roughness={0.8} />
        <Edges color="#a8a29e" />
      </mesh>

      {/* Depth guide rod moved forward slightly so it's visible */}
      <mesh position={[0, tunnelY / 2, 1.8]}>
        <cylinderGeometry args={[0.02, 0.02, Math.abs(tunnelY), 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <Text position={[0, tunnelY, 2.2]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {`${tunnel.label} — ${tunnel.depthMeters}m deep`}
      </Text>

      {/* Neighboring building causing MINOR conflict (Orange) */}
      <mesh position={[2.5, 1.5, 0.85]}>
        <boxGeometry args={[1.5, 3, 1.5]} />
        <meshStandardMaterial color="#ea580c" transparent opacity={0.7} />
        <Edges color="#fdba74" />
      </mesh>
      
      {/* Our building's deep foundation causing MAJOR conflict (Red) */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[3.2, 2, 3.2]} />
        <meshStandardMaterial color="#dc2626" transparent opacity={0.6} />
        <Edges color="#fca5a5" />
      </mesh>

      <IntersectionHighlight regions={intersections.regions} />
    </group>
  )
}
