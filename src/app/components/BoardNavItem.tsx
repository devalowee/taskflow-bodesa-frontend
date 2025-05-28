import { NavLink } from "react-router"

interface BoardNavItemProps {
  name: string;
  slug: string;
  color: string;
  initials: string;
  isOpen: boolean;
}

export const BoardNavItem = ({ name, slug, color, initials, isOpen }: BoardNavItemProps) => {
  return (
    <NavLink 
      to={`/tableros/${slug}`} 
      key={slug} 
      className={({ isActive }) => (
        `flex items-center bg-gray-100 hover:bg-violet-100 rounded-md p-2 ${isActive && 'bg-violet-100'} ${ isOpen ? "gap-2" : "gap-0" }`
      )}
    >
      <div className="w-6 h-6 rounded-full flex items-center justify-center">
        <span className="text-xs font-medium text-white p-1 rounded" style={{ backgroundColor: color }}>{initials}</span>
      </div>
      {
        isOpen && (
          <span className="text-sm font-medium">{ name }</span>
        )
      }
    </NavLink>
  )
}
