import { Button } from "@/components/ui/button";
import { UseAuth } from "@/hooks/UseAuth";
import { LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { getMenuItems } from "../lib/sidebarOptions";
// import { UseBreadcums } from "@/hooks/UseBreadcums";
import { useQuery } from "@tanstack/react-query";
import { UseBoards } from "@/hooks/UseBoards";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { BoardNavItem } from "./BoardNavItem";

export const Sidebar = () => {
  const { user, startLogout } = UseAuth();
  // const { breadcums } = UseBreadcums();
  const { getUserBoards } = UseBoards();

  const { data: boardsQuery, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: async () => {
      const { ok, message, boards = [] } = await getUserBoards(user.role);

      if (!ok) {
        toast.error(message);
        return boards;
      }

      return boards;
    },
  });

  return (
    <section className="flex flex-col h-screen py-5 px-10 border-r border-border w-86">
      <div className="flex flex-col mb-5">
        <h1 className="text-3xl font-bold">TaskFlow</h1>
        <small className="text-sm text-gray-500">{user!.name}</small>
      </div>
      <nav className="flex flex-col h-full gap-3">
        { getMenuItems(user.role).map((menuItem) => (
          <div key={menuItem.slug}>
            <small className="text-xs text-gray-500">{ menuItem.menuTitle }</small>
            <div className="flex flex-col gap-2 mt-1">
              { menuItem.menuChildren.map((child) => (
                child.path === '/tableros' ? (
                  isLoading ? (
                    <div key={child.path}>
                      <Skeleton className="w-full h-10 rounded-md" />
                      <Skeleton className="w-full h-10 rounded-md" />
                      <Skeleton className="w-full h-10 rounded-md" />
                    </div>
                  ) : (
                    boardsQuery?.map((board) => (
                      <BoardNavItem
                        key={board.id}
                        name={board.name}
                        slug={board.slug}
                        color={board.color}
                        initials={board.initials}
                      />
                    ))
                  )
                ) : (
                  <NavLink 
                    to={child.path} 
                    key={child.path} 
                    className={({ isActive }) => (
                      `flex items-center gap-2 hover:bg-gray-100 rounded-md p-2 ${isActive && 'bg-gray-100'}`
                    )}
                  > 
                    <child.icon />
                    { child.label }
                  </NavLink>
                )
              )) }
            </div>
          </div>
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
