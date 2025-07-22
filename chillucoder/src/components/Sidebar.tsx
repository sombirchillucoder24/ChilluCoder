'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaChevronDown,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTimes,
  FaPlusSquare,
  FaMinusSquare
} from 'react-icons/fa'
import { sidebarData } from '@/utils/sidebarData'

interface SidebarProps {
  isMobile: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  topic: string
}

export function Sidebar({
  isMobile,
  isMobileOpen,
  toggleSidebar,
}: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const selectedLang = 'html'
  const groups = sidebarData?.[selectedLang] || []

  useEffect(() => {
    const initial = groups.reduce((acc, group) => {
      acc[group.group] = true
      return acc
    }, {} as Record<string, boolean>)
    setExpandedGroups(initial)
  }, [groups])

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const expandAll = () => {
    setExpandedGroups(groups.reduce((acc, group) => {
      acc[group.group] = true
      return acc
    }, {} as Record<string, boolean>))
  }

  const collapseAll = () => {
    setExpandedGroups(groups.reduce((acc, group) => {
      acc[group.group] = false
      return acc
    }, {} as Record<string, boolean>))
  }

  return (
    <aside
className={`
  ${isMobile ? (isMobileOpen ? "translate-x-0" : "-translate-x-full") : "md:translate-x-0"}
  ${collapsed ? "w-14" : "w-64"}
  absolute md:relative top-0 left-0 h-screen z-50
  transition-transform duration-300 ease-in-out
  bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
  overflow-visibal flex flex-col max-w-full
`}

    >
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="flex justify-end p-3 border-b">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 dark:text-gray-300 hover:text-red-500"
            aria-label="Close Sidebar"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Collapse Toggle (Desktop only) */}
      {!isMobile && (
        <div className="absolute top-4 -right-3 z-40">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-white border rounded-full shadow w-6 h-6 flex items-center justify-center hover:bg-gray-200"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? (
              <FaAngleDoubleRight size={12} />
            ) : (
              <FaAngleDoubleLeft size={12} />
            )}
          </button>
        </div>
      )}

      {!collapsed && (
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-md font-bold text-gray-900 uppercase">{selectedLang} Tutorial</h2>
          <div className="flex items-center space-x-3 px-2">
            <button
              onClick={expandAll}
              className="text-blue-600 hover:text-blue-800"
              title="Expand All"
            >
              <FaPlusSquare size={20} />
            </button>
            <button
              onClick={collapseAll}
              className="text-blue-600 hover:text-blue-800"
              title="Collapse All"
            >
              <FaMinusSquare size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Scrollable Nav Content */}
      <nav className={`
        flex-1 px-2 py-3 overflow-y-auto 
        ${collapsed ? 'hidden' : ''}
        scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100
        dark:scrollbar-thumb-blue-600 dark:scrollbar-track-gray-800
        hover:scrollbar-thumb-blue-600
      `}>
        {groups.map((group) => (
          <div key={group.group} className="mb-1">
            {group.items.length === 1 ? (
              <Link
                href={group.items[0].href}
                onClick={isMobile ? toggleSidebar : undefined}
                className={`block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  pathname === group.items[0].href
                    ? 'bg-green-600 text-white font-medium'
                    : 'text-gray-900 dark:text-gray-300'
                }`}
              >
                {group.items[0].title}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleGroup(group.group)}
                  className="w-full flex justify-between items-center px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700 font-medium transition-colors"
                >
                  <span>{group.group}</span>
                  {expandedGroups[group.group] ? (
                    <FaChevronDown size={12} />
                  ) : (
                    <FaChevronRight size={12} />
                  )}
                </button>
                {expandedGroups[group.group] && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={isMobile ? toggleSidebar : undefined}
                          className={`block px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                            pathname === item.href
                              ? 'bg-green-600 text-white font-medium'
                              : 'text-gray-800 dark:text-gray-300'
                          }`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        ))}

        {!groups.length && (
          <div className="text-center text-gray-400 text-xs mt-6">
            No tutorials available
          </div>
        )}
      </nav>
    </aside>
  )
}