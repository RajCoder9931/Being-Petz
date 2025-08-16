import { useParams, useNavigate } from "react-router-dom";
import { pets } from "./pets";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = pets.find((p) => p.id === Number(id));

  if (!pet) {
    return <h2 className="text-center mt-10">Pet not found</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold">{pet.name}</h1>
        <p className="mt-2">
          {pet.breed} • {pet.age} • {pet.gender}
        </p>
      </div>

      {/* Image + About */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <img
          src={pet.image}
          alt={pet.name}
          className="w-full h-72 object-cover rounded-lg shadow-md"
        />

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">About {pet.name}</h2>
          <p className="text-gray-700">{pet.description}</p>
        </div>
      </div>

      {/* Health & Care */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">❤️ Health & Care</h2>
        <ul className="grid md:grid-cols-2 gap-3 text-gray-700">
          <li>💉 Vaccination: {pet.vaccination}</li>
          <li>🩺 Health: {pet.health}</li>
          <li>🥗 Diet: {pet.diet}</li>
          <li>✂️ Grooming: {pet.grooming}</li>
        </ul>
      </div>

      {/* Location & Contact */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">📍 Location & Contact</h2>
        <p><strong>Location:</strong> {pet.location}</p>
        <p><strong>Contact:</strong> {pet.contact}</p>
        <p><strong>Email:</strong> {pet.email}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
          Adopt {pet.name}
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Call Now
        </button>
        {/* Cancel Button */}
        <button
          onClick={() => navigate("/adopt-pet")}
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PetDetails;
