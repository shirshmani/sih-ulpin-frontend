import type { FlatRecord } from '@/types/flat'

interface FlatDetailsPanelProps {
  flat: FlatRecord | null
}

export default function FlatDetailsPanel({ flat }: FlatDetailsPanelProps) {
  if (!flat) {
    return <div className="flex-1 p-4 text-sm text-muted">Click a flat to see its details.</div>
  }

  return (
    <div className="flex-1 bg-surface/70 p-4 text-sm backdrop-blur-xl">
      <h3 className="font-display text-base font-semibold text-foreground">{flat.unitLabel}</h3>
      <dl className="mt-3 space-y-2 text-muted">
        <div>
          <dt className="text-xs uppercase tracking-wide">Owner</dt>
          <dd className="text-foreground">{flat.ownerName}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide">ULPIN</dt>
          <dd className="font-mono text-foreground">{flat.ulpinId}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide">Floor</dt>
          <dd className="text-foreground">{flat.floor}</dd>
        </div>
      </dl>
    </div>
  )
}
