// import { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import Header from "../dashboard/Header";
// import Sidebar from "../dashboard/sidebar";

// type EventType = {
//   id: number;
//   title: string;
//   date: Date;
//   time: string;
//   location: string;
//   type: string;
//   members: number;
//   description: string;
//   hosts: string[];
//   image: string;
//   mapUrl: string;
// };

// const events: EventType[] = [
//   {
//     id: 1,
//     title: "Pet Adoption Event",
//     date: new Date(2025, 9, 4),
//     time: "11:00 AM - 1:00 PM",
//     location: "Ellington Agway, 74 West Rd, Ellington, CT",
//     type: "Adoption",
//     members: 54,
//     description:
//       "Join Superior Energy at our 11th Annual Pet Adoption Event with the CT Humane Society.",
//     hosts: ["Superior Energy", "Extsila Sandpiper Lane"],
//     image:
//       "https://people.com/thmb/Rm8iYbylv_7ZqLUpJI53Z75XAHg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/hallmark-adoption-event-07-4e1d6a10f3734cbca7fdb905b8945638.jpg",
//     mapUrl:
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.372847168525!2d-72.466!3d41.906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e6f3f6d6%3A0x2!2sEllington%20Agway!5e0!3m2!1sen!2sus!4v1694950000",
//   },
//   {
//     id: 2,
//     title: "Community Fundraiser",
//     date: new Date(2025, 9, 10),
//     time: "2:00 PM - 5:00 PM",
//     location: "Town Hall, Ellington CT",
//     type: "Fundraiser",
//     members: 80,
//     description: "Helping raise funds for the local shelter.",
//     hosts: ["Ellington Town Committee"],
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYtlzEbboFDQtJpDadNq4jodFgca_5MmVhRw&s",
//     mapUrl:
//       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2949.372847168525!2d-72.466!3d41.906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e6f3f6d6%3A0x2!2sTown%20Hall!5e0!3m2!1sen!2sus!4v1694950000",
//   },
// ];

// export default function EventsPage() {
//   const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const eventsOnDate = events.filter(
//     (event) => event.date.toDateString() === selectedDate?.toDateString()
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

//         {/* Page Body */}
//         <div className="p-6">
//           {/* Header Banner */}
//           <div className="relative h-48 bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center rounded-xl mb-6">
//             <h1 className="text-white text-3xl font-bold">Upcoming Events</h1>
//           </div>

//           {/* Layout */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Event List */}
//             <div className="md:col-span-2 space-y-4">
//               {events.map((event) => (
//                 <div
//                   key={event.id}
//                   className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
//                   onClick={() => setSelectedEvent(event)}
//                 >
//                   <h2 className="text-xl font-semibold">{event.title}</h2>
//                   <p className="text-sm text-gray-500">
//                     {event.date.toDateString()} | {event.time}
//                   </p>
//                   <p className="text-sm">{event.location}</p>
//                   <p className="text-sm text-gray-600">
//                     Type: {event.type} | Members: {event.members}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Calendar */}
//             <div className="bg-white rounded-2xl shadow p-4">
//               <Calendar
//                 value={selectedDate}
//                 onChange={setSelectedDate}
//                 next2Label={null}
//                 prev2Label={null}
//                 tileContent={({ date, view }) =>
//                   view === "month" &&
//                   events.some((e) => e.date.toDateString() === date.toDateString()) ? (
//                     <div className="flex justify-center mt-1">
//                       <span className="w-2 h-2 rounded-full bg-pink-500"></span>
//                     </div>
//                   ) : null
//                 }
//               />

//               {/* Events on selected date */}
//               <div className="mt-4">
//                 <h3 className="font-semibold">
//                   Events on {selectedDate?.toDateString()}
//                 </h3>
//                 {eventsOnDate.length > 0 ? (
//                   eventsOnDate.map((event) => (
//                     <p
//                       key={event.id}
//                       className="text-sm text-pink-600 cursor-pointer hover:underline"
//                       onClick={() => setSelectedEvent(event)}
//                     >
//                       {event.title}
//                     </p>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500">No events.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Event Modal */}
//       {selectedEvent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto p-6">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl relative">
//             {/* Close Button */}
//             <button
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//               onClick={() => setSelectedEvent(null)}
//             >
//               ✕
//             </button>

