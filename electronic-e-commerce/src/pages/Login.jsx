import React from "react";
import { HelpCircle } from "lucide-react";
import { Link } from 'react-router-dom';
 import { loginWithGoogle } from '../lib/googleAuth';

export default function Login() {
  
  const handleLogin = async () => {
     // Gọi hàm đăng nhập (đã được import hoặc định nghĩa ở trên)
     try {
       await loginWithGoogle();
     } catch (error) {
       console.error("Login failed", error);
     }
  }

  return (
    // Main container
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col"> 
      
      {/* Top Navigation/Header */}
      <nav className="p-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ul className="flex justify-between items-center">
            {/* Samsung Account Text */}
            <li className="text-xl font-semibold text-gray-800">
              Samsung Account
            </li>
            {/* Help Icon */}
            <li className="text-gray-500 hover:text-gray-800 cursor-pointer transition">
              <HelpCircle className="w-6 h-6" />
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex justify-center pt-20 pb-10 flex-grow"> 
        <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-lg">
          
          {/* Title Section */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-normal text-center mb-2">
              One account. Any device.
            </h2>
            <p className="text-base text-gray-600">
              Just for you.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to get started
            </p>
          </div>

          {/* Form / Input Section */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              {/* Email Input Field */}
              <div className="relative border-b border-gray-300 focus-within:border-gray-900">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  className="block w-full appearance-none bg-transparent pt-3 pb-1 focus:outline-none peer"
                />
                <label
                  htmlFor="email"
                  className="absolute top-0 left-0 pt-1 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                >
                  Email address
                </label>
              </div>
            </div>

            {/* Remember My ID Checkbox */}
            <div className="flex items-center mt-2">
             <input
              id="remember-id"
              name="remember-id"
              type="checkbox"
              className="
                h-4 w-4 
                appearance-none 
                rounded-full 
                border border-gray-300
                
                checked:bg-blue-600 
                checked:border-blue-600
                
                checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22white%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]
                checked:bg-center
                checked:bg-no-repeat
                
                cursor-pointer
              "
              />
             <label htmlFor="remember-id" className="ml-2 block text-sm text-gray-600">
               Remember my ID
             </label>
            </div>

            {/* Next Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent 
              rounded-md shadow-sm text-base font-medium text-white 
              bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] transition duration-150 ease-in-out"
            >
              <p className="text-black">Next</p>
            </button>
          </form>

          {/* Links Section */}
          <div className="space-y-2 mt-8 text-left"> 
            
            <Link 
                to="/find-id" 
                className="block text-sm text-black hover:text-blue-800 cursor-pointer transition duration-150 w-fit"
            >
              <p className = "text-black hover:underline">Find ID</p>
            </Link>
            
            <Link 
                to="/signup" 
                className="block text-sm text-black hover:text-blue-800 cursor-pointer transition duration-150 w-fit"
            >
               <p className = "text-black hover:underline">Create account</p>
            </Link>
          </div>

          {/* Sign in with Google Button */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out hover:scale-[1.01]"
              onClick={handleLogin}
            >
              <img 
                src="https://img.icons8.com/color/16/000000/google-logo.png" 
                alt="Google logo" 
                className="w-4 h-4 mr-2" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/16x16/cccccc/000000?text=G" }}
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="w-full bg-gray-100 pb-4 pt-8">
        <div className="max-w-7xl mx-auto px-4 text-xs text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-end">
            
            <div className="flex flex-wrap space-x-4 mb-2 md:mb-0">
                <a href="#" className="hover:underline">Terms and Conditions</a>
                <a href="#" className="hover:underline">Samsung account Privacy Notice</a>
                <a href="#" className="hover:underline">Notice</a>
                <a href="#" className="hover:underline">Contact us</a>
            </div>
            
            <div className="text-right mt-2 md:mt-0 flex flex-col gap-2">
                <p className = "font-extrabold text-xl">Samsung Account</p>
                <p className="whitespace-nowrap">Copyright &copy; 1995-2025 All right serve</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}