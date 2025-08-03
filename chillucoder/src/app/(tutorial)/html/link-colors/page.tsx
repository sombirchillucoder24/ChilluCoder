"use client";

import {
  FaBookmark,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaPalette,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLLinkColorsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basics: true,
    states: true,
    examples: true,
    bestPractices: true,
    advanced: true,
  });
  const [activeTab, setActiveTab] = useState<"css" | "html">("css");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const router = useRouter();

  // Calculate reading time
  useEffect(() => {
    const text = document.querySelector("main")?.textContent || "";
    const words = text.trim().split(/\s+/).length;
    setReadingTime(Math.ceil(words / 200)); // 200 words per minute
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
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Enhanced example data with interactive features
  const linkColorBasics = [
    {
      title: "Default Link State",
      description: "The foundational style for all links in their normal, unvisited state. This sets the visual standard for clickable elements across your site.",
      css: `/* Primary link color */
a {
  color: #2563eb; /* Modern blue */
  text-decoration: none;
  transition: color 0.3s ease;
}`,
      html: `<!-- Basic link implementation -->
<a href="/about">About Our Company</a>`,
      usage: "Use for all standard navigational links. This is typically your brand's primary color.",
      interactive: true,
    },
    {
      title: "Visited Link State",
      description: "Visual indicator for links that users have already clicked, helping with navigation orientation.",
      css: `/* Visited state styling */
a:visited {
  color: #7c3aed; /* Purple shade */
  opacity: 0.9;
}`,
      html: `<!-- Link that changes when visited -->
<a href="/visited-page">User Dashboard</a>`,
      usage: "Important for user experience to show navigation history, but keep subtle to maintain design consistency.",
      interactive: true,
    },
    {
      title: "Hover Interaction",
      description: "Visual feedback when users hover over links, improving interactivity perception.",
      css: `/* Hover effects */
a:hover {
  color: #748562; /* Darker blue */
  text-decoration: underline;
  transform: translateY(-1px);
}`,
      html: `<!-- Hoverable link -->
<a href="/products" class="hover-link">View Products</a>`,
      usage: "Essential for indicating interactive elements. Include subtle animations for modern feel.",
      interactive: true,
    },
    {
      title: "Active Link State",
      description: "Visual feedback during the exact moment a link is being clicked.",
      css: `/* Active/click state */
a:active {
  color: #1e40af; /* Deep blue */
  transform: translateY(1px);
}`,
      html: `<!-- Active state example -->
<a href="/contact">Click Me</a>`,
      usage: "Provides immediate feedback during user interaction. Often overlooked but valuable for UX.",
      interactive: true,
    },
  ];

  // Render code example with enhanced features
  const renderCodeExample = (cssCode: string, htmlCode: string, name: string, interactive = false) => {
    return (
      <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4" : ""
      }`}>
        {isFullscreen && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{name}</h3>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Exit fullscreen"
            >
              <FaCompress />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "css" ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("css")}
            >
              CSS
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "html" ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("html")}
            >
              HTML
            </button>
          </div>
          {!isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Expand to fullscreen"
            >
              <FaExpand size={14} />
            </button>
          )}
        </div>

        <div className={`${isFullscreen ? "h-[calc(100vh-180px)]" : "max-h-96"} overflow-auto`}>
          <CodeEditor
            value={activeTab === "css" ? cssCode : htmlCode}
            language={activeTab === "css" ? "css" : "html"}
            padding={16}
            style={{
              fontSize: 14,
              backgroundColor: "#f8fafc",
              fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
            }}
            className="dark:bg-gray-900 dark:text-gray-200"
            readOnly
          />
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800">
          <div className="flex gap-2">
            <button
              onClick={() => handleOpenEditor(`<style>${cssCode}</style>\n${htmlCode}`)}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <FaPlay size={12} /> Try in Editor
            </button>
            <button
              onClick={() => copyToClipboard(activeTab === "css" ? cssCode : htmlCode, name)}
              className="flex items-center gap-1 text-sm px-3 py-1 rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {copied === name ? (
                <FaCheck size={12} className="text-green-500" />
              ) : (
                <FaCopy size={12} />
              )}
              {copied === name ? "Copied!" : "Copy"}
            </button>
          </div>
          {interactive && (
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
              Interactive Example
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <main>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          Mastering HTML Link Colors: A Comprehensive Guide
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Learn professional techniques for styling hyperlinks with CSS to enhance UX and accessibility
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-2">⏱️ Reading time: {readingTime} min</span>
            <span className="px-2">•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      {/* SEO Meta Section */}
      <section className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          <FaInfoCircle className="text-yellow-600 dark:text-yellow-400" />
          Key Takeaways
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Proper link styling improves navigation and user experience</li>
          <li>Color contrast ratios must meet WCAG accessibility standards</li>
          <li>Interactive states (hover, active) provide crucial feedback</li>
          <li>Consistent link colors establish visual hierarchy</li>
          <li>Advanced techniques can enhance engagement without sacrificing usability</li>
        </ul>
      </section>

      {/* Introduction with Semantic HTML */}
      <article className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaPalette className="text-blue-500" />
          The Importance of Link Styling
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            In web design, <strong>link colors serve as visual signposts</strong>, guiding users through your content. 
            Properly styled links don&apos;t just look good—they significantly impact usability, accessibility, 
            and conversion rates. This guide explores professional techniques for implementing effective 
            link styling that balances aesthetic appeal with functional requirements.
          </p>
          
          <section className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Why Link Colors Matter:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                <span><strong>Usability:</strong> Helps users identify clickable elements</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-1.5 mr-2"></span>
                <span><strong>Accessibility:</strong> Must meet contrast requirements</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-2"></span>
                <span><strong>Branding:</strong> Reinforces visual identity</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2"></span>
                <span><strong>Conversion:</strong> Affects click-through rates</span>
              </li>
            </ul>
          </section>

          <p>
            Throughout this guide, we&apos;ll explore both fundamental concepts and advanced techniques, 
            complete with interactive examples you can test directly in our live editor.
          </p>
        </div>
      </article>

      {/* Link Color Basics Section */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => toggleSection("basics")}
          aria-expanded={expandedSections["basics"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaPalette className="text-blue-500" />
            Fundamental Link States
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections["basics"] ? "rotate-180" : ""}`} />
        </button>

        {expandedSections["basics"] && (
          <>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Every hyperlink can exist in several states, each requiring distinct visual treatment. 
              These states form the foundation of interactive web design.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {linkColorBasics.map((item, index) => (
                <article key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <header className="mb-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <span className="text-purple-600 dark:text-purple-400">
                        {item.title}
                      </span>
                      {item.interactive && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          Interactive
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </header>
                  
                  {renderCodeExample(
                    item.css,
                    item.html,
                    item.title,
                    item.interactive
                  )}
                  
                  <footer className="mt-3">
                    <p className="text-sm text-green-600 dark:text-green-400">
                      <strong>Best Practice:</strong> {item.usage}
                    </p>
                  </footer>
                </article>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <FaInfoCircle className="text-blue-500" />
                Pro Tip: Link State Order Matters
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                When styling link states, follow the LVHA order: <strong>L</strong>ink, <strong>V</strong>isited,
                <strong>H</strong>over, <strong>A</strong>ctive. This ensures proper cascade of styles. 
                A common mnemonic is &quot;LoVe HAte&quot;.
              </p>
              <div className="mt-2 bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm">
                <code>a:link → a:visited → a:hover → a:active</code>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Interactive Playground */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                Interactive Link Styling Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with our pre-configured examples or start from scratch
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Link Styling Templates
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Choose from professionally designed templates or create your own
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Live Preview
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() =>
                    handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <style>
    /* Minimalist Style */
    a {
      color: #2563eb;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: all 0.3s ease;
    }
    a:hover {
      color: #748562;
      border-bottom-color: currentColor;
    }
  </style>
</head>
<body>
  <a href="#">Minimalist Link</a>
</body>
</html>`)
                  }
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="text-center">
                    <div className="mx-auto w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full mb-2"></div>
                    <span className="text-sm">Minimalist</span>
                  </div>
                </button>

                <button
                  onClick={() =>
                    handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <style>
    /* Button Style */
    a {
      display: inline-block;
      padding: 8px 16px;
      background-color: #2563eb;
      color: white;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    a:hover {
      background-color: #748562;
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <a href="#">Button Link</a>
</body>
</html>`)
                  }
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="text-center">
                    <div className="mx-auto w-8 h-8 bg-blue-500 rounded-full mb-2"></div>
                    <span className="text-sm">Button</span>
                  </div>
                </button>

                <button
                  onClick={() =>
                    handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <style>
    /* Animated Style */
    a {
      color: #2563eb;
      text-decoration: none;
      position: relative;
    }
    a::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #2563eb;
      transition: width 0.3s ease;
    }
    a:hover::after {
      width: 100%;
    }
  </style>
</head>
<body>
  <a href="#">Animated Link</a>
</body>
</html>`)
                  }
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="text-center">
                    <div className="mx-auto w-8 h-8 bg-purple-500 rounded-full mb-2"></div>
                    <span className="text-sm">Animated</span>
                  </div>
                </button>

                <button
                  onClick={() =>
                    handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <style>
    /* Custom Style */
    a {
      color: #2563eb;
      text-decoration: none;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    a:hover {
      background-color: #dbeafe;
      color: #748562;
    }
    a:active {
      transform: scale(0.98);
    }
  </style>
</head>
<body>
  <a href="#">Custom Link</a>
</body>
</html>`)
                  }
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="text-center">
                    <div className="mx-auto w-8 h-8 bg-green-500 rounded-full mb-2"></div>
                    <span className="text-sm">Custom</span>
                  </div>
                </button>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() =>
                    handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <style>
    /* Starter Template */
    a {
      color: #2563eb;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    a:hover {
      color: #748562;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <a href="#">Start Editing Me</a>
</body>
</html>`)
                  }
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FaPlay className="mr-2" />
                  Start with Blank Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaBookmark className="text-purple-500" />
          Advanced Link Styling Techniques
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Gradient Text Links</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Create eye-catching links with gradient text colors that transition on hover.
            </p>
            {renderCodeExample(
              `/* Gradient text effect */
.gradient-link {
  background-image: linear-gradient(to right, #2563eb, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-decoration: none;
  transition: background-image 0.3s ease;
}

.gradient-link:hover {
  background-image: linear-gradient(to right, #748562, #6d28d9);
}`,
              `<a href="#" class="gradient-link">Gradient Link</a>`,
              "Gradient Links",
              true
            )}
          </article>

          <article className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">3D Button Links</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Links that appear three-dimensional with shadow effects and press-down animation.
            </p>
            {renderCodeExample(
              `/* 3D button effect */
.button-3d {
  display: inline-block;
  padding: 12px 24px;
  background-color: #2563eb;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 4px 0 #748562;
  transition: all 0.2s ease;
  position: relative;
  top: 0;
}

.button-3d:hover {
  background-color: #748562;
}

.button-3d:active {
  top: 4px;
  box-shadow: 0 0 0 #748562;
}`,
              `<a href="#" class="button-3d">3D Button</a>`,
              "3D Button Links",
              true
            )}
          </article>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Mastering link styling is essential for creating professional, accessible, and engaging websites. 
            Remember these key principles:
          </p>
          <ol>
            <li><strong>Maintain consistency</strong> in your link styling across the site</li>
            <li><strong>Ensure accessibility</strong> with proper color contrast and focus states</li>
            <li><strong>Provide clear feedback</strong> through hover and active states</li>
            <li><strong>Balance creativity</strong> with usability in your designs</li>
          </ol>
          <p>
            The techniques covered in this guide provide a solid foundation, but always test your implementations 
            with real users to ensure optimal results.
          </p>
        </div>
      </section>

            {/* Navigation Footer */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        <Link
          href="/html/links"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        <Link
          href="/html/link-bookmarks"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </main>
  );
}