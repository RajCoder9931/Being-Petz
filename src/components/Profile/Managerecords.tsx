import { useState, ChangeEvent } from "react";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar"; // Sidebar import
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

interface WeightEntry {
  date: string;
  weight: number;
}

const CareForm = () => {
  const [activeTab, setActiveTab] = useState<string>("Vaccines");
  const [mealsReminderTime, setMealsReminderTime] = useState<string>("22:00");
  const [mealsReminderDate, setMealsReminderDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [vaccine, setVaccine] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const [meals] = useState({
    morning: "Done",
    evening: "Done",
    night: "______",
  });

  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([
    { date: "01 Jan 2025", weight: 23 },
    { date: "03 Feb 2025", weight: 30 },
  ]);

  const [newWeight, setNewWeight] = useState<string>("");

  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleAddWeight = () => {
    if (!newWeight) return;
    const today = new Date();
    const date = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setWeightHistory((prev) => [
      ...prev,
      { date, weight: parseInt(newWeight) },
    ]);
    setNewWeight("");
  };

  const handleAddDetails = () => {
    console.log("Active Tab:", activeTab);
    console.log("Vaccine:", vaccine);
    console.log("Meals:", meals);
    console.log("Uploaded file:", uploadFile);
    console.log("Weight History:", weightHistory);
  };

  const tabs = [
    "Vaccines",
    "Deworming",
    "Grooming",
    "Meals",
    "Weight",
    "General",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-grow p-6 bg-gray-50">
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

          {/* --- Tab Content (same as before) --- */}
          <div className="flex flex-wrap gap-6">
            {/* Left Box */}
            {activeTab !== "Weight" && (
              <div className="border border-purple-600 p-4 rounded w-80">
                {activeTab === "Vaccines" && (
                  <>
                    <p className="font-semibold mb-2">Records Details</p>
                    <p className="mb-2">
                      <span className="font-semibold">Date:</span> 03 April 2025
                    </p>
                    <label className="block font-semibold mb-1">
                      Vaccine Name:
                    </label>
                    <select
                      value={vaccine}
                      onChange={(e) => setVaccine(e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="">Select Vaccine</option>
                      <option value="DA2PP Leptospirosis">
                        DA2PP Leptospirosis
                      </option>
                      <option value="Rabies">Rabies</option>
                      <option value="Distemper">Distemper</option>
                    </select>
                  </>
                )}

                {activeTab === "Deworming" && (
                  <>
                    <p className="font-semibold mb-2">Deworming Details</p>
                    <p className="mb-2">
                      <span className="font-semibold">Date:</span> 05 March 2025
                    </p>
                    <label className="block font-semibold mb-1">Medicine:</label>
                    <input
                      type="text"
                      placeholder="Enter Deworming Medicine"
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                  </>
                )}

                {activeTab === "Grooming" && (
                  <>
                    <p className="font-semibold mb-2">Grooming Details</p>
                    <p className="mb-2">
                      <span className="font-semibold">Date:</span> 12 March 2025
                    </p>
                    <label className="block font-semibold mb-1">Service:</label>
                    <select className="w-full border border-gray-300 rounded px-2 py-1">
                      <option value="">Select Service</option>
                      <option value="Bath">Bath</option>
                      <option value="Nail Trim">Nail Trim</option>
                      <option value="Haircut">Haircut</option>
                    </select>
                  </>
                )}

                {activeTab === "Meals" && (
                  <>
                    <p className="font-semibold mb-2">Meals Details</p>
                    <p className="mb-1">
                      <span className="font-semibold">Morning:</span>{" "}
                      {meals.morning}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Evening:</span>{" "}
                      {meals.evening}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Night:</span>{" "}
                      {meals.night}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Right Box - Upload + Reminder */}
            {activeTab !== "Meals" && activeTab !== "Weight" && (
              <div className="flex flex-col gap-4 w-80">
                {/* Upload */}
                <div className="flex flex-col gap-2">
                  <p className="font-semibold">
                    Upload Document{" "}
                    <span className="font-normal text-gray-500">(Optional)</span>
                  </p>
                  <label
                    htmlFor="uploadFile"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded cursor-pointer"
                  >
                    ⬆ Upload
                  </label>
                  <input
                    type="file"
                    id="uploadFile"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Meals Right Box */}
            {activeTab === "Meals" && (
              <div className="bg-purple-600 text-white p-6 rounded-2xl w-80 flex flex-col justify-between">
                <div>
                  <p className="font-semibold mb-3">Next Reminder</p>
                  <input
                    type="time"
                    value={mealsReminderTime}
                    onChange={(e) => setMealsReminderTime(e.target.value)}
                    className="text-lg font-bold mb-2 px-2 py-1 rounded text-purple-600"
                  />
                  <input
                    type="date"
                    value={mealsReminderDate}
                    onChange={(e) => setMealsReminderDate(e.target.value)}
                    className="text-sm px-2 py-1 rounded text-purple-600"
                  />
                </div>
                <button
                  onClick={() =>
                    alert(
                      `Meal reminder set for ${mealsReminderTime} on ${mealsReminderDate}`
                    )
                  }
                  className="mt-6 px-6 py-2 bg-gray-100 text-purple-600 font-semibold rounded-full self-center"
                >
                  Give Food
                </button>
              </div>
            )}

            {/* Weight Tab */}
            {activeTab === "Weight" && (
              <div className="flex flex-wrap gap-6 w-full">
                {/* Chart */}
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
                  {/* Add Weight */}
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

                {/* History */}
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
