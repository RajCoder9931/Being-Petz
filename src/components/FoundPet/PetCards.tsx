import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const LostFoundPets = () => {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"lost" | "found" | "all">("all");
  const [selectedPet, setSelectedPet] = useState<any | null>(null);
  const [contactPet, setContactPet] = useState<any | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          "https://argosmob.com/being-petz/public/api/v1/pet/lost-found/all"
        );
        if (response.data.status && response.data.data?.data) {
          setPets(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const filteredPets =
    filter === "all" ? pets : pets.filter((pet) => pet.report_type === filter);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">Loading pets...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {["lost", "found", "all"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition ${
              filter === type
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type === "lost"
              ? "Lost Pets"
              : type === "found"
              ? "Found Pets"
              : "All"}
          </button>
        ))}
      </div>

      {/* Pets Grid */}
      {filteredPets.length === 0 ? (
        <div className="text-center text-gray-500">No pets found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col relative"
            >
              {/* Pet Image */}
              <img
                src={`https://argosmob.com/being-petz/public/${pet.images?.[0]}`}
                alt={pet.pet_type}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />

              {/* Tag */}
              <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {pet.report_type.toUpperCase()}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 capitalize">
                {pet.breed}
              </h3>

              {/* Location + Last Seen */}
              <p className="text-sm text-gray-600">
                📍 {pet.location} •{" "}
                {new Date(pet.occurred_at).toLocaleDateString()}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                  {pet.pet_type}
                </span>
                {pet.pet_gender && (
                  <span className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full capitalize">
                    {pet.pet_gender}
                  </span>
                )}
              </div>

              {/* About Pet */}
              <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                {pet.about_pet || "No description available."}
              </p>

              {/* Buttons (aligned left) */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setSelectedPet(pet)}
                  className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                >
                  Details
                </button>
                <button
                  onClick={() => setContactPet(pet)}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedPet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {selectedPet.breed}
            </h2>
            <img
              src={`https://argosmob.com/being-petz/public/${selectedPet.images?.[0]}`}
              alt={selectedPet.pet_type}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-2">{selectedPet.about_pet}</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📍 Location: {selectedPet.location}</p>
              <p>📅 Last Seen: {new Date(selectedPet.occurred_at).toDateString()}</p>
              <p>🐾 Type: {selectedPet.pet_type}</p>
              <p>⚥ Gender: {selectedPet.pet_gender}</p>
            </div>

            {/* Contact Owner Options */}
            <div className="flex gap-3 mt-5">
              {selectedPet.user?.phone && (
                <a
                  href={`tel:${selectedPet.user.phone}`}
                  className="px-4 py-2 text-sm bg-green-500 text-white rounded-full hover:bg-green-600"
                >
                  Call Owner
                </a>
              )}
              <button
                onClick={() => {
                  setContactPet(selectedPet);
                  setSelectedPet(null);
                }}
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {contactPet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setContactPet(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">
              Contact About {contactPet.breed}
            </h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Message"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                rows={3}
              ></textarea>
              <div className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm">
                {contactPet.breed} (ID: {contactPet.id})
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" /> I agree to the{" "}
                <span className="text-purple-600 cursor-pointer">
                  Terms of Service
                </span>
              </label>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFoundPets;
