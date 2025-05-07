import { UseAuth } from "@/hooks/UseAuth";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute = ({ 
  allowedRoles, 
}: ProtectedRouteProps) => {
  const { user } = UseAuth();
  
  const hasPermission = user && allowedRoles.includes(user.role);

  if (!hasPermission) {
    return <Navigate to='/' />;
  } else {
    return <Outlet />
  }
  
}
