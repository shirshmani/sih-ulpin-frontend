import type { FlatRecord, TunnelRecord } from '@/types/flat'

const DUMMY_OWNERS = ['A. Sharma', 'R. Verma', 'S. Iyer', 'K. Nair', 'P. Singh', 'M. Reddy', 'D. Gupta', 'N. Rao']

export function generateDummyFlats(floors: number): FlatRecord[] {
  const flats: FlatRecord[] = []
  let ownerIndex = 0
  for (let floor = 1; floor <= floors; floor++) {
    for (let unit = 0; unit < 4; unit++) {
      flats.push({
        id: `flat-${floor}-${unit}`,
        floor,
        unitLabel: `${floor}${String.fromCharCode(65 + unit)}`,
        ownerName: DUMMY_OWNERS[ownerIndex % DUMMY_OWNERS.length],
        ulpinId: `MH0713004217X9.A.${floor.toString().padStart(2, '0')}.${(unit + 1).toString().padStart(3, '0')}.K`,
      })
      ownerIndex++
    }
  }
  return flats
}

export const dummyTunnel: TunnelRecord = {
  id: 'tunnel-1',
  label: 'Municipal Utility Corridor',
  depthMeters: 8,
}
