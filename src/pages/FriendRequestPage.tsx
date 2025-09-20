// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Sidebar from "./sidebar";
//  import maleIcon from "../../assets/user/male.jpg";
// import femaleIcon from "../../assets/user/female.jpg";

// interface Person {
//   id: number;
//   name: string;
//   friends: string;
//   img: string;
//   gender: string;
//   status: string;
// }

// const FriendRequestPage = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [friends, setFriends] = useState<Person[]>([]);
//   const [peopleYouMayKnow, setPeopleYouMayKnow] = useState<Person[]>([]);
//   const [friendRequests, setFriendRequests] = useState<Person[]>([]); // New state for friend requests
//   const [parentId, setParentId] = useState<number | null>(null);
//   const navigate = useNavigate();

//  // fetch the user is which is login in localstorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setParentId(parsedUser.id);
//     }
//   }, []);

//  // check the gender from name
// const guessGenderFromName = (name: string) => {
//   const lower = name.toLowerCase();

//   // Common   female names
//   const femaleNames = [
//     "priya", "pooja", "neha", "anita", "sonam", 
//     "ritu", "kiran", "komal", "sneha", "deepa",
//     "anjali", "sapna", "alka", "lata", "meena",
//   ];

//   // Common   male names
//   const maleNames = [
//     "dev", "amit", "rahul", "rohit", "suresh", 
//     "anuj", "raj", "vijay", "arjun", "manish",
//     "deepak", "ankit", "sanjay", "akash", "alok",
//   ];

//   if (femaleNames.some((n) => lower.includes(n))) {
//     return "female";
//   }
//   if (maleNames.some((n) => lower.includes(n))) {
//     return "male"; 
//   }

//   return "male"; // when n 
// };


//   // ✅ function to get correct image
//   const getProfileImage = (profile: string | null, gender: string, name: string) => {
//     if (profile) return profile;
  
//     const finalGender = gender
//       ? gender.toLowerCase()
//       : guessGenderFromName(name);
  
//     if (finalGender === "male") return maleIcon;
//     if (finalGender === "female") return femaleIcon;
//     return maleIcon; // default male
//   };
  

//   // ✅ fetch My Friends
//   useEffect(() => {
//     if (!parentId) return;

//     const fetchFriends = async () => {
//       try {
//         const response = await fetch(
//           "https://argosmob.com/being-petz/public/api/v1/pet/friends/get",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ parent_id: parentId }),
//           }
//         );
//         const data = await response.json();

//         if (data.status && Array.isArray(data.data)) {
//           const formatted = data.data.map((person: any) => {
//             const fullName = `${person.first_name || ""} ${person.last_name || ""}`.trim();
//             return {
//               id: person.id,
//               name: fullName,
//               friends: `${person.friends_count || 0} friends`,
//               img: getProfileImage(person.profile, person.gender, fullName),
//               gender: person.gender || "",
//               status: "friend",
//             };
//           });
//           setFriends(formatted);
//         } else {
//           setFriends([]);
//         }
//       } catch (err) {
//         console.error("Error fetching friends:", err);
//       }
//     };

//     fetchFriends();
//   }, [parentId]);

//   // ✅ fetch People You May Know
//   useEffect(() => {
//     if (!parentId) return;

//     const fetchSuggestions = async () => {
//       try {
//         const response = await fetch(
//           "https://argosmob.com/being-petz/public/api/v1/pet/friends/suggestions",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ parent_id: parentId }),
//           }
//         );
//         const data = await response.json();

//         if (data.status && Array.isArray(data.data)) {
//           const formatted = data.data.map((person: any) => {
//             const fullName = `${person.first_name || ""} ${person.last_name || ""}`.trim();
//             return {
//               id: person.id,
//               name: fullName,
//               friends: `${person.friends_count || 0} friends`,
//               img: getProfileImage(person.profile, person.gender, fullName),
//               gender: person.gender || "",
//               status: "none",
//             };
//           });
//           setPeopleYouMayKnow(formatted);
//         } else {
//           setPeopleYouMayKnow([]);
//         }
//       } catch (err) {
//         console.error("Error fetching suggestions:", err);
//       }
//     };

