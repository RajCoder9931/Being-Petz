import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, SendIcon } from 'lucide-react';
import CircleAnimation from '../common/CircleAnimation';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send a password reset email
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };
  return <div className="flex min-h-screen w-full">
      {/* Left side with purple gradient */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-400 flex-col items-center justify-center p-10 text-white relative overflow-hidden">
        <CircleAnimation />
        <div className="z-10 flex flex-col items-center">
          <img src="https://i.ibb.co/JHQgR7r/being-petz-logo.png" alt="Being Petz Logo" className="w-48 mb-10" />
          <div className="bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden w-72 h-32 mb-8">
            <img src="https://images.unsplash.com/photo-1560743641-3914f2c45636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Pet with owner" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Recover Your Account
          </h2>
          <p className="text-center max-w-xs">
            We'll help you reset your password and get back to caring for your
            pets.
          </p>
        </div>
      </div>
      {/* Right side with forgot password form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/login" className="flex items-center text-purple-600 mb-8 hover:underline">
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Login
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Forgot Password
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          {!isSubmitted ? <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email address
                </label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter your email" required />
              </div>
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center">
                <SendIcon size={16} className="mr-2" />
                Send Reset Link
              </button>
            </form> : <div className="bg-green-50 border border-green-200 rounded-md p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to{' '}
                <span className="font-medium">{email}</span>. Please check your
                inbox and follow the instructions.
              </p>
              <Link to="/login" className="text-purple-600 hover:underline font-medium">
                Return to Login
              </Link>
            </div>}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link to="/login" className="text-purple-600 hover:underline">
                Log In
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              Don't have an account?{' '}
              <Link to="/" className="text-purple-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default ForgotPassword;