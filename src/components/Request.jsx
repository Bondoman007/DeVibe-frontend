import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, Loader2, UserPlus } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/request", {
        withCredentials: true,
      });
      setRequests(response.data?.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, status) => {
    setActionInProgress(requestId);
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setRequests(
        requests.filter(
          (request) => request._id.toString() !== requestId.toString()
        )
      );
    } catch (error) {
      console.error(`Error ${status}ing request:`, error);
    } finally {
      setActionInProgress(null);
    }
  };
  const handleFeedButton = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#64ffda] animate-spin" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-[#8892b0]">
        <button
          onClick={handleFeedButton}
          className="btn btn-outline text-[#64ffda] flex items-center mb-4"
        >
          <svg
            className="h-6 w-6 text-[#64ffda]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="ml-2">Feed</span>
        </button>
        <UserPlus className="w-16 h-16 mb-4 text-[#64ffda]" />
        <h3 className="text-xl font-semibold mb-2">No Pending Requests</h3>
        <p>You don't have any connection requests at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#20252c] rounded-xl shadow-xl overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#e6f1ff]">
          Connection Requests
        </h2>
        <button
          onClick={handleFeedButton}
          className="btn btn-outline text-[#64ffda] flex items-center"
        >
          <svg
            className="h-6 w-6 text-[#64ffda]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="ml-2">Feed</span>
        </button>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="flex items-center justify-between p-4 bg-[#1b2d4d] rounded-lg border border-[#233554] hover:border-[#64ffda] transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#233554] flex-shrink-0">
                {request.fromUserId.photoUrl ? (
                  <img
                    src={request.fromUserId.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#1b2d4d]">
                    <UserPlus className="w-6 h-6 text-[#64ffda]" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-[#e6f1ff] font-semibold">
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </h3>
                <p className="text-sm text-[#8892b0] line-clamp-1">
                  {request.fromUserId.about || "No bio available"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAction(request._id, "accepted")}
                disabled={actionInProgress === request._id}
                className="p-2 rounded-full bg-[#64ffda] text-[#0a192f] hover:bg-[#4ad8be] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionInProgress === request._id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => handleAction(request._id, "rejected")}
                disabled={actionInProgress === request._id}
                className="p-2 rounded-full bg-[#1b2d4d] text-[#64ffda] border border-[#64ffda] hover:bg-[#233554] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Request;
