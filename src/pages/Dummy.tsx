import { useState, useEffect } from "react";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/sidebar";
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
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const [vaccineRecords, setVaccineRecords] = useState<any[]>([]);
  const [dewormingRecords, setDewormingRecords] = useState<any[]>([]);
  const [groomingRecords, setGroomingRecords] = useState<any[]>([]);
  const [mealRecords, setMealRecords] = useState<any[]>([]);
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);

  const [newWeight, setNewWeight] = useState<string>("");
  const [vaccine, ] = useState<string>("");
  const [uploadFile, ] = useState<File | null>(null);

  const meals = {
    morning: "Done",
    evening: "Done",
    night: "______",
  };

  const tabs = [
    "Vaccines",
    "Deworming",
    "Grooming",
    "Meals",
    "Weight",
    "General",
  ];

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

  // Fetch records whenever selectedPet or activeTab changes
  useEffect(() => {
    if (!selectedPet) return;

    const fetchRecords = async () => {
      try {
        let response;
        switch (activeTab) {
          case "Vaccines":
            response = await axios.post(
              "https://argosmob.com/being-petz/public/api/v1/vaccine/all-records",
              { pet_id: selectedPet.id }
            );
            setVaccineRecords(response.data.data || []);
            break;
          case "Deworming":
            response = await axios.post(
              "https://argosmob.com/being-petz/public/api/v1/deworming/all-records",
              { pet_id: selectedPet.id }
            );
            setDewormingRecords(response.data.data || []);
            break;
          case "Grooming":
            response = await axios.post(
              "https://argosmob.com/being-petz/public/api/v1/grooming/all-records",
              { pet_id: selectedPet.id }
            );
            setGroomingRecords(response.data.data || []);
            break;
          case "Meals":
            response = await axios.post(
              "https://argosmob.com/being-petz/public/api/v1/meal/all-records",
              { pet_id: selectedPet.id }
            );
            setMealRecords(response.data.data || []);
            break;
          case "Weight":
            response = await axios.post(
              "https://argosmob.com/being-petz/public/api/v1/weight/all-records",
              { pet_id: selectedPet.id }
            );
            setWeightHistory(
              response.data.data.map((r: any) => ({
                date: new Date(r.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
                weight: r.weight,
              })) || []
            );
            break;
        }
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };

    fetchRecords();
  }, [selectedPet, activeTab]);


  const handleAddWeight = () => {
    if (!newWeight) return;
    const today = new Date();
    const date = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setWeightHistory((prev) => [...prev, { date, weight: parseInt(newWeight) }]);
    setNewWeight("");
  };

  const handleAddDetails = () => {
    console.log("Active Tab:", activeTab);
    console.log("Selected Pet:", selectedPet);
    console.log("Vaccine:", vaccine);
    console.log("Meals:", meals);
    console.log("Uploaded file:", uploadFile);
    console.log("Weight History:", weightHistory);
  };

  return (
    <div className="min-h-screen flex flex-col pt-10">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-grow p-6 bg-gray-50">
          {/* Pets */}
          <div className="mt-6">
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
                    <p className="text-sm text-gray-500">{pet.breed}</p>
                    <p className="text-xs text-gray-400">
                      {pet.age} Years {pet.gender === "Male" ? "♂ Male" : "♀ Female"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

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

          {/* Tab Content */}
          <div className="flex flex-wrap gap-6">
            {/* Left Box */}
            {activeTab !== "Weight" && (
              <div className="border border-purple-600 p-4 rounded w-80">
                {activeTab === "Vaccines" && (
                  <>
                    <p className="font-semibold mb-2">Vaccine Records</p>
                    {vaccineRecords.length === 0 ? (
                      <p>No records found</p>
                    ) : (
                      vaccineRecords.map((v) => (
                        <div key={v.id} className="mb-2">
                          <p>
                            <span className="font-semibold">Vaccine:</span> {v.name}
                          </p>
                          <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {new Date(v.date).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      ))
                    )}
                  </>
                )}
                {activeTab === "Deworming" && (
                  <>
                    <p className="font-semibold mb-2">Deworming Records</p>
                    {dewormingRecords.length === 0 ? (
                      <p>No records found</p>
                    ) : (
                      dewormingRecords.map((v) => (
                        <div key={v.id} className="mb-2">
                          <p>
                            <span className="font-semibold">Medicine:</span> {v.medicine}
                          </p>
                          <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {new Date(v.date).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      ))
                    )}
                  </>
                )}
                {activeTab === "Grooming" && (
                  <>
                    <p className="font-semibold mb-2">Grooming Records</p>
                    {groomingRecords.length === 0 ? (
                      <p>No records found</p>
                    ) : (
                      groomingRecords.map((v) => (
                        <div key={v.id} className="mb-2">
                          <p>
                            <span className="font-semibold">Service:</span> {v.service}
                          </p>
                          <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {new Date(v.date).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      ))
                    )}
                  </>
                )}
                {activeTab === "Meals" && (
                  <>
                    <p className="font-semibold mb-2">Meal Records</p>
                    {mealRecords.length === 0 ? (
                      <p>No records found</p>
                    ) : (
                      mealRecords.map((v) => (
                        <div key={v.id} className="mb-2">
                          <p>
                            <span className="font-semibold">Type:</span> {v.type}
                          </p>
                          <p>
                            <span className="font-semibold">Date:</span>{" "}
                            {new Date(v.date).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            )}

            {/* Right Box */}
            {activeTab === "Weight" && (
              <div className="flex flex-wrap gap-6 w-full">
                <div className="flex-1 border border-purple-600 rounded p-4">
                  <Line
                    data={{
                      labels: weightHistory.map((entry) => entry.date),
                      datasets: [
                        {
                          label: "Weight (kg)",
                          data: weightHistory.map((entry) => entry.weight),
                          borderColor: "#9333ea",
                          backgroundColor: "#9333ea",
                          tension: 0.3,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: true, position: "top" } },
                      scales: {
                        y: { min: 0, max: 100, ticks: { stepSize: 10 } },
                      },
                    }}
                  />
                  <div className="mt-6 flex gap-3 justify-center">
                    <input
                      type="number"
                      placeholder="Enter weight (kg)"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      className="border px-3 py-2 rounded w-40"
                    />
                    <button
                      onClick={handleAddWeight}
                      className="px-6 py-2 border border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white"
                    >
                      + Add Weight
                    </button>
                  </div>
                </div>
                <div className="border border-purple-600 p-4 rounded w-80">
                  <p className="font-semibold mb-4">Weight History</p>
                  {weightHistory
                    .slice()
                    .reverse()
                    .map((entry, index) => (
                      <div key={index} className="mb-3 flex items-center gap-3">
                        <span className="text-purple-600 text-xl">📅</span>
                        <div>
                          <p className="font-semibold">{entry.weight} kg</p>
                          <p className="text-sm text-gray-600">{entry.date}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleAddDetails}
            className="mt-6 px-6 py-2 bg-purple-600 text-white rounded"
          >
            Add Details
          </button>
        </main>
      </div>
    </div>
  );
};

export default CareForm;
