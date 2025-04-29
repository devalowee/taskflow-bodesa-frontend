import { AuthRoutes } from "./AuthRoutes";
import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = (authenticated: string = 'pending') => {
  if (authenticated === 'authenticated') {
    return DashboardRoutes;
  } else {
    return AuthRoutes;
  }
}
