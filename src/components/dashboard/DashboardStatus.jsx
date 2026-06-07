"use client";

import React from "react";
// Verified Gravity UI icon assets
import { FileText, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";

export default function DashboardStatus() {
  const metricsData = [
    {
      id: 1,
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      id: 2,
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      id: 3,
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      id: 4,
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  return (
    <div className="w-full bg-[#0d0d0f] p-6">
      {/* Metrics Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {metricsData.map((item) => {
          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              className="bg-[#1f1f24] border border-zinc-800/40 rounded-2xl p-6 flex flex-col justify-between gap-6 transition-all duration-300 hover:border-zinc-700/60 hover:bg-[#2d2d31] group"
            >
              {/* Icon Capsule Block - Adjusted to stand out cleanly */}
              <div className="w-9 h-9 rounded-xl bg-[#1c1c21] border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors">
                <IconComponent className="w-4 h-4" />
              </div>

              {/* Text Layer Stack */}
              <div className="space-y-1.5 text-left">
                <p className="text-xs font-semibold text-zinc-500 group-hover:text-zinc-400 transition-colors tracking-wide">
                  {item.title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight">
                  {item.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}