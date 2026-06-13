import { getJobByJobId } from '@/lib/api/job';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import Link from 'next/link';
import { ChevronLeft, ShieldCheck } from '@gravity-ui/icons';

const ApplyPage = async({params}) => {
    const {id} = await params;
    const user =await getUserSession()
    console.log(id);
    
    if(!user){
        redirect(`/login?redirected=/jobs/${id}/apply `)
    }
   if (user.role !== 'candidate') {
    return (
      <div className="min-h-screen bg-black text-neutral-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#121212] border border-neutral-850 p-8 rounded-2xl text-center space-y-6">
          
          {/* Security Alert Icon Layout */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <ShieldCheck style={{ width: '32px', height: '32px' }} />
          </div>

          {/* Error Details */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-neutral-100 tracking-tight">
              Access Restricted
            </h1>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Only verified <span className="text-purple-400 font-semibold">Candidate</span> profiles can submit job applications. Your current account role is listed as <span className="text-neutral-200 capitalize underline font-medium">{user.role}</span>.
            </p>
          </div>

          <hr className="border-neutral-800/60" />

          {/* Quick Action Navigation Grid Layout */}
          <div className="grid grid-cols-1 gap-3">
            <Link 
              href={`/jobs/${id}`}
              className="w-full bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-200 font-medium text-xs py-3 px-4 rounded-xl transition-colors no-underline flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Return to Job Specifications
            </Link>
            
            <Link 
              href="/jobs"
              className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors no-underline"
            >
              Browse all open listings
            </Link>
          </div>

        </div>
      </div>
    );
  }
    const job = await getJobByJobId(id)
    console.log(job);
    
    return (
        <JobApply job={job} candidate={user} />
    );
};

export default ApplyPage;