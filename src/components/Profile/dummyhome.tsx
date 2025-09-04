// import { useEffect, useState } from "react";

// interface Community {
//   id: number;
//   name: string;
//   profile: string;
// }

// export default function CommunityListFromAPI() {
//   const [communities, setCommunities] = useState<Community[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCommunities = async () => {
//       try {
//         const res = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/community/get");
//         if (!res.ok) throw new Error("Failed to fetch communities");
//         const data = await res.json();

//         // check API response structure
//         console.log("API response:", data);

//         // assuming communities are inside data.data
//         setCommunities(data.data || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCommunities();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading communities...</p>;
//   }

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
//       {communities.map((c) => (
//         <div
//           key={c.id}
//           className="flex flex-col items-center bg-white rounded-xl shadow p-3"
//         >
//           <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500">
//             <img
//               src= {`https://argosmob.uk/being-petz/public/${c.profile}`}
//               alt={c.name}
//               className="w-full h-full object-cover"
              
//             />
//           </div>
//           <p className="mt-2 text-sm font-semibold text-purple-700">{c.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";

interface Community {
  id: number;
  name: string;
  profile: string;
  //  : string;
}

export default function CommunityListFromAPI() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch(
          "https://argosmob.uk/being-petz/public/api/v1/pet/community/get"
        );
        if (!res.ok) throw new Error("Failed to fetch communities");
        const data = await res.json();

        console.log("API response:", data);

        // communities inside data.data
        setCommunities(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading communities...</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {communities.map((c) => (
        <div
          key={c.id}
          className="flex flex-col items-center bg-white rounded-xl shadow p-3"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500">
            <img
              src={`https://argosmob.uk/being-petz/public/${c.profile}`}
              alt={c.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-purple-700">{c.name}</p>
        </div>
      ))}
    </div>
  );
}

 