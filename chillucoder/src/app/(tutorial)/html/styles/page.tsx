"use client";

import { FaInfoCircle, FaCode, FaCopy, FaCheck, FaChevronDown, FaPlay, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLStylesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    inline: true,
    internal: true,
    external: true,
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
  <title>HTML Styles Examples</title>
  <!-- External CSS -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- Internal CSS -->
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
    .highlight {
      background-color: #fffacd;
      padding: 2px 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db;">HTML Styles Guide</h1>
    
    <section>
      <h2 style="color: #2980b9;">Inline Styles</h2>
      <p style="font-size: 1.1em; line-height: 1.8; color: #34495e;">
        This paragraph uses <span style="font-weight: bold; color: #e74c3c;">inline styles</span> 
        for immediate styling needs.
      </p>
      <div style="background: #ecf0f1; padding: 15px; border-left: 4px solid #3498db; margin: 15px 0;">
        <p style="margin: 0;">This is a styled div with inline CSS.</p>
      </div>
    </section>
    
    <section class="styled-section">
      <h2>Internal CSS Styles</h2>
      <p class="intro">This paragraph is styled using internal CSS in the head section.</p>
      <p>This is a <span class="highlight">highlighted</span> text using a CSS class.</p>
    </section>
    
    <section id="external-section">
      <h2>External CSS Styles</h2>
      <p class="external-text">This text is styled using an external stylesheet.</p>
      <button class="btn">Styled Button</button>
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

  const styleMethods = [
    {
      method: "Inline Styles",
      description: "Styles applied directly to HTML elements using the style attribute",
      example: `<p style="color: blue; font-size: 16px;">Text</p>`,
      pros: "Highest specificity, quick to implement",
      cons: "Hard to maintain, not reusable"
    },
    {
      method: "Internal Styles",
      description: "Styles defined in the <style> element within the document head",
      example: `<head>
  <style>
    p { color: red; }
  </style>
</head>`,
      pros: "Applies to whole page, better organization",
      cons: "Only affects single page"
    },
    {
      method: "External Styles",
      description: "Styles defined in separate .css files linked via <link> element",
      example: `<head>
  <link rel="stylesheet" href="styles.css">
</head>`,
      pros: "Reusable across pages, best for maintenance",
      cons: "Additional HTTP request"
    }
  ];

  const cssSelectors = [
    {
      selector: "Element",
      example: "p { color: blue; }",
      description: "Selects all <p> elements"
    },
    {
      selector: "Class",
      example: ".intro { font-size: 1.2em; }",
      description: "Selects elements with class='intro'"
    },
    {
      selector: "ID",
      example: "#header { background: #333; }",
      description: "Selects element with id='header'"
    },
    {
      selector: "Attribute",
      example: "input[type='text'] { border: 1px solid #ccc; }",
      description: "Selects elements with specific attributes"
    },
    {
      selector: "Pseudo-class",
      example: "a:hover { color: red; }",
      description: "Selects elements in special state"
    }
  ];

  const bestPractices = [
    {
      title: "Separation of Concerns",
      description: "Keep content (HTML) separate from presentation (CSS)",
      example: `<!-- Good -->
<link rel="stylesheet" href="styles.css">

<!-- Bad -->
<div style="font-size: 14px; color: #333;">`,
      badExample: `<div style="font-size: 14px; color: #333;">Inline styles make maintenance difficult</div>`
    },
    {
      title: "Specificity",
      description: "Use classes instead of IDs for styling when possible",
      example: `.button { padding: 8px 16px; }`,
      badExample: `#submit-button { padding: 8px 16px; }`
    },
    {
      title: "Responsive Design",
      description: "Use relative units and media queries for responsive layouts",
      example: `.container { max-width: 100%; padding: 2rem; }`,
      badExample: `.container { width: 800px; padding: 20px; }`
    }
  ];

  const practicalExamples = [
    {
      title: "Complete Stylesheet Example",
      code: `/* styles.css */
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background: #2c3e50;
  color: white;
  padding: 20px;
  margin-bottom: 30px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #2980b9;
}

@media (max-width: 768px) {
  body {
    padding: 10px;
  }
  
  .header {
    padding: 15px;
  }
}`
    },
    {
      title: "Component Styling",
      code: `/* Card component styles */
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
  background: #f8f9fa;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.card-body {
  padding: 15px;
}

.card-footer {
  background: #f8f9fa;
  padding: 10px 15px;
  border-top: 1px solid #ddd;
  text-align: right;
}`
    },
    {
      title: "Utility Classes",
      code: `/* Utility classes */
.text-center { text-align: center; }
.text-right { text-align: right; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }

/* Color utilities */
.bg-primary { background: #3498db; }
.text-primary { color: #3498db; }
.bg-secondary { background: #95a5a6; }
.text-secondary { color: #95a5a6; }

/* Responsive utilities */
@media (max-width: 768px) {
  .sm-text-center { text-align: center; }
}`
    }
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Styles Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to style HTML elements with CSS
        </p>
      </header>

      {/* Styling Methods */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('inline')}
          aria-expanded={expandedSections['inline']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            CSS Styling Methods
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['inline'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['inline'] && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {styleMethods.map((method, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      <span className="text-purple-600 dark:text-purple-400">{method.method}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{method.description}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mb-1">Pros: {method.pros}</p>
                    <p className="text-xs text-red-600 dark:text-red-400">Cons: {method.cons}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(method.example, method.method);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Copy example for ${method.method}`}
                  >
                    {copied === method.method ? (
                      <FaCheck className="text-green-500 text-sm" />
                    ) : (
                      <FaCopy className="text-sm" />
                    )}
                  </button>
                </div>
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>{method.example}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CSS Selectors */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('internal')}
          aria-expanded={expandedSections['internal']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-green-500" />
            CSS Selectors
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['internal'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['internal'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cssSelectors.map((selector, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-lg mb-1">
                      <span className="text-purple-600 dark:text-purple-400">{selector.selector}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{selector.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(selector.example, selector.selector);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Copy example for ${selector.selector}`}
                  >
                    {copied === selector.selector ? (
                      <FaCheck className="text-green-500 text-sm" />
                    ) : (
                      <FaCopy className="text-sm" />
                    )}
                  </button>
                </div>
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>{selector.example}</code>
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
            <FaInfoCircle className="text-orange-500" />
            CSS Best Practices
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
                      language="css"
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
                      language="css"
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

      {/* Practical Examples */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('examples')}
          aria-expanded={expandedSections['examples']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Practical CSS Examples
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['examples'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['examples'] && (
          <div className="space-y-4">
            {practicalExamples.map((example, index) => (
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
                  language="css"
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
                CSS Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with CSS styling in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  CSS Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different styling approaches
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
                  Styling Methods
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {styleMethods.slice(0, 3).map((method) => (
                    <div key={method.method} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                      <h5 className="font-medium text-purple-600 dark:text-purple-400">{method.method}</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{method.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  CSS Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cssSelectors.map((sel) => (
                    <span key={sel.selector} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {sel.selector}
                    </span>
                  ))}
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
          <Link
            href="/html/paragraphs"
            className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              <FaArrowLeft className="text-blue-500" />
              HTML Paragraphs
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Learn about text structure and formatting.</p>
          </Link>

          <Link
            href="/html/formatting"
            className="border border-green-200 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              HTML Text Formatting
              <FaArrowRight className="text-green-500" />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Explore semantic text formatting elements.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}