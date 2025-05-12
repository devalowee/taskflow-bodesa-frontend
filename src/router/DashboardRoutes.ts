import React from "react";
import { AppLayout } from "@/app/layouts/AppLayout";
import { Home } from "@/app/pages/Home";
import { Boards } from "@/app/pages/Boards";
import { Tasks } from "@/app/pages/Tasks";
import { Settings } from "@/app/pages/Settings";
import { DashboardRedirect } from "@/components/DashboardRedirect";
import { Users } from "@/app/pages/Users";
import { BoardUsers } from "@/app/pages/boards/BoardUsers";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { SingleBoard } from "@/app/pages/boards/SingleBoard";
import { Assignments } from "@/app/pages/Assignments";
import { Roles } from "@/app/lib/helpers";
import { AutoAssignments } from "@/app/pages/AutoAssignments";
import { SingleRequest } from "@/app/pages/requests/SingleRequest";
import { Formats } from "@/app/pages/Formats";
import { Categories } from "@/app/pages/formats/Categories";
import { CreateTask } from "@/app/pages/tasks/CreateTask";

const createProtectedRoute = (allowedRoles: string[]) => {
  return () => React.createElement(ProtectedRoute, { allowedRoles });
};

export const DashboardRoutes = [
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
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
        path: "tareas",
        children: [
          {
            index: true,
            Component: Tasks,
          },
          {
            path: "crear",
            Component: CreateTask,
          },
          {
            path: ":id",
            Component: SingleRequest,
          },
        ],
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
            Component: AutoAssignments,
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
        path: "formatos", 
        Component: createProtectedRoute([
          Roles.ADMIN,
          Roles.SUPER_ADMIN,
          Roles.ADMIN_DESIGN,
          Roles.ADMIN_PUBLISHER,
        ]),
        children: [
          {
            index: true,
            Component: Formats,
          },
          {
            path: ':formatSlug/categorias',
            Component: Categories,
          }
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
