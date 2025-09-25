import { useState, useEffect } from "react";
import axios from "axios";
import { Community } from './CommunityApp';
import catIcon from "../../assets/img/cat.jpg";

interface Props {
  communities: Community[];
  onCreate: (addCommunity: (c: Community) => void) => void;
  onSelectCommunity: (c: Community) => void;
}

interface Creator {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile?: string | null;
}

interface ApiCommunity {
  id: number;
  role: string;
  parent_id: number;
  community: {
    id: number;
    name: string;
    profile: string | null;
    created_by: number;
  };
  creator?: Creator;
}

// Community & creator images

const getCommunityImage = (profile?: string | null) => {
  if (profile) {
    return profile.startsWith("http")
      ? profile
      : `https://argosmob.com/being-petz/public/${profile}`;
  }
  return catIcon;
};

// Dummy images for fallback
const dummyImages = [
  "https://place-puppy.com/80x80",
  "https://placekitten.com/80/80",
  "https://placedog.net/80/80",
  "https://placebear.com/80/80",
  "https://placeimg.com/80/80/animals",
];

export default function CommunityList({ communities, onCreate, onSelectCommunity }: Props) {
  const [localCommunities, setLocalCommunities] = useState<Community[]>(communities);
  const [categories, setCategories] = useState<ApiCommunity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch own & joined communities
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser.id;

    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://argosmob.com/being-petz/public/api/v1/pet/community/my",
          { parent_id: userId }
        );
        const allCommunities: ApiCommunity[] = response.data?.data?.data || [];
        setCategories(allCommunities);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Add new community
  const handleCreate = () => {
    onCreate((newCommunity: Community) => {
      setLocalCommunities((prev) => [...prev, newCommunity]);
    });
  };

  return (
    <>
      {/* Categories section (horizontal scroll) */}
      <div className="flex gap-4 overflow-x-auto mb-6">
        {/* Create new community */}
        <div
          onClick={handleCreate}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-500 text-white text-2xl">
            +
          </div>
          <p className="text-xs mt-1">Create</p>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : (
          categories.map((cat, idx) => (
            <div
              key={cat.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onSelectCommunity({ id: cat.community.id, name: cat.community.name, message: "", time: "", unread: 0 })}
            >
              <div className="w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden">
                <img
                  src={cat.community.profile ? getCommunityImage(cat.community.profile) : dummyImages[idx % dummyImages.length]}
                  alt={cat.community.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs mt-1">{cat.community.name}</p>
            </div>
          ))
        )}
      </div>

      {/* Community List */}
      <div className="mt-6 space-y-3">
        {localCommunities.map((c) => (
          <div
            key={c.id}
            className="flex justify-between items-center bg-white p-4 rounded-xl shadow cursor-pointer"
            onClick={() => onSelectCommunity(c)}
          >
            <div>
              <h3 className="font-bold text-purple-700">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.message}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">{c.time}</span>
              {c.unread > 0 && (
                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mt-1">
                  {c.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}





