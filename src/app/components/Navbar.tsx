import { UseAuth } from "@/hooks/UseAuth";
import { Bell, Mail } from "lucide-react";
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
    <header className="flex justify-between px-10 py-5 border-b border-border bg-white animate-fade-in-down">
      <Breadcums />
      <div className="flex items-center gap-10 border-l border-border pl-5">
        <p>Hola, <span className="font-bold">{getRole(user.role)}</span></p>
        <div className="flex items-center gap-4">
            <img src={user.avatar} alt="avatar" className="size-7 rounded-full" />
          <Mail className="text-violet-500" onClick={touchNotification}/>
          <Bell className="text-violet-500" onClick={touchNotification}/>
        </div>
      </div>
    </header>
  )
}
