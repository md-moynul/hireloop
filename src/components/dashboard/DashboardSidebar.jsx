"use client";

import React, { useState } from "react";
import { 
  LayoutSideContentLeft, 
  Gear, 
  LayoutCellsLarge, 
  ChartColumn, 
  Suitcase, 
  Receipt 
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export default function DashboardSidebar({ activeTab = "dashboard/recruiter", setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const navItems = [
    { icon: LayoutCellsLarge, label: "Dashboard", id: "dashboard/recruiter" },
    { icon: ChartColumn, label: "My Company", id: "my-company" },
    { icon: Suitcase, label: "Manage Jobs", id: "manage-jobs" },
    { icon: Receipt, label: "Applications", id: "applications" },
    { icon: Gear, label: "Settings", id: "settings" },
  ];

  const navLinks = (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        // Dynamically evaluates state from activeTab prop
        const isActive = item.id === activeTab;

        return (
          <Link  key={item.label} href={`/${item.id}`} >

          
          <button
           
            type="button"
            onClick={() => {
              if (setActiveTab) setActiveTab(item.id);
              onClose(); // Auto-closes responsive mobile drawer menu upon interaction
            }}
            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all group duration-200 text-left relative cursor-pointer ${
              isActive 
                ? "bg-[#1c1c1f] text-white" 
                : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141417]/50"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <IconComponent className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`} />
              <span>{item.label}</span>
            </div>

            {/* Active state line indicator */}
            {isActive && (
              <div className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-white rounded-l" />
            )}
          </button>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="bg-[#0d0d0f]">
      
      {/* Mobile Header and Trigger */}
      <div className="lg:hidden p-4 border-b border-zinc-900 bg-[#0d0d0f] w-full flex items-center justify-between">
        <Button 
          onPress={onOpen}
          variant="flat" 
          size="sm"
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 gap-2 font-medium rounded-xl px-4 cursor-pointer"
        >
          <LayoutSideContentLeft className="w-4 h-4" />
          Menu
        </Button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 p-5 border-r h-screen border-zinc-900 bg-[#0d0d0f] sticky top-0">
        {navLinks}
      </aside>

      {/* Mobile Drawer Overlay */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left" className="bg-[#0d0d0f] border-r border-zinc-900 max-w-70">
        <Drawer.Content className="bg-[#0d0d0f] p-5 text-white">
          {() => (
            <>
              <Drawer.Header className="p-0 mb-6">
              </Drawer.Header>
              <Drawer.Body className="p-0">
                {navLinks}
              </Drawer.Body>
            </>
          )}
        </Drawer.Content>
      </Drawer>

    </div>
  );
}