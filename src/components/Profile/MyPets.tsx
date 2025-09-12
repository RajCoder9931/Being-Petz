import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import cat1 from "../../assets/img/cat.jpg";
import cat2 from "../../assets/img/2.avif";
import cat3 from "../../assets/img/3.webp";
import AddPetForm from "./AddPetForm";

const MyPets = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState<any[]>([]);
  const dummyImages = [cat1, cat2, cat3];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await fetch("https://argosmob.com/being-petz/public/api/v1/pet/get/my", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        });
        const data = await response.json();
        if (data.status && Array.isArray(data.data)) {
          setPets(data.data);
        } else {
          setPets([]);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [userId]);

  return (
    <div className="bg-white rounded-2xl shadow p-6">
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

      {loading ? (
        <p className="text-gray-500 mt-4">Loading pets...</p>
      ) : pets.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">

          {pets.map((pet: any, i) => (
            <div key={i} className="bg-gray-50 rounded-xl shadow overflow-hidden">
              <img
                src={
                  pet.avatar
                    ? pet.avatar.startsWith("http")
                      ? pet.avatar
                      : `https://argosmob.com/being-petz/public/${pet.avatar}`
                    : dummyImages[i % dummyImages.length]
                }
                alt={pet.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-3">
                <h3 className="font-semibold text-purple-700">{pet.name}</h3>
                <p className="text-sm">{pet.type}</p>
                <p className="text-xs text-gray-500">{pet.dob || "Age N/A"}</p>
              </div>
            </div>
          ))}

          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-center text-gray-500 text-sm hover:bg-gray-100"
          >
            + Add New Pet
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No pets found. Add your first pet!</p>
      )}

      {/* Add Pet Form Modal */}
      {open && (
        <AddPetForm
          open={open}
          setOpen={setOpen}
          userId={userId}
          onPetAdded={(pet) => setPets((prev) => [...prev, pet])}
        />
      )}
    </div>
  );
};

export default MyPets;
