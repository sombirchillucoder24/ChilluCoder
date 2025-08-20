'use client';

import { useState } from 'react';
import { FaRegBell, FaTimes, FaCheckCircle, FaDatabase } from 'react-icons/fa';

export default function MySQLComingPage() {
  const [showNotification, setShowNotification] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full mb-6">
          <FaDatabase className="h-8 w-8 text-orange-600 dark:text-orange-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          MySQL Mastery Course
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Learn to design, optimize, and manage relational databases with MySQL
        </p>
      </div>

      {showNotification && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-8 relative">
          <button
            onClick={() => setShowNotification(false)}
            className="absolute top-3 right-3 text-orange-500 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
          >
            <FaTimes className="h-5 w-5" />
          </button>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-1">
              <FaRegBell className="h-6 w-6 text-orange-500 dark:text-orange-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-orange-800 dark:text-orange-200">
                Course Coming Soon!
              </h3>
              <div className="mt-2 text-orange-700 dark:text-orange-300">
                <p>
                  Our comprehensive MySQL course is in development, covering everything from
                  basic queries to advanced database administration and optimization techniques.
                </p>
              </div>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="mt-4 flex gap-2 flex-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 dark:bg-orange-700 dark:hover:bg-orange-600"
                  >
                    Notify me
                  </button>
                </form>
              ) : (
                <div className="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                  <FaCheckCircle className="h-5 w-5 mr-2" />
                  You&apos;ll be notified when the course launches!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            What You&apos;ll Learn
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">
                SQL fundamentals and MySQL syntax
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">
                Database design and normalization
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">
                Advanced queries, joins, and subqueries
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mt-0.5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-700 dark:text-gray-300">
                Performance tuning and indexing strategies
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Course Details
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Level</h3>
              <p className="text-gray-600 dark:text-gray-400">Beginner to Advanced</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Duration</h3>
              <p className="text-gray-600 dark:text-gray-400">Coming soon</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Prerequisites</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No prior database experience required
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300">Includes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Hands-on exercises, real-world projects, and certificate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}