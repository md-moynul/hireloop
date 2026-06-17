"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import { CircleDollar, ArrowLeft, CloudArrowUpIn, Globe, ChevronRight } from "@gravity-ui/icons";
import Link from "next/link";
import { applicationSubmit } from "@/lib/action/application";
import { toast } from "react-toastify";

export default function JobApply({ job, candidate }) {

    const [formData, setFormData] = useState({
        coverLetter: "",
        expectedSalary: job?.minSalary || "",
        noticePeriod: "",
        resumeLink: "",
        portfolioLink: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);



    // Handle standard controlled changes across text/number/url elements
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Payload structure fully ready for your API or Server Action integration
        const submissionData = {
            jobId: job._id,
            candidateId: candidate?.id,
            candidateName: candidate?.name,
            candidateEmail: candidate?.email,
            companyId: job.companyId,
            ...formData,
            createdAt: new Date().toISOString()
        };

        console.log("Submitting Link-Based Application:", submissionData);

        // Simulate API delay
        setTimeout(async () => {
            setIsSubmitting(false);
            const data = await applicationSubmit(submissionData)
            if (data.insertedId) {
                toast.success("Application submitted successfully!");
            }
            setFormData({
                coverLetter: "",
                expectedSalary: job?.minSalary || "",
                noticePeriod: "",
                resumeLink: "",
                portfolioLink: "",
            })
            window.location.reload();
        }, 1500);
    };

    // Safe formatting helper matching your design system
    const formatSalary = (amount) => {
        if (!amount) return "";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: job?.currency || "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-black text-neutral-100 py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6">

                {/* Navigation Breadcrumb */}
                <Link
                    href={`/jobs/${job._id}`}
                    className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors group no-underline"
                >
                    <ArrowLeft className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" />
                    Back to Job Details
                </Link>

                {/* Info Header Banner Box */}
                <div className="bg-[#121212] border border-neutral-850 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                            Applying For
                        </span>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-100 mt-0.5">
                            {job?.title || "Backend Engineer"}
                        </h1>
                        <p className="text-sm text-neutral-400 mt-1">
                            {job?.companyName || "Organization"} • <span className="text-xs text-neutral-500">{job?.type}</span>
                        </p>
                    </div>

                    <div className="bg-[#1A1A1A] border border-neutral-800/60 px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs text-neutral-300">
                        <CircleDollar className="text-emerald-400 w-4 h-4" />
                        <span>Range: {formatSalary(job?.minSalary)} - {formatSalary(job?.maxSalary)} / mo</span>
                    </div>
                </div>

                {/* Master Form Card Container */}
                <form onSubmit={handleSubmit}>
                    <Card className="w-full bg-[#121212] border border-neutral-850 text-white rounded-2xl p-6 sm:p-8 space-y-6">

                        {/* Candidate Identity Autocomplete Context Preview */}
                        <div className="border-b border-neutral-800/60 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <span className="block text-xs text-neutral-500">Applicant Name</span>
                                <span className="text-sm font-medium text-neutral-200">
                                    {candidate?.name || "Candidate Profile"}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <span className="block text-xs text-neutral-500">Email Address</span>
                                <span className="text-sm font-medium text-neutral-200">
                                    {candidate?.email || "candidate@example.com"}
                                </span>
                            </div>
                        </div>

                        {/* Row 1: Compensation and Hiring Specs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* Expected Salary Field */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-400">
                                    Expected Salary ({job?.currency || "USD"} / month) *
                                </label>
                                <input
                                    type="number"
                                    name="expectedSalary"
                                    required
                                    min={1}
                                    value={formData.expectedSalary}
                                    onChange={handleChange}
                                    placeholder="e.g. 5000"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            {/* Notice Period Field */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-400">
                                    Notice Period *
                                </label>
                                <input
                                    type="text"
                                    name="noticePeriod"
                                    required
                                    value={formData.noticePeriod}
                                    onChange={handleChange}
                                    placeholder="e.g. Immediate, 1 month"
                                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                        </div>

                        {/* Row 2: Links Integration Layout (Replaced file upload section) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            {/* CV / Resume Online Link Input */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-400">
                                    CV / Resume Link *
                                </label>
                                <div className="relative">
                                    <ChevronRight className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 w-4 h-4" />
                                    <input
                                        type="url"
                                        name="resumeLink"
                                        required
                                        value={formData.resumeLink}
                                        onChange={handleChange}
                                        placeholder="https://drive.google.com/... or LinkedIn PDF link"
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Portfolio Link Input */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-400">
                                    Portfolio Link (Optional)
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 w-4 h-4" />
                                    <input
                                        type="url"
                                        name="portfolioLink"
                                        value={formData.portfolioLink}
                                        onChange={handleChange}
                                        placeholder="https://yourwebsite.com or github.com/username"
                                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Cover Letter Text Area Field Block */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-neutral-400">
                                Cover Letter / Intro Note
                            </label>
                            <textarea
                                name="coverLetter"
                                rows={5}
                                value={formData.coverLetter}
                                onChange={handleChange}
                                placeholder="Briefly state why you're a great fit for this position..."
                                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                            />
                        </div>

                        {/* Form submission action controls row */}
                        <div className="pt-4 border-t border-neutral-800/60 flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-purple-600 hover:bg-purple-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <span>Submit Application</span>
                                        <CloudArrowUpIn style={{ width: "14px", height: "14px" }} />
                                    </>
                                )}
                            </Button>
                        </div>

                    </Card>
                </form>

            </div>
        </div>
    );
}