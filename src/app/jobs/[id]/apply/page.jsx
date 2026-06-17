import { getJobByJobId } from '@/lib/api/job';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Star } from '@gravity-ui/icons';
import { getApplicationByCandidateId } from '@/lib/api/application';
import { getPlanById } from '@/lib/api/plans';

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  // 1. Guard Clause: Protect route from unauthenticated users
  if (!user) {
    redirect(`/login?redirected=/jobs/${id}/apply `);
  }

  // 2. Guard Clause: Restrict route access by role profile types
  if (user.role !== 'candidate') {
    return (
      <div className="min-h-screen bg-black text-neutral-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#121212] border border-neutral-850 p-8 rounded-2xl text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <ShieldCheck style={{ width: '32px', height: '32px' }} />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-neutral-100 tracking-tight">Access Restricted</h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Only <span className="text-purple-400 font-semibold">Candidate</span> profiles can submit job applications.
            </p>
          </div>
          <hr className="border-neutral-800/60" />
          <div className="grid grid-cols-1 gap-3">
            <Link 
              href={`/jobs/${id}`}
              className="w-full bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-200 font-medium text-xs py-3 px-4 rounded-xl transition-colors no-underline flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Return to Job Specifications
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Parallel Server Fetch
  const [applications, job,plan] = await Promise.all([
    getApplicationByCandidateId(user.id),
    getJobByJobId(id),
    getPlanById(user?.plan || 'seekers_free')
  ]);

  // Plan Meta-Data Schema Definition
  // const plan = {
  //   name: "Free",
  //   maxApplicationsPerMonth: 3
  // };

  const currentCount = applications?.length || 0;
  const availableApplications = Math.max(0, plan.maxApplicationsPerMonth - currentCount);
  
  // Calculate Progress Percentage (capped at 100)
  const usagePercentage = Math.min(100, (currentCount / plan.maxApplicationsPerMonth) * 100);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 flex justify-center items-start">
      <div className="max-w-3xl w-full space-y-6">
        
        {/* Big Centered Activity Tracker Header */}
        <header className="w-full bg-[#121212] border border-neutral-850 rounded-2xl py-8 px-6 flex flex-col items-center justify-center text-center gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
              Usage Limits &amp; Activity
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              This Month&apos;s Applications: <span className="text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-xl ml-1 inline-block">{currentCount}</span>
            </h2>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full max-w-md mt-2 space-y-2">
            <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800/60">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  availableApplications > 0 ? 'bg-linear-to-r from-purple-500 to-pink-500' : 'bg-red-500'
                }`}
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-neutral-500 font-medium px-0.5">
              <span>{currentCount} used</span>
              <span>{plan.maxApplicationsPerMonth} total monthly limit</span>
            </div>
          </div>
        </header>

        {/* Dynamic Section: Show Application Form OR Upgrade CTA Section */}
        <div className="w-full">
          {availableApplications > 0 ? (
            /* User has remaining applications -> Show the form */
            <JobApply job={job} candidate={user} remainingSlots={availableApplications} />
          ) : (
            /* User is out of applications -> Show premium pricing unlock card */
            <section className="w-full bg-[#121212] border border-neutral-850 rounded-2xl p-8 text-center space-y-6 flex flex-col items-center">
              
              {/* Premium Icon Badge */}
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Star style={{ width: '24px', height: '24px' }} />
              </div>

              {/* Text Block */}
              <div className="space-y-2 max-w-md">
                <h3 className="text-xl font-bold text-neutral-100 tracking-tight">
                  Monthly Limit Reached
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  You&apos;ve reached your maximum of <span className="text-white font-semibold">{plan.maxApplicationsPerMonth} applications</span> on our <span className="text-purple-400 font-medium">{plan.name} plan</span>. Upgrade your plan to gain unlimited submissions.
                </p>
              </div>

              <hr className="border-neutral-850 w-full max-w-sm" />

              {/* Redirection Trigger Elements */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
                <Link
                  href="/pricing"
                  className="bg-white hover:bg-neutral-200 text-black font-semibold text-xs py-3 px-6 rounded-xl transition-all no-underline shadow-lg shadow-white/5 active:scale-95"
                >
                  View Premium Plans
                </Link>
                
                <Link
                  href="/jobs"
                  className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 font-medium text-xs py-3 px-5 rounded-xl transition-colors no-underline flex items-center justify-center"
                >
                  Back to job board
                </Link>
              </div>

            </section>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ApplyPage;