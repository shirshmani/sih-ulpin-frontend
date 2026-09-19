import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'
import { useSceneStore } from '@/store/useSceneStore'
import type { IntersectionRegion } from '@/types/intersection'

const SEVERITY_COLOR: Record<IntersectionRegion['severity'], string> = {
  major: '#e05252',
  minor: '#e0a552',
}

function boxCenterAndSize(box: IntersectionRegion['boundingBox']) {
  const [minX, minY, minZ, maxX, maxY, maxZ] = box
  return {
    center: [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2] as [number, number, number],
    size: [maxX - minX, maxY - minY, maxZ - minZ] as [number, number, number],
  }
}

function RegionMarker({ region }: { region: IntersectionRegion }) {
  const ref = useRef<THREE.Mesh>(null)
  const selected = useSceneStore((s) => s.selectedIntersectionId === region.id)
  const setSelected = useSceneStore((s) => s.setSelectedIntersectionId)
  const { center, size } = boxCenterAndSize(region.boundingBox)
  const color = SEVERITY_COLOR[region.severity]

  useFrame((state) => {
    if (!ref.current) return
    const material = ref.current.material as THREE.MeshBasicMaterial
    const pulse = region.severity === 'major' ? Math.sin(state.clock.elapsedTime * 2) * 0.1 : 0
    material.opacity = (selected ? 0.55 : 0.3) + pulse
  })

  return (
    <mesh
      ref={ref}
      position={center}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        setSelected(selected ? null : region.id)
      }}
    >
      <boxGeometry args={size} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

interface IntersectionHighlightProps {
  regions: IntersectionRegion[]
}

export default function IntersectionHighlight({ regions }: IntersectionHighlightProps) {
  return (
    <group>
      {regions.map((region) => (
        <RegionMarker key={region.id} region={region} />
      ))}
    </group>
  )
}
