// // import { useEffect, useState } from "react";

// // interface Community {
// //   id: number;
// //   name: string;
// //   profile: string;
// // }

// // export default function CommunityListFromAPI() {
// //   const [communities, setCommunities] = useState<Community[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchCommunities = async () => {
// //       try {
// //         const res = await fetch("https://argosmob.uk/being-petz/public/api/v1/pet/community/get");
// //         if (!res.ok) throw new Error("Failed to fetch communities");
// //         const data = await res.json();

// //         // check API response structure
// //         console.log("API response:", data);

// //         // assuming communities are inside data.data
// //         setCommunities(data.data || []);
// //       } catch (err) {
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCommunities();
// //   }, []);

// //   if (loading) {
// //     return <p className="text-center text-gray-500">Loading communities...</p>;
// //   }

// //   return (
// //     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
// //       {communities.map((c) => (
// //         <div
// //           key={c.id}
// //           className="flex flex-col items-center bg-white rounded-xl shadow p-3"
// //         >
// //           <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500">
// //             <img
// //               src= {`https://argosmob.uk/being-petz/public/${c.profile}`}
// //               alt={c.name}
// //               className="w-full h-full object-cover"
              
// //             />
// //           </div>
// //           <p className="mt-2 text-sm font-semibold text-purple-700">{c.name}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";

// interface Community {
//   id: number;
//   name: string;
//   profile: string;
//   //  : string;
// }

// export default function CommunityListFromAPI() {
//   const [communities, setCommunities] = useState<Community[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCommunities = async () => {
//       try {
//         const res = await fetch(
//           "https://argosmob.uk/being-petz/public/api/v1/pet/community/get"
//         );
//         if (!res.ok) throw new Error("Failed to fetch communities");
//         const data = await res.json();

//         console.log("API response:", data);

//         // communities inside data.data
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
//               src={`https://argosmob.uk/being-petz/public/${c.profile}`}
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

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Banner {
  id: number;
  desktop: string;
  mobile: string;
}

const BannerSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://argosmob.uk/being-petz/public/api/v1/banner/all")
      .then((res) => {
        if (res.data && res.data.data) {
          const baseUrl = "https://argosmob.uk/being-petz/public/";
          const imgs = res.data.data.map((b: any) => ({
            id: b.id,
            desktop: baseUrl + b.desktop_image,
            mobile: baseUrl + b.mobile_image,
          }));
          console.log("Banners:", imgs);
          setBanners(imgs);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence>
        {banners.length > 0 && (
          <motion.picture
            key={currentIndex}
            initial={{ x: "100%", opacity: 0.8 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full"
          >
            {/* 👇 Mobile image for small screens */}
            <source
              media="(max-width: 768px)"
              srcSet={banners[currentIndex].mobile}
            />
            {/* 👇 Desktop image */}
            <img
              src={banners[currentIndex].desktop}
              alt="banner"
              className="w-full h-full object-cover"
            />
          </motion.picture>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BannerSlider;
