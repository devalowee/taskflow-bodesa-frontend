import { BookDashed, ClipboardList, Home, ListCheck, Rocket, Settings, Table, Users } from "lucide-react";
import { Roles } from "./helpers";

interface MenuItem {
  menuTitle: string;
  slug: string;
  menuChildren: MenuChildren[];
}

interface MenuChildren {
  label: string;
  icon: React.ElementType;
  path: string;
  allowedRoles: string[];
}

export const menuItems: MenuItem[] = [
  {
    menuTitle: "Centro de control",
    slug: "centro-de-control",
    menuChildren: [
      {
        label: "Inicio",
        icon: Home,
        path: "/",
        allowedRoles: ['ALL'],
      },
      {
        label: "Autoasignaciones",
        icon: Rocket,
        path: "/autoasignaciones",
        allowedRoles: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.ADMIN_DESIGN, Roles.ADMIN_PUBLISHER],
      },
      {
        label: "Centro de asignaciones",
        icon: ClipboardList,
        path: "/centro-de-asignaciones",
        allowedRoles: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.ADMIN_DESIGN, Roles.ADMIN_PUBLISHER],
      },
      {
        label: "Tareas",
        icon: ListCheck,
        path: "/tareas",
        allowedRoles: ['ALL'],
      },
    ],
  },
  {
    menuTitle: "Tableros",
    slug: "tableros",
    menuChildren: [
      {
        label: "Tableros",
        icon: Table,
        path: "/tableros",
        allowedRoles: ['ALL'],
      },
    ],
  },
  {
    menuTitle: "Configuración",
    slug: "configuracion",
    menuChildren: [
      {
        label: "Formatos",
        icon: BookDashed,
        path: "/formatos",
        allowedRoles: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.ADMIN_DESIGN, Roles.ADMIN_PUBLISHER],
      },
      {
        label: 'Usuarios',
        icon: Users,
        path: '/usuarios',
        allowedRoles: [Roles.ADMIN, Roles.SUPER_ADMIN],
      },
      {
        label: "Configuración",
        icon: Settings,
        path: "/configuracion",
        allowedRoles: ['ALL'],
      },
    ],
  },
];

export const getMenuItems = (role: string) => {
  return menuItems.filter((item) => {
    if (item.menuChildren.some((child) => child.allowedRoles.includes('ALL'))) return true;
    return item.menuChildren.some((child) => child.allowedRoles.includes(role));
  });
};
