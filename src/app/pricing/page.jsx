"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { Check, Star, Thunderbolt, CreditCard, Sparkles, LifeRing, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

export default function PricingPage() {
  // Client-side state switcher for user profiles ('seekers' or 'recruiters')
  const [profileType, setProfileType] = useState("seekers");

  // Tier Matrix Content Dataset configurations
  const pricingData = {
    seekers: [
      {
        id: "seekers_free",
        name: "Free",
        price: "$0",
        period: "/forever",
        desc: "Essential search mechanisms for entering the application tracking market.",
        features: ["Browse & save up to 10 jobs", "Apply to up to 3 jobs per month", "Basic candidate profile setup", "Standard real-time email alerts"],
        cta: "Get Started Free",
        highlight: false
      },
      {
        id: "seekers_pro",
        name: "Pro",
        price: "$19.99",
        period: "/month",
        desc: "Advanced toolkit designed for active candidate outreach tracking cycles.",
        features: ["Apply to up to 30 jobs per month", "Unlimited bookmarked & saved roles", "Advanced pipeline status tracking", "Real-time market salary insights"],
        cta: "Upgrade to Pro",
        highlight: true
      },
      {
        id: "seekers_premium",
        name: "Premium",
        price: "$39.99",
        period: "/month",
        desc: "Maximum structural exposure directly down onto top-tier enterprise feeds.",
        features: ["Everything in Pro tier level", "Unlimited job application metrics", "Global candidate profile boost", "Early access + Priority support lines"],
        cta: "Go Premium Max",
        highlight: false
      }
    ],
    recruiters: [
      {
        id: "recruiters_free",
        name: "Free",
        price: "$0",
        period: "/forever",
        desc: "Basic foundational slots perfectly tuned for targeted startup outreach.",
        features: ["Up to 3 active job posts concurrent", "Basic integrated applicant view", "Standard index visibility ranking", "Ideal for first year operations"],
        cta: "Create Recruiter Hub",
        highlight: false
      },
      {
        id: "recruiters_growth",
        name: "Growth",
        price: "$49.99",
        period: "/month",
        desc: "Scalable optimization models for growing, multi-departmental platforms.",
        features: ["Up to 10 active job posts concurrent", "Full lifecycle applicant tracking", "Core descriptive hiring analytics", "Dedicated email customer support"],
        cta: "Deploy Growth Module",
        highlight: true
      },
      {
        id: "recruiters_enterprise",
        name: "Enterprise",
        price: "$149.99",
        period: "/month",
        desc: "High-impact custom suites tailored for massive recruitment loops.",
        features: ["Up to 50 active job posts concurrent", "Advanced metric tracking system", "Featured priority search listings", "Team collaboration channels", "Custom corporate brand skins"],
        cta: "Contact Architecture Sales",
        highlight: false
      }
    ]
  };

  const faqData = [
    {
      q: "Can I switch or modify my tracking tier later?",
      a: "Yes, you can upgrade, downgrade, or pivot your plan structural layout at any point directly inside your personal account billing settings workspace dashboard profile."
    },
    {
      q: "What payment processing pipelines do you accept?",
      a: "Our gateway natively integrates encrypted secure transfers across all globally prominent credit networks, debit configurations, mobile processors, and specialized banking links."
    },
    {
      q: "How does the subscription cancellation flow work?",
      a: "You can cancel automated renewals instantly through a simple toggle switch interface layout inside your profile setting workspace with absolute zero holding penalty layers."
    },
    {
      q: "Are refunds provided for unused balance timelines?",
      a: "To sustain active pipeline API sync connections, payments remain non-refundable. However, your premium level capabilities remain fully active until your billing circle cycles out."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16 md:px-8 lg:px-16 flex flex-col items-center">

      {/* 1. Header Hero Display Titles */}
      <header className="max-w-3xl mx-auto text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-xs text-purple-400 font-medium tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Flexible Tier Packaging
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-b from-white to-neutral-400 bg-clip-text text-transparent">
          Accelerate Your Hiring Potential
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Unlock high-speed application submission flows or deploy responsive recruitment architectures tailored to match your precise scalability targets.
        </p>
      </header>

      {/* 2. Interactive Segmented Workspace State Switcher */}
      <div className="bg-[#121212] border border-neutral-850 p-1.5 rounded-2xl flex items-center gap-1.5 mb-16 w-full max-w-sm shadow-xl">
        <button
          onClick={() => setProfileType("seekers")}
          className={`flex-1 text-center py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all ${profileType === "seekers"
            ? "bg-white text-black shadow-md shadow-white/5"
            : "text-neutral-400 hover:text-neutral-200"
            }`}
        >
          For Job Seekers
        </button>
        <button
          onClick={() => setProfileType("recruiters")}
          className={`flex-1 text-center py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all ${profileType === "recruiters"
            ? "bg-white text-black shadow-md shadow-white/5"
            : "text-neutral-400 hover:text-neutral-200"
            }`}
        >
          For Recruiters
        </button>
      </div>

      {/* 3. 3-Tier Responsive Card Grid Layout System */}
      <main className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-24">
        {pricingData[profileType].map((tier) => (
          <Card
            key={tier.name}
            className={`w-full bg-[#121212] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-125 border relative transition-all duration-300 hover:border-neutral-700/60 ${tier.highlight
              ? "border-purple-500 shadow-2xl shadow-purple-500/5 ring-1 ring-purple-500/30 md:-translate-y-2"
              : "border-neutral-850"
              }`}
          >
            {/* Visual Callout Badge for Highlighted Core Packages */}
            {tier.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-purple-500 to-pink-500 text-white font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-lg">
                Most Popular
              </span>
            )}

            {/* Header Content Structure block */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-neutral-300 tracking-tight">{tier.name}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed min-h-8">{tier.desc}</p>
              </div>

              {/* Explicit Currency Notation Container */}
              <div className="flex items-baseline gap-1 pt-2 border-b border-neutral-800/50 pb-6">
                <span className="text-4xl md:text-5xl font-black tracking-tighter text-white">{tier.price}</span>
                <span className="text-xs text-neutral-400 font-medium tracking-wide">{tier.period}</span>
              </div>

              {/* Dynamic Mapping Matrix Feature Grid Feed Loop */}
              <ul className="space-y-3.5 pt-2">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-neutral-300 leading-relaxed">
                    <div className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${tier.highlight ? "bg-purple-500/10 text-purple-400" : "bg-neutral-900 text-neutral-400"
                      }`}>
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Execution Button Interface Container */}
            <div className="pt-8 mt-auto">
              <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="plan_id" value={tier.id} />
                <section>
                  <button className={`cursor-pointer w-full text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${tier.highlight
                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/10"
                    : "bg-neutral-950 hover:bg-neutral-900 text-neutral-200 border border-neutral-800"
                    }`} type="submit" role="link">
                    {tier.cta}
                    {tier.highlight ? <Thunderbolt className="w-3.5 h-3.5 fill-current" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </section>
              </form>
              {/* <Button
                className={`w-full text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                  tier.highlight
                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/10"
                    : "bg-neutral-950 hover:bg-neutral-900 text-neutral-200 border border-neutral-800"
                }`}
              >
                {tier.cta}
                {tier.highlight ? <Thunderbolt className="w-3.5 h-3.5 fill-current" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </Button> */}
            </div>
          </Card>
        ))}
      </main>

      {/* 4. Complete CSS Accordion FAQ Interactive Segment Layout Section */}
      <section className="max-w-3xl w-full border-t border-neutral-850 pt-20 pb-10">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-neutral-500 text-xs font-semibold tracking-wider uppercase">
            <LifeRing className="w-4 h-4 text-neutral-600" />
            Frequently Answered Concepts
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-100">
            Got Questions? We Have Answers
          </h2>
        </div>

        {/* Clean CSS-Driven Smooth Accordion Wrapper */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="group bg-[#121212] border border-neutral-850 rounded-2xl overflow-hidden transition-all duration-200 focus-within:border-neutral-700"
            >
              <label className="flex items-center justify-between p-5 cursor-pointer select-none">
                <input type="checkbox" className="peer sr-only" />
                <span className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors pr-4">
                  {faq.q}
                </span>
                {/* Dynamic Rotating Cross Toggle Element Arrow */}
                <div className="w-5 h-5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 transition-transform duration-300 peer-checked:rotate-45 shrink-0">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M19 11h-6V5a1 1 0 00-2 0v6H5a1 1 0 000 2h6v6a1 1 0 002 0v-6h6a1 1 0 000-2z" />
                  </svg>
                </div>
                {/* Collapsible Content Frame Trigger Block */}
                <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out peer-checked:max-h-40 peer-checked:opacity-100 peer-checked:pt-4 absolute left-5 right-5 bottom-5 top-14 pointer-events-none">
                  <p className="text-xs text-neutral-400 leading-relaxed pr-6 pointer-events-auto">
                    {faq.a}
                  </p>
                </div>
              </label>
              {/* Ghost Padding spacer designed specifically to calculate smooth text expand frame offsets */}
              <div className="h-0 transition-all duration-300 peer-checked:h-16 pointer-events-none opacity-0 invisible" />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}