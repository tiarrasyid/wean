// result/page.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, FC } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { AlertCircle, AlertTriangle, ListChecks } from "lucide-react";

// Define the structure of a single finding
interface Finding {
  type: "error" | "warning";
  message: string;
}

// Define the structure of the entire analysis payload
interface Analysis {
  url: string;
  findings: Finding[];
}

// Component to render a single finding
const FindingComponent: FC<Finding> = ({ type, message }) => {
  const isError = type === "error";
  const color = isError ? "red" : "yellow";

  return (
    <div className={`border-l-4 border-${color}-500 pl-4`}>
      <h3 className={`text-lg font-semibold text-${color}-800`}>
        {isError ? "❌ Error" : "⚠️ Warning"}
      </h3>
      <p className="text-gray-800 mt-2 text-sm leading-relaxed">{message}</p>
    </div>
  );
};

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("analysisData");
    if (!data) {
      router.replace("/");
      return;
    }

    try {
      setAnalysis(JSON.parse(data));
    } catch (err) {
      console.error("Failed to parse analysis data:", err);
      router.replace("/");
    }
  }, [router]);

  if (!analysis) {
    return (
      <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-700 text-lg">Loading results...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const totalErrors = analysis.findings.filter(
    (f) => f.type === "error"
  ).length;
  const totalWarnings = analysis.findings.filter(
    (f) => f.type === "warning"
  ).length;
  const totalIssues = analysis.findings.length;

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12 space-y-10">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="text-red-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Errors</h2>
              <p className="text-gray-600 text-sm">Issues: {totalErrors}</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition">
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertTriangle className="text-yellow-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Warnings</h2>
              <p className="text-gray-600 text-sm">Issues: {totalWarnings}</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition">
            <div className="bg-blue-100 p-3 rounded-full">
              <ListChecks className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Total Issues
              </h2>
              <p className="text-gray-600 text-sm">{totalIssues}</p>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Section */}
        <div className="bg-white shadow-md rounded-xl p-8 space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analysis Report
          </h2>
          <p className="text-gray-700 text-base mb-6 break-words">
            Showing results for:{" "}
            <a
              href={analysis.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {analysis.url}
            </a>
          </p>

          {analysis.findings.length === 0 ? (
            <div className="text-center py-10 px-6 bg-green-50 rounded-lg border border-green-300">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                ✅ Excellent!
              </h2>
              <p className="text-green-700">
                No common bad practices were found.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {analysis.findings.map((finding, index) => (
                <FindingComponent
                  key={index}
                  type={finding.type}
                  message={finding.message}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => router.push("/")}
              className="bg-[#152039] text-white px-6 py-3 rounded-md font-semibold shadow-md transition hover:bg-[#1E293B]"
            >
              Scan Another Site
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
