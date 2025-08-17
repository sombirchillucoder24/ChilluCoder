"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode, useEffect } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LoadingProvider } from '@/context/LoadingContext'
import { ChilluLoader } from '@/components/ChilluLoader'
import { useLoading } from '@/context/LoadingContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

function LayoutWithLoader({ children }: { children: ReactNode }) {
  const { isLoading, stopLoading } = useLoading()

  useEffect(() => {
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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  )
}