// import { useState, useEffect } from "react";
// import { Community } from "./CommunityApp";

// interface Props {
//   communities: Community[];
//   onCreate: (addCommunity: (c: Community) => void) => void;
//   onSelectCommunity: (c: Community) => void;
// }

// interface ApiCommunity {
//   id: number;
//   name: string;
//   profile: string; // image field from API
// }
 
// export default function CommunityList({
//   communities,
//   onCreate,
//   onSelectCommunity,
// }: Props) {
//   const [localCommunities, setLocalCommunities] = useState<Community[]>(communities);
//   const [categories, setCategories] = useState<ApiCommunity[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchCommunities = async () => {
//       try {
//         const res = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/community/get");
//         if (!res.ok) throw new Error("Failed to fetch communities");
//         const data = await res.json();
//         console.log("API response:", data);

//         setCategories(data.data || []);
//       } catch (error) {
//         console.error("Error fetching communities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommunities();
//   }, []);

//   // Add new community function
//   const handleCreate = () => {
//     onCreate((newCommunity: Community) => {
//       setLocalCommunities((prev) => [...prev, newCommunity]);
//     });
//   };

//   return (
//     <>
//       {/* Categories */}
//       <div className="flex gap-4 overflow-x-auto">
//         {/* Create new community */}
//         <div
//           onClick={handleCreate}
//           className="flex flex-col items-center cursor-pointer"
//         >
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-500 text-white text-2xl">
//             +
//           </div>
//           <p className="text-xs mt-1">Create</p>
//         </div>

//         {/* API Categories */}
//         {loading ? (
//           <p className="text-gray-500 text-sm">Loading...</p>
//         ) : (
//           categories.map((cat) => (
//             <div key={cat.id} className="flex flex-col items-center">
//               <div className="w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden">
//                 <img
//                   src={`https://argosmob.uk/being-petz/public/${cat.profile}`}
//                   alt={cat.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-xs mt-1">{cat.name}</p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Community List */}
//       <div className="mt-6 space-y-3">
//         {localCommunities.map((c) => (
//           <div
//             key={c.id}
//             className="flex justify-between items-center bg-white p-4 rounded-xl shadow cursor-pointer"
//             onClick={() => onSelectCommunity(c)}
//           >
//             <div>
//               <h3 className="font-bold text-purple-700">{c.name}</h3>
//               <p className="text-sm text-gray-600">{c.message}</p>
//             </div>
//             <div className="flex flex-col items-end">
//               <span className="text-xs text-gray-500">{c.time}</span>
//               {c.unread > 0 && (
//                 <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mt-1">
//                   {c.unread}
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }


// when the join test is succes and 

// import { useState, useEffect } from "react";
// import { Community } from "./CommunityApp";

// interface Props {
//   communities: Community[];
//   onCreate: (addCommunity: (c: Community) => void) => void;
//   onSelectCommunity: (c: Community) => void;
// }

// interface Creator {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   profile?: string | null;
// }

// interface ApiCommunity {
//   id: number;
//   name: string;
//   title?: string;
//   profile: string;
//   description?: string;
//   type?: "public" | "private";
//   creator?: Creator; // nested creator object
// }

// export default function CommunityList({
//   communities,
//   onCreate,
//   onSelectCommunity,
// }: Props) {
//   const [localCommunities, setLocalCommunities] = useState<Community[]>(communities);
//   const [categories, setCategories] = useState<ApiCommunity[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedCommunity, setSelectedCommunity] = useState<ApiCommunity | null>(null);
//   const [joining, setJoining] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchCommunities = async () => {
//       try {
//         const res = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/community/get");
//         if (!res.ok) throw new Error("Failed to fetch communities");
//         const data = await res.json();
//         setCategories(data.data || []);
//       } catch (error) {
//         console.error("Error fetching communities:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCommunities();
//   }, []);

//   // Add new community function
//   const handleCreate = () => {
//     onCreate((newCommunity: Community) => {
//       setLocalCommunities((prev) => [...prev, newCommunity]);
//     });
//   };

