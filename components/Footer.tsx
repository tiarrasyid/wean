"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#152039] text-white py-7 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="mb-2 md:mb-0">© 2025 All Rights Reserved</p>
        <div className="flex space-x-6">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-use" className="hover:underline">
            Terms of Use
          </Link>
          <Link href="/sales-refunds" className="hover:underline">
            Sales and Refunds
          </Link>
          <Link href="/legal" className="hover:underline">
            Legal
          </Link>
          <Link href="/sitemap" className="hover:underline">
            Site Map
          </Link>
        </div>
      </div>
    </footer>
  );
}
