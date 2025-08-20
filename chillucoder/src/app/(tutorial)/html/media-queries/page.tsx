"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaMobileAlt,
  FaTabletAlt,
  FaDesktop,
  FaEye,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function MediaQueriesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    syntax: true,
    features: true,
    examples: true,
  });
  const router = useRouter();

  const handleOpenEditor = (code: string) => {
    try {
      localStorage.setItem("html-code", code);
      router.push("/compilers/html-editor");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

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

  const mediaQueryExamples = [
    {
      title: "Basic Width Query",
      description: "Change styles based on viewport width",
      code: `/* Default mobile styles */
body {
  background-color: #f8f9fa;
  font-size: 16px;
}

/* Tablet styles */
@media (min-width: 768px) {
  body {
    background-color: #e9ecef;
    font-size: 18px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  body {
    background-color: #dee2e6;
    font-size: 20px;
  }
}`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Mobile: Red background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Tablet: Yellow background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Desktop: Green background</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Print Styles",
      description: "Special styles for printed documents",
      code: `/* Default screen styles */
body {
  font-family: Arial, sans-serif;
  color: #333;
  background: white;
  padding: 2rem;
}

/* Print styles */
@media print {
  body {
    font-size: 12pt;
    line-height: 1.5;
    padding: 0;
  }
  
  nav, footer, .no-print {
    display: none;
  }
  
  a::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    font-weight: normal;
    color: #666;
  }
}`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaEye className="text-blue-500" />
              <span className="text-sm">Hides navigation on print</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="text-blue-500" />
              <span className="text-sm">Shows URLs after links</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="text-blue-500" />
              <span className="text-sm">Optimizes font size for printing</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Dark Mode Support",
      description: "Adapt styles for user's color scheme preference",
      code: `/* Light mode (default) */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --accent-color: #3b82f6;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
    --accent-color: #60a5fa;
  }
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}

a {
  color: var(--accent-color);
}`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <span className="text-sm">Light mode: White background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-800"></div>
              <span className="text-sm">Dark mode: Dark background</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-sm">Different accent colors</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>CSS Media Queries | Complete Guide with Examples</title>
        <meta
          name="description"
          content="Master CSS media queries to create responsive designs. Learn syntax, features, and practical examples for all device types."
        />
        <meta
          name="keywords"
          content="CSS media queries, responsive design, @media, breakpoints, print styles, dark mode, prefers-color-scheme"
        />
        <meta name="author" content="Your Name" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-2">
          CSS Media Queries
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Adapt your designs to any device or user preference
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-purple-50 dark:bg-gray-800 p-6 rounded-xl border border-purple-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-purple-500" />
          Introduction to Media Queries
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          CSS media queries allow you to apply styles based on device
          characteristics, user preferences, and environmental conditions. They
          are a cornerstone of responsive web design, enabling your content to
          look great on any device.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaMobileAlt className="text-purple-500" />
            <span>Screen Size</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTabletAlt className="text-purple-500" />
            <span>Orientation</span>
          </div>
          <div className="flex items-center gap-2">
            <FaDesktop className="text-purple-500" />
            <span>Color Scheme</span>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media Query Example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
    }
    
    .box {
      padding: 20px;
      background: #e0e0e0;
      text-align: center;
    }
    
    @media (min-width: 768px) {
      .box {
        background: #d0d0d0;
      }
    }
    
    @media (min-width: 1024px) {
      .box {
        background: #c0c0c0;
      }
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Media Query Demo</h1>
    <p>Resize your browser to see the background change</p>
  </div>
</body>
</html>`)
          }
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Basics */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-purple-500" />
            Media Query Basics
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
                What Are Media Queries?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Media queries are CSS techniques that apply styles based on:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Viewport width and height</li>
                    <li>Device orientation (portrait/landscape)</li>
                    <li>Display resolution and color capabilities</li>
                    <li>User preferences (dark mode, reduced motion)</li>
                    <li>Output type (screen, print, etc.)</li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-css">
                      {`/* Basic structure */
@media media-type and (media-feature) {
  /* CSS rules */
}

/* Common media types:
   - screen (default)
   - print
   - speech
   - all
*/`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
                Why Use Media Queries?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Media queries enable responsive design, which is essential
                    for:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Creating mobile-friendly websites</li>
                    <li>Adapting layouts to different screen sizes</li>
                    <li>Improving accessibility with user preferences</li>
                    <li>Optimizing print versions of web pages</li>
                    <li>Providing enhanced experiences on high-res displays</li>
                  </ul>
                </div>
                <div className="bg-purple-50 dark:bg-gray-700 border-l-4 border-purple-500 p-4">
                  <p className="text-purple-700 dark:text-purple-400">
                    <strong>Did you know?</strong> Over 60% of web traffic now
                    comes from mobile devices, making media queries more
                    important than ever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Syntax */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-purple-500" />
            Media Query Syntax
          </h2>
          <button
            onClick={() => toggleSection("syntax")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.syntax ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.syntax && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
                Basic Syntax
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The basic structure of a media query consists of:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      The{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        @media
                      </code>{" "}
                      at-rule
                    </li>
                    <li>
                      An optional media type (defaults to{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        all
                      </code>
                      )
                    </li>
                    <li>One or more media features with conditions</li>
                    <li>
                      A block of CSS rules to apply when the conditions are met
                    </li>
                  </ol>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleOpenEditor(`@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}`)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles for tablet devices */
}`,
                          "Basic Media Query"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === "Basic Media Query" ? (
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
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-css">
                      {`/* Basic example */
@media (min-width: 768px) {
  /* Styles for screens wider than 768px */
}

/* With media type */
@media screen and (min-width: 768px) {
  /* Screen-specific styles */
}

/* Multiple conditions */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles for tablet devices */
}

/* Comma-separated (OR logic) */
@media (max-width: 767px), (orientation: portrait) {
  /* Styles for mobile OR portrait */
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
                Common Media Features
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Media features test specific characteristics of the user&apos;s
                    device or environment:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        width
                      </code>
                      ,{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        height
                      </code>{" "}
                      - Viewport dimensions
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        orientation
                      </code>{" "}
                      - Portrait or landscape
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        aspect-ratio
                      </code>{" "}
                      - Width to height ratio
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        resolution
                      </code>{" "}
                      - Pixel density
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        prefers-color-scheme
                      </code>{" "}
                      - Dark/light mode
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        prefers-reduced-motion
                      </code>{" "}
                      - Accessibility
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-css">
                      {`/* Width-based */
@media (min-width: 768px) { ... }

/* Orientation */
@media (orientation: landscape) { ... }

/* Pixel density */
@media (min-resolution: 2dppx) { ... }

/* Dark mode */
@media (prefers-color-scheme: dark) { ... }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) { ... }`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-purple-500" />
            Advanced Features
          </h2>
          <button
            onClick={() => toggleSection("features")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.features ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.features && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
                Range Syntax
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Modern CSS supports mathematical comparison operators in
                    media queries for more concise syntax:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        width &gt; 600px
                      </code>{" "}
                      - Width greater than 600px
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        width &lt;= 1024px
                      </code>{" "}
                      - Width 1024px or less
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        600px &lt; width &lt; 1200px
                      </code>{" "}
                      - Width between values
                    </li>
                  </ul>
                  <div className="bg-purple-50 dark:bg-gray-700 border-l-4 border-purple-500 p-4 mt-4">
                    <p className="text-purple-700 dark:text-purple-400">
                      <strong>Browser Support:</strong> Range syntax is
                      supported in all modern browsers but not in IE.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-css">
                      {`/* Old syntax */
@media (min-width: 600px) and (max-width: 1024px) { ... }

/* New range syntax */
@media (600px <= width <= 1024px) { ... }

/* Other examples */
@media (width > 600px) { ... }
@media (height < 800px) { ... }
@media (400px < width < 1000px) { ... }`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
                User Preference Features
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Modern media queries can adapt to user preferences for
                    better accessibility and user experience:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        prefers-color-scheme
                      </code>{" "}
                      - Dark/light mode
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        prefers-reduced-motion
                      </code>{" "}
                      - Reduce animations
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        prefers-contrast
                      </code>{" "}
                      - High contrast mode
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        prefers-reduced-transparency
                      </code>{" "}
                      - Less transparency
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        prefers-reduced-data
                      </code>{" "}
                      - Data saver mode
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-css">
                      {`/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

/* High contrast */
@media (prefers-contrast: more) {
  body {
    color: black;
    background: white;
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
                Print Styles
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Media queries can target print output to optimize how your
                    page looks when printed:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Remove unnecessary elements (nav, ads)</li>
                    <li>Adjust colors for better print contrast</li>
                    <li>Ensure content fits page width</li>
                    <li>Add URL references after links</li>
                    <li>Control page breaks</li>
                  </ul>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleOpenEditor(`@media print {
  nav, footer, .ad-banner {
    display: none;
  }
  
  body {
    font-size: 12pt;
    line-height: 1.5;
    color: black;
    background: white;
  }
  
  a::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
  }
  
  .page-break {
    page-break-after: always;
  }
}`)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `@media print {
  /* Hide navigation and ads */
  nav, .ad-banner { display: none; }
  
  /* Improve readability */
  body {
    font-size: 12pt;
    color: black;
    background: white;
  }
  
  /* Show URLs after links */
  a::after {
    content: " (" attr(href) ")";
  }
}`,
                          "Print Styles"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === "Print Styles" ? (
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
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-css">
                      {`@media print {
  /* Reset colors */
  body {
    color: #000 !important;
    background: #fff !important;
  }
  
  /* Hide unnecessary elements */
  nav, footer, .ad-banner {
    display: none;
  }
  
  /* Adjust typography */
  body {
    font-size: 12pt;
    line-height: 1.5;
  }
  
  /* Show URLs */
  a::after {
    content: " (" attr(href) ")";
  }
  
  /* Page breaks */
  .page-break {
    page-break-after: always;
  }
  
  /* Avoid breaking inside elements */
  h1, h2, h3, p {
    page-break-inside: avoid;
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Examples Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-purple-500" />
            Practical Examples
          </h2>
          <button
            onClick={() => toggleSection("examples")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.examples ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.examples && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaQueryExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => handleOpenEditor(example.code)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(example.code, example.title)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === example.title ? (
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
                    value={example.code}
                    language="css"
                    placeholder=""
                    padding={15}
                    style={{
                      fontSize: 14,
                      backgroundColor: "#f8fafc",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                    className="rounded-b-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Best Practices Section */}
      <section className="mb-8 bg-purple-50 dark:bg-gray-800 p-6 rounded-xl border border-purple-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-purple-500" />
          Media Query Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use mobile-first approach (min-width queries)</li>
              <li>Organize media queries near their related styles</li>
              <li>Use em units for more consistent breakpoints</li>
              <li>Test on real devices whenever possible</li>
              <li>Consider user preference features for accessibility</li>
              <li>Use print styles for printer-friendly versions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-purple-600 dark:text-purple-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t target specific devices (focus on features)</li>
              <li>
                Avoid too many small breakpoints (content should guide you)
              </li>
              <li>Don&apos;t duplicate styles unnecessarily</li>
              <li>Avoid !important in media queries</li>
              <li>Don&apos;t forget to test both portrait and landscape</li>
              <li>Avoid hiding important content on smaller screens</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-purple-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Experiment with Media Queries
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Try out media queries in our interactive editor with live preview:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test responsive layouts with width queries</li>
              <li>Experiment with dark mode preferences</li>
              <li>Create printer-friendly styles</li>
              <li>Try out the new range syntax</li>
            </ul>
            <button
              onClick={() => {
                const mediaQueryExample = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media Query Playground</title>
  <style>
    /* Mobile-first base styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background: #f8f9fa;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .box {
      padding: 20px;
      margin-bottom: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    /* Tablet styles */
    @media (min-width: 768px) {
      body {
        padding: 30px;
      }
      
      .boxes {
        display: flex;
        gap: 20px;
      }
      
      .box {
        flex: 1;
      }
    }
    
    /* Desktop styles */
    @media (min-width: 1024px) {
      body {
        padding: 40px;
      }
    }
    
    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      body {
        background: #1a1a1a;
        color: #f0f0f0;
      }
      
      .box {
        background: #2a2a2a;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Media Query Playground</h1>
    <p>Resize your browser or change system preferences to see effects</p>
    
    <div class="boxes">
      <div class="box">
        <h2>Box 1</h2>
        <p>This layout changes at different breakpoints</p>
      </div>
      <div class="box">
        <h2>Box 2</h2>
        <p>Try enabling dark mode in your system</p>
      </div>
    </div>
  </div>
</body>
</html>`;
                localStorage.setItem("html-code", mediaQueryExample);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch Media Query Editor
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm overflow-x-auto">
                <code className="language-css">
                  {`/* Example media queries to try */
/* Width-based */
@media (768px <= width <= 1024px) {
  /* Tablet styles */
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
  }
}

/* Print styles */
@media print {
  nav, footer { display: none; }
  body { font-size: 12pt; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t mt-5">
        <Link
          href="/html/responsive"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (Responsive Design)
        </Link>
        <Link
          href="/html/symbols"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (HTML Symbols) &gt;
        </Link>
      </section>
    </div>
  );
}
