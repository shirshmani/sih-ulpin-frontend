const ACCEPTED_EXTENSIONS = ['.glb', '.gltf', '.obj', '.las', '.laz'] as const

export function isAcceptedModelFile(file: File): boolean {
  const name = file.name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext))
}

export function getFileExtension(file: File): string {
  const parts = file.name.split('.')
  return parts.length > 1 ? `.${parts.pop()!.toLowerCase()}` : ''
}

export function getUrlExtension(url: string): string {
  const path = url.split('?')[0].split('#')[0]
  const parts = path.split('.')
  return parts.length > 1 ? `.${parts.pop()!.toLowerCase()}` : ''
}
