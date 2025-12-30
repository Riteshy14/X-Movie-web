'use client';

import Navbar from "@/componenet/Navbar";
import { userProfile } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, CreditCard, Star, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function UserProfile() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{
    name?: string;
    email?: string;
    Subscriptions?: "free" | "premium" | null;
  }>({});
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (!storedToken) {
      router.push("/login");
      return;
    }

    userProfile(storedToken)
      .then((data) => setUser(data))
      .catch((err) => {
        console.log("error", err.message);
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, []);

  // Subscription badge
  const subscriptionLabel = user.Subscriptions
    ? user.Subscriptions === "free"
      ? "Free Plan"
      : "Premium Plan"
    : "No Subscription";

  const subscriptionColor = user.Subscriptions
    ? user.Subscriptions === "free"
      ? "bg-gray-700 text-gray-100"
      : "bg-yellow-400 text-black font-bold shadow-lg"
    : "bg-red-600 text-white";

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("plan");
    toast.success('logout successfully')
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col">
      <Navbar
        logo="white"
        navicon="white"
        profilebg="black"
        profiletext="black"
        show="visible"
      />

      <div className="flex flex-1 items-center justify-center p-4">
        {/* Profile Card */}
        <div className="relative bg-gray-900 text-white rounded-3xl shadow-2xl w-full max-w-sm p-6 pt-15 pb-6 overflow-hidden transform hover:scale-105 transition-transform duration-500">
          
          {/* Neon Glowing Circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-purple-500 opacity-40 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-red-500 opacity-40 blur-3xl animate-pulse"></div>

          {/* Avatar */}
          <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-5xl font-extrabold shadow-lg ring-4 ring-purple-400">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          {/* Name */}
          <h2 className="text-3xl text-center pt-4 pb-4 font-extrabold mb-4 tracking-wide text-purple-300">
            {user.name}
          </h2>

          {/* Email */}
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 mb-3 hover:bg-gray-700 transition-colors">
            <Mail className="text-purple-400" size={20} />
            <span className="font-semibold text-gray-300">Email:</span>
            <span className="text-gray-100">{user.email}</span>
          </div>

          {/* Subscription */}
          <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2 mb-4 hover:bg-gray-700 transition-colors">
            <CreditCard className="text-purple-400" size={20} />
            <span className="font-semibold text-gray-300">Subscription Plan:</span>
            <span
              className={`ml-2 px-4 py-1 rounded-full text-sm flex items-center gap-1 ${subscriptionColor}`}
            >
              {user.Subscriptions === "premium" && <Star size={16} className="text-yellow-500 animate-pulse" />}
              {subscriptionLabel}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg py-2 px-4 transition-colors shadow-lg"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
