"use client";
import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
  FaPhp,
  FaJava,
  FaGitAlt,
  FaReact,
  FaNodeJs,
  // FaRProject,
  // FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  // SiMongodb,
  SiAngular,
  // SiVuedotjs,
  // SiRust,
  // SiKotlin,
  // SiGo,
  // SiBootstrap,
  SiC,
  SiCplusplus,
  SiSharp,
  SiJquery,
  SiMysql,
  // SiOpenai,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";
// import { BsTerminal } from "react-icons/bs";
// import { AiOutlineDatabase } from "react-icons/ai";
import { useRouter } from "next/navigation";  // ✅ use router hook

const languages = [
  {
    name: "HTML",
    icon: <FaHtml5 className="text-orange-500 text-4xl" />,
    path: "/html",
    description: "HyperText Markup Language for creating web pages",
  },
  { 
    name: "CSS", 
    icon: <FaCss3Alt className="text-blue-500 text-4xl" />, 
    path: "/css",
    description: "Cascading Style Sheets for styling web pages" 
  },
  {
    name: "JavaScript",
    icon: <FaJs className="text-yellow-400 text-4xl" />,
    path: "/javascript",
    description: "Programming language for interactive web content"
  },
  { 
    name: "SQL", 
    icon: <TbSql className="text-gray-600 text-4xl" />, 
    path: "/sql",
    description: "Structured Query Language for database management" 
  },
  {
    name: "Python",
    icon: <FaPython className="text-blue-400 text-4xl" />,
    path: "/python",
    description: "Versatile high-level programming language"
  },
  { 
    name: "Java", 
    icon: <FaJava className="text-red-500 text-4xl" />, 
    path: "/java",
    description: "Object-oriented programming language" 
  },
  { 
    name: "PHP", 
    icon: <FaPhp className="text-purple-500 text-4xl" />, 
    path: "/php",
    description: "Server-side scripting language for web development" 
  },
  { 
    name: "C", 
    icon: <SiC className="text-blue-500 text-4xl" />, 
    path: "/c",
    description: "General-purpose procedural programming language" 
  },
  {
    name: "C++",
    icon: <SiCplusplus className="text-blue-700 text-4xl" />,
    path: "/cpp",
    description: "Extension of C with object-oriented features"
  },
  {
    name: "C#",
    icon: <SiSharp className="text-violet-600 text-4xl" />,
    path: "/csharp",
    description: "Modern object-oriented language by Microsoft"
  },
  {
    name: "React",
    icon: <FaReact className="text-blue-500 text-4xl" />,
    path: "/react",
    description: "JavaScript library for building user interfaces"
  },
  {
    name: "MySQL",
    icon: <SiMysql className="text-blue-600 text-4xl" />,
    path: "/mysql",
    description: "Popular open-source relational database"
  },
  {
    name: "jQuery",
    icon: <SiJquery className="text-indigo-500 text-4xl" />,
    path: "/jquery",
    description: "Fast and concise JavaScript library"
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="text-green-500 text-4xl" />,
    path: "/node",
    description: "JavaScript runtime built on Chrome's V8 engine"
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-600 text-4xl" />,
    path: "/typescript",
    description: "Typed superset of JavaScript that compiles to plain JS"
  },
  {
    name: "Angular",
    icon: <SiAngular className="text-red-500 text-4xl" />,
    path: "/angular",
    description: "Platform for building mobile and desktop web applications"
  },
  { 
    name: "Git", 
    icon: <FaGitAlt className="text-orange-600 text-4xl" />, 
    path: "/git",
    description: "Distributed version control system" 
  },
];

const TutorialsPage = () => {
  const router = useRouter();  // ✅ initialize router

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Programming Tutorials
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Learn and master various programming languages and technologies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {languages.map((language) => (
            <div
              key={language.name}
              onClick={() => router.push(`${language.path}`)} // ✅ navigate
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4">{language.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                    {language.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {language.description}
                  </p>
                </div>
                <div className="mt-auto p-4 bg-gray-50 text-center">
                  <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    Start Learning →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;
