import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/sidebar";

type Blog = {
  id: number;
  title: string;
  short_description: string;
  content: string;
  image: string;
};

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

      // dummy imgaes 
  const petDummyImages = [
    "https://placedog.net/600/400?id=1",
    "https://placedog.net/600/400?id=2",
    "https://placekitten.com/600/400",
    "https://placedog.net/600/400?id=3",
    "https://placekitten.com/601/401",
  ];

  // Random pet image
  const getRandomPetImage = () =>
    petDummyImages[Math.floor(Math.random() * petDummyImages.length)];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleReadMore = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  // Fetch all blogs with pagination
  const fetchAllBlogs = async () => {
    let allBlogs: Blog[] = [];
    let page = 1;
    let lastPage = 1;

    try {
      do {
        const res = await fetch(
          `https://argosmob.com/being-petz/public/api/v1/blogs?page=${page}`
        );
        if (!res.ok) {
          throw new Error(`Error fetching page ${page}: ${res.status}`);
        }
        const data = await res.json();

        if (data.status && data.blogs?.data) {
          const pageBlogs = data.blogs.data.map((blog: any) => ({
            id: blog.id,
            title: blog.title,
            short_description: blog.short_description,
            content: blog.content,
            image: blog.image
              ? `https://argosmob.com/being-petz/public/${blog.image}`
              : getRandomPetImage(),  // random images
          }));

          allBlogs = allBlogs.concat(pageBlogs);

          if (data.blogs.last_page) {
            lastPage = data.blogs.last_page;
          } else {
            break;
          }
        } else {
          break;
        }

        page += 1;
      } while (page <= lastPage);

      setBlogs(allBlogs);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  return (
    <div className="flex min-h-screen bg-purple-50 pt-12">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />

        {/* Blogs Section */}
        <div className="p-6">
          {/* Top Banner */}
          <div
            className="relative w-full h-40 sm:h-44 md:h-48 flex items-center justify-center rounded-xl overflow-hidden mb-6"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/19/55/55/195555f1a337b0ff854a97ec3abf6545.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative flex items-center space-x-3">
              <FaPaw className="text-white text-2xl mr-2 drop-shadow-md" />
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                Pets Blogs
              </h1>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-600">Loading blogs...</p>
          ) : error ? (
            <p className="text-center text-red-600">Error: {error}</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-600">No blogs found</p>
          ) : (
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
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getRandomPetImage();
                    }}
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-purple-700">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2">
                      {expanded === blog.id
                        ? blog.content
                        : blog.short_description}
                    </p>
                    <button
                      className="text-purple-600 mt-2 text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleReadMore(blog.id);
                      }}
                    >
                      {expanded === blog.id ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
              onError={(e) => {
                (e.target as HTMLImageElement).src = getRandomPetImage();
              }}
            />
            <h2 className="text-xl font-bold mt-4 text-purple-700">
              {selectedBlog.title}
            </h2>
            <p className="text-gray-700 mt-2">{selectedBlog.content}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
