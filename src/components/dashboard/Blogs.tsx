import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaw, FaPlus } from "react-icons/fa";
import axios from "axios";
// import puppyImage from "../../assets/img/puppy.jpg";

// ✅ Sidebar & Header import
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";

type Blog = {
  id: number;
  title: string;
  image: string;
  text: string;
};

const BlogPage: React.FC = () => {
  const defaultBlogs: Blog[] = [
    
  ]
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    text: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs");
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      setBlogs(defaultBlogs);
    }
  }, []);

  // Save to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  const toggleReadMore = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  // ✅ Handle Blog Submit with API
  const handleCreateBlog = async () => {
    if (!newBlog.title || !newBlog.text || !newBlog.image) return;

    try {
      setLoading(true);

      const user_id = localStorage.getItem("user_id"); // ✅ user_id from login
      const author_name = localStorage.getItem("username") || "Guest User";

      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("content", newBlog.text);
      formData.append("featured_image", newBlog.image);
      formData.append("author_name", author_name);
      formData.append("user_id", user_id || "");

      const response = await axios.post(
        "https://argosmob.com/being-petz/public/api/v1/post/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ Blog Created:", response.data);

      const blog: Blog = {
        id: Date.now(),
        title: newBlog.title,
        image: URL.createObjectURL(newBlog.image), 
        text: newBlog.text,
      };

      setBlogs([blog, ...blogs]);
      setNewBlog({ title: "", text: "", image: null });
      setIsFormOpen(false);
    } catch (error) {
      console.error(" Error creating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Blogs Section */}
        <div className="p-6">
          {/* Top Title & Button */}
          <div className="bg-white shadow-md py-4 flex justify-between px-6 items-center rounded-xl mb-6 border-l-4 border-purple-500">
            <div className="flex justify-center items-center space-x-3 w-full">
              <FaPaw className="text-purple-600 text-2xl" />
              <h1 className="text-2xl font-bold text-purple-700">Pets Blogs</h1>
            </div>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 flex items-center space-x-2"
              onClick={() => setIsFormOpen(true)}
            >
              <FaPlus /> <span>Create Blog</span>
            </button>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition border border-purple-100"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedBlog(blog)}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-purple-700">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {expanded === blog.id
                      ? blog.text
                      : blog.text.slice(0, 80) +
                        (blog.text.length > 80 ? "..." : "")}
                  </p>
                  {blog.text.length > 80 && (
                    <button
                      className="text-purple-600 mt-2 text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReadMore(blog.id);
                      }}
                    >
                      {expanded === blog.id ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Popup */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative border-t-4 border-purple-600"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedBlog(null)}
            >
              ✕
            </button>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-56 object-cover rounded-lg"
            />
            <h2 className="text-xl font-bold mt-4 text-purple-700">
              {selectedBlog.title}
            </h2>
            <p className="text-gray-700 mt-2">{selectedBlog.text}</p>
          </motion.div>
        </div>
      )}

      {/* Create Blog Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative border-t-4 border-purple-600"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setIsFormOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              Create New Blog
            </h2>

            <input
              type="text"
              placeholder="Blog Title"
              className="w-full border p-2 rounded mb-3"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
            />

            <textarea
              placeholder="Write your blog content..."
              rows={4}
              className="w-full border p-2 rounded mb-3"
              value={newBlog.text}
              onChange={(e) => setNewBlog({ ...newBlog, text: e.target.value })}
            />

            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded mb-3"
              onChange={(e) =>
                setNewBlog({
                  ...newBlog,
                  image: e.target.files ? e.target.files[0] : null,
                })
              }
            />

            <button
              onClick={handleCreateBlog}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-purple-700 w-full"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
