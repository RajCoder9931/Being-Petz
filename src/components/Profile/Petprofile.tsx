import React, { useState, useEffect } from "react";
import axios from "axios";
import femaleIcon from "../../assets/img/female.png";
import maleIcon from "../../assets/img/male.png";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";

const Petprofile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"records" | "reminder" | "profile">("records");
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // नया state filter के लिए
  const [activeFilter, setActiveFilter] = useState<"all" | "vaccination" | "grooming" | "deworming" | "meal" | "weight">("all");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Example Data
  const friends = [
    { id: 1, name: "Bella", date: "Oct 20", image: "https://placedog.net/300/300?id=10" },
    { id: 2, name: "Max", date: "Oct 22", image: "https://placedog.net/300/300?id=20" },
    { id: 3, name: "Luna", date: "Oct 25", image: "https://placedog.net/300/300?id=30" },
  ];

  const [selectedFriend, setSelectedFriend] = useState(friends[0]);
  const [showList, setShowList] = useState(false);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Luna",
    dob: "2020-05-15",
    breed: "German Shepherd",
    gender: "Male",
    type: "DEA 1",
  });

  useEffect(() => {
    if (user?.id || user?.user_id) {
      const userId = user.id || user.user_id;
      axios
        .post("https://argosmob.com/being-petz/public/api/v1/pet/get/my", {
          user_id: userId,
        })
        .then((res) => {
          if (res.data && res.data.data) {
            setPets(res.data.data);
            setSelectedPet(res.data.data[0]);  
          }
        })
        .catch((err) => {
          console.error("Error fetching pets:", err);
        });
    }
  }, [user]);

  // vaccination details
  const [vaccineRecords, setVaccineRecords] = useState<any[]>([]);
  const [dewormingRecords, setDewormingRecords] = useState<any[]>([]);
  const [groomingRecords, setGroomingRecords] = useState<any[]>([]);
  const [mealRecords, setMealRecords] = useState<any[]>([]);
  const [weightRecords, setWeightRecords] = useState<any[]>([]);

  // Fetch vaccine records when selectedPet changes
  useEffect(() => {
    if (selectedPet?.id) {
      // Vaccines
      axios
        .post("https://argosmob.com/being-petz/public/api/v1/vaccine/all-records", {
          pet_id: selectedPet.id,
        })
        .then((res) => setVaccineRecords(res.data?.data || []))
        .catch(() => setVaccineRecords([]));

      // Deworming
      axios
        .post("https://argosmob.com/being-petz/public/api/v1/deworming/all-records", {
          pet_id: selectedPet.id,
        })
        .then((res) => setDewormingRecords(res.data?.data || []))
        .catch(() => setDewormingRecords([]));

      // Grooming
      axios
        .post("https://argosmob.com/being-petz/public/api/v1/grooming/all-records", {
          pet_id: selectedPet.id,
        })
        .then((res) => setGroomingRecords(res.data?.data || []))
        .catch(() => setGroomingRecords([]));

      // Meal
      axios
        .post("https://argosmob.com/being-petz/public/api/v1/meal/all-records", {
          pet_id: selectedPet.id,
        })
        .then((res) => setMealRecords(res.data?.data || []))
        .catch(() => setMealRecords([]));

      // Weight
      axios
        .post("https://argosmob.com/being-petz/public/api/v1/weight/all-records", {
          pet_id: selectedPet.id,
        })
        .then((res) => setWeightRecords(res.data?.data || []))
        .catch(() => setWeightRecords([]));
    }
  }, [selectedPet]);

  const useCountdown = (targetDate: string, targetTime: string) => {
    const [timeLeft, setTimeLeft] = React.useState("");

    React.useEffect(() => {
      if (!targetDate) return;

      const interval = setInterval(() => {
        const target = new Date(`${targetDate}T${targetTime || "00:00:00"}`);
        const now = new Date().getTime();
        const distance = target.getTime() - now;

        if (distance <= 0) {
          setTimeLeft("Expired");
          clearInterval(interval);
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    }, [targetDate, targetTime]);

    return timeLeft;
  };

  // reminder
  const [vaccination, setVaccination] = useState<any>(null);
  const [deworming, setDeworming] = useState<any>(null);
  const [grooming, setGrooming] = useState<any>(null);

  useEffect(() => {
    if (!selectedPet?.id) return;

    const fetchReminders = async () => {
      try {
        // Vaccination
        const vacRes = await axios.post(
          "https://argosmob.com/being-petz/public/api/v1/vaccine/all-records",
          { pet_id: selectedPet.id }
        );
        if (vacRes.data?.data?.length) {
          const upcoming = vacRes.data.data
            .filter((item: any) => new Date(`${item.reminder_date}T${item.reminder_time || "00:00:00"}`) > new Date())
            .sort((a: any, b: any) =>
              new Date(`${a.reminder_date}T${a.reminder_time || "00:00:00"}`).getTime() -
              new Date(`${b.reminder_date}T${b.reminder_time || "00:00:00"}`).getTime()
            )[0];
          setVaccination(upcoming || null);
        } else {
          setVaccination(null);
        }

        // Deworming
        const dewRes = await axios.post(
          "https://argosmob.com/being-petz/public/api/v1/deworming/all-records",
          { pet_id: selectedPet.id }
        );
        if (dewRes.data?.data?.length) {
          const upcoming = dewRes.data.data
            .filter((item: any) => new Date(`${item.reminder_date}T${item.reminder_time || "00:00:00"}`) > new Date())
            .sort((a: any, b: any) =>
              new Date(`${a.reminder_date}T${a.reminder_time || "00:00:00"}`).getTime() -
              new Date(`${b.reminder_date}T${b.reminder_time || "00:00:00"}`).getTime()
            )[0];
          setDeworming(upcoming || null);
        } else {
          setDeworming(null);
        }

        // Grooming
        const groomRes = await axios.post(
          "https://argosmob.com/being-petz/public/api/v1/grooming/all-records",
          { pet_id: selectedPet.id }
        );
        if (groomRes.data?.data?.length) {
          const upcoming = groomRes.data.data
            .filter((item: any) => new Date(`${item.reminder_date}T${item.reminder_time || "00:00:00"}`) > new Date())
            .sort((a: any, b: any) =>
              new Date(`${a.reminder_date}T${a.reminder_time || "00:00:00"}`).getTime() -
              new Date(`${b.reminder_date}T${b.reminder_time || "00:00:00"}`).getTime()
            )[0];
          setGrooming(upcoming || null);
        } else {
          setGrooming(null);
        }
      } catch (err) {
        console.error("Error fetching reminders:", err);
        setVaccination(null);
        setDeworming(null);
        setGrooming(null);
      }
    };

    fetchReminders();
  }, [selectedPet]);

  const calculateAge = (dob: string) => {
    if (!dob) return "Age N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    if (years <= 0 && months <= 0) return "Just Born 🐾";
    if (years <= 0) return `${months} Month${months > 1 ? "s" : ""} Old`;
    if (months <= 0) return `${years} Year${years > 1 ? "s" : ""} Old`;
    return `${years} Year${years > 1 ? "s" : ""} ${months} Month${months > 1 ? "s" : ""} Old`;
  };

  // pet details edit 
  // Sync formData when selectedPet changes
  useEffect(() => {
    if (selectedPet) {
      setFormData({
        name: selectedPet.name || "",
        dob: selectedPet.dob || "",
        breed: selectedPet.breed || "",
        gender: selectedPet.gender || "",
        type: selectedPet.type || "",
      });
    }
  }, [selectedPet]);

  // Save handler
  const handleSave = async () => {
    if (!selectedPet?.id || !user) return;

    try {
      const payload = {
        user_id: user.id || user.user_id,
        pet_id: selectedPet.id,
        id: selectedPet.id,
        name: formData.name,
        dob: formData.dob,
        breed: formData.breed,
        gender: formData.gender,
        type: formData.type,
      };

      console.log("Payload sending:", payload);

      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/pet/update",
        payload
      );

      console.log("Update Response:", res.data);

      if (res.data?.success || res.data?.status) {
        const updatedPet = { ...selectedPet, ...formData };
        setSelectedPet(updatedPet);
        setPets((prev) =>
          prev.map((pet) => (pet.id === selectedPet.id ? updatedPet : pet))
        );
        setIsEditing(false);
      } else {
        alert(res.data?.message || "Failed to update pet details.");
      }
    } catch (error) {
      console.error("Error updating pet:", error);
      alert("Something went wrong while updating pet.");
    }
  };

  // Filter function
  const filterRecords = () => {
    if (activeFilter === "all") {
      return {
        showVaccination: true,
        showDeworming: true,
        showGrooming: true,
        showMeal: true,
        showWeight: true
      };
    }
    
    return {
      showVaccination: activeFilter === "vaccination",
      showDeworming: activeFilter === "deworming",
      showGrooming: activeFilter === "grooming",
      showMeal: activeFilter === "meal",
      showWeight: activeFilter === "weight"
    };
  };

  const { showVaccination, showDeworming, showGrooming, showMeal, showWeight } = filterRecords();

  // 🔹 Top of component
  const vaccinationCountdown = useCountdown(
    vaccination?.reminder_date ?? null,
    vaccination?.reminder_time ?? null
  );

  const dewormingCountdown = useCountdown(
    deworming?.reminder_date ?? null,
    deworming?.reminder_time ?? null
  );

  const groomingCountdown = useCountdown(
    grooming?.reminder_date ?? null,
    grooming?.reminder_time ?? null
  );

  return (
    <div className="flex min-h-screen bg-gray-50 pt-12">
      {/*   Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/*  Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Page Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-8xl mx-auto items-start">

            {/* Combined Left Column */}
            <div className="space-y-4 pr-4 md:pr-6 lg:pr-8 w-full">

              {/* Reminder Section - Fixed Height */}
              <div className="bg-white text-gray-800 rounded-2xl shadow-md p-4 h-64 flex flex-col">
                <div className="flex items-center space-x-2 text-sm font-medium text-purple-600 bg-purple-100 rounded-lg px-3 py-2 shadow-sm shadow-purple-200">
                  <span className="text-lg">🐾</span>
                  <p className="truncate">
                    Upcoming:{" "}
                    <span className="text-gray-800">
                      {groomingRecords.length > 0
                        ? (() => {
                          // Find the next upcoming grooming appointment
                          const now = new Date();
                          const upcomingGrooming = groomingRecords
                            .filter(record => {
                              const reminderDate = new Date(`${record.reminder_date}T${record.reminder_time || "00:00:00"}`);
                              return reminderDate > now;
                            })
                            .sort((a, b) => {
                              const dateA = new Date(`${a.reminder_date}T${a.reminder_time || "00:00:00"}`);
                              const dateB = new Date(`${b.reminder_date}T${b.reminder_time || "00:00:00"}`);
                              return dateA.getTime() - dateB.getTime();
                            })[0];

                          return upcomingGrooming
                            ? `${new Date(upcomingGrooming.reminder_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${upcomingGrooming.type} Reminder`
                            : "No upcoming grooming";
                        })()
                        : "No grooming reminders"
                      }
                    </span>
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-4 flex-1">
                  <div className="rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={selectedPet?.avatar
                        ? `https://argosmob.com/being-petz/public/${selectedPet.avatar}`
                        : "https://placedog.net/200/200?id=3"
                      }
                      alt={selectedPet?.name || "Pet"}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-purple-200"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      <span className="font-semibold text-gray-800">{selectedPet?.name || "Your pet"}</span> has an upcoming grooming session!
                    </p>

                    {groomingRecords.length > 0 && (() => {
                      const now = new Date();
                      const upcomingGrooming = groomingRecords
                        .filter(record => {
                          const reminderDate = new Date(`${record.reminder_date}T${record.reminder_time || "00:00:00"}`);
                          return reminderDate > now;
                        })
                        .sort((a, b) => {
                          const dateA = new Date(`${a.reminder_date}T${a.reminder_time || "00:00:00"}`);
                          const dateB = new Date(`${b.reminder_date}T${b.reminder_time || "00:00:00"}`);
                          return dateA.getTime() - dateB.getTime();
                        })[0];

                      return upcomingGrooming ? (
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <p className="text-xs font-medium text-blue-700 truncate">
                            Next: {upcomingGrooming.type} on {new Date(upcomingGrooming.reminder_date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-blue-600">
                            Time: {upcomingGrooming.reminder_time || "All day"}
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </div>

                <div className="mt-auto pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 truncate">
                    🐾 Don't forget to prepare everything needed for the grooming session!
                  </p>
                </div>
              </div>

              {/* Vaccination Reminder Section - Fixed Height */}
              <div className="bg-white text-gray-800 rounded-2xl shadow-md p-4 h-64 flex flex-col">
                <div className="flex items-center space-x-2 text-sm font-medium text-green-600 bg-green-100 rounded-lg px-3 py-2 shadow-sm shadow-green-200">
                  <span className="text-lg">💉</span>
                  <p className="truncate">
                    Vaccination:{" "}
                    <span className="text-gray-800">
                      {vaccineRecords.length > 0
                        ? (() => {
                          // Find the next upcoming vaccination appointment
                          const now = new Date();
                          const upcomingVaccine = vaccineRecords
                            .filter(record => {
                              const reminderDate = new Date(`${record.reminder_date}T${record.reminder_time || "00:00:00"}`);
                              return reminderDate > now;
                            })
                            .sort((a, b) => {
                              const dateA = new Date(`${a.reminder_date}T${a.reminder_time || "00:00:00"}`);
                              const dateB = new Date(`${b.reminder_date}T${b.reminder_time || "00:00:00"}`);
                              return dateA.getTime() - dateB.getTime();
                            })[0];

                          return upcomingVaccine
                            ? `${new Date(upcomingVaccine.reminder_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${upcomingVaccine.vaccine_name || 'Vaccine'} Reminder`
                            : "No upcoming vaccination";
                        })()
                        : "No vaccination reminders"
                      }
                    </span>
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-4 flex-1">
                  <div className="rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={selectedPet?.avatar
                        ? `https://argosmob.com/being-petz/public/${selectedPet.avatar}`
                        : "https://placedog.net/200/200?id=5"
                      }
                      alt={selectedPet?.name || "Pet"}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-green-200"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-600 mb-2 truncate">
                      <span className="font-semibold text-gray-800">{selectedPet?.name || "Your pet"}</span> has an upcoming vaccination!
                    </p>

                    {vaccineRecords.length > 0 && (() => {
                      const now = new Date();
                      const upcomingVaccine = vaccineRecords
                        .filter(record => {
                          const reminderDate = new Date(`${record.reminder_date}T${record.reminder_time || "00:00:00"}`);
                          return reminderDate > now;
                        })
                        .sort((a, b) => {
                          const dateA = new Date(`${a.reminder_date}T${a.reminder_time || "00:00:00"}`);
                          const dateB = new Date(`${b.reminder_date}T${b.reminder_time || "00:00:00"}`);
                          return dateA.getTime() - dateB.getTime();
                        })[0];

                      return upcomingVaccine ? (
                        <div className="bg-green-50 p-2 rounded-lg">
                          <p className="text-xs font-medium text-green-700 truncate">
                            Next: {upcomingVaccine.vaccine_name || 'Vaccination'} on {new Date(upcomingVaccine.reminder_date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-green-600 truncate">
                            Type: {upcomingVaccine.type || 'Not specified'}
                          </p>
                          <p className="text-xs text-green-600">
                            Time: {upcomingVaccine.reminder_time || "All day"}
                          </p>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </div>

                <div className="mt-auto pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 truncate">
                    💉 Keep your pet's vaccinations up to date for their health and safety!
                  </p>
                </div>
              </div>

              {/* Sponsored Card - Fixed Height */}
              <div className="relative bg-gradient-to-r from-orange-200 via-yellow-100 to-teal-100 rounded-2xl shadow-md overflow-hidden h-64 flex flex-col">
                <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full z-10">
                  Sponsored !
                </span>

                <div className="flex items-center p-5 flex-1">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src="https://png.pngtree.com/png-clipart/20231002/original/pngtree-cute-cartoon-cat-png-image_13060428.png"
                      alt="Pet Bed"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-5 flex-1 flex flex-col justify-between h-full min-w-0">
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 truncate">PURR-FECT REST!</h3>
                      <p className="text-base text-gray-600 truncate">
                        Luxury Beds for Dreamy Naps
                      </p>
                    </div>

                    <div className="mt-4">
                      <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-2.5 rounded-full font-semibold text-base shadow-md hover:opacity-90 transition truncate">
                        Shop Comfort 🐾
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Birthday Card - Fixed Height */}
              <div className="relative bg-gradient-to-r from-pink-200 via-pink-100 to-purple-200 rounded-2xl shadow-md overflow-hidden h-64 flex flex-col">
                <button
                  onClick={() => setShowList(!showList)}
                  className="absolute top-2 right-2 bg-pink-600 text-white text-xs px-3 py-1 rounded-full hover:bg-pink-700 transition z-10"
                >
                  🎉 {friends.length} Birthdays
                </button>

                {showList && (
                  <div className="absolute right-2 top-10 bg-white shadow-md rounded-lg w-40 z-20 max-h-32 overflow-y-auto">
                    <ul className="divide-y divide-gray-200">
                      {friends.map((f) => (
                        <li
                          key={f.id}
                          className="px-3 py-2 text-sm text-gray-800 hover:bg-pink-100 cursor-pointer truncate"
                          onClick={() => {
                            setSelectedFriend(f);
                            setShowList(false);
                          }}
                        >
                          {f.name} 🎂
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center p-5 flex-1">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={selectedFriend.image}
                      alt={selectedFriend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="ml-5 flex-1 flex flex-col justify-between h-full min-w-0">
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 truncate">
                        🎂 {selectedFriend.name}'s Birthday!
                      </h3>
                      <p className="text-base text-gray-600 truncate">
                        Coming up on{" "}
                        <span className="font-semibold text-gray-800">{selectedFriend.date}</span>
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() =>
                          alert(`🎉 You've sent wishes to ${selectedFriend.name}! 🐾`)
                        }
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white px-5 py-2.5 rounded-full font-semibold text-base shadow-md hover:opacity-90 transition truncate"
                      >
                        Send Wishes 🎁
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column (Profile Section) */}
            <div className="overflow-y-auto md:-ml-6 w-full">
              {/* Pet Selection */}
              <div className="bg-purple-100 p-8 rounded-2xl flex items-center justify-center gap-6 flex-wrap">
                {pets.length > 0 ? (
                  pets.map((pet, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                      onClick={() => setSelectedPet(pet)}
                    >
                      <div className="w-20 h-20 rounded-full border-4 border-purple-600 overflow-hidden">
                        <img
                          src={
                            pet.avatar
                              ? `https://argosmob.com/being-petz/public/${pet.avatar}`
                              : "https://placekitten.com/200/200"
                          }
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-2 font-semibold text-purple-600 text-sm">{pet.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No pets found. Add a new one!</p>
                )}

                {/* Add Pet */}
                <div
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                  onClick={() => navigate("/add-pet")}
                >
                  <div className="w-20 h-20 rounded-full border-4 border-purple-600 flex items-center justify-center text-purple-600 text-3xl">
                    +
                  </div>
                  <p className="mt-2 font-semibold text-purple-600 text-sm">Add new pet</p>
                </div>
              </div>

              {/* Profile Card (Dynamic) */}
              {selectedPet && (
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-6 w-full">
                  {/* Top Banner */}
                  <div className="relative bg-gradient-to-r from-purple-500 to-purple-700 h-32 sm:h-40">
                    <svg
                      className="absolute bottom-0 left-0 w-full"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                    >
                      <path
                        fill="rgba(255,255,255,0.1)"
                        d="M0,64L1440,160L1440,0L0,0Z"
                      ></path>
                    </svg>
                    <div className="absolute left-1/2 -bottom-16 transform -translate-x-1/2">
                      <img
                        src={
                          selectedPet.avatar
                            ? `https://argosmob.com/being-petz/public/${selectedPet.avatar}`
                            : "https://placekitten.com/200/200"
                        }
                        alt={selectedPet.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-20 pb-6 text-center px-4">
                    <h2 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
                      {selectedPet.name}
                      {selectedPet.gender === "Male" ? (
                        <img src={maleIcon} alt="Male" className="w-4 h-4 sm:w-5 sm:h-5 inline-block" />
                      ) : selectedPet.gender === "Female" ? (
                        <img
                          src={femaleIcon}
                          alt="Female"
                          className="w-4 h-4 sm:w-5 sm:h-5 inline-block"
                        />
                      ) : null}
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm">{calculateAge(selectedPet.dob)}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-600">
                      <span>🐾 {selectedPet.type}</span>
                      <span>🐕 {selectedPet.breed}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 sm:flex justify-center flex-wrap gap-2 px-4 pb-4 mt-2">
                    <button 
                      onClick={() => setActiveFilter("all")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeFilter === "all" 
                          ? "bg-gray-700 text-white" 
                          : "bg-gray-600 text-white hover:bg-gray-700"
                      }`}
                    >
                      🔄 All
                    </button>
                    <button 
                      onClick={() => setActiveFilter("vaccination")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeFilter === "vaccination" 
                          ? "bg-green-600 text-white" 
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      🩺 Vaccination
                    </button>
                    <button 
                      onClick={() => setActiveFilter("grooming")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeFilter === "grooming" 
                          ? "bg-blue-600 text-white" 
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      ✂️ Grooming
                    </button>
                    <button 
                      onClick={() => setActiveFilter("deworming")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeFilter === "deworming" 
                          ? "bg-yellow-600 text-white" 
                          : "bg-yellow-500 text-white hover:bg-yellow-600"
                      }`}
                    >
                      💊 Deworming
                    </button>
                    <button 
                      onClick={() => setActiveFilter("meal")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeFilter === "meal" 
                          ? "bg-pink-600 text-white" 
                          : "bg-pink-500 text-white hover:bg-pink-600"
                      }`}
                    >
                      🍖 Meal
                    </button>
                    <button 
                      onClick={() => setActiveFilter("weight")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeFilter === "weight" 
                          ? "bg-purple-600 text-white" 
                          : "bg-purple-500 text-white hover:bg-purple-600"
                      }`}
                    >
                      ⚖️ Weight
                    </button>
                  </div>
                </div>
              )}

              {/* Tabs & Content */}
              <div className="p-4 sm:p-6">
                <div className="max-w-2xl mx-auto">
                  {/* Tab Navigation */}
                  <div className="flex flex-col sm:flex-row bg-gray-100 rounded-lg shadow overflow-hidden">
                    {["records", "reminder", "profile"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2 sm:py-3 text-sm sm:text-base font-medium transition-colors duration-200 ${activeTab === tab
                          ? "bg-purple-600 text-white"
                          : "text-gray-600 hover:bg-gray-200"
                          }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="mt-4 sm:mt-6 w-full max-w-4xl mx-auto">
                    {/* Profile Tab */}
                    {activeTab === "profile" && (
                      <div className="bg-pink-100 p-3 sm:p-4 rounded-lg shadow w-full">
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                          <h2 className="text-base sm:text-lg font-bold">Pet Details</h2>
                          {!isEditing ? (
                            <button
                              onClick={() => setIsEditing(true)}
                              className="px-3 py-1 "
                            >
                              <FaEdit />
                            </button>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={handleSave}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setIsEditing(false)}
                                className="px-3 py-1 bg-gray-400 text-white rounded-lg text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({ ...formData, name: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full"
                                placeholder="Name of Pet"
                              />
                              <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) =>
                                  setFormData({ ...formData, dob: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full"
                              />
                              <input
                                type="text"
                                value={formData.breed}
                                onChange={(e) =>
                                  setFormData({ ...formData, breed: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full"
                                placeholder="Breed"
                              />
                              <select
                                value={formData.gender}
                                onChange={(e) =>
                                  setFormData({ ...formData, gender: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full"
                              >
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                              <input
                                type="text"
                                value={formData.type}
                                onChange={(e) =>
                                  setFormData({ ...formData, type: e.target.value })
                                }
                                className="bg-white p-2 rounded-lg shadow text-sm sm:text-base w-full sm:col-span-2"
                                placeholder="type Group"
                              />
                            </>
                          ) : (
                            <>
                              <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base">
                                <strong>Name of Pet:</strong> {formData.name}
                              </div>
                              <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base">
                                <strong>Date of Birth:</strong> {formData.dob}
                              </div>
                              <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base">
                                <strong>Breed:</strong> {formData.breed}
                              </div>
                              <div className="bg-green-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base">
                                <strong>Gender:</strong> {formData.gender}
                              </div>
                              <div className="bg-green-100 p-2 sm:p-3 rounded-lg shadow text-sm sm:text-base sm:col-span-2">
                                <strong>Pet Type:</strong> {formData.type}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Reminder Tab */}
                    {activeTab === "reminder" && (
                      <div className="bg-pink-100 p-3 sm:p-4 rounded-lg shadow w-full">
                        <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
                          Daily Reminders
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-center">
                          {/* Vaccination */}
                          <div className="bg-yellow-100 p-3 sm:p-4 rounded-lg shadow flex-1">
                            <i className="fas fa-syringe fa-lg sm:fa-2x text-yellow-500 mb-2"></i>
                            <div className="font-semibold">Next Vaccination</div>
                            <div className="text-xs sm:text-sm">
                              {vaccination ? (
                                <>
                                  <p className="font-medium">{vaccination.vaccine_name}</p>
                                  <p>{vaccinationCountdown || "Upcoming soon"}</p>
                                </>
                              ) : (
                                "No record"
                              )}
                            </div>
                          </div>

                          {/* Deworming */}
                          <div className="bg-green-100 p-3 sm:p-4 rounded-lg shadow flex-1">
                            <i className="fas fa-bug fa-lg sm:fa-2x text-green-500 mb-2"></i>
                            <div className="font-semibold">Next Deworming</div>
                            <div className="text-xs sm:text-sm">
                              {deworming ? (
                                <>
                                  <p className="font-medium">{deworming.type}</p>
                                  <p>{dewormingCountdown || "Upcoming soon"}</p>
                                </>
                              ) : (
                                "No record"
                              )}
                            </div>
                          </div>

                          {/* Grooming */}
                          <div className="bg-blue-100 p-3 sm:p-4 rounded-lg shadow flex-1">
                            <i className="fas fa-cut fa-lg sm:fa-2x text-blue-500 mb-2"></i>
                            <div className="font-semibold">Next Grooming</div>
                            <div className="text-xs sm:text-sm">
                              {grooming ? (
                                <>
                                  <p className="font-medium">{grooming.type}</p>
                                  <p>{groomingCountdown || "Upcoming soon"}</p>
                                </>
                              ) : (
                                "No record"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Records Tab */}
                    {activeTab === "records" && (
                      <div className="bg-pink-100 p-4 rounded-lg w-full space-y-6">
                        {/* Active Filter Indicator */}
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-bold">
                            {activeFilter === "all" 
                              ? "All Records" 
                              : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Records`
                            } for {selectedPet?.name || "Pet"}
                          </h2>
                          {activeFilter !== "all" && (
                            <button 
                              onClick={() => setActiveFilter("all")}
                              className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                            >
                              Show All Records
                            </button>
                          )}
                        </div>

                        {/* Vaccination Records - Conditional Render */}
                        {showVaccination && (
                          <div>
                            <h2 className="text-lg font-bold mb-4">Vaccinations</h2>
                            {vaccineRecords.length > 0 ? (
                              vaccineRecords.map((record, idx) => (
                                <div key={idx} className="flex gap-4 bg-white rounded-lg shadow-md p-4 mb-3">
                                  <img
                                    src={`https://argosmob.com/being-petz/public/${record.image_path}`}
                                    alt={record.vaccine_name}
                                    className="w-28 h-28 rounded-lg object-cover"
                                  />
                                  <div
                                    className="flex flex-col justify-center rounded-md p-4 w-full"
                                    style={{ backgroundColor: record.bg_color || "#F1F1F1" }}
                                  >
                                    <h3 className="font-bold text-purple-700">{record.vaccine_name}</h3>
                                    <p className="text-xs">Type: {record.type}</p>
                                    <p className="text-xs">Date: {record.date}</p>
                                    <p className="text-xs">Reminder: {record.reminder_date} at {record.reminder_time}</p>
                                    {record.next_vaccine && (
                                      <p className="text-xs text-blue-600 font-semibold">
                                        Next Vaccine: {record.next_vaccine}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-600 text-center">No vaccination records found.</p>
                            )}
                          </div>
                        )}

                        {/* Deworming Records - Conditional Render */}
                        {showDeworming && (
                          <div>
                            <h2 className="text-lg font-bold mb-4">Deworming Records</h2>
                            {dewormingRecords.length > 0 ? (
                              dewormingRecords.map((record, idx) => (
                                <div key={idx} className="flex gap-4 bg-white rounded-lg shadow-md p-4 mb-3">
                                  <img
                                    src={`https://argosmob.com/being-petz/public/${record.image_path}`}
                                    alt={record.type}
                                    className="w-28 h-28 rounded-lg object-cover"
                                  />
                                  <div className="flex flex-col justify-center rounded-md p-4 w-full bg-green-50">
                                    <h3 className="font-bold text-green-700">Type: {record.type}</h3>
                                    <p className="text-xs">Date: {record.date}</p>
                                    <p className="text-xs">Reminder: {record.reminder_date} at {record.reminder_time}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-600 text-center">No deworming records found.</p>
                            )}
                          </div>
                        )}

                        {/* Grooming Records - Conditional Render */}
                        {showGrooming && (
                          <div>
                            <h2 className="text-lg font-bold mb-4">Grooming Records</h2>
                            {groomingRecords.length > 0 ? (
                              groomingRecords.map((record, idx) => (
                                <div key={idx} className="flex gap-4 bg-white rounded-lg shadow-md p-4 mb-3">
                                  <img
                                    src={`https://argosmob.com/being-petz/public/${record.image_path}`}
                                    alt={record.type}
                                    className="w-28 h-28 rounded-lg object-cover"
                                  />
                                  <div
                                    className="flex flex-col justify-center rounded-md p-4 w-full"
                                    style={{ backgroundColor: record.bg_color || "#F1F1F1" }}
                                  >
                                    <h3 className="font-bold text-blue-700">Type: {record.type}</h3>
                                    <p className="text-xs">Date: {record.date}</p>
                                    <p className="text-xs">Reminder: {record.reminder_date} at {record.reminder_time}</p>
                                    {record.next_grooming && (
                                      <p className="text-xs text-blue-600 font-semibold">
                                        Next Grooming: {record.next_grooming}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-600 text-center">No grooming records found.</p>
                            )}
                          </div>
                        )}

                        {/* Meal Records - Conditional Render */}
                        {showMeal && (
                          <div>
                            <h2 className="text-lg font-bold mb-4">Meal Records</h2>
                            {mealRecords.length > 0 ? (
                              mealRecords.map((record, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-md p-4 mb-3">
                                  <div
                                    className="rounded-md p-4 w-full"
                                    style={{ backgroundColor: record.bg_color || "#FFF" }}
                                  >
                                    <h3 className="font-bold text-orange-700">Meal Time: {record.meal_time}</h3>
                                    <p className="text-xs">Reminder: {record.reminder_date} at {record.reminder_time}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-600 text-center">No meal records found.</p>
                            )}
                          </div>
                        )}

                        {/* Weight Records - Conditional Render */}
                        {showWeight && (
                          <div>
                            <h2 className="text-lg font-bold mb-4">Weight Records</h2>
                            {weightRecords.length > 0 ? (
                              weightRecords.map((record, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-md p-4 mb-3">
                                  <div
                                    className="rounded-md p-4 w-full"
                                    style={{ backgroundColor: record.bg_color || "#EEE" }}
                                  >
                                    <h3 className="font-bold text-brown-700">Weight: {record.weight} kg</h3>
                                    <p className="text-xs">Date: {record.date}</p>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-600 text-center">No weight records found.</p>
                            )}
                          </div>
                        )}

                        {/* No Records Message - जब कोई record न हो */}
                        {activeFilter !== "all" && 
                         !showVaccination && !showDeworming && !showGrooming && !showMeal && !showWeight && (
                          <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">No {activeFilter} records found for {selectedPet?.name || "your pet"}</p>
                          </div>
                        )}

                        {/* Button */}
                        <div className="text-center">
                          <button
                            onClick={() => navigate("/managerecord")}
                            className="bg-purple-600 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-purple-700 transition"
                          >
                            Manage Records
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petprofile;