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

  // Get logged-in user ID from localStorage
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get(
          "https://argosmob.com/being-petz/public/api/v1/pet/community/get"
        );

        let fetchedCommunities: Community[] = response.data.data; // assuming response.data.data contains the array

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

  if (loading) return <div>Loading communities...</div>;
  if (!communities.length)
    return <div className="text-center text-gray-500 py-4">No suggested communities available</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">SUGGESTED COMMUNITIES</h2>
      <div className="space-y-3">
        {communities.map((community) => (
          <div
            key={community.id}
            className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={community.cover_image || catIcon}
                alt={community.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm">{community.name}</h3>
                <p className="text-xs text-gray-500">
                  {community.users?.length || 0} members
                </p>
              </div>
            </div>

            <button
              onClick={() => alert(`Joining community ${community.id}`)}
              className="w-full bg-purple-600 text-white py-1.5 px-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedCommunities;
