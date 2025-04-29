import { AddUsers } from "@/app/components/boards/AddUsers";
import { BoardUsersTable } from "@/app/components/boards/BoardUsersTable"
import { sanitizedSlug } from "@/app/lib/helpers";
import { useParams, useSearchParams } from "react-router";

export const BoardUsers = () => {

  const { slug } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{sanitizedSlug(slug!)} | Usuarios</h1>
        <AddUsers boardSlug={slug!} page={ parseInt( searchParams.get('page') || '1') } />
      </div>
      <div role="table" className="p-4 bg-white rounded shadow-sm">
        <BoardUsersTable searchParams={searchParams} setSearchParams={setSearchParams} />
      </div>
    </>
  )
}
