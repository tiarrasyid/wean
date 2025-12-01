// src/app/history/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useRouter } from "next/navigation";
import { Search, Calendar, AlertCircle, ArrowRight } from "lucide-react";

interface Finding {
  type: "error" | "warning";
  message: string;
  impact?: string;
  recommendation?: string;
}

interface ScanHistoryItem {
  id: string;
  url: string;
  date: string;
  timestamp: number;
  issuesCount: number;
  findings: Finding[];
}

function Page() {
  const router = useRouter();
  const [scans, setScans] = useState<ScanHistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("wean_scan_history");
    if (savedHistory) {
      try {
        // PERBAIKAN: Cast hasil JSON.parse ke array ScanHistoryItem[]
        const parsed: ScanHistoryItem[] = JSON.parse(savedHistory);

        // Sorting sekarang aman karena TypeScript tahu tipe datanya
        const sorted = parsed.sort((a, b) => b.timestamp - a.timestamp);

        setScans(sorted);
      } catch (e) {
        console.error("Error parsing history", e);
      }
    }
  }, []);

  const handleViewReport = (scan: ScanHistoryItem) => {
    if (!scan.findings || scan.findings.length === 0) {
      alert("Data detail corrupted.");
      return;
    }

    // Flag fromHistory: true agar tidak disimpan ulang di Result Page
    const analysisPayload = {
      url: scan.url,
      findings: scan.findings,
      fromHistory: true,
    };

    sessionStorage.setItem("analysisData", JSON.stringify(analysisPayload));
    router.push("/results");
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Scan History
            </h1>
            <p className="text-gray-600 mt-1">
              Archive of your previous website analysis.
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="mt-4 sm:mt-0 bg-[#152039] text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition"
          >
            + Start New Scan
          </button>
        </div>

        {scans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
            <Search className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No History Found
            </h2>
            <p className="text-gray-500 mt-2">
              You haven&apos;t scanned any websites yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scans.map((scan, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-transform hover:scale-[1.02] border border-gray-100"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-mono border border-gray-200">
                      Scan #{scans.length - index}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {scan.date}
                    </span>
                  </div>
                  <h2
                    className="text-lg font-bold text-gray-900 truncate mb-2"
                    title={scan.url}
                  >
                    {scan.url.replace(/(^\w+:|^)\/\//, "")}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-orange-50 p-2 rounded-md border border-orange-100 w-fit">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span>
                      Found <b>{scan.issuesCount}</b> issues
                    </span>
                  </div>
                </div>
                <button
                  className="mt-6 w-full bg-[#152039] text-white px-4 py-3 rounded-lg text-sm shadow hover:bg-blue-800 transition font-medium flex items-center justify-center gap-2"
                  onClick={() => handleViewReport(scan)}
                >
                  View Full Report <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Page;
