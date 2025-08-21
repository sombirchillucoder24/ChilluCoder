"use client";
import { Topbar } from "@/components/Topbar";
import { Navbar } from "@/components/Navbar";
import LanguageBar from "@/components/LanguageBar";
import {
  // FaCode,
  // FaLaptopCode,
  // FaServer,
  FaDatabase,
  FaGraduationCap,
  FaUsers,
  FaLightbulb,
  FaAngular,
  FaChalkboardTeacher,
  FaCertificate
} from "react-icons/fa";
import { Footer } from "@/components/Footer";
import {
  SiTypescript,
  SiReact,
  // SiNextdotjs,
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3
} from "react-icons/si";

export default function Home() {
  const features = [
    {
      icon: <SiHtml5 className="text-4xl mb-4 text-orange-500" />,
      title: "HTML",
      description: "Master web structure with interactive tutorials and examples",
      path: "/html"
    },
    {
      icon: <SiCss3 className="text-4xl mb-4 text-blue-500" />,
      title: "CSS",
      description: "Style beautiful websites with modern techniques",
      path: "/css"
    },
    {
      icon: <SiJavascript className="text-4xl mb-4 text-yellow-400" />,
      title: "JavaScript",
      description: "From basics to advanced concepts with real projects",
      path: "/javascript"
    },
    {
      icon: <SiTypescript className="text-4xl mb-4 text-blue-600" />,
      title: "TypeScript",
      description: "Build scalable applications with type safety",
      path: "/typescript"
    },
    {
      icon: <SiReact className="text-4xl mb-4 text-blue-400" />,
      title: "React",
      description: "Learn modern frontend development with React",
      path: "/react"
    },
    {
      icon: <SiNodedotjs className="text-4xl mb-4 text-green-600" />,
      title: "Node.js",
      description: "Create powerful backend services and APIs",
      path: "/nodejs"
    },
    {
      icon: <FaDatabase className="text-4xl mb-4 text-purple-500" />,
      title: "SQL",
      description: "Master database management and queries",
      path: "/sql"
    },
    {
      icon: <FaAngular className="text-4xl mb-4 text-red-500" />,
      title: "Angular",
      description: "Build enterprise-grade applications",
      path: "/angular"
    }
  ];

  // const stats = [
  //   { value: "500+", label: "Tutorials" },
  //   { value: "1M+", label: "Learners" },
  //   { value: "100+", label: "Projects" },
  //   { value: "24/7", label: "Support" }
  // ];

  const benefits = [
    {
      icon: <FaGraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Structured Learning Paths",
      description: "Progress from beginner to expert with our carefully designed curriculum"
    },
    {
      icon: <FaLightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />,
      title: "Interactive Coding",
      description: "Practice directly in browser with our built-in coding environment"
    },
    {
      icon: <FaUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: "Community Support",
      description: "Get help from mentors and fellow developers in our active community"
    },
    {
      icon: <FaChalkboardTeacher className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: <FaCertificate className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
      title: "Certification",
      description: "Earn certificates to showcase your skills to employers"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />
      <LanguageBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Master Coding with ChilluCoder</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            With the world&apos;s largest web developer site. Start coding today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/html" 
              className="bg-white text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              Get Started
            </a>
            <a 
              href="#tutorials" 
              className="bg-transparent border-2 border-white py-3 px-6 rounded-lg hover:bg-white hover:text-gray-800 transition"
            >
              Browse Tutorials
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Learning Paths</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Start your journey with these in-demand technologies
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <a
                key={index}
                href={feature.path}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all h-full border border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    {feature.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Learn With Us?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our approach makes learning to code effective and enjoyable
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
              >
                <div className="bg-white dark:bg-gray-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between bg-gray-900 text-gray-300 px-4 py-3">
              <div className="flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm">counter.jsx</span>
              </div>
              <button className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">
                Copy Code
              </button>
            </div>
            <pre className="p-6 overflow-x-auto bg-gray-800 text-gray-100">
              <code className="language-jsx">
{`import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Current Count: {count}
      </h2>
      <div className="flex gap-4">
        <button 
          onClick={() => setCount(c => c + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Increment
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  )
}`}
              </code>
            </pre>
            <div className="bg-gray-700 px-4 py-3 text-right">
              <a
                href="/react"
                className="text-green-400 hover:underline font-medium flex items-center justify-end gap-1"
              >
                Try this React Example <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Coding?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of developers who launched their careers with us.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* <a
              href="/signup"
              className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg"
            >
              Create Free Account
            </a> */}
            <a
              href="/html"
              className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg"
            >
              Get Started Free
            </a>
            <a
              href="/tutorials"
              className="bg-transparent border-2 border-white py-3 px-8 rounded-full hover:bg-white hover:text-blue-700 transition"
            >
              Browse All Tutorials.
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}