import { Button } from "@/components/ui/button";
import { UseAuth } from "@/hooks/UseAuth";
import { LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { getMenuItems } from "../lib/sidebarOptions";
import { UseBreadcums } from "@/hooks/UseBreadcums";

export const Sidebar = () => {
  const { user, startLogout } = UseAuth();
  const { breadcums } = UseBreadcums();

  return (
    <section className="flex flex-col h-screen py-5 px-10 border-r border-border w-86">
      <div className="flex flex-col mb-5">
        <h1 className="text-3xl font-bold">TaskFlow</h1>
        <small className="text-sm text-gray-500">{user!.name}</small>
      </div>
      <nav className="flex flex-col h-full gap-3">
        {getMenuItems(user.role).map((item, index) => (
          <NavLink
            to={item.path}
            key={item.label}
            className={({ isActive }) => {
              if (isActive || breadcums.length === 0 && index === 0) {
                return "flex items-center gap-2 font-medium bg-black/5 rounded-md p-2";
              }
              return isActive
                ? "flex items-center gap-2 font-medium bg-black/5 rounded-md p-2"
                : "flex items-center gap-2 font-medium hover:bg-black/5 rounded-md p-2";
            }}
          >
            <item.icon />
            {item.label}
          </NavLink>
        ))}
        <Button
          onClick={() => startLogout()}
          className="w-full mt-auto cursor-pointer"
        >
          <LogOut />
          Cerrar sesión
        </Button>
      </nav>
    </section>
  );
};
