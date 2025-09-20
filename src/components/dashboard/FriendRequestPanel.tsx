import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RequestUser {
  id: number;
  first_name: string;
  last_name: string;
  profile: string | null;
}

interface FriendRequest {
  id: number;
  from_parent: RequestUser;
  to_parent_id: number;
  status: string;
}

const FriendRequestPanel: React.FC = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch received requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          console.error("User not found in localStorage");
          setLoading(false);
          return;
        }

        const { id } = JSON.parse(user);
        setUserId(id);

        const formData = new FormData();
        formData.append("parent_id", id);

        const res = await axios.post(
          "https://argosmob.com/being-petz/public/api/v1/pet/friends/get-requests",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setRequests(res.data?.received_requests || []);
      } catch (err) {
        console.error("Error fetching requests", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle Confirm / Delete
  const handleRespond = async (requestId: number, action: "accepted" | "rejected") => {
    if (!userId) return;

    try {
      const formData = new FormData();
      formData.append("request_id", String(requestId));
      formData.append("action", action);
      formData.append("parent_id", String(userId));

      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/pet/friends/respond-request",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Respond API Response:", res.data);

      if (res.data?.status) {
        alert(`Request ${action === "accepted" ? "accepted ✅" : "rejected ❌"}`);
        setRequests((prev) => prev.filter((req) => req.id !== requestId));
      } else {
        alert(res.data?.message || "Action failed ❌");
      }
    } catch (err: any) {
      console.error("Error responding to request", err.response?.data || err);
      alert(err.response?.data?.message || "Something went wrong ❌");
    }
  };

  if (loading) {
    return <p className="text-center">Loading requests...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">Friend Requests</h3>
        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
          {requests.length}
        </span>
      </div>

      <ul className="space-y-3">
        {requests.length > 0 ? (
          requests.map((req) => (
            <li key={req.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={
                    req.from_parent.profile
                      ? `https://argosmob.com/being-petz/public/${req.from_parent.profile}`
                      : "https://avatar.iran.liara.run/public"
                  }
                  alt={req.from_parent.first_name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-medium">
                    {req.from_parent.first_name} {req.from_parent.last_name}
                  </p>
                  <p className="text-xs text-gray-500">Wants to be your friend</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
                  onClick={() => handleRespond(req.id, "accepted")}
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm"
                  onClick={() => handleRespond(req.id, "rejected")}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No friend requests</p>
        )}
      </ul>

      {requests.length > 0 && (
        <button
          className="mt-3 text-purple-600 text-sm font-medium hover:underline"
          onClick={() => navigate("/friend-requests")}
        >
          View More Requests
        </button>
      )}
    </div>
  );
};

export default FriendRequestPanel;
