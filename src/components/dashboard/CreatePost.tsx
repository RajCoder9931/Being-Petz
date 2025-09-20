import { useState } from "react";
import axios from "axios";
import { FaCamera, FaVideo, FaTimes } from "react-icons/fa";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const parentId = 43;

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setMediaFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemovePreview = () => {
    setMediaFile(null);
    setPreview(null);
  };

  const handlePost = async () => {
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
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-purple-900 mb-5">Create Post</h3>

      {/* User Input Section */}
      <div className="flex items-start gap-3 mb-4">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full border-2 border-purple-900 rounded-lg p-3 resize-none focus:ring-2 focus:ring-purple-900 focus:border-transparent outline-none transition-all duration-200"
          rows={3}
        />
      </div>

      {/* Media Preview Section */}
      {preview && (
        <div className="mb-4 relative w-28 h-28 mx-auto">
          {mediaFile?.type.startsWith("video") ? (
            <video
              src={preview}
              controls
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          )}
          {/* Remove Button */}
          <button
            onClick={handleRemovePreview}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 shadow-md"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* Media and Post Buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4">
          <label className="cursor-pointer text-purple-900 hover:text-purple-900 transition-colors flex items-center gap-2 font-semibold">
            <FaCamera size={20} />
            <span className="hidden sm:inline">Photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </label>
          <label className="cursor-pointer text-purple-900 hover:text-purple-900 transition-colors flex items-center gap-2 font-semibold">
            <FaVideo size={20} />
            <span className="hidden sm:inline">Video</span>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </label>
        </div>

        <button
          onClick={handlePost}
          className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition-all"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
