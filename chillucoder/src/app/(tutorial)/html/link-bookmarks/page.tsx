"use client";

import {
  FaLink,
  FaBookmark,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaArrowLeft,
  FaArrowRight,
  FaInfoCircle,
  FaCode,
  FaHashtag,
  FaArrowUp,
  FaMousePointer,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLLinkBookmarksPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    navigation: true,
    examples: true,
    bestPractices: true,
    advanced: true,
  });
  // Update the state type to include 'js'
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [readingTime, setReadingTime] = useState(0);

  const router = useRouter();

  // Calculate reading time
  useEffect(() => {
    const text = document.querySelector("main")?.textContent || "";
    const words = text.trim().split(/\s+/).length;
    setReadingTime(Math.ceil(words / 200));
  }, []);

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

  // Bookmark examples data
  const bookmarkBasics = [
    {
      title: "Creating Bookmarks",
      description:
        "How to create anchor points in your page that can be linked to",
      html: `<!-- Create a bookmark with id attribute -->
    <h2 id="section1">Section 1</h2>
    <p>Content for section 1...</p>`,
      css: `/* Style for bookmarked sections */
    h2[id] {
    scroll-margin-top: 80px; /* Account for fixed header */
    }`,
      usage: "Use id attributes on any element to create bookmark targets",
    },
    {
      title: "Linking to Bookmarks",
      description:
        "How to create links that jump to specific sections of a page",
      html: `<!-- Link to a bookmark on the same page -->
    <a href="#section1">Jump to Section 1</a>

    <!-- Link to a bookmark on another page -->
    <a href="/page.html#section2">Go to Section 2</a>`,
      css: `/* Style for bookmark links */
    a[href^="#"] {
    color: #2563eb;
    text-decoration: none;
    }
    a[href^="#"]:hover {
    text-decoration: underline;
    }`,
      usage: "Use # followed by the id to link to bookmarks",
    },
  ];

  const navigationExamples = [
    {
      title: "Table of Contents",
      description: "Create a navigation menu that links to page sections",
      html: `<!-- Table of Contents -->
    <nav aria-label="Page sections">
    <h2>Contents</h2>
    <ul>
        <li><a href="#intro">Introduction</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
    </nav>

    <!-- Bookmarked sections -->
    <section id="intro">
    <h2>Introduction</h2>
    <p>Welcome content...</p>
    </section>`,
      css: `/* Style for table of contents */
    nav[aria-label="Page sections"] {
    position: sticky;
    top: 20px;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    nav[aria-label="Page sections"] a {
    display: block;
    padding: 0.25rem 0;
    color: #4b5563;
    }

    nav[aria-label="Page sections"] a:hover {
    color: #2563eb;
    }`,
      features: [
        "Accessible navigation",
        "Sticky positioning",
        "Semantic HTML",
      ],
    },
  ];

  const bestPractices = [
    {
      title: "Smooth Scrolling",
      description: "Add smooth scrolling behavior for better user experience",
      html: `<!-- No changes needed to your HTML -->
    <a href="#section">Jump to Section</a>`,
      css: `/* Enable smooth scrolling */
    html {
    scroll-behavior: smooth;
    }

    /* Optional: Custom scroll offset */
    :target {
    scroll-margin-top: 80px;
    }`,
      explanation:
        "Smooth scrolling makes navigation more pleasant and professional",
    },
    {
      title: "Back to Top Button",
      description: "Create a button that returns users to the top of the page",
      html: `<!-- Back to top button -->
    <button id="back-to-top" aria-label="Back to top">
    <FaArrowUp />
    </button>`,
      css: `#back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    }

    #back-to-top.visible {
    opacity: 1;
    }`,
      js: `// Show/hide back to top button
    window.addEventListener('scroll', () => {
    const button = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        button.classList.add('visible');
    } else {
        button.classList.remove('visible');
    }
    });

    // Scroll to top function
    document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    });`,
      explanation: "Helpful for long pages to improve navigation",
    },
  ];

  const advancedTechniques = [
    {
      title: "URL Hash Detection",
      description:
        "Highlight the current section in navigation based on URL hash",
      html: `<!-- Navigation with active state support -->
    <nav>
    <a href="#section1" class="nav-link">Section 1</a>
    <a href="#section2" class="nav-link">Section 2</a>
    </nav>`,
      css: `/* Style for active navigation item */
    .nav-link.active {
    font-weight: bold;
    color: #2563eb;
    }`,
      js: `// Highlight current section in nav
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
        }
    });
    });`,
      useCase: "For long documentation pages or single-page applications",
    },
  ];

  // Update the renderCodeExample function to handle JavaScript
  const renderCodeExample = (
    htmlCode: string,
    cssCode: string,
    jsCode = "",
    name: string
  ) => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "html"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "css"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
          {jsCode && (
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "js"
                  ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("js")}
            >
              JavaScript
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-auto">
          <CodeEditor
            value={
              activeTab === "html"
                ? htmlCode
                : activeTab === "css"
                  ? cssCode
                  : jsCode
            }
            language={
              activeTab === "html"
                ? "html"
                : activeTab === "css"
                  ? "css"
                  : "javascript"
            }
            padding={12}
            style={{
              fontSize: 13,
              backgroundColor: "#f8fafc",
              fontFamily:
                "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
            }}
            className="dark:bg-gray-900 dark:text-gray-200"
            readOnly
          />
        </div>

        <div className="flex justify-end gap-2 p-3 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() =>
              handleOpenEditor(
                `${htmlCode}\n\n<style>${cssCode}</style>\n\n<script>${jsCode}</script>`
              )
            }
            className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            <FaPlay size={10} className="inline mr-1" /> Try
          </button>
          <button
            onClick={() =>
              copyToClipboard(
                activeTab === "html"
                  ? htmlCode
                  : activeTab === "css"
                    ? cssCode
                    : jsCode,
                name
              )
            }
            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {copied === name ? (
              <FaCheck size={10} className="inline mr-1 text-green-500" />
            ) : (
              <FaCopy size={10} className="inline mr-1" />
            )}
            Copy
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Link Bookmarks Guide
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Learn how to create and use bookmarks for in-page navigation
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-2">⏱️ Reading time: {readingTime} min</span>
            <span className="px-2">•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaHashtag className="text-blue-500" />
          Introduction to HTML Bookmarks
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            HTML bookmarks (also called fragment identifiers or anchor links)
            allow you to create links that jump to specific sections of a
            webpage. They're essential for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Creating table of contents navigation</li>
            <li>Linking to specific content sections</li>
            <li>Improving user experience on long pages</li>
            <li>Creating "Back to top" functionality</li>
            <li>Building single-page application navigation</li>
          </ul>
          <p>
            This guide covers all aspects of creating and using HTML bookmarks
            effectively.
          </p>
        </div>
      </section>

      {/* Bookmark Basics */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("basics")}
          aria-expanded={expandedSections["basics"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaLink className="text-blue-500" />
            Bookmark Basics
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["basics"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["basics"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookmarkBasics.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="p-4">
                  {renderCodeExample(item.html, item.css, "", item.title)}
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <strong>Usage:</strong> {item.usage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Navigation Examples */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("navigation")}
          aria-expanded={expandedSections["navigation"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaMousePointer className="text-purple-500" />
            Navigation Examples
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["navigation"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["navigation"] && (
          <div className="space-y-6">
            {navigationExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{example.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {example.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {example.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {renderCodeExample(
                    example.html,
                    example.css,
                    "",
                    example.title
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("bestPractices")}
          aria-expanded={expandedSections["bestPractices"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-orange-500" />
            Bookmark Best Practices
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["bestPractices"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["bestPractices"] && (
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{practice.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {practice.description}
                  </p>
                </div>
                <div className="p-4">
                  {renderCodeExample(
                    practice.html,
                    practice.css,
                    practice.js,
                    practice.title
                  )}
                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    <strong>Why this matters:</strong> {practice.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Advanced Techniques */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("advanced")}
          aria-expanded={expandedSections["advanced"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Advanced Bookmark Techniques
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["advanced"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["advanced"] && (
          <div className="space-y-6">
            {advancedTechniques.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="p-4">
                  {renderCodeExample(item.html, item.css, item.js, item.title)}
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <strong>Use Case:</strong> {item.useCase}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Interactive Playground */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                Bookmarks Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with different bookmark techniques in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Bookmark Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different bookmark scenarios
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Live Preview
              </span>
            </div>

            <div className="p-6">
              <div className="flex justify-center mt-8">
                <button
                  onClick={() =>
                    handleOpenEditor(`<!DOCTYPE html>
<html>
  <head>
    <style>
      html {
        scroll-behavior: smooth;
      }
      section {
        min-height: 100vh;
        padding: 2rem;
        border-bottom: 1px solid #eee;
      }
      nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: white;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      nav a {
        margin-right: 1rem;
        text-decoration: none;
        color: #2563eb;
      }
      nav a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>

    <section id="home">
      <h1>Home Section</h1>
      <p>Scroll down or use the navigation...</p>
    </section>

    <section id="about">
      <h1>About Section</h1>
    </section>

    <section id="contact">
      <h1>Contact Section</h1>
      <a href="#home">Back to top</a>
    </section>
  </body>
</html>
`)
                  }
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FaPlay className="mr-2" />
                  Open in Live Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        <Link
          href="/html/link-colors"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        <Link
          href="/html/images"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
