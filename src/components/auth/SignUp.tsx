import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
import CircleAnimation from '../common/CircleAnimation';
import ImageCarousel from '../common/ImageCarousel';
import Img1 from '../../assets/img/1.png';
import Img2 from '../../assets/img/2.png';
import Img3 from '../../assets/img/3.png';
import Img4 from '../../assets/img/4.jpg';
import logo from "../../assets/img/logo.png";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    acceptTerms: false
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  const carouselItems = [
    { image: Img1, title: 'Welcome Back', description: 'Log in to your account to manage your pets and events.' },
    { image: Img2, title: 'Missed You', description: 'Your pets have been waiting for your return!' },
    { image: Img3, title: 'Stay Connected', description: 'Keep up with the latest events and pet care tips.' },
    { image: Img4, title: 'Pet Community', description: 'Join thousands of pet owners sharing their experiences.' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      setStatusType('error');
      setStatusMessage('You must accept the Terms and Conditions.');
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch("https://argosmob.com/being-petz/public/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatusType('success');
        setStatusMessage('Signup Successful! Redirecting...');
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setStatusType('error');
        setStatusMessage(data.message || 'Signup Failed. Please try again.');
      }
    } catch (error) {
      setStatusType('error');
      setStatusMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side with purple gradient and promo content */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-400 flex-col items-center justify-center p-10 text-white relative overflow-hidden">
        <CircleAnimation />
        <div className="z-10 flex flex-col items-center">
          <img src={logo} alt="Being Petz Logo" className="w-48 mb-10" />
          <div className="backdrop-blur-sm rounded-lg w-72 h-32">
            <ImageCarousel items={carouselItems} interval={5000} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Right side with sign up form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-8">Enter your details to access admin panel.</p>

          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="First Name"
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Last Name"
                required
              />
            </div>

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
            <div className="mb-6">
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

            {/* Terms */}
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label htmlFor="acceptTerms" className="text-gray-700">
                I accept{' '}
                <span className="text-purple-600 hover:underline">
                  Terms and Conditions
                </span>
              </label>
            </div>

            {/* Status Message */}
            {statusMessage && (
              <p className={`mb-4 text-center font-medium ${statusType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {statusMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-60"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already Have Account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline">
                Log In
              </Link>
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <a href="#" className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition duration-300">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition duration-300">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="p-2 bg-purple-100 rounded-md text-purple-600 hover:bg-purple-200 transition duration-300">
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
