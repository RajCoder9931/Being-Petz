import { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateCommunityForm({ onClose, onCreated }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    category: "public",
    description: "",
    latitude: "",
    longitude: "",
    created_by: "", // auto-fill from login user
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Get logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setFormData((prev) => ({ ...prev, created_by: String(user.id) })); // ensure string
    }
  }, []);

  // Handle normal input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // when a user is typing a location then auto fetch suggestions
    if (e.target.name === "location" && e.target.value.length > 2) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}`
      )
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.error(err));
    } else if (e.target.name === "location") {
      setSuggestions([]);
    }
  };

  // When user selects a location suggestion
  const handleSelectLocation = (place: any) => {
    setFormData({
      ...formData,
      location: place.display_name,
      latitude: place.lat,
      longitude: place.lon,
    });
    setSuggestions([]); // clear dropdown
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, String(value)); // always string
      }
    });

    // profile and cover image
    if (profileImage) data.append("profile_image", profileImage);
    if (coverImage) data.append("cover_image", coverImage);

    // Debug: check what is being sent
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      const res = await fetch(
        "https://argosmob.com/being-petz/public/api/v1/pet/community/create",
        {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to create community");
      alert("Community created successfully!");
      onCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error while creating community!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-4 text-purple-600">
          Create New Community
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Community Name */}
          <input
            type="text"
            name="name"
            placeholder="Community Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          {/* Location with autocomplete */}
          <div className="relative">
            <input
              type="text"
              name="location"
              placeholder="Search Location"
              className="w-full border p-2 rounded"
              value={formData.location}
              onChange={handleChange}
              required
            />

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <ul className="absolute z-50 bg-white border w-full max-h-40 overflow-y-auto rounded shadow">
                {suggestions.map((place, idx) => (
                  <li
                    key={idx}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectLocation(place)}
                  >
                    {place.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Category */}
          <select
            className="w-full border p-2 rounded"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          {/* Hidden Created By */}
          <input type="hidden" name="created_by" value={formData.created_by} />

          {/* Upload Profile Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full mt-1"
              onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
            />
          </div>

          {/* Upload Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full mt-1"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
