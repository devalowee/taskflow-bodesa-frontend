import { UseBreadcums } from '@/hooks/UseBreadcums';
import { Link } from 'react-router'

export const Breadcums = () => {
  const { breadcums, breadcumPaths } = UseBreadcums();
  return (
    <nav role="heading" className="flex items-center gap-4">
      { breadcums.map((breadcums, index) => (
        index === 0 ? (
          <Link key={breadcums} to={`${breadcumPaths[index]}`} className="text-2xl font-bold">
            {breadcums}
          </Link>
        ) : (
          <Link key={breadcums} to={`${breadcumPaths[index]}`} className="text-sm text-gray-500">
            {breadcums}
          </Link>
        )
      ))}
    </nav>
  )
}
