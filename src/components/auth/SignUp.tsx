import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
import CircleAnimation from '../common/CircleAnimation';
import ImageCarousel from '../common/ImageCarousel';
import Img1 from '../../assets/img/1.png';
import Img2 from '../../assets/img/2.png';
import Img3 from '../../assets/img/3.png';
import Img4 from '../../assets/img/4.jpg';
import logo from "../../assets/img/logo.png";
const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    acceptTerms: false
  });
  const carouselItems = [
    {
      image: Img1,
      title: 'Welcome Back',
      description: 'Log in to your account to manage your pets and events.'
    },
    {
      image: Img2,
      title: 'Missed You',
      description: 'Your pets have been waiting for your return!'
    },
    {
      image: Img3,
      title: 'Stay Connected',
      description: 'Keep up with the latest events and pet care tips.'
    },
    {
      image: Img4,
      title: 'Pet Community',
      description: 'Join thousands of pet owners sharing their experiences.'
    }
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    console.log('Form submitted:', formData);
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };
  return <div className="flex min-h-screen w-full">
      {/* Left side with purple gradient and promo content */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-400 flex-col items-center justify-center p-10 text-white relative overflow-hidden">
        <CircleAnimation />
        <div className="z-10 flex flex-col items-center">
          <img src={logo}  alt="Being Petz Logo" className="w-48 mb-10" />
          <div className=" backdrop-blur-sm rounded-lg border-radius-lg   w-72 h-32">
            <ImageCarousel items={carouselItems} interval={5000} className="w-full h-full" />
          </div>
        </div>
      </div>
      {/* Right side with sign up form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-8">
            Enter your email address and password to access admin panel.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 mb-2">
                Your Full Name
              </label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Your Full Name" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email address
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter email" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Password" required />
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="mr-2" required />
              <label htmlFor="acceptTerms" className="text-gray-700">
                I accept{' '}
                <span className="text-purple-600 hover:underline">
                  Terms and Conditions
                </span>
              </label>
            </div>
            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Sign Up
            </button>
          </form>
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
    </div>;
};
export default SignUp;