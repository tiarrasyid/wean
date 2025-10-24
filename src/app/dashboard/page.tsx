"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // ✅ untuk ambil query param
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Activity, BarChart3, Clock, Package } from "lucide-react";
import { useUser } from "@clerk/nextjs";

function PageContent() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const planFromQuery = searchParams.get("plan"); // Ambil plan dari URL
  const [activePlan, setActivePlan] = useState("-"); // default jika tidak ada query

  useEffect(() => {
    if (planFromQuery) {
      setActivePlan(planFromQuery);
    }
  }, [planFromQuery]);

  const stats = [
    {
      title: "Total Scans",
      value: "128",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Active Package",
      value: activePlan,
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "Last Scan",
      value: "2 days ago",
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  const recentReports = [
    { id: 1, title: "Scan #128", date: "Sep 20, 2025", issues: 15 },
    { id: 2, title: "Scan #127", date: "Sep 15, 2025", issues: 9 },
    { id: 3, title: "Scan #126", date: "Sep 10, 2025", issues: 7 },
  ];

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
          <p className="text-gray-600 mt-1">
            Here’s an overview of your website scans and activity.
          </p>
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

        {/* Recent Reports */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#152039]" />
              Recent Reports
            </h2>
            <button className="bg-[#152039] text-white px-4 py-2 rounded-md shadow hover:bg-blue-800">
              Start New Scan
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex justify-between items-center py-3 hover:bg-gray-50 px-2 rounded-md cursor-pointer"
              >
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {report.title}
                  </h3>
                  <p className="text-xs text-gray-500">{report.date}</p>
                </div>
                <span className="text-sm font-semibold text-[#152039]">
                  {report.issues} issues
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}
