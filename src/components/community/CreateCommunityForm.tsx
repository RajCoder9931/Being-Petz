// import React, { useState } from "react";
// import { X } from "lucide-react";

// interface Props {
//   onClose: () => void;
// }

// export default function CreateCommunityForm({ onClose }: Props) {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => setSelectedImage(reader.result as string);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white rounded-xl w-96 p-6 relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//         >
//           <X />
//         </button>

//         {/* Image Upload */}
//         <div className="flex flex-col items-center">
//           <label className="cursor-pointer">
//             {selectedImage ? (
//               <img
//                 src={selectedImage}
//                 alt="Community"
//                 className="w-24 h-24 object-cover rounded-full border"
//               />
//             ) : (
//               <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
//                 📷
//               </div>
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageUpload}
//             />
//           </label>
//           <p className="text-gray-500 mt-2">Upload Your Image</p>
//         </div>

//         {/* Form Inputs */}
//         <div className="mt-4 space-y-3">
//           <input
//             type="text"
//             placeholder="Community Name"
//             className="w-full border p-2 rounded"
//           />
//           <select className="w-full border p-2 rounded">
//             <option>Select a type</option>
//             <option>Pet Lovers</option>
//             <option>Dog Owners</option>
//             <option>Cat Lovers</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Location"
//             className="w-full border p-2 rounded"
//           />
//           <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
//             Create Community
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { X } from "lucide-react";
import { Community } from "./CommunityApp";

interface Props {
  onClose: () => void;
  onCreateCommunity: (c: Community) => void;
}

export default function CreateCommunityForm({ onClose, onCreateCommunity }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name) return alert("Please enter a community name");

    const newCommunity: Community = {
      id: Date.now(),
      name,
      message: "New community created",
      time: "Just now",
      unread: 0,
      image: selectedImage || undefined,
      location,
      category,
    };

    onCreateCommunity(newCommunity);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-96 p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Community"
                className="w-24 h-24 object-cover rounded-full border"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                📷
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <p className="text-gray-500 mt-2">Upload Your Image</p>
        </div>

        {/* Form Inputs */}
        <div className="mt-4 space-y-3">
          <input
            type="text"
            placeholder="Community Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a type</option>
            <option>Pet Lovers</option>
            <option>Dog Owners</option>
            <option>Cat Lovers</option>
          </select>

          <input
            type="text"
            placeholder="Location"
            className="w-full border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Create Community
          </button>
        </div>
      </div>
    </div>
  );
}
