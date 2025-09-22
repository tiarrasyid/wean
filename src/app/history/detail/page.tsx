"use client";
import React from "react";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { AlertCircle, Code2, Trash2 } from "lucide-react";

function Page() {
  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12 space-y-10">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="text-red-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Code Smells
              </h2>
              <p className="text-gray-600 text-sm">Issues: 15</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Trash2 className="text-yellow-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Useless Code
              </h2>
              <p className="text-gray-600 text-sm">Issues: 7</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition">
            <div className="bg-blue-100 p-3 rounded-full">
              <Code2 className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Redundant Attributes
              </h2>
              <p className="text-gray-600 text-sm">Issues: 9</p>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Section */}
        <div className="bg-white shadow-md rounded-xl p-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Detailed Analysis
          </h2>

          {/* Code Smells */}
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900">Code Smells</h3>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">
              Detailed description of code smells found in the analysis,
              including line numbers and suggested improvements. This section
              highlights where best practices are violated and how they can be
              optimized.
            </p>
          </div>

          {/* Useless Code */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Useless Code
            </h3>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">
              Summary of sections identified as potentially useless, along with
              reasons and recommendations for removal. This helps keep your code
              lean, efficient, and easier to maintain.
            </p>
          </div>

          {/* Redundant Attributes */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Redundant Attributes
            </h3>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">
              List of redundant attributes detected with suggestions for
              optimization. Removing these will reduce clutter and improve code
              readability and maintainability.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Page;
