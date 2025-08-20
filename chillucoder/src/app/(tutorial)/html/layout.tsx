"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Navbar } from "@/components/Navbar";
import LanguageBar from "@/components/LanguageBar";
import { Sidebar } from "@/components/Sidebar";
import { FaBars, FaTimes } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import { useLoading } from "@/context/LoadingContext";

interface TutorialLayoutProps {
  children: ReactNode;
  params: { topic: string };
}

export default function TutorialLayout({
  children,
  params,
}: TutorialLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();

    const handleResize = () => {
      const width = window.innerWidth;
      const nowMobile = width < 768;
      const nowTablet = width >= 768 && width < 1024;

      setIsMobile(nowMobile);
      setIsTablet(nowTablet);

      if (!nowMobile) setIsMobileSidebarOpen(false);

      if (nowTablet && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      stopLoading();
      window.removeEventListener("resize", handleResize);
    };
  }, [startLoading, stopLoading, isSidebarCollapsed]);

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

  const toggleSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const getSidebarWidth = () => {
    if (isMobile) return "w-80 max-w-[85vw]";
    if (isSidebarCollapsed) return "w-16";
    if (isTablet) return "w-56";
    return "w-64 lg:w-72 xl:w-80";
  };

  return (
    <div className="min-h-screen">
      <Topbar />
      {/* Header Section - Only Topbar is sticky */}
      <div className="sticky top-0 z-50">
        {/* Main Navigation and Language Bar - Sticky together */}
        <div className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 backdrop-blur-md bg-white/95 dark:bg-gray-900/95">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Navbar />
            </div>
          </div>
        </div>
      </div>
      <LanguageBar />
      <button
        onClick={toggleSidebar}
        className="mobile-menu-button p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 md:hidden group border border-gray-200 dark:border-gray-700"
        aria-label={isMobileSidebarOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isMobileSidebarOpen}
      >
        {isMobileSidebarOpen ? (
          <FaTimes
            size={18}
            className="group-hover:rotate-90 transition-transform"
          />
        ) : (
          <FaBars
            size={18}
            className="group-hover:scale-110 transition-transform"
          />
        )}
      </button>

      {/* Main Content Container */}
      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden md:block ${getSidebarWidth()} flex-shrink-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out`}
          aria-label="Main navigation"
        >
          <div
            className="sticky top-12 h-screen overflow-y-auto scrollbar scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
          >
            <Sidebar
              isMobile={false}
              isMobileOpen={false}
              toggleSidebar={toggleSidebar}
              topic={params.topic}
              collapsed={isSidebarCollapsed}
              toggleSidebarCollapse={toggleSidebarCollapse}
            />
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full z-50 ${getSidebarWidth()} bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 md:hidden ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-modal="true"
          role="dialog"
        >
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <Sidebar
              isMobile={true}
              isMobileOpen={isMobileSidebarOpen}
              toggleSidebar={toggleSidebar}
              topic={params.topic}
              collapsed={false}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col xl:flex-row min-w-0">
          {/* Scrollable Content */}
          <main className="flex-1 px-4 py-6 md:px-6 lg:px-8 min-w-0 overflow-hidden">
            <div className="max-w-full">
              <div className="prose dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none">
                {children}
              </div>
            </div>
          </main>

          {/* Right Panel (Ads Area) - Hidden on mobile */}
          <aside
            className={`
              ${isMobile ? "hidden" : ""} 
              ${isSidebarCollapsed && !isMobile ? "hidden xl:block" : "hidden lg:block"}
              ${isSidebarCollapsed ? "w-72 xl:w-80" : "w-64 xl:w-80"} 
              flex-shrink-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700
              sticky top-0 h-[calc(100vh)] overflow-y-auto
            `}
            aria-label="Additional information"
          >
            <div className="p-4">
              <div className="space-y-4">
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}