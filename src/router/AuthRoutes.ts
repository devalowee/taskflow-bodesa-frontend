import { AuthLayout } from "@/auth/layouts/AuthLayout";
import { LoginPage } from "@/auth/pages/LoginPage";
import { AuthRedirect } from "@/components/AuthRedirect";

export const AuthRoutes = [
  {
    path: "/auth/login",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: LoginPage,
      },
    ],
  },

  {
    path: "/*",
    Component: AuthRedirect,
  },
]