import { Button } from "@/components/ui/button";
import { UseAuth } from "@/hooks/UseAuth";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { NavLink } from "react-router";
import { getMenuItems } from "../lib/sidebarOptions";
import { useQuery } from "@tanstack/react-query";
import { UseBoards } from "@/hooks/UseBoards";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { BoardNavItem } from "./BoardNavItem";
import { useState } from "react";

export const Sidebar = () => {
  const { user, startLogout } = UseAuth();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const { getUserBoards } = UseBoards();

  const { data: boardsQuery, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const { ok, message, boards = [] } = await getUserBoards(user.role);

      if (!ok) {
        toast.error(message);
        return boards;
      }

      return boards;
    },
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <aside className="min-w-16 h-screen"></aside>
      <section
        className={`flex flex-col h-screen gap-6 py-5 border-r border-border absolute min-w-16 max-w-86 bg-white left-0 z-1 shadow ${ isOpen ? "px-6" : "px-2 items-center" }`}
      >
        <header className="flex gap-3 items-center">
          {
            isOpen && (
              <h1 className={`text-xl font-black transition-opacity ${ isOpen ? "opacity-100" : "opacity-0" }`}>{isOpen ? "Flowee" : ""}</h1>
            )
          }
          <img src="/images/flowee-logo.svg" alt="Flowee" className={`${ isOpen ? "w-4" : "w-6" }`} />
        </header>
        <nav className="flex flex-col h-full gap-4 py-1 overflow-y-auto scrollbar-none">
          {getMenuItems(user.role).map((menuItem) => (
            <div key={menuItem.slug}>
              {
                isOpen && (
                  <small className="text-xs text-gray-500">
                    {menuItem.menuTitle}
                  </small>
                )
              }
              <div className="flex flex-col gap-2 mt-1">
                {menuItem.menuChildren.map((child) =>
                  child.path === "/tableros" ? (
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
                          isOpen={isOpen}
                        />
                      ))
                    )
                  ) : (
                    <NavLink
                      to={child.path}
                      key={child.path}
                      className={({ isActive }) =>
                        `flex items-center bg-gray-100 hover:bg-violet-100 rounded-md p-2 ${
                          isActive && "bg-violet-100"
                        } ${ isOpen ? "gap-2" : "gap-0" }`
                      }
                    >
                      <child.icon />
                      {isOpen ? child.label : ""}
                    </NavLink>
                  )
                )}
              </div>
            </div>
          ))}
        </nav>
        <footer className="mt-auto flex flex-col gap-4">
          <Button
            onClick={() => startLogout()}
            className="w-full cursor-pointer"
          >
            <LogOut />
            {
              isOpen ? "Cerrar sesión" : ""
            }
          </Button>
          <div className={`flex items-center ${ isOpen ? "justify-between" : "justify-center" }`}>
            <aside className={`flex-col gap-3 ${ isOpen ? "flex" : "hidden" }`}>
              <img
                src="/images/alowee-logo.svg"
                alt="Alowee"
                className="w-16"
              />
              <p className="text-xs text-gray-500">
                © 2025 <span className="text-indigo-600">Alowee</span>. <br />
                Derechos reservados
              </p>
            </aside>
            {
              isOpen ? (
                <PanelLeftClose
                  strokeWidth={1.25}
                  className="size-8 text-indigo-600 cursor-pointer"
                  onClick={toggleSidebar}
                />
              ) : (
                <PanelLeftOpen
                  strokeWidth={1.25}
                  className="size-8 text-indigo-600 cursor-pointer"
                  onClick={toggleSidebar}
                />
              )
            }
          </div>
        </footer>
      </section>
    </>
  );
};
