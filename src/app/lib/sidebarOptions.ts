import { Home, ListCheck, Settings, Table, Users } from "lucide-react";

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
    label: "Solicitudes",
    icon: ListCheck,
    path: "/dashboard/solicitudes",
    allowedRoles: ['ALL'],
  },
  {
    label: 'Usuarios',
    icon: Users,
    path: '/dashboard/usuarios',
    allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
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
