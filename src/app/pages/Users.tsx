import { CreateUser } from "../components/users/CreateUser"
import { UsersTable } from "../components/users/UsersTable"

export const Users = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <CreateUser />
      </div>
      <UsersTable />
    </>
  )
}
