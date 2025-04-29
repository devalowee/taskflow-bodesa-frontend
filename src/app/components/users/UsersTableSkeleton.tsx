import { Skeleton } from '@/components/ui/skeleton'
import { TableCell } from '@/components/ui/table'
import { TableRow } from '@/components/ui/table'

export const UsersTableSkeleton = ({cells = 5}: {cells: number}) => {
  return (
    <>
      {Array(cells)
        .fill(0)
        .map((_, index) => (
          <TableRow key={`skeleton-${index}`}>
            <TableCell>
              <Skeleton className="h-4 w-[80px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[150px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-[120px] ml-auto" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-[120px] ml-auto" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-[120px] ml-auto" />
            </TableCell>
          </TableRow>
        ))}
    </>
  )
}
