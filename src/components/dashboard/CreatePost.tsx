import { useState, useRef } from "react";
import axios from "axios";
import { FaCamera, FaVideo, FaTimes,  FaMapMarkerAlt } from "react-icons/fa";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Base URL for images
  const baseURL = "https://argosmob.com/being-petz/public/";

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const parentId = user?.id;
  const userName =
    `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User";

  // Resolve profile image URL
  const getProfileImage = () => {
    if (!user?.profile) return null;
    return user.profile.startsWith("http")
      ? user.profile
      : baseURL + user.profile;
  };

  const profileImage = getProfileImage();

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setMediaFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemovePreview = () => {
    setMediaFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = async () => {
    if (!parentId) {
      alert("User not logged in!");
      return;
    }

    if (!postText.trim() && !mediaFile) {
      alert("Please add some text or media to post!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("parent_id", parentId.toString());
      formData.append("content", postText);
      formData.append("is_public", "1");

      if (mediaFile) {
        if (mediaFile.type.startsWith("image")) {
          formData.append("featured_image", mediaFile);
        } else if (mediaFile.type.startsWith("video")) {
          formData.append("featured_video", mediaFile);
        }
      }

      const res = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/post/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Post Created:", res.data);
      alert("Post created successfully!");
      setPostText("");
      setMediaFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    }
  };

  const triggerFileInput = (type: "image" | "video") => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "image" ? "image/*" : "video/*";
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {userName.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{userName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              <FaMapMarkerAlt size={10} />
              Public
            </span>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="mb-4">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder={`What's on your mind, ${userName}?`}
          className="w-full border-0 text-gray-900 placeholder-gray-500 text-lg resize-none focus:outline-none focus:ring-0 min-h-[120px]"
          rows={3}
        />
      </div>

      {/* Media Preview */}
      {preview && (
        <div className="mb-4 relative rounded-xl overflow-hidden border border-gray-200">
          {mediaFile?.type.startsWith("video") ? (
            <video
              src={preview}
              controls
              className="w-full max-h-96 object-cover"
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-96 object-cover"
            />
          )}
          <button
            onClick={handleRemovePreview}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
          >
            <FaTimes size={16} />
          </button>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {/* Photo Button */}
          <button
            onClick={() => triggerFileInput("image")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors p-2 rounded-lg hover:bg-purple-50"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
              <FaCamera size={18} className="text-purple-600" />
            </div>
            <span className="font-medium hidden sm:block">Photo</span>
          </button>

          {/* Video Button */}
          <button
            onClick={() => triggerFileInput("video")}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors p-2 rounded-lg hover:bg-purple-50"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
              <FaVideo size={18} className="text-purple-600" />
            </div>
            <span className="font-medium hidden sm:block">Video</span>
          </button>

           

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </div>

        {/* Post Button */}
        <button
          onClick={handlePost}
          disabled={!postText.trim() && !mediaFile}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl"
        >
          Post
        </button>
      </div>

      {/* Character Count */}
      <div className="text-right mt-3 text-sm text-gray-400">
        {postText.length}/500
      </div>
    </div>
  );
};

export default CreatePost;
