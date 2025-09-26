// import { useState, ChangeEvent , useEffect } from "react";
// import Header from "../dashboard/Header";
// import axios from "axios";
// import Sidebar from "../dashboard/sidebar"; // Sidebar import
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface WeightEntry {
//   date: string;
//   weight: number;
// }
// const dummyImages = [
//   "https://via.placeholder.com/150",
//   "https://via.placeholder.com/160",
//   "https://via.placeholder.com/170",
// ];
// const CareForm = () => {
//   const [activeTab, setActiveTab] = useState<string>("Vaccines");
//   const [mealsReminderTime, setMealsReminderTime] = useState<string>("22:00");
//   const [pets, setPets] = useState<Pet[]>([]);
//   const [loading, setLoading] = useState(false);


//   const [mealsReminderDate, setMealsReminderDate] = useState<string>(
//     new Date().toISOString().split("T")[0]
//   );

//   const [vaccine, setVaccine] = useState<string>("");
//   const [uploadFile, setUploadFile] = useState<File | null>(null);

//   const [meals] = useState({
//     morning: "Done",
//     evening: "Done",
//     night: "______",
//   });

//   const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([
//     { date: "01 Jan 2025", weight: 23 },
//     { date: "03 Feb 2025", weight: 30 },
//   ]);

//   const [newWeight, setNewWeight] = useState<string>("");

//   const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar toggle state

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setUploadFile(e.target.files[0]);
//     }
//   };
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       const userId = parsedUser.id;
//       fetchPets(userId);
//     }
//   }, []);
//   const handleAddWeight = () => {
//     if (!newWeight) return;
//     const today = new Date();
//     const date = today.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//     setWeightHistory((prev) => [
//       ...prev,
//       { date, weight: parseInt(newWeight) },
//     ]);
//     setNewWeight("");
//   };
  
//   const fetchPets = async (userId: string | number) => {
//     if (!userId) return;

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://argosmob.com/being-petz/public/api/v1/pet/get/my",
//         { user_id: userId }
//       );
//       setPets(response.data.data || []);
//     } catch (error) {
//       console.error("Error fetching pets:", error);
//       alert("Failed to fetch pets");
//     }
//     setLoading(false);
//   };
//   const handleAddDetails = () => {
//     console.log("Active Tab:", activeTab);
//     console.log("Vaccine:", vaccine);
//     console.log("Meals:", meals);
//     console.log("Uploaded file:", uploadFile);
//     console.log("Weight History:", weightHistory);
//   };

//   const tabs = [
//     "Vaccines",
//     "Deworming",
//     "Grooming",
//     "Meals",
//     "Weight",
//     "General",
//   ];

//   return (
//     <div className="min-h-screen flex flex-col pt-10">
//       {/* Header */}
//       <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//         {/* Main Content */}
//         <main className="flex-grow p-6 bg-gray-50">
//         <div className="mt-6">
//       <h2 className="text-lg font-semibold mb-4">My Pet Family</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="flex gap-4 overflow-x-auto pb-2">
//           {pets.map((pet, i) => (
//             <div
//               key={pet.id}
//               className="bg-white rounded-xl shadow-md p-4 w-48 flex-shrink-0 text-center"
//             >
//               <img
//                 src={
//                   pet.avatar
//                     ? pet.avatar.startsWith("http")
//                       ? pet.avatar
//                       : `https://argosmob.com/being-petz/public/${pet.avatar}`
//                     : dummyImages[i % dummyImages.length]
//                 }
//                 alt={pet.name}
//                 className="w-20 h-20 rounded-full mx-auto border-2 border-purple-500 object-cover"
//               />
//               <h3 className="mt-3 font-bold">{pet.name}</h3>
//               <p className="text-sm text-gray-500">{pet.breed}</p>
//               <p className="text-xs text-gray-400">
//                 {pet.age} Years {pet.gender === "Male" ? "♂ Male" : "♀ Female"}
//               </p>
              
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//         <br />
//           {/* Tabs */}
//           <div className="flex gap-2 mb-6 flex-wrap">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-full border ${
//                   tab === activeTab
//                     ? "bg-purple-600 text-white border-purple-600"
//                     : "border-purple-600 text-purple-600"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* --- Tab Content (same as before) --- */}
//           <div className="flex flex-wrap gap-6">
//             {/* Left Box */}
//             {activeTab !== "Weight" && (
//               <div className="border border-purple-600 p-4 rounded w-80">
//                 {activeTab === "Vaccines" && (
//                   <>
//                     <p className="font-semibold mb-2">Records Details</p>
//                     <p className="mb-2">
//                       <span className="font-semibold">Date:</span> 03 April 2025
//                     </p>
//                     <label className="block font-semibold mb-1">
//                       Vaccine Name:
//                     </label>
//                     <select
//                       value={vaccine}
//                       onChange={(e) => setVaccine(e.target.value)}
//                       className="w-full border border-gray-300 rounded px-2 py-1"
//                     >
//                       <option value="">Select Vaccine</option>
//                       <option value="DA2PP Leptospirosis">
//                         DA2PP Leptospirosis
//                       </option>
//                       <option value="Rabies">Rabies</option>
//                       <option value="Distemper">Distemper</option>
//                     </select>
//                   </>
//                 )}

//                 {activeTab === "Deworming" && (
//                   <>
//                     <p className="font-semibold mb-2">Deworming Details</p>
//                     <p className="mb-2">
//                       <span className="font-semibold">Date:</span> 05 March 2025
//                     </p>
//                     <label className="block font-semibold mb-1">Medicine:</label>
//                     <input
//                       type="text"
//                       placeholder="Enter Deworming Medicine"
//                       className="w-full border border-gray-300 rounded px-2 py-1"
//                     />
//                   </>
//                 )}

//                 {activeTab === "Grooming" && (
//                   <>
//                     <p className="font-semibold mb-2">Grooming Details</p>
//                     <p className="mb-2">
//                       <span className="font-semibold">Date:</span> 12 March 2025
//                     </p>
//                     <label className="block font-semibold mb-1">Service:</label>
//                     <select className="w-full border border-gray-300 rounded px-2 py-1">
//                       <option value="">Select Service</option>
//                       <option value="Bath">Bath</option>
//                       <option value="Nail Trim">Nail Trim</option>
//                       <option value="Haircut">Haircut</option>
//                     </select>
//                   </>
//                 )}

//                 {activeTab === "Meals" && (
//                   <>
//                     <p className="font-semibold mb-2">Meals Details</p>
//                     <p className="mb-1">
//                       <span className="font-semibold">Morning:</span>{" "}
//                       {meals.morning}
//                     </p>
//                     <p className="mb-1">
//                       <span className="font-semibold">Evening:</span>{" "}
//                       {meals.evening}
//                     </p>
//                     <p className="mb-1">
//                       <span className="font-semibold">Night:</span>{" "}
//                       {meals.night}
//                     </p>
//                   </>
//                 )}
//               </div>
//             )}

//             {/* Right Box - Upload + Reminder */}
//             {activeTab !== "Meals" && activeTab !== "Weight" && (
//               <div className="flex flex-col gap-4 w-80">
//                 {/* Upload */}
//                 <div className="flex flex-col gap-2">
//                   <p className="font-semibold">
//                     Upload Document{" "}
//                     <span className="font-normal text-gray-500">(Optional)</span>
//                   </p>
//                   <label
//                     htmlFor="uploadFile"
//                     className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
//                   >
//                     ⬆ Upload
//                   </label>
//                   <input
//                     type="file"
//                     id="uploadFile"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Meals Right Box */}
//             {activeTab === "Meals" && (
//               <div className="bg-purple-600 text-white p-6 rounded-2xl w-80 flex flex-col justify-between">
//                 <div>
//                   <p className="font-semibold mb-3">Next Reminder</p>
//                   <input
//                     type="time"
//                     value={mealsReminderTime}
//                     onChange={(e) => setMealsReminderTime(e.target.value)}
//                     className="text-lg font-bold mb-2 px-2 py-1 rounded text-purple-600"
//                   />
//                   <input
//                     type="date"
//                     value={mealsReminderDate}
//                     onChange={(e) => setMealsReminderDate(e.target.value)}
//                     className="text-sm px-2 py-1 rounded text-purple-600"
//                   />
//                 </div>
//                 <button
//                   onClick={() =>
//                     alert(
//                       `Meal reminder set for ${mealsReminderTime} on ${mealsReminderDate}`
//                     )
//                   }
//                   className="mt-6 px-6 py-2 bg-gray-100 text-purple-600 font-semibold rounded-full self-center"
//                 >
//                   Give Food
//                 </button>
//               </div>
//             )}

//             {/* Weight Tab */}
//             {activeTab === "Weight" && (
//               <div className="flex flex-wrap gap-6 w-full">
//                 {/* Chart */}
//                 <div className="flex-1 border border-purple-600 rounded p-4">
//                   <Line
//                     data={{
//                       labels: weightHistory.map((entry) => entry.date),
//                       datasets: [
//                         {
//                           label: "Weight (kg)",
//                           data: weightHistory.map((entry) => entry.weight),
//                           borderColor: "#9333ea",
//                           backgroundColor: "#9333ea",
//                           tension: 0.3,
//                         },
//                       ],
//                     }}
//                     options={{
//                       responsive: true,
//                       plugins: { legend: { display: true, position: "top" } },
//                       scales: {
//                         y: { min: 0, max: 100, ticks: { stepSize: 10 } },
//                       },
//                     }}
//                   />
//                   {/* Add Weight */}
//                   <div className="mt-6 flex gap-3 justify-center">
//                     <input
//                       type="number"
//                       placeholder="Enter weight (kg)"
//                       value={newWeight}
//                       onChange={(e) => setNewWeight(e.target.value)}
//                       className="border px-3 py-2 rounded w-40"
//                     />
//                     <button
//                       onClick={handleAddWeight}
//                       className="px-6 py-2 border border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white"
//                     >
//                       + Add Weight
//                     </button>
//                   </div>
//                 </div>

//                 {/* History */}
//                 <div className="border border-purple-600 p-4 rounded w-80">
//                   <p className="font-semibold mb-4">Weight History</p>
//                   {weightHistory
//                     .slice()
//                     .reverse()
//                     .map((entry, index) => (
//                       <div key={index} className="mb-3 flex items-center gap-3">
//                         <span className="text-purple-600 text-xl">📅</span>
//                         <div>
//                           <p className="font-semibold">{entry.weight} kg</p>
//                           <p className="text-sm text-gray-600">{entry.date}</p>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleAddDetails}
//             className="mt-6 px-6 py-2 bg-purple-600 text-white rounded"
//           >
//             Add Details
//           </button>
//         </main>
//       </div>
//       <br /><br /><br />
//     </div>
//   );
// };

// export default CareForm;
 

// form 
import { useState, ChangeEvent, useEffect } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Pet {
  id: number;
  name: string;
  avatar?: string;
  age: number;
  gender: string;
  breed: string;
}

interface WeightEntry {
  date: string;
  weight: number;
}

const dummyImages = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/160",
  "https://via.placeholder.com/170",
];

