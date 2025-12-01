// confirm-plan/page.tsx
"use client";
import React, { useState, Suspense } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, Package, PackageCheck, ShieldCheck } from "lucide-react";

function PageContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (typeof window !== "undefined" && plan) {
        localStorage.setItem("wean_active_plan", plan);
        localStorage.setItem("wean_plan_start_date", new Date().toISOString());
      }

      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Confirm Subscription
          </h1>
          <p className="text-gray-600 mb-6">
            We&apos;ll send the invoice to{" "}
            <span className="font-semibold text-[#152039]">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
            .
          </p>

          {success ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <PackageCheck className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h2 className="text-lg font-semibold text-green-700">
                Package Activated!
              </h2>
              <p className="text-sm text-green-600 mb-4">
                Enjoy your <span className="font-semibold">{plan}</span> plan 🎉
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="mt-2 px-5 py-2 bg-[#152039] text-white rounded-lg hover:bg-blue-800 transition"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Form Input Dummy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.fullName || ""}
                  required
                  className="w-full px-4 py-2 border rounded-lg text-black"
                />
              </div>

              {plan && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-center gap-3">
                  <Package className="text-blue-600 w-5 h-5" />
                  <span className="font-semibold text-blue-900">{plan}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#152039] text-white font-medium py-3 rounded-lg shadow hover:bg-blue-800 transition disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm & Activate"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
