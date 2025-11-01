"use client"
import React from 'react'
import { Menu, X } from 'lucide-react'

interface MobileHeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const MobileHeader = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-[61px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="flex items-center justify-between h-full px-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        
        <div className="flex items-center">
          <h1 className="text-lg font-semibold">Your App Name</h1>
        </div>
        
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </header>
  )
}

export default MobileHeader