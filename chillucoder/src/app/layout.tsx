// app/layout.tsx
"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode, useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LoadingProvider } from '@/context/LoadingContext'
import { ChilluLoader } from '@/components/ChilluLoader'
import { useLoading } from '@/context/LoadingContext'

const inter = Inter({ subsets: ['latin'] })


interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <LayoutWithLoader>{children}</LayoutWithLoader>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

// app/layout.tsx
function LayoutWithLoader({ children }: { children: ReactNode }) {
  const { isLoading, stopLoading } = useLoading()

  useEffect(() => {
    // Hide loader when page is ready
    const handleLoad = () => stopLoading()
    
    if (document.readyState === 'complete') {
      stopLoading()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [stopLoading])

  return (
    <>
      {isLoading && <ChilluLoader />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {children}
      </div>
    </>
  )
}

// import "./globals.css";
// import { Inter } from "next/font/google";
// import { ReactNode } from "react";
// import { ThemeProvider } from "@/components/ThemeProvider";

// const inter = Inter({ subsets: ["latin"] });

// interface RootLayoutProps {
//   children: ReactNode;
// }

// export default function RootLayout({ children }: RootLayoutProps) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system">
//           <body className={inter.className}>{children}</body>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
