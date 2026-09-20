import type { IntersectionResult } from '@/types/intersection'

export const dummyIntersections: IntersectionResult = {
  hasIntersection: true,
  regions: [
    {
      id: 'intersection-1',
      label: 'Foundation / utility tunnel',
      description: 'The building foundation overlaps the utility tunnel corridor by an estimated 0.6m.',
      severity: 'major',
      boundingBox: [-1, -2.5, -1, 1, -1.5, 1],
    },
    {
      id: 'intersection-2',
      label: 'Flat 2B boundary',
      description: "Flat 2B's balcony extends past the recorded parcel boundary on the east side.",
      severity: 'minor',
      boundingBox: [0.4, 1.1, 0.4, 1.3, 1.9, 1.3],
    },
  ],
}
