import { useState } from "react";

interface AddPetFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: number | null;
  onPetAdded: (pet: any) => void;
}

const AddPetForm: React.FC<AddPetFormProps> = ({ open, setOpen, userId, onPetAdded }) => {
  const [loading, setLoading] = useState(false);
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    dob: "",
    gender: "",
    description: "",
    imgFile: null as File | null,
    img: null as string | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPet((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPet((prev) => ({
        ...prev,
        imgFile: file,
        img: URL.createObjectURL(file),
      }));
    }
  };

  const handleAddPet = async () => {
    if (!newPet.name || !newPet.type) {
      alert("Please enter at least Name and Type.");
      return;
    }
    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_id", String(userId));
      formData.append("name", newPet.name);
      formData.append("type", newPet.type);
      formData.append("breed", newPet.breed);
      formData.append("dob", newPet.dob);
      if (newPet.gender) {
        formData.append("gender", newPet.gender.toLowerCase());
      }
      formData.append("bio", newPet.description);
      if (newPet.imgFile) {
        formData.append("avatar", newPet.imgFile);
      }

      const response = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Pet added response:", data);

      if (!data.status) {
        alert(data.message || "Something went wrong");
        return;
      }

      onPetAdded({
        name: newPet.name,
        type: newPet.type,
        dob: newPet.dob,
        avatar: newPet.img,
      });

      setNewPet({
        name: "",
        type: "",
        breed: "",
        dob: "",
        gender: "",
        description: "",
        imgFile: null,
        img: null,
      });
      setOpen(false);
      alert("Pet added successfully ✅");
    } catch (err) {
      console.error("Add Pet Error:", err);
      alert("Failed to add pet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[400px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center bg-purple-600 text-white px-4 py-3 rounded-t-xl">
          <h3 className="text-lg font-semibold">Add New Pet</h3>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>
        <div className="p-6 space-y-4">
          <input
            type="text"
            name="name"
            value={newPet.name}
            onChange={handleChange}
            placeholder="Enter pet name"
            className="w-full border rounded-md px-3 py-2"
          />
          <select
            name="type"
            value={newPet.type}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select pet type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <input
            type="text"
            name="breed"
            value={newPet.breed}
            onChange={handleChange}
            placeholder="Enter breed"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="date"
            name="dob"
            value={newPet.dob}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
          <select
            name="gender"
            value={newPet.gender}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <textarea
            name="description"
            value={newPet.description}
            onChange={handleChange}
            placeholder="Tell us about your pet"
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded-md px-3 py-2"
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPet}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Pet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPetForm;
