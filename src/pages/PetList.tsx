import { pets } from "./pets";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.jpg";
import { useState } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import { Heart, MapPin } from "lucide-react";

const PetList = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [likedPets, setLikedPets] = useState<number[]>([]); // store liked pet ids

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleLike = (id: number) => {
    setLikedPets((prev) =>
      prev.includes(id) ? prev.filter((petId) => petId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <div className="p-6 overflow-y-auto">
          {/* Banner */}
          <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow">
            <img src={banner} alt="Banner" className="w-full object-cover" />
          </div>
          <br />
          <br />
          {/* Section Title */}
          <div
            className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow mb-8"
            style={{
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="bg-purple-700/70 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                🐾 Pets For Adoption
              </h2>
              <button className="bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200">
                + Give Pet For Adoption
              </button>
            </div>
          </div>

          {/* Pet Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white shadow-md rounded-2xl overflow-hidden relative"
              >
                {/* Heart Icon (clickable) */}
                <button
                  onClick={() => toggleLike(pet.id)}
                  className="absolute top-3 right-3"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      likedPets.includes(pet.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-500"
                    }`}
                  />
                </button>

                {/* Pet Image */}
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="h-40 w-full object-cover"
                />

                {/* Pet Details */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{pet.name}</h3>
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                      {pet.age}
                    </span>
                  </div>
 
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-3">
                    <MapPin className="w-4 h-4" />
                    {pet.location}
                  </div>

                  <button
                    onClick={() => navigate(`/pet/${pet.id}`)}
                    className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Adopt Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetList;
