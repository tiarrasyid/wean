// src/app/results/page.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, FC } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
  AlertCircle,
  AlertTriangle,
  ListChecks,
  Lock,
  ArrowRight,
  Zap,
  CheckCircle2,
  BookOpen,
  Crown,
  Building2, // Icon untuk Enterprise
} from "lucide-react";

interface Finding {
  type: "error" | "warning";
  message: string;
  impact?: string;
  recommendation?: string;
}

interface Analysis {
  url: string;
  findings: Finding[];
  fromHistory?: boolean; // <--- Tambahkan properti ini di interface
}

interface ScanHistoryItem {
  id: string;
  url: string;
  date: string;
  timestamp: number;
  issuesCount: number;
  findings: Finding[];
}

const generateInsight = (message: string) => {
  const msgLower = message.toLowerCase();
  if (msgLower.includes("meta description")) {
    return {
      impact:
        "Without a meta description, search engines display random text snippets. Lowers CTR.",
      recommendation:
        "Add a <meta name='description'> tag (150-160 chars) inside <head>.",
    };
  }
  if (msgLower.includes("alt") && msgLower.includes("img")) {
    return {
      impact:
        "Poor SEO indexing for images and bad accessibility for screen readers.",
      recommendation: "Add alt='Description' attributes to every <img> tag.",
    };
  }
  if (msgLower.includes("inline") && msgLower.includes("style")) {
    return {
      impact:
        "Increases HTML size, blocks caching, and makes maintenance difficult.",
      recommendation:
        "Move styles to an external .css file or use utility classes.",
    };
  }
  if (msgLower.includes("h1")) {
    return {
      impact:
        "Weak On-Page SEO structure. Google relies on H1 for main topic signals.",
      recommendation: "Ensure exactly ONE <h1> tag exists per page.",
    };
  }
  return {
    impact: "Affects code quality, performance, or UX.",
    recommendation: "Refactor code according to web best practices.",
  };
};