const CareForm = () => {
  const [activeTab, setActiveTab] = useState<string>("Vaccines");
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Meals reminder
  const [mealsReminderTime, setMealsReminderTime] = useState<string>("22:00");
  const [mealsReminderDate, setMealsReminderDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  // Vaccine form
  const [vaccineName, setVaccineName] = useState<string>("");
  const [vaccineDate, setVaccineDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [vaccineType, setVaccineType] = useState<string>("pre shot");
  const [nextVaccine, setNextVaccine] = useState<string>("");
  const [vaccineReminderDate, setVaccineReminderDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [vaccineReminderTime, setVaccineReminderTime] = useState<string>("12:00");

  // Deworming form
  const [dewormingType, setDewormingType] = useState<string>("");
  const [dewormingDate, setDewormingDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dewormingReminderDate, setDewormingReminderDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dewormingReminderTime, setDewormingReminderTime] = useState<string>("12:00");

  // Grooming form
  const [groomingType, setGroomingType] = useState<string>("");
  const [groomingDate, setGroomingDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [groomingReminderDate, setGroomingReminderDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [groomingReminderTime, setGroomingReminderTime] = useState<string>("12:00");
  const [nextGrooming, setNextGrooming] = useState<string>("");
  const [groomingImage, setGroomingImage] = useState<File | null>(null);

  // Meals form
  const [mealTime, setMealTime] = useState<string>("morning");

  // Weight form
  const [weight, setWeight] = useState<string>("");
  const [weightDate, setWeightDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);

  const tabs = ["Vaccines", "Deworming", "Grooming", "Meals", "Weight"];

  // Fetch pets
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchPets(parsedUser.id);
    }
  }, []);

  const fetchPets = async (userId: string | number) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/pet/get/my",
        { user_id: userId }
      );
      setPets(response.data.data || []);
      if (response.data.data.length > 0) setSelectedPet(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching pets:", error);
      alert("Failed to fetch pets");
    }
    setLoading(false);
  };

  const handleGroomingFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGroomingImage(e.target.files[0]);
    }
  };

  // Save / Update functions
  const saveRecord = async (type: string) => {
    if (!selectedPet) return alert("Please select a pet");

    try {
      switch (type) {
        case "Vaccine":
          await axios.post(
            "https://argosmob.com/being-petz/public/api/v1/vaccine/save-records",
            {
              pet_id: selectedPet.id,
              date: vaccineDate,
              vaccine_name: vaccineName,
              type: vaccineType,
              reminder_date: vaccineReminderDate,
              reminder_time: vaccineReminderTime,
              next_vaccine: nextVaccine,
            }
          );
          alert("Vaccine saved successfully");
          break;
        case "Deworming":
          await axios.post(
            "https://argosmob.uk/being-petz/public/api/v1/deworming/save-records",
            {
              pet_id: selectedPet.id,
              date: dewormingDate,
              deworming_type: dewormingType,
              reminder_date: dewormingReminderDate,
              reminder_time: dewormingReminderTime,
            }
          );
          alert("Deworming saved successfully");
          break;
        case "Grooming":
          const groomingForm = new FormData();
          groomingForm.append("pet_id", selectedPet.id.toString());
          groomingForm.append("date", groomingDate);
          groomingForm.append("grooming_type", groomingType);
          groomingForm.append("reminder_date", groomingReminderDate);
          groomingForm.append("reminder_time", groomingReminderTime);
          groomingForm.append("next_grooming", nextGrooming);
          if (groomingImage) groomingForm.append("image", groomingImage);

          await axios.post(
            "https://argosmob.uk/being-petz/public/api/v1/grooming/save-records",
            groomingForm
          );
          alert("Grooming saved successfully");
          break;
        case "Meals":
          await axios.post(
            "https://argosmob.uk/being-petz/public/api/v1/meal/save-records",
            {
              pet_id: selectedPet.id,
              meal_time: mealTime,
              reminder_date: mealsReminderDate,
              reminder_time: mealsReminderTime,
            }
          );
          alert("Meal saved successfully");
          break;
        case "Weight":
          await axios.post(
            "https://argosmob.uk/being-petz/public/api/v1/weight/save-records",
            {
              pet_id: selectedPet.id,
              date: weightDate,
              weight: weight,
            }
          );
          alert("Weight saved successfully");
          setWeightHistory((prev) => [...prev, { date: weightDate, weight: parseFloat(weight) }]);
          setWeight("");
          break;
      }
    } catch (err) {
      console.error("Error saving record:", err);
      alert("Failed to save record");
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-10">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
       <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-grow p-6 bg-gray-50">
 
          {/* Pet selection */}
          <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Manage Records</h2>
            <h2 className="text-lg font-semibold mb-4">My Pet Family</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {pets.map((pet, i) => (
                  <div
                    key={pet.id}
                    className={`bg-white rounded-xl shadow-md p-4 w-48 flex-shrink-0 text-center cursor-pointer ${
                      selectedPet?.id === pet.id ? "border-2 border-purple-600" : ""
                    }`}
                    onClick={() => setSelectedPet(pet)}
                  >
                    <img
                      src={
                        pet.avatar
                          ? pet.avatar.startsWith("http")
                            ? pet.avatar
                            : `https://argosmob.com/being-petz/public/${pet.avatar}`
                          : dummyImages[i % dummyImages.length]
                      }
                      alt={pet.name}
                      className="w-20 h-20 rounded-full mx-auto border-2 border-purple-500 object-cover"
                    />
                    <h3 className="mt-3 font-bold">{pet.name}</h3>
                  </div>
                ))}
              </div>
            )}
          </div>
