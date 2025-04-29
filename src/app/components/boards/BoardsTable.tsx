import { Table, TableCell, TableBody, TableHead, TableCaption, TableHeader, TableRow } from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { UseBoards } from "@/hooks/UseBoards"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { UseAuth } from "@/hooks/UseAuth"
import { BoardBodyCells } from "./BoardTableCells"

export const BoardsTable = () => {
  const { getUserBoards } = UseBoards()
  const { user } = UseAuth()

  const [message, setMessage] = useState<string>('')
  
  const { data: boards, isLoading } =  useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const response = await getUserBoards(user.role)

      if (response.message) {
        setMessage(response.message)
      }
      
      return response.boards
    },
    staleTime: 1000 * 60 * 5, //? 5 minutes
  })

  return (
    <div role="table" className="p-4 bg-white rounded shadow-sm">
      <Table>
        <TableCaption>{message ? message : 'Listado de tus tableros'}</TableCaption>
        <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nombre</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
          <TableHead className="text-right">Fecha de creación</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { 
        isLoading ? (
          <>
            {Array(5).fill(0).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[120px] ml-auto" /></TableCell>
              </TableRow>
            ))}
          </>
        ) : boards?.map((board) => (
          <TableRow key={board.id}>
            <TableCell className="font-medium">{board.name}</TableCell>
            <TableCell>{board.slug}</TableCell>
            <BoardBodyCells role={user.role} boardSlug={board.slug} />
            <TableCell className="text-right">{board.createdAt}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </div>
  )
}