//   // Handle join community
//   const handleJoin = async () => {
//     if (!selectedCommunity) return;
//     setJoining(true);
//     setMessage(null);
//     try {
//       const res = await fetch(
//         "https://argosmob.uk/being-petz/public/api/v1/pet/community/join",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // Add Authorization header if token is required
//           },
//           body: JSON.stringify({
//             community_id: selectedCommunity.id,
//           }),
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         setMessage(
//           selectedCommunity.type === "public"
//             ? "You have joined the community 🎉"
//             : "Join request sent ✅"
//         );
//       } else {
//         setMessage(data.message || "Failed to join community");
//       }
//     } catch (error) {
//       setMessage("Error joining community");
//     } finally {
//       setJoining(false);
//     }
//   };

//   return (
//     <>
//       {/* Categories */}
//       <div className="flex gap-4 overflow-x-auto">
//         {/* Create new community */}
//         <div
//           onClick={handleCreate}
//           className="flex flex-col items-center cursor-pointer"
//         >
//           <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-500 text-white text-2xl">
//             +
//           </div>
//           <p className="text-xs mt-1">Create</p>
//         </div>

//         {/* API Categories */}
//         {loading ? (
//           <p className="text-gray-500 text-sm">Loading...</p>
//         ) : (
//           categories.map((cat) => (
//             <div
//               key={cat.id}
//               className="flex flex-col items-center cursor-pointer"
//               onClick={() => setSelectedCommunity(cat)}
//             >
//               <div className="w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden">
//                 <img
//                   src={`https://argosmob.uk/being-petz/public/${cat.profile}`}
//                   alt={cat.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-xs mt-1">{cat.name}</p>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Community List */}
//       <div className="mt-6 space-y-3">
//         {localCommunities.map((c) => (
//           <div
//             key={c.id}
//             className="flex justify-between items-center bg-white p-4 rounded-xl shadow cursor-pointer"
//             onClick={() => onSelectCommunity(c)}
//           >
//             <div>
//               <h3 className="font-bold text-purple-700">{c.name}</h3>
//               <p className="text-sm text-gray-600">{c.message}</p>
//             </div>
//             <div className="flex flex-col items-end">
//               <span className="text-xs text-gray-500">{c.time}</span>
//               {c.unread > 0 && (
//                 <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mt-1">
//                   {c.unread}
//                 </span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Selected Community Modal */}
//       {selectedCommunity && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-xl w-[500px]">
//             <div className="flex items-start gap-4">
//               {/* Profile Image */}
//               <img
//                 src={`https://argosmob.uk/being-petz/public/${selectedCommunity.profile}`}
//                 alt={selectedCommunity.name}
//                 className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
//               />

//               {/* Community Info */}
//               <div className="flex-1">
//                 <h2 className="text-lg font-bold text-purple-700">
//                   {selectedCommunity.name}
//                 </h2>

//                 {/* Title */}
//                 {selectedCommunity.title && (
//                   <p className="text-sm text-gray-800 font-medium">
//                     {selectedCommunity.title}
//                   </p>
//                 )}

//                 {/* Description */}
//                 <p className="text-sm text-gray-600 mt-1">
//                   {selectedCommunity.description || "No description"}
//                 </p>

//                 {/* Type + Creator */}
//                 <p className="text-xs text-gray-500 mt-1">
//                   Type: {selectedCommunity.type} | Creator:{" "}
//                   {selectedCommunity.creator
//                     ? `${selectedCommunity.creator.first_name} ${selectedCommunity.creator.last_name}`
//                     : "Unknown"}
//                 </p>
//               </div>
//             </div>

//             {message && (
//               <p className="mt-3 text-green-600 text-sm text-center">{message}</p>
//             )}

//             {/* Buttons */}
//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 className="px-3 py-1 text-sm bg-gray-300 rounded"
//                 onClick={() => setSelectedCommunity(null)}
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleJoin}
//                 disabled={joining}
//                 className="px-4 py-1 text-sm bg-purple-600 text-white rounded"
//               >
//                 {joining
//                   ? "Joining..."
//                   : selectedCommunity.type === "public"
//                   ? "Join Now"
//                   : "Send Request"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

  // testing the image and view the community and creaotor of profile
 
import { useState, useEffect } from "react";
import { Community } from "./CommunityApp";
// dummy icon images
import maleIcon from "../../assets/user/male.jpg";
import femaleIcon from "../../assets/user/female.jpg";
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
  name: string;
  title?: string;
  profile: string | null;
  description?: string;
  type?: "public" | "private";
  creator?: Creator;
}

// Creator Profile Image
const getCreatorImage = (creator?: Creator) => {
  if (!creator) return maleIcon;
  if (creator.profile) {
    return `https://argosmob.uk/being-petz/public/${creator.profile}`;
  }
  const name = creator.first_name.toLowerCase();
  return name.endsWith("a") || name.endsWith("i") ? femaleIcon : maleIcon;
};

// Community Profile Image
const getCommunityImage = (profile?: string | null) => {
  if (profile) {
    return `https://argosmob.uk/being-petz/public/${profile}`;
  }
  return catIcon;
};

