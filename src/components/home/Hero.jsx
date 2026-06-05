"use client"

import { useState } from "react";
import { Button, Link } from "@heroui/react";
import { Briefcase, Magnifier, MapPin, House, Persons, Star } from "@gravity-ui/icons";

export default function Hero() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const trendingPositions = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

  const stats = [
    { id: 1, icon: <Briefcase className="w-5 h-5 text-zinc-400" />, value: "50K", label: "Active Jobs" },
    { id: 2, icon: <House className="w-5 h-5 text-zinc-400" />, value: "12K", label: "Companies" },
    { id: 3, icon: <Persons className="w-5 h-5 text-zinc-400" />, value: "2M", label: "Job Seekers" },
    { id: 4, icon: <Star className="w-5 h-5 text-zinc-400" />, value: "97%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#050506] text-white overflow-hidden flex flex-col justify-between pt-20">
      
      {/* --- Top Layout: Content & Search Bar --- */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-6 md:gap-8">
        
        {/* Dynamic Top Badge */}
        <div className="inline-flex items-center gap-2 bg-[#131316] border border-zinc-800/80 rounded-full px-4 py-1.5 shadow-xl">
          <Briefcase className="w-4 h-4 text-orange-500" />
          <span className="text-xs md:text-sm font-semibold tracking-widest text-zinc-400 uppercase">
            <span className="text-white font-bold">50,000+</span> New Jobs This Month
          </span>
        </div>

        {/* Dynamic Typography Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-linear-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Find Your Dream Job Today
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            HireLoop connects top talent with world-class companies. Browse thousands of 
            curated opportunities and land your next role — faster.
          </p>
        </div>

        {/* Search Capsule Engine */}
        <form 
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-3xl bg-[#111113]/90 backdrop-blur-md border border-zinc-800/80 p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center gap-2 md:gap-0 shadow-2xl"
        >
          <div className="w-full flex items-center gap-3 px-4 py-2 md:py-0">
            <Magnifier className="w-5 h-5 text-zinc-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Job title, skill or company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none border-none focus:ring-0"
            />
          </div>

          <div className="hidden md:block h-6 w-px bg-zinc-800 mx-2" />

          <div className="w-full flex items-center gap-3 px-4 py-2 md:py-0 border-t border-zinc-900 md:border-none">
            <MapPin className="w-5 h-5 text-zinc-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Location or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none border-none focus:ring-0"
            />
          </div>

          <Button 
            type="submit"
            isIconOnly
            className="w-full md:w-12 h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl md:rounded-full shrink-0 transition-colors min-w-12"
          >
            <Magnifier className="w-5 h-5" />
          </Button>
        </form>

        {/* Popular Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-1 text-xs md:text-sm">
          <span className="text-zinc-500 font-medium">Trending Position</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {trendingPositions.map((position) => (
              <Link
                key={position}
                href={`/jobs?q=${encodeURIComponent(position)}`}
                className="bg-[#161619] hover:bg-zinc-800 border border-zinc-800/80 text-zinc-300 hover:text-white px-4 py-1.5 rounded-full transition-colors text-xs font-medium"
              >
                {position}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* --- Bottom Layout: Planet Graphic & Statistics Grid --- */}
      <div className="relative w-full mt-16 md:mt-24 flex flex-col items-center justify-end z-10 pb-4 pt-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Globe Overlay Background */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] sm:w-[110%] md:w-full aspect-2/1 bg-bottom bg-no-repeat bg-contain z-0 pointer-events-none select-none opacity-90"
          style={{ backgroundImage: `url('/images/globe.png')` }}
        />

        {/* Ambient Nebula Light behind the Globe */}
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[60%] aspect-square bg-indigo-600/20 blur-[130px] rounded-full z-0 pointer-events-none" />

        {/* Middle Call-to-Action text over the Globe curve */}
        <p className="relative z-10 mb-10 text-center max-w-md text-base sm:text-xl md:text-3xl font-medium tracking-tight text-zinc-200/90 leading-snug">
          Assisting over <span className="text-white font-semibold">15,000 job seekers</span> find their dream positions.
        </p>

        {/* Modern Statistics Cards Grid */}
        <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="p-5 md:p-6 bg-[#09090b]/40 backdrop-blur-md border border-zinc-900/80 rounded-2xl flex flex-col justify-end items-start gap-1.5 shadow-2xl group hover:border-zinc-800/80 transition-all duration-300 min-h-35 md:min-h-42.5"
            >
              <div className="p-2 bg-zinc-950/80 rounded-xl border border-zinc-900 mb-auto">
                {stat.icon}
              </div>
              <h4 className="text-xs md:text-sm text-zinc-500 font-medium tracking-wide">
                {stat.label}
              </h4>
              <p className="text-3xl md:text-4xl font-bold tracking-tight text-white font-sans">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}