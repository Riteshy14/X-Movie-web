"use client";

import Navbar from "@/componenet/Navbar";
import { PricingCard } from "@/componenet/Pricing";
import { upgradePlan } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Subscription() {
  const router = useRouter();

  const handleUpgrade = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const x= await upgradePlan(token)
      toast.success("Upgrade successful!");
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
        "Something went wrong while upgrading."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-16">
      <Navbar
        logo="white"
        navicon="white"
        profilebg="black"
        profiletext="black"
        show="visible"
      />

      <h1 className="text-5xl font-bold text-center mb-14 text-[#C2A68D]">
        Choose Your Plan
      </h1>

      <p className="text-2xl font-semibold text-center mb-10">
        <span className="text-3xl font-bold text-red-500">Note: </span>
        No real money involved, just for demo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <PricingCard
          title="Free"
          price="$0"
          description="Try before you upgrade"
          features={[
            "Watch up to 2 movies",
            "Trailer access",
            "Standard quality",
          ]}
          buttonText="Current Plan"
          highlighted
          onClick={() => {
            toast.success("Free plan")
            router.push('/')
          }}
        />

        <PricingCard
          title="Premium"
          price="$9 / month"
          description="For true movie lovers"
          features={[
            "Unlimited movies",
            "Full HD & 4K",
            "No ads",
            "Early access",
          ]}
          buttonText="Choose Premium"
          highlighted
          onClick={handleUpgrade}
        />
      </div>
    </div>
  );
}
