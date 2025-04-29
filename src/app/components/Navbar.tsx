import { UseAuth } from "@/hooks/UseAuth";
import { Bell, Mail } from "lucide-react";
import { getRole } from "../lib/getRole";
import { Breadcums } from "./Breadcums";

// const getInitials = (name: string) => {
//   const parts = name.split(' ');
//   return (parts[0]?.[0] || '') + (parts[1]?.[0] || '').toUpperCase();
// }

export const Navbar = () => {
  const { user } = UseAuth();
  return (
    <header className="flex justify-between px-10 py-5 border-b border-border bg-white animate-fade-in-down">
      <Breadcums />
      <div className="flex items-center gap-10 border-l border-border pl-5">
        <p>Hola, <span className="font-bold">{getRole(user.role)}</span></p>
        <div className="flex items-center gap-4">
            <img src={user.avatar} alt="avatar" className="size-7 rounded-full" />
          <Mail className="text-violet-500"/>
          <Bell className="text-violet-500"/>
        </div>
      </div>
    </header>
  )
}
