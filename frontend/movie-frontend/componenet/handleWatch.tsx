"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const api_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const GUEST_LIMIT = 3;
const GUEST_KEY = "guest_watched_movies";

// Helper function for guest users
function canWatch(tmdbId: number): boolean {
  const watched: number[] = JSON.parse(localStorage.getItem(GUEST_KEY) || "[]");

  // Already watched → allow
  if (watched.includes(tmdbId)) return true;

  // Limit reached
  if (watched.length >= GUEST_LIMIT) return false;

  // Add new movie
  watched.push(tmdbId);
  localStorage.setItem(GUEST_KEY, JSON.stringify(watched));
  return true;
}

// Main hook
export function HandleWatch() {
  const router = useRouter();

  const handleWatch = async (tmdbId: number) => {
    try {
      if (!api_url) {
        toast.error("Server configuration error");
        return;
      }

      const token = localStorage.getItem("token");

      // Guest user logic
      if (!token) {
        const allowed = canWatch(tmdbId);

        if (!allowed) {
          toast.error("Free limit reached. Please sign up");
          router.push("/signup");
          return;
        }

        // Guest allowed → go to trailer
        router.push(`/watch/${tmdbId}/trailer`);
        return;
      }

      // Logged-in user → call backend
      await axios.post(
        `${api_url}/api/movie/watch`,
        { tmdbId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 8000,
        }
      );

      router.push(`/watch/${tmdbId}/trailer`);
    } catch (error: any) {
      // Network / CORS error
      if (!error.response) {
        toast.error("Network error. Please try again.");
        return;
      }

      // Free limit reached
      if (error.response.status === 403) {
        toast.error(error.response.data?.message || "Upgrade your plan");
        router.push("/subscription");
        return;
      }

      // Unauthorized
      if (error.response.status === 401) {
        router.push("/login");
        return;
      }

      console.error("Watch error:", error);
      toast.error("Something went wrong");
    }
  };

  return handleWatch;
}
