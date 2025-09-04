import { useState, useEffect } from "react";
import { MapPin, Info, Users, Calendar } from "lucide-react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import img1 from "../../assets/user/03.jpg";
import profile from "../../assets/img/profile.jpeg";
import parrotImg from "../../assets/user/p4.jpg";
import Max from "../../assets/img/postdog.png";
import Buddy from "../../assets/img/adopt2.avif";
import cat from "../../assets/img/cat.jpg";
import PostCard from "../dashboard/Postcard";
import { useNavigate } from "react-router-dom";
import Pets from "./MyPets";

// friend images
import friend1 from "../../assets/user/friend1.avif";
import friend2 from "../../assets/user/friend2.avif";
import friend3 from "../../assets/user/friend3.avif";
import friend4 from "../../assets/user/friend4.avif";
import friend5 from "../../assets/user/friend5.avif";
import friend6 from "../../assets/user/friend6.avif";

function PetParentProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

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

  // ✅ friends array add kiya
  const friends = [
    { img: friend1, name: "Sophia" },
    { img: friend2, name: "Daniel" },
    { img: friend3, name: "Emma" },
    { img: friend4, name: "Liam" },
    { img: friend5, name: "Olivia" },
    { img: friend6, name: "Noah" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
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
                      src={user.profile || profile}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow"
                    />
                    <div className="ml-4">
                      <h2 className="text-2xl font-bold text-purple-700">
                        {user.first_name} {user.last_name}
                      </h2>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin size={16} className="mr-1" />
                        {user.latitude && user.longitude
                          ? `${user.latitude}, ${user.longitude}`
                          : "Location not set"}
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
                    <p className="text-lg font-bold text-purple-700">3</p>
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

                <div className="flex space-x-3 mt-6">
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                    type="button"
                    onClick={() => navigate("/edit-profile")}
                  >
                    Edit Profile
                  </button>
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition">
                    Share
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
              <PostCard
                profileImg={img1}
                userName="Bni Cyst"
                time="1 hour ago"
                text="Lorem ipsum dolor sit amet..."
                image={parrotImg}
                likes={140}
                comments={20}
                shares={99}
                initialComments={[]}
              />
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* Pet Friends */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    Pet Friends
                  </h2>
                  <button className="text-purple-600 text-sm">See All</button>
                </div>

                <div className="mt-4 space-y-4">
                  {friends.map((friend, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={friend.img}
                        alt={friend.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <p>{friend.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Events */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    <Calendar /> Upcoming Events
                  </h2>
                  <button className="text-purple-600 text-sm">See All</button>
                </div>
                <div className="mt-4 space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold">15 JUN</p>
                    <p>Dog Park Meetup – 10:00 AM</p>
                  </div>
                  <div>
                    <p className="font-semibold">22 JUN</p>
                    <p>Pet First Aid Workshop – 2:00 PM</p>
                  </div>
                  <div>
                    <p className="font-semibold">05 JUL</p>
                    <p>Adoption Fair – 11:00 AM</p>
                  </div>
                </div>
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

 