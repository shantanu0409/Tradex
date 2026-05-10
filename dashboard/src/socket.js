import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:3002";

const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  transports: ["websocket", "polling"],
});

export default socket;