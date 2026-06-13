import React from "react";
import { Card } from "@heroui/react";
import Link from "next/link";
import { Briefcase, Clock, ArrowRight, CircleDollar } from "@gravity-ui/icons";
import Image from "next/image";

export default function JobCard({ job }) {
  // Safe extraction for both regular string IDs and MongoDB wrapper objects
  const jobId = job._id?.$oid || job._id;

  const {
    title,
    city,
    country,
    type,
    minSalary,
    maxSalary,
    currency,
    description,
    companyName,
    companyLogo
  } = job;


  const formatSalary = (amount) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }
    ).format(amount);
  };

  return (
    <Card className="w-full bg-[#121212] border border-neutral-850 text-white rounded-2xl p-6 transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1 flex flex-col justify-between min-h-77.5">

      {/* 1. Header: Company Info + Job Title */}
      <Card.Header className="flex flex-col gap-3 p-0 items-start">

        {/* Company Identity Row */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
            <Image
              width={35}
              height={35}
              src={companyLogo}
              alt={companyName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs font-medium text-neutral-400 tracking-wide">
            {companyName}
          </span>
        </div>

        {/* Job Title & Description */}
        <div className="space-y-1.5 mt-1">
          <Card.Title className="text-lg font-semibold tracking-tight text-neutral-100">
            {title}
          </Card.Title>
          <Card.Description className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {description || "Showcase your commitment to diversity and inclusion by highlighting initiatives."}
          </Card.Description>
        </div>
      </Card.Header>

      {/* 2. Content Section: Gravity UI Badges */}
      <Card.Content className="flex flex-col gap-2.5 my-5 p-0">
        <div className="flex flex-wrap gap-2">
          {/* Location */}
          <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full text-[11px] text-neutral-300 border border-neutral-800/40">
            <Briefcase className="text-purple-400 w-3.5 h-3.5" />
            <span>{`${city}, ${country}`}</span>
          </div>

          {/* Job Type */}
          <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full text-[11px] text-neutral-300 border border-neutral-800/40">
            <Clock className="text-pink-400 w-3.5 h-3.5" />
            <span>{type}</span>
          </div>
        </div>

        {/* Salary Spread */}
        <div className="flex items-center gap-2 bg-[#1A1A1A] px-3 py-1.5 rounded-full text-[11px] text-neutral-300 border border-neutral-800/40 w-full">
          <CircleDollar className="text-emerald-400 w-3.5 h-3.5" />
          <span>{`${formatSalary(minSalary)} – ${formatSalary(maxSalary)} / month`}</span>
        </div>
      </Card.Content>

      {/* 3. Footer Action Link */}
      <Card.Footer className="p-0 flex justify-start mt-auto">
        <Link
          href={`/jobs/${jobId}`}
          className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors group no-underline"
        >
          Apply Now
          <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </Card.Footer>
    </Card>
  );
}