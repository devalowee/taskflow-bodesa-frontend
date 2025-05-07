import { Eye } from "lucide-react";
import { TableBody, TableCell } from "@/components/ui/table";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersTableSkeleton } from "../users/UsersTableSkeleton";
import { Button } from "@/components/ui/button";
import { getRole } from "@/app/lib/getRole";
import { UsersTablePagination } from "../UsersTablePagination";
import { UseBoards } from "@/hooks/UseBoards";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SetURLSearchParams, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { RemoveUser } from "./RemoveUser";

interface BroadUsersTableProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const BoardUsersTable = ({ searchParams, setSearchParams }: BroadUsersTableProps) => {
  const { getBoardUsers } = UseBoards();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const queryPage = searchParams.get("page") || '1';
    setPage(parseInt(queryPage));
  }, [searchParams, total]);

  const navigate = useNavigate();
  const { slug } = useParams();

  const { data: response, isLoading } = useQuery({
    queryKey: ["users", slug, page],
    queryFn: async () => {
      const { ok, users, total, board, message: messageResponse } = await getBoardUsers(slug, page);

      if (!board) {
        navigate("/tableros");
        toast.error("Ha ocurrido un error", {
          description: `No se ha podido cargar el tablero con el slug: ${slug}. Por favor, vuelve a intentarlo y asegúrate de que el tablero existe.`,
        });
        return;
      }

      if (!ok && messageResponse) {
        setMessage(messageResponse);
      }

      setTotal(total || 0);

      return {
        users,
        board,
      };
    },
  });

  useEffect(() => {
    if (!slug) {
      navigate("/tableros");
    }
  });

  const handlePageChange = (p: number) => {
    setPage(p);
    setSearchParams({ page: p.toString() });
  }

  return (
    <div role="table">
      <Table>
        <TableCaption className="mb-2">
          {message ? message : `Usuarios del tablero ${response?.board?.name}`}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <UsersTableSkeleton cells={6} />
          ) : (
            response?.users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRole(user.role)}</TableCell>
                <TableCell className="text-center space-x-2">
                  <RemoveUser userId={user.id} boardSlug={slug!} page={page} />
                  <Button variant="outline" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <UsersTablePagination page={page} total={total} setPage={handlePageChange} />
    </div>
  );
};
