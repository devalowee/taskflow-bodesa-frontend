import { Navigate } from "react-router";

export const AuthRedirect = () => {
  return <Navigate to="/auth/login" />;
};