//             {/* Event Banner Image */}
//             <div className="w-full h-56 md:h-72 overflow-hidden rounded-t-xl">
//               <img
//                 src={selectedEvent.image}
//                 alt={selectedEvent.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Modal Body */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//               {/* Left Section */}
//               <div className="md:col-span-2">
//                 <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
//                 <p className="text-sm text-gray-500 mb-1">
//                   📅 {selectedEvent.date.toDateString()} | ⏰ {selectedEvent.time}
//                 </p>
//                 <p className="text-sm text-gray-700 mb-3">
//                   📍 {selectedEvent.location}
//                 </p>

//                 <h3 className="font-semibold text-lg mb-2">Details</h3>
//                 <p className="mb-4">{selectedEvent.description}</p>

//                 <h4 className="font-semibold">Hosts</h4>
//                 <div className="flex gap-3 mt-2 flex-wrap">
//                   {selectedEvent.hosts.map((host, idx) => (
//                     <span
//                       key={idx}
//                       className="px-3 py-1 bg-gray-200 rounded-full text-sm"
//                     >
//                       {host}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Section */}
//               <div className="space-y-4">
//                 <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
//                   🎟️ Find Tickets
//                 </button>

//                 {/* Map */}
//                 <iframe
//                   src={selectedEvent.mapUrl}
//                   width="100%"
//                   height="180"
//                   style={{ border: 0 }}
//                   loading="lazy"
//                   className="rounded-lg"
//                 ></iframe>

//                 {/* Guests */}
//                 <div>
//                   <h4 className="font-semibold">Guests</h4>
//                   <p className="text-sm text-gray-500">3 Going | 51 Interested</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";

type EventType = {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://argosmob.com/being-petz/public/api/v1/events");
        const json = await res.json();
        if (json.status && json.data?.data) {
          setEvents(json.data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Events matching selected date
  const eventsOnDate = events.filter(
    (event) =>
      new Date(event.event_date).toDateString() === selectedDate?.toDateString()
  );

  return (
    <div className="flex min-h-screen bg-gray-50 pt-12">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Body */}
        <div className="p-6">
          {/* Header Banner */}
          <div className="relative h-48 bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center rounded-xl mb-6">
            <h1 className="text-white text-3xl font-bold">Upcoming Events</h1>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Event List */}
            <div className="md:col-span-2 space-y-4">
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <p className="text-sm text-gray-500">
                      {new Date(event.event_date).toDateString()}
                    </p>
                    <p className="text-sm">{event.location}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No events found.</p>
              )}
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-2xl shadow p-4">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                next2Label={null}
                prev2Label={null}
                tileContent={({ date, view }) =>
                  view === "month" &&
                  events.some(
                    (e) =>
                      new Date(e.event_date).toDateString() === date.toDateString()
                  ) ? (
                    <div className="flex justify-center mt-1">
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    </div>
                  ) : null
                }
              />

              {/* Events on selected date */}
              <div className="mt-4">
                <h3 className="font-semibold">
                  Events on {selectedDate?.toDateString()}
                </h3>
                {eventsOnDate.length > 0 ? (
                  eventsOnDate.map((event) => (
                    <p
                      key={event.id}
                      className="text-sm text-pink-600 cursor-pointer hover:underline"
                      onClick={() => setSelectedEvent(event)}
                    >
                      {event.title}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No events.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-y-auto p-6">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>

            {/* Event Banner Image */}
            <div className="w-full h-56 md:h-72 overflow-hidden rounded-t-xl">
              <img
                src={`https://argosmob.com/being-petz/public/${selectedEvent.image}`}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
              <p className="text-sm text-gray-500 mb-1">
                📅 {new Date(selectedEvent.event_date).toDateString()}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                📍 {selectedEvent.location}
              </p>

              <h3 className="font-semibold text-lg mb-2">Details</h3>
              <p className="mb-4">{selectedEvent.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

