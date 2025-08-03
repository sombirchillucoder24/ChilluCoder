'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaChevronDown, 
  FaChevronRight, 
  FaTimes,
  FaPlusSquare,
  FaMinusSquare,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaBook,
  FaGraduationCap
} from 'react-icons/fa'
import { sidebarData } from '@/utils/sidebarData'

export function Sidebar({
  isMobile,
  isMobileOpen,
  toggleSidebar,
  topic = 'html',
  collapsed = false,
  toggleSidebarCollapse
}: {
  isMobile: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  topic?: string
  collapsed?: boolean
  toggleSidebarCollapse?: () => void
}) {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const contentRef = useRef<HTMLDivElement>(null)

  // Get the sidebar items for the current topic
  const currentSidebarItems = sidebarData[topic] || []

  useEffect(() => {
    // Initialize groups based on current path
    const initial = currentSidebarItems.reduce((acc, group) => {
      // Expand group if any of its items match current path
      const shouldExpand = group.items.some(item => 
        pathname === item.href || pathname.startsWith(item.href + '/')
      )
      acc[group.group] = shouldExpand
      return acc
    }, {} as Record<string, boolean>)
    setExpandedGroups(initial)
  }, [pathname, currentSidebarItems])

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }))
  }

  const expandAll = () => {
    setExpandedGroups(currentSidebarItems.reduce((acc, group) => {
      acc[group.group] = true
      return acc
    }, {} as Record<string, boolean>))
  }

  const collapseAll = () => {
    setExpandedGroups(currentSidebarItems.reduce((acc, group) => {
      acc[group.group] = false
      return acc
    }, {} as Record<string, boolean>))
  }

  const getTopicIcon = (topicName: string) => {
    const icons: Record<string, JSX.Element> = {
      html: <FaBook className="w-4 h-4" />,
      css: <FaGraduationCap className="w-4 h-4" />,
      javascript: <FaBook className="w-4 h-4" />,
      react: <FaGraduationCap className="w-4 h-4" />,
    }
    return icons[topicName.toLowerCase()] || <FaBook className="w-4 h-4" />
  }

  const handleLinkClick = () => {
    if (isMobile) {
      toggleSidebar()
    }
  }

  return (
    <aside
      className={`
        ${isMobile 
          ? `fixed inset-y-0 left-0 z-50 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}` 
          : "relative"
        }
        ${collapsed && !isMobile ? "w-16" : isMobile ? "w-80 max-w-[85vw]" : "w-full"}
        h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out flex flex-col
        ${isMobile ? 'shadow-xl' : ''}
        overflow-hidden
      `}
    >
      {/* Header */}
      <div className={`
        flex items-center justify-between border-b border-gray-200 dark:border-gray-700 
        bg-gradient-to-r from-blue-600 to-purple-600 text-white
        ${isMobile ? 'sticky top-0 z-10' : ''}
        ${collapsed && !isMobile ? 'p-2' : 'p-4'}
        transition-all duration-300
      `}>
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-3">
            {getTopicIcon(topic)}
            <div>
              <h2 className="font-bold text-lg capitalize">
                {topic} Tutorial
              </h2>
              <p className="text-xs text-blue-100">
                Learn step by step
              </p>
            </div>
          </div>
        )}
        
        {collapsed && !isMobile && (
          <div className="flex items-center justify-center w-full">
            {getTopicIcon(topic)}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          {!collapsed && !isMobile && (
            <>
              <button
                onClick={expandAll}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded transition-colors"
                title="Expand All"
              >
                <FaPlusSquare size={14} />
              </button>
              <button
                onClick={collapseAll}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded transition-colors"
                title="Collapse All"
              >
                <FaMinusSquare size={14} />
              </button>
            </>
          )}
          
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-gray-200 p-1 hover:bg-white/10 rounded transition-colors"
              aria-label="Close Sidebar"
            >
              <FaTimes size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Collapse Toggle Button */}
      {!isMobile && toggleSidebarCollapse && (
        <div className={`border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 ${collapsed ? 'px-1 py-2' : 'px-4 py-2'}`}>
          <button
            onClick={toggleSidebarCollapse}
            className={`${collapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full p-2.5 gap-2'} text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 rounded-xl transition-all duration-200 flex items-center group border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600`}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? (
              <FaAngleDoubleRight size={16} className="transition-transform group-hover:translate-x-1 text-blue-600 dark:text-blue-400" />
            ) : (
              <>
                <FaAngleDoubleLeft size={16} className="transition-transform group-hover:-translate-x-1 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Collapse Sidebar
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Navigation Content */}
      <div className="flex-1 overflow-hidden">
        {!collapsed ? (
          <nav className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <div className="p-4 space-y-1">
              {currentSidebarItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FaBook className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No topics available</p>
                </div>
              ) : (
                currentSidebarItems.map((group) => (
                  <div key={group.group} className="mb-2">
                    <button
                      onClick={() => toggleGroup(group.group)}
                      className={`
                        w-full flex justify-between items-center px-3 py-2.5 rounded-lg 
                        transition-all duration-200 group
                        ${expandedGroups[group.group] 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100 font-semibold shadow-sm'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <span className="text-left font-medium text-sm">
                        {group.group}
                      </span>
                      <div className={`
                        transition-transform duration-200
                        ${expandedGroups[group.group] ? 'rotate-0' : '-rotate-90'}
                      `}>
                        <FaChevronDown size={12} className="text-gray-400 dark:text-gray-500" />
                      </div>
                    </button>
                    
                    <div className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedGroups[group.group] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <ul className="ml-2 mt-1 space-y-0.5 border-l-2 border-gray-100 dark:border-gray-700 pl-3">
                        {group.items.map((item) => {
                          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                onClick={handleLinkClick}
                                className={`
                                  block px-3 py-2 rounded-lg text-sm transition-all duration-200
                                  ${isActive
                                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 font-medium border-l-2 border-green-500 shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                                  }
                                `}
                              >
                                <span className="flex items-center">
                                  {isActive && (
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
                                  )}
                                  {item.title}
                                </span>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          </nav>
        ) : (
          /* Collapsed State Navigation */
          <nav className="h-full overflow-y-auto py-4">
            <div className="px-1 space-y-3">
              {currentSidebarItems.map((group, index) => (
                <div 
                  key={group.group} 
                  title={group.group}
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => toggleGroup(group.group)}
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-200 group-hover:scale-105 shadow-sm">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {group.group.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1.5 text-center leading-tight max-w-full truncate px-1">
                    {group.group.length > 8 ? group.group.substring(0, 8) + '...' : group.group}
                  </span>
                  {/* Small indicator for active items */}
                  {group.items.some(item => pathname === item.href || pathname.startsWith(item.href + '/')) && (
                    <div className="w-1 h-1 bg-green-500 rounded-full mt-1 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
      </div>

      {/* Footer */}
      {(!collapsed || isMobile) && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>© {new Date().getFullYear()} Tutorials</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}