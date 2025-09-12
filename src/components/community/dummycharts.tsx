import React, { useState } from "react";
import axios from "axios";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  profile: string | null;
}

interface Message {
  id: number;
  message_text: string;
  created_at: string;
  user: User;
}

interface ApiResponse {
  status: boolean;
  data: Message[];
}

const CommunityMessagesFetcher: React.FC = () => {
  const [communityId, setCommunityId] = useState("");
  const [userId, setUserId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchMessages = async () => {
    if (!communityId || !userId) {
      alert("Please enter both Community ID and User ID");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<ApiResponse>(
        "https://argosmob.com/being-petz/public/api/v1/community/get-messages",
        {
          community_id: parseInt(communityId),
          user_id: parseInt(userId),
        }
      );

      if (response.data.status) {
        setMessages(response.data.data);
      } else {
        setMessages([]);
        alert("No messages found.");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Error fetching messages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Fetch Community Messages</h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Community ID"
          value={communityId}
          onChange={(e) => setCommunityId(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleFetchMessages}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Fetching..." : "Fetch Messages"}
        </button>
      </div>

      <div>
        {messages.length === 0 && !loading && <p>No messages to show.</p>}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="p-4 mb-2 border rounded-lg shadow-sm bg-white"
          >
            <div className="flex items-center mb-1">
              <img
                src={msg.user.profile || "https://via.placeholder.com/40"}
                alt={msg.user.first_name}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">
                  {msg.user.first_name} {msg.user.last_name}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <p>{msg.message_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityMessagesFetcher;
