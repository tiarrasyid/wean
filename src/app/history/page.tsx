"use client";
import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const scans = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Scan #${i + 1}`,
    summary: "Quick insights and findings from this scan.",
  }));

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Features & Reports
          </h1>
          <button className="mt-4 sm:mt-0 bg-[#152039] text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition">
            + Start New Scan
          </button>
        </div>

        {/* Grid of Scans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="bg-white text-black rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-transform hover:scale-[1.02]"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {scan.title}
                </h2>
                <p className="text-sm text-gray-600 mt-3">{scan.summary}</p>
              </div>

              <button
                className="mt-6 bg-[#152039] text-white px-4 py-2 rounded-md text-sm shadow hover:bg-blue-800 transition w-fit"
                onClick={() => router.push("/history/detail")}
              >
                View Report →
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Page;
