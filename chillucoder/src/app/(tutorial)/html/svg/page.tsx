"use client";

import { FaCopy, FaCheck, FaChevronDown, FaCode, FaPlay } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLSVGTutorial() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    elements: true,
    advanced: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleOpenEditor = (code: string) => {
    try {
      localStorage.setItem("html-code", code);
      router.push("/compilers/html-editor");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          HTML SVG Tutorial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create scalable vector graphics directly in your HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-orange-50 dark:bg-gray-800 p-6 rounded-lg border border-orange-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-orange-700 dark:text-orange-400">
          Introduction to SVG
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          SVG (Scalable Vector Graphics) is an XML-based markup language for
          describing two-dimensional vector graphics. SVG is
          resolution-independent and can scale to any size without losing
          quality.
        </p>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
          <h3 className="font-bold mb-2">Basic SVG Example:</h3>
          <CodeEditor
            value={`<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="purple" />
</svg>`}
            language="html"
            style={{
              fontSize: 14,
              backgroundColor: "#f8fafc",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
            className="rounded-lg"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() =>
                copyToClipboard(
                  `<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="purple" />
</svg>`,
                  "basic svg"
                )
              }
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {copied === "basic svg" ? (
                <>
                  <FaCheck className="text-green-500" /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </button>
            <button
              onClick={() =>
                handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Basic SVG Example</title>
</head>
<body>
  <svg width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="purple" />
  </svg>
</body>
</html>`)
              }
              className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
            >
              <FaPlay size={12} /> Try it
            </button>
          </div>
        </div>
      </section>

      {/* Basic Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Basic SVG Examples
          </h2>
          <button
            onClick={() => toggleSection("basics")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.basics ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.basics && (
          <div className="space-y-6">
            {/* Example 1: Basic Shapes */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">1. Basic Shapes</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  SVG includes basic shape elements like rectangles, circles,
                  and lines.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <svg width="300" height="150">
                    <rect x="10" y="10" width="80" height="80" fill="#4f46e5" />
                    <circle cx="200" cy="50" r="40" fill="#10b981" />
                    <line
                      x1="10"
                      y1="120"
                      x2="290"
                      y2="120"
                      stroke="#ef4444"
                      stroke-width="5"
                    />
                  </svg>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>SVG Basic Shapes</title>
</head>
<body>
  <svg width="300" height="150">
    <rect x="10" y="10" width="80" height="80" fill="#4f46e5" />
    <circle cx="200" cy="50" r="40" fill="#10b981" />
    <line x1="10" y1="120" x2="290" y2="120" stroke="#ef4444" stroke-width="5" />
  </svg>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<svg width="300" height="150">
  <rect x="10" y="10" width="80" height="80" fill="#4f46e5" />
  <circle cx="200" cy="50" r="40" fill="#10b981" />
  <line x1="10" y1="120" x2="290" y2="120" stroke="#ef4444" stroke-width="5" />
</svg>`,
                        "basic shapes"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "basic shapes" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                <CodeEditor
                  value={`<svg width="300" height="150">
  <rect x="10" y="10" width="80" height="80" fill="#4f46e5" />
  <circle cx="200" cy="50" r="40" fill="#10b981" />
  <line x1="10" y1="120" x2="290" y2="120" stroke="#ef4444" stroke-width="5" />
</svg>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 2: Path Element */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">2. Path Element</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The &lt;path&gt; element is the most powerful SVG element,
                  allowing you to create complex shapes.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <svg width="200" height="200">
                    <path
                      d="M10 10 L100 10 L100 100 L10 100 Z"
                      fill="#f59e0b"
                    />
                    <path
                      d="M120 10 C170 10, 170 100, 120 100 S70 190, 120 190"
                      fill="none"
                      stroke="#3b82f6"
                      stroke-width="3"
                    />
                  </svg>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>SVG Path Element</title>
</head>
<body>
  <svg width="200" height="200">
    <path d="M10 10 L100 10 L100 100 L10 100 Z" fill="#f59e0b" />
    <path d="M120 10 C170 10, 170 100, 120 100 S70 190, 120 190" fill="none" stroke="#3b82f6" stroke-width="3" />
  </svg>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<svg width="200" height="200">
  <path d="M10 10 L100 10 L100 100 L10 100 Z" fill="#f59e0b" />
  <path d="M120 10 C170 10, 170 100, 120 100 S70 190, 120 190" fill="none" stroke="#3b82f6" stroke-width="3" />
</svg>`,
                        "path element"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "path element" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                <CodeEditor
                  value={`<svg width="200" height="200">
  <path d="M10 10 L100 10 L100 100 L10 100 Z" fill="#f59e0b" />
  <path d="M120 10 C170 10, 170 100, 120 100 S70 190, 120 190" fill="none" stroke="#3b82f6" stroke-width="3" />
</svg>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 3: Text and Styling */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">3. Text and Styling</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  SVG includes powerful text capabilities and CSS styling
                  options.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <svg width="400" height="150">
                    <rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="#f3f4f6"
                    />
                    <text
                      x="50"
                      y="50"
                      fontFamily="Arial"
                      fontSize="30"
                      fill="#4f46e5"
                      style={{
                        filter: "drop-shadow(3px 3px 5px rgba(0,0,0,0.5))",
                      }}
                    >
                      Hello SVG!
                    </text>

                    <text
                      x="50"
                      y="100"
                      font-family="Georgia"
                      font-style="italic"
                      font-size="24"
                      fill="none"
                      stroke="#ef4444"
                      stroke-width="2"
                    >
                      Styled Text
                    </text>
                    <text
                      x="50"
                      y="140"
                      font-family="Verdana"
                      font-weight="bold"
                      font-size="28"
                      fill="url(#gradient)"
                    >
                      Gradient Text
                    </text>
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stop-color="#10b981" />
                        <stop offset="100%" stop-color="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>SVG Text and Styling</title>
</head>
<body>
  <svg width="400" height="150">
    <rect x="0" y="0" width="100%" height="100%" fill="#f3f4f6" />
    <text x="50" y="50" font-family="Arial" font-size="30" fill="#4f46e5" style="filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.5))">
      Hello SVG!
    </text>
    <text x="50" y="100" font-family="Georgia" font-style="italic" font-size="24" fill="none" stroke="#ef4444" stroke-width="2">
      Styled Text
    </text>
    <text x="50" y="140" font-family="Verdana" font-weight="bold" font-size="28" fill="url(#gradient)">
      Gradient Text
    </text>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<svg width="400" height="150">
  <rect x="0" y="0" width="100%" height="100%" fill="#f3f4f6" />
  <text x="50" y="50" font-family="Arial" font-size="30" fill="#4f46e5" style="filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.5))">
    Hello SVG!
  </text>
  <text x="50" y="100" font-family="Georgia" font-style="italic" font-size="24" fill="none" stroke="#ef4444" stroke-width="2">
    Styled Text
  </text>
  <text x="50" y="140" font-family="Verdana" font-weight="bold" font-size="28" fill="url(#gradient)">
    Gradient Text
  </text>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
</svg>`,
                        "svg text"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "svg text" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                <CodeEditor
                  value={`<svg width="400" height="150">
  <rect x="0" y="0" width="100%" height="100%" fill="#f3f4f6" />
  <text x="50" y="50" font-family="Arial" font-size="30" fill="#4f46e5" style="filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.5))">
    Hello SVG!
  </text>
  <text x="50" y="100" font-family="Georgia" font-style="italic" font-size="24" fill="none" stroke="#ef4444" stroke-width="2">
    Styled Text
  </text>
  <text x="50" y="140" font-family="Verdana" font-weight="bold" font-size="28" fill="url(#gradient)">
    Gradient Text
  </text>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
</svg>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SVG Elements */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            SVG Elements Reference
          </h2>
          <button
            onClick={() => toggleSection("elements")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.elements ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.elements && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Element
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;svg&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      The container element that defines the SVG document
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;svg width="100" height="100"&gt;&lt;/svg&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;rect&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Creates a rectangle
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;rect x="10" y="10" width="80" height="60"
                        fill="blue" /&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;circle&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Creates a circle
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;circle cx="50" cy="50" r="40" fill="red" /&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;ellipse&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Creates an ellipse
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;ellipse cx="50" cy="50" rx="40" ry="30" fill="green"
                        /&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;line&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Creates a line
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;line x1="10" y1="10" x2="90" y2="90" stroke="black"
                        /&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;polyline&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Creates a series of connected straight lines
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;polyline points="10,10 40,40 10,70" fill="none"
                        stroke="black" /&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;polygon&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Creates a closed shape consisting of connected straight
                      lines
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;polygon points="50,10 90,90 10,90" fill="yellow"
                        /&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;path&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Creates complex shapes using path commands
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;path d="M10 10 L90 10 L90 90 L10 90 Z" fill="blue"
                        /&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;text&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Creates text
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;text x="10" y="50" font-family="Arial"
                        font-size="20"&gt;Hello&lt;/text&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;g&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Groups SVG elements together
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;g fill="red"&gt;&lt;circle cx="50" cy="50" r="40"
                        /&gt;&lt;/g&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded text-sm">
                        &lt;defs&gt;
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Defines reusable elements
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;defs&gt;&lt;linearGradient
                        id="grad1"&gt;...&lt;/linearGradient&gt;&lt;/defs&gt;
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Advanced Techniques */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Advanced SVG Techniques
          </h2>
          <button
            onClick={() => toggleSection("advanced")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.advanced ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.advanced && (
          <div className="space-y-6">
            {/* Example 1: Gradients */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  1. Gradients and Patterns
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  SVG supports linear and radial gradients, as well as pattern
                  fills.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <svg width="400" height="200">
                    <defs>
                      <linearGradient
                        id="linearGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stop-color="#4f46e5" />
                        <stop offset="100%" stop-color="#10b981" />
                      </linearGradient>
                      <radialGradient
                        id="radialGradient"
                        cx="50%"
                        cy="50%"
                        r="50%"
                        fx="50%"
                        fy="50%"
                      >
                        <stop offset="0%" stop-color="#f59e0b" />
                        <stop offset="100%" stop-color="#ef4444" />
                      </radialGradient>
                      <pattern
                        id="pattern"
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="10" cy="10" r="5" fill="#3b82f6" />
                      </pattern>
                    </defs>

                    <rect
                      x="10"
                      y="10"
                      width="120"
                      height="120"
                      fill="url(#linearGradient)"
                    />
                    <circle
                      cx="300"
                      cy="70"
                      r="60"
                      fill="url(#radialGradient)"
                    />
                    <rect
                      x="10"
                      y="140"
                      width="120"
                      height="50"
                      fill="url(#pattern)"
                    />
                  </svg>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>SVG Gradients and Patterns</title>
</head>
<body>
  <svg width="400" height="200">
    <defs>
      <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4f46e5" />
        <stop offset="100%" stop-color="#10b981" />
      </linearGradient>
      <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#f59e0b" />
        <stop offset="100%" stop-color="#ef4444" />
      </radialGradient>
      <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="5" fill="#3b82f6" />
      </pattern>
    </defs>
    
    <rect x="10" y="10" width="120" height="120" fill="url(#linearGradient)" />
    <circle cx="300" cy="70" r="60" fill="url(#radialGradient)" />
    <rect x="10" y="140" width="120" height="50" fill="url(#pattern)" />
  </svg>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<svg width="400" height="200">
  <defs>
    <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#ef4444" />
    </radialGradient>
    <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="5" fill="#3b82f6" />
    </pattern>
  </defs>
  
  <rect x="10" y="10" width="120" height="120" fill="url(#linearGradient)" />
  <circle cx="300" cy="70" r="60" fill="url(#radialGradient)" />
  <rect x="10" y="140" width="120" height="50" fill="url(#pattern)" />
</svg>`,
                        "gradients"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "gradients" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                <CodeEditor
                  value={`<svg width="400" height="200">
  <defs>
    <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
    <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#ef4444" />
    </radialGradient>
    <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="5" fill="#3b82f6" />
    </pattern>
  </defs>
  
  <rect x="10" y="10" width="120" height="120" fill="url(#linearGradient)" />
  <circle cx="300" cy="70" r="60" fill="url(#radialGradient)" />
  <rect x="10" y="140" width="120" height="50" fill="url(#pattern)" />
</svg>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 2: Filters and Effects */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  2. Filters and Effects
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  SVG provides powerful filter effects like blurring, lighting,
                  and more.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <svg width="400" height="200">
                    <defs>
                      <filter id="blur" x="0" y="0">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                      </filter>
                      <filter
                        id="shadow"
                        x="0"
                        y="0"
                        width="200%"
                        height="200%"
                      >
                        <feOffset
                          result="offOut"
                          in="SourceGraphic"
                          dx="5"
                          dy="5"
                        />
                        <feColorMatrix
                          result="matrixOut"
                          in="offOut"
                          type="matrix"
                          values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
                        />
                        <feGaussianBlur
                          result="blurOut"
                          in="matrixOut"
                          stdDeviation="2"
                        />
                        <feBlend
                          in="SourceGraphic"
                          in2="blurOut"
                          mode="normal"
                        />
                      </filter>
                    </defs>

                    <rect
                      x="10"
                      y="10"
                      width="100"
                      height="100"
                      fill="#4f46e5"
                      filter="url(#blur)"
                    />
                    <rect
                      x="150"
                      y="10"
                      width="100"
                      height="100"
                      fill="#10b981"
                      filter="url(#shadow)"
                    />
                    <text
                      x="50"
                      y="150"
                      font-family="Arial"
                      font-size="20"
                      fill="#ef4444"
                      filter="url(#shadow)"
                    >
                      Filter Effects
                    </text>
                  </svg>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>SVG Filters and Effects</title>
</head>
<body>
  <svg width="400" height="200">
    <defs>
      <filter id="blur" x="0" y="0">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
      </filter>
      <filter id="shadow" x="0" y="0" width="200%" height="200%">
        <feOffset result="offOut" in="SourceGraphic" dx="5" dy="5" />
        <feColorMatrix result="matrixOut" in="offOut" type="matrix"
          values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
    
    <rect x="10" y="10" width="100" height="100" fill="#4f46e5" filter="url(#blur)" />
    <rect x="150" y="10" width="100" height="100" fill="#10b981" filter="url(#shadow)" />
    <text x="50" y="150" font-family="Arial" font-size="20" fill="#ef4444" filter="url(#shadow)">
      Filter Effects
    </text>
  </svg>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<svg width="400" height="200">
  <defs>
    <filter id="blur" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
    <filter id="shadow" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="5" dy="5" />
      <feColorMatrix result="matrixOut" in="offOut" type="matrix"
        values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  
  <rect x="10" y="10" width="100" height="100" fill="#4f46e5" filter="url(#blur)" />
  <rect x="150" y="10" width="100" height="100" fill="#10b981" filter="url(#shadow)" />
  <text x="50" y="150" font-family="Arial" font-size="20" fill="#ef4444" filter="url(#shadow)">
    Filter Effects
  </text>
</svg>`,
                        "filters"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "filters" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                <CodeEditor
                  value={`<svg width="400" height="200">
  <defs>
    <filter id="blur" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
    <filter id="shadow" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="5" dy="5" />
      <feColorMatrix result="matrixOut" in="offOut" type="matrix"
        values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="2" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  
  <rect x="10" y="10" width="100" height="100" fill="#4f46e5" filter="url(#blur)" />
  <rect x="150" y="10" width="100" height="100" fill="#10b981" filter="url(#shadow)" />
  <text x="50" y="150" font-family="Arial" font-size="20" fill="#ef4444" filter="url(#shadow)">
    Filter Effects
  </text>
</svg>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 3: Animation */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">3. SVG Animation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  SVG can be animated using SMIL (Synchronized Multimedia
                  Integration Language) or CSS.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <svg width="300" height="200">
                    <rect x="10" y="10" width="50" height="50" fill="#3b82f6">
                      <animate
                        attributeName="x"
                        from="10"
                        to="240"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </rect>
                    <circle cx="150" cy="120" r="20" fill="#ef4444">
                      <animate
                        attributeName="fill"
                        values="#ef4444;#10b981;#3b82f6;#ef4444"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x="50"
                      y="180"
                      font-family="Arial"
                      font-size="16"
                      fill="#000"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      Animated SVG
                    </text>
                  </svg>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>SVG Animation</title>
</head>
<body>
  <svg width="300" height="200">
    <rect x="10" y="10" width="50" height="50" fill="#3b82f6">
      <animate attributeName="x" from="10" to="240" dur="3s" repeatCount="indefinite" />
    </rect>
    <circle cx="150" cy="120" r="20" fill="#ef4444">
      <animate attributeName="fill" values="#ef4444;#10b981;#3b82f6;#ef4444" dur="4s" repeatCount="indefinite" />
    </circle>
    <text x="50" y="180" font-family="Arial" font-size="16" fill="#000">
      <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
      Animated SVG
    </text>
  </svg>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<svg width="300" height="200">
  <rect x="10" y="10" width="50" height="50" fill="#3b82f6">
    <animate attributeName="x" from="10" to="240" dur="3s" repeatCount="indefinite" />
  </rect>
  <circle cx="150" cy="120" r="20" fill="#ef4444">
    <animate attributeName="fill" values="#ef4444;#10b981;#3b82f6;#ef4444" dur="4s" repeatCount="indefinite" />
  </circle>
  <text x="50" y="180" font-family="Arial" font-size="16" fill="#000">
    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    Animated SVG
  </text>
</svg>`,
                        "animation"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "animation" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>

                <CodeEditor
                  value={`<svg width="300" height="200">
  <rect x="10" y="10" width="50" height="50" fill="#3b82f6">
    <animate attributeName="x" from="10" to="240" dur="3s" repeatCount="indefinite" />
  </rect>
  <circle cx="150" cy="120" r="20" fill="#ef4444">
    <animate attributeName="fill" values="#ef4444;#10b981;#3b82f6;#ef4444" dur="4s" repeatCount="indefinite" />
  </circle>
  <text x="50" y="180" font-family="Arial" font-size="16" fill="#000">
    <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
    Animated SVG
  </text>
</svg>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Conclusion */}
      <section className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          Conclusion
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          SVG is a powerful tool for creating resolution-independent graphics
          that can be styled with CSS and animated with JavaScript. It's perfect
          for icons, logos, charts, and complex illustrations.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/compilers/html-editor"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try HTML Editor
          </Link>
          <Link
            href="/tutorials/html"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            More HTML Tutorials
          </Link>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t mt-5">
        <Link
          href="/html/canvas"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (Canvas)
        </Link>
        <Link
          href="/html/geolocation"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (Geolocation) &gt;
        </Link>
      </section>
    </div>
  );
}
