"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  // Calculates the display price based on active toggle period
  const getPrice = (baseMonthlyPrice) => {
    if (baseMonthlyPrice === 0) return 0;
    if (billingPeriod === "yearly") {
      // Applies the 25% discount shown in the design badge
      return Math.floor(baseMonthlyPrice * 0.75);
    }
    return baseMonthlyPrice;
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      basePrice: 0,
      badgeColor: "text-pink-400 bg-pink-950/30 border-pink-900/50",
      isPopular: false,
      icon: (
        <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited"
      ]
    },
    {
      id: "growth",
      name: "Growth",
      basePrice: 17,
      badgeColor: "text-purple-400 bg-purple-950/30 border-purple-900/50",
      isPopular: true, // Highlights this specific tier visually as shown in image_7b09cd.png
      icon: (
        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      basePrice: 99,
      badgeColor: "text-indigo-400 bg-indigo-950/30 border-indigo-900/50",
      isPopular: false,
      icon: (
        <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)"
      ]
    }
  ];

  return (
    <section className="w-full bg-[#0d0d0f] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-12">
        
        {/* Section Heading Setup */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
            <span className="h-1 w-1.5 bg-indigo-500 rotate-45" />
            PRICING
            <span className="h-1 w-1.5 bg-indigo-500 rotate-45" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-xl mx-auto">
            Pay for the leverage, not the listings
          </h2>
        </div>

        {/* Dual Switch Pill Toggle Layout */}
        <div className="inline-flex items-center bg-[#141417] p-1 rounded-2xl border border-zinc-800/60 relative shadow-inner">
          <button
            type="button"
            onClick={() => setBillingPeriod("monthly")}
            className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              billingPeriod === "monthly" 
                ? "bg-white text-black shadow-sm" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingPeriod("yearly")}
            className={`px-5 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer ${
              billingPeriod === "yearly" 
                ? "bg-white text-black shadow-sm" 
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <span>Yearly</span>
            <span className="bg-pink-500 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full scale-95">
              25%
            </span>
          </button>
        </div>

        {/* Main Plans Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4">
          {plans.map((plan) => {
            const calculatedPrice = getPrice(plan.basePrice);

            return (
              <div 
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 relative ${
                  plan.isPopular 
                    ? "bg-radial-[at_top_rgba(24,24,27,0.8)] from-zinc-900/60 to-[#0e0e11] border-zinc-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-[1.02] z-10" 
                    : "bg-[#0e0e11]/40 border-zinc-900/80 hover:border-zinc-800 shadow-none"
                }`}
              >
                <div>
                  {/* Top Header Card Information */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${plan.badgeColor}`}>
                        {plan.icon}
                      </div>
                      <h3 className="text-lg font-bold text-zinc-100">{plan.name}</h3>
                    </div>
                    <div className="flex items-baseline text-white">
                      <span className="text-3xl font-extrabold tracking-tight">${calculatedPrice}</span>
                      <span className="text-zinc-500 text-xs font-medium ml-1">/month</span>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-zinc-300 mt-8 mb-4">
                    Start building your insights hub:
                  </p>

                  {/* Core Content Features List */}
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 group text-left">
                        <div className="shrink-0 w-4 h-4 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center mt-0.5">
                          <svg className="w-2.5 h-2.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </div>
                        <span className="text-sm text-zinc-400 font-medium tracking-wide">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Trigger Actions Button */}
                <div className="mt-8">
                  <Button
                    size="lg"
                    className={`w-full font-semibold rounded-xl text-sm h-12 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.isPopular
                        ? "bg-white text-black hover:bg-zinc-200"
                        : "bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
                    }`}
                    endContent={
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    }
                  >
                    Choose This Plan
                  </Button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}