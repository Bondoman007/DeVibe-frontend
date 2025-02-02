import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Loader2, UserX, MessageSquare } from "lucide-react";
import { BASE_URL } from "../utils/constants";

function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(response.data?.data);
      console.log(response.data?.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching connections:", error);
      setError("Failed to load connections. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#64ffda] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-[#8892b0]">
        <UserX className="w-16 h-16 mb-4 text-red-400" />
        <h3 className="text-xl font-semibold mb-2">
          Error Loading Connections
        </h3>
        <p>{error}</p>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-[#8892b0]">
        <Users className="w-16 h-16 mb-4 text-[#64ffda]" />
        <h3 className="text-xl font-semibold mb-2">No Connections Yet</h3>
        <p>Start connecting with other users to grow your network!</p>
      </div>
    );
  }

  return (
    connections && (
      <div className="bg-[#20252c] rounded-xl shadow-xl overflow-hidden ">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#e6f1ff]">
              My Connections
            </h2>
            <span className="px-3 py-1 bg-[#1b2d4d] rounded-full text-[#64ffda] text-sm">
              {connections.length}{" "}
              {connections.length === 1 ? "Connection" : "Connections"}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {connections.map((connection) => (
              <div
                key={connection._id}
                className="bg-[#1b2d4d] rounded-lg border border-[#233554] hover:border-[#64ffda] transition-colors p-4"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-[#233554] flex-shrink-0">
                    {connection.photoUrl ? (
                      <img
                        src={connection.photoUrl}
                        alt={`${connection.firstName} ${connection.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#1b2d4d]">
                        <Users className="w-8 h-8 text-[#64ffda]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#e6f1ff] font-semibold truncate">
                      {connection.firstName} {connection.lastName}
                    </h3>

                    <p className="text-sm text-[#8892b0] line-clamp-2">
                      {connection.about || "No bio available"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#233554] flex justify-between items-center">
                  <span className="text-xs text-[#8892b0]">
                    Connected{" "}
                    {new Date(connection.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() =>
                      (window.location.href = `/messages/${connection.id}`)
                    }
                    className="p-2 rounded-full text-[#64ffda] hover:bg-[#233554] transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
}

export default Connections;
