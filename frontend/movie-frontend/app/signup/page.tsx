'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/componenet/Navbar";
import { toast } from "react-toastify";

const api_url = process.env.NEXT_PUBLIC_BACKEND_URL;

async function signup(name: string, email: string, password: string) {
  try {
    const res =await axios.post(`${api_url}/api/user/signup`, {
      name,
      email,
      password,
    });

    if(res.data){
      localStorage.setItem('token',res.data.token)
      return true;
    }
    return false; // Indicate that signup was successful
  } catch (error) {
    console.error("Error during signup:", error);
    return false; // Indicate that signup failed
  }
}

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize the router for navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validate input fields
    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    // Call the signup function
    const success = await signup(name, email, password);

    if (success) {
      toast.success("Signup successful!");
      router.push("/subscription"); // Redirect to the homepage after successful signup
    } else {
      toast.error("There was an error with the signup. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
        <Navbar logo="red-500" navicon="red-600" profilebg="black" profiletext="black" show="hidden"/>
      <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold pb-5">SignUp</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Your name</label>
            <input
              type="text"
              id="name"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Your email</label>
            <input
              type="email"
              id="email"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="xyz@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Your password</label>
            <input
              type="password"
              id="password"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 pb-5">{error}</p>}

          {/* Submit Button */}
          <div className="flex-row justify-items-center mb-4">
            <button
              type="submit"
              className="text-white active:scale-90 active:shadow-inner bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
            >
              Register
            </button>
          </div>

          {/* Already have an account */}
          <div className="flex pt-3 items-center text-sm">
            <p>Already have an account?</p>
            <p onClick={()=> router.push('/login')} className="underline cursor-pointer ml-1">Sign in</p>
          </div>
        </form>
      </div>
    </div>
  );
}
