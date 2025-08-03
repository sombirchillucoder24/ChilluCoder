"use client";

import { FaInfoCircle, FaCode, FaCopy, FaCheck, FaChevronDown, FaPlay, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLHeadingsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basics: true,
    hierarchy: true,
    accessibility: true,
    examples: true,
    bestPractices: true
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Headings Examples</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
    .example { margin-bottom: 30px; border-left: 4px solid #3b82f6; padding-left: 15px; }
    .heading-demo { margin: 15px 0; }
    .bad-example { border-left: 4px solid #ef4444; }
    .section { background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; }
    h1 { color: #1e40af; }
    h2 { color: #1e3a8a; }
    h3 { color: #1e3a8a; }
    h4 { color: #1e3a8a; }
    h5 { color: #1e3a8a; }
    h6 { color: #1e3a8a; }
    .btn { display: inline-block; padding: 8px 16px; background: #3b82f6; color: white; border-radius: 4px; text-decoration: none; }
    .btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <h1>HTML Headings Guide</h1>
  
  <div class="example">
    <h2>Basic Heading Structure</h2>
    <div class="heading-demo">
      <h1>Main Title (h1)</h1>
      <h2>Chapter Title (h2)</h2>
      <h3>Section Title (h3)</h3>
      <h4>Subsection Title (h4)</h4>
      <h5>Minor Heading (h5)</h5>
      <h6>Small Heading (h6)</h6>
    </div>
  </div>

  <div class="example">
    <h2>Semantic Document Outline</h2>
    <div class="section">
      <h1>Website Accessibility Guide</h1>
      <div class="section">
        <h2>Introduction</h2>
        <p>Why accessibility matters...</p>
      </div>
      <div class="section">
        <h2>Key Principles</h2>
        <div class="section">
          <h3>Perceivable</h3>
          <p>Content must be perceivable...</p>
        </div>
        <div class="section">
          <h3>Operable</h3>
          <p>Interface must be operable...</p>
        </div>
      </div>
    </div>
  </div>

  <div class="example bad-example">
    <h2>Bad Practice Example</h2>
    <div class="heading-demo">
      <h3>Main Title (should be h1)</h3>
      <h6>Section Title (should be h2)</h6>
      <h4>Subsection (inconsistent)</h4>
      <h2>Another Section (wrong order)</h2>
    </div>
    <p>This demonstrates poor heading hierarchy that can confuse users and hurt accessibility.</p>
  </div>

  <div class="example">
    <h2>Headings with ARIA</h2>
    <div role="heading" aria-level="1">Main Title (ARIA equivalent)</div>
    <div role="heading" aria-level="2">Section Title</div>
    <p>Note: Use native HTML headings (&lt;h1&gt;-&lt;h6&gt;) whenever possible.</p>
  </div>
</body>
</html>`;

    try {
      localStorage.setItem('html-code', staticHtmlContent);
      router.push('/compilers/html-editor');
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const headingLevels = [
    {
      level: "h1",
      description: "Main page heading, should be used once per page as the primary title",
      example: `<h1>Welcome to Our Website</h1>`,
      usage: "Highest level, typically for page titles"
    },
    {
      level: "h2",
      description: "Major section headings that fall under the main title",
      example: `<h2>Our Services</h2>`,
      usage: "Second level, for main content sections"
    },
    {
      level: "h3",
      description: "Sub-sections that belong to an h2 section",
      example: `<h3>Web Development</h3>`,
      usage: "Third level, for sub-sections"
    },
    {
      level: "h4",
      description: "Further divisions under h3 sections",
      example: `<h4>Frontend Technologies</h4>`,
      usage: "Fourth level, for detailed sub-sections"
    },
    {
      level: "h5",
      description: "Minor headings for less important divisions",
      example: `<h5>React Framework</h5>`,
      usage: "Fifth level, rarely needed"
    },
    {
      level: "h6",
      description: "Lowest-level headings for fine-grained organization",
      example: `<h6>Component Lifecycle</h6>`,
      usage: "Sixth level, very rarely used"
    }
  ];

  const bestPractices = [
    {
      title: "Logical Hierarchy",
      description: "Maintain a consistent, logical structure without skipping levels (e.g., don't go from h2 to h4).",
      example: `<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h2>Another Section</h2>`,
      badExample: `<h1>Main Title</h1>
<h3>Section (skipped h2)</h3>
<h5>Subsection (skipped h4)</h5>`
    },
    {
      title: "Single h1 per Page",
      description: "Each page should have only one h1 element representing the main content focus.",
      example: `<h1>Product Documentation</h1>`,
      badExample: `<h1>Product Docs</h1>
<h1>Table of Contents</h1>`
    },
    {
      title: "Semantic Meaning",
      description: "Use headings to structure content, not just for visual styling.",
      example: `<h2>Features</h2>
<p>Our product includes...</p>`,
      badExample: `<div style="font-size: 2em; font-weight: bold">Features</div>
<p>Our product includes...</p>`
    },
    {
      title: "Accessibility",
      description: "Screen readers rely on proper heading structure for navigation.",
      example: `<h1>Page Title</h1>
<h2>Main Content</h2>
<h3>Details</h3>`,
      badExample: `<div style="font-size: 2em">Page Title</div>
<div style="font-size: 1.5em">Main Content</div>`
    }
  ];

  const advancedExamples = [
    {
      title: "Article Structure",
      code: `<article>
  <h1>The Future of Web Development</h1>
  <h2>Introduction</h2>
  <p>Web development is evolving rapidly...</p>
  
  <h2>Current Trends</h2>
  <h3>JavaScript Frameworks</h3>
  <p>React, Vue and Angular continue...</p>
  <h3>Web Components</h3>
  <p>The native component model...</p>
  
  <h2>Conclusion</h2>
  <p>The future looks promising...</p>
</article>`
    },
    {
      title: "Multi-column Layout",
      code: `<div class="container">
  <h1>Company Blog</h1>
  
  <div class="row">
    <div class="column">
      <h2>Technology</h2>
      <h3>Latest Updates</h3>
      <h3>How-To Guides</h3>
    </div>
    
    <div class="column">
      <h2>Business</h2>
      <h3>Industry News</h3>
      <h3>Case Studies</h3>
    </div>
  </div>
</div>`
    },
    {
      title: "Accessibility with ARIA",
      code: `<!-- Only use when HTML headings aren't possible -->
<div role="heading" aria-level="1">Main Title</div>
<div role="heading" aria-level="2">Section Title</div>

<!-- Better to use native HTML -->
<h1>Main Title</h1>
<h2>Section Title</h2>`
    }
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Headings Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Proper use of heading elements (h1-h6) for document structure and accessibility
        </p>
      </header>

      {/* Heading Levels */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('basics')}
          aria-expanded={expandedSections['basics']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Heading Levels (h1-h6)
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['basics'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['basics'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {headingLevels.map((heading, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-lg mb-1">
                      <span className="text-purple-600 dark:text-purple-400">{heading.level}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{heading.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Usage: {heading.usage}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(heading.example, heading.level);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Copy example for ${heading.level}`}
                  >
                    {copied === heading.level ? (
                      <FaCheck className="text-green-500 text-sm" />
                    ) : (
                      <FaCopy className="text-sm" />
                    )}
                  </button>
                </div>
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>{heading.example}</code>
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
          onClick={() => toggleSection('bestPractices')}
          aria-expanded={expandedSections['bestPractices']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-green-500" />
            Heading Best Practices
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['bestPractices'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['bestPractices'] && (
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{practice.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{practice.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-4 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Good Example</span>
                      <button
                        onClick={() => copyToClipboard(practice.example, `${practice.title}-good`)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {copied === `${practice.title}-good` ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                    </div>
                    <CodeEditor
                      value={practice.example}
                      language="html"
                      padding={8}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#f8fafc",
                        fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }}
                      className="dark:bg-gray-900 dark:text-gray-200"
                      readOnly
                    />
                  </div>
                  <div className="p-4 bg-red-50/50 dark:bg-red-900/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">Bad Example</span>
                      <button
                        onClick={() => copyToClipboard(practice.badExample, `${practice.title}-bad`)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {copied === `${practice.title}-bad` ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                    </div>
                    <CodeEditor
                      value={practice.badExample}
                      language="html"
                      padding={8}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#fef2f2",
                        fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }}
                      className="dark:bg-gray-900 dark:text-gray-200"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Advanced Examples */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('examples')}
          aria-expanded={expandedSections['examples']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Advanced Examples
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['examples'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['examples'] && (
          <div className="space-y-4">
            {advancedExamples.map((example, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium">{example.title}</h3>
                  <button
                    onClick={() => copyToClipboard(example.code, example.title)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copied === example.title ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy
                      </>
                    )}
                  </button>
                </div>
                <CodeEditor
                  value={example.code}
                  language="html"
                  padding={12}
                  style={{
                    fontSize: 13,
                    backgroundColor: "#f8fafc",
                    fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
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
                Headings Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with heading structures in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Heading Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering proper heading hierarchy
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
                  Proper Heading Structure
                </h4>
                <div className="space-y-2 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                  <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">h1. Main Title</h1>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300 ml-4">h2. Section</h2>
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-400 ml-8">h3. Subsection</h3>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300 ml-4">h2. Another Section</h2>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Bad Practices
                </h4>
                <div className="space-y-2 pl-4 border-l-2 border-red-200 dark:border-red-800">
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-300">h3. Main Title (should be h1)</h3>
                  <h6 className="text-base font-bold text-gray-700 dark:text-gray-400 ml-4">h6. Section (should be h2)</h6>
                  <h4 className="text-lg font-bold text-gray-700 dark:text-gray-400 ml-8">h4. Subsection (inconsistent)</h4>
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
              All examples will be loaded into an interactive editor where you can modify and test them
            </p>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
    <section className="mt-8">
  <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {/* Previous Page Link */}
    <Link
      href="/html/attributes"
      className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
    >
      <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
        <FaArrowLeft className="text-blue-500" />
        HTML Attributes
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Learn about HTML element attributes.
      </p>
    </Link>

    {/* Next Page Link */}
    <Link
      href="/html/paragraphs"
      className="border border-green-200 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
    >
      <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
        HTML Paragraphs
        <FaArrowRight className="text-green-500" />
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Understand semantic HTML structure.
      </p>
    </Link>
  </div>
</section>

    </div>
  );
}