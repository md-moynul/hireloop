"use client";

import React, { useState } from "react";
import Image from "next/image"; 
import {
    Form,
    TextField,
    Label,
    Input,
    FieldError,
    Select,
    ListBox,
    Button
} from "@heroui/react"; // HeroUI v3 Imports
import {
    Factory,
    Pencil,
    Plus,
    ArrowUpToLine,
    Globe,
    MapPin,
    Persons,
    CircleCheck,
    Clock,
    CircleXmark
} from "@gravity-ui/icons";
import { createCompany } from "@/lib/action/company";
import { toast } from "react-toastify";

export default function CompanyProfile() {
    // --- STATE MANAGEMENT ---
    const [company, setCompany] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [logoUrl, setLogoUrl] = useState("");

    // --- IMGBB IMAGE UPLOAD HANDLER ---
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                // Using display_url ensures we grab the direct image link asset string
                setLogoUrl(data.data.display_url);
            } else {
                alert("Failed to upload image to ImgBB.");
            }
        } catch (error) {
            console.error("Error uploading logo:", error);
        } finally {
            setIsUploading(false);
        }
    };

    // --- FORM SUBMISSION ---
    const handleFormSubmit = async(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        const updatedCompany = {
            name: data.companyName,
            category: data.category,
            website: data.website,
            location: data.location,
            employeeCount: data.employeeCount,
            description: data.description,
            logo: logoUrl || (company?.logo || ""),
            status: company?.status || "Pending", 
        };

        setCompany(updatedCompany);
        setIsEditing(false);
        console.log(updatedCompany);
        const result = await createCompany(updatedCompany)
        if ((result.insertedId)) {
            toast.success('Company create successful')
        }
    };

    // --- STATUS BADGE RENDERER ---
    const renderStatusBadge = (status) => {
        const statusStyles = {
            Pending: "bg-warning/10 text-warning border-warning/20",
            Approved: "bg-success/10 text-success border-success/20",
            Rejected: "bg-danger/10 text-danger border-danger/20",
        };

        const statusIcons = {
            Pending: <Clock className="size-3.5" />,
            Approved: <CircleCheck className="size-3.5" />,
            Rejected: <CircleXmark className="size-3.5" />,
        };

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${statusStyles[status] || statusStyles.Pending}`}>
                {statusIcons[status] || statusIcons.Pending}
                {status || "Pending"}
            </span>
        );
    };

    const displayPreviewLogo = logoUrl || company?.logo;

    // ==========================================
    // 1. EMPTY PROMPT STATE (No Company Registered)
    // ==========================================
    if (!company && !isEditing) {
        return (
            <div className="max-w-xl mx-auto my-12 p-8 text-center border border-default-100 rounded-2xl bg-content1/50 backdrop-blur-md">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Factory className="text-primary size-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Company Registered</h3>
                <p className="text-default-500 text-sm mb-6 max-w-sm mx-auto">
                    You need to register your company details before you can begin posting open job positions on HireLoop.
                </p>
                <Button
                    onPress={() => {
                        setLogoUrl("");
                        setIsEditing(true);
                    }}
                    color="primary"
                    className="font-medium"
                >
                    <Plus className="size-4 mr-1" /> Register Company
                </Button>
            </div>
        );
    }

    // ==========================================
    // 2. FORM STATE (Register / Edit Mode)
    // ==========================================
    if (isEditing) {
        return (
            <div className="max-w-2xl mx-auto my-6 p-6 rounded-2xl bg-[#121212] border border-default-100/10 text-foreground">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold">
                            {company ? "Edit Company Details" : "Register New Company"}
                        </h2>
                        <p className="text-xs text-default-400 mt-1">
                            Enter your business details to start hiring on HireLoop.
                        </p>
                    </div>
                    <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={() => setIsEditing(false)}
                        aria-label="Close form"
                    >
                        <CircleXmark className="size-5" />
                    </Button>
                </div>

                <Form
                    className="space-y-6 w-full"
                    onSubmit={handleFormSubmit}
                    validationBehavior="native"
                >
                    {/* Company Name & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField isRequired name="companyName" type="text" defaultValue={company?.name || ""}>
                            <Label className="text-sm font-medium">Company Name</Label>
                            <Input placeholder="e.g. Acme Corp" />
                            <FieldError className="text-xs text-danger mt-1" />
                        </TextField>

                        <Select
                            className="w-full"
                            name="category"
                            placeholder="Select sector"
                            isRequired
                            defaultSelectedKeys={company?.category ? [company.category] : undefined}
                        >
                            <Label className="text-sm font-medium">Industry / Category</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="technology" textValue="Technology">Technology</ListBox.Item>
                                    <ListBox.Item id="design" textValue="Design">Design</ListBox.Item>
                                    <ListBox.Item id="marketing" textValue="Marketing">Marketing</ListBox.Item>
                                    <ListBox.Item id="finance" textValue="Finance">Finance</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Website URL & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField isRequired name="website" type="url" defaultValue={company?.website || ""}>
                            <Label className="text-sm font-medium">Website URL</Label>
                            <div className="flex rounded-medium bg-default-100 border border-transparent focus-within:border-primary overflow-hidden">
                                <span className="text-xs px-3 bg-default-200 text-default-500 flex items-center justify-center border-r border-default-300/30">
                                    https://
                                </span>
                                <Input placeholder="www.company.com" className="bg-transparent border-0 w-full" />
                            </div>
                            <FieldError className="text-xs text-danger mt-1" />
                        </TextField>

                        <TextField isRequired name="location" type="text" defaultValue={company?.location || ""}>
                            <Label className="text-sm font-medium">Location</Label>
                            <div className="relative w-full">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400 size-4 z-10" />
                                <Input placeholder="City, Country" className="pl-9" />
                            </div>
                            <FieldError className="text-xs text-danger mt-1" />
                        </TextField>
                    </div>

                    {/* Employee Count & Logo Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                        <Select
                            className="w-full"
                            name="employeeCount"
                            placeholder="Select range"
                            isRequired
                            defaultSelectedKeys={company?.employeeCount ? [company.employeeCount] : undefined}
                        >
                            <Label className="text-sm font-medium">Employee Count Range</Label>
                            <Select.Trigger>
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="1-10" textValue="1-10 employees">1-10 employees</ListBox.Item>
                                    <ListBox.Item id="11-50" textValue="11-50 employees">11-50 employees</ListBox.Item>
                                    <ListBox.Item id="51-200" textValue="51-200 employees">51-200 employees</ListBox.Item>
                                    <ListBox.Item id="201+" textValue="201+ employees">201+ employees</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <div>
                            <Label className="text-sm font-medium block mb-1.5">Company Logo</Label>
                            <div className="flex items-center gap-4">
                                <label className="relative flex flex-col items-center justify-center w-24 h-20 border-2 border-dashed border-default-200 hover:border-primary rounded-xl cursor-pointer bg-default-50/50 transition group overflow-hidden">
                                    {displayPreviewLogo ? (
                                        <div className="absolute inset-0 w-full h-full">
                                            <Image
                                                src={displayPreviewLogo}
                                                alt="Uploaded logo preview"
                                                fill
                                                sizes="96px"
                                                className="object-cover group-hover:opacity-40 transition"
                                                referrerPolicy="no-referrer"
                                                priority
                                            />
                                            {/* Hover overlay toggle control context */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition gap-0.5">
                                                <ArrowUpToLine className="size-4 text-white" />
                                                <span className="text-[9px] text-white font-medium">Change</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <ArrowUpToLine className="size-5 text-default-400 group-hover:text-primary transition" />
                                            <span className="text-[10px] text-default-400 mt-1">Upload</span>
                                        </>
                                    )}
                                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                                </label>

                                <div className="text-xs text-default-400 flex flex-col gap-1">
                                    <span>PNG, JPG up to 5MB</span>
                                    {isUploading && <span className="text-primary font-medium animate-pulse">Uploading to ImgBB...</span>}
                                    {displayPreviewLogo && !isUploading && (
                                        <span className="text-success flex items-center gap-1 font-medium">
                                            <CircleCheck className="size-3" /> Ready
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <TextField isRequired name="description" type="text" defaultValue={company?.description || ""}>
                        <Label className="text-sm font-medium">Brief Description</Label>
                        <Input as="textarea" className="min-h-25 py-2" placeholder="Tell us about your company's mission and culture..." />
                        <FieldError className="text-xs text-danger mt-1" />
                    </TextField>

                    {/* Action Footer Button Configurations */}
                    <div className="pt-4 border-t border-default-100/10 flex justify-end gap-3">
                        <Button variant="flat" onPress={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" color="primary" className="font-semibold px-6" isLoading={isUploading}>
                            {company ? "Save Changes" : "Register Company"}
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }

    // ==========================================
    // 3. SHOW DETAILS STATE (Active Dashboard view)
    // ==========================================
    return (
        <div className="max-w-3xl mx-auto my-6 p-6 rounded-2xl bg-content1 border border-default-100 text-foreground shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-default-100">
                <div className="flex gap-4 items-center">
                    {company?.logo ? (
                        <div className="relative w-16 h-16 overflow-hidden rounded-xl border border-default-200 flex-shrink-0">
                            <Image
                                src={company.logo}
                                alt={`${company.name} logo`}
                                fill
                                sizes="64px"
                                className="object-cover"
                                referrerPolicy="no-referrer"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-xl bg-default-100 flex items-center justify-center border border-default-200 flex-shrink-0">
                            <Factory className="text-default-400 size-6" />
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h2 className="text-2xl font-bold tracking-tight">{company?.name}</h2>
                            {renderStatusBadge(company?.status)}
                        </div>
                        <p className="text-sm text-primary font-medium mt-0.5 capitalize">{company?.category}</p>
                    </div>
                </div>

                <Button
                    variant="flat"
                    size="sm"
                    onPress={() => setIsEditing(true)}
                    className="font-medium"
                >
                    <Pencil className="size-3.5 mr-1" /> Edit Profile
                </Button>
            </div>

            {/* Corporate Metadata Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-sm">
                <div className="flex items-center gap-2.5 text-default-600">
                    <Globe className="text-default-400 size-4" />
                    <a href={company?.website} target="_blank" rel="noreferrer" className="hover:text-primary transition line-clamp-1">
                        {company?.website?.replace(/^(https?:\/\/)?(www\.)?/, "")}
                    </a>
                </div>
                <div className="flex items-center gap-2.5 text-default-600">
                    <MapPin className="text-default-400 size-4" />
                    <span className="line-clamp-1">{company?.location}</span>
                </div>
                <div className="grid-cols-1 flex items-center gap-2.5 text-default-600">
                    <Persons className="text-default-400 size-4" />
                    <span>{company?.employeeCount} employees</span>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-default-400">About Company</h3>
                <p className="text-default-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {company?.description}
                </p>
            </div>
        </div>
    );
}