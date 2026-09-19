export interface IntersectionRegion {
  id: string
  label: string
  description: string
  severity: 'minor' | 'major'
  boundingBox: [number, number, number, number, number, number]
}

export interface IntersectionResult {
  hasIntersection: boolean
  regions: IntersectionRegion[]
}
