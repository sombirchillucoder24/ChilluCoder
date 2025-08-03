"use client";

import {
  FaComment,
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLCommentsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    usage: true,
    examples: true,
    bestPractices: true,
    advanced: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Comments Examples</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .comment-example {
      margin: 15px 0;
      padding: 10px;
      border-left: 3px solid #4a6ee0;
      background-color: #f8fafc;
    }
    .comment {
      color: #6a737d;
      font-style: italic;
    }
    .conditional-comment {
      background-color: #fff8e1;
      padding: 5px;
      border-left: 3px solid #ffc107;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Comments</h1>
    
    <!-- Main content section -->
    <section>
      <h2>Basic Comments</h2>
      
      <div class="comment-example">
        <!-- This is a single-line comment -->
        <p>This paragraph has a comment above it.</p>
        
        <p>This paragraph has a <!-- inline comment --> within it.</p>
        
        <!-- 
          This is a multi-line comment
          that spans several lines
          in the HTML source code
        -->
        <p>Multi-line comment example.</p>
      </div>
    </section>
    
    <!-- Development notes section -->
    <section>
      <h2>Development Comments</h2>
      
      <div class="comment-example">
        <!-- TODO: Update this section with new content -->
        <p>Content needing updates.</p>
        
        <!-- FIXME: Check accessibility on this element -->
        <div class="feature">
          <p>Interactive element</p>
        </div>
        
        <!-- 
          SECTION: User profile
          Description: Contains all user profile elements
          Last updated: 2023-06-15 by Developer Name
        -->
        <div class="user-profile">
          <p>User information</p>
        </div>
      </div>
    </section>
    
    <!-- Conditional comments (deprecated but good to know) -->
    <section>
      <h2>Conditional Comments</h2>
      <div class="conditional-comment">
        <p><strong>Note:</strong> Conditional comments were Internet Explorer specific and are now deprecated.</p>
        <!--[if IE]>
          <p>This content would only display in Internet Explorer</p>
        <![endif]-->
      </div>
    </section>
  </div>
</body>
</html>`;

    try {
      localStorage.setItem("html-code", staticHtmlContent);
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

  const commentBasics = [
    {
      title: "Single-line Comments",
      description: "Comments that occupy a single line in your code",
      example: `<!-- This is a single-line comment -->`,
      usage: "For brief notes or to temporarily disable a single line",
    },
    {
      title: "Multi-line Comments",
      description: "Comments that span multiple lines",
      example: `<!-- 
  This is a multi-line comment
  that can span as many lines
  as you need
-->`,
      usage: "For longer explanations or to disable blocks of code",
    },
    {
      title: "Inline Comments",
      description: "Comments placed within a line of code",
      example: `<p>This is text <!-- important note --> with an inline comment</p>`,
      usage: "To annotate specific parts of a line (use sparingly)",
    },
    {
      title: "Commenting Out Code",
      description: "Disabling HTML without deleting it",
      example: `<!-- 
<div>
  <p>Temporarily disabled content</p>
</div>
-->`,
      usage: "For debugging or temporarily removing elements",
    },
  ];

  const practicalUses = [
    {
      title: "Development Notes",
      description: "Leave notes for yourself or other developers",
      example: `<!-- TODO: Update this section with new images -->
<!-- FIXME: Check mobile responsiveness -->
<!-- OPTIMIZE: Reduce image sizes -->`,
      benefits: "Helps track work items and issues directly in code",
    },
    {
      title: "Section Headers",
      description: "Documenting major sections of your HTML",
      example: `<!-- 
  ======================
  HEADER SECTION
  Includes: Logo, navigation, search
  Last updated: 2023-06-15
====================== 
-->
<header>...</header>`,
      benefits: "Makes large files more navigable and maintainable",
    },
    {
      title: "Templating Notes",
      description: "Notes for template systems or CMS",
      example: `<!-- 
  TEMPLATE VARIABLES:
  {user_name} - Displays the current user's name
  {user_avatar} - Displays the user's profile image
-->`,
      benefits: "Documents dynamic content placeholders",
    },
    {
      title: "Browser-Specific Workarounds",
      description: "Documenting special cases",
      example: `<!-- 
  IE11 FIX: 
  The following div needs position:relative
  to prevent rendering issues in IE11
-->`,
      benefits: "Explains why non-standard code exists",
    },
  ];

  const advancedTechniques = [
    {
      title: "Comment-Based Documentation",
      description: "Generate documentation from comments",
      example: `<!-- 
  @component: user-profile-card
  @description: Displays user profile information
  @props:
    - name: string (required)
    - avatar: url
    - role: string
  @example:
    <user-profile-card 
      name="John Doe"
      avatar="/images/john.jpg"
      role="Developer"
    />
-->`,
      useCase: "For documentation generators or design systems",
    },
    {
      title: "Build Process Directives",
      description: "Comments processed by build tools",
      example: `<!-- build:include header.html -->
<!-- /build -->

<!-- build:js bundle.min.js -->
<script src="jquery.js"></script>
<script src="app.js"></script>
<!-- /build -->`,
      useCase: "Used by tools like HTML processors or module bundlers",
    },
    {
      title: "Conditional Comments (Deprecated)",
      description: "Internet Explorer-specific comments",
      example: `<!--[if IE 8]>
  <p>You're using IE8 - consider upgrading</p>
<![endif]-->`,
      note: "Deprecated feature - included for historical context",
    },
  ];

  const bestPractices = [
    {
      title: "Clarity Over Quantity",
      description: "Make comments meaningful and concise",
      goodExample: `<!-- Main navigation - appears on all pages -->`,
      badExample: `<!-- Navigation -->`,
      explanation: "Good comments explain purpose, not just label",
    },
    {
      title: "Avoid Redundant Comments",
      description: "Don't state the obvious",
      goodExample: `<!-- 
  Complex calculation explained:
  1. Get user's timezone offset
  2. Adjust for daylight savings
  3. Convert to UTC
-->`,
      badExample: `<!-- This is a div --><div></div>`,
      explanation: "Comments should add value beyond what's visible",
    },
    {
      title: "Keep Comments Updated",
      description: "Outdated comments can mislead",
      goodExample: `<!-- Updated 2023-06-15: New API endpoint -->`,
      badExample: `<!-- TODO: Update this (from 2019) -->`,
      explanation: "Regularly review and update or remove stale comments",
    },
    {
      title: "Security Considerations",
      description: "Avoid sensitive information in comments",
      goodExample: `<!-- Uses secure API endpoint -->`,
      badExample: `<!-- API key: 12345-abcde (will expire 2024) -->`,
      explanation: "Comments are visible in page source to anyone",
    },
  ];

  const practicalExamples = [
    {
      title: "Documenting a Component",
      code: `<!-- 
  COMPONENT: product-card
  DESCRIPTION: Displays a product with image, title, price
  PROPS:
    - id: number (required)
    - title: string (required)
    - price: number (required)
    - image: string (optional)
    - onSale: boolean (default: false)
  EXAMPLE:
    <product-card 
      id="123" 
      title="Wireless Headphones" 
      price="99.99"
      image="/products/headphones.jpg"
      onSale="true"
    />
-->
<div class="product-card" data-id="123">
  <img src="/products/headphones.jpg" alt="Wireless Headphones">
  <h3>Wireless Headphones</h3>
  <p class="price">$99.99</p>
  <span class="sale-badge">Sale</span>
</div>`,
    },
    {
      title: "Development Workflow",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- TODO: Update meta description -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  
  <!-- FIXME: Replace with CDN link in production -->
  <link rel="stylesheet" href="styles/local.css">
</head>
<body>
  <!-- 
    SECTION: Main navigation
    Last updated: 2023-06-10 by Developer Name
    Notes: Mobile menu needs accessibility review
  -->
  <nav class="main-nav">...</nav>
  
  <!-- TEMPORARY: Disabling hero section for A/B test -->
  <!--
  <section class="hero">...</section>
  -->
  
  <!-- 
    SECTION: Product grid
    TODO: Implement lazy loading
    FIXME: Images not optimized for mobile
  -->
  <section class="products">...</section>
</body>
</html>`,
    },
    {
      title: "Build Process Integration",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- build:css css/styles.min.css -->
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <!-- /build -->
  
  <!-- build:js js/app.min.js -->
  <script src="js/jquery.js"></script>
  <script src="js/app.js"></script>
  <!-- /build -->
</head>
<body>
  <!-- build:include header.html -->
  <!-- /build -->
  
  <main>
    <!-- build:process echo "Hello, <%= name %>" -->
    <p>Dynamic content will appear here</p>
    <!-- /build -->
  </main>
  
  <!-- build:include footer.html -->
  <!-- /build -->
</body>
</html>`,
    },
  ];

  return (
    <div className="">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Comments Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to effectively use comments in your HTML documents
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaComment className="text-blue-500" />
          Why Use HTML Comments?
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            HTML comments are an essential tool for developers to document code,
            leave notes, and temporarily disable sections without deletion.
            While invisible to end users viewing the rendered page, comments
            remain in the source code where they serve several important
            purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Code Documentation:</strong> Explain complex sections or
              document the purpose of elements
            </li>
            <li>
              <strong>Team Communication:</strong> Leave notes for other
              developers working on the same codebase
            </li>
            <li>
              <strong>Development Markers:</strong> Use TODO, FIXME, or other
              tags to track work items
            </li>
            <li>
              <strong>Debugging:</strong> Temporarily disable code blocks to
              isolate issues
            </li>
            <li>
              <strong>Build Directives:</strong> Some tools process special
              comment formats during builds
            </li>
          </ul>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Note: While comments are extremely useful during development,
            excessive or outdated comments can clutter your code. Aim for a
            balance between helpful documentation and clean, maintainable
            markup.
          </p>
        </div>
      </section>

      {/* Comment Basics */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("basics")}
          aria-expanded={expandedSections["basics"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Comment Syntax Basics
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["basics"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["basics"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commentBasics.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {item.description}
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm mb-3">
                  <code>{item.example}</code>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  <strong>Usage:</strong> {item.usage}
                </p>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        localStorage.setItem("html-code", item.example);
                        router.push("/compilers/html-editor");
                      } catch (error) {
                        console.error("Error saving to localStorage:", error);
                        alert("Could not open editor. Please try again.");
                      }
                    }}
                    className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    <FaPlay size={10} className="inline mr-1" /> Try
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(item.example, item.title);
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied === item.title ? (
                      <FaCheck
                        size={10}
                        className="inline mr-1 text-green-500"
                      />
                    ) : (
                      <FaCopy size={10} className="inline mr-1" />
                    )}
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Practical Uses */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("usage")}
          aria-expanded={expandedSections["usage"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-purple-500" />
            Practical Uses of Comments
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["usage"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["usage"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalUses.map((item, index) => (
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
                  <CodeEditor
                    value={item.example}
                    language="html"
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
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <strong>Benefits:</strong> {item.benefits}
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem("html-code", item.example);
                          router.push("/compilers/html-editor");
                        } catch (error) {
                          console.error("Error saving to localStorage:", error);
                          alert("Could not open editor. Please try again.");
                        }
                      }}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      <FaPlay size={10} className="inline mr-1" /> Try
                    </button>
                    <button
                      onClick={() => copyToClipboard(item.example, item.title)}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === item.title ? "Copied!" : "Copy"}
                    </button>
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
            <FaCode className="text-orange-500" />
            Advanced Comment Techniques
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
                  <CodeEditor
                    value={item.example}
                    language="html"
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
                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    <strong>Use Case:</strong> {item.useCase}
                    {item.note && (
                      <div className="text-orange-600 dark:text-orange-400 mt-1">
                        <strong>Note:</strong> {item.note}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem("html-code", item.example);
                          router.push("/compilers/html-editor");
                        } catch (error) {
                          console.error("Error saving to localStorage:", error);
                          alert("Could not open editor. Please try again.");
                        }
                      }}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      <FaPlay size={10} className="inline mr-1" /> Try
                    </button>
                    <button
                      onClick={() => copyToClipboard(item.example, item.title)}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === item.title ? "Copied!" : "Copy"}
                    </button>
                  </div>
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
            <FaInfoCircle className="text-green-500" />
            Commenting Best Practices
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{practice.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {practice.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          try {
                            localStorage.setItem(
                              "html-code",
                              practice.goodExample
                            );
                            router.push("/compilers/html-editor");
                          } catch (error) {
                            console.error(
                              "Error saving to localStorage:",
                              error
                            );
                            alert("Could not open editor. Please try again.");
                          }
                        }}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <FaPlay size={10} /> Try
                      </button>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            practice.goodExample,
                            `${practice.title}-good`
                          )
                        }
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {copied === `${practice.title}-good` ? (
                          <FaCheck size={10} className="text-green-500" />
                        ) : (
                          <FaCopy size={10} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-4 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <h4 className="font-medium text-sm">Recommended</h4>
                    </div>
                    <CodeEditor
                      value={practice.goodExample}
                      language="html"
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

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <h4 className="font-medium text-sm">Not Recommended</h4>
                    </div>
                    <CodeEditor
                      value={practice.badExample}
                      language="html"
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
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Explanation:</strong> {practice.explanation}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Practical Examples */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("examples")}
          aria-expanded={expandedSections["examples"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Comprehensive Examples
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["examples"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["examples"] && (
          <div className="space-y-4">
            {practicalExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium">{example.title}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem("html-code", example.code);
                          router.push("/compilers/html-editor");
                        } catch (error) {
                          console.error("Error saving to localStorage:", error);
                          alert("Could not open editor. Please try again.");
                        }
                      }}
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(example.code, example.title)
                      }
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck size={12} className="text-green-500" />
                      ) : (
                        <FaCopy size={12} />
                      )}
                      {copied === example.title ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <CodeEditor
                  value={example.code}
                  language="html"
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
                Comments Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with HTML comments in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Comment Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different commenting scenarios
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Live Preview
              </span>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Comment Types Included
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Basic
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Single/multi-line
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Development
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      TODO/FIXME
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Sectioning
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Document structure
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Conditional
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Historical reference
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleOpenEditor}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <FaPlay className="mr-2" />
                  Open in Live Editor
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All examples will be loaded into an interactive editor where you
              can modify and test them
            </p>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/text-formatting"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/links"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
