import { Link } from 'react-router'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navbar() {
  return (
    <header className="relative z-20 flex h-16 items-center justify-between border-b border-border/60 bg-surface/70 px-6 backdrop-blur-xl">
      <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
        ULPIN 3D
      </Link>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-muted">PS 11</span>
        <ThemeToggle />
      </div>
    </header>
  )
}
