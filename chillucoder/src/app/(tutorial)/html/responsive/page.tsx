"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaMobile,
  FaTablet,
  FaDesktop,
  FaExpand,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function ResponsiveDesignPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    fundamentals: true,
    viewport: true,
    mediaqueries: true,
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

  const responsiveExamples = [
    {
      title: "Responsive Layout with Flexbox",
      description: "Flexbox-based responsive layout that adapts to screen size",
      code: `<div class="container">
  <header class="header">Header</header>
  <main class="main-content">
    <article class="article">Main Content</article>
    <aside class="sidebar">Sidebar</aside>
  </main>
  <footer class="footer">Footer</footer>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .header, .footer {
    padding: 1rem;
    background: #333;
    color: white;
  }
  
  .main-content {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  
  .article {
    flex: 3;
    padding: 1rem;
    background: #f5f5f5;
  }
  
  .sidebar {
    flex: 1;
    padding: 1rem;
    background: #ddd;
  }
  
  @media (min-width: 768px) {
    .main-content {
      flex-direction: row;
    }
  }
</style>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <div className="flex flex-col min-h-[300px]">
            <div className="p-2 bg-gray-800 text-white text-center">Header</div>
            <div className="flex flex-col flex-1 md:flex-row">
              <div className="flex-3 p-4 bg-gray-100">Main Content</div>
              <div className="flex-1 p-4 bg-gray-200">Sidebar</div>
            </div>
            <div className="p-2 bg-gray-800 text-white text-center">Footer</div>
          </div>
        </div>
      ),
    },
    {
      title: "Responsive Grid Layout",
      description: "CSS Grid layout that reflows based on screen width",
      code: `<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>

<style>
  .grid-container {
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }
  
  .grid-item {
    background: #4ade80;
    padding: 1rem;
    text-align: center;
    border-radius: 0.5rem;
  }
  
  /* Mobile first */
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  /* Tablet */
  @media (min-width: 640px) {
    .grid-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <div className="grid gap-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-green-400 p-4 rounded text-center"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Responsive Images",
      description: "Techniques for responsive images with optimal performance",
      code: `<!-- Simple responsive image -->
<img 
  src="image-small.jpg" 
  srcset="image-small.jpg 480w, image-medium.jpg 768w, image-large.jpg 1200w" 
  sizes="(max-width: 600px) 480px, (max-width: 1024px) 768px, 1200px" 
  alt="Responsive image example"
  class="responsive-img">

<!-- Art direction with picture element -->
<picture>
  <source media="(max-width: 639px)" srcset="mobile-view.jpg">
  <source media="(min-width: 640px)" srcset="desktop-view.jpg">
  <img src="fallback.jpg" alt="Art directed image">
</picture>

<!-- Density-aware responsive image -->
<img
  src="image-1x.jpg"
  srcset="image-1x.jpg 1x, image-2x.jpg 2x"
  alt="Density-aware image">`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded">
              <p className="text-sm text-gray-700">Basic Responsive Image</p>
              <div className="bg-gray-300 h-20 w-full"></div>
            </div>
            <div className="bg-blue-100 p-4 rounded">
              <p className="text-sm text-gray-700">Art-Directed Image</p>
              <div className="bg-gray-300 h-20 w-full"></div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>Responsive Web Design | Complete Guide with Examples</title>
        <meta
          name="description"
          content="Learn responsive web design techniques including media queries, flexible grids, and responsive images. Master mobile-first development."
        />
        <meta
          name="keywords"
          content="responsive design, media queries, mobile first, viewport, flexbox, CSS grid, responsive images"
        />
        <meta name="author" content="Your Name" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          Responsive Web Design
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Create websites that work beautifully on any device
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Introduction to Responsive Design
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Responsive web design (RWD) is an approach to web development that
          makes web pages render well on a variety of devices and window sizes.
          It combines flexible grids, responsive images, and CSS media queries
          to create a seamless user experience across devices.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaMobile className="text-blue-500" />
            <span>Phones</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTablet className="text-blue-500" />
            <span>Tablets</span>
          </div>
          <div className="flex items-center gap-2">
            <FaDesktop className="text-blue-500" />
            <span>Desktops</span>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Responsive Design Example</h1>
    <p>Resize your browser to see the effect</p>
  </div>
</body>
</html>`)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Fundamentals */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Core Principles
          </h2>
          <button
            onClick={() => toggleSection("fundamentals")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.fundamentals ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.fundamentals && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Fluid Grids
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Fluid grids use relative units like percentages rather than
                    fixed units like pixels for layout elements. This allows
                    elements to resize in relation to one another and to the
                    screen size.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleOpenEditor(`<div class="container">
  <div class="box">Fluid Box</div>
</div>

<style>
  .container {
    width: 90%;
    margin: 0 auto;
  }
  
  .box {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 2%;
    background: #3b82f6;
    color: white;
  }
</style>`)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `.container {
  width: 90%;
  margin: 0 auto;
}

.box {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2%;
}`,
                          "Fluid Grid Example"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === "Fluid Grid Example" ? (
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
                      {`/* Bad - Fixed width */
.container {
  width: 960px;
}

/* Good - Fluid width */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Fluid columns example */
.column {
  float: left;
  width: 31.333%; /* ~1/3 of container */
  margin: 1%;
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Flexible Images
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Images should be able to scale down to fit smaller
                    containers without breaking the layout. Modern CSS
                    techniques like
                    <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      object-fit
                    </code>{" "}
                    and the
                    <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      picture
                    </code>{" "}
                    element help create truly responsive images.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      Use{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        max-width: 100%
                      </code>{" "}
                      on images
                    </li>
                    <li>
                      Implement{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        srcset
                      </code>{" "}
                      for resolution switching
                    </li>
                    <li>
                      Use{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        picture
                      </code>{" "}
                      for art direction
                    </li>
                    <li>Consider modern formats like WebP</li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Basic responsive image -->
<img src="image.jpg" alt="Example" style="max-width: 100%; height: auto;">

<!-- Using srcset -->
<img 
  srcset="small.jpg 480w, medium.jpg 960w, large.jpg 1920w"
  sizes="(max-width: 600px) 480px, (max-width: 1200px) 960px, 1920px"
  src="fallback.jpg"
  alt="Responsive image">

<!-- Art direction with picture -->
<picture>
  <source media="(max-width: 799px)" srcset="portrait.jpg">
  <source media="(min-width: 800px)" srcset="landscape.jpg">
  <img src="fallback.jpg" alt="Art directed image">
</picture>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Mobile-First Approach
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Mobile-first design means starting with styles for small
                    screens and then using media queries to add styles for
                    larger screens. This approach results in better performance
                    and cleaner code.
                  </p>
                  <div className="bg-green-50 dark:bg-gray-700 border-l-4 border-green-500 p-4">
                    <p className="text-green-700 dark:text-green-400">
                      <strong>Tip:</strong> Start with core mobile styles
                      outside of media queries, then enhance for larger screens.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-css">
                      {`/* Base styles (mobile) */
.container {
  padding: 10px;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
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

      {/* Viewport Meta Tag */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaMobile className="text-blue-500" />
            Viewport Configuration
          </h2>
          <button
            onClick={() => toggleSection("viewport")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.viewport ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.viewport && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Essential Viewport Meta Tag
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The viewport meta tag controls how a page is displayed on
                    mobile devices. Without it, mobile browsers will render the
                    page at a desktop screen width and then scale it down.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleOpenEditor(
                          `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
                          "Viewport Meta Tag"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === "Viewport Meta Tag" ? (
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
                    <code className="language-html">
                      {`<!-- Standard viewport tag -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Additional options -->
<meta name="viewport" 
  content="width=device-width, 
           initial-scale=1.0,
           maximum-scale=1.0,
           user-scalable=no">`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Viewport Best Practices
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      Always include the viewport meta tag in the{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        &lt;head&gt;
                      </code>
                    </li>
                    <li>
                      Use{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        width=device-width
                      </code>{" "}
                      to match the screen&apos;s width
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        initial-scale=1.0
                      </code>{" "}
                      sets the initial zoom level
                    </li>
                    <li>
                      Avoid disabling user scaling unless absolutely necessary
                    </li>
                    <li>Test on actual devices when possible</li>
                  </ul>
                </div>
                <div>
                  <div className="bg-red-50 dark:bg-gray-700 border-l-4 border-red-500 p-4">
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">
                      Avoid These Anti-Patterns
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-red-700 dark:text-red-400">
                      <li>
                        Fixed width viewports (
                        <code className="bg-red-100 dark:bg-gray-800 p-0.5 rounded">
                          width=960
                        </code>
                        )
                      </li>
                      <li>Disabling zoom without good reason</li>
                      <li>Setting minimum/maximum scale to 1.0</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Media Queries */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaExpand className="text-blue-500" />
            Media Queries
          </h2>
          <button
            onClick={() => toggleSection("mediaqueries")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.mediaqueries ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.mediaqueries && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Media Query Syntax
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Media queries allow you to apply CSS styles depending on
                    device characteristics like width, height, orientation, and
                    resolution.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleOpenEditor(`@media (min-width: 768px) {
  .container {
    background: lightblue;
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
                          `@media (min-width: 768px) {
  /* Styles for screens wider than 768px */
}`,
                          "Media Query Example"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === "Media Query Example" ? (
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
                      {`/* Common breakpoints (adjust as needed) */
/* Small devices (landscape phones) */
@media (min-width: 576px) { ... }

/* Medium devices (tablets) */
@media (min-width: 768px) { ... }

/* Large devices (desktops) */
@media (min-width: 992px) { ... }

/* Extra large devices (large desktops) */
@media (min-width: 1200px) { ... }

/* Orientation example */
@media (orientation: landscape) { ... }

/* High-resolution displays */
@media (-webkit-min-device-pixel-ratio: 2), 
       (min-resolution: 192dpi) { ... }`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Breakpoint Strategies
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    While common breakpoints exist (768px, 992px, etc.), the
                    best approach is to let your content determine breakpoints.
                    Add breakpoints when the design starts to look bad, not
                    based on specific device sizes.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Start with mobile styles (no media query)</li>
                    <li>Add breakpoints as needed by your content</li>
                    <li>
                      Use{" "}
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                        em
                      </code>{" "}
                      units for more consistent results
                    </li>
                    <li>Test on real devices when possible</li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-css">
                      {`/* Content-based breakpoints example */
/* Default (mobile) styles */
.card {
  width: 100%;
}

/* When cards can fit side by side */
@media (min-width: 35em) {  /* ~560px */
  .card {
    width: calc(50% - 1rem);
    float: left;
    margin-right: 1rem;
  }
}

/* When three cards fit */
@media (min-width: 55em) {  /* ~880px */
  .card {
    width: calc(33.333% - 1rem);
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
            <FaCode className="text-blue-500" />
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
            {responsiveExamples.map((example, index) => (
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
                    language="html"
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
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Responsive Design Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Start with a mobile-first approach</li>
              <li>Use relative units (em, rem, %) for sizing</li>
              <li>Test on real devices when possible</li>
              <li>Use semantic HTML for better accessibility</li>
              <li>Optimize images for different screen sizes</li>
              <li>Consider touch targets (minimum 48×48px)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t hide content arbitrarily on mobile</li>
              <li>Avoid fixed widths that might cause overflow</li>
              <li>Don&apos;t rely solely on device-width breakpoints</li>
              <li>Avoid heavy assets on mobile connections</li>
              <li>Don&apos;t disable zoom without good reason</li>
              <li>Avoid complex hover states on touch devices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our Responsive Design Editor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Experiment with responsive design techniques in our interactive
              editor with device previews:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test media queries with live preview</li>
              <li>Try flexbox and grid layouts</li>
              <li>Experiment with responsive images</li>
              <li>View your design at different breakpoints</li>
            </ul>
            <button
              onClick={() => {
                const responsiveExample = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Playground</title>
  <style>
    /* Mobile-first styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    
    .container {
      width: 100%;
      padding: 1rem;
      background: #f8fafc;
    }
    
    .header {
      background: #3b82f6;
      color: white;
      padding: 1rem;
      text-align: center;
    }
    
    .content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
    
    .box {
      background: white;
      border-radius: 0.5rem;
      padding: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    /* Tablet styles */
    @media (min-width: 768px) {
      .container {
        max-width: 720px;
        margin: 0 auto;
      }
      
      .content {
        flex-direction: row;
        flex-wrap: wrap;
      }
      
      .box {
        flex: 1 1 calc(50% - 0.5rem);
      }
    }
    
    /* Desktop styles */
    @media (min-width: 992px) {
      .container {
        max-width: 960px;
      }
      
      .box {
        flex: 1 1 calc(33.333% - 0.666rem);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Responsive Design Playground</h1>
      <p>Resize your browser to see the responsive layout in action</p>
    </div>
    <div class="content">
      <div class="box">Box 1</div>
      <div class="box">Box 2</div>
      <div class="box">Box 3</div>
    </div>
  </div>
</body>
</html>`;
                localStorage.setItem("html-code", responsiveExample);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch Responsive Editor
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm overflow-x-auto">
                <code className="language-html">
                  {`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Playground</title>
  <style>
    /* Mobile-first styles */
    .container {
      width: 100%;
      padding: 1rem;
    }
    
    /* Tablet styles */
    @media (min-width: 768px) {
      .container {
        max-width: 720px;
        margin: 0 auto;
      }
    }
    
    /* Desktop styles */
    @media (min-width: 992px) {
      .container {
        max-width: 960px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Responsive Design Playground</h1>
    <p>Resize your browser to see the effect</p>
  </div>
</body>
</html>`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t mt-5">
        <Link
          href="/html/meta"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (Meta)
        </Link>
        <Link
          href="/html/media-queries"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (Media Queries) &gt;
        </Link>
      </section>
    </div>
  );
}
