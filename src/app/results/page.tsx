"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, FC } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

// Define the structure of a single finding
interface Finding {
  type: 'error' | 'warning';
  message: string;
}

// Define the structure of the entire analysis payload
interface Analysis {
  url: string;
  findings: Finding[];
}

// A component to render a single finding
const FindingComponent: FC<Finding> = ({ type, message }) => {
  const isError = type === 'error';
  return (
    <li className={`flex items-start gap-3 p-4 border-l-4 ${isError ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'} rounded-md`}>
      <span className="text-xl">{isError ? '❌' : '⚠️'}</span>
      <p className={`flex-1 ${isError ? 'text-red-800' : 'text-yellow-800'}`}>
        {message}
      </p>
    </li>
  );
};

export default function Results() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // 1. Read the data from session storage
    const data = sessionStorage.getItem('analysisData');

    if (!data) {
      // If no data, go home.
      router.replace('/');
      return;
    }

    try {
      // 2. Try to parse the data
      setAnalysis(JSON.parse(data));
      
      // 3. That's it! Don't remove the item.
      // The next scan will just overwrite it.

    } catch (err) {
      console.error("Failed to parse analysis data:", err);
      router.replace('/'); // Redirect on error
    }
  }, [router]);

  // Show a loading state until data is parsed
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

  return (
    <div className="bg-[#F3F4F6] min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Results Section */}
      <main className="flex-1 px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Analysis Report
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-6 break-words">
            Showing results for: <a href={analysis.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{analysis.url}</a>
          </p>

          {analysis.findings.length === 0 ? (
            // No findings
            <div className="text-center py-10 px-6 bg-green-50 rounded-lg border border-green-300">
              <h2 className="text-2xl font-semibold text-green-800 mb-2">✅ Excellent!</h2>
              <p className="text-green-700">No common bad practices were found.</p>
            </div>
          ) : (
            // List of findings
            <ul className="space-y-4">
              {analysis.findings.map((finding, index) => (
                <FindingComponent key={index} type={finding.type} message={finding.message} />
              ))}
            </ul>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => router.push('/')}
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