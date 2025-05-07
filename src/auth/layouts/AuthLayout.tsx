import { UseAuth } from "@/hooks/UseAuth";
import { Navigate, Outlet } from "react-router";

export const AuthLayout = () => {
  const { isAuthenticated } = UseAuth();

  if (isAuthenticated === 'authenticated') {
    return <Navigate to="/" />;
  }

  return (
      <main>
        <Outlet />
      </main>
  );
};
