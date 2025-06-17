import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const creatSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", {
      path: "/https://devibe-backend.onrender.com/socket.io",
    });
  }
};
