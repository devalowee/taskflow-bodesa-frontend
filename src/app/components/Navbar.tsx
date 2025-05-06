import { UseAuth } from "@/hooks/UseAuth";
import { Bell, Search } from "lucide-react";
import { getRole } from "../lib/getRole";
import { Breadcums } from "./Breadcums";
import { useSocketContext } from "@/context/SocketContext";
import { useEffect } from "react";
import { toast } from "sonner";

export const Navbar = () => {
  const { socketEmit, socketOn, socketOff, connected } = useSocketContext();
  const { user } = UseAuth();

  const touchNotification = () => {
    socketEmit('touch-notification', user.id);
  }
  
  useEffect(() => {
    socketEmit('join-notifications', user.id);

    socketOn('new-notification', (data: unknown) => {
      console.log(data);
      toast('Nueva notificación', {
        description: 'Has recibido una nueva notificación',
      });
    });

    return () => {
      socketOff('new-notification');

    }
    // eslint-disable-next-line
  }, [connected]);
  
  return (
    <header className="flex justify-between px-10 border-b border-border bg-white animate-fade-in-down h-[60px]">
      <Breadcums />
      <div className="flex items-center gap-5 pl-5">
        <div className="flex items-center gap-4 border-r border-border pr-4">
          <Search size={16} onClick={touchNotification}/>
          <Bell size={16} onClick={touchNotification}/>
        </div>
        <p className="text-sm font-medium">{getRole(user.role)}</p>
        <img src={user.avatar} alt="avatar" className="size-7.5 rounded-full" />
      </div>
    </header>
  )
}
