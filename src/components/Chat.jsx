import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { creatSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useRef } from "react";
export default function Chat({ connection, userId }) {
  const targetUserId = connection._id;
  const [inputMessage, setInputMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const firstName = connection?.firstName;
  const lastName = connection?.lastName;
  const photoUrl = connection?.photoUrl;
  const messagesEndRef = useRef(null);

  // Create a socket connection once
  const socket = creatSocketConnection();
  if (!connection && !userId) return;
  // Fetch messages from the server
  const fetchChats = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      let cnt = 0;
      const chatMessages = chat?.data?.messages.map((msg) => {
        return {
          id: cnt++, // Ensuring each message gets a unique id
          text: msg.text,
          sender:
            msg.senderId.toString() === userId.toString() ? "self" : "other",
          time: msg.time,
        };
      });
      setMessages(chatMessages); // Set messages
    } catch (error) {
      console.error("Error fetching chat messages", error);
    }
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    fetchChats();
  }, [targetUserId]); // Add targetUserId as dependency

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinChat", { userId, targetUserId });

    socket.on("messageReceived", ({ text, Id, time }) => {
      if (Id.toString() !== userId.toString()) {
        setMessages((messages) => [
          ...messages,
          {
            text,
            sender: "other",
            time,
          },
        ]);
      }
    });

    return () => {
      socket.off("messageReceived"); // Clean up socket listener on unmount
    };
  }, [userId, targetUserId, socket]); // Ensure socket listener is updated properly

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    socket.emit("sendMessage", {
      userId,
      targetUserId,
      text: inputMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setMessages((messages) => [
      ...messages,
      {
        id: messages.length + 1, // id should be based on the current messages length
        text: inputMessage,
        sender: "self",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="bg-slate-600 border-b border-slate-950 p-4 flex items-center">
        <div className="w-12 h-12 rounded-full bg-slate-950 flex-shrink-0">
          <img
            src={photoUrl}
            alt="User"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="ml-4 flex-1">
          <h2 className="font-semibold">{firstName + " " + lastName}</h2>
          {/* <p className="text-sm text-green-500">Online</p> */}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-800">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "self" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === "self"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black border"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "self"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-slate-900 border-t border-slate-950"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
