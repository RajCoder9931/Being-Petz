import React, { useEffect, useState } from "react";
import axios from "axios";

interface Friend {
  id: number;  
  name: string;
  desc: string;
  mutual: number;
  img: string;
}

const FriendSuggestions: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<number | null>(null);

  // Fetch Suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
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
          "https://argosmob.com/being-petz/public/api/v1/pet/friends/suggestions",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = res.data?.data || [];

        const formatted: Friend[] = data.map((item: any) => ({
          id: item.parent_id || item.id,
          name: `${item.first_name} ${item.last_name}`,
          desc: item.role || "Pet Lover",
          mutual: 0,
          img: item.profile
            ? `https://argosmob.com/being-petz/public/${item.profile}`
            : "https://avatar.iran.liara.run/username?username=[firstname+lastname]",
        }));

        setSuggestions(formatted);
      } catch (err) {
        console.error("Error fetching suggestions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  // send the friend request
  const handleAddFriend = async (receiverId: number) => {
    if (!userId) return;

    try {
      const formData = new FormData();
      formData.append("from_parent_id", String(userId));
      formData.append("to_parent_id", String(receiverId));

      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/pet/friends/send-request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Send Request Response:", res.data);

      if (res.data?.status) {
        alert("Friend request sent successfully");
        setSuggestions((prev) =>
          prev.filter((friend) => friend.id !== receiverId)
        );
      } else {
        alert(res.data?.message || "Failed to send request");
      }
    } catch (err: any) {
      console.error("Error sending friend request", err.response?.data || err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-4 text-center">
        Loading suggestions...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* Header */}
      <div className="bg-purple-600 px-4 py-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Friend Suggestions</h3>
        <button className="bg-white text-purple-600 px-3 py-1 rounded-lg text-sm">
          See All
        </button>
      </div>

      {/* Cards Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {suggestions.length > 0 ? (
          suggestions.slice(0, 6).map((s, index) => (    
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-3 shadow-sm flex flex-col items-center text-center"
            >
              <img
                src={s.img}
                alt={s.name}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-gray-500">{s.desc}</p>
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full mt-1">
                {s.mutual} Mutual Friends
              </span>

              <div className="flex gap-2 mt-3">
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
                  onClick={() => handleAddFriend(s.id)}
                >
                  Add Friend
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm">
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No suggestions available</p>
        )}
      </div>
    </div>
  );
};

export default FriendSuggestions;
