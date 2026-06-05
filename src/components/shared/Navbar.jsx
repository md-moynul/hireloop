'use client'
import { useState } from "react";
import { Button } from "@heroui/react";
import { Bars, Xmark, Briefcase } from "@gravity-ui/icons";
import Link from "next/link";

// Reusable navigation links array
const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0d0d0f] border-b border-zinc-900/80 text-white backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
          <div className="bg-indigo-600 p-2 rounded-xl text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-linear-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            hireloop
          </span>
        </Link>

        {/* Floating Capsule Desktop Navigation */}
        <div className="hidden md:flex items-center bg-[#18181c] border border-zinc-800/80 rounded-2xl p-1.5 pl-6 shadow-2xl">
          {/* Rendered Links dynamically */}
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Vertical Divider */}
          <div className="h-4 w-px bg-zinc-700/60 mx-4" />

          {/* Authentications & Actions */}
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[#5046e5] hover:text-indigo-400 font-semibold text-sm px-2 transition-colors">
              Login
            </Link>
            <Link href="/register">

              <Button


                className="bg-white text-black font-semibold rounded-xl text-sm px-5 h-10 hover:bg-neutral-200 transition-colors shadow-sm"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <Xmark className="w-6 h-6" />
          ) : (
            <Bars className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu Container */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0d0d0f] border-t border-zinc-900/80 px-6 py-6 absolute top-20 left-0 w-full flex flex-col gap-6 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-200 z-50">
          {/* Rendered Links dynamically for mobile */}
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-300 hover:text-white text-lg py-1 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-px bg-zinc-800/60 w-full" />

          <div className="flex flex-col gap-3">
            <Link href="/login" className="text-[#5046e5] hover:text-indigo-400 text-lg py-2 font-semibold text-center transition-colors">
              Login
            </Link>
            <Link href="/register">
              <Button
                className="bg-white text-black font-semibold rounded-xl text-sm px-5 h-10 hover:bg-neutral-200 transition-colors shadow-sm"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}