//     fetchSuggestions();
//   }, [parentId]);

//   // ✅ New fetch for Friend Requests
//   useEffect(() => {
//     if (!parentId) return;

//     const fetchRequests = async () => {
//       try {
//         // --- Replace this with your actual API endpoint for friend requests ---
//         const response = await fetch(
//           "https://your-api-url.com/api/friend/requests", 
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ parent_id: parentId }),
//           }
//         );
//         const data = await response.json();

//         if (data.status && Array.isArray(data.data)) {
//           const formatted = data.data.map((person: any) => {
//             const fullName = `${person.first_name || ""} ${person.last_name || ""}`.trim();
//             return {
//               id: person.id,
//               name: fullName,
//               friends: `${person.friends_count || 0} friends`,
//               img: getProfileImage(person.profile, person.gender, fullName),
//               gender: person.gender || "",
//               status: "pending",
//             };
//           });
//           setFriendRequests(formatted);
//         } else {
//           setFriendRequests([]);
//         }
//       } catch (err) {
//         console.error("Error fetching friend requests:", err);
//       }
//     };

//     fetchRequests();
//   }, [parentId]);

//   const goToProfile = (user: any) => {
//     navigate(`/profile/${user.id}`, { state: user });
//   };
  
//   // Handlers for Accept and Decline
//   const handleAccept = (id: number) => {
//     // Implement your API call to accept the friend request here
//     console.log(`Accepting friend request from user with id: ${id}`);
//   };

//   const handleDecline = (id: number) => {
//     // Implement your API call to decline the friend request here
//     console.log(`Declining friend request from user with id: ${id}`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
//       <div className="flex flex-1">
//         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//         <main className="flex-1 bg-gray-100 p-4 sm:p-6 flex justify-center">
//           <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">

//             {/* ✅ Friend Suggestions */}
//             <div className="bg-white shadow rounded-xl h-fit">
//               <h2 className="bg-purple-700 text-white px-4 py-3 rounded-t-xl font-semibold">
//                 Friend Suggestions
//               </h2>
//               <ul className="divide-y">
//                 {peopleYouMayKnow.length > 0 ? (
//                   peopleYouMayKnow.map((person) => (
//                     <li key={person.id} className="flex items-center justify-between p-4">
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={person.img}
//                           alt={person.name}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-gray-800">{person.name}</p>
//                           <p className="text-sm text-gray-500">{person.friends}</p>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         {person.status === "none" && (
//                           <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
//                             + Add Friend
//                           </button>
//                         )}
//                       </div>
//                     </li>
//                   ))
//                 ) : (
//                   <p className="p-4 text-gray-500">No suggestions found.</p>
//                 )}
//               </ul>
//             </div>
            
//             {/* ✅ My Friends */}
//             <div className="bg-white shadow rounded-xl h-fit">
//               <h2 className="bg-green-600 text-white px-4 py-3 rounded-t-xl font-semibold">
//                 My Friends
//               </h2>
//               {friends.length > 0 ? (
//                 <ul className="divide-y">
//                   {friends.map((friend) => (
//                     <li key={friend.id} className="flex items-center justify-between p-4">
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={friend.img}
//                           alt={friend.name}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-gray-800">{friend.name}</p>
//                           <p className="text-sm text-gray-500">{friend.friends}</p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => goToProfile(friend)}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
//                       >
//                         View Profile
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="p-4 text-gray-500">No friends found.</p>
//               )}
//             </div>
            
