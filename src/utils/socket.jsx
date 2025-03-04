import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const creatSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/api", {
      path: "/api/socket.io",
    });
  }
};
