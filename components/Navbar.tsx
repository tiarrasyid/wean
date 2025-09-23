"use client";
import Link from "next/link";
import Logo from "./Logo";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex justify-between items-center h-[70px] bg-gray-100 px-8 shadow-md shadow-black/20">
      {/* Logo */}
      <Logo />

      {/* Navigation Items */}
      <div className="flex gap-8 items-center">
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
    </nav>
  );
};

export default Navbar;
