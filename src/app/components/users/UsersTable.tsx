import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableCaption,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { UseUsers } from "@/hooks/UseUsers";
import { useState } from "react";
import { getRole } from "@/app/lib/getRole";
import { CircleCheck, CircleX, Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsersTableSkeleton } from "./UsersTableSkeleton";
import { TablePagination } from "../TablePagination";
import { DeleteUser } from "./DeleteUser";
import { formatDDMMYYYY } from "@/lib/formatDate";

export const UsersTable = () => {
  const { getUsers } = UseUsers();
  const [message, setMessage] = useState<string>("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const { response, message: messageResponse } = await getUsers(page);

      if (messageResponse) {
        setMessage(messageResponse);
      }

      setTotal(response?.total || 0);

      return response?.users;
    },
    staleTime: 1000 * 60 * 5, //? 5 minutes
  });

  return (
    <div role="table" className="p-4 bg-white rounded shadow-sm">
      <Table>
        <TableCaption className="mb-2">
          {message ? message : "Listado de todos los usuarios"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className="text-center">Estado</TableHead>
            <TableHead className="text-right">Fecha de creación</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? <UsersTableSkeleton cells={6} /> : (
            users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRole(user.role)}</TableCell>
                <TableCell className="flex justify-center">
                  {user.active ? (
                    <CircleCheck className="w-4 h-4 text-green-500" />
                  ) : (
                    <CircleX className="w-4 h-4 text-red-500" />
                  )}
                </TableCell>
                <TableCell className="text-right">{formatDDMMYYYY(user.createdAt)}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <DeleteUser id={user.id} />
                  <Button variant="outline" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination page={page} total={total} setPage={setPage} />
    </div>
  );
};
