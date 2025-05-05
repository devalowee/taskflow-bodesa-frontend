import { UseBreadcums } from '@/hooks/UseBreadcums';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router'

export const Breadcums = () => {
  const { breadcums, breadcumPaths } = UseBreadcums();
  return (
    <nav role="heading" className="flex items-center gap-2">
      { breadcums.map((breadcumb, index) => (
        index === 0 ? (
          <>
            <Link key={breadcumb} to={`${breadcumPaths[index]}`} className="text-sm text-gray-800">
              <Home className="size-6 text-gray-500" />
            </Link>
            <ChevronRight className="size-4 text-gray-500" />
          </>
        ) : index === breadcums.length - 1 ? (
          <Link key={breadcumb} to={`${breadcumPaths[index]}`} className="text-sm text-gray-800">
            {breadcumb}
          </Link>
        ) : (
          <>
            <Link key={breadcumb} to={`${breadcumPaths[index]}`} className="text-sm text-gray-500">
              {breadcumb}
            </Link>
            <ChevronRight className="size-4 text-gray-500" />
          </>
        )
      ))}
    </nav>
  )
}
