import { useState, useEffect } from "react";
import { Community } from "./CommunityApp";

interface Props {
  communities: Community[];
  onCreate: (addCommunity: (c: Community) => void) => void;
  onSelectCommunity: (c: Community) => void;
}

interface ApiCommunity {
  id: number;
  name: string;
  profile: string; // image field from API
}

export default function CommunityList({
  communities,
  onCreate,
  onSelectCommunity,
}: Props) {
  const [localCommunities, setLocalCommunities] = useState<Community[]>(communities);
  const [categories, setCategories] = useState<ApiCommunity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/community/get");
        if (!res.ok) throw new Error("Failed to fetch communities");
        const data = await res.json();
        console.log("API response:", data);

        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Add new community function
  const handleCreate = () => {
    onCreate((newCommunity: Community) => {
      setLocalCommunities((prev) => [...prev, newCommunity]);
    });
  };

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
            <div key={cat.id} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden">
                <img
                  src={`https://argosmob.uk/being-petz/public/${cat.profile}`}
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
    </>
  );
}


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

// test for main code 

// import { useEffect, useState } from "react";
// import dummy1 from "../../assets/user/02.jpg";
// // import dummy2 from "../../assets/user/01.jpg";
// // import dummy3 from "../../assets/user/03.jpg";
// // import dummy4 from "../../assets/user/04.jpg";
// // import dummy5 from "../../assets/user/05.jpg";

// interface Creator {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   profile: string | null;
// }

// interface Community {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   type: string;
//   latitude: string;
//   longitude: string;
//   profile: string | null;
//   creator: Creator;
// }

// export default function CommunityList() {
//   const [categories, setCategories] = useState<Community[]>([]);
//   const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
//     null
//   );

//   // Dummy fallback images
//   const fallbackImages = [
//     dummy1,
//   ];

//   useEffect(() => {
//     fetch("https://argosmob.uk/being-petz/public/api/v1/pet/community/get")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.data) {
//           setCategories(data.data);
//         }
//       })
//       .catch((err) => console.error("Error fetching communities:", err));
//   }, []);

//   return (
//     <div className="p-4">
//       {/* Category list */}
//       <div className="flex gap-6 overflow-x-auto p-3 border-b">
//         {categories.map((cat, index) => {
//           const fallback =
//             fallbackImages[index % fallbackImages.length]; // sequential rotation

//           return (
//             <div
//               key={cat.id}
//               className="flex flex-col items-center cursor-pointer"
//               onClick={() => setSelectedCommunity(cat)}
//             >
//               <div className="w-14 h-14 rounded-full border-2 border-purple-500 overflow-hidden">
//                 <img
//                   src={
//                     cat.profile
//                       ? `https://argosmob.uk/being-petz/public/${cat.profile}`
//                       : fallback
//                   }
//                   alt={cat.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="text-xs mt-1">{cat.name}</p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Selected community details */}
//       {selectedCommunity && (
//         <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
//           <div className="flex items-start gap-6">
//             {/* Profile image */}
//             <div className="w-28 h-28 rounded-xl border overflow-hidden">
//               <img
//                 src={
//                   selectedCommunity.profile
//                     ? `https://argosmob.uk/being-petz/public/${selectedCommunity.profile}`
//                     : fallbackImages[selectedCommunity.id % fallbackImages.length]
//                 }
//                 alt={selectedCommunity.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Text info */}
//             <div className="flex flex-col flex-1">
//               <h2 className="text-xl font-bold">{selectedCommunity.name}</h2>
//               <p className="text-gray-600 mt-1">
//                 {selectedCommunity.description}
//               </p>
//               <p className="text-sm mt-2">
//                 <span className="font-semibold">Type:</span>{" "}
//                 {selectedCommunity.type}
//               </p>
//               <p className="text-sm mt-1">
//                 <span className="font-semibold">Creator:</span>{" "}
//                 {selectedCommunity.creator.first_name}{" "}
//                 {selectedCommunity.creator.last_name}
//               </p>

//               {/* Buttons */}
//               <div className="mt-4 flex gap-3">
//                 <button className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
//                   Request
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-300 rounded-lg shadow hover:bg-gray-400"
//                   onClick={() => setSelectedCommunity(null)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
