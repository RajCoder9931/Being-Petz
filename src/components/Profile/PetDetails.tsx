import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PetQRPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));

        const res = await fetch(
          "https://argosmob.com/being-petz/public/api/v1/pet/get/my",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: JSON.parse(storedUser || "{}").id }),
          }
        );
        const data = await res.json();
        if (data.status && Array.isArray(data.data)) {
          const selected = data.data.find((p: any) => p.id === Number(id));
          setPet(selected);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPet();
  }, [id]);

  if (!pet || !user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col items-center ">
      <div className="w-full bg-purple-700 text-white flex flex-col items-center py-6">
        <header className="w-full text-center text-xl font-semibold">
          BeingPetz
        </header>
        
        {pet.lost && (
          <div className="bg-yellow-400 text-black px-6 py-3 text-center w-full mt-4 rounded-md">
            ⚠ It seems {pet.name} is lost. Please help re-unite
          </div>
        )}
        <h2 className="text-2xl font-semibold text-white mt-6 mb-2 capitalize">
          {pet.name}'s Information
        </h2>
      </div>

      <div className="flex flex-col items-center mt-4">
        <img
          src={
            pet.avatar
              ? `https://argosmob.com/being-petz/public/${pet.avatar}`
              : ""
          }
          alt={pet.name}
          className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white"
        />
        <h3 className="text-xl font-bold mt-2 capitalize">{pet.name}</h3>
        <p className="text-gray-600">{pet.breed}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8 w-11/12 max-w-4xl">
        {/* About Pet */}
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h4 className="text-purple-700 text-lg font-semibold mb-3">
            About {pet.name}
          </h4>
          <p>
            <span className="font-semibold">Gender:</span> {pet.gender}
          </p>
          <p>
            <span className="font-semibold">DOB:</span> {pet.dob}
          </p>
          <p>
            <span className="font-semibold">Breed:</span> {pet.breed}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Bio:</span> {pet.bio}
          </p>
        </div>

        {/* Parent Info */}
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <div className="flex items-center space-x-3">
            <img
              src={
                user.profile
                  ? `https://argosmob.com/being-petz/public/${user.profile}`
                  : ""
              }
              alt={user.first_name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                {user.first_name} {user.last_name}
              </h4>
              <p className="text-sm text-gray-500">{pet.name}'s Parent</p>
            </div>
          </div>

          <h5 className="text-purple-700 font-semibold mt-4">
            Contact Information
          </h5>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone || "N/A"}
          </p>

          <div className="mt-4">
            <h5 className="text-purple-700 font-semibold">Location</h5>
            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${user.latitude || "India"}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-40 rounded-lg mt-2"
            ></iframe>
            <p className="text-xs text-gray-500 mt-1">
              Approximate location based on parent's coordinates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetQRPage;
