"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutSideContentLeft,
  LayoutCellsLarge,
  ChartColumn,
  Suitcase,
  Receipt,
  Gear,
  Plus,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export default function DashboardSidebar({ recruiter }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hasCompany = !!recruiter;

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const navItems = hasCompany
    ? [
        {
          icon: LayoutCellsLarge,
          label: "Dashboard",
          href: "/dashboard/recruiter",
        },
        {
          icon: ChartColumn,
          label: "Company Profile",
          href: "/dashboard/recruiter/company-profile",
        },
        {
          icon: Suitcase,
          label: "All Jobs",
          href: "/dashboard/recruiter/jobs",
        },
        {
          icon: Plus,
          label: "Add Job",
          href: "/dashboard/recruiter/jobs/add-job",
        },
        {
          icon: Receipt,
          label: "Applications",
          href: "/dashboard/recruiter/applications",
        },
        {
          icon: Gear,
          label: "Settings",
          href: "/dashboard/recruiter/settings",
        },
      ]
    : [
        {
          icon: LayoutCellsLarge,
          label: "Dashboard",
          href: "/dashboard/recruiter",
        },
        {
          icon: ChartColumn,
          label: "Company Profile",
          href: "/dashboard/recruiter/company-profile",
        },
        {
          icon: Suitcase,
          label: "All Jobs",
          href: "/dashboard/recruiter/jobs",
        },
        {
          icon: Plus,
          label: "Add Job",
          href: "/dashboard/recruiter/jobs/add-job",
          disabled: true,
        },
        {
          icon: Receipt,
          label: "Applications",
          href: "/dashboard/recruiter/applications",
        },
        {
          icon: Gear,
          label: "Settings",
          href: "/dashboard/recruiter/settings",
        },
      ];

  const navLinks = (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = pathname === item.href;
        const isDisabled = item.disabled;

        const buttonContent = (
          <button
            type="button"
            disabled={isDisabled}
            className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all text-left relative group ${
              isDisabled
                ? "text-zinc-600 cursor-not-allowed opacity-50"
                : isActive
                ? "bg-[#1c1c1f] text-white cursor-pointer"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141417]/50 cursor-pointer"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <IconComponent
                className={`w-5 h-5 ${
                  isDisabled
                    ? "text-zinc-600"
                    : isActive
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              <span>{item.label}</span>
            </div>

            {isActive && !isDisabled && (
              <div className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-white rounded-l" />
            )}
          </button>
        );

        if (isDisabled) {
          return <div key={item.href}>{buttonContent}</div>;
        }

        return (
          <Link key={item.href} href={item.href} onClick={onClose}>
            {buttonContent}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="bg-[#0d0d0f]">
      {/* Mobile Header */}
      <div className="lg:hidden p-4 border-b border-zinc-900 flex items-center justify-between">
        <Button
          onPress={onOpen}
          variant="flat"
          size="sm"
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 gap-2 rounded-xl"
        >
          <LayoutSideContentLeft className="w-4 h-4" />
          Menu
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-zinc-900 p-5">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white">Hirelop</h2>
          <p className="text-sm text-zinc-500">Recruiter Panel</p>
        </div>

        {navLinks}

        {!hasCompany ? (
          <div className="mt-auto rounded-2xl border border-yellow-800 bg-yellow-900/20 p-4">
            <p className="text-sm font-medium text-yellow-300">
              Company Required
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              Register your company before posting jobs.
            </p>
            <Link href="/dashboard/recruiter/register-company">
              <Button className="mt-4 w-full" size="sm">
                <Plus className="w-4 h-4" />
                Register Company
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-sm font-medium text-white">Ready to hire?</p>
            <p className="mt-1 text-xs text-zinc-500">
              Publish a new job and reach more candidates.
            </p>
            <Link href="/dashboard/recruiter/jobs/add-job">
              <Button className="mt-4 w-full" size="sm">
                <Plus className="w-4 h-4" />
                Add Job
              </Button>
            </Link>
          </div>
        )}
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        className="bg-[#0d0d0f] border-r border-zinc-900 max-w-72"
      >
        <Drawer.Content className="bg-[#0d0d0f] text-white p-5">
          {() => (
            <>
              <Drawer.Header className="p-0 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Hirelop</h2>
                  <p className="text-sm text-zinc-500">Recruiter Panel</p>
                </div>
              </Drawer.Header>

              <Drawer.Body className="p-0">{navLinks}</Drawer.Body>
            </>
          )}
        </Drawer.Content>
      </Drawer>
    </div>
  );
}