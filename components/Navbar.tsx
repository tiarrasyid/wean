"use client";
import Link from "next/link";
import Logo from "./Logo";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md shadow-black/20">
      <div className="container mx-auto flex justify-between items-center h-[70px] px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-black hover:underline">
            Home
          </Link>
          <Link href="/history" className="text-black hover:underline">
            History
          </Link>

          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="text-black hover:underline">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <Link href="/pricing" className="text-black hover:underline">
                Pricing
              </Link>
              <SignInButton mode="modal">
                <button className="bg-[#152039] text-white px-4 py-2 rounded hover:bg-[#1e2a4a] transition">
                  Sign In
                </button>
              </SignInButton>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 border-t border-gray-200 px-6 py-4 space-y-4">
          <Link href="/" className="block text-black hover:underline">
            Home
          </Link>
          <Link href="/history" className="block text-black hover:underline">
            History
          </Link>

          {isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="block text-black hover:underline"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <Link
                href="/pricing"
                className="block text-black hover:underline"
              >
                Pricing
              </Link>
              <SignInButton mode="modal">
                <button className="w-full bg-[#152039] text-white px-4 py-2 rounded hover:bg-[#1e2a4a] transition">
                  Sign In
                </button>
              </SignInButton>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
