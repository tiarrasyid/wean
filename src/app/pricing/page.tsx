"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

function Page() {
  const router = useRouter();

  const plans = [
    {
      name: "Wean Free",
      description:
        "Start with the essentials. Perfect for beginners who want quick scans and basic insights. Upgrade anytime as your needs grow.",
      price: "Rp0",
      note: "/month for one person",
      benefits: [
        "Limited scans (10/month)",
        "Basic analytics",
        "Standard support",
      ],
      buttonColor: "bg-gray-600 hover:bg-gray-700",
      highlight: false,
    },
    {
      name: "Wean Pro",
      description:
        "Unlock unlimited scans and advanced tools. Ideal for developers and small teams who need faster insights and premium features.",
      price: "Rp250.000",
      note: "/month for one person",
      benefits: [
        "Unlimited scans",
        "Early access to new features",
        "Exclusive tools",
        "Priority support",
      ],
      buttonColor: "bg-blue-900 hover:bg-blue-800",
      highlight: true,
    },
    {
      name: "Wean Enterprise",
      description:
        "Priority support, faster processing, and tailored solutions. Perfect for companies that need reliability and scale.",
      price: "Contact Us",
      note: "Contact us for more details",
      benefits: [
        "All Pro features",
        "Real-time dedicated support",
        "Dedicated queue (priority processing)",
        "Custom integrations",
      ],
      buttonColor: "bg-blue-900 hover:bg-blue-800",
      highlight: false,
    },
  ];

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
          Instant Website Analysis, Flexible Plans for Every Need
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Start free, upgrade when you’re ready, and keep your code clean
          without breaking the bank.
        </p>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl shadow-md p-8 flex flex-col justify-between transition-transform hover:scale-105 ${
                plan.highlight ? "ring-2 ring-blue-900 shadow-lg" : ""
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-0 right-0 bg-blue-900 text-white text-xs font-semibold px-3 py-1 rounded-md">
                  Recommended
                </span>
              )}

              <div>
                <h2 className="text-xl font-semibold mb-2 text-black text-left">
                  {plan.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 text-left">
                  {plan.description}
                </p>
                <div className="text-3xl font-bold text-black text-left">
                  {plan.price}
                </div>
                <div className="text-sm text-gray-500 mb-6 text-left">
                  {plan.note}
                </div>

                {/* Button ke Dashboard */}
                <button
                  onClick={() => router.push("/dashboard")}
                  className={`${plan.buttonColor} text-white font-medium px-4 py-2 rounded-md w-full shadow`}
                >
                  {plan.name === "Wean Free" ? "Start" : "Start"}
                </button>
              </div>

              <div className="mt-8 text-left">
                <p className="font-semibold mb-2 text-black">Benefits:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Page;
