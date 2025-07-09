'use client'

import { ThemeToggle } from '@/components/ThemeToggle'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-[#282A35] text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300">
            chillucoder<span className="text-[#04AA6D]">.com</span>
          </Link>
          
          {/* <div className="hidden md:flex space-x-6">
            <Link href="/html" className={`hover:text-gray-300 ${pathname.startsWith('/html') ? 'text-white font-medium' : ''}`}>HTML</Link>
            <Link href="/css" className={`hover:text-gray-300 ${pathname.startsWith('/css') ? 'text-white font-medium' : ''}`}>CSS</Link>
            <Link href="/js" className={`hover:text-gray-300 ${pathname.startsWith('/js') ? 'text-white font-medium' : ''}`}>JavaScript</Link>
          </div> */}
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button 
            className="md:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#3a3c46] mt-2 p-2 rounded">
          <Link href="/html" className="block px-3 py-2 hover:bg-[#4CAF50] rounded">HTML</Link>
          <Link href="/css" className="block px-3 py-2 hover:bg-[#4CAF50] rounded">CSS</Link>
          <Link href="/js" className="block px-3 py-2 hover:bg-[#4CAF50] rounded">JavaScript</Link>
        </div>
      )}
    </nav>
  )
}