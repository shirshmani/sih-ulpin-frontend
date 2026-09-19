import { useMemo } from 'react'
import { usePropertyStore } from '@/store/usePropertyStore'
import { generateDummyFlats, dummyTunnel } from '@/services/mocks/dummyBuildingData'
import { dummyIntersections } from '@/services/mocks/dummyIntersectionData'

export function useDummyBuildingData() {
  const property = usePropertyStore((s) => s.property)
  const floors = useMemo(() => {
    if (!property) return 3
    if (property.userType === 'surveyor') return property.floorsAboveGround ?? 3
    return Math.max(property.ownFloor ?? 3, 3)
  }, [property])
  const flats = useMemo(() => generateDummyFlats(floors), [floors])
  return { flats, tunnel: dummyTunnel, intersections: dummyIntersections, floors }
}
