import { ClipboardList, Home, ListCheck, Rocket, Settings, Table, Users } from "lucide-react";
import { Roles } from "./helpers";

interface MenuItem {
  label: string;
  icon: React.ElementType;
  path: string;
  allowedRoles: string[];
}

export const menuItems: MenuItem[] = [
  {
    label: "Inicio",
    icon: Home,
    path: "/dashboard/inicio",
    allowedRoles: ['ALL'],
  },
  {
    label: "Tableros",
    icon: Table,
    path: "/dashboard/tableros",
    allowedRoles: ['ALL'],
  },
  {
    label: "Autoasignaciones",
    icon: Rocket,
    path: "/dashboard/autoasignaciones",
    allowedRoles: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.ADMIN_DESIGN, Roles.ADMIN_PUBLISHER],
  },
  {
    label: "Centro de asignaciones",
    icon: ClipboardList,
    path: "/dashboard/centro-de-asignaciones",
    allowedRoles: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.ADMIN_DESIGN, Roles.ADMIN_PUBLISHER],
  },
  {
    label: "Solicitudes",
    icon: ListCheck,
    path: "/dashboard/solicitudes",
    allowedRoles: ['ALL'],
  },
  {
    label: 'Usuarios',
    icon: Users,
    path: '/dashboard/usuarios',
    allowedRoles: [Roles.ADMIN, Roles.SUPER_ADMIN],
  },
  {
    label: "Configuración",
    icon: Settings,
    path: "/dashboard/configuracion",
    allowedRoles: ['ALL'],
  },
];

export const getMenuItems = (role: string) => {
  return menuItems.filter((item) => {
    if (item.allowedRoles.includes('ALL')) return true;
    return item.allowedRoles.includes(role);
  });
};
