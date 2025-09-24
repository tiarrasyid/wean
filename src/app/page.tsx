"use client";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Upload } from "lucide-react";
import { useRef } from "react";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#111827] via-[#152039] to-[#1E293B] text-white rounded-2xl mx-4 md:mx-6 my-8 md:my-10 px-6 md:px-16 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 shadow-lg">
        {/* Left Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-snug">
            Wean – Analyze Your Website Instantly 🚀
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-6 md:mb-8">
            Get instant, AI-powered insights to ensure your code stays clean,
            efficient, and reliable. Perfect for developers and businesses that
            value speed and quality.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto md:mx-0">
            <div className="flex items-center bg-white rounded-md px-3 py-2 flex-1 shadow focus-within:ring-2 focus-within:ring-blue-600">
              <button
                type="button"
                onClick={handleFileClick}
                className="mr-2 text-[#152039]"
              >
                <Upload size={20} />
              </button>

              <input
                type="text"
                placeholder="Enter your website URL"
                className="bg-transparent flex-1 outline-none text-[#152039] placeholder-gray-500 text-sm sm:text-base"
              />

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    console.log("File uploaded:", e.target.files[0].name);
                  }
                }}
              />
            </div>

            <button className="bg-[#F2F1EC] text-[#152039] px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-semibold shadow-md transition hover:bg-[#e0dfd9]">
              Analyze Now
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex justify-center mt-8 md:mt-0">
          <Image
            src="/assets/analyze.svg"
            alt="Website Analysis Illustration"
            width={350}
            height={280}
            className="drop-shadow-xl w-64 sm:w-80 md:w-[400px] h-auto"
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-8 md:px-16 py-20 text-left">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-900">
          Powerful Features, Made for Developers
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature Card */}
          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-1">
            <Image
              src="/assets/codeanalysis.svg"
              alt="Code Analysis"
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
              Code Analysis
            </h3>
            <p className="text-gray-600 text-center">
              Identify issues early and optimize your code with precision.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-1">
            <Image
              src="/assets/automation.svg"
              alt="Automation"
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
              Automation
            </h3>
            <p className="text-gray-600 text-center">
              Automate repetitive tasks and focus on what really matters.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-8 hover:shadow-xl transition transform hover:-translate-y-1">
            <Image
              src="/assets/progresstrack.svg"
              alt="Progress Tracking"
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
              Progress Tracking
            </h3>
            <p className="text-gray-600 text-center">
              Monitor your progress and celebrate milestones with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
