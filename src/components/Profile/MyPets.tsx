// import { useState, useEffect } from "react";
// import { Heart } from "lucide-react";
// import cat1 from "../../assets/img/cat.jpg";
// import cat2 from "../../assets/img/2.png";
// import cat3 from "../../assets/img/3.png";  
//  const MyPets = () => {
//   const [open, setOpen] = useState(false);
//   const [userId, setUserId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [pets, setPets] = useState<any[]>([]);
//   const dummyImages = [cat1, cat2, cat3];

//   const [newPet, setNewPet] = useState({
//     name: "",
//     type: "",
//     breed: "",
//     dob: "",                                  
//     gender: "",
//     description: "",
//     imgFile: null as File | null,
//     img: null as string | null,
//   });

//   // get the user is which is login in localstorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUserId(parsedUser.id);
//     }
//   }, []);

//   //   fetch pets by user_id
//   useEffect(() => {
//     const fetchPets = async () => {
//       if (!userId) return;
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://argosmob.uk/being-petz/public/api/v1/pet/get/my",
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ user_id: userId }),
//           }
//         );
//         const data = await response.json();
//         console.log("Pets fetched:", data);

//         if (data.status && Array.isArray(data.data)) {
//           setPets(data.data);
//         } else {
//           setPets([]);
//         }
//       } catch (error) {
//         console.error("Error fetching pets:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPets();
//   }, [userId]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setNewPet((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setNewPet((prev) => ({
//         ...prev,
//         imgFile: file,
//         img: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleAddPet = async () => {
//     if (!newPet.name || !newPet.type) {
//       alert("Please enter at least Name and Type.");
//       return;
//     }

//     if (!userId) {
//       alert("User not found. Please login again.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("user_id", String(userId));
//       formData.append("name", newPet.name);
//       formData.append("type", newPet.type);
//       formData.append("breed", newPet.breed);
//       formData.append("dob", newPet.dob);
//       if (newPet.gender) {
//         formData.append("gender", newPet.gender.toLowerCase());
//       }
//       formData.append("bio", newPet.description);
//       if (newPet.imgFile) {
//         formData.append("avatar", newPet.imgFile);
//       }

//       const response = await fetch(
//         "https://argosmob.uk/being-petz/public/api/v1/pet/add",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       console.log("Pet added response:", data);

//       if (!data.status) {
//         alert(data.message || "Something went wrong");
//         return;
//       }

//       // refresh pet list
//       setPets((prev) => [
//         ...prev,
//         {
//           name: newPet.name,
//           type: newPet.type,
//           dob: newPet.dob,
//           avatar: newPet.img,
//         },
//       ]);

//       // reset
//       setNewPet({
//         name: "",
//         type: "",
//         breed: "",
//         dob: "",
//         gender: "",
//         description: "",
//         imgFile: null,
//         img: null,
//       });
//       setOpen(false);
//       alert("Pet added successfully ✅");
//     } catch (err) {
//       console.error("Add Pet Error:", err);
//       alert("Failed to add pet. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow p-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold text-purple-700 flex items-center gap-2">
//           <Heart /> My Pets
//         </h2>
//         <button
//           onClick={() => setOpen(true)}
//           className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm"
//         >
//           + Add Pet
//         </button>
//       </div>

//       {/* Pets list */}
//       {loading ? (
//         <p className="text-gray-500 mt-4">Loading pets...</p>
//       ) : pets.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
//           {/* {pets.map((pet: any, i) => (
//             <div
//               key={i}
//               className="bg-gray-50 rounded-xl shadow overflow-hidden"
//             >
//               <img
//                 src={pet.avatar || cat}
//                 alt={pet.name}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-3">
//                 <h3 className="font-semibold text-purple-700">{pet.name}</h3>
//                 <p className="text-sm">{pet.type}</p>
//                 <p className="text-xs text-gray-500">{pet.dob || "Age N/A"}</p>
//               </div>
//             </div>
//           ))} */}
//           {pets.map((pet: any, i) => (
//   <div
//     key={i}
//     className="bg-gray-50 rounded-xl shadow overflow-hidden"
//   >
//     <img
//       src={pet.avatar || dummyImages[i % dummyImages.length]}
//       alt={pet.name}
//       className="w-full h-40 object-cover"
//     />
//     <div className="p-3">
//       <h3 className="font-semibold text-purple-700">{pet.name}</h3>
//       <p className="text-sm">{pet.type}</p>
//       <p className="text-xs text-gray-500">{pet.dob || "Age N/A"}</p>
//     </div>
//   </div>
// ))}

//           <div
//             onClick={() => setOpen(true)}
//             className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-center text-gray-500 text-sm hover:bg-gray-100"
//           >
//             + Add New Pet
//           </div>

//         </div>
//       ) : (
//         <p className="text-gray-500 mt-4">No pets found. Add your first pet!</p>
//       )}

//       {/* Add Pet Modal */}
//       {open && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-xl shadow-lg w-[400px] max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center bg-purple-600 text-white px-4 py-3 rounded-t-xl">
//               <h3 className="text-lg font-semibold">Add New Pet</h3>
//               <button onClick={() => setOpen(false)}>✕</button>
//             </div>
//             <div className="p-6 space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={newPet.name}
//                 onChange={handleChange}
//                 placeholder="Enter pet name"
//                 className="w-full border rounded-md px-3 py-2"
//               />
//               <select
//                 name="type"
//                 value={newPet.type}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2"
//               >
//                 <option value="">Select pet type</option>
//                 <option value="dog">Dog</option>
//                 <option value="cat">Cat</option>
//               </select>
//               <input
//                 type="text"
//                 name="breed"
//                 value={newPet.breed}
//                 onChange={handleChange}
//                 placeholder="Enter breed"
//                 className="w-full border rounded-md px-3 py-2"
//               />
//               <input
//                 type="date"
//                 name="dob"
//                 value={newPet.dob}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2"
//               />
//               <select
//                 name="gender"
//                 value={newPet.gender}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2"
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//               </select>
//               <textarea
//                 name="description"
//                 value={newPet.description}
//                 onChange={handleChange}
//                 placeholder="Tell us about your pet"
//                 className="w-full border rounded-md px-3 py-2"
//               />
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="w-full border rounded-md px-3 py-2"
//               />

//               <div className="flex justify-end gap-2 mt-4">
//                 <button
//                   onClick={() => setOpen(false)}
//                   className="bg-gray-300 text-black px-4 py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddPet}
//                   disabled={loading}
//                   className="bg-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
//                 >
//                   {loading ? "Adding..." : "Add Pet"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyPets;


import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import cat1 from "../../assets/img/cat.jpg";
import cat2 from "../../assets/img/2.png";
import cat3 from "../../assets/img/3.png";
import AddPetForm from "./AddPetForm"; // 👈 import

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
        const response = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/get/my", {
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
                src={pet.avatar || dummyImages[i % dummyImages.length]}
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

      {/* Reusable AddPetForm Component */}
      <AddPetForm open={open} setOpen={setOpen} userId={userId} onPetAdded={(pet) => setPets((prev) => [...prev, pet])} />
    </div>
  );
};

export default MyPets;

