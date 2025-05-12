import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Link } from "react-router"

export const Tasks = () => {
  return (
    <>
      <h1>Tareas</h1>
      <Button asChild>
        <Link to="/tareas/crear">
          <Plus />
          Crear solicitud
        </Link>
      </Button>
    </>
  )
}
