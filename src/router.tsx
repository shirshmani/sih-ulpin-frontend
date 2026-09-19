import { Routes, Route } from 'react-router'
import { lazy, Suspense } from 'react'
import AppShell from '@/components/layout/AppShell'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const PropertyInputPage = lazy(() => import('@/pages/PropertyInputPage'))
const FileUploadPage = lazy(() => import('@/pages/FileUploadPage'))
const ViewerPage = lazy(() => import('@/pages/ViewerPage'))
const ReportPage = lazy(() => import('@/pages/ReportPage'))

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-sm text-muted">Loading...</div>}>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<LandingPage />} />
          <Route path="property" element={<PropertyInputPage />} />
          <Route path="upload" element={<FileUploadPage />} />
          <Route path="viewer" element={<ViewerPage />} />
          <Route path="report" element={<ReportPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
