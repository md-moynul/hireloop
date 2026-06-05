"use client";

import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="w-full bg-[#0d0d0f] text-white py-32 px-6 relative overflow-hidden flex items-center justify-center">
      
      {/* Background Grid Image Layer - Clean, sharp fill edge-to-edge */}
      <div className="absolute inset-0 bg-[url('/images/cta-bg.png')] bg-center bg-no-repeat bg-[length:100%_100%] opacity-40 mix-blend-screen pointer-events-none" />
      
      {/* Color Like Pic: Exact High-Intensity Indigo/Blue Hybrid Radial Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.28)_0%,rgba(59,130,246,0.1)_40%,transparent_70%)] mix-blend-plus-lighter pointer-events-none" />
      
      {/* Secondary micro-glow for that extra bright text-center focal point */}
      <div className="absolute inset-x-0 top-1/4 h-2/3 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_50%)] pointer-events-none" />

      {/* Main Content Block */}
      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Headings */}
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
            Your next role is <br /> already looking for you
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg font-medium max-w-xl mx-auto tracking-wide">
            Build a profile in three minutes. The matches start arriving tomorrow morning.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link href="/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-black font-semibold rounded-xl text-sm h-12 px-8 hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
            >
              Create a free account
            </Button>
          </Link>

          <Link href="/pricing" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="bordered"
              className="w-full sm:w-auto border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold rounded-xl text-sm h-12 px-8 transition-all cursor-pointer"
            >
              View pricing
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}