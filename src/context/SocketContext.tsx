import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  socketEmit: (event: string, data: unknown) => void;
  socketOn: <T = unknown> (event: string, callback: (data: T) => void) => void;
  socketOff: (event: string, callback?: () => void) => void;
  connected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      withCredentials: true
    })

    socketRef.current = socket

    socket.on('connect', () => setConnected(true))
    
    socket.on('disconnect', () => setConnected(false))

    return () => {
      socket.disconnect()
    }
  }, []);

  const socketEmit = (event: string, data: unknown) => {
    socketRef.current?.emit(event, data)
  }

  const socketOn = <T = unknown> (event: string, callback: (data: T) => void) => {
    socketRef.current?.on(event, callback);
  };

  const socketOff = (event: string) => {
    socketRef.current?.off(event)
  }

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, socketEmit, socketOn, socketOff, connected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext)

  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider')
  }

  return context
}
