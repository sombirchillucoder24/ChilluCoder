// context/LoadingContext.tsx
'use client'

import { createContext, useContext, useState } from 'react'

type LoadingContextType = {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {}
})

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true) // Start in loading state

  return (
    <LoadingContext.Provider value={{
      isLoading,
      startLoading: () => setIsLoading(true),
      stopLoading: () => setIsLoading(false)
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)