import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import SceneLighting from './SceneLighting'
import PlaceholderBuilding from './PlaceholderBuilding'
import ModelLoader from './ModelLoader'
import { ModelErrorBoundary } from './ModelErrorBoundary'
import IntersectionHighlight from './IntersectionHighlight'
import type { FlatRecord, TunnelRecord } from '@/types/flat'
import type { IntersectionResult } from '@/types/intersection'

interface SceneProps {
  modelUrl?: string | null
  modelExtension?: string | null
  flats: FlatRecord[]
  tunnel: TunnelRecord
  intersections: IntersectionResult
}

function LoadingPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#525252" wireframe />
    </mesh>
  )
}

function ErrorPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ef4444" wireframe />
    </mesh>
  )
}

export default function Scene({ modelUrl, modelExtension, flats, tunnel, intersections }: SceneProps) {
  const hasModel = Boolean(modelUrl && modelExtension)

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [8, 6, 8], fov: 50 }}>
      <SceneLighting />
      <Grid args={[20, 20]} cellColor="#404040" sectionColor="#606060" fadeDistance={30} />
      {hasModel ? (
        <group>
          <ModelErrorBoundary fallback={<ErrorPlaceholder />}>
            <Suspense fallback={<LoadingPlaceholder />}>
              <ModelLoader url={modelUrl!} extension={modelExtension!} />
            </Suspense>
          </ModelErrorBoundary>
          <IntersectionHighlight regions={intersections.regions} />
        </group>
      ) : (
        <Suspense fallback={<LoadingPlaceholder />}>
          <PlaceholderBuilding flats={flats} tunnel={tunnel} intersections={intersections} />
        </Suspense>
      )}
      <OrbitControls makeDefault />
    </Canvas>
  )
}
