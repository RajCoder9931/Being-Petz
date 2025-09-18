import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPaw } from "react-icons/fa";

// Components
import Header from "./Header";
import Sidebar from "./sidebar";
import FriendSuggestions from "./FriendSuggestions";
import Loader from "./Loader";
import CreatePost from "./CreatePost";
import PostList from "./Postlist";
// Images
import { PawPrint, CalendarIcon, Home, Heart } from "lucide-react";
import dogImg from "../../assets/img/cat.jpg";
import img7 from "../../assets/user/06.jpg";
import img8 from "../../assets/user/07.jpg";
import img9 from "../../assets/user/08.jpg";
import adoptPetImg from "../../assets/adopt-img.png";
import lostFoundImg from "../../assets/lost-found.png";

type EventType = {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  image: string;
  bgColor: string;  
};
 
const events: EventType[] = [
  {
    id: 1,
    title: "Pet Adoption Event",
    date: new Date(2025, 9, 4),
    time: "Saturday, Oct 4 • 11:00 AM - 1:00 PM",
    location: "Ellington Agway, 74 West Rd, Ellington, CT",
    image:
      "https://people.com/thmb/Rm8iYbylv_7ZqLUpJI53Z75XAHg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/hallmark-adoption-event-07-4e1d6a10f3734cbca7fdb905b8945638.jpg",
    bgColor: "bg-pink-500",
  },
  {
    id: 2,
    title: "Community Fundraiser",
    date: new Date(2025, 9, 10),
    time: "Friday, Oct 10 • 2:00 PM - 5:00 PM",
    location: "Town Hall, Ellington CT",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYtlzEbboFDQtJpDadNq4jodFgca_5MmVhRw&s",
    bgColor: "bg-purple-500",
  },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 bg-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="col-span-2 space-y-6">
              {/* Banner */}
              <div className="rounded-xl overflow-hidden">
                <div className="w-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-between p-4 shadow-md">

                  {/* Left profile image */}
                  <img
                    src={dogImg}
                    alt="Dog"
                    className="w-20 h-20 rounded-full border-2 border-white"
                  />

                  {/* Center text + icons */}
                  <div className="flex flex-col items-center text-white flex-1 mx-4">
                    <p className="text-1xl font-bold">Welcome Home, Buddy!</p>
                    <p className="text-lg">for Bet Best Friend</p>

                    {/* icons row */}
                    <div className="flex gap-6 mt-3">
                      <PawPrint size={20} />
                      <Home size={20} />
                      <Heart size={20} />
                    </div>
                  </div>

                  {/* Right side Home icon */}
                  <div className="bg-white/20 p-4 rounded-full">
                    <Home size={28} className="text-white" />
                  </div>
                </div>
              </div>
              {/* My Pet Family Section */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">My Pet Family</h2>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {/* Pet Card 1 */}
                  <div className="bg-white rounded-xl shadow-md p-4 w-48 flex-shrink-0 text-center">
                    <img
                      src={dogImg}
                      alt="Buddy"
                      className="w-20 h-20 rounded-full mx-auto border-2 border-purple-500"
                    />
                    <h3 className="mt-3 font-bold">Buddy</h3>
                    <p className="text-sm text-gray-500">Golden Retriever</p>
                    <p className="text-xs text-gray-400">3 Years ♂ Male</p>
                    <div className="flex gap-2 mt-3 justify-center">
                      <button className="px-3 py-1 text-xs rounded-full bg-purple-500 text-white hover:bg-purple-600">
                        Edit Profile
                      </button>
                      
                    </div>
                  </div>

                  {/* Pet Card 2 */}
                  <div className="bg-white rounded-xl shadow-md p-4 w-48 flex-shrink-0 text-center">
                    <img
                      src={img7}
                      alt="Max"
                      className="w-20 h-20 rounded-full mx-auto border-2 border-purple-500"
                    />
                    <h3 className="mt-3 font-bold">Max</h3>
                    <p className="text-sm text-gray-500">Ginger Tabby</p>
                    <p className="text-xs text-gray-400">3 Years ♂ Male</p>
                    <div className="flex gap-2 mt-3 justify-center">
                      <button className="px-3 py-1 text-xs rounded-full bg-purple-500 text-white hover:bg-purple-600">
                        Edit Profile
                      </button>
                      
                    </div>
                  </div>

                  {/* Pet Card 3 */}
                  <div className="bg-white rounded-xl shadow-md p-4 w-48 flex-shrink-0 text-center">
                    <img
                      src={img8}
                      alt="Romeo"
                      className="w-20 h-20 rounded-full mx-auto border-2 border-purple-500"
                    />
                    <h3 className="mt-3 font-bold">Romeo</h3>
                    <p className="text-sm text-gray-500">White Rabbit</p>
                    <p className="text-xs text-gray-400">3 Years ♂ Male</p>
                    <div className="flex gap-2 mt-3 justify-center">
                      <button className="px-3 py-1 text-xs rounded-full bg-purple-500 text-white hover:bg-purple-600">
                        Edit Profile
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
              {/* Create Post Component */}
              <CreatePost />

              {/* Post List */}
              <PostList />


              <FriendSuggestions
                suggestions={[
                  { name: "Buddy (Golden)", desc: "Loves fetching and cuddles", mutual: 3, img: img7 },
                  { name: "Kiwi (Talks-a-lot)", desc: "Can say your name!", mutual: 2, img: img8 },
                  { name: "Nibbles (Tiny Hero)", desc: "Full of energy and love!", mutual: 4, img: img9 },
                ]}
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Contest Entry */}
              <div
                onClick={() => navigate("/events")}
                className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg group"
              >
                <img
                  src="https://www.stonnington.vic.gov.au/files/assets/public/community/arts-and-culture/festival-and-events/pets-in-the-park/pets-in-the-park-2021-a.jpg" 
                  alt="Contest"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    Check the Events
                  </span>
                </div>
              </div>

              {/* Sponsored Card 1 */}
              <div className="relative rounded-2xl shadow-lg overflow-hidden">
                <img
                  src="https://picsum.photos/600/300"  
                  alt="Fuel Their Joy"
                  className="w-full h-48 object-cover "
                />
                <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                  Sponsored !
                </span>
                <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center p-6 text-white">
                  <h3 className="text-lg font-semibold">Fuel Their Joy!</h3>
                  <p className="text-sm mt-1">Premium Nutrition for Happy Pets</p>
                  <button className="mt-3 px-4 py-2 rounded-full bg-transparent border border-green-300 text-green-300 font-medium shadow hover:bg-gray-100">
                    Discover Now
                  </button>
                </div>
              </div>

              {/* Medical History */}
              <div className="grid grid-cols-2 gap-3">
                {/* Left Box */}
                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between">
                  <h4 className="font-semibold">Medical History</h4>
                  <p className="text-xs text-gray-500">View History, Records</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                    <span>45 Comments</span>
                    <span>Share</span>
                  </div>
                </div>

                {/* Right Box */}
                <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center">
                  <img
                    src={dogImg}
                    alt="Vet Clinic"
                    className="w-12 h-12 rounded-full border border-purple-500 mb-2"
                  />
                  <h4 className="font-semibold text-sm">Dr. Whiskers Clinic</h4>
                  <p className="text-xs text-gray-500">Vet Check-up</p>
                  <p className="text-xs text-gray-400">2,105 Likes</p>
                  <button className="mt-2 px-3 py-1 text-xs rounded-full bg-purple-500 text-white hover:bg-purple-600">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Sponsored Card 2 */}
              <div className="relative rounded-2xl shadow-lg overflow-hidden">
                <img
                  src="https://picsum.photos/600/301"  
                  alt="Travel in Style"
                  className="w-full h-48 object-cover "
                />
                <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                  Sponsored !
                </span>
                <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center p-6 text-white">
                  <h3 className="text-lg font-semibold">Travel in Style!</h3>
                  <p className="text-sm mt-1">New Premium Pet Carriers</p>
                  <button className="mt-3 px-4 py-2 rounded-full bg-transparent border border-purple-600 text-purple-600 font-medium shadow hover:bg-gray-100">
                    Shop Now
                  </button>
                </div>
              </div>


              {/* Adopt Pet */}
              <div
                className="relative rounded-2xl shadow-lg overflow-hidden h-60 bg-cover bg-center"
                style={{ backgroundImage: `url(${adoptPetImg})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-500/70 p-5 flex flex-col justify-center text-white">
                  <h3 className="text-xl font-semibold">Adopt a Pet</h3>
                  <p className="text-sm mt-2">Give a homeless pet a home and a loving family!</p>
                  <Link
                    to="/adopt-pet"
                    className="mt-3 ml-auto flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-medium shadow-md hover:opacity-90 transition"
                  >
                    <FaPaw className="text-white text-sm" /> Adopt Now
                  </Link>

                </div>
              </div>

              {/* Lost & Found */}
              <div
                className="relative rounded-2xl shadow-lg overflow-hidden h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${lostFoundImg})` }}
              >
                {/* gradient left → right: pink → purple */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-purple-600/90 p-5 flex flex-col justify-center text-white">
                  <h3 className="text-xl font-semibold">Lost &amp; Found Pets</h3>
                  <div className="mt-4 flex gap-3">
                    {/* Report button (gradient) */}
                    <Link
                      to="/report-found-pet"
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-medium shadow-md hover:opacity-90 transition"
                    >
                      Report
                    </Link>
                    {/* Found button (white with purple border) */}
                    <Link
                      to="/report-found-pet"
                      className="px-6 py-2 rounded-full bg-white text-purple-600 border border-purple-600 text-sm font-medium shadow-md hover:bg-purple-600 hover:text-white transition"
                    >
                      Found
                    </Link>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Featured Pet Events</h2>
        <CalendarIcon className="text-purple-600" size={22} />
      </div>

      {/* Event List */}
      {events.map((event) => (
        <div
          key={event.id}
          className={`flex items-center ${event.bgColor} rounded-xl p-4 mb-3 text-white`}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-14 h-14 rounded-full mr-3 object-cover"
          />
          <div>
            <h3 className="font-semibold text-sm">{event.title}</h3>
            <p className="text-xs">{event.time}</p>
            <p className="text-xs">{event.location}</p>
          </div>
        </div>
      ))}

      {/* Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/events")}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
        >
          <PawPrint size={16} />
          View All Events
        </button>
      </div>
    </div>


            </div>
          </div>
        </main>
      </div>


      <Loader />

    </div>
  );
};

export default Dashboard;
