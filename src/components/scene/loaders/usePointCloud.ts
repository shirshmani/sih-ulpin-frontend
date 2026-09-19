import { use } from 'react'
import { load } from '@loaders.gl/core'
import { LASLoader } from '@loaders.gl/las'
import * as THREE from 'three'

const MAX_POINTS = 500_000
const cache = new Map<string, Promise<THREE.BufferGeometry>>()

function decimateFloat32(source: Float32Array, stride: number): Float32Array {
  const totalPoints = source.length / 3
  const keptPoints = Math.floor(totalPoints / stride)
  const result = new Float32Array(keptPoints * 3)
  for (let i = 0; i < keptPoints; i++) {
    const src = i * stride * 3
    result.set(source.subarray(src, src + 3), i * 3)
  }
  return result
}

function decimateUint8(source: Uint8Array, stride: number): Uint8Array {
  const totalPoints = source.length / 3
  const keptPoints = Math.floor(totalPoints / stride)
  const result = new Uint8Array(keptPoints * 3)
  for (let i = 0; i < keptPoints; i++) {
    const src = i * stride * 3
    result.set(source.subarray(src, src + 3), i * 3)
  }
  return result
}

async function loadPointCloudGeometry(url: string): Promise<THREE.BufferGeometry> {
  const data = await load(url, LASLoader, { las: { colorDepth: 8 } })

  let positions = data.attributes?.POSITION?.value as Float32Array | undefined
  let colorAttr = data.attributes?.COLOR_0?.value as Uint8Array | undefined
  if (!positions || positions.length === 0) {
    throw new Error('No point positions found in file')
  }

  const totalPoints = positions.length / 3
  const stride = totalPoints > MAX_POINTS ? Math.ceil(totalPoints / MAX_POINTS) : 1
  if (stride > 1) {
    positions = decimateFloat32(positions, stride)
    if (colorAttr && colorAttr.length === totalPoints * 3) {
      colorAttr = decimateUint8(colorAttr, stride)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.center()
  geo.computeBoundingSphere()
  const radius = geo.boundingSphere?.radius ?? 1
  const scaleFactor = radius > 0 ? 4 / radius : 1
  geo.scale(scaleFactor, scaleFactor, scaleFactor)

  if (colorAttr && colorAttr.length === positions.length) {
    const normalized = new Float32Array(colorAttr.length)
    for (let i = 0; i < colorAttr.length; i++) normalized[i] = colorAttr[i] / 255
    geo.setAttribute('color', new THREE.BufferAttribute(normalized, 3))
  }

  return geo
}

export function usePointCloud(url: string): THREE.BufferGeometry {
  let promise = cache.get(url)
  if (!promise) {
    promise = loadPointCloudGeometry(url)
    cache.set(url, promise)
  }
  return use(promise)
}
