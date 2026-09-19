import { http, HttpResponse, delay } from 'msw'
import { dummyIntersections } from '@/services/mocks/dummyIntersectionData'

export const handlers = [
  http.post('/api/v1/cadastre/process', async () => {
    await delay(3000)
    return HttpResponse.json({ modelUrl: '/models/approved_cadastre.glb' })
  }),

  http.get('/api/v1/intersections', () => {
    return HttpResponse.json(dummyIntersections)
  }),
]
