import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socket = io('http://localhost:3000', {
      withCredentials: true
    })
    socketRef.current = socket

    return () => {
      socket.close()
    }
  }, [])

  const socketEmit = (event: string, data: unknown) => {
    socketRef.current?.emit(event, data)
  }

  const socketOn = <T = unknown>(event: string, callback: (data: T) => void) => {
    socketRef.current?.on(event, callback)
  }

  return {
    socketEmit,
    socketOn,
  }
}