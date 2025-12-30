'use client';

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/componenet/Navbar";
import {toast} from 'react-toastify'

const api_url = process.env.NEXT_PUBLIC_BACKEND_URL;

console.log("url ",api_url)
async function signup(email: string, password: string) {
  try {
    const res =await axios.post(`${api_url}/api/user/signin`, {
      email,
      password,
    });

    console.log("full response", res.data)

    if(res.data){
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('plan',res.data.plan)
      return true;
    }
    return false; // Indicate that signup was successful
  } catch (error:any) {
    console.error("Error during signup:", error.message);
    return false; // Indicate that signup failed
  }
}

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize the router for navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // Validate input fields
    if ( !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    // Call the signup function
    const success = await signup( email, password);

    if (success) {
      const plan = localStorage.getItem('plan')
      if(plan){
        toast.success("login successful!");
        router.push('/')
      }else{
        router.push("/subscription"); // Redirect to the homepage after successful signup
      }
    } else {
      setError("rror with the signup. Please try again.");
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
        <Navbar logo="red-500" navicon="red-600" profilebg="black" profiletext="balck" show="hidden"/>
      <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-5 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold pb-5">Login</h2>
        <form onSubmit={handleSubmit}>
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
              className="text-white bg-purple-600 active:scale-90 active:shadow-inner hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
            >
              Register
            </button>
          </div>

          {/* Already have an account */}
          <div className="flex pt-3 items-center text-sm">
            <p>Already have an account?</p>
            <p onClick={()=> router.push('/signup')} className="underline cursor-pointer ml-1">Sign up</p>
          </div>
        </form>
      </div>
    </div>
  );
}
