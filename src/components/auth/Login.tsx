import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
import CircleAnimation from '../common/CircleAnimation';
import ImageCarousel from '../common/ImageCarousel';
import Img1 from '../../assets/img/1.webp';
import Img2 from '../../assets/img/2.avif';
import Img3 from '../../assets/img/3.webp';
import Img4 from '../../assets/img/4.webp';
import logo from "../../assets/img/logo.png";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: '',
    rememberMe: false
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const carouselItems = [
    { image: Img1, title: 'Welcome Back', description: 'Log in to your account to manage your pets and events.' },
    { image: Img2, title: 'Missed You', description: 'Your pets have been waiting for your return!' },
    { image: Img3, title: 'Stay Connected', description: 'Keep up with the latest events and pet care tips.' },
    { image: Img4, title: 'Pet Community', description: 'Join thousands of pet owners sharing their experiences.' }
  ];
 // the changet the image on using state 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };


  // Submit login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://argosmob.com/being-petz/public/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          otp: formData.otp
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(" Login successful!");

        // its print the data in console
        console.log("User Data:", data);

        // token store
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // data of user  
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        window.location.href = "/home";
      } else {
        setMessage(data.message || " Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(" Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen w-full">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-400 flex-col items-center justify-center p-10 text-white relative overflow-hidden">
        <CircleAnimation />
        <div className="z-10 flex flex-col items-center">
          <img src={logo} alt="Being Petz Logo" className="w-48 mb-10" />
          <div className="rounded-lg overflow-hidden w-72">
            <ImageCarousel items={carouselItems} interval={5000} className="w-full" />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Log In</h1>
          <p className="text-gray-600 mb-4">Enter your details to access your account</p>

          {message && (
            <div className={`mb-4 text-sm font-medium ${message.includes("Success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Password"
                required
              />
            </div>


            {/* Remember me + forgot password */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-purple-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/Signup" className="text-purple-600 hover:underline">Sign Up</Link>
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <a href="#" className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition duration-300"><FacebookIcon size={20} /></a>
              <a href="#" className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition duration-300"><TwitterIcon size={20} /></a>
              <a href="#" className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition duration-300"><InstagramIcon size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
