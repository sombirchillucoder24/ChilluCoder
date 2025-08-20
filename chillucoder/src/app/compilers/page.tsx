'use client';

import { FaCode, FaDatabase } from 'react-icons/fa';
import Link from 'next/link';

export default function CompilersPage() {
  const compilers = [
    {
      name: 'HTML Editor',
      path: '/compilers/html-editor',
      description: 'Write, edit, and preview HTML/CSS/JavaScript code in real-time',
      icon: <FaCode className="h-8 w-8 text-blue-500" />
    },
    {
      name: 'SQL Compiler',
      path: '/compilers/sql-compiler',
      description: 'Run SQL queries and see results instantly with our online compiler',
      icon: <FaDatabase className="h-8 w-8 text-green-500" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Online Compilers
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Write, compile, and test code directly in your browser
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {compilers.map((compiler, index) => (
          <Link 
            href={compiler.path}
            key={index}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full mr-4">
                  {compiler.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {compiler.name}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {compiler.description}
              </p>
              <div className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                Open Compiler →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          More Compilers Coming Soon
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We&apos;re expanding our collection of online compilers to support more programming languages.
        </p>
      </div>
    </div>
  );
}