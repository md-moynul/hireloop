import { getAllJobs } from "@/lib/api/job"; // Assuming you have a company fetcher
import React from "react";
import { getCompanyById } from "@/lib/api/company";
import FilteredJobs from "@/components/job/FilteredJobs";

export default async function JobsPage() {
  const allJobs = await getAllJobs() || [];
  
  // Fetch and attach company details to each job on the server
  const jobsWithCompanies = await Promise.all(
    allJobs.map(async (job) => {
      if (job.companyId) {
        try {
          const company = await getCompanyById(job.companyId);
          return {
            ...job,
            companyName: company?.name,
            companyLogo: company?.logo
          };
        } catch (err) {
          console.error("Failed fetching company info for:", job.companyId);
        }
      }
      return job;
    })
  );

  const categories = ["Technology", "Design", "Marketing", "Finance", "Management"];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-4 py-12 md:px-8 lg:px-16">
      <header className="max-w-6xl mx-auto text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full text-xs text-purple-400 font-medium tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
          {allJobs.length} {allJobs.length === 1 ? "Job Available" : "Jobs Available"}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-b from-white to-neutral-400 bg-clip-text text-transparent">
          Explore Available Roles
        </h1>
      </header>

      {/* Pass the fully enriched data array here */}
      <FilteredJobs allJobs={jobsWithCompanies} categories={categories} />
    </div>
  );
}