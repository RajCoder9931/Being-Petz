import { useState, useEffect } from "react";
import { Heart, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cat1 from "../../assets/img/cat.jpg";
import cat2 from "../../assets/img/2.avif";
import cat3 from "../../assets/img/3.webp";
import AddPetForm from "./AddPetForm";

// Import your QR image
import qrImage from "../../assets/Qr code.png";  

const MyPets = () => {
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);

  const dummyImages = [cat1, cat2, cat3];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await fetch(
          "https://argosmob.com/being-petz/public/api/v1/pet/get/my",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: user.id }),
          }
        );
        const data = await res.json();
        if (data.status && Array.isArray(data.data)) setPets(data.data);
        else setPets([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [user]);

  const toggleMenu = (e: React.MouseEvent, petId: number) => {
    e.stopPropagation();
    setMenuOpenId(menuOpenId === petId ? null : petId);
  };

  const openQRModal = (pet: any) => {
    setSelectedPet(pet);
    setQrOpen(true);
    setMenuOpenId(null);
  };

  const redirectToPet = () => {
    if (!selectedPet) return;
    navigate(`/pet-qr/${selectedPet.id}`);
    setQrOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
          <Heart /> My Pets
        </h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm"
        >
          + Add Pet
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 mt-4">Loading pets...</p>
      ) : pets.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="relative bg-gray-50 rounded-xl shadow overflow-hidden cursor-pointer"
            >
              <img
                src={
                  pet.avatar
                    ? `https://argosmob.com/being-petz/public/${pet.avatar}`
                    : dummyImages[pet.id % dummyImages.length]
                }
                alt={pet.name}
                className="w-full h-40 object-cover"
              />

              {/* 3-dot menu */}
              <div className="absolute top-2 right-2">
                <div className="relative">
                  <button
                    onClick={(e) => toggleMenu(e, pet.id)}
                    className="p-1 rounded-full hover:bg-gray-200"
                  >
                    <MoreVertical size={18} />
                  </button>
                  {menuOpenId === pet.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-50">
                      <button
                        onClick={() => openQRModal(pet)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Generate QR
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-purple-700">{pet.name}</h3>
                <p className="text-sm">{pet.type}</p>
                <p className="text-xs text-gray-500">{pet.dob || "Age N/A"}</p>
              </div>
            </div>
          ))}

          <div
            onClick={() => setOpenAdd(true)}
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-center text-gray-500 text-sm hover:bg-gray-100"
          >
            + Add New Pet
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No pets found. Add your first pet!</p>
      )}

      {/* Add Pet Form Modal */}
      {openAdd && (
        <AddPetForm
          open={openAdd}
          setOpen={setOpenAdd}
          userId={user?.id}
          onPetAdded={(pet) => setPets((prev) => [...prev, pet])}
        />
      )}

      {/* QR Modal */}
{qrOpen && selectedPet && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl relative flex flex-col items-center">
      <button
        onClick={() => setQrOpen(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
      >
        ✕
      </button>

      <h3 className="text-lg font-semibold mb-4">Scan QR to view {selectedPet.name}</h3>

      {/* QR Image */}
      <img
        src={qrImage}
        alt={`QR for ${selectedPet.name}`}
        className="w-48 h-48 cursor-pointer"
        onClick={() => navigate(`/pet-qr/${selectedPet.id}`)}
      />

      {/* Link below QR */}
      <a
        href={`/pet-qr/${selectedPet.id}`}
        className="text-purple-700 mt-3 underline text-sm"
      >
        Open {selectedPet.name}'s profile
      </a>

      {/* Download button */}
      <a
        href={qrImage}
        download={`QR_${selectedPet.name}.png`}
        className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm mt-2 hover:bg-purple-700"
      >
        Download QR
      </a>
    </div>
  </div>
)}

    </div>
  );
};

export default MyPets;
