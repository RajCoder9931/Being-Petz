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
      setNewPet((prev) => ({ ...prev, imgFile: file }));
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
    // send data to Api
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user_id", String(userId));
      formData.append("name", newPet.name);
      formData.append("type", newPet.type);
      formData.append("breed", newPet.breed);
      formData.append("dob", newPet.dob);
      if (newPet.gender) formData.append("gender", newPet.gender);
      formData.append("bio", newPet.description);
      if (newPet.imgFile) formData.append("avatar", newPet.imgFile);

      const response = await fetch("https://argosmob.com/being-petz/public/api/v1/pet/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Pet added response:", data);

      if (!data.status) {
        alert(data.message || "Something went wrong");
        return;
      }

      let addedPet = data.data || {
        ...newPet,
        avatar: newPet.imgFile ? URL.createObjectURL(newPet.imgFile) : null,
      };


      if (addedPet.avatar && !addedPet.avatar.startsWith("http")) {
        addedPet.avatar = `https://argosmob.com/being-petz/public/${addedPet.avatar}`;
      }

      onPetAdded(addedPet);

      // Reset form
      setNewPet({
        name: "",
        type: "",
        breed: "",
        dob: "",
        gender: "",
        description: "",
        imgFile: null,
      });

      setOpen(false);
      alert("Pet added successfully ");
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("Failed to add pet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="p-6 border rounded-lg shadow bg-white w-[400px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Add New Pet</h2>

        <input
          type="text"
          name="name"
          placeholder="Pet Name"
          value={newPet.name}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <select
          name="type"
          value={newPet.type}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="">Select Pet Type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>

        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={newPet.breed}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="date"
          name="dob"
          value={newPet.dob}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <select
          name="gender"
          value={newPet.gender}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <textarea
          name="description"
          placeholder="Tell us about your pet"
          value={newPet.description}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-4"
        />

        {newPet.imgFile && (
          <img
            src={URL.createObjectURL(newPet.imgFile)}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mb-4"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleAddPet}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
          >
            {loading ? "Adding..." : "Add Pet"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddPetForm;
