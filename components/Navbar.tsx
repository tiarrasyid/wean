"use client";
import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center h-[70px] bg-gray-100 px-8 shadow-md shadow-black/20">
      {/* Logo */}
      <Logo />

      {/* Navigation Items */}
      <div className="flex gap-8">
        <Link href="/" className="text-black hover:underline">
          Home
        </Link>
        <Link href="/history" className="text-black hover:underline">
          History
        </Link>
        <Link href="/pricing" className="text-black hover:underline">
          Pricing
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
