'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false) // Track when component is mounted
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true) // Component is now mounted on client
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tutorials', path: '/tutorials' },
    // { name: 'Examples', path: '/examples' },
    // { name: 'Exercises', path: '/exercises' },
  ]

  // Only apply scroll effects after mounting
  const navbarClasses = [
    'sticky top-0 z-50 transition-all duration-300',
    mounted && scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-white py-3'
  ].filter(Boolean).join(' ')

  return (
    <div className={navbarClasses}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo - Removed initial motion to prevent hydration issues */}
        <Link href="/" className="group">
          <div className="flex items-center gap-1">
            <div className="w-8 h-8 bg-[#04AA6D] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ch</span>
            </div>
            <span className="text-xl font-bold text-gray-800 group-hover:text-[#04AA6D] transition-colors">
              chillucoder
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                pathname === item.path ? 'text-[#04AA6D]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.name}
              {pathname === item.path && mounted && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#04AA6D]"
                  layoutId="underline"
                  transition={{ type: 'spring', duration: 0.3 }}
                />
              )}
            </Link>
          ))}
          {mounted && (
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#04AA6D] text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all"
            >
              Get Started
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg focus:outline-none"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={open ? "open" : "closed"}
            variants={{
              open: { rotate: 90 },
              closed: { rotate: 0 }
            }}
          >
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Navigation - Wrapped in AnimatePresence */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.path 
                      ? 'bg-[#04AA6D]/10 text-[#04AA6D]' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button className="w-full bg-[#04AA6D] text-white px-4 py-3 rounded-lg text-sm font-medium mt-2">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}