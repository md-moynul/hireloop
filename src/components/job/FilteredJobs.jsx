"use client";

import React, { useState, useMemo } from "react";

import { Magnifier, Circles4Square } from "@gravity-ui/icons";
import { Select, Label, Description, ListBox, Checkbox } from "@heroui/react";
import JobCard from "./JobCard";

export default function FilteredJobs({ allJobs = [], categories = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  // Core filter calculation engine
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // 1. Category Filter (Case-insensitive)
      const matchesCategory =
        selectedCategory === "All" ||
        job.category?.toLowerCase() === selectedCategory.toLowerCase();

      // 2. Search Text Filter (Title, Company, City)
      const matchesSearch =
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.city?.toLowerCase().includes(searchQuery.toLowerCase());

      // 3. Remote Toggle Filter (Checks isRemote boolean)
      const matchesRemote = !isRemoteOnly || job.isRemote === true;

      // 4. Job Type Filter (Full-time, Part-time, etc.)
      const matchesType =
        selectedType === "All" ||
        job.type?.toLowerCase() === selectedType.toLowerCase();

      return matchesCategory && matchesSearch && matchesRemote && matchesType;
    });
  }, [allJobs, searchQuery, selectedCategory, isRemoteOnly, selectedType]);

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Dynamic Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-100 tracking-tight sm:text-3xl">
            Available Jobs
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Discover your next career move across our open global positions.
          </p>
        </div>
        
        {/* Visual Pill Badge for Live Job Count */}
        <div className="flex items-center gap-2 self-start sm:self-center bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            {filteredJobs.length} {filteredJobs.length === 1 ? "Position" : "Positions"} Found
          </span>
        </div>
      </header>
      
      {/* Search & Filter Grid Panel - Fixed 4 Columns on desktop */}
      <div className="w-full bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 backdrop-blur-sm grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        
        {/* 1. Search Input - md:col-span-1 */}
        <div className="relative w-full md:col-span-1 grid grid-cols-1 gap-1.5">
          <span className="text-xs font-medium text-neutral-400">Search Roles</span>
          <div className="relative">
            <Magnifier 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" 
              style={{ width: '16px', height: '16px' }} 
            />
            <input
              type="text"
              placeholder="Title, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* 2. Category Dropdown - md:col-span-1 */}
        <div className="w-full md:col-span-1 grid grid-cols-1 gap-1.5">
          <Select value={selectedCategory} onSelectionChange={(val) => setSelectedCategory(val || "All")}>
            <Label className="text-xs font-medium text-neutral-400">Job Category</Label>
            <Select.Trigger className="w-full flex items-center justify-between bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 px-3 py-2 rounded-xl focus:border-purple-500 cursor-pointer">
              <Select.Value>{selectedCategory === "All" ? "All Categories" : selectedCategory}</Select.Value>
              <Select.Indicator className="text-neutral-500 text-xs ml-2">▼</Select.Indicator>
            </Select.Trigger>
            
            <Select.Popover className="bg-neutral-950 border border-neutral-800 rounded-xl shadow-xl z-50 overflow-hidden mt-1 min-w-50">
              <ListBox className="p-1">
                <ListBox.Item className={`px-3 py-2 text-sm rounded-lg cursor-pointer ${selectedCategory === "All" ? "text-purple-400 bg-neutral-900" : "text-neutral-300"}`} onClick={() => setSelectedCategory("All")}>All Categories</ListBox.Item>
                {categories.map((cat) => (
                  <ListBox.Item key={cat} className={`px-3 py-2 text-sm rounded-lg cursor-pointer capitalize ${selectedCategory.toLowerCase() === cat.toLowerCase() ? "text-purple-400 bg-neutral-900" : "text-neutral-300"}`} onClick={() => setSelectedCategory(cat)}>
                    {cat}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* 3. Job Type Dropdown - md:col-span-1 */}
        <div className="w-full md:col-span-1 grid grid-cols-1 gap-1.5">
          <Select value={selectedType} onSelectionChange={(val) => setSelectedType(val || "All")}>
            <Label className="text-xs font-medium text-neutral-400">Job Type</Label>
            <Select.Trigger className="w-full flex items-center justify-between bg-neutral-950 border border-neutral-800 text-sm text-neutral-200 px-3 py-2 rounded-xl focus:border-purple-500 cursor-pointer">
              <Select.Value>{selectedType === "All" ? "All Types" : selectedType}</Select.Value>
              <Select.Indicator className="text-neutral-500 text-xs ml-2">▼</Select.Indicator>
            </Select.Trigger>
            
            <Select.Popover className="bg-neutral-950 border border-neutral-800 rounded-xl shadow-xl z-50 overflow-hidden mt-1 min-w-50">
              <ListBox className="p-1">
                <ListBox.Item className={`px-3 py-2 text-sm rounded-lg cursor-pointer ${selectedType === "All" ? "text-purple-400 bg-neutral-900" : "text-neutral-300"}`} onClick={() => setSelectedType("All")}>All Types</ListBox.Item>
                {jobTypes.map((type) => (
                  <ListBox.Item key={type} className={`px-3 py-2 text-sm rounded-lg cursor-pointer ${selectedType.toLowerCase() === type.toLowerCase() ? "text-purple-400 bg-neutral-900" : "text-neutral-300"}`} onClick={() => setSelectedType(type)}>
                    {type}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* 4. Remote Checkbox Inline Block - md:col-span-1 */}
        <div className="w-full md:col-span-1 grid grid-cols-1 pb-1">
          <Checkbox 
            isSelected={isRemoteOnly} 
            onChange={setIsRemoteOnly} // Fixed: Restored safe component state handler
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <Checkbox.Control className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${isRemoteOnly ? 'bg-purple-600 border-purple-500' : 'border-neutral-700 bg-neutral-950 group-hover:border-neutral-500'}`}>
              <Checkbox.Indicator className="text-white text-xs font-bold">
                {isRemoteOnly && "✓"}
              </Checkbox.Indicator>  
            </Checkbox.Control>
            <Checkbox.Content className="grid grid-cols-1">
              <Label className="text-sm font-medium text-neutral-300 cursor-pointer group-hover:text-white transition-colors">
                Remote Only
              </Label>
              <Description className="text-[11px] text-neutral-500 leading-none">
                Hide on-site positions
              </Description>
            </Checkbox.Content>
          </Checkbox>
        </div>

      </div>

      {/* Secondary Meta Counter Banner Row */}
      <div className="w-full flex justify-end text-xs text-neutral-500 px-2">
        Showing {filteredJobs.length} of {allJobs.length} total postings
      </div>

      {/* Main Results Listing Display Grid */}
      <main className="w-full">
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {filteredJobs.map((job) => (
              <JobCard key={job._id?.$oid || job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl bg-[#121212]/30 grid grid-cols-1 justify-items-center gap-3">
            <Circles4Square className="text-neutral-600 animate-pulse" style={{ width: '32px', height: '32px' }} />
            <p className="text-neutral-500 text-sm">No positions match your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}