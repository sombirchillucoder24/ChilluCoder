"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Navbar } from "@/components/Navbar";
import LanguageBar from "@/components/LanguageBar";
import { Sidebar } from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { useLoading } from '@/context/LoadingContext'

interface TutorialLayoutProps {
  children: ReactNode;
  params: { topic: string };
}

export default function TutorialLayout({
  children,
  params,
}: TutorialLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { startLoading, stopLoading } = useLoading()

  useEffect(() => {
    startLoading()

    const handleResize = () => {
      const nowMobile = window.innerWidth < 768;
      setIsMobile(nowMobile);
      if (!nowMobile) setIsMobileSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
     return () => {
      stopLoading()
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobile &&
        isMobileSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest(".mobile-menu-button")
      ) {
        setIsMobileSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isMobileSidebarOpen]);

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        {/* Header Section - Sticky at top */}
        <Topbar />
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b shadow-sm">
          <Navbar />
          <LanguageBar />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row flex-1 relative overflow-hidden">
          {/* Sidebar */}
          <div ref={sidebarRef} className="z-40">
            <Sidebar
              isMobile={isMobile}
              isMobileOpen={isMobileSidebarOpen}
              toggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              topic={params.topic}
            />
          </div>

          {/* Scrollable Content Area */}
          <div
            ref={contentRef}
            className="flex-1 flex flex-col overflow-y-auto"
          >
            {/* Mobile Menu Button */}
            {isMobile && !isMobileSidebarOpen && (
              <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b mb-4 md:hidden">
                <div className="flex items-center h-12">
                  <button
                    className="mobile-menu-button ml-2 p-2 bg-white dark:bg-gray-800 rounded shadow text-gray-700 dark:text-gray-200"
                    onClick={() => setIsMobileSidebarOpen(true)}
                    aria-label="Open Sidebar"
                  >
                    <FaBars />
                  </button>
                </div>
              </div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-6 pt-4 md:pt-6 w-full">{children}</main>
          </div>

          {/* Right Empty Panel */}
          <aside className="hidden xl:block w-1/5" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
