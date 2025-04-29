import React from 'react';
import { AppLayout } from "@/app/layouts/AppLayout";
import { Home } from "@/app/pages/Home";
import { Boards } from "@/app/pages/Boards";
import { Requests } from "@/app/pages/Requests";
import { Settings } from "@/app/pages/Settings";
import { DashboardRedirect } from "@/components/DashboardRedirect";
import { Users } from "@/app/pages/Users";
import { BoardUsers } from "@/app/pages/boards/BoardUsers";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SingleBoard } from '@/app/pages/boards/SingleBoard';

const createProtectedRoute = (allowedRoles: string[]) => {
  return () => React.createElement(ProtectedRoute, { allowedRoles });
}

export const DashboardRoutes = [
  {
    path: "/dashboard",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: DashboardRedirect,
      },
      {
        path: "inicio",
        Component: Home,
      },
      {
        path: "tableros",
        Component: Boards,
      },
      {
        path: "tableros/:slug",
        children: [
          {
            index: true,
            Component: SingleBoard,
          },
          {
            path: "usuarios",
            Component: createProtectedRoute(['ADMIN', 'SUPER_ADMIN', 'ADMIN_DESIGN']),
            children: [
              {
                index: true,
                Component: BoardUsers,
              },
            ],
          },
        ],
      },
      {
        path: "solicitudes",
        Component: Requests,
      },
      {
        path: "usuarios",
        Component: createProtectedRoute(['ADMIN', 'SUPER_ADMIN', 'ADMIN_DESIGN']),
        children: [
          {
            index: true,
            Component: Users,
          },
        ],
      },
      {
        path: "configuracion",
        Component: Settings,
      },
    ],
  },
  {
    path: "/*",
    Component: DashboardRedirect,
  },
];

