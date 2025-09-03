import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useWebSocket(onMessage: (msg: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket("wss://deciding-chamois-luckily.ngrok-free.app");
      // socketRef.current = new WebSocket("ws://localhost:8300");

      socketRef.current.onopen = () => {
        console.log("✅ Conectado ao WebSocket");
      };

      socketRef.current.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        onMessage(msg);
      };
    }

    return () => {
      // não fecha aqui, para manter a conexão global
    };
  }, [onMessage]);

  return socketRef.current;
}