const FindingComponent: FC<Finding> = ({ type, message }) => {
  const isError = type === "error";
  const { impact, recommendation } = generateInsight(message);
  const borderColor = isError ? "border-red-500" : "border-yellow-500";
  const iconColor = isError ? "text-red-600" : "text-yellow-600";
  const title = isError ? "Critical Issue" : "Warning";
  const TitleIcon = isError ? AlertCircle : AlertTriangle;

  return (
    <div
      className={`border-l-4 ${borderColor} bg-white shadow-sm rounded-r-lg p-6 mb-6 transition hover:shadow-md`}
    >
      <div className="flex items-start gap-4 mb-5 border-b border-gray-100 pb-4">
        <div
          className={`p-2 rounded-full ${
            isError ? "bg-red-50" : "bg-yellow-50"
          }`}
        >
          <TitleIcon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <h3
            className={`font-bold ${iconColor} text-base mb-1 uppercase tracking-wide`}
          >
            {title}
          </h3>
          <p className="text-gray-900 font-medium text-lg leading-snug">
            {message}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-12">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Impact
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{impact}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
              Insight
            </span>
          </div>
          <div className="flex gap-3">
            <BookOpen className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-800 font-medium leading-relaxed font-mono bg-white/60 p-2 rounded w-full">
              {recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LockedFindingComponent = () => {
  return (
    <div className="relative mb-4">
      <div className="border-l-4 border-gray-300 bg-white p-6 rounded-r-lg opacity-60 filter blur-[4px] select-none pointer-events-none">
        <div className="flex items-start gap-3 border-b border-gray-100 pb-3 mb-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="space-y-3 w-3/4">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 ml-12">
          <div className="h-24 bg-gray-100 rounded"></div>
          <div className="h-24 bg-gray-100 rounded"></div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white p-3 rounded-full shadow-md border border-gray-100">
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default function Results() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update state untuk menyimpan Nama Plan, bukan cuma boolean
  const [planName, setPlanName] = useState("Wean Free");

  const FREE_LIMIT = 2;

  useEffect(() => {
    // 1. Load Data
    const data = sessionStorage.getItem("analysisData");
    if (!data) {
      router.replace("/");
      return;
    }
    try {
      const parsedData = JSON.parse(data);
      setAnalysis(parsedData);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to parse analysis data:", err);
      router.replace("/");
    }

    // 2. Load Plan Name
    const savedPlan = localStorage.getItem("wean_active_plan");
    if (savedPlan) {
      setPlanName(savedPlan); // Simpan nama plan aslinya (e.g., "Wean Enterprise")
    }
  }, [router]);

  // 3. Logic Auto-Save (DIPERBAIKI)
  useEffect(() => {
    if (analysis && !isLoading) {
      // CEK FLAG DARI HISTORY
      // Jika data ini berasal dari klik "View Full Report", jangan simpan ulang
      if (analysis.fromHistory) {
        console.log("Viewing from history - Save skipped.");
        return;
      }

      const historyKey = "wean_scan_history";
      const rawHistory = localStorage.getItem(historyKey);
      const history: ScanHistoryItem[] = rawHistory
        ? JSON.parse(rawHistory)
        : [];

      // Cek duplikasi manual (untuk scan baru yg di-refresh page-nya)
      const lastScan = history[0];
      const now = Date.now();
      const isDuplicate =
        lastScan &&
        lastScan.url === analysis.url &&
        now - lastScan.timestamp < 10000;

      if (!isDuplicate) {
        const newEntry: ScanHistoryItem = {
          id: crypto.randomUUID(),
          url: analysis.url,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          timestamp: now,
          issuesCount: analysis.findings.length,
          findings: analysis.findings,
        };
        const updatedHistory = [newEntry, ...history];
        localStorage.setItem(historyKey, JSON.stringify(updatedHistory));
        console.log("New scan saved to history!");
      }
    }
  }, [analysis, isLoading]);

  if (!analysis) {
    return (
      <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#152039] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Generating Insights...</p>
          </div>
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

  // Logic Slicing: Buka semua jika bukan Free
  const isPremium = planName === "Wean Pro" || planName === "Wean Enterprise";
  const visibleFindings = isPremium
    ? analysis.findings
    : analysis.findings.slice(0, FREE_LIMIT);
  const hiddenCount = totalIssues - visibleFindings.length;

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-12 space-y-10 max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-6 border-b border-gray-300">
          <div>
            <h1 className="text-3xl font-bold text-[#152039]">
              Analysis Report
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              Target:
              <a
                href={analysis.url}
                target="_blank"
                className="font-mono bg-white border border-gray-300 px-2 py-0.5 rounded text-sm text-blue-600 hover:underline"
              >
                {analysis.url}
              </a>
            </p>
          </div>

          {/* DYNAMIC PLAN BADGE (DIPERBAIKI) */}
          {(() => {
            if (planName === "Wean Enterprise") {
              return (
                <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-purple-200 animate-in fade-in zoom-in duration-300">
                  <Building2 className="w-4 h-4" /> {/* Icon Gedung */}
                  Enterprise Plan
                </div>
              );
            } else if (planName === "Wean Pro") {
              return (
                <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-green-200 animate-in fade-in zoom-in duration-300">
                  <Crown className="w-4 h-4" />
                  Pro Plan Active
                </div>
              );
            } else {
              return (
                <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-yellow-200">
                  <Lock className="w-3 h-3" />
                  Free Plan Mode
                </div>
              );
            }
          })()}
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border-l-4 border-red-500 shadow-md rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">
                  Critical Errors
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {totalErrors}
                </p>
              </div>
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="text-red-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white border-l-4 border-yellow-500 shadow-md rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">
                  Warnings
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {totalWarnings}
                </p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <AlertTriangle className="text-yellow-600 w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="bg-white border-l-4 border-blue-500 shadow-md rounded-xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">
                  Total Issues
                </p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {totalIssues}
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <ListChecks className="text-blue-600 w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Code Insights</h2>
            <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
            <p className="text-gray-500">
              Actionable steps to improve your code
            </p>
          </div>

          {analysis.findings.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white rounded-xl border border-dashed border-gray-300">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Excellent Work!
              </h2>
              <p className="text-gray-600">Your code is very clean.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {visibleFindings.map((finding, index) => (
                <FindingComponent
                  key={index}
                  type={finding.type}
                  message={finding.message}
                />
              ))}

              {!isPremium && hiddenCount > 0 && (
                <div className="relative pt-8 border-t border-gray-200">
                  <div className="space-y-6 opacity-75">
                    <LockedFindingComponent />
                    <LockedFindingComponent />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pt-10">
                    <div className="bg-[#152039] text-white p-8 rounded-2xl shadow-2xl max-w-lg mx-4 border border-gray-700 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-500 rounded-full opacity-20 blur-xl group-hover:scale-150 transition duration-700"></div>
                      <div className="bg-yellow-500/20 p-3 rounded-full w-fit mx-auto mb-4">
                        <Lock className="w-8 h-8 text-yellow-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Unlock{" "}
                        <span className="text-yellow-400">
                          {hiddenCount} More Insights
                        </span>
                      </h3>
                      <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                        Upgrade plan to see full details.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                          onClick={() => router.push("/pricing")}
                          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition flex items-center justify-center gap-2 shadow-lg"
                        >
                          Upgrade to Pro <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="bg-white/10 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition border border-white/20">
                          Student Pass (15k IDR)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center pt-10 border-t border-gray-200">
          <button
            onClick={() => router.push("/")}
            className="text-gray-500 hover:text-[#152039] font-medium transition flex items-center justify-center gap-2 mx-auto"
          >
            Scan Another Website
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
