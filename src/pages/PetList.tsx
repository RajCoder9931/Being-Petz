import { useState, useEffect } from "react";
import { Heart, MapPin } from "lucide-react";
import axios from "axios";
import { FaPaw } from "react-icons/fa";
import banner from "../assets/banner.jpg";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
import PetForm from "./Pet-Adoption-form";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
}

interface GalleryImage {
  id: number;
  listing_id: number;
  image_path: string;
}

interface Pet {
  id: number;
  pet_name: string;
  pet_type: string;
  breed: string;
  gender: string;
  dob: string;
  description: string | null;
  about_pet: string | null;
  location: string;
  contact_phone: string | null;
  contact_email: string | null;
  featured_image: string | null;
  gallery_images: GalleryImage[];
  user: User;
}

interface ApiResponse {
  status: boolean;
  data: {
    current_page: number;
    data: Pet[];
    last_page: number;
  };
}

const PetList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [likedPets, setLikedPets] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleLike = (id: number) => {
    setLikedPets((prev) =>
      prev.includes(id) ? prev.filter((petId) => petId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        let res = await axios.post<ApiResponse>(
          "https://argosmob.com/being-petz/public/api/v1/pet/all-adoptions"
        );
        setPets(res.data.data.data);
      } catch (err: any) {
        console.error("Error fetching pets:", err);
        setError(err.message || "Failed to fetch pets");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 pt-12">
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
               <FaPaw/> Pets For Adoption
              </h2>

              {/* ✅ Button to open form */}
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200"
              >
                Give Pet For Adoption
              </button>
            </div>
          </div>

          {/* Loading / Error / Data */}
          {loading ? (
            <p className="text-center text-gray-500">Loading pets...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : pets.length === 0 ? (
            <p className="text-center text-gray-500">
              No pets available for adoption.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  onClick={() => setSelectedPet(pet)} 
                  className="bg-white shadow-md rounded-2xl overflow-hidden relative cursor-pointer hover:shadow-lg transition"
                >
                  {/* Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening modal
                      toggleLike(pet.id);
                    }}
                    className="absolute top-3 right-3"
                  >
                    <Heart
                      className={`w-6 h-6 transition-colors ${likedPets.includes(pet.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-500"
                        }`}
                    />
                  </button>

                  {/* Pet Image */}
                  <img
                    src={
                      pet.featured_image
                        ? `https://argosmob.com/being-petz/public/${pet.featured_image}`
                        : "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={pet.pet_name}
                    className="h-40 w-full object-cover"
                  />

                  {/* Pet Details */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{pet.pet_name}</h3>
                      <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                        {pet.dob}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-3">
                      <MapPin className="w-4 h-4" />
                      {pet.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ✅ Pet Form Modal */}
      {showForm && <PetForm onClose={() => setShowForm(false)} />}

      {/* ✅ Pet Details Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute top-2 right-2 text-red-500 font-bold text-lg"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={
                selectedPet.featured_image
                  ? `https://argosmob.com/being-petz/public/${selectedPet.featured_image}`
                  : "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={selectedPet.pet_name}
              className="w-full h-64 object-cover rounded-md"
            />

            {/* Pet Info */}
            <h2 className="text-2xl font-bold mt-4">{selectedPet.pet_name}</h2>
            <p className="text-gray-600">
              {selectedPet.breed} • {selectedPet.gender}
            </p>
            <p className="text-gray-500"> {selectedPet.location}</p>
            <p className="mt-3">{selectedPet.description || "No description"}</p>

            {/* Contact Info */}
            <div className="mt-4">
              <p>  {selectedPet.contact_phone || "N/A"}</p>
              <p>  {selectedPet.contact_email || "N/A"}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() =>
                  window.location.href = `tel:${selectedPet.contact_phone || "9999999999"}`
                }
                className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
              >
                Call
              </button>
              <button
                onClick={() => setSelectedPet(null)}
                className="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PetList;
