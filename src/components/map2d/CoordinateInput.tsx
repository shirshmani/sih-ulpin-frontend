interface CoordinateInputProps {
  latitude: number
  longitude: number
  onChange: (lat: number, lng: number) => void
}

export default function CoordinateInput({ latitude, longitude, onChange }: CoordinateInputProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <label className="flex flex-col gap-1 text-sm text-muted">
        Latitude
        <input
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => onChange(Number(e.target.value), longitude)}
          title="Latitude in decimal degrees (WGS84)"
          className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm text-muted">
        Longitude
        <input
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => onChange(latitude, Number(e.target.value))}
          title="Longitude in decimal degrees (WGS84)"
          className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-foreground"
        />
      </label>
    </div>
  )
}
