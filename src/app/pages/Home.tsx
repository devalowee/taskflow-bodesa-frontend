import { UseAuth } from "@/hooks/UseAuth";
import { getRole } from "../lib/getRole";

export const Home = () => {
  const { user } = UseAuth();

  return (
    <>
      
      <span className="font-semibold">HOLA,</span>
      <h1 className="text-4xl font-extrabold">{ getRole(user.role) }</h1>
      <span className="font-semibold">Conoce tu progreso</span>
    </>
  )
}

