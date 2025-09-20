import React, { useState, useEffect } from "react";

interface PetFormData {
  pet_name: string;
  pet_type: string;
  breed: string;
  gender: string;
  dob: string;
  description: string;
  about_pet: string;
  is_healthy: boolean;
  vaccination_done: boolean;
  location: string;
  latitude: string;
  longitude: string;
  contact_phone: string;
  contact_email: string;
  is_neutered: boolean;
  is_dewormed: boolean;
  featured_image: File | null;
  gallery_images: File[];
}

interface Errors {
  [key: string]: string;
}

const PetForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<PetFormData>({
    pet_name: "",
    pet_type: "",
    breed: "",
    gender: "",
    dob: "",
    description: "",
    about_pet: "",
    is_healthy: false,
    vaccination_done: false,
    location: "",
    latitude: "",
    longitude: "",
    contact_phone: "",
    contact_email: "",
    is_neutered: false,
    is_dewormed: false,
    featured_image: null,
    gallery_images: [],
  });

  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ fetch user_id from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.id) {
          setUserId(parsedUser.id.toString());
        }
      } catch (err) {
        console.error("Invalid user object in localStorage:", err);
      }
    }
  }, []);

  // ✅ field validation
  const validateField = (name: string, value: any) => {
    let error = "";

    switch (name) {
      case "pet_name":
      case "pet_type":
      case "breed":
        if (!value.trim()) error = "This field is required";
        else if (!/^[A-Za-z\s]+$/.test(value))
          error = "Only letters allowed";
        break;

      case "gender":
        if (!value) error = "Gender is required";
        break;

      case "dob":
        if (!value) error = "Date of Birth is required";
        else if (new Date(value) > new Date())
          error = "DOB cannot be in the future";
        break;

      case "description":
      case "about_pet":
      case "location":
        if (!value.trim()) error = "This field is required";
        break;

      case "contact_phone":
        if (!/^\d+$/.test(value)) error = "Only numbers allowed";
        else if (value.length !== 10) error = "Phone must be 10 digits";
        break;

      case "contact_email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = "Enter a valid email";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ✅ handle change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;
    let fieldValue: any = value;

    if (type === "checkbox") {
      fieldValue = checked;
    } else if (type === "file" && files) {
      if (name === "featured_image") {
        fieldValue = files[0];
      } else if (name === "gallery_images") {
        fieldValue = Array.from(files);
      }
    }

    setFormData({ ...formData, [name]: fieldValue });
    validateField(name, fieldValue);
  };

  // ✅ auto-fill latitude/longitude
  const handleLocationBlur = async () => {
    if (formData.location) {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${formData.location}`
        );
        const data = await res.json();
        if (data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            latitude: data[0].lat,
            longitude: data[0].lon,
          }));
        }
      } catch (err) {
        console.error("Location fetch failed", err);
      }
    }
  };

  // ✅ step validation
  const handleNext = () => {
    const step1Fields = [
      "pet_name",
      "pet_type",
      "breed",
      "gender",
      "dob",
      "description",
      "about_pet",
    ];
    step1Fields.forEach((field) =>
      validateField(field, (formData as any)[field])
    );

    if (step1Fields.every((f) => !errors[f] && (formData as any)[f])) {
      setStep(2);
    }
  };

  // ✅ submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append("user_id", userId);
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "featured_image" && value) {
          form.append("featured_image", value as File);
        } else if (key === "gallery_images" && value.length > 0) {
          (value as File[]).forEach((file, i) =>
            form.append(`gallery_images[${i}]`, file)
          );
        } else {
          form.append(key, value as any);
        }
      });

      const res = await fetch(
        "https://argosmob.com/being-petz/public/api/v1/pet/create-adoption",
        {
          method: "POST",
          body: form,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Pet listed successfully! 🎉");
        onClose();
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Give Pet for Adoption</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {step === 1 && (
            <>
              <input
                type="text"
                name="pet_name"
                placeholder="Pet Name"
                value={formData.pet_name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.pet_name && (
                <p className="text-red-500 text-sm">{errors.pet_name}</p>
              )}

              <input
                type="text"
                name="pet_type"
                placeholder="Pet Type"
                value={formData.pet_type}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.pet_type && (
                <p className="text-red-500 text-sm">{errors.pet_type}</p>
              )}

              <input
                type="text"
                name="breed"
                placeholder="Breed"
                value={formData.breed}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.breed && (
                <p className="text-red-500 text-sm">{errors.breed}</p>
              )}

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob}</p>
              )}

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}

              <textarea
                name="about_pet"
                placeholder="About Pet"
                value={formData.about_pet}
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
              />
              {errors.about_pet && (
                <p className="text-red-500 text-sm">{errors.about_pet}</p>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="col-span-2 bg-blue-600 text-white py-2 rounded"
              >
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                onBlur={handleLocationBlur}
                className="border p-2 rounded col-span-2"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}

              <input
                type="text"
                name="contact_phone"
                placeholder="Phone"
                value={formData.contact_phone}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.contact_phone && (
                <p className="text-red-500 text-sm">{errors.contact_phone}</p>
              )}

              <input
                type="email"
                name="contact_email"
                placeholder="Email"
                value={formData.contact_email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.contact_email && (
                <p className="text-red-500 text-sm">{errors.contact_email}</p>
              )}

              {/* Featured Image */}
              <input
                type="file"
                name="featured_image"
                accept="image/*"
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
              />
              {formData.featured_image && (
                <img
                  src={URL.createObjectURL(formData.featured_image)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded mt-2"
                />
              )}

              {/* Gallery Images */}
              <input
                type="file"
                name="gallery_images"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
              />
              {formData.gallery_images.length > 0 && (
                <div className="flex gap-2 flex-wrap col-span-2">
                  {formData.gallery_images.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={`Gallery ${i}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              {/* Checkboxes */}
              <div className="col-span-2 grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 border p-2 rounded">
                  <input
                    type="checkbox"
                    name="is_healthy"
                    checked={formData.is_healthy}
                    onChange={handleChange}
                  />
                  Is Healthy
                </label>
                <label className="flex items-center gap-2 border p-2 rounded">
                  <input
                    type="checkbox"
                    name="vaccination_done"
                    checked={formData.vaccination_done}
                    onChange={handleChange}
                  />
                  Vaccination Done
                </label>
                <label className="flex items-center gap-2 border p-2 rounded">
                  <input
                    type="checkbox"
                    name="is_neutered"
                    checked={formData.is_neutered}
                    onChange={handleChange}
                  />
                  Is Neutered
                </label>
                <label className="flex items-center gap-2 border p-2 rounded">
                  <input
                    type="checkbox"
                    name="is_dewormed"
                    checked={formData.is_dewormed}
                    onChange={handleChange}
                  />
                  Is Dewormed
                </label>
              </div>

              {/* Google Maps Preview */}
              {formData.latitude && formData.longitude && (
                <div className="col-span-2 mt-4">
                  <iframe
                    title="map"
                    width="70%"
                    height="150"
                    className="rounded"
                    src={`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}&hl=es;z=14&output=embed`}
                  ></iframe>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PetForm;
