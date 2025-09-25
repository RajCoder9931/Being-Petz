// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import CircleAnimation from '../common/CircleAnimation';
// import ImageCarousel from '../common/ImageCarousel';
// import Img1 from '../../assets/login1.jpg';
// import Img2 from '../../assets/login2.jpg';
// import Img3 from '../../assets/login3.jpg';
// import Img4 from '../../assets/login4.jpg';
// import logo from "../../assets/img/logo.png";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     otp: '',
//     rememberMe: false
//   });

//   const [message, setMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [serverOtp, setServerOtp] = useState<string | null>(null); // 🔹 store API OTP
//   const [userData, setUserData] = useState<any>(null); // 🔹 store user details

//   const carouselItems = [
//     { image: Img1, title: 'Welcome Back', description: 'Log in to your account to manage your pets and events.' },
//     { image: Img2, title: 'Missed You', description: 'Your pets have been waiting for your return and we are here to help.' },
//     { image: Img3, title: 'Stay Connected', description: 'Keep up with the latest events and pet care tips.' },
//     { image: Img4, title: 'Pet Community', description: 'Join thousands of pet owners sharing their experiences.' }
//   ];

//   // handle input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   // Send OTP
//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       setMessage("Please enter email before requesting OTP.");
//       return;
//     }
//     setLoading(true);
//     setMessage(null);

//     try {
//       const response = await fetch("https://argosmob.com/being-petz/public/api/v1/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: formData.email })
//       });

//       const data = await response.json();

//       if (response.ok && data.status) {
//         setMessage("OTP sent successfully!");
//         setOtpSent(true);
//         setServerOtp(String(data.otp)); // 🔹 Save OTP from API
//         setUserData(data.user); // 🔹 Save user data
//         console.log("Server OTP:", data.otp); // Debug
//       } else {
//         setMessage(data.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("OTP error:", error);
//       setMessage("Something went wrong while sending OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // // handle login submit
//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setMessage(null);

//   //   setTimeout(() => {
//   //     if (formData.otp === serverOtp) {
//   //       setMessage("Login successful!");

//   //       if (userData) {
//   //         localStorage.setItem("user", JSON.stringify(userData));
//   //       }
//   //       localStorage.setItem("token", "dummy-token"); // 🔹 Agar API token provide karti hai to yahan set karna

//   //       window.location.href = "/home";
//   //     } else {
//   //       setMessage("Wrong OTP. Please try again.");
//   //     }
//   //     setLoading(false);
//   //   }, 500);
//   // };

//   // handle login submit
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setLoading(true);
//   setMessage(null);

//   try {
//     const response = await fetch("https://argosmob.com/being-petz/public/api/v1/auth/login-verify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: formData.email, otp: formData.otp }),
//     });

//     const data = await response.json();

//     if (response.ok && data.status) {
//       setMessage("Login successful!");
//       localStorage.setItem("user", JSON.stringify(data.user));
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }
//       window.location.href = "/home";
//     } else {
//       setMessage(data.message || "Wrong OTP. Please try again.");
//     }
//   } catch (error) {
//     console.error("Login verify error:", error);
//     setMessage("Something went wrong while verifying OTP.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="flex min-h-screen w-full">
//       {/* Left side */}
//       <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-400 flex-col items-center justify-center p-10 text-white relative overflow-hidden">
//         <CircleAnimation />
//         <div className="z-10 flex flex-col items-center">
//           <img src={logo} alt="Being Petz Logo" className="w-48 mb-10" />
//           <div className="rounded-lg overflow-hidden w-72">
//             <ImageCarousel items={carouselItems} interval={5000} className="w-full" />
//           </div>
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-6">
//         <div className="w-full max-w-md">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Beingpetz Family</h1>
//           <p className="text-gray-600 mb-4">Please enter your email and verify with OTP to continue.</p>

