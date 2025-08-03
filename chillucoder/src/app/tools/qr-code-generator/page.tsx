"use client"

import React from 'react'
import QRCodeGenerator from '@/components/tools/QrCode'
import {Topbar} from '@/components/Topbar'
import LanguageBar from '@/components/LanguageBar'
import {Navbar} from '@/components/Navbar'


function page() {
  return (
    <div>
      <Topbar />
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b shadow-sm">
          <Navbar />
          <LanguageBar />
        </div>
      <QRCodeGenerator/>
      </div>
  )
}

export default page