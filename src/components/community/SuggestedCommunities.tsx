import React, { useEffect, useState } from "react";
import axios from "axios";
import catIcon from "../../assets/img/cat.jpg";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  profile?: string;
};

type Community = {
  id: number;
  name: string;
  cover_image?: string;
  created_by: number;
  creator?: User;
  users?: User[];
};

const SuggestedCommunities: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState<number | null>(null);

  // Get logged-in user ID from localStorage
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(
          "https://argosmob.com/being-petz/public/api/v1/pet/community/get"
        );

        let fetchedCommunities: Community[] = response.data.data;

        // Filter out communities created by the user or joined by the user
        const filteredCommunities = fetchedCommunities.filter((community) => {
          const isCreator = community.created_by === userId;
          const isMember = community.users?.some((user) => user.id === userId);
          return !isCreator && !isMember;
        });

        setCommunities(filteredCommunities);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [userId]);

  const handleJoin = async (communityId: number) => {
    if (!userId) return;

    try {
      setJoining(communityId);
      const response = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/pet/community/join",
        {
          user_id: userId,
          community_id: communityId,
        }
      );

      if (response.data?.status) {
        // Remove the joined community from suggested list
        setCommunities((prev) => prev.filter((c) => c.id !== communityId));
      } else {
        alert(response.data?.message || "Failed to join community");
      }
    } catch (error) {
      console.error("Error joining community:", error);
      alert("Error joining community");
    } finally {
      setJoining(null);
    }
  };

  if (loading) return <div>Loading communities...</div>;
  if (!communities.length)
    return (
      <div className="text-center text-gray-500 py-4">
        No suggested communities available
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-purple-700 border-b pb-2">
        Suggested Communities
      </h2>

      <div className="grid gap-4">
        {communities.map((community) => (
          <div
            key={community.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <img
                src={community.cover_image || catIcon}
                alt={community.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />

              {/* Name + Members */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                    {community.name}
                  </h3>

                  {/* Small Join Button */}
                  <button
                    onClick={() => handleJoin(community.id)}
                    disabled={joining === community.id}
                    className={`ml-2 px-3 py-1 rounded-md text-xs font-medium transition-colors
                      ${joining === community.id
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                  >
                    {joining === community.id ? "Joining..." : "Join"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {community.users?.length || 0} members
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedCommunities;
