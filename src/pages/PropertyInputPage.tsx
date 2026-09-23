import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { propertySchema, type PropertyInput } from '@/types/property'
import { usePropertyStore } from '@/store/usePropertyStore'
import LocationPicker from '@/components/map2d/LocationPicker'
import CoordinateInput from '@/components/map2d/CoordinateInput'

const defaultCenter = { latitude: 28.6139, longitude: 77.209 }

export default function PropertyInputPage() {
  const navigate = useNavigate()
  const setProperty = usePropertyStore((s) => s.setProperty)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PropertyInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      address: '',
      propertyType: 'residential',
      userType: 'individual',
      latitude: defaultCenter.latitude,
      longitude: defaultCenter.longitude,
    },
  })

  const latitude = watch('latitude')
  const longitude = watch('longitude')
  const userType = watch('userType')

  const handleCoordChange = (lat: number, lng: number) => {
    setValue('latitude', lat, { shouldValidate: true })
    setValue('longitude', lng, { shouldValidate: true })
  }

  const onSubmit = (data: PropertyInput) => {
    setProperty(data)
    navigate('/upload')
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h2 className="font-display text-xl font-semibold text-foreground">Property Input</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <label className="flex flex-col gap-1 text-sm text-muted">
          Parent ULPIN (if known)
          <input
            {...register('ulpinId')}
            title="The 14-digit parent ULPIN if this property already has one — leave blank to generate a new 3D-ULPIN"
            className="rounded-md border border-border bg-surface px-3 py-2 font-mono text-foreground"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-muted">
          Address
          <input
            {...register('address')}
            title="Full postal address of the property"
            className="rounded-md border border-border bg-surface px-3 py-2 text-foreground"
          />
          {errors.address && <span className="text-xs text-red-500">{errors.address.message}</span>}
        </label>

        <label className="flex flex-col gap-1 text-sm text-muted">
          Property Type
          <select
            {...register('propertyType')}
            title="What kind of property this is"
            className="rounded-md border border-border bg-surface px-3 py-2 text-foreground"
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed-use">Mixed-use</option>
            <option value="industrial">Industrial</option>
          </select>
        </label>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm text-muted">Who's filing this record?</legend>
          <div className="flex gap-4 text-sm text-foreground">
            <label className="flex items-center gap-2" title="You own or occupy one unit and know your own floor">
              <input type="radio" value="individual" {...register('userType')} />
              Individual owner
            </label>
            <label className="flex items-center gap-2" title="You're recording the full building's floor extent">
              <input type="radio" value="surveyor" {...register('userType')} />
              Surveyor / official
            </label>
          </div>
        </fieldset>

        {userType === 'surveyor' ? (
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm text-muted">
              Floors above ground
              <input
                type="number"
                title="Total floors in the building, not counting basements"
                {...register('floorsAboveGround', { valueAsNumber: true })}
                className="rounded-md border border-border bg-surface px-3 py-2 text-foreground"
              />
              {errors.floorsAboveGround && (
                <span className="text-xs text-red-500">{errors.floorsAboveGround.message}</span>
              )}
            </label>
            <label className="flex flex-col gap-1 text-sm text-muted">
              Basement levels
              <input
                type="number"
                title="How many levels below ground, if any"
                {...register('basementLevels', { valueAsNumber: true })}
                className="rounded-md border border-border bg-surface px-3 py-2 text-foreground"
              />
              {errors.basementLevels && <span className="text-xs text-red-500">{errors.basementLevels.message}</span>}
            </label>
          </div>
        ) : (
          <label className="flex flex-col gap-1 text-sm text-muted">
            Your floor
            <input
              type="number"
              title="Which floor your unit is on — use negative numbers for basement units (e.g. -1 for B1)"
              {...register('ownFloor', { valueAsNumber: true })}
              className="rounded-md border border-border bg-surface px-3 py-2 text-foreground"
            />
            {errors.ownFloor && <span className="text-xs text-red-500">{errors.ownFloor.message}</span>}
          </label>
        )}

        <CoordinateInput latitude={latitude} longitude={longitude} onChange={handleCoordChange} />

        <LocationPicker latitude={latitude} longitude={longitude} onChange={handleCoordChange} />

        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          Continue to Upload
        </button>
      </form>
    </div>
  )
}
