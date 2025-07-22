"use client";

import { FaLink, FaExternalLinkAlt, FaBookmark, FaCopy, FaCheck, FaChevronDown, FaPlay, FaArrowLeft, FaArrowRight, FaInfoCircle, FaCode } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLLinksPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basics: true,
    attributes: true,
    examples: true,
    bestPractices: true,
    advanced: true
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Links Examples</title>
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
    a {
      color: #2563eb;
      text-decoration: none;
      transition: color 0.2s;
    }
    a:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
    .link-example {
      margin: 15px 0;
      padding: 10px;
      border-left: 3px solid #4a6ee0;
      background-color: #f8fafc;
    }
    .external-link::after {
      content: " ↗";
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 id="top">HTML Links</h1>
    
    <nav>
      <h2>Page Navigation</h2>
      <ul>
        <li><a href="#basic-links">Basic Links</a></li>
        <li><a href="#link-attributes">Link Attributes</a></li>
        <li><a href="#bookmark-links">Bookmark Links</a></li>
        <li><a href="#email-tel-links">Email & Tel Links</a></li>
      </ul>
    </nav>

    <section id="basic-links">
      <h2>Basic Links</h2>
      
      <div class="link-example">
        <p><a href="https://www.example.com">Standard external link</a></p>
        <p><a href="/about.html">Internal relative link</a></p>
        <p><a href="/docs/document.pdf" download>Download link</a></p>
      </div>
    </section>
    
    <section id="link-attributes">
      <h2>Link Attributes</h2>
      
      <div class="link-example">
        <p><a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Opens in new tab</a></p>
        <p><a href="/privacy.html" rel="nofollow">Nofollow link</a></p>
        <p><a href="/premium" aria-label="Premium features (opens in new window)" target="_blank">Accessible link</a></p>
      </div>
    </section>
    
    <section id="bookmark-links">
      <h2>Bookmark Links</h2>
      
      <div class="link-example">
        <p><a href="#top">Back to top</a></p>
        <p><a href="#link-attributes">Jump to Link Attributes</a></p>
      </div>
    </section>
    
    <section id="email-tel-links">
      <h2>Email & Telephone Links</h2>
      
      <div class="link-example">
        <p><a href="mailto:contact@example.com">Email Us</a></p>
        <p><a href="mailto:contact@example.com?subject=Question&body=Hello%20there">Email with subject and body</a></p>
        <p><a href="tel:+15551234567">Call Us: (555) 123-4567</a></p>
      </div>
    </section>
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

  const linkBasics = [
    {
      element: "<a>",
      description: "The anchor element creates hyperlinks",
      example: `<a href="https://www.example.com">Visit Example</a>`,
      attributes: "href (required), target, rel, download",
      usage: "For navigation between pages or resources"
    },
    {
      element: "Absolute URLs",
      description: "Links to external resources with full URL",
      example: `<a href="https://www.example.com/about">About Us</a>`,
      attributes: "",
      usage: "Linking to other websites"
    },
    {
      element: "Relative URLs",
      description: "Links to internal resources with relative paths",
      example: `<a href="/about.html">About Page</a>`,
      attributes: "",
      usage: "Linking within the same website"
    },
    {
      element: "Download Links",
      description: "Triggers file download instead of navigation",
      example: `<a href="/files/document.pdf" download>Download PDF</a>`,
      attributes: "download (optional filename)",
      usage: "For PDFs, documents, or other downloadable files"
    }
  ];

  const linkAttributes = [
    {
      attribute: "target",
      description: "Specifies where to open the linked document",
      values: "_blank, _self, _parent, _top",
      example: `<a href="https://example.com" target="_blank">New Tab</a>`,
      notes: "Use with rel='noopener noreferrer' for security"
    },
    {
      attribute: "rel",
      description: "Relationship between current and linked document",
      values: "nofollow, noopener, noreferrer, external",
      example: `<a href="https://example.com" rel="nofollow noopener">External Link</a>`,
      notes: "Important for SEO and security"
    },
    {
      attribute: "download",
      description: "Indicates the link should download a resource",
      values: "Boolean or filename",
      example: `<a href="/resume.pdf" download="john-doe-resume.pdf">Download Resume</a>`,
      notes: "Only works for same-origin URLs"
    },
    {
      attribute: "aria-label",
      description: "Accessible name for screen readers",
      values: "Descriptive text",
      example: `<a href="/settings" aria-label="Account settings"><i class="gear-icon"></i></a>`,
      notes: "Essential for icon-only links"
    }
  ];

  const practicalExamples = [
    {
      title: "Navigation Menu",
      code: `<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About Us</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`,
      features: ["Semantic navigation", "ARIA labels", "Current page indication"]
    },
    {
      title: "Footer Links",
      code: `<footer>
  <div class="footer-links">
    <a href="/privacy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
    <a href="/sitemap">Sitemap</a>
  </div>
  <div class="social-links">
    <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <i class="fab fa-facebook"></i>
    </a>
    <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
      <i class="fab fa-twitter"></i>
    </a>
  </div>
</footer>`,
      features: ["External links", "Social icons", "Accessibility"]
    },
    {
      title: "Call-to-Action Buttons",
      code: `<div class="cta-section">
  <a href="/signup" class="cta-button">Sign Up Now</a>
  <a href="tel:+15551234567" class="cta-button phone-link">
    <i class="fas fa-phone"></i> Call Us
  </a>
  <a href="mailto:contact@example.com" class="cta-button email-link">
    <i class="fas fa-envelope"></i> Email Us
  </a>
</div>`,
      features: ["Styling as buttons", "Phone/email links", "Icon integration"]
    }
  ];

  const bestPractices = [
    {
      title: "Link Text Clarity",
      description: "Use descriptive link text that makes sense out of context",
      goodExample: `<a href="/annual-report-2023.pdf">Download 2023 Annual Report (PDF, 2MB)</a>`,
      badExample: `<a href="/annual-report-2023.pdf">Click here</a>`,
      explanation: "Screen readers often list links out of context"
    },
    {
      title: "External Link Security",
      description: "Secure external links that open in new tabs",
      goodExample: `<a href="https://external.com" target="_blank" rel="noopener noreferrer">External Site</a>`,
      badExample: `<a href="https://external.com" target="_blank">External Site</a>`,
      explanation: "rel='noopener noreferrer' prevents security vulnerabilities"
    },
    {
      title: "Accessible Icon Links",
      description: "Make icon-only links accessible",
      goodExample: `<a href="/search" aria-label="Search"><i class="fas fa-search"></i></a>`,
      badExample: `<a href="/search"><i class="fas fa-search"></i></a>`,
      explanation: "Icon-only links need text alternatives"
    },
    {
      title: "Styling Considerations",
      description: "Ensure links are visually distinguishable",
      goodExample: `<style>
  a { color: #2563eb; text-decoration: underline; }
  a:hover { color: #1d4ed8; }
</style>`,
      badExample: `<style>
  a { color: #333; text-decoration: none; }
</style>`,
      explanation: "Links should be obviously clickable"
    }
  ];

  const advancedTechniques = [
    {
      title: "Fragment Identifiers",
      description: "Linking to specific page sections",
      example: `<a href="#section-2">Jump to Section 2</a>
<!-- Later in document -->
<section id="section-2">...</section>`,
      useCase: "For long pages with multiple sections"
    },
    {
      title: "JavaScript Enhanced Links",
      description: "Adding click handlers while maintaining accessibility",
      example: `<a href="/fallback-page" onclick="handleClick(event)">Interactive Link</a>
<script>
  function handleClick(e) {
    e.preventDefault();
    // Custom logic
    window.location = e.target.href; // Fallback
  }
</script>`,
      useCase: "When adding custom behavior to links"
    },
    {
      title: "Protocol-Relative URLs",
      description: "Links that adapt to http/https automatically",
      example: `<a href="//example.com/resource">Secure Resource</a>`,
      note: "Use with caution - modern best practice is to always specify https://"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Links Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create effective, accessible hyperlinks in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaLink className="text-blue-500" />
          Introduction to HTML Links
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Hyperlinks are the foundation of web navigation, connecting documents and resources across the internet. The HTML <code>&lt;a&gt;</code> (anchor) element creates hyperlinks that can point to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Other web pages (internal or external)</li>
            <li>Specific sections within a page</li>
            <li>Files to download</li>
            <li>Email addresses and phone numbers</li>
            <li>JavaScript functionality</li>
          </ul>
          <p>
            Well-structured links are essential for usability, accessibility, and search engine optimization. This guide covers all aspects of creating effective HTML links.
          </p>
        </div>
      </section>

      {/* Link Basics */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('basics')}
          aria-expanded={expandedSections['basics']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaLink className="text-blue-500" />
            Basic Link Types
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['basics'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['basics'] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linkBasics.map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-mono font-bold text-lg mb-2">
                  <span className="text-purple-600 dark:text-purple-400">{item.element}</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm mb-3">
                  <code>{item.example}</code>
                </div>
                {item.attributes && (
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    <strong>Attributes:</strong> {item.attributes}
                  </p>
                )}
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  <strong>Usage:</strong> {item.usage}
                </p>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        localStorage.setItem('html-code', item.example);
                        router.push('/compilers/html-editor');
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
                      copyToClipboard(item.example, item.element);
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied === item.element ? (
                      <FaCheck size={10} className="inline mr-1 text-green-500" />
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

      {/* Link Attributes */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('attributes')}
          aria-expanded={expandedSections['attributes']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaExternalLinkAlt className="text-purple-500" />
            Link Attributes
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['attributes'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['attributes'] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {linkAttributes.map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{item.attribute}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                </div>
                <div className="p-4">
                  {item.values && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">
                      <strong>Values:</strong> {item.values}
                    </p>
                  )}
                  <CodeEditor
                    value={item.example}
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
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <strong>Notes:</strong> {item.notes}
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem('html-code', item.example);
                          router.push('/compilers/html-editor');
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
                      onClick={() => copyToClipboard(item.example, item.attribute)}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === item.attribute ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
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
          onClick={() => toggleSection('examples')}
          aria-expanded={expandedSections['examples']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Practical Link Examples
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['examples'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['examples'] && (
          <div className="space-y-4">
            {practicalExamples.map((example, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{example.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {example.features.map((feature, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem('html-code', example.code);
                          router.push('/compilers/html-editor');
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
                      onClick={() => copyToClipboard(example.code, example.title)}
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck size={12} className="text-green-500" />
                      ) : (
                        <FaCopy size={12} />
                      )}
                      {copied === example.title ? 'Copied!' : 'Copy'}
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

      {/* Best Practices */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('bestPractices')}
          aria-expanded={expandedSections['bestPractices']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-orange-500" />
            Link Best Practices
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['bestPractices'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['bestPractices'] && (
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{practice.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{practice.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          try {
                            localStorage.setItem('html-code', practice.goodExample);
                            router.push('/compilers/html-editor');
                          } catch (error) {
                            console.error("Error saving to localStorage:", error);
                            alert("Could not open editor. Please try again.");
                          }
                        }}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <FaPlay size={10} /> Try
                      </button>
                      <button
                        onClick={() => copyToClipboard(practice.goodExample, `${practice.title}-good`)}
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
                        fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
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
                        fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }}
                      className="dark:bg-gray-900 dark:text-gray-200"
                      readOnly
                    />
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                  <strong>Why:</strong> {practice.explanation}
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
          onClick={() => toggleSection('advanced')}
          aria-expanded={expandedSections['advanced']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaBookmark className="text-purple-500" />
            Advanced Link Techniques
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['advanced'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['advanced'] && (
          <div className="space-y-6">
            {advancedTechniques.map((item, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                </div>
                <div className="p-4">
                  <CodeEditor
                    value={item.example}
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
                          localStorage.setItem('html-code', item.example);
                          router.push('/compilers/html-editor');
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
                      {copied === item.title ? 'Copied!' : 'Copy'}
                    </button>
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
                Links Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with different types of HTML links in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Link Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different link scenarios
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
                  Link Types Included
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">Basic Links</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Internal/External</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">Bookmarks</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Page sections</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">Email/Tel</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Contact links</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">Download</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">File resources</div>
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
              All examples will be loaded into an interactive editor where you can modify and test them
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        <Link
          href="/html/comments"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        <Link
          href="/html/link-colors"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}