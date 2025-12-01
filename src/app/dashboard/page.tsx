// dashboard/page.tsx
"use client";
import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Activity, BarChart3, Clock, Package, Plus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// Tipe Data untuk Scan History
interface ScanHistoryItem {
  id: string;
  url: string;
  date: string;
  timestamp: number;
  issuesCount: number;
}

function PageContent() {
  const { user } = useUser();
  const router = useRouter();

  // State untuk data dinamis
  const [activePlan, setActivePlan] = useState("Wean Free"); // Default Free
  const [scans, setScans] = useState<ScanHistoryItem[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Ambil Plan dari LocalStorage
    const savedPlan = localStorage.getItem("wean_active_plan");
    if (savedPlan) {
      setActivePlan(savedPlan);
    }

    // 2. Ambil History Scan dari LocalStorage
    const savedHistory = localStorage.getItem("wean_scan_history");
    if (savedHistory) {
      try {
        const parsedHistory: ScanHistoryItem[] = JSON.parse(savedHistory);
        const sortedHistory = parsedHistory.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        setScans(sortedHistory);
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
    setLoading(false);
  }, []);

  // Hitung statistik
  const totalScans = scans.length;
  const lastScanDate = scans.length > 0 ? scans[0].date : "-";

  const stats = [
    {
      title: "Total Scans",
      value: totalScans.toString(),
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Active Package",
      value: activePlan,
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "Last Scan",
      value: lastScanDate,
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  // Ambil semua report untuk ditampilkan (bisa dibatasi atau semua)
  // Ubah slice(0, 5) menjadi slice(0, 20) atau hapus slice jika ingin semua
  const recentReports = scans;

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-10 space-y-10">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back,{" "}
            <span className="text-[#152039]">
              {user ? user.firstName : "Guest"}
            </span>{" "}
            👋
          </h1>
          <p className="text-gray-600 mt-1">Overview of your website scans.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 hover:shadow-lg transition"
            >
              <div className="text-[#152039] bg-gray-100 p-3 rounded-full">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <h2 className="text-xl font-semibold text-black">
                  {stat.value}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reports (Scrollable) */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col h-[400px]">
          {" "}
          {/* Set Fixed Height Container */}
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#152039]" /> Recent Reports
            </h2>
            <button
              onClick={() => router.push("/")}
              className="bg-[#152039] text-white px-4 py-2 rounded-md shadow hover:bg-blue-800 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Scan
            </button>
          </div>
          {/* LIST CONTAINER DENGAN SCROLL */}
          <div className="divide-y divide-gray-200 overflow-y-auto flex-grow pr-2 custom-scrollbar">
            {recentReports.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No scans yet. Start your first scan!
              </div>
            ) : (
              recentReports.map((report, idx) => (
                <div
                  key={idx}
                  onClick={() => router.push("/history")}
                  className="flex justify-between items-center py-3 hover:bg-gray-50 px-2 rounded-md cursor-pointer transition"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 font-mono truncate max-w-[200px] sm:max-w-md">
                      {report.url}
                    </h3>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#152039] bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">
                    {report.issuesCount} issues
                  </span>
                </div>
              ))
            )}
          </div>
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
