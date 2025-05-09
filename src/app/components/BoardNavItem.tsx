import { NavLink } from "react-router"

interface BoardNavItemProps {
  name: string;
  slug: string;
  color: string;
  initials: string;
}

export const BoardNavItem = ({ name, slug, color, initials }: BoardNavItemProps) => {
  return (
    <NavLink 
      to={`/tableros/${slug}`} 
      key={slug} 
      className={({ isActive }) => (
        `flex items-center gap-2 hover:bg-gray-100 rounded-md p-2 ${isActive && 'bg-gray-100'}`
      )}
    >
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="text-xs font-medium text-white p-1 rounded" style={{ backgroundColor: color }}>{initials}</span>
      </div>
      <span className="text-sm font-medium">{name}</span>
    </NavLink>
  )
}
