import { useState, useEffect } from "react";

interface Friend {
  id: number;
  name: string;
  friends: string;
  img: string | null;
  gender: string;
}

const PetFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [parentId, setParentId] = useState<number | null>(null);

  // ✅ get logged-in user id from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setParentId(parsedUser.id);
    }
  }, []);

  // ✅ fetch Pet Friends
  useEffect(() => {
    if (!parentId) return;

    const fetchFriends = async () => {
      try {
        const response = await fetch(
          "https://argosmob.uk/being-petz/public/api/v1/pet/friends/get",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parent_id: parentId }),
          }
        );
        const data = await response.json();

        if (data.status && Array.isArray(data.data)) {
          const formatted = data.data.map((person: any) => {
            const fullName = `${person.first_name || ""} ${person.last_name || ""}`.trim();
            return {
              id: person.id,
              name: fullName,
              friends: `${person.friends_count || 0} friends`,
              img: person.profile
                ? `https://argosmob.uk/being-petz/public/${person.profile}`
                : null, // ❌ no fallback
              gender: person.gender || "",
            };
          });
          setFriends(formatted);
        } else {
          setFriends([]);
        }
      } catch (err) {
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [parentId]);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
          Pet Friends
        </h2>
        <button className="text-purple-600 text-sm">See All</button>
      </div>

      <div className="mt-4 space-y-4">
        {loading ? (
          <p className="text-gray-500">Loading friends...</p>
        ) : friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend.id} className="flex items-center gap-3">
              {friend.img ? (
                <img
                  src={friend.img}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  ?
                </div>
              )}
              <p>{friend.name}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No friends found</p>
        )}
      </div>
    </div>
  );
};

export default PetFriends;
