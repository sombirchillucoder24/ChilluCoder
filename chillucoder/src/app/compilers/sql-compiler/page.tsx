"use client"
import dynamic from 'next/dynamic';

// Dynamically import the SQLEditorWrapper with no SSR
const SQLEditorWrapper = dynamic(
  () => import('@/components/compilers/language/sqleditor/SQLEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
);

export default function SQLPage() {
  return <SQLEditorWrapper />;
}