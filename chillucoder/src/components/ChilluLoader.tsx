// components/ChilluLoader.tsx
'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function ChilluLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Hide loader when page is ready
    const handleReady = () => {
      setIsVisible(false)
    }

    if (document.readyState === 'complete') {
      handleReady()
    } else {
      // Use both DOMContentLoaded and load events for better coverage
      document.addEventListener('DOMContentLoaded', handleReady)
      window.addEventListener('load', handleReady)
      
      return () => {
        document.removeEventListener('DOMContentLoaded', handleReady)
        window.removeEventListener('load', handleReady)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-background/90 z-[999] flex items-center justify-center backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        {['C', 'h', 'i', 'L', 'L', 'u', '.', '.', '.'].map((char, i) => (
          <motion.div
            key={i}
            className={`text-2xl font-bold ${
              i < 3 ? 'text-blue-500' : 
              i < 6 ? 'text-emerald-500' : 
              'text-gray-500'
            }`}
            initial={{ y: 0, opacity: 0.8 }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              delay: i * 0.08,  // Positive delay value
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0
            }}
          >
            {char}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}