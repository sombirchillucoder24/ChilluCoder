"use client";

import { FaCode, FaLayerGroup, FaMobileAlt, FaSearch, FaAccessibleIcon } from "react-icons/fa";
import Link from "next/link";

export default function HTMLStructurePage() {
  const structureElements = [
    {
      tag: "<header>",
      description: "Introductory content or navigation",
      purpose: "Contains site headers, logos, and primary navigation",
      example: `<header>
  <h1>Site Title</h1>
  <nav>...</nav>
</header>`,
      benefits: ["Improves accessibility", "Helps with SEO"]
    },
    {
      tag: "<nav>",
      description: "Navigation links",
      purpose: "Should wrap major navigation blocks",
      example: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,
      benefits: ["Screen reader friendly", "Clear semantic meaning"]
    },
    {
      tag: "<main>",
      description: "Primary content",
      purpose: "Contains the dominant content of the document",
      example: `<main>
  <article>...</article>
  <section>...</section>
</main>`,
      benefits: ["Only one per page", "Helps with keyboard navigation"]
    },
    {
      tag: "<article>",
      description: "Self-contained composition",
      purpose: "Content that makes sense on its own",
      example: `<article>
  <h2>Blog Post Title</h2>
  <p>Content...</p>
</article>`,
      benefits: ["Syndication ready", "Improves SEO"]
    },
    {
      tag: "<section>",
      description: "Thematic grouping",
      purpose: "Groups related content together",
      example: `<section>
  <h2>Chapter Title</h2>
  <p>Content...</p>
</section>`,
      benefits: ["Better document outline", "Improved readability"]
    },
    {
      tag: "<aside>",
      description: "Side content",
      purpose: "Content indirectly related to main content",
      example: `<aside>
  <h3>Related Links</h3>
  <ul>...</ul>
</aside>`,
      benefits: ["Clear content separation", "Better mobile layouts"]
    },
    {
      tag: "<footer>",
      description: "Closing content",
      purpose: "Contains footer information",
      example: `<footer>
  <p>Copyright © 2023</p>
</footer>`,
      benefits: ["Expected location", "Accessibility benefits"]
    }
  ];

  const semanticBenefits = [
    {
      icon: <FaAccessibleIcon className="text-blue-500" />,
      title: "Accessibility",
      description: "Screen readers use semantic tags to navigate content"
    },
    {
      icon: <FaSearch className="text-purple-500" />,
      title: "SEO Benefits",
      description: "Search engines prioritize well-structured content"
    },
    {
      icon: <FaMobileAlt className="text-green-500" />,
      title: "Responsive Design",
      description: "Easier to create mobile-friendly layouts"
    },
    {
      icon: <FaLayerGroup className="text-yellow-500" />,
      title: "Maintainability",
      description: "Clear structure makes code easier to update"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 mb-4">
          HTML Document Structure
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how to properly structure your HTML documents using semantic elements for better accessibility, SEO, and maintainability.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto mt-6 rounded-full" />
      </header>

      {/* Why Structure Matters */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
          <FaCode className="text-blue-500 mr-3" />
          The Importance of Semantic Structure
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Semantic HTML provides meaning to your content rather than just presentation. It helps:
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {semanticBenefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl mb-2">{benefit.icon}</div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-200 dark:bg-gray-600 px-4 py-2 text-sm font-mono">
                Semantic Structure Example
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="language-html">
{`<!DOCTYPE html>
<html>
<head>
  <title>Document Title</title>
</head>
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <article>...</article>
    <section>...</section>
  </main>
  <aside>...</aside>
  <footer>...</footer>
</body>
</html>`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Semantic Elements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Semantic HTML Elements
        </h2>
        
        <div className="space-y-6">
          {structureElements.map((element, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3">
                <h3 className="font-mono text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {element.tag}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{element.description}</p>
              </div>
              
              <div className="p-4 grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Purpose:</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{element.purpose}</p>
                  
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Benefits:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    {element.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Example:</div>
                  <pre className="overflow-x-auto text-sm">
                    <code className="language-html">
                      {element.example}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Common Patterns */}
      <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Common Structural Patterns
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Blog Layout */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Blog Layout</h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="language-html">
{`<body>
  <header>
    <h1>Blog Title</h1>
    <nav>...</nav>
  </header>
  
  <main>
    <article>
      <h2>Post Title</h2>
      <p>Content...</p>
    </article>
    
    <aside>
      <h3>About Author</h3>
      <p>Bio...</p>
    </aside>
  </main>
  
  <footer>...</footer>
</body>`}
                </code>
              </pre>
            </div>
          </div>
          
          {/* E-commerce Layout */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">E-commerce Layout</h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="language-html">
{`<body>
  <header>
    <nav>Main Navigation</nav>
  </header>
  
  <main>
    <aside class="sidebar">
      <nav>Filters</nav>
    </aside>
    
    <section class="products">
      <article class="product">...</article>
      <article class="product">...</article>
    </section>
  </main>
  
  <footer>...</footer>
</body>`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Practice Semantic Structure
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Try building properly structured documents in our interactive editor.
          </p>
          <Link 
            href="/compilers/html-editor" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition"
          >
            Open HTML Editor
            <FaCode className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Next Steps */}
      <section className="flex flex-col sm:flex-row justify-between gap-4">
        <Link 
          href="/html/basics" 
          className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex items-center">
            <div className="mr-4 text-gray-400">
              <FaCode className="rotate-180" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Previous</p>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">HTML Basics</h3>
            </div>
          </div>
        </Link>
        
        <Link 
          href="/html/elements" 
          className="flex-1 bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
        >
          <div className="flex items-center text-right justify-end">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Next</p>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">HTML Elements</h3>
            </div>
            <div className="ml-4 text-gray-400">
              <FaCode />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}