//           {message && (
//             <div className={`mb-4 text-sm font-medium ${message.includes("success") || message.includes("Success") ? "text-green-600" : "text-red-600"}`}>
//               {message}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             {/* Email + Send OTP */}
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
//               <div className="flex">
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter email"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   disabled={loading}
//                   className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 rounded-r-md transition duration-300"
//                 >
//                   {loading ? "Sending..." : "Send OTP"}
//                 </button>
//               </div>
//             </div>

//             {/* OTP */}
//             {otpSent && (
//               <div className="mb-4">
//                 <label htmlFor="otp" className="block text-gray-700 mb-2">OTP</label>
//                 <input
//                   type="text"
//                   id="otp"
//                   name="otp"
//                   value={formData.otp}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter OTP"
//                   required
//                 />
//               </div>
//             )}

//             {/* Remember me / Terms */}
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="rememberMe"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 <label htmlFor="rememberMe" className="text-gray-700">
//                   Accept Terms and Conditions <span className='text-purple-600 hover:underline'>Read Now</span>
//                 </label>
//               </div>
//             </div>

//             {/* Submit */}
//             {otpSent && (
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
//               >
//                 {loading ? "Logging in..." : "Log In"}
//               </button>
//             )}
//           </form>

//           {/* Footer */}
//           <div className="mt-8 text-center">
//             <p className="text-gray-600">
//               Don't have an account?{' '}
//               <Link to="/Signup" className="text-purple-600 hover:underline">Sign Up here!</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


// something check 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CircleAnimation from '../common/CircleAnimation';
import ImageCarousel from '../common/ImageCarousel';
import Img1 from '../../assets/login1.jpg';
import Img2 from '../../assets/login2.jpg';
import Img3 from '../../assets/login3.jpg';
import Img4 from '../../assets/login4.jpg';
import logo from "../../assets/img/logo.png";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    rememberMe: false
  });

  const [userId, setUserId] = useState<string | null>(null);  
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const carouselItems = [
    { image: Img1, title: 'Welcome Back', description: 'Log in to your account to manage your pets and events.' },
    { image: Img2, title: 'Missed You', description: 'Your pets have been waiting for your return and we are here to help.' },
    { image: Img3, title: 'Stay Connected', description: 'Keep up with the latest events and pet care tips.' },
    { image: Img4, title: 'Pet Community', description: 'Join thousands of pet owners sharing their experiences.' }
  ];

  // handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!formData.email) {
      setMessage("Please enter email before requesting OTP.");
      return;
    }
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://argosmob.com/being-petz/public/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email })
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setMessage("OTP sent successfully!");
        setOtpSent(true);

        // ✅ Save user_id from response
        setUserId(data.user_id || data.user?.id || null);
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("OTP error:", error);
      setMessage("Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // handle login submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setMessage("User ID not found. Please request OTP again.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("https://argosmob.com/being-petz/public/api/v1/auth/register-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, otp: formData.otp }),  
      });

      const data = await response.json();

      if (response.ok && data.status) {
        setMessage("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        window.location.href = "/home";
      } else {
        setMessage(data.message || "Wrong OTP. Please try again.");
      }
    } catch (error) {
      console.error("Login verify error:", error);
      setMessage("Something went wrong while verifying OTP.");
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Beingpetz Family</h1>
          <p className="text-gray-600 mb-4">Please enter your email and verify with OTP to continue.</p>

          {message && (
            <div className={`mb-4 text-sm font-medium ${message.includes("success") || message.includes("Success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email + Send OTP */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email address</label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter email"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 rounded-r-md transition duration-300"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </div>

            {/* OTP */}
            {otpSent && (
              <div className="mb-4">
                <label htmlFor="otp" className="block text-gray-700 mb-2">OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter OTP"
                  required
                />
              </div>
            )}

            {/* Remember me / Terms */}
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
                <label htmlFor="rememberMe" className="text-gray-700">
                  Accept Terms and Conditions <span className='text-purple-600 hover:underline'>Read Now</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            {otpSent && (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            )}
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/Signup" className="text-purple-600 hover:underline">Sign Up here!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
