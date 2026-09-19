import { z } from 'zod'

export const propertySchema = z
  .object({
    ulpinId: z.string().optional(),
    address: z.string().min(3, 'Address is required'),
    propertyType: z.enum(['residential', 'commercial', 'mixed-use', 'industrial']),
    userType: z.enum(['individual', 'surveyor']),
    ownFloor: z
      .number()
      .min(-5, 'No more than 5 basement levels')
      .max(200, 'Exceeds maximum floor count')
      .optional(),
    floorsAboveGround: z
      .number()
      .min(1, 'Must have at least 1 floor')
      .max(200, 'Exceeds maximum floor count')
      .optional(),
    basementLevels: z.number().min(0, 'Cannot be negative').max(5, 'No more than 5 basement levels').optional(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  })
  .superRefine((data, ctx) => {
    if (data.userType === 'individual' && data.ownFloor === undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Enter which floor your unit is on', path: ['ownFloor'] })
    }
    if (data.userType === 'surveyor' && data.floorsAboveGround === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Enter the total number of floors above ground',
        path: ['floorsAboveGround'],
      })
    }
  })

export type PropertyInput = z.infer<typeof propertySchema>
