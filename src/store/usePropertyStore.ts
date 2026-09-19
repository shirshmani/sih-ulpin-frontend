import { create } from 'zustand'
import type { PropertyInput } from '@/types/property'

interface PropertyStore {
  property: PropertyInput | null
  setProperty: (property: PropertyInput) => void
  reset: () => void
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  property: null,
  setProperty: (property) => set({ property }),
  reset: () => set({ property: null }),
}))