<br />
          {/* Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full border ${
                  tab === activeTab
                    ? "bg-purple-600 text-white border-purple-600"
                    : "border-purple-600 text-purple-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Forms */}
          <div className="flex flex-wrap gap-6">
            {activeTab === "Vaccines" && (
              <div className="border border-purple-600 p-4 rounded w-80 flex flex-col gap-2">
                <label>Date:</label>
                <input
                  type="date"
                  value={vaccineDate}
                  onChange={(e) => setVaccineDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Vaccine Name:</label>
                <input
                  type="text"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Type:</label>
                <input
                  type="text"
                  value={vaccineType}
                  onChange={(e) => setVaccineType(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Reminder Date:</label>
                <input
                  type="date"
                  value={vaccineReminderDate}
                  onChange={(e) => setVaccineReminderDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Reminder Time:</label>
                <input
                  type="time"
                  value={vaccineReminderTime}
                  onChange={(e) => setVaccineReminderTime(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Next Vaccine:</label>
                <input
                  type="text"
                  value={nextVaccine}
                  onChange={(e) => setNextVaccine(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => saveRecord("Vaccine")}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Save Vaccine
                </button>
              </div>
            )}

            {/* Deworming Form */}
            {activeTab === "Deworming" && (
              <div className="border border-purple-600 p-4 rounded w-80 flex flex-col gap-2">
                <label>Date:</label>
                <input
                  type="date"
                  value={dewormingDate}
                  onChange={(e) => setDewormingDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Deworming Type:</label>
                <input
                  type="text"
                  value={dewormingType}
                  onChange={(e) => setDewormingType(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Reminder Date:</label>
                <input
                  type="date"
                  value={dewormingReminderDate}
                  onChange={(e) => setDewormingReminderDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Reminder Time:</label>
                <input
                  type="time"
                  value={dewormingReminderTime}
                  onChange={(e) => setDewormingReminderTime(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => saveRecord("Deworming")}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Save Deworming
                </button>
              </div>
            )}

            {/* Grooming Form */}
            {activeTab === "Grooming" && (
              <div className="border border-purple-600 p-4 rounded w-80 flex flex-col gap-2">
                <label>Date:</label>
                <input
                  type="date"
                  value={groomingDate}
                  onChange={(e) => setGroomingDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Grooming Type:</label>
                <input
                  type="text"
                  value={groomingType}
                  onChange={(e) => setGroomingType(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Reminder Date:</label>
                <input
                  type="date"
                  value={groomingReminderDate}
                  onChange={(e) => setGroomingReminderDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Reminder Time:</label>
                <input
                  type="time"
                  value={groomingReminderTime}
                  onChange={(e) => setGroomingReminderTime(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Next Grooming:</label>
                <input
                  type="text"
                  value={nextGrooming}
                  onChange={(e) => setNextGrooming(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Upload Image:</label>
                <input type="file" onChange={handleGroomingFileChange} />
                <button
                  onClick={() => saveRecord("Grooming")}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Save Grooming
                </button>
              </div>
            )}

            {/* Meals Form */}
            {activeTab === "Meals" && (
              <div className="border border-purple-600 p-4 rounded w-80 flex flex-col gap-2">
                <label>Meal Time:</label>
                <select
                  value={mealTime}
                  onChange={(e) => setMealTime(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
                <label>Reminder Date:</label>
                <input
                  type="date"
                  value={mealsReminderDate}
                  onChange={(e) => setMealsReminderDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Reminder Time:</label>
                <input
                  type="time"
                  value={mealsReminderTime}
                  onChange={(e) => setMealsReminderTime(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => saveRecord("Meals")}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Save Meal
                </button>
              </div>
            )}

            {/* Weight Form */}
            {activeTab === "Weight" && (
              <div className="border border-purple-600 p-4 rounded w-80 flex flex-col gap-2">
                <label>Date:</label>
                <input
                  type="date"
                  value={weightDate}
                  onChange={(e) => setWeightDate(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <label>Weight (kg):</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => saveRecord("Weight")}
                  className="mt-2 px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Save Weight
                </button>

                <Line
                  data={{
                    labels: weightHistory.map((w) => w.date),
                    datasets: [
                      {
                        label: "Weight (kg)",
                        data: weightHistory.map((w) => w.weight),
                        borderColor: "#9333ea",
                        backgroundColor: "#9333ea",
                        tension: 0.3,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: true, position: "top" } },
                    scales: { y: { min: 0, max: 100, ticks: { stepSize: 10 } } },
                  }}
                  className="mt-4"
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CareForm;
