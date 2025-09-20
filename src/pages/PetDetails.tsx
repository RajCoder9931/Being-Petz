
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";

type Pet = {
  id: number;
  name: string;
  age: string;
  location: string;
  featured_image: string;
  type?: string;
  breed?: string;
  description?: string;
  contact_number?: string; // in case API provides phone
};

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(
          "https://argosmob.uk/being-petz/public/api/v1/pet/all-adoptions",
          { headers: { Accept: "application/json" } }
        );

        const petsData = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        const foundPet = petsData.find((p: Pet) => p.id === Number(id));
        setPet(foundPet || null);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPet();
  }, [id]);

  if (!pet) return <p className="text-center mt-10">Pet not found...</p>;

  const handleCall = () => {
    const phone = pet.contact_number || "9999999999"; // default if API not giving
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Featured Image */}
      <img
        src={pet.featured_image}
        alt={pet.name}
        className="w-full h-72 object-cover rounded-2xl shadow"
      />

      {/* Pet Info */}
      <h2 className="text-3xl font-bold mt-4">{pet.name}</h2>
      <p className="text-gray-600 mt-1">📍 {pet.location}</p>
      <p className="text-gray-600">Type: {pet.type || "N/A"}</p>
      <p className="text-gray-600">Breed: {pet.breed || "N/A"}</p>
      <p className="mt-4 text-gray-700">
        {pet.description || "No description available."}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={handleCall}
          className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
         <FaPhoneAlt /> Call
        </button>
      </div>
    </div>
  );
};

export default PetDetails;
