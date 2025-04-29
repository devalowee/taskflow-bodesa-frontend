import { Eye, Pencil, Trash, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"
import { Link } from "react-router";

interface Role {
  role: 'SUPER_ADMIN' | 'ADMIN' | 'ADMIN_DESIGN' | 'ADMIN_PUBLISHER' | 'PUBLISHER' | 'DESIGNER';
  boardSlug: string;
}

export const BoardBodyCells = ({ role, boardSlug }: Role) => {
  return (
    <TableCell className="flex gap-2 justify-center">
      {
        (role === 'SUPER_ADMIN' || role === 'ADMIN' ) && (
          <Button variant="outline">
            <Pencil />
          </Button>
        )
      }
      {
        (role === 'SUPER_ADMIN' || role === 'ADMIN' || role === 'ADMIN_DESIGN') && (
          <Button variant="outline" asChild>
            <Link to={`${boardSlug}/usuarios`}>
              <Users />
            </Link>
          </Button>
        )
      }
      <Button variant="outline" asChild>
        <Link to={`${boardSlug}`}>
          <Eye />
        </Link>
      </Button>
      {
        role === 'SUPER_ADMIN' && (
          <Button variant="outline">
            <Trash />
          </Button>
        )
      }
    </TableCell>
  )
}