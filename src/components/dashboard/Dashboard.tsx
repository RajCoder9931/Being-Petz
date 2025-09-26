import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
 
// Components
import Header from "./Header";
import Sidebar from "./sidebar";
import CreatePost from "./CreatePost";
import PostList from "./Postcard";
// Images
import { PawPrint, CalendarIcon, Home, Heart } from "lucide-react";
import dogImg from "../../assets/img/cat.jpg"; 
 import adoptPetImg from "../../assets/adopt-img.png";
 import Contest from '../../assets/contest.png';
import lostFoundImg from "../../assets/lost-found.png";

const dummyImages = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/160",
  "https://via.placeholder.com/170",
];

type EventType = {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  image: string;
  bgColor: string;  
};
type Pet = {
  id: number;
  name: string;
  age: number;
  breed: string;
  gender: string;
  avatar?: string;  
};
 
 

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);

 
  const handleViewProfile = () => {
    navigate('/pet-profile');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id;
      fetchPets(userId);
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

  const fetchPets = async (userId: string | number) => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/pet/get/my",
        { user_id: userId }
      );
      setPets(response.data.data || []);
    } catch (error) {
      console.error("Error fetching pets:", error);
      alert("Failed to fetch pets");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col pt-11">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 bg-gray-100 p-6">
          {/* Added container with max-width to prevent over-expansion */}
          <div className="max-w-7xl mx-auto">
            {/* Changed grid layout to 5-column on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* LEFT COLUMN - Now spans 3 columns instead of 2 */}
              <div className="lg:col-span-3 space-y-6">
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {pets.map((pet, i) => (
            <div
              key={pet.id}
              className="bg-white rounded-xl shadow-md p-4 w-48 flex-shrink-0 text-center"
            >
              <img
                src={
                  pet.avatar
                    ? pet.avatar.startsWith("http")
                      ? pet.avatar
                      : `https://argosmob.com/being-petz/public/${pet.avatar}`
                    : dummyImages[i % dummyImages.length]
                }
                alt={pet.name}
                className="w-20 h-20 rounded-full mx-auto border-2 border-purple-500 object-cover"
              />
              <h3 className="mt-3 font-bold">{pet.name}</h3>
              <p className="text-sm text-gray-500">{pet.breed}</p>
              <p className="text-xs text-gray-400">
                {pet.age} Years {pet.gender === "Male" ? "♂ Male" : "♀ Female"}
              </p>
              <div className="flex gap-2 mt-3 justify-center">
              <button
      onClick={handleViewProfile}
      className="px-3 py-1 text-xs rounded-full bg-purple-500 text-white hover:bg-purple-600"
    >
      View Profile
    </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
                {/* Create Post Component */}
                <CreatePost />

                {/* Post List - This section will now be wider */}
                <PostList />


               </div>

              {/* RIGHT COLUMN - Now spans 2 columns instead of 1 */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contest Entry */}
                <div
                  onClick={() => navigate("/events")}
                  className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg group"
                >
                  <img
                    src={Contest} 
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

         {/* Header */}
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
 

              </div>
            </div>
          </div>
        </main>
      </div>
     </div>
  );
};

export default Dashboard;