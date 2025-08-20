import { Topbar } from "@/components/Topbar";
import { Navbar } from "@/components/Navbar";
import LanguageBar from '@/components/LanguageBar';
import { ReactNode } from 'react';

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
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
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}