//             {/* ✅ Friend Requests */}
//             <div className="bg-white shadow rounded-xl h-fit">
//               <h2 className="bg-blue-600 text-white px-4 py-3 rounded-t-xl font-semibold">
//                 Friend Requests
//               </h2>
//               {friendRequests.length > 0 ? (
//                 <ul className="divide-y">
//                   {friendRequests.map((request) => (
//                     <li key={request.id} className="flex items-center justify-between p-4">
//                       <div className="flex items-center gap-4">
//                         <img
//                           src={request.img}
//                           alt={request.name}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div>
//                           <p className="font-medium text-gray-800">{request.name}</p>
//                           <p className="text-sm text-gray-500">{request.friends}</p>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleAccept(request.id)}
//                           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
//                         >
//                           Accept
//                         </button>
//                         <button
//                           onClick={() => handleDecline(request.id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
//                         >
//                           Decline
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="p-4 text-gray-500">No new friend requests.</p>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default FriendRequestPage;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
 import maleIcon from "../assets/user/male.jpg";
import femaleIcon from "../assets/user/female.jpg";
// Import the banner image
import discoverFriendsBanner from "../assets/poster.webp";  

interface Person {
  id: number;
  name: string;
  friends: string;
  img: string;
  gender: string;
  status: string;
}

const FriendRequestPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [friends, setFriends] = useState<Person[]>([]);
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState<Person[]>([]);
  const [friendRequests, setFriendRequests] = useState<Person[]>([]); 
  const [parentId, setParentId] = useState<number | null>(null);
  const navigate = useNavigate();

 // fetch the user is which is login in localstorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setParentId(parsedUser.id);
    }
  }, []);

 // check the gender from name
