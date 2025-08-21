'use client';

import Link from 'next/link';

export function Topbar() {
  return (
    <div className="bg-[#04AA6D] text-white p-2 flex flex-col md:flex-row justify-between items-center text-sm">
      {/* Left Section - Navigation Links */}
      <div className="flex space-x-2 md:space-x-4 mb-2 md:mb-0 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
        <Link href="/tutorials" className="hover:text-gray-200 whitespace-nowrap px-2 py-1">Tutorials</Link>
        <Link href="/html" className="hover:text-gray-200 whitespace-nowrap px-2 py-1">HTML</Link>
        <Link 
          href="/tools" 
          className="bg-[#282A35] hover:bg-[#1e1f26] px-2 py-1 md:px-3 rounded text-xs whitespace-nowrap"
        >
          Tools
        </Link>
        <Link 
          href="/compilers" 
          className="bg-[#282A35] hover:bg-[#1e1f26] px-2 py-1 md:px-3 rounded text-xs whitespace-nowrap"
        >
          Online Compilers
        </Link>
        {/* Add more navigation links as needed */}
      </div>

      {/* Right Section - Buttons with Links */}
      <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto justify-between md:justify-normal">
        
        {/* <Link 
          href="/login" 
          className="bg-[#FFC0C7] text-black hover:bg-[#ffaeb8] px-2 py-1 md:px-3 rounded text-xs whitespace-nowrap"
        >
          Log in
        </Link> */}
      </div>
    </div>
  );
}