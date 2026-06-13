import { getJobByJobId } from '@/lib/api/job';
import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Clock,
  ChevronLeft,
  CircleDollar,
  Calendar,
  ShieldCheck,
  Gift,
  Rocket
} from "@gravity-ui/icons";
import { getCompanyById } from '@/lib/api/company';
import Image from 'next/image';

export default async function JobDetailsPage({ params }) {
  const { id } = await params;
  const job = await getJobByJobId(id);

  // Safeguard against missing API content
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-neutral-400">
        <p>Job details could not be found or loaded.</p>
        <Link href="/jobs" className="text-purple-400 hover:underline mt-4 inline-block text-sm">
          Return to listings
        </Link>
      </div>
    );
  }

  const {
    title,
    category,
    type,
    minSalary,
    maxSalary,
    currency,
    city,
    country,
    deadline,
    responsibilities,
    requirements,
    benefits,
    companyId,
  } = job;
  const { name: companyName, logo: companyLogo } = await getCompanyById(companyId)
  // console.log(companyName,companyLogo,);

  // Formatter matching your Card logic layout safely
  const formatSalary = (amount) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Humanize deadlines elegantly
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8">

        {/* Back Link Row navigation */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group no-underline"
        >
          <ChevronLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
          Back to Job Listings
        </Link>

        {/* Master Details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Main Content Layout Block (Left Column) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Core Info Header Block */}
            <div className="bg-[#121212] border border-neutral-850 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Image
                    width={55}
                    height={55}
                    src={companyLogo}
                    alt={companyName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100">
                    {title}
                  </h1>
                  <p className="text-sm text-purple-400 font-medium capitalize mt-0.5">
                    {companyName || "Confidential Organization"} • <span className="text-neutral-500 text-xs">{category}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Core Segment Blocks: Responsibilities */}
            <div className="bg-[#121212] border border-neutral-850 p-6 rounded-2xl space-y-3">
              <h2 className="text-md font-semibold text-neutral-200 flex items-center gap-2.5">
                <Rocket className="text-purple-400 w-4 h-4" />
                Key Responsibilities
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
                {responsibilities || "No explicit responsibilities declared for this opening."}
              </p>
            </div>

            {/* Core Segment Blocks: Requirements */}
            <div className="bg-[#121212] border border-neutral-850 p-6 rounded-2xl space-y-3">
              <h2 className="text-md font-semibold text-neutral-200 flex items-center gap-2.5">
                <ShieldCheck className="text-pink-400 w-4 h-4" />
                Requirements & Qualifications
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
                {requirements || "No baseline requirements summarized for this opening."}
              </p>
            </div>

            {/* Core Segment Blocks: Perks & Benefits */}
            <div className="bg-[#121212] border border-neutral-850 p-6 rounded-2xl space-y-3">
              <h2 className="text-md font-semibold text-neutral-200 flex items-center gap-2.5">
                <Gift className="text-emerald-400 w-4 h-4" />
                Compensations & Benefits
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-line">
                {benefits || "Standard baseline company compensation structures apply."}
              </p>
            </div>

          </div>

          {/* Quick Metrics Action Box Panel Sidebar (Right Column) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#121212] border border-neutral-850 p-6 rounded-2xl space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
                Job Summary
              </h3>

              {/* Param Grid Context Meta Fields */}
              <div className="space-y-4">

                {/* 1. Salary Field Container */}
                <div className="flex items-start gap-3">
                  <CircleDollar className="text-emerald-400 w-4 h-4 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="block text-xs text-neutral-500">Offered Salary</span>
                    <span className="text-sm font-medium text-neutral-200">
                      {minSalary && maxSalary
                        ? `${formatSalary(minSalary)} – ${formatSalary(maxSalary)} / mo`
                        : "Competitive / Undisclosed"}
                    </span>
                  </div>
                </div>

                {/* 2. Employment Type Container */}
                <div className="flex items-start gap-3">
                  <Clock className="text-pink-400 w-4 h-4 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="block text-xs text-neutral-500">Job Type</span>
                    <span className="text-sm font-medium text-neutral-200 capitalize">{type}</span>
                  </div>
                </div>

                {/* 3. Operational Location Container */}
                <div className="flex items-start gap-3">
                  <Briefcase className="text-purple-400 w-4 h-4 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="block text-xs text-neutral-500">Location</span>
                    <span className="text-sm font-medium text-neutral-200">
                      {city && country ? `${city}, ${country}` : "Global Remote"}
                    </span>
                  </div>
                </div>

                {/* 4. Timeline Deadline Container */}
                <div className="flex items-start gap-3">
                  <Calendar className="text-amber-400 w-4 h-4 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <span className="block text-xs text-neutral-500">Application Deadline</span>
                    <span className="text-sm font-medium text-neutral-200">{formatDate(deadline)}</span>
                  </div>
                </div>

              </div>

              {/* Big CTA Submission Button Action Element */}
              <Link href={`/jobs/${id}/apply`}>
                <button className="w-full cursor-pointer bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm py-3 px-4 rounded-xl transition-colors shadow-lg shadow-purple-600/10 active:scale-[0.98] transform duration-100">
                  Apply for this Position
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}