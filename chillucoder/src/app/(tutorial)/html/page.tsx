'use client'

import React from 'react';
import { FaCode, FaLaptopCode, FaMobileAlt, FaTable, FaList, FaImage, FaLink, FaFilm, FaGlobe, FaShapes, FaClock, FaUsers, FaStar, FaPlay, FaBookmark } from 'react-icons/fa';
import { sidebarData } from '@/utils/sidebarData';

// Define the group names as a type
type GroupName = 
  | "HTML Introduction" 
  | "HTML Elements" 
  | "HTML Text" 
  | "HTML Links" 
  | "HTML Images" 
  | "HTML Lists" 
  | "HTML Tables" 
  | "HTML Forms" 
  | "HTML Media" 
  | "HTML APIs" 
  | "HTML Semantics" 
  | "HTML Graphics" 
  | "HTML Advanced" 
  | "HTML References";

export default function HtmlMainPage() {
  const htmlTopics = sidebarData.html;

  // Group icons mapping with proper typing
  const groupIcons: Record<GroupName, React.ReactElement> = {
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

  // Helper function to get icon safely
  const getGroupIcon = (groupName: string): React.ReactElement => {
    return groupIcons[groupName as GroupName] || <FaCode className="text-gray-500" />;
  };

  return (
    <div className="p-2">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 mb-4 animate-pulse">
          HTML Mastery Course
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-500 mx-auto mb-6 rounded-full"></div>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          The complete guide to modern HTML development - from fundamentals to advanced techniques
        </p>
        
        {/* Course Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FaClock className="mr-2 text-blue-500" />
            <span>40+ Hours Content</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FaUsers className="mr-2 text-green-500" />
            <span>50,000+ Students</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <FaStar className="mr-2 text-yellow-500" />
            <span>4.9/5 Rating</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center">
            <FaPlay className="mr-2" />
            Start Learning
          </button>
          {/* <button className="px-8 py-3 bg-white dark:bg-gray-800 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-lg shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all flex items-center">
            <FaDownload className="mr-2" />
            Download Syllabus
          </button> */}
          <button className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg shadow-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center">
            <FaBookmark className="mr-2" />
            Bookmark Course
          </button>
        </div>
      </div>

      {/* Course Overview */}
      <section className="mb-12 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <FaCode className="mr-3 text-blue-500" />
          Course Overview
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">What You&apos;ll Learn</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-3 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">All HTML5 elements and attributes</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-3 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">Modern semantic HTML practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-3 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">Forms, tables, and multimedia</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-3 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">HTML5 APIs and web components</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-3 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">Accessibility best practices</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-3 mt-1">✓</span>
                <span className="text-gray-600 dark:text-gray-400">SEO optimization techniques</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Course Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-400">200+ interactive examples</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-400">35 hands-on exercises</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-400">15 real-world projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-400">Certificate of completion</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-400">Lifetime access</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span className="text-gray-600 dark:text-gray-400">Community support</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Prerequisites</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1">→</span>
                <span className="text-gray-600 dark:text-gray-400">Basic computer skills</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1">→</span>
                <span className="text-gray-600 dark:text-gray-400">Text editor knowledge</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1">→</span>
                <span className="text-gray-600 dark:text-gray-400">Web browser basics</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-3 mt-1">→</span>
                <span className="text-gray-600 dark:text-gray-400">No prior coding experience</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      {/* <section className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-blue-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Your Progress
        </h2>
        <div className="flex items-center mb-4">
          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '35%'}}></div>
          </div>
          <span className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-300">35%</span>
        </div>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lessons Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Exercises Done</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-orange-600">24h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Time Spent</div>
          </div>
        </div>
      </section> */}

      {/* Topics Grid */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Course Topics
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {htmlTopics.map((group, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 group"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mr-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                  {getGroupIcon(group.group)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {group.group}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {group.items.length} lessons
                  </p>
                </div>
              </div>
              <ul className="space-y-2 max-h-48 overflow-y-auto">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href={item.href}
                      className="flex items-center py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all group/item"
                    >
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 group-hover/item:bg-blue-500"></span>
                      <span className="flex-1">{item.title}</span>
                      <span className="opacity-0 group-hover/item:opacity-100 text-blue-500 ml-2">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Path */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border border-blue-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Suggested Learning Path
        </h2>
        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-6 h-full w-0.5 bg-gradient-to-b from-blue-400 to-emerald-400 dark:from-blue-600 dark:to-emerald-600"></div>
          
          {/* Path Items */}
          <div className="space-y-8">
            {[
              { 
                title: "HTML Fundamentals", 
                desc: "Elements, attributes, text formatting, basic structure", 
                weeks: 2,
                difficulty: "Beginner",
                topics: ["HTML Structure", "Elements & Tags", "Text Formatting"]
              },
              { 
                title: "Document Structure", 
                desc: "Semantic elements, layouts, navigation", 
                weeks: 1,
                difficulty: "Beginner",
                topics: ["Semantic HTML", "Document Outline", "Navigation"]
              },
              { 
                title: "Forms & Inputs", 
                desc: "Form controls, validation, accessibility", 
                weeks: 2,
                difficulty: "Intermediate",
                topics: ["Form Elements", "Validation", "User Input"]
              },
              { 
                title: "Multimedia & Graphics", 
                desc: "Images, video, audio, canvas, SVG", 
                weeks: 2,
                difficulty: "Intermediate",
                topics: ["Images", "Video/Audio", "Canvas", "SVG"]
              },
              { 
                title: "Advanced Concepts", 
                desc: "APIs, web storage, drag & drop, web components", 
                weeks: 3,
                difficulty: "Advanced",
                topics: ["HTML5 APIs", "Web Storage", "Custom Elements"]
              }
            ].map((item, index) => (
              <div key={index} className="relative pl-16">
                <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{item.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.difficulty === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {item.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-500 dark:text-blue-400 font-medium">
                      {item.weeks} week{item.weeks > 1 ? 's' : ''}
                    </span>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
                      Start Section
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200 text-center">
          What Students Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "Web Developer",
              content: "This course transformed my understanding of HTML. The examples are practical and the explanations are crystal clear.",
              rating: 5
            },
            {
              name: "Mike Chen",
              role: "Frontend Engineer",
              content: "Best HTML course I've taken. The semantic HTML section alone was worth the entire course.",
              rating: 5
            },
            {
              name: "Emily Davis",
              role: "UI Designer",
              content: "As a designer learning to code, this course made HTML approachable and enjoyable. Highly recommended!",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <div className="font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl shadow-xl">
        <h3 className="text-3xl font-bold mb-4">Ready to Master HTML?</h3>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Join thousands of students who have transformed their web development skills. Start your journey to becoming an HTML expert today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="/html/intro" 
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center"
          >
            <FaPlay className="mr-2" />
            Start with Basics
          </a>
          <a 
            href="/html/advanced" 
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex items-center"
          >
            <FaCode className="mr-2" />
            Skip to Advanced
          </a>
        </div>
        <div className="mt-8 text-sm opacity-75">
          <pre>•💡 Totally  Free         • 🏆 Industry-recognized certificate </pre>
        </div>
      </div>
    </div>
  );
}