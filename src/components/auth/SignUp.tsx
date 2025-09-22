import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CircleAnimation from '../common/CircleAnimation';
import ImageCarousel from '../common/ImageCarousel';
import Img1 from '../../assets/img/1.webp';
import Img2 from '../../assets/img/2.avif';
import Img3 from '../../assets/img/3.webp';
import Img4 from '../../assets/img/4.webp';
import logo from "../../assets/img/logo.png";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    acceptTerms: false
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  // OTP States
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); // tracks OTP verification

  const carouselItems = [
    { image: Img1, title: 'Welcome Back', description: 'Log in to your account to manage your pets and events.' },
    { image: Img2, title: 'Missed You', description: 'Your pets have been waiting for your return!' },
    { image: Img3, title: 'Stay Connected', description: 'Keep up with the latest events and pet care tips.' },
    { image: Img4, title: 'Pet Community', description: 'Join thousands of pet owners sharing their experiences.' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // Handle Signup
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
        }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setUserId(data.data.id);       // Save user ID for OTP verification
        setOtpModalOpen(true);         // Open OTP modal
        setStatusType('success');
        setStatusMessage('OTP sent to your email. Please verify to complete registration.');
      } else {
        setStatusType('error');
        setStatusMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setStatusType('error');
      setStatusMessage('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async () => {
    if (!otp || !userId) return;

    setLoading(true);
    try {
      const response = await fetch(
        "https://argosmob.com/being-petz/public/api/v1/auth/register-verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, otp }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        setOtpVerified(true);           // OTP verified successfully
        setOtpModalOpen(false);         // close modal
        alert("User verified successfully! You can now log in.");
        navigate("/login");
      } else {
        alert(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (!userId) return;
    setResendLoading(true);

    try {
      const response = await fetch(
        "https://argosmob.com/being-petz/public/api/v1/auth/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        alert("OTP resent to your email.");
      } else {
        alert(data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      alert("Something went wrong while resending OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-400 flex-col items-center justify-center p-6 text-white relative overflow-hidden">
        <CircleAnimation />
        <div className="z-10 flex flex-col items-center">
          <img src={logo} alt="Being Petz Logo" className="w-48 mb-10" />
          <div className="backdrop-blur-sm rounded-lg w-72  ">
            <ImageCarousel items={carouselItems} interval={5000} className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600 mb-8">Welcome! Please enter your information below and get started.</p>

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
                I accept Terms and Conditions {' '}
                <span className="text-purple-600 hover:underline">Read Now</span>
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
              disabled={loading || otpModalOpen || otpVerified} // Prevent signup until OTP verified
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 disabled:opacity-60"
            >
              {loading ? "Signing Up..." : "Create Account"}
            </button>  
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already Have An Account?{' '}
              <Link to="/login" className="text-purple-600 hover:underline">Login here!</Link>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {otpModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify Email</h2>
            <p className="text-gray-600 mb-4">Enter the OTP sent to your registered email.</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="text-sm text-purple-600 hover:underline"
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setOtpModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;


 