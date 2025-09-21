import { useState } from "react";
import { FilterIcon, MapPinIcon } from "lucide-react";

const FilterAndMap = () => {
  const [filters, setFilters] = useState({
    petType: "",
    status: "",
    location: "",
  });

  const handleReset = () => {
    setFilters({ petType: "", status: "", location: "" });
  };

  return (
    <section className="py-8 w-full">
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Lost & Found Pets
        </h2>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pet Type
            </label>
            <select
              value={filters.petType}
              onChange={(e) =>
                setFilters({ ...filters, petType: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Types</option>
              <option value="dog">Dogs</option>
              <option value="cat">Cats</option>
              <option value="bird">Birds</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Statuses</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
              <option value="reunited">Reunited</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code or City
            </label>
            <input
              type="text"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              placeholder="Enter zip code"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Static Map Section */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <MapPinIcon className="h-5 w-5 mr-2 text-purple-600" />
          Recent Reports Map
        </h2>
        <div className="bg-gray-100 rounded-lg overflow-hidden h-[300px] md:h-[400px] relative">
          {/* Static map background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://via.placeholder.com/1200x400?text=Map+Preview')",
            }}
          ></div>

          {/* Example static pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white p-2 rounded-lg shadow-md text-xs max-w-[150px]">
              <div className="font-bold text-purple-600">Lost Dog - Max</div>
              <div className="text-gray-600">Golden Retriever</div>
              <div className="text-gray-600">2 days ago</div>
            </div>
            <div className="w-4 h-4 bg-purple-600 rounded-full mx-auto -mt-1 relative z-10"></div>
          </div>
        </div>

        {/* Buttons under map */}
        <div className="flex justify-center mt-4 gap-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200">
            Lost Pets
          </button>
          <button className="bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm transition-colors duration-200">
            Found Pets
          </button>
          <button className="bg-white hover:bg-gray-100 text-purple-600 border border-purple-600 px-4 py-2 rounded-full text-sm transition-colors duration-200">
            Reunited
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterAndMap;

  // api test done hi mapbox probelm hi  
// import { useState, useEffect } from "react";
// import mapboxgl from "mapbox-gl";
// import axios from "axios";
// import { FilterIcon, MapPinIcon } from "lucide-react";

// interface Pet {
//   report_type: "lost" | "found" | "reunited";
//   pet_type: string;
//   pet_gender: string;
//   location: string;
//   latitude?: number;
//   longitude?: number;
//   pet_name?: string;
// }

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xhYmNkZWYxMjM0NiJ9.abcdefghijklmnopqrstuvwxyz";

// const FilterAndMap = () => {
//   const [filters, setFilters] = useState({
//     petType: "",
//     status: "",
//     location: "",
//   });

//   const [allPets, setAllPets] = useState<Pet[]>([]);
//   const [filteredPets, setFilteredPets] = useState<Pet[]>([]);
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);

//   // Fetch all pets from API
//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const res = await axios.get(
//           "https://argosmob.com/being-petz/public/api/v1/pet/lost-found/all"
//         );

//         const petData: Pet[] = res.data.data.map((p: any) => ({
//           report_type: p.report_type,
//           pet_type: p.pet_type,
//           pet_gender: p.pet_gender,
//           location: p.location,
//           latitude: p.latitude ? Number(p.latitude) : undefined,
//           longitude: p.longitude ? Number(p.longitude) : undefined,
//           pet_name: p.pet_name || "Unknown",
//         }));

//         setAllPets(petData);
//         setFilteredPets(petData); // initially show all
//       } catch (err) {
//         console.error("Error fetching pets:", err);
//       }
//     };

//     fetchPets();
//   }, []);

//   // Initialize Mapbox map
//   useEffect(() => {
//     if (!map) {
//       const initMap = new mapboxgl.Map({
//         container: "map-container",
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [77.5946, 12.9716], // Bangalore default
//         zoom: 5,
//       });

//       setMap(initMap);
//     }
//   }, [map]);

//   // Add markers whenever filtered pets change
//   useEffect(() => {
//     if (!map) return;

//     // Clear existing markers
//     const existingMarkers = document.getElementsByClassName("mapboxgl-marker");
//     while (existingMarkers[0]) {
//       existingMarkers[0].parentNode?.removeChild(existingMarkers[0]);
//     }

//     filteredPets.forEach((pet) => {
//       if (!pet.latitude || !pet.longitude) return;

//       let color = "blue";
//       if (pet.report_type === "lost") color = "red";
//       else if (pet.report_type === "found") color = "green";
//       else if (pet.report_type === "reunited") color = "gray";

//       new mapboxgl.Marker({ color })
//         .setLngLat([pet.longitude, pet.latitude])
//         .setPopup(
//           new mapboxgl.Popup().setHTML(`
//             <div style="font-size:14px;">
//               <strong>${pet.pet_name}</strong><br/>
//               Type: ${pet.pet_type}<br/>
//               Gender: ${pet.pet_gender}<br/>
//               Status: ${pet.report_type}<br/>
//               Location: ${pet.location}
//             </div>
//           `)
//         )
//         .addTo(map);
//     });
//   }, [filteredPets, map]);

//   const handleFilter = () => {
//     const result = allPets.filter((pet) => {
//       const matchesType = filters.petType ? pet.pet_type === filters.petType : true;
//       const matchesStatus = filters.status ? pet.report_type === filters.status : true;
//       const matchesLocation = filters.location
//         ? pet.location.toLowerCase().includes(filters.location.toLowerCase())
//         : true;
//       return matchesType && matchesStatus && matchesLocation;
//     });

//     setFilteredPets(result);
//   };

//   const handleReset = () => {
//     setFilters({ petType: "", status: "", location: "" });
//     setFilteredPets(allPets);
//   };

//   return (
//     <section className="py-8 w-full">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">Lost & Found Pets</h2>
//       </div>

//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Pet Type</label>
//             <select
//               value={filters.petType}
//               onChange={(e) => setFilters({ ...filters, petType: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
//             >
//               <option value="">All Types</option>
//               <option value="dog">Dogs</option>
//               <option value="cat">Cats</option>
//               <option value="bird">Birds</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
//             >
//               <option value="">All Statuses</option>
//               <option value="lost">Lost</option>
//               <option value="found">Found</option>
//               <option value="reunited">Reunited</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code or City</label>
//             <input
//               type="text"
//               value={filters.location}
//               onChange={(e) => setFilters({ ...filters, location: e.target.value })}
//               placeholder="Enter zip code or city"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={handleFilter}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center transition-colors duration-200"
//           >
//             <FilterIcon className="h-4 w-4 mr-2" />
//             Filter
//           </button>
//           <button
//             onClick={handleReset}
//             className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
//           >
//             Reset
//           </button>
//         </div>
//       </div>

//       <div className="mb-12">
//         <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//           <MapPinIcon className="h-5 w-5 mr-2 text-purple-600" />
//           Recent Reports Map
//         </h2>
//         <div id="map-container" className="rounded-lg overflow-hidden h-[300px] md:h-[400px]" />
//       </div>
//     </section>
//   );
// };

// export default FilterAndMap;
