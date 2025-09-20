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
      <section className="bg-[#111827] text-white h-full rounded-lg mx-8 my-8 p-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Wean - Analyze Your Website, Instantly.
          </h1>
          <p className="text-gray-300 mb-6">
            Wean delivers instant website analysis with precision and clarity.
            It ensures clean, efficient, and reliable code for every project.
          </p>

          <div className="flex gap-2">
            <div className="flex items-center bg-[#F5F5F0] rounded-md px-3 py-2 flex-1">
              <button
                type="button"
                onClick={handleFileClick}
                className="mr-2 text-[#111C3A] hover:text-[#0d152e]"
              >
                <Upload size={20} />
              </button>

              <input
                type="text"
                placeholder="Enter your website URL"
                className="bg-transparent flex-1 outline-none text-[#111C3A] placeholder-gray-500"
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
            <button className="bg-[#F2F1EC] text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200">
              Analyze Now
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/assets/analyze.svg"
            alt="Illustration"
            width={350}
            height={250}
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-17 py-16 text-left">
        <h2 className="text-2xl font-semibold mb-12 text-black">Features</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <Image
              src="/assets/codeanalysis.svg"
              alt="Code Analysis"
              width={200}
              height={200}
              className="h-36 w-auto mb-4"
            />
            <h3 className=" font-medium mb-2 text-black">Code Analysis</h3>
            <p className="text-black">
              Identify potential issues and optimize your code efficiently with
              our advanced tools.
            </p>
          </div>
          <div>
            <Image
              src="/assets/automation.svg"
              alt="Automation"
              width={200}
              height={200}
              className="h-36 w-auto mb-4"
            />
            <h3 className="font-medium mb-2 text-black">Automation</h3>
            <p className="text-black">
              Automate repetitive tasks and focus on what matters most: writing
              quality code.
            </p>
          </div>
          <div>
            <Image
              src="/assets/progresstrack.svg"
              alt="Progress Tracking"
              width={200}
              height={200}
              className="h-36 w-auto mb-4"
            />
            <h3 className="font-medium mb-2 text-black">Progress Tracking</h3>
            <p className="text-black">
              Track your improvements and celebrate milestones with detailed
              reports.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
