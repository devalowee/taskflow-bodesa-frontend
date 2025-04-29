import { UseAuth } from "@/hooks/UseAuth";
import { useEffect } from "react";

export const Authenticator = () => {
  const { startValidateSession } = UseAuth();
  
  useEffect(() => {
    startValidateSession();
  }, []);
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin-clockwise repeat-infinite"></div>
        </div>
        <h1 className="text-xl font-semibold text-foreground">Validando sesión...</h1>
        <p className="text-sm text-muted-foreground">Por favor espere mientras verificamos su identidad</p>
      </div>
    </main>
  )
}
