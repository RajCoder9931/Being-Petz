import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Friend {
  id: number;
  name: string;
  desc: string;
  mutual: number;
  img: string;
}

// Custom Left Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1 hover:bg-gray-100"
  >
    <ChevronLeft className="w-5 h-5 text-gray-700" />
  </button>
);

// Custom Right Arrow
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1 hover:bg-gray-100"
  >
    <ChevronRight className="w-5 h-5 text-gray-700" />
  </button>
);

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
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const data = res.data?.data || [];

        const formatted: Friend[] = data.map((item: any) => ({
          id: item.parent_id || item.id,
          name: `${item.first_name} ${item.last_name}`,
          desc: item.role || "Pet Lover",
          mutual: Math.floor(Math.random() * 5),
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

  const handleAddFriend = async (receiverId: number) => {
    if (!userId) return;

    try {
      const formData = new FormData();
      formData.append("from_parent_id", String(userId));
      formData.append("to_parent_id", String(receiverId));

      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/pet/friends/send-request",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data?.status) {
        alert("Friend request sent successfully");
        setSuggestions((prev) => prev.filter((friend) => friend.id !== receiverId));
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

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden relative p-4">
      {/* Header */}
      <div className="px-2 py-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          People you may know
        </h3>
        <button
          onClick={() => (window.location.href = "/friend-request")}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-1 rounded-md"
        >
          See All
        </button>
      </div>

      {/* Slider inside single card */}
      <div className="p-2">
        {suggestions.length > 0 ? (
          <Slider {...sliderSettings}>
            {suggestions.map((s) => (
              <div key={s.id} className="px-2">
                <div className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col h-64">
                  <div className="h-28 w-full bg-gray-100">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="h-28 w-full object-cover"
                    />
                  </div>

                  <div className="p-2 flex flex-col flex-1">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {s.name}
                    </p>
                    <p className="text-xs text-gray-500">{s.desc}</p>
                    {s.mutual > 0 && (
                      <p className="text-xs text-gray-500">
                        {s.mutual} mutual friend{s.mutual > 1 ? "s" : ""}
                      </p>
                    )}

                    <div className="mt-auto flex flex-col gap-1">
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 rounded-md"
                        onClick={() => handleAddFriend(s.id)}
                      >
                        Add Friend
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1 rounded-md">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-500 text-center">No suggestions available</p>
        )}
      </div>
    </div>
  );
};

export default FriendSuggestions;
