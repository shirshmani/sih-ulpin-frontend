import Scene from '@/components/scene/Scene'
import FlatDetailsPanel from '@/components/panels/FlatDetailsPanel'
import IntersectionReportPanel from '@/components/panels/IntersectionReportPanel'
import { useUploadStore } from '@/store/useUploadStore'
import { useSceneStore } from '@/store/useSceneStore'
import { useObjectUrl } from '@/hooks/useObjectUrl'
import { useDummyBuildingData } from '@/hooks/useDummyBuildingData'
import { getFileExtension, getUrlExtension } from '@/utils/fileValidators'

const SUPPORTED_3D_EXTENSIONS = ['.glb', '.gltf', '.obj', '.las', '.laz']

export default function ViewerPage() {
  const file = useUploadStore((s) => s.file)
  const remoteModelUrl = useUploadStore((s) => s.remoteModelUrl)
  const objectUrl = useObjectUrl(file)

  const isDemoBuilding = remoteModelUrl === 'DEMO_BUILDING'
  const activeUrl = isDemoBuilding ? null : (remoteModelUrl ?? objectUrl)
  const activeExtension = isDemoBuilding ? null : (remoteModelUrl ? getUrlExtension(remoteModelUrl) : file ? getFileExtension(file) : null)
  const isSupported3D = activeExtension ? SUPPORTED_3D_EXTENSIONS.includes(activeExtension) : false

  const { flats, tunnel, intersections } = useDummyBuildingData()
  const selectedFlatId = useSceneStore((s) => s.selectedFlatId)
  const selectedFlat = flats.find((f) => f.id === selectedFlatId) ?? null

  const statusText = isDemoBuilding
    ? 'Rendering 3D building generated from blueprint analysis'
    : remoteModelUrl
    ? 'Rendering model generated from blueprint analysis'
    : !file
      ? 'No file uploaded — showing demo building with dummy flats/owners.'
      : isSupported3D
        ? `Rendering: ${file.name}`
        : `${file.name}: unsupported file type.`

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-3 text-sm text-muted">{statusText}</div>
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="flex-1 bg-neutral-950 min-h-[50vh] lg:min-h-0">
          <Scene
            modelUrl={isSupported3D ? activeUrl : null}
            modelExtension={isSupported3D ? activeExtension : null}
            flats={flats}
            tunnel={tunnel}
            intersections={intersections}
          />
        </div>
        <div className="flex w-full shrink-0 flex-col overflow-y-auto border-t lg:border-t-0 lg:border-l border-border/60 lg:w-80">
          <IntersectionReportPanel result={intersections} />
          <FlatDetailsPanel flat={selectedFlat} />
        </div>
      </div>
    </div>
  )
}
