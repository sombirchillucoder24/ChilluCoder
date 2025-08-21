'use client'

import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tutorials</h3>
            <p className="text-gray-600 dark:text-gray-400">
              High-quality tutorials and learning resources for developers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/javascript" className="text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  JavaScript
                </Link>
              </li>
              <li>
                <Link href="/react" className="text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  React
                </Link>
              </li>
              <li>
                <Link href="/node" className="text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  Node.js
                </Link>
              </li>
              <li>
                <Link href="/css" className="text-gray-600 hover:text-gray-900 dark:hover:text-white dark:text-gray-400">
                  CSS
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subscribe</h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Get the latest tutorials and resources delivered to your inbox.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md sm:rounded-l-none hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
              >
                Subscribe
              </button>         
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Tutorials. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}