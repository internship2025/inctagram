import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocketConnection = () => {
  if (socket) return socket; 

  const accessToken = localStorage.getItem("access_token");

  socket = io("https://inctagram.work", {
    query: { accessToken },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("WebSocket connected");
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("WebSocket connection error:", err);
  });

  return socket;
};

export const subscribeToNotifications = (callback: (data: any) => void) => {
  if (!socket) {
    console.error("Socket is not initialized");
    return;
  }
  socket.on("notifications", callback);
};


export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};