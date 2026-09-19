import { useGLTFModel } from './loaders/useGLTFModel'
import { useOBJModel } from './loaders/useOBJModel'
import { usePointCloud } from './loaders/usePointCloud'

function GLTFModel({ url }: { url: string }) {
  const scene = useGLTFModel(url)
  return <primitive object={scene} />
}

function OBJModel({ url }: { url: string }) {
  const object = useOBJModel(url)
  return <primitive object={object} />
}

function PointCloudModel({ url }: { url: string }) {
  const geometry = usePointCloud(url)
  const hasColor = geometry.hasAttribute('color')
  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.04} vertexColors={hasColor} color={hasColor ? undefined : '#D9A055'} sizeAttenuation />
    </points>
  )
}

interface ModelLoaderProps {
  url: string
  extension: string
}

export default function ModelLoader({ url, extension }: ModelLoaderProps) {
  if (extension === '.glb' || extension === '.gltf') {
    return <GLTFModel url={url} />
  }
  if (extension === '.obj') {
    return <OBJModel url={url} />
  }
  if (extension === '.las' || extension === '.laz') {
    return <PointCloudModel url={url} />
  }
  return null
}
