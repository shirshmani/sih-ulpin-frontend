import { NavLink } from 'react-router'

const links = [
  { to: '/property', label: 'Property Input' },
  { to: '/upload', label: 'Upload 3D/LiDAR' },
  { to: '/viewer', label: '3D Viewer' },
  { to: '/report', label: 'Report' },
]

export default function Sidebar() {
  return (
    <nav className="w-60 shrink-0 border-r border-border/60 bg-surface/50 p-3 backdrop-blur-xl">
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-surface-alt/80 text-foreground'
                    : 'text-muted hover:bg-surface-alt/60 hover:text-foreground'
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
