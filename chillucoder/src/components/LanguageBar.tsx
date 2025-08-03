"use client";
import React, { useRef } from "react";
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
  FaRProject,
  FaCode,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiAngular,
  SiVuedotjs,
  SiRust,
  SiKotlin,
  SiGo,
  SiBootstrap,
  SiC,
  SiCplusplus,
  SiSharp,
  SiJquery,
  SiMysql,
  SiOpenai,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { BsTerminal } from "react-icons/bs";
import { AiOutlineDatabase } from "react-icons/ai";

const topics = [
  {
    name: "HTML",
    icon: <FaHtml5 className="text-orange-500" />,
    path: "/html",
  },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" />, path: "/css" },
  {
    name: "JS",
    icon: <FaJs className="text-yellow-400" />,
    path: "/javascript",
  },
  { name: "SQL", icon: <TbSql className="text-gray-600" />, path: "/sql" },
  {
    name: "Python",
    icon: <FaPython className="text-blue-400" />,
    path: "/python",
  },
  { name: "Java", icon: <FaJava className="text-red-500" />, path: "/java" },
  { name: "PHP", icon: <FaPhp className="text-purple-500" />, path: "/php" },
  { name: "C", icon: <SiC className="text-blue-500" />, path: "/c" },
  {
    name: "C++",
    icon: <SiCplusplus className="text-blue-700" />,
    path: "/cpp",
  },
  {
    name: "C#",
    icon: <SiSharp className="text-violet-600" />,
    path: "/csharp",
  },
  {
    name: "Bootstrap",
    icon: <SiBootstrap className="text-purple-500" />,
    path: "/bootstrap",
  },
  {
    name: "React",
    icon: <FaReact className="text-blue-500" />,
    path: "/react",
  },
  {
    name: "MySQL",
    icon: <SiMysql className="text-blue-600" />,
    path: "/mysql",
  },
  {
    name: "jQuery",
    icon: <SiJquery className="text-indigo-500" />,
    path: "/jquery",
  },
  {
    name: "Node",
    icon: <FaNodeJs className="text-green-500" />,
    path: "/node",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-600" />,
    path: "/typescript",
  },
  {
    name: "Angular",
    icon: <SiAngular className="text-red-500" />,
    path: "/angular",
  },
  { name: "Git", icon: <FaGitAlt className="text-orange-600" />, path: "/git" },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-500" />,
    path: "/mongodb",
  },
  { name: "AI", icon: <FaCode className="text-pink-500" />, path: "/ai" },
  { name: "R", icon: <FaRProject className="text-blue-500" />, path: "/r" },
  { name: "Go", icon: <SiGo className="text-blue-500" />, path: "/go" },
  {
    name: "Kotlin",
    icon: <SiKotlin className="text-purple-500" />,
    path: "/kotlin",
  },
  {
    name: "Vue",
    icon: <SiVuedotjs className="text-green-500" />,
    path: "/vue",
  },
  {
    name: "GenAI",
    icon: <SiOpenai className="text-teal-500" />,
    path: "/genai",
  },
  {
    name: "Data",
    icon: <AiOutlineDatabase className="text-gray-500" />,
    path: "/data",
  },
  {
    name: "Bash",
    icon: <BsTerminal className="text-gray-300" />,
    path: "/bash",
  },
  { name: "Rust", icon: <SiRust className="text-orange-600" />, path: "/rust" },
];

const LanguageBar: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  const startScroll = (direction: "left" | "right") => {
    if (scrollInterval.current) return;

    scrollInterval.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -15 : 15,
          behavior: "auto",
        });
      }
    }, 30);
  };

  const stopScroll = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  return (
    <div className="relative w-full bg-white border-b border-gray-100 text-xs px-8">
      <div ref={scrollRef} className="flex overflow-x-auto py-2 no-scrollbar">
        {topics.map((topic) => (
          <a
            key={topic.name}
            href={topic.path}
            className="inline-flex items-center px-3 py-1.5 mx-1 rounded-lg bg-gray-50 hover:bg-blue-50 
             text-gray-700 hover:text-blue-600 border border-gray-200 
             whitespace-nowrap transition-colors gap-2"
          >
            <span className="text-base">{topic.icon}</span>
            <span className="font-medium">{topic.name}</span>
          </a>
        ))}
      </div>

      <button
        onMouseDown={() => startScroll("left")}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
        className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent 
                   flex items-center justify-start pl-1.5"
      >
        <span className="bg-white/90 rounded-full p-1 shadow-xs border border-gray-200">
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path
              d="M15 18l-6-6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
      </button>

      <button
        onMouseDown={() => startScroll("right")}
        onMouseUp={stopScroll}
        onMouseLeave={stopScroll}
        className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent 
                   flex items-center justify-end pr-1.5"
      >
        <span className="bg-white/90 rounded-full p-1 shadow-xs border border-gray-200">
          <svg width="14" height="14" viewBox="0 0 24 24">
            <path
              d="M9 18l6-6-6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default LanguageBar;
