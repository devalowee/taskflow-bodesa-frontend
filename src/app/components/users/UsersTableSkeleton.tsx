import { Skeleton } from '@/components/ui/skeleton'
import { TableCell } from '@/components/ui/table'
import { TableRow } from '@/components/ui/table'

export const UsersTableSkeleton = ({cells = 5, columns = 6}: {cells?: number, columns?: number}) => {
  return (
    <>
      {Array(cells)
        .fill(0)
        .map((_, index) => (
          <TableRow key={`skeleton-${index}`}>
            {Array(columns)
              .fill(0)
              .map((_, index) => (
                <TableCell key={`skeleton-${index}`}>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
              ))}
          </TableRow>
        ))}
    </>
  )
}
