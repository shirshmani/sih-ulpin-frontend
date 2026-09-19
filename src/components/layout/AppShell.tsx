import { Outlet, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

function AnimatedOutlet() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}

export default function AppShell() {
  return (
    <div className="blueprint-grid flex h-screen w-screen flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <AnimatedOutlet />
        </main>
      </div>
    </div>
  )
}
