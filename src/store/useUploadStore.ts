import { create } from 'zustand'

interface UploadStore {
  file: File | null
  remoteModelUrl: string | null
  setFile: (file: File | null) => void
  setRemoteModelUrl: (url: string | null) => void
}

export const useUploadStore = create<UploadStore>((set) => ({
  file: null,
  remoteModelUrl: null,
  setFile: (file) => set({ file, remoteModelUrl: null }),
  setRemoteModelUrl: (url) => set({ remoteModelUrl: url, file: null }),
}))
