import { useState, useEffect } from "react";
import { MapPin, Info, Users, CalendarIcon, Edit } from "lucide-react";
import axios from "axios";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import img1 from "../../assets/user/03.jpg";
import profile from "../../assets/img/profile.jpeg";
import parrotImg from "../../assets/user/p4.jpg";
import Max from "../../assets/img/postdog.png";
import Buddy from "../../assets/img/adopt2.avif";
import cat from "../../assets/img/cat.jpg";
import { useNavigate } from "react-router-dom";
import Pets from "./MyPets";
import PostList from "./MyPosts";

interface Friend {
  id: number;
  name: string;
  friends: string;
  img: string | null;
  gender: string;
}
type EventType = {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  image: string;
  bgColor: string;  
};
function PetParentProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("Fetching location...");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [parentId, setParentId] = useState<number | null>(null);
  const [petCount, setPetCount] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setParentId(parsedUser.id);
    }
  }, []);
   
  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
  
        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser.id;
  
        const response = await axios.get(
          `https://argosmob.uk/being-petz/public/api/v1/auth/my-detail?user_id=${userId}`
        );
  
        if (response.data && response.data.user) {
          setPetCount(response.data.user.pets?.length || 0);
        }
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      }
    };
  
    fetchMyPets();
  }, []);
  
  
  const dummyImages = [
    profile,  
    img1,
    cat,
    parrotImg,
  ];


  // location name
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser.latitude && parsedUser.longitude) {
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${parsedUser.latitude}&lon=${parsedUser.longitude}&format=json`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data && data.address) {
              const { city, town, village, state } = data.address;

              // Fallback logic
              const cityName = city || town || village || "Nearby Area";
              const stateName = state || "";

              setLocationName(`${cityName}, ${stateName}`);
            } else {
              setLocationName("Nearby Area");
            }
          })
          .catch(() => setLocationName("Nearby Area"));
      } else {
        setLocationName("Location not set");
      }
    }
  }, []);

  const [events, setEvents] = useState<EventType[]>([]);
 
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://argosmob.com/being-petz/public/api/v1/events"
      );
      setEvents(response.data.data.data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events");
    }
    setLoading(false);
  };

  // fetch the frineds
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
              img: person.profile
                ? `https://argosmob.com/being-petz/public/${person.profile}`
                : null,
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
    <div className="flex h-screen bg-gray-50 pt-12">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow p-6 mx-auto">
                <div className="bg-gradient-to-r from-purple-400 to-pink-300 h-32 rounded-t-2xl -m-6 mb-6"></div>

                {user && (
                  <div className="flex items-center -mt-16">
                    <img
                      src={
                        user.profile
                          ? `https://argosmob.com/being-petz/public/${user.profile}`
                          : dummyImages[Math.floor(Math.random() * dummyImages.length)]
                      }
                      alt={user.first_name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow object-cover"
                    />
                    <div className="ml-4">
                      <h2 className="text-2xl font-bold text-purple-700">
                        {user.first_name} {user.last_name}
                      </h2>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin size={16} className="mr-1" />
                        {locationName}
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 mt-4">
                  {user?.bio ||
                    "Pet lover and proud parent. Passionate about animal welfare."}
                </p>

                <div className="flex space-x-8 mt-4 text-center">
  <div>
    <p className="text-lg font-bold text-purple-700">{petCount}</p>
    <p className="text-sm text-gray-500">Pets</p>
  </div>
  <div>
    <p className="text-lg font-bold text-purple-700">128</p>
    <p className="text-sm text-gray-500">Friends</p>
  </div>
  <div>
    <p className="text-lg font-bold text-purple-700">342</p>
    <p className="text-sm text-gray-500">Posts</p>
  </div>
</div>


                <div className="flex items-center space-x-2 mt-6">
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition flex items-center"
                    type="button"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Edit Profile
                    <Edit className="ml-2" />
                  </button>
                </div>

              </div>

              {/* About Section */}
              {user && (
                <div className="bg-white rounded-2xl shadow p-6">
                  <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    <Info /> About
                  </h2>
                  <div className="grid grid-cols-2 gap-6 mt-4 text-gray-700">
                    <div>
                      <p className="font-semibold">Email</p>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p>{user.phone || "Not Provided"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Role</p>
                      <p>{user.role || "Parent"}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Joined</p>
                      <p>
                        {user.created_at
                          ? new Date(user.created_at).toDateString()
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* My Pets */}
              <Pets />

              {/* Recent Posts */}
              <PostList />
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* Pet Friends  */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    Pet Friends
                  </h2>
                  <button className="text-purple-600 text-sm" onClick={() => navigate('/friend-requests')}>See All</button>
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

              {/* Events */}
              <div className="mt-6 p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Featured Pet Events</h2>
        <CalendarIcon className="text-purple-600" size={22} />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center bg-gray-50 rounded-xl shadow p-3"
            >
              <img
                src={
                  event.image
                    ? event.image.startsWith("http")
                      ? event.image
                      : `https://argosmob.com/being-petz/public/${event.image}`
                    : "https://via.placeholder.com/100"
                }
                alt={event.title}
                className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="ml-4 flex flex-col justify-center">
                <h3 className="font-semibold text-sm">{event.title}</h3>
                <p className="text-xs text-gray-500">{event.location}</p>
                <p className="text-xs text-gray-400">{event.event_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

              {/* Groups */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    <Users /> My Groups
                  </h2>
                  <button className="text-purple-600 text-sm">See All</button>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={Buddy}
                      alt="group"
                      className="w-10 h-10 rounded-full"
                    />
                    <p>Golden Retriever Lovers – 12.5k members</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={cat}
                      alt="group"
                      className="w-10 h-10 rounded-full"
                    />
                    <p>Bay Area Cat Owners – 8.2k members</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={Max}
                      alt="group"
                      className="w-10 h-10 rounded-full"
                    />
                    <p>Rescue Dog Support – 5.7k members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PetParentProfile;  


