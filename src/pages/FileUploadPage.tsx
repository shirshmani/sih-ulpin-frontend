import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router'
import { useUploadStore } from '@/store/useUploadStore'
import { isAcceptedModelFile } from '@/utils/fileValidators'

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png']

function isAcceptedImageFile(file: File): boolean {
  const name = file.name.toLowerCase()
  return IMAGE_EXTENSIONS.some((ext) => name.endsWith(ext))
}

export default function FileUploadPage() {
  const navigate = useNavigate()
  const file = useUploadStore((s) => s.file)
  const setFile = useUploadStore((s) => s.setFile)
  const setRemoteModelUrl = useUploadStore((s) => s.setRemoteModelUrl)
  const [error, setError] = useState<string | null>(null)

  const [blueprintFile, setBlueprintFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const picked = acceptedFiles[0]
      if (!picked) return
      if (!isAcceptedModelFile(picked)) {
        setError('Unsupported file type. Use .glb, .gltf, .obj, .las or .laz.')
        return
      }
      setError(null)
      setFile(picked)
    },
    [setFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false })

  const onDropBlueprint = useCallback((acceptedFiles: File[]) => {
    const picked = acceptedFiles[0]
    if (!picked) return
    if (!isAcceptedImageFile(picked)) {
      setAnalyzeError('Unsupported file type. Use .jpg or .jpeg.')
      return
    }
    setAnalyzeError(null)
    setBlueprintFile(picked)
  }, [])

  const {
    getRootProps: getBlueprintRootProps,
    getInputProps: getBlueprintInputProps,
    isDragActive: isBlueprintDragActive,
  } = useDropzone({ onDrop: onDropBlueprint, multiple: false })

  const handleAnalyze = async () => {
    if (!blueprintFile) return
    setAnalyzing(true)
    setAnalyzeError(null)
    try {
      const formData = new FormData()
      formData.append('image', blueprintFile)
      const response = await fetch('/api/v1/cadastre/process', { method: 'POST', body: formData })
      if (!response.ok) {
        throw new Error(`Analysis failed (${response.status})`)
      }
      const data = (await response.json()) as { modelUrl: string }
      setRemoteModelUrl(data.modelUrl)
      navigate('/viewer')
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="font-display text-xl font-semibold text-foreground">Upload 3D / LiDAR File</h2>
      <p className="mt-1 text-sm text-muted">Accepted: .glb, .gltf, .obj, .las, .laz</p>

      <div
        {...getRootProps()}
        className={`mt-4 flex h-48 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed text-sm transition-colors ${
          isDragActive ? 'border-accent bg-surface-alt' : 'border-border text-muted'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the file here</p> : <p>Drag & drop a file, or click to browse</p>}
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      {file && (
        <div className="mt-4 rounded-md border border-border bg-surface p-3 text-sm">
          <p className="text-foreground">{file.name}</p>
          <p className="text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      <button
        type="button"
        disabled={!file}
        onClick={() => navigate('/viewer')}
        className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue to Viewer
      </button>

      <div className="my-8 flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-border" />
        or analyze a 2D blueprint
        <span className="h-px flex-1 bg-border" />
      </div>

      <h2 className="font-display text-xl font-semibold text-foreground">Upload Cadastral Blueprint</h2>
      <p className="mt-1 text-sm text-muted">Accepted: .jpg, .jpeg, .png — a 3D model is generated server-side</p>

      <div
        {...getBlueprintRootProps()}
        className={`mt-4 flex h-48 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed text-sm transition-colors ${
          isBlueprintDragActive ? 'border-accent bg-surface-alt' : 'border-border text-muted'
        }`}
      >
        <input {...getBlueprintInputProps()} />
        {isBlueprintDragActive ? <p>Drop the image here</p> : <p>Drag & drop a blueprint image, or click to browse</p>}
      </div>

      {analyzeError && <p className="mt-2 text-xs text-red-500">{analyzeError}</p>}

      {blueprintFile && !analyzing && (
        <div className="mt-4 rounded-md border border-border bg-surface p-3 text-sm">
          <p className="text-foreground">{blueprintFile.name}</p>
          <p className="text-muted">{(blueprintFile.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}

      {analyzing && (
        <div className="mt-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-surface-alt">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-accent" />
          </div>
          <p className="mt-2 text-xs text-muted">Running structural analysis…</p>
        </div>
      )}

      <button
        type="button"
        disabled={!blueprintFile || analyzing}
        onClick={handleAnalyze}
        className="mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {analyzing ? 'Analyzing blueprint…' : 'Analyze Blueprint'}
      </button>
    </div>
  )
}
