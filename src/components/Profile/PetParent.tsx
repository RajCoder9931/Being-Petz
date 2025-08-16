import { useState } from "react";
import { MapPin, Info, Users, Calendar, Heart } from "lucide-react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import profile from "../../assets/img/profile.jpeg";
import img1 from "../../assets/user/03.jpg";
import parrotImg from "../../assets/user/p4.jpg";
import Max from "../../assets/img/postdog.png";
import Buddy from "../../assets/img/adopt2.avif";
import cat from "../../assets/img/cat.jpg";
import PostCard from "../dashboard/Postcard";
// friend
import friend1 from "../../assets/user/friend1.avif";
import friend2 from "../../assets/user/friend2.avif";
import friend3 from "../../assets/user/friend3.avif";
import friend4 from "../../assets/user/friend4.avif";
import friend5 from "../../assets/user/friend5.avif";
import friend6 from "../../assets/user/friend6.avif";
function PetParentProfile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [open, setOpen] = useState(false);

  const pets = [
    { name: "Luna", type: "Siamese Cat", age: "2 years old", img: cat },
    { name: "Max", type: "Golden Retriever", age: "3 years old", img: Max },
    { name: "Buddy", type: "Beagle", age: "5 years old", img: Buddy },
  ];
  const friends = [
    { name: "Michael Chen", img: friend1 },
    { name: "Jessica Wong", img: friend2 },
    { name: "David Kim", img: friend3 },
    { name: "Amanda Lee", img: friend4 },
    { name: "Robert Garcia", img: friend5 },
    { name: "Sophia Martinez", img: friend6 },
  ];
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
                {/* Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                    <Heart /> My Pets
                  </h2>
                  <button
                    onClick={() => setOpen(true)}
                    className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm"
                  >
                    + Add Pet
                  </button>
                </div>

                {/* Pets Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {pets.map((pet, i) => (
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
                        <h3 className="font-semibold text-purple-700">{pet.name}</h3>
                        <p className="text-sm">{pet.type}</p>
                        <p className="text-xs text-gray-500">🎂 {pet.age}</p>
                      </div>
                    </div>
                  ))}

                  {/* Add New Pet Card */}
                  <div
                    onClick={() => setOpen(true)}
                    className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-center p-6 hover:bg-gray-50 transition"
                  >
                    {/* Plus Icon */}
                    <div className="bg-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-full mb-3 text-lg">
                      +
                    </div>
                    <h3 className="font-medium text-gray-700">Add New Pet</h3>
                    <p className="text-sm text-gray-500">Click to add another furry friend</p>
                  </div>

                </div>

                {/* Modal */}
                {open && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-[400px] max-h-[90vh] overflow-y-auto">
                      {/* Modal Header */}
                      <div className="flex justify-between items-center bg-purple-600 text-white px-4 py-3 rounded-t-xl">
                        <h3 className="text-lg font-semibold">Add New Pet</h3>
                        <button onClick={() => setOpen(false)}>✕</button>
                      </div>

                      {/* Modal Body (Form) */}
                      <div className="p-6 space-y-4">
                        <input
                          type="text"
                          placeholder="Enter pet name"
                          className="w-full border rounded-md px-3 py-2"
                        />

                        <select className="w-full border rounded-md px-3 py-2">
                          <option>Select pet type</option>
                          <option>Dog</option>
                          <option>Cat</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Enter breed"
                          className="w-full border rounded-md px-3 py-2"
                        />

                        <div className="flex gap-2">
                          <input
                            type="number"
                            placeholder="Years"
                            className="w-1/2 border rounded-md px-3 py-2"
                          />
                          <select className="w-1/2 border rounded-md px-3 py-2">
                            <option>Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>

                        <textarea
                          placeholder="Tell us about your pet"
                          className="w-full border rounded-md px-3 py-2"
                        />

                        <input type="file" className="w-full border rounded-md px-3 py-2" />

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => setOpen(false)}
                            className="bg-gray-300 text-black px-4 py-2 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                            Add Pet
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

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
