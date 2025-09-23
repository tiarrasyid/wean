"use client";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useUser } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, Package, PackageCheck, ShieldCheck } from "lucide-react";

function Page() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan"); // paket dari query
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi kirim email + aktivasi otomatis
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Confirm Your Subscription 
          </h1>
          <p className="text-gray-600 mb-6">
            We’ll send the invoice automatically to your email{" "}
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
                Your invoice has been sent. Enjoy your{" "}
                <span className="font-semibold">{plan}</span> plan 🎉
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
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.fullName || ""}
                  required
                  className="text-black w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#152039] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
                  <Mail className="w-5 h-5 text-gray-500 mr-2" />
                  <input
                    type="email"
                    value={user?.primaryEmailAddress?.emailAddress || ""}
                    readOnly
                    className="flex-1 bg-transparent outline-none text-gray-700"
                  />
                </div>
              </div>

              {/* Package */}
              {plan && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Selected Package
                  </label>
                  <div className="flex items-center border-2 border-blue-200 rounded-lg px-3 py-2 bg-blue-50">
                    <Package className="w-5 h-5 text-blue-600 mr-2" />
                    <input
                      type="text"
                      value={plan}
                      readOnly
                      className="flex-1 bg-transparent outline-none text-gray-700 font-semibold"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Want to change?{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/pricing")}
                      className="text-blue-600 hover:underline"
                    >
                      Go back to Pricing
                    </button>
                  </p>
                </div>
              )}

              {/* Captcha Dummy */}
              <div className="border rounded-lg p-4 flex flex-col items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-gray-500 mb-1" />
                <p className="text-sm text-gray-600">
                  [ reCAPTCHA Placeholder ]
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#152039] text-white font-medium py-3 rounded-lg shadow hover:bg-blue-800 transition"
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

export default Page;
