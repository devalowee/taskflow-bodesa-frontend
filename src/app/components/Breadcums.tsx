import { UseBreadcums } from '@/hooks/UseBreadcums';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router'
import { Fragment } from 'react/jsx-runtime';
import { sanitizedSlug } from '../lib/helpers';

export const Breadcums = () => {
  const { breadcums, breadcumPaths } = UseBreadcums();
  return (
    <nav role="heading" className="flex items-center gap-2">
      { breadcums.map((breadcumb, index) => (
        index === 0 ? (
          <Fragment key={breadcumb}>
            <Link to={`${breadcumPaths[index]}`}>
              <Home className="size-5 text-gray-500" />
            </Link>
            <ChevronRight className="size-4 text-gray-500" />
          </Fragment>
        ) : index === breadcums.length - 1 ? (
          <Link key={breadcumb} to={`${breadcumPaths[index]}`} className="text-xs text-gray-800">
            {sanitizedSlug(breadcumb)}
          </Link>
        ) : (
          <Fragment key={breadcumb}>
            <Link to={`${breadcumPaths[index]}`} className="text-xs text-gray-500">
              {sanitizedSlug(breadcumb)}
            </Link>
            <ChevronRight className="size-4 text-gray-500" />
          </Fragment>
        )
      ))}
    </nav>
  )
}