const guessGenderFromName = (name: string) => {
  const lower = name.toLowerCase();

  // Common female names
  const femaleNames = [
    "priya", "pooja", "neha", "anita", "sonam", 
    "ritu", "kiran", "komal", "sneha", "deepa",
    "anjali", "sapna", "alka", "lata", "meena",
  ];

  // Common male names
  const maleNames = [
    "dev", "amit", "rahul", "rohit", "suresh", 
    "anuj", "raj", "vijay", "arjun", "manish",
    "deepak", "ankit", "sanjay", "akash", "alok",
  ];

  if (femaleNames.some((n) => lower.includes(n))) {
    return "female";
  }
  if (maleNames.some((n) => lower.includes(n))) {
    return "male"; 
  }

  return "male"; 
};


  // ✅ function to get correct image
  const getProfileImage = (profile: string | null, gender: string, name: string) => {
    if (profile) return profile;
  
    const finalGender = gender
      ? gender.toLowerCase()
      : guessGenderFromName(name);
  
    if (finalGender === "male") return maleIcon;
    if (finalGender === "female") return femaleIcon;
    return maleIcon; // default male
  };
  

  // ✅ fetch My Friends
  useEffect(() => {
    if (!parentId) return;

    const fetchFriends = async () => {
      try {
        const response = await fetch(
          "https://argosmob.com/being-petz/public/api/v1/pet/friends/get",
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
              img: getProfileImage(person.profile, person.gender, fullName),
              gender: person.gender || "",
              status: "friend",
            };
          });
          setFriends(formatted);
        } else {
          setFriends([]);
        }
      } catch (err) {
        console.error("Error fetching friends:", err);
      }
    };

    fetchFriends();
  }, [parentId]);

  // ✅ fetch People You May Know (Friend Suggestions)
  useEffect(() => {
    if (!parentId) return;

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          "https://argosmob.com/being-petz/public/api/v1/pet/friends/suggestions",
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
              img: getProfileImage(person.profile, person.gender, fullName),
              gender: person.gender || "",
              status: "none",
            };
          });
          setPeopleYouMayKnow(formatted);
        } else {
          setPeopleYouMayKnow([]);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    };

    fetchSuggestions();
  }, [parentId]);

  // ✅ New fetch for Friend Requests
  useEffect(() => {
    if (!parentId) return;

    const fetchRequests = async () => {
      try {
        // --- Replace this with your actual API endpoint for friend requests ---
        const response = await fetch(
          "https://your-api-url.com/api/friend/requests", 
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
              img: getProfileImage(person.profile, person.gender, fullName),
              gender: person.gender || "",
              status: "pending",
            };
          });
          setFriendRequests(formatted);
        } else {
          setFriendRequests([]);
        }
      } catch (err) {
        console.error("Error fetching friend requests:", err);
      }
    };

    fetchRequests();
  }, [parentId]);

  const goToProfile = (user: any) => {
    navigate(`/profile/${user.id}`, { state: user });
  };
  
  // Handlers for Accept and Decline
  const handleAccept = (id: number) => {
    // Implement your API call to accept the friend request here
    console.log(`Accepting friend request from user with id: ${id}`);
    // Optionally, update the UI by removing the request and adding to friends list
  };

  const handleDecline = (id: number) => {
    // Implement your API call to decline the friend request here
    console.log(`Declining friend request from user with id: ${id}`);
    // Optionally, update the UI by removing the request
  };

  return (
    <div className="min-h-screen flex flex-col pt-12">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 flex justify-center">
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Left Column for Banner */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-xl p-4 h-fit">
                {/* Banner Content */}
                <div className="bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-lg p-6 text-center shadow-md">
                  <h3 className="text-2xl font-bold mb-2">Discover New Friends!</h3>
                  <img 
                    src={discoverFriendsBanner} // Use the imported image
                    alt="Discover New Friends" 
                    className="w-40 h-auto mx-auto my-4" 
                  />
                  <p className="text-sm">Connect, Share & Play</p>
                </div>
              </div>
            </div>

            {/* Main Content Area (3 columns for md screens, 2 for smaller) */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* ✅ My Friends */}
              <div className="bg-white shadow rounded-xl h-fit">
                <h2 className="bg-green-600 text-white px-4 py-3 rounded-t-xl font-semibold">
                  My Friends
                </h2>
                {friends.length > 0 ? (
                  <ul className="divide-y">
                    {friends.map((friend) => (
                      <li key={friend.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={friend.img}
                            alt={friend.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{friend.name}</p>
                            <p className="text-sm text-gray-500">{friend.friends}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => goToProfile(friend)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                        >
                          View Profile
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-gray-500">No friends found.</p>
                )}
              </div>
              
              {/* ✅ Friend Requests */}
              <div className="bg-white shadow rounded-xl h-fit">
                <h2 className="bg-blue-600 text-white px-4 py-3 rounded-t-xl font-semibold">
                  Friend Requests
                </h2>
                {friendRequests.length > 0 ? (
                  <ul className="divide-y">
                    {friendRequests.map((request) => (
                      <li key={request.id} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={request.img}
                            alt={request.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{request.name}</p>
                            <p className="text-sm text-gray-500">{request.friends}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(request.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Decline
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-gray-500">No new friend requests.</p>
                )}
              </div>

              {/* ✅ Friend Suggestions (Facebook-like grid) */}
              <div className="lg:col-span-2 bg-white shadow rounded-xl"> {/* Span 2 columns on larger screens */}
                <h2 className="bg-purple-700 text-white px-4 py-3 rounded-t-xl font-semibold">
                  Friend Suggestions
                </h2>
                {peopleYouMayKnow.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"> {/* Responsive grid for cards */}
                    {peopleYouMayKnow.map((person) => (
                      <div key={person.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center flex flex-col items-center">
                        <img
                          src={person.img}
                          alt={person.name}
                          className="w-20 h-20 rounded-full object-cover mb-2"
                        />
                        <p className="font-medium text-gray-800 text-md truncate w-full">{person.name}</p>
                        <p className="text-sm text-gray-500 mb-3">{person.friends}</p>
                        {person.status === "none" && (
                          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm w-full">
                            + Add Friend
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-4 text-gray-500">No suggestions found.</p>
                )}
              </div>

            </div> {/* End Main Content Area */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FriendRequestPage;