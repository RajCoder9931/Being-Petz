import { useState } from "react";
import { MapPin, Info, Users, Calendar, Heart } from "lucide-react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import profile from "../../assets/img/profile.jpeg";
import Sarah from "../../assets/adopt-img.png";
import Max from "../../assets/img/postdog.png";

function PetParentProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="bg-gradient-to-r from-purple-400 to-pink-300 h-32 rounded-t-2xl -m-6 mb-6"></div>

                <div className="flex items-center -mt-16">
                  <img
                    src={profile}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow"
                  />
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-purple-700">
                      Sarah Johnson
                    </h2>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin size={16} className="mr-1" />
                      San Francisco, CA
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mt-4">
                  Pet lover and proud parent of 3 furry babies. Passionate about
                  animal welfare and connecting with other pet parents.
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
              </div>

              {/* About */}
              <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                  <Info /> About
                </h2>
                <div className="grid grid-cols-2 gap-6 mt-4 text-gray-700">
                  <div>
                    <p className="font-semibold">Occupation</p>
                    <p>Veterinary Technician</p>
                  </div>
                  <div>
                    <p className="font-semibold">Education</p>
                    <p>Animal Science Degree, UC Davis</p>
                  </div>
                  <div>
                    <p className="font-semibold">Interests</p>
                    <p>Dog training, Animal rescue, Pet photography</p>
                  </div>
                  <div>
                    <p className="font-semibold">Joined</p>
                    <p>March 2019</p>
                  </div>
                </div>
              </div>

              {/* My Pets */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    <Heart /> My Pets
                  </h2>
                  <button className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm">
                    + Add Pet
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {[
                    {
                      name: "Max",
                      type: "Golden Retriever",
                      age: "3 years old",
                      img: "/img/dog1.jpg",
                    },
                    {
                      name: "Luna",
                      type: "Siamese Cat",
                      age: "2 years old",
                      img: "/img/cat1.jpg",
                    },
                    {
                      name: "Buddy",
                      type: "Beagle",
                      age: "5 years old",
                      img: "/img/dog2.jpg",
                    },
                  ].map((pet, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-xl shadow overflow-hidden"
                    >
                      <img
                        src={pet.img}
                        alt={pet.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold text-purple-700">
                          {pet.name}
                        </h3>
                        <p className="text-sm">{pet.type}</p>
                        <p className="text-xs text-gray-500">🎂 {pet.age}</p>
                      </div>
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-center text-gray-500 text-sm">
                    + Add New Pet
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl shadow p-6 space-y-6">
                <h2 className="text-xl font-bold text-purple-700">
                  Recent Posts
                </h2>
                {/* Post 1 */}
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src={Sarah}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">
                    Just took Max to his first agility class today! 🐕💛
                    #DogTraining #GoldenRetriever
                  </p>
                  <img
                    src={Max as string}
                    alt="dog"
                    className="rounded-xl mt-3"
                  />
                  <div className="flex gap-6 text-sm text-gray-500 mt-2">
                    <span>👍 24 Likes</span>
                    <span>💬 8 Comments</span>
                    <span>↗ Share</span>
                  </div>
                </div>

                {/* Post 2 */}
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src={Sarah}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">
                    Luna being her usual majestic self today 🐱👑 #SiameseCat
                    #CatLife
                  </p>
                  <img
                    src="/img/cat1.jpg"
                    alt="cat"
                    className="rounded-xl mt-3"
                  />
                  <div className="flex gap-6 text-sm text-gray-500 mt-2">
                    <span>👍 42 Likes</span>
                    <span>💬 15 Comments</span>
                    <span>↗ Share</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* Pet Friends */}
              <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    <Users /> Pet Friends
                  </h2>
                  <button className="text-purple-600 text-sm">See All</button>
                </div>
                <div className="mt-4 space-y-4">
                  {[
                    "Michael Chen",
                    "Jessica Wong",
                    "David Kim",
                    "Amanda Lee",
                    "Robert Garcia",
                    "Sophia Martinez",
                  ].map((friend, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src="/img/user.jpg"
                        alt={friend}
                        className="w-10 h-10 rounded-full"
                      />
                      <p>{friend}</p>
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
                      src="/img/dog1.jpg"
                      alt="group"
                      className="w-10 h-10 rounded-full"
                    />
                    <p>Golden Retriever Lovers – 12.5k members</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src="/img/cat1.jpg"
                      alt="group"
                      className="w-10 h-10 rounded-full"
                    />
                    <p>Bay Area Cat Owners – 8.2k members</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src="/img/user.jpg"
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
 