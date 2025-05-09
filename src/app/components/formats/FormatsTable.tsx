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
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TablePagination } from "../TablePagination";
import { formatDDMMYYYY } from "@/lib/formatDate";
import { UsersTableSkeleton } from "../users/UsersTableSkeleton";
import { toast } from "sonner";
import { useFormats } from "@/hooks/useFormats";
import { useSearchParams } from "react-router";

export const FormatsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { getFormats } = useFormats();
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const { data: formatsQuery, isLoading } = useQuery({
    queryKey: ["formats", page],
    queryFn: async () => {
      const { formats = [], total:totalPages = 1, ok, message } = await getFormats(page);

      if (!ok) {
        toast.error(message);
        return formats;
      }

      setTotalPages(totalPages);

      return formats;
    }
  });

  useEffect(() => {
    const queryPage = searchParams.get("page") || '1';

    setPage(() => {
      if (parseInt(queryPage) < 1) {
        toast.error('Página 0?');
        return 1;
      }

      return parseInt(queryPage);
    });
  }, [searchParams, totalPages]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    setPage(page);
  }
  
  return (
    <div role="table" className="p-4 bg-white rounded shadow-sm">
      <Table>
        <TableCaption className="mb-2">
          Listado de todos los formatos
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead>Fecha de actualización</TableHead>
            <TableHead className="text-center">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? <UsersTableSkeleton cells={5} columns={5} /> : (
            formatsQuery?.map((format, index) => (
              <TableRow key={format.slug}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{format.name}</TableCell>
                <TableCell>{format.slug}</TableCell>
                <TableCell>{formatDDMMYYYY(format.createdAt)}</TableCell>
                <TableCell>{formatDDMMYYYY(format.updatedAt)}</TableCell>
                <TableCell className="text-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  {/* <DeleteUser id={user.id} /> */}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      { !isLoading && <TablePagination page={page} total={totalPages} setPage={handlePageChange} /> }
    </div>
  );
};
