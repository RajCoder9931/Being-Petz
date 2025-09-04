import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
// Dummy Image when a user profie pic is not available
import maleIcon from "../assets/user/male.jpg";
import femaleIcon from "../assets/user/female.jpg";

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

  // Common   female names
  const femaleNames = [
    "priya", "pooja", "neha", "anita", "sonam", 
    "ritu", "kiran", "komal", "sneha", "deepa",
    "anjali", "sapna", "alka", "lata", "meena",
  ];

  // Common   male names
  const maleNames = [
    "Dev ", "amit", "rahul", "rohit", "suresh", 
    "Anuj", "raj", "vijay", "arjun", "manish",
    "deepak", "ankit", "sanjay", "akash", "alok",
  ];

  if (femaleNames.some((n) => lower.includes(n))) {
    return "female";
  }
  if (maleNames.some((n) => lower.includes(n))) {
    return "male"; 
  }

  return "male"; // when n 
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

  // ✅ fetch People You May Know
  useEffect(() => {
    if (!parentId) return;

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          "https://argosmob.uk/being-petz/public/api/v1/pet/friends/suggestions",
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

  const goToProfile = (user: any) => {
    navigate(`/profile/${user.id}`, { state: user });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 bg-gray-100 p-4 sm:p-6 flex justify-center">
          <div className="w-full max-w-2xl space-y-8">

            {/* ✅ My Friends */}
            <div className="bg-white shadow rounded-xl">
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

            {/* ✅ People You May Know */}
            <div className="bg-white shadow rounded-xl">
              <h2 className="bg-purple-700 text-white px-4 py-3 rounded-t-xl font-semibold">
                People You May Know
              </h2>
              <ul className="divide-y">
                {peopleYouMayKnow.map((person) => (
                  <li key={person.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={person.img}
                        alt={person.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.friends}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {person.status === "none" && (
                        <>
                          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                            + Add Friend
                          </button>
                          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm">
                            Remove
                          </button>
                        </>
                      )}
                      {person.status === "following" && (
                        <>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                            Following
                          </button>
                          <button
                            onClick={() => goToProfile(person)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                          >
                            View Profile
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FriendRequestPage;
