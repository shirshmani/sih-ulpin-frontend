import { useSceneStore } from '@/store/useSceneStore'
import type { IntersectionResult } from '@/types/intersection'

const SEVERITY_STYLES: Record<'minor' | 'major', string> = {
  major: 'text-red-500',
  minor: 'text-amber-500',
}

interface IntersectionReportPanelProps {
  result: IntersectionResult
}

export default function IntersectionReportPanel({ result }: IntersectionReportPanelProps) {
  const selectedId = useSceneStore((s) => s.selectedIntersectionId)
  const setSelectedId = useSceneStore((s) => s.setSelectedIntersectionId)

  return (
    <div className="border-b border-border/60 bg-surface/70 p-4 text-sm backdrop-blur-xl">
      <h3 className="font-display text-sm font-semibold text-foreground">
        {result.hasIntersection ? `${result.regions.length} conflict(s) flagged` : 'No conflicts detected'}
      </h3>
      <ul className="mt-3 space-y-2">
        {result.regions.map((region) => (
          <li key={region.id}>
            <button
              type="button"
              onClick={() => setSelectedId(selectedId === region.id ? null : region.id)}
              className={`w-full rounded-md border px-3 py-2 text-left transition-colors ${
                selectedId === region.id ? 'border-accent bg-surface-alt' : 'border-border hover:bg-surface-alt'
              }`}
            >
              <span className={`text-xs font-medium uppercase ${SEVERITY_STYLES[region.severity]}`}>
                {region.severity}
              </span>
              <p className="mt-1 text-foreground">{region.label}</p>
              {selectedId === region.id && <p className="mt-2 text-xs text-muted">{region.description}</p>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
