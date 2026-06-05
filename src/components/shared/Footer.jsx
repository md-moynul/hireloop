import { Link } from "@heroui/react";
import { Briefcase, LogoFacebook, LogoLinkedin, Globe } from "@gravity-ui/icons";

// Reusable Footer Links Configuration
const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salaries" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand" },
      { label: "Newsroom", href: "/news" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#050506] text-white border-t border-zinc-900/60 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Branding & Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Brand Presentation Column */}
          <div className="md:col-span-5 flex flex-col gap-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
              <div className="bg-indigo-600 p-2 rounded-xl text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                hireloop
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed font-normal">
              The AI-native career platform. Built for people who take their work seriously.
            </p>
          </div>

          {/* Navigation Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 md:justify-items-end">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-4 min-w-[120px]">
                <h3 className="text-indigo-500 text-sm font-semibold tracking-wider">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-zinc-400 hover:text-white transition-colors text-sm font-normal block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Socials & Dynamic Policies */}
        <div className="border-t border-zinc-900/80 pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          
          {/* Social Media Platform Row */}
          <div className="flex items-center gap-3">
            <Link 
              href="https://facebook.com" 
              className="w-10 h-10 bg-[#121214] hover:bg-zinc-800 border border-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            >
              <LogoFacebook className="w-5 h-5" />
            </Link>
            <Link 
              href="https://pinterest.com" 
              className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-center text-white transition-all shadow-md shadow-indigo-600/20"
            >
              <Globe className="w-5 h-5" />
            </Link>
            <Link 
              href="https://linkedin.com" 
              className="w-10 h-10 bg-[#121214] hover:bg-zinc-800 border border-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all"
            >
              <LogoLinkedin className="w-5 h-5" />
            </Link>
          </div>

          {/* Legal / Copyright Info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-zinc-600 font-normal text-center sm:text-right">
            <span>Copyright 2026 — hireloop</span>
            <div className="hidden sm:block text-zinc-800">|</div>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
                Terms & Policy
              </Link>
              <span>-</span>
              <Link href="/privacy" className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">
                Privacy Guideline
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}