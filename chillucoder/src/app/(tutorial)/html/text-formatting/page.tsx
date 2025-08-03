"use client";

import {
  FaBold,
  FaInfoCircle,
  FaItalic,
  FaUnderline,
  FaCode,
  FaSuperscript,
  FaSubscript,
  FaQuoteLeft,
  FaHighlighter,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLTextFormattingPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    elements: true,
    semantic: true,
    examples: true,
    bestPractices: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Text Formatting Examples</title>
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
    .formatting-example {
      margin: 15px 0;
      padding: 10px;
      border-left: 3px solid #4a6ee0;
      background-color: #f8fafc;
    }
    mark {
      background-color: #fef08a;
      padding: 0 2px;
    }
    del {
      color: #999;
    }
    ins {
      text-decoration: none;
      background-color: #dcfce7;
      padding: 0 2px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Text Formatting</h1>
    
    <section>
      <h2>Basic Text Formatting</h2>
      
      <div class="formatting-example">
        <p><strong>Bold text</strong> using &lt;strong&gt; or &lt;b&gt;</p>
        <p><em>Italic text</em> using &lt;em&gt; or &lt;i&gt;</p>
        <p><u>Underlined text</u> using &lt;u&gt;</p>
        <p><mark>Highlighted text</mark> using &lt;mark&gt;</p>
      </div>
    </section>
    
    <section>
      <h2>Semantic Text Formatting</h2>
      
      <div class="formatting-example">
        <p><code>Code snippets</code> using &lt;code&gt;</p>
        <p>H<sub>2</sub>O (Subscript) using &lt;sub&gt;</p>
        <p>E=mc<sup>2</sup> (Superscript) using &lt;sup&gt;</p>
        <p><del>Deleted text</del> and <ins>inserted text</ins></p>
        <p><small>Small print</small> using &lt;small&gt;</p>
      </div>
    </section>
    
    <section>
      <h2>Combined Formatting</h2>
      
      <div class="formatting-example">
        <p>
          <strong><em>Bold and italic</em></strong> text with 
          <mark><code>highlighted code</code></mark> and 
          H<sub>2</sub>SO<sub>4</sub> formulas.
        </p>
        <p>
          This is <del>old price: $99</del> <ins>new price: $79</ins>
        </p>
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

  const formattingElements = [
    {
      element: "<strong>, <b>",
      description:
        "Bold text - <strong> for important text, <b> for stylistic bold",
      example: `<p><strong>Important text</strong> and <b>bold text</b></p>`,
      icon: <FaBold className="text-blue-500" />,
      semantic: "<strong> is semantic, <b> is presentational",
    },
    {
      element: "<em>, <i>",
      description:
        "Italic text - <em> for emphasized text, <i> for stylistic italic",
      example: `<p><em>Emphasized text</em> and <i>italic text</i></p>`,
      icon: <FaItalic className="text-purple-500" />,
      semantic: "<em> is semantic, <i> is presentational",
    },
    {
      element: "<u>",
      description: "Underlined text (avoid for links to prevent confusion)",
      example: `<p><u>Underlined text</u> example</p>`,
      icon: <FaUnderline className="text-green-500" />,
      semantic: "Presentational only",
    },
    {
      element: "<mark>",
      description: "Highlighted text for reference or notation purposes",
      example: `<p>This is <mark>highlighted text</mark></p>`,
      icon: <FaHighlighter className="text-yellow-500" />,
      semantic: "Semantic - indicates relevance",
    },
    {
      element: "<code>",
      description: "Inline code snippet or computer code",
      example: `<p>Use <code>console.log()</code> for debugging</p>`,
      icon: <FaCode className="text-gray-500" />,
      semantic: "Semantic - indicates code",
    },
    {
      element: "<sub>",
      description: "Subscript text (lowered and smaller)",
      example: `<p>Chemical formula: H<sub>2</sub>O</p>`,
      icon: <FaSubscript className="text-red-500" />,
      semantic: "Semantic - indicates subscript",
    },
    {
      element: "<sup>",
      description: "Superscript text (raised and smaller)",
      example: `<p>Mathematical notation: x<sup>2</sup></p>`,
      icon: <FaSuperscript className="text-indigo-500" />,
      semantic: "Semantic - indicates superscript",
    },
    {
      element: "<del>, <ins>",
      description: "Deleted and inserted text (for document edits)",
      example: `<p><del>$100</del> <ins>$80</ins> (limited time)</p>`,
      icon: <FaQuoteLeft className="text-orange-500" />,
      semantic: "Semantic - indicates changes",
    },
  ];

  const semanticElements = [
    {
      element: "<strong> vs <b>",
      description: "<strong> indicates importance, <b> is just visual boldness",
      example: `<p><strong>Warning!</strong> This is <b>just bold</b> text.</p>`,
      impact: "Screen readers emphasize <strong> content",
    },
    {
      element: "<em> vs <i>",
      description: "<em> adds verbal stress, <i> is just visual italic",
      example: `<p><em>You must</em> complete this, <i>said the teacher</i>.</p>`,
      impact: "Screen readers change tone for <em> content",
    },
    {
      element: "<mark>",
      description: "Indicates text that is relevant or should be highlighted",
      example: `<p>Search results: <mark>HTML</mark> formatting guide</p>`,
      impact: "Helps users find relevant content",
    },
    {
      element: "<del> & <ins>",
      description: "Shows document edits with semantic meaning",
      example: `<p>Version 2: <del>old content</del> <ins>new content</ins></p>`,
      impact: "Clearly shows document changes",
    },
  ];

  const practicalExamples = [
    {
      title: "Academic Paper Formatting",
      code: `<article>
  <h1>The Effects of CO<sub>2</sub> on Climate</h1>
  
  <p>
    Recent studies <sup>[1]</sup> have shown that atmospheric 
    <strong>CO<sub>2</sub></strong> levels have increased by 
    <mark>47%</mark> since the industrial revolution.
  </p>
  
  <blockquote>
    <p>
      <em>"The correlation between CO<sub>2</sub> and global temperature 
      is now <ins>undeniable</ins> <del>debatable</del>."</em>
    </p>
    <footer>— Dr. <cite>Jane Smith</cite>, <cite>Climate Studies Journal</cite></footer>
  </blockquote>
  
  <p>
    The chemical reaction is: H<sub>2</sub>O + CO<sub>2</sub> ⇌ H<sub>2</sub>CO<sub>3</sub>
  </p>
</article>`,
    },
    {
      title: "Technical Documentation",
      code: `<section>
  <h2>JavaScript <code>Array</code> Methods</h2>
  
  <p>
    The <code>Array.prototype.map()</code> method creates a new array with the results 
    of calling a provided function on every element.
  </p>
  
  <pre><code>const numbers = [1, 4, 9];
const roots = numbers.map(<mark>num => Math.sqrt(num)</mark>);
// roots is now [1, 2, 3]</code></pre>
  
  <p class="note">
    <strong>Note:</strong> <code>map()</code> does not mutate the original array.
  </p>
  
  <p>
    <small>Last updated: 2025-07-15</small>
  </p>
</section>`,
    },
    {
      title: "E-commerce Product Page",
      code: `<div class="product">
  <h1>Professional <mark>Wireless</mark> Keyboard</h1>
  
  <div class="price">
    <del>$89.99</del> <ins>$69.99</ins>
    <sup class="sale-tag">SALE</sup>
  </div>
  
  <p>
    <strong>Features:</strong> <em>Ultra-thin</em> design, 
    <mark>2-year battery life</mark>, and <code>Bluetooth 5.0</code> connectivity.
  </p>
  
  <div class="tech-specs">
    <h2>Technical Specifications</h2>
    <p>Dimensions: 14.5<sub>L</sub> × 5<sub>W</sub> × 0.5<sub>H</sub> inches</p>
    <p>Weight: 1.2<sub>lbs</sub></p>
  </div>
</div>`,
    },
  ];

  const bestPractices = [
    {
      title: "Semantic vs Presentational",
      description: "Use semantic elements when meaning is important",
      example: `<p><strong>Warning:</strong> This is <em>important</em> information.</p>`,
      badExample: `<p><b>Warning:</b> This is <i>important</i> information.</p>`,
      explanation: "Semantic elements convey meaning to assistive technologies",
    },
    {
      title: "Avoid Overuse",
      description: "Don't overuse formatting as it loses effectiveness",
      example: `<p>This is <strong>one important</strong> point in the text.</p>`,
      badExample: `<p><strong><u><em>Everything</em></u></strong> is formatted excessively.</p>`,
      explanation: "Too much formatting makes content harder to read",
    },
    {
      title: "CSS for Styling",
      description: "Use CSS for purely visual formatting",
      example: `<style>
  .attention { font-weight: bold; color: red; }
</style>
<p>This needs <span class="attention">attention</span>.</p>`,
      badExample: `<p>This needs <b><i><u>attention</u></i></b>.</p>`,
      explanation:
        "CSS provides more control and separates content from presentation",
    },
    {
      title: "Accessibility",
      description: "Ensure proper contrast and readable text",
      example: `<style>
  mark { 
    background-color: #fef08a; 
    color: #000; 
    padding: 2px 4px;
  }
</style>`,
      badExample: `<style>
  mark { 
    background-color: yellow; 
    color: white; 
  }
</style>`,
      explanation: "Low contrast text is hard to read for many users",
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Text Formatting
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to properly format text in HTML with semantic meaning
        </p>
      </header>

      {/* Formatting Elements */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("elements")}
          aria-expanded={expandedSections["elements"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaBold className="text-blue-500" />
            Text Formatting Elements
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["elements"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["elements"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formattingElements.map((element, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{element.icon}</div>
                  <h3 className="font-mono font-bold text-lg">
                    {element.element}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {element.description}
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm mb-3">
                  <code>{element.example}</code>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  {element.semantic}
                </p>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      try {
                        localStorage.setItem("html-code", element.example);
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
                      copyToClipboard(element.example, element.element);
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied === element.element ? (
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

      {/* Semantic Meaning */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("semantic")}
          aria-expanded={expandedSections["semantic"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaQuoteLeft className="text-purple-500" />
            Semantic Formatting
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["semantic"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["semantic"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {semanticElements.map((element, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{element.element}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {element.description}
                  </p>
                </div>
                <div className="p-4">
                  <CodeEditor
                    value={element.example}
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
                    <strong>Impact:</strong> {element.impact}
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem("html-code", element.example);
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
                      onClick={() =>
                        copyToClipboard(element.example, element.element)
                      }
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === element.element ? "Copied!" : "Copy"}
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
            <FaInfoCircle className="text-orange-500" />
            Formatting Best Practices
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
                            localStorage.setItem("html-code", practice.example);
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
                            practice.example,
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
                      value={practice.example}
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
                      <h4 className="font-medium text-sm">Avoid</h4>
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
                  <strong>Why:</strong> {practice.explanation}
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
            Practical Formatting Examples
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
                Text Formatting Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with HTML text formatting in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Formatting Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different formatting scenarios
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
                  Formatting Elements
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      &lt;strong&gt;
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Bold importance
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      &lt;em&gt;
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Emphasized
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      &lt;mark&gt;
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Highlighted
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      &lt;code&gt;
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Code snippet
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
          href="/html/quotation"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/comments"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
