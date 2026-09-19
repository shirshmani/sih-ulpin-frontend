import { create } from 'zustand'

interface SceneStore {
  selectedFlatId: string | null
  setSelectedFlatId: (id: string | null) => void
  selectedIntersectionId: string | null
  setSelectedIntersectionId: (id: string | null) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  selectedFlatId: null,
  setSelectedFlatId: (id) => set({ selectedFlatId: id }),
  selectedIntersectionId: null,
  setSelectedIntersectionId: (id) => set({ selectedIntersectionId: id }),
}))
