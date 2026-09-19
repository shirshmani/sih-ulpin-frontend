import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three-stdlib'
import type { Group } from 'three'

export function useOBJModel(url: string): Group {
  return useLoader(OBJLoader, url)
}
