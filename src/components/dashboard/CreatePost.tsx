// import { useState } from "react";
// import img1 from "../../assets/user/03.jpg";

// const CreatePost = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [postText, setPostText] = useState("");
//   const [showMedia, setShowMedia] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handlePost = () => {
//     console.log("Post Content:", postText);
//     setPostText("");
//     closeModal();
//   };

//   return (
//     <>
//       {/* Create Post Card */}
//       <div className="bg-white rounded-xl shadow p-4">
//         <h3 className="text-lg font-semibold text-purple-700 mb-3">Create Post</h3>
//         <div onClick={openModal} className="flex items-center gap-3 cursor-pointer">
//           <img src={img1} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
//           <input
//             type="text"
//             placeholder="Write something here..."
//             className="bg-gray-100 rounded-full px-4 py-2 flex-1 cursor-pointer"
//             readOnly
//           />
//         </div>
//         <div className="flex gap-3 mt-3">
//            <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
//            📷 Take Photo 
//            </button>
//            <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
//            🖼️ Single Photo (Crop)
//            </button>
//            <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
//            🎞️ Select Video
//            </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black"
//             >
//               ✕
//             </button>

//             {/* Header */}
//             <h3 className="text-lg font-semibold mb-4">Create Post</h3>

//             {/* User Input */}
//             <div className="flex items-center gap-3 mb-4">
//               <img src={img1} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
//               <textarea
//                 value={postText}
//                 onChange={(e) => setPostText(e.target.value)}
//                 placeholder="Write something here..."
//                 className="w-full border rounded-lg p-2 resize-none"
//                 rows={3}
//               />
//             </div>

//             {/* Media Section (toggle) */}
//             {showMedia && (
//               <div className="space-y-3 mb-5 animate-fadeIn">
//                 <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
//                   📷 Take Photo 
//                 </button>
//                 <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
//                   📹 Record Video
//                 </button>
//                 <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
//                   🖼️ Single Photo (Crop)
//                 </button>
//                 <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
//                   🖼️ Multiple Photos (Crop)
//                 </button>
//                 <button className="w-full bg-purple-600 text-white py-2 rounded-lg">
//                   🎞️ Select Video
//                 </button>
//                 <button
//                   onClick={() => setShowMedia(false)}
//                   className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}

//             {/* Footer Buttons (Post + Media side by side) */}
//             <div className="flex gap-3">
//               <button
//                 onClick={handlePost}
//                 className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
//               >
//                 Post
//               </button>
//               <button
//                 onClick={() => setShowMedia(!showMedia)}
//                 className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
//               >
//                 Media
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default CreatePost;


import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import img1 from "../../assets/user/03.jpg";

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [showMedia, setShowMedia] = useState(false);

  const [selectedImages, setSelectedImages] = useState([]); // Multiple images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [crop, setCrop] = useState({ aspect: 1 });
  const [croppedImages, setCroppedImages] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setShowMedia(false);
    setSelectedImages([]);
    setCroppedImages([]);
    setCurrentImageIndex(0);
    setPostText("");
  };

  // Upload Post
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("text", postText);

      croppedImages.forEach((file, idx) => {
        formData.append("media", file, `image_${idx}.jpg`);
      });

      const res = await fetch("https://argosmob.uk/being-petz/public/api/v1/post/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("✅ Post Uploaded:", data);
      closeModal();
    } catch (err) {
      console.error("❌ Upload Failed", err);
    }
  };

  // File Selection
  const handleFileChange = (e, multiple = false) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setSelectedImages(files.map((file) => URL.createObjectURL(file)));
      setCurrentImageIndex(0);
    }
  };

  // Crop current image
  const getCroppedImage = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
          resolve(file);
        }
      }, "image/jpeg");
    });
  };

  const saveCropped = async () => {
    const imgElement = document.getElementById("crop-image");
    if (!imgElement) return;
    const file = await getCroppedImage(imgElement, crop);

    setCroppedImages((prev) => [...prev, file]);

    if (currentImageIndex < selectedImages.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      alert("✅ All images cropped!");
    }
  };

  return (
    <>
      {/* Create Post Card */}
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold text-purple-700 mb-3">Create Post</h3>
        <div onClick={openModal} className="flex items-center gap-3 cursor-pointer">
          <img src={img1} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
          <input
            type="text"
            placeholder="Write something here..."
            className="bg-gray-100 rounded-full px-4 py-2 flex-1 cursor-pointer"
            readOnly
          />
        </div>
        <div className="flex gap-3 mt-3">
          <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
            📷 Take Photo
          </button>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
            🖼️ Single Photo (Crop)
          </button>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
            🎞️ Select Video
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            {/* Header */}
            <h3 className="text-lg font-semibold mb-4">Create Post</h3>

            {/* User Input */}
            <div className="flex items-center gap-3 mb-4">
              <img src={img1} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Write something here..."
                className="w-full border rounded-lg p-2 resize-none"
                rows={3}
              />
            </div>

            {/* Image Cropper */}
            {selectedImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Cropping image {currentImageIndex + 1} of {selectedImages.length}
                </p>
                <ReactCrop crop={crop} onChange={setCrop}>
                  <img
                    id="crop-image"
                    src={selectedImages[currentImageIndex]}
                    alt="Crop Preview"
                  />
                </ReactCrop>
                <button
                  onClick={saveCropped}
                  className="mt-2 w-full bg-purple-600 text-white py-2 rounded-lg"
                >
                  Save Crop
                </button>
              </div>
            )}

            {/* Media Section */}
            {showMedia && (
              <div className="space-y-3 mb-5 animate-fadeIn">
                {/* Camera */}
                <label className="w-full block bg-purple-600 text-white py-2 rounded-lg cursor-pointer">
                  📷 Take Photo
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>

                {/* Single Crop */}
                <label className="w-full block bg-purple-600 text-white py-2 rounded-lg cursor-pointer">
                  🖼️ Single Photo (Crop)
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>

                {/* Multi Crop */}
                <label className="w-full block bg-purple-600 text-white py-2 rounded-lg cursor-pointer">
                  🖼️ Multiple Photos (Crop)
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(e, true)}
                  />
                </label>

                {/* Video */}
                <label className="w-full block bg-purple-600 text-white py-2 rounded-lg cursor-pointer">
                  🎞️ Select Video
                  <input type="file" accept="video/*" className="hidden" />
                </label>

                <button
                  onClick={() => setShowMedia(false)}
                  className="w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handlePost}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                Post
              </button>
              <button
                onClick={() => setShowMedia(!showMedia)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                Media
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
