import { useGLTF } from '@react-three/drei'
import type { Object3D } from 'three'

export function useGLTFModel(url: string): Object3D {
  const { scene } = useGLTF(url)
  return scene
}
