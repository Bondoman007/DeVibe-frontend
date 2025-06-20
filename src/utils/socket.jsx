import io from "socket.io-client";

export const creatSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:3000"); // assuming dev server
  } else {
    return io("https://devibe-backend.onrender.com", {
      path: "/socket.io", // default socket.io path; change only if backend uses a custom path
    });
  }
};
