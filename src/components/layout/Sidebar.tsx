import { NavLink } from 'react-router'

const links = [
  { to: '/property', label: 'Property Input' },
  { to: '/upload', label: 'Upload 3D/LiDAR' },
  { to: '/viewer', label: '3D Viewer' },
  { to: '/report', label: 'Report' },
]

export default function Sidebar() {
  return (
    <nav className="w-full shrink-0 border-b border-border/60 bg-surface/50 p-3 backdrop-blur-xl md:w-60 md:border-b-0 md:border-r">
      <ul className="flex flex-row overflow-x-auto space-x-2 md:flex-col md:space-x-0 md:space-y-1 pb-1 md:pb-0 scrollbar-hide">
        {links.map((link) => (
          <li key={link.to} className="shrink-0">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-colors whitespace-nowrap ${
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
