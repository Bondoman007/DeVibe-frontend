import io from "socket.io-client";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:5000"); // assuming dev server
  } else {
    return io("https://devibe-backend.onrender.com", {
      path: "/socket.io", // default socket.io path; change only if backend uses a custom path
    });
  }
};
