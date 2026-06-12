"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Plus, Briefcase, ArrowRight } from "@gravity-ui/icons";

export default function NoJobsState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-105 rounded-2xl border border-dashed border-default-200 bg-content1/40 backdrop-blur-sm px-6 py-16 text-center">

            {/* Icon */}
            <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="size-9 text-primary" />
                </div>
                {/* Floating plus badge */}
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                    <Plus className="size-3.5 text-white" />
                </span>
            </div>

            {/* Text */}
            <h2 className="text-xl font-bold text-foreground mb-2">No Jobs Posted Yet</h2>
            <p className="text-default-500 text-sm max-w-sm leading-relaxed mb-8">
                You haven&apos;t posted any jobs yet. Start hiring by creating your first job listing and reach the best candidates on HireLoop.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link  href="/dashboard/recruiter/jobs/add-job">
                
                <Button
                    
                   
                    color="primary"
                    className="font-semibold px-6"
                >
                    <Plus className="size-4 mr-1" />
                    Post Your First Job
                </Button>
                </Link>
                <Link
                href="/dashboard/recruiter">                
                <Button                    
                    variant="flat"
                    className="font-medium"
                >
                    Go to Dashboard
                    <ArrowRight className="size-4 ml-1" />
                </Button>
                </Link>
            </div>

            {/* Subtle tip */}
            <p className="text-default-400 text-xs mt-8 max-w-xs leading-relaxed">
                💡 Tip: Make sure your company profile is complete before posting a job to attract more applicants.
            </p>
        </div>
    );
}