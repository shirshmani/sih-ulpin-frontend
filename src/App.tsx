import { BrowserRouter } from 'react-router'
import { MotionConfig } from 'motion/react'
import { AppRoutes } from './router'

export default function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <AppRoutes />
      </MotionConfig>
    </BrowserRouter>
  )
}
