import React from "react";
import { AppLayout } from "@/app/layouts/AppLayout";
import { Home } from "@/app/pages/Home";
import { Boards } from "@/app/pages/Boards";
import { Requests } from "@/app/pages/Requests";
import { Settings } from "@/app/pages/Settings";
import { DashboardRedirect } from "@/components/DashboardRedirect";
import { Users } from "@/app/pages/Users";
import { BoardUsers } from "@/app/pages/boards/BoardUsers";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SingleBoard } from "@/app/pages/boards/SingleBoard";
import { Assignments } from "@/app/pages/Assignments";
import { Roles } from "@/app/lib/helpers";
import { AutoAssigments } from "@/app/pages/AutoAssigments";

const createProtectedRoute = (allowedRoles: string[]) => {
  return () => React.createElement(ProtectedRoute, { allowedRoles });
};

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
            Component: createProtectedRoute([
              Roles.ADMIN,
              Roles.SUPER_ADMIN,
              Roles.ADMIN_DESIGN,
            ]),
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
        path: "centro-de-asignaciones",
        Component: createProtectedRoute([
          Roles.ADMIN,
          Roles.SUPER_ADMIN,
          Roles.ADMIN_DESIGN,
          Roles.ADMIN_PUBLISHER,
        ]),
        children: [
          {
            index: true,
            Component: Assignments,
          },
        ],
      },
      {
        path: "autoasignaciones",
        Component: createProtectedRoute([
          Roles.ADMIN,
          Roles.SUPER_ADMIN,
          Roles.ADMIN_DESIGN,
          Roles.ADMIN_PUBLISHER,
        ]),
        children: [
          {
            index: true,
            Component: AutoAssigments,
          },
        ],
      },
      {
        path: "usuarios",
        Component: createProtectedRoute([
          Roles.ADMIN,
          Roles.SUPER_ADMIN,
          Roles.ADMIN_DESIGN,
        ]),
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