// ✅ Helper: Save cache with expiry
const setCache = (key: string, data: any, ttlMinutes = 10) => {
  const expiry = Date.now() + ttlMinutes * 60 * 1000; // 10 min expiry
  const cacheData = { data, expiry };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

// ✅ Helper: Get cache with expiry check
const getCache = (key: string) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  try {
    const { data, expiry } = JSON.parse(cached);
    if (Date.now() > expiry) {
      // expired
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

export default function CommunityList({
  communities,
  onCreate,
  onSelectCommunity,
}: Props) {
  const [localCommunities, setLocalCommunities] = useState<Community[]>(communities);
  const [categories, setCategories] = useState<ApiCommunity[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCommunity, setSelectedCommunity] = useState<ApiCommunity | null>(null);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);

// Fetch all Communities
  useEffect(() => {
    const fetchCommunities = async () => {
      // Check cache
      const cached = getCache("communities");
      if (cached) {
        setCategories(cached);
        setLoading(false);
      }

      try {
        const res = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/community/get");
        if (!res.ok) throw new Error("Failed to fetch communities");
        const data = await res.json();

        if (data.data) {
          setCategories(data.data);
          setCache("communities", data.data, 10); // save with 10 min expiry
        }
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // join Communities
  useEffect(() => {
    const fetchJoined = async () => {
      const cached = getCache("joinedCommunities");
      if (cached) {
        setJoinedCommunities(cached);
      }

      try {
        const res = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/community/joined");
        if (!res.ok) throw new Error("Failed to fetch joined communities");
        const data = await res.json();

        if (data.data) {
          const joinedIds = data.data.map((c: ApiCommunity) => c.id);
          setJoinedCommunities(joinedIds);
          setCache("joinedCommunities", joinedIds, 10);
        }
      } catch (error) {
        console.error("Error fetching joined communities:", error);
      }
    };

    fetchJoined();
  }, []);

  // Add new community
  const handleCreate = () => {
    onCreate((newCommunity: Community) => {
      setLocalCommunities((prev) => [...prev, newCommunity]);
    });
  };

  // Handle join
  const handleJoin = async () => {
    if (!selectedCommunity) return;
    setJoining(true);
    setMessage(null);
    try {
      const res = await fetch(
        "https://argosmob.uk/being-petz/public/api/v1/pet/community/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            community_id: selectedCommunity.id,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage(
          selectedCommunity.type === "public"
            ? "You have joined the community 🎉"
            : "Join request sent ✅"
        );

        setJoinedCommunities((prev) => {
          const updated = [...prev, selectedCommunity.id];
          setCache("joinedCommunities", updated, 10); // update cache
          return updated;
        });
      } else {
        setMessage(data.message || "Failed to join community");
      }
    } catch (error) {
      setMessage("Error joining community");
    } finally {
      setJoining(false);
    }
  };

  const isJoined = selectedCommunity && joinedCommunities.includes(selectedCommunity.id);

  return (
    <>
      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto">
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

        {/* API Categories */}
        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedCommunity(cat)}
            >
              <div className="w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden">
                <img
                  src={getCommunityImage(cat.profile)}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs mt-1">{cat.name}</p>
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

      {/* Selected Community Modal */}
      {selectedCommunity && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <div className="flex items-start gap-4">
              <img
                src={getCommunityImage(selectedCommunity.profile)}
                alt={selectedCommunity.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
              />

              <div className="flex-1">
                <h2 className="text-lg font-bold text-purple-700">
                  {selectedCommunity.name}
                </h2>
                {selectedCommunity.title && (
                  <p className="text-sm text-gray-800 font-medium">
                    {selectedCommunity.title}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-1">
                  {selectedCommunity.description || "No description"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {selectedCommunity.creator && (
                    <img
                      src={getCreatorImage(selectedCommunity.creator)}
                      alt="creator"
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                  )}
                  <p className="text-xs text-gray-500">
                    Type: {selectedCommunity.type} | Creator:{" "}
                    {selectedCommunity.creator
                      ? `${selectedCommunity.creator.first_name} ${selectedCommunity.creator.last_name}`
                      : "Unknown"}
                  </p>
                </div>
              </div>
            </div>

            {message && (
              <p className="mt-3 text-green-600 text-sm text-center">{message}</p>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-3 py-1 text-sm bg-gray-300 rounded"
                onClick={() => setSelectedCommunity(null)}
              >
                Close
              </button>

              {isJoined ? (
                <button
                  onClick={() => onSelectCommunity(selectedCommunity as any)}
                  className="px-4 py-1 text-sm bg-green-600 text-white rounded"
                >
                  View Community
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className="px-4 py-1 text-sm bg-purple-600 text-white rounded"
                >
                  {joining
                    ? "Joining..."
                    : selectedCommunity.type === "public"
                    ? "Join Now"
                    : "Send Request"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}




