'use client'

import { useState } from 'react';
import { FaCode, FaLaptopCode, FaMobileAlt, FaTable, FaList, FaImage, FaLink, FaFilm, FaGlobe, FaShapes } from 'react-icons/fa';
import { sidebarData } from '@/utils/sidebarData';

export default function HtmlMainPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const htmlTopics = sidebarData.html;

  // Group icons mapping
  const groupIcons = {
    "HTML Introduction": <FaCode className="text-blue-500" />,
    "HTML Elements": <FaLaptopCode className="text-green-500" />,
    "HTML Text": <FaMobileAlt className="text-purple-500" />,
    "HTML Links": <FaLink className="text-red-500" />,
    "HTML Images": <FaImage className="text-yellow-500" />,
    "HTML Lists": <FaList className="text-pink-500" />,
    "HTML Tables": <FaTable className="text-indigo-500" />,
    "HTML Forms": <FaLaptopCode className="text-teal-500" />,
    "HTML Media": <FaFilm className="text-orange-500" />,
    "HTML APIs": <FaGlobe className="text-blue-400" />,
    "HTML Semantics": <FaShapes className="text-green-400" />,
    "HTML Graphics": <FaImage className="text-purple-400" />,
    "HTML Advanced": <FaCode className="text-red-400" />,
    "HTML References": <FaCode className="text-yellow-400" />
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-600 mb-4">
          HTML Mastery Course
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-500 mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          The complete guide to modern HTML development - from fundamentals to advanced techniques
        </p>
      </div>

      {/* Course Overview */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <FaCode className="mr-2 text-blue-500" />
          Course Overview
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">What You'll Learn</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-400">All HTML5 elements and attributes</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-400">Modern semantic HTML practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-400">Forms, tables, and multimedia</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-400">HTML5 APIs and web components</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Course Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-400">150+ interactive examples</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-400">25 hands-on exercises</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-400">10 real-world projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-400">Certificate of completion</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Course Topics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {htmlTopics.map((group, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
                  {groupIcons[group.group] || <FaCode />}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{group.group}</h3>
              </div>
              <ul className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href={item.href}
                      className="flex items-center py-1.5 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section className="mb-12 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-blue-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Suggested Learning Path
        </h2>
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-4 h-full w-0.5 bg-blue-200 dark:bg-gray-600"></div>
          
          {/* Path Items */}
          <div className="space-y-8">
            {[
              { title: "HTML Fundamentals", desc: "Elements, attributes, text formatting", weeks: 2 },
              { title: "Document Structure", desc: "Semantic elements, layouts", weeks: 1 },
              { title: "Forms & Inputs", desc: "Validation, accessibility", weeks: 2 },
              { title: "Multimedia", desc: "Video, audio, canvas", weeks: 1 },
              { title: "Advanced Concepts", desc: "APIs, web storage, drag & drop", weeks: 2 }
            ].map((item, index) => (
              <div key={index} className="relative pl-12">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{item.desc}</p>
                  <span className="text-sm text-blue-500 dark:text-blue-400">
                    {item.weeks} week{item.weeks > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Ready to Master HTML?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Start your journey to becoming an HTML expert today. Choose any topic from the sidebar to begin.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/html/intro" 
            className="px-6 py-3 bg-blue-600 hover:bg-green-500 text-white font-medium rounded-lg shadow-md transition-all transform hover:scale-350"
          >
            Start with Basics
          </a>
        </div>
      </div>
    </div>
  );
}