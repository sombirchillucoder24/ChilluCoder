"use client";

import { FaBook, FaGraduationCap, FaUsers, FaLightbulb } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Our Learning Platform
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Empowering developers with high-quality programming tutorials and
          educational resources
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            We believe everyone should have access to top-notch programming
            education. Our platform bridges the gap between theory and practice
            by providing comprehensive tutorials that prepare you for real-world
            development.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Whether you&apos;re just starting your coding journey or looking to
            master advanced concepts we&apos;ve got you covered with carefully
            crafted learning materials.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Why Choose Us?
          </h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                <FaBook className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                  Comprehensive Content
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  From beginner to advanced topics we cover it all with depth
                  and clarity
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                <FaGraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                  Practical Approach
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Hands-on projects and real-world examples to reinforce
                  learning
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                <FaUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-1">
                  Community Focused
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn alongside peers and get support from our developer
                  community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow text-center">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaLightbulb className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              Beginner Guides
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Step-by-step tutorials for those just starting their programming
              journey
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow text-center">
            <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaBook className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              In-Depth Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive courses covering technologies from fundamentals to
              advanced topics
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow text-center">
            <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <FaGraduationCap className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              Project-Based Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build real applications while learning with our project tutorials
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Join Our Learning Community
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Whether you&apos;re learning for career advancement personal growth or
          just for fun we provide the resources and community to help you
          succeed.
        </p>
        <a
          href="/tutorials"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition duration-200 inline-block"
        >
          Explore Our Courses
        </a>
      </div>
    </div>
  );
}
