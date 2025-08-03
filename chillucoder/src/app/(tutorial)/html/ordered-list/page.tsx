"use client";

import {
  FaListOl,
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

export default function HTMLOrderedListPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    attributes: true,
    examples: true,
    nesting: true,
    styling: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ordered List Examples</title>
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
    .example {
      margin: 20px 0;
      padding: 15px;
      border-left: 3px solid #4a6ee0;
      background-color: #f8fafc;
    }
    .custom-marker {
      list-style-type: none;
      padding-left: 0;
    }
    .custom-marker li {
      counter-increment: my-counter;
      margin-bottom: 10px;
      position: relative;
      padding-left: 30px;
    }
    .custom-marker li::before {
      content: counter(my-counter);
      position: absolute;
      left: 0;
      width: 20px;
      height: 20px;
      background-color: #4a6ee0;
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Ordered Lists</h1>
    
    <!-- Basic Ordered List -->
    <section class="example">
      <h2>Basic Ordered List</h2>
      <ol>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ol>
      
      <pre><code>&lt;ol&gt;
  &lt;li&gt;First item&lt;/li&gt;
  &lt;li&gt;Second item&lt;/li&gt;
  &lt;li&gt;Third item&lt;/li&gt;
&lt;/ol&gt;</code></pre>
    </section>
    
    <!-- List with Attributes -->
    <section class="example">
      <h2>List with Attributes</h2>
      <ol type="A" start="3">
        <li>Item C (starts from 3 as A)</li>
        <li>Item D</li>
        <li>Item E</li>
      </ol>
      
      <pre><code>&lt;ol type="A" start="3"&gt;
  &lt;li&gt;Item C (starts from 3 as A)&lt;/li&gt;
  &lt;li&gt;Item D&lt;/li&gt;
  &lt;li&gt;Item E&lt;/li&gt;
&lt;/ol&gt;</code></pre>
    </section>
    
    <!-- Nested Lists -->
    <section class="example">
      <h2>Nested Ordered Lists</h2>
      <ol>
        <li>Main item 1
          <ol>
            <li>Sub item 1.1</li>
            <li>Sub item 1.2</li>
          </ol>
        </li>
        <li>Main item 2
          <ol>
            <li>Sub item 2.1</li>
            <li>Sub item 2.2</li>
          </ol>
        </li>
      </ol>
      
      <pre><code>&lt;ol&gt;
  &lt;li&gt;Main item 1
    &lt;ol&gt;
      &lt;li&gt;Sub item 1.1&lt;/li&gt;
      &lt;li&gt;Sub item 1.2&lt;/li&gt;
    &lt;/ol&gt;
  &lt;/li&gt;
  &lt;li&gt;Main item 2
    &lt;ol&gt;
      &lt;li&gt;Sub item 2.1&lt;/li&gt;
      &lt;li&gt;Sub item 2.2&lt;/li&gt;
    &lt;/ol&gt;
  &lt;/li&gt;
&lt;/ol&gt;</code></pre>
    </section>
    
    <!-- Custom Styled List -->
    <section class="example">
      <h2>Custom Styled List</h2>
      <ol class="custom-marker">
        <li>Custom styled item 1</li>
        <li>Custom styled item 2</li>
        <li>Custom styled item 3</li>
      </ol>
      
      <pre><code>&lt;style&gt;
.custom-marker {
  list-style-type: none;
  padding-left: 0;
}
.custom-marker li {
  counter-increment: my-counter;
  margin-bottom: 10px;
  position: relative;
  padding-left: 30px;
}
.custom-marker li::before {
  content: counter(my-counter);
  position: absolute;
  left: 0;
  width: 20px;
  height: 20px;
  background-color: #4a6ee0;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
}
&lt;/style&gt;

&lt;ol class="custom-marker"&gt;
  &lt;li&gt;Custom styled item 1&lt;/li&gt;
  &lt;li&gt;Custom styled item 2&lt;/li&gt;
  &lt;li&gt;Custom styled item 3&lt;/li&gt;
&lt;/ol&gt;</code></pre>
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

  const listBasics = [
    {
      title: "Basic Ordered List",
      description: "Simple numbered list with default styling",
      example: `<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>`,
      usage: "For sequential information where order matters",
    },
    {
      title: "List with Custom Start",
      description: "List starting from a specific number",
      example: `<ol start="5">
  <li>Item 5</li>
  <li>Item 6</li>
  <li>Item 7</li>
</ol>`,
      usage: "When continuing a list from a previous point",
    },
    {
      title: "Reversed List",
      description: "List numbered in descending order",
      example: `<ol reversed>
  <li>Third item</li>
  <li>Second item</li>
  <li>First item</li>
</ol>`,
      usage: "For countdowns or reverse-chronological order",
    },
    {
      title: "List with Value Attributes",
      description: "Manually setting item numbers",
      example: `<ol>
  <li value="10">Item 10</li>
  <li>Item 11</li>
  <li value="20">Item 20</li>
  <li>Item 21</li>
</ol>`,
      usage: "For non-sequential or special numbering",
    },
  ];

  const listAttributes = [
    {
      title: "Number Type (1, 2, 3)",
      description: "Default decimal numbering",
      example: `<ol type="1">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ol>`,
      note: "This is the default type if none specified",
    },
    {
      title: "Uppercase Letters (A, B, C)",
      description: "Alphabetical numbering with uppercase letters",
      example: `<ol type="A">
  <li>Item A</li>
  <li>Item B</li>
  <li>Item C</li>
</ol>`,
      note: "Starts from 'A' unless start attribute is used",
    },
    {
      title: "Lowercase Letters (a, b, c)",
      description: "Alphabetical numbering with lowercase letters",
      example: `<ol type="a">
  <li>Item a</li>
  <li>Item b</li>
  <li>Item c</li>
</ol>`,
      note: "Starts from 'a' unless start attribute is used",
    },
    {
      title: "Uppercase Roman (I, II, III)",
      description: "Roman numeral numbering in uppercase",
      example: `<ol type="I">
  <li>Item I</li>
  <li>Item II</li>
  <li>Item III</li>
</ol>`,
      note: "Commonly used for outlines or book chapters",
    },
    {
      title: "Lowercase Roman (i, ii, iii)",
      description: "Roman numeral numbering in lowercase",
      example: `<ol type="i">
  <li>Item i</li>
  <li>Item ii</li>
  <li>Item iii</li>
</ol>`,
      note: "Less common but available for specific styling needs",
    },
  ];

  const practicalExamples = [
    {
      title: "Recipe Steps",
      code: `<h2>How to Make Pancakes</h2>
<ol>
  <li>Mix dry ingredients (flour, sugar, baking powder, salt)</li>
  <li>In another bowl, beat eggs and mix with milk and melted butter</li>
  <li>Combine wet and dry ingredients, stir until just blended</li>
  <li>Heat a lightly oiled griddle or frying pan over medium heat</li>
  <li>Pour batter onto the griddle, using approximately 1/4 cup for each pancake</li>
  <li>Cook until bubbles form and edges are dry, then flip and cook until browned</li>
</ol>`,
    },
    {
      title: "Software Installation Guide",
      code: `<h2>Installation Instructions</h2>
<ol type="I">
  <li>System Requirements
    <ol type="A">
      <li>Windows 10 or later</li>
      <li>4GB RAM minimum</li>
      <li>2GB free disk space</li>
    </ol>
  </li>
  <li>Download Process
    <ol type="A">
      <li>Visit our website</li>
      <li>Click Download button</li>
      <li>Save installer to your computer</li>
    </ol>
  </li>
  <li>Installation Steps
    <ol type="A">
      <li>Run the installer</li>
      <li>Follow on-screen instructions</li>
      <li>Restart computer if prompted</li>
    </ol>
  </li>
</ol>`,
    },
    {
      title: "Academic Outline",
      code: `<h2>Research Paper Outline</h2>
<ol type="1">
  <li>Introduction
    <ol type="a">
      <li>Background information</li>
      <li>Thesis statement</li>
    </ol>
  </li>
  <li>Literature Review
    <ol type="a">
      <li>Previous studies</li>
      <li>Gaps in research</li>
    </ol>
  </li>
  <li>Methodology
    <ol type="a">
      <li>Participants</li>
      <li>Procedure</li>
      <li>Data analysis</li>
    </ol>
  </li>
  <li>Results</li>
  <li>Discussion</li>
  <li>Conclusion</li>
</ol>`,
    },
  ];

  const nestingExamples = [
    {
      title: "Mixed List Nesting",
      description: "Combining ordered and unordered lists",
      example: `<ol>
  <li>Main point 1
    <ul>
      <li>Sub-point A</li>
      <li>Sub-point B</li>
    </ul>
  </li>
  <li>Main point 2
    <ul>
      <li>Sub-point C</li>
      <li>Sub-point D</li>
    </ul>
  </li>
</ol>`,
      usage: "When you need both ordered and unordered sub-points",
    },
    {
      title: "Multi-level Ordered List",
      description: "Deeply nested ordered lists with different numbering",
      example: `<ol type="1">
  <li>First level
    <ol type="A">
      <li>Second level
        <ol type="a">
          <li>Third level
            <ol type="i">
              <li>Fourth level</li>
            </ol>
          </li>
        </ol>
      </li>
    </ol>
  </li>
</ol>`,
      usage: "For complex outlines or legal documents",
    },
  ];

  const stylingTechniques = [
    {
      title: "Custom Number Styling",
      description: "Using CSS to style list numbers",
      example: `<style>
.custom-ol {
  list-style-type: none;
  counter-reset: my-counter;
  padding-left: 0;
}
.custom-ol li {
  counter-increment: my-counter;
  margin-bottom: 10px;
  position: relative;
  padding-left: 35px;
}
.custom-ol li::before {
  content: counter(my-counter);
  position: absolute;
  left: 0;
  width: 25px;
  height: 25px;
  background-color: #4a6ee0;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 25px;
  font-size: 14px;
}
</style>

<ol class="custom-ol">
  <li>Styled item 1</li>
  <li>Styled item 2</li>
  <li>Styled item 3</li>
</ol>`,
      note: "Allows for complete control over number appearance",
    },
    {
      title: "Horizontal List",
      description: "Displaying ordered list items horizontally",
      example: `<style>
.horizontal-ol {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 15px;
}
.horizontal-ol li {
  background: #f0f0f0;
  padding: 8px 15px;
  border-radius: 20px;
  position: relative;
}
.horizontal-ol li::before {
  content: counter(my-counter);
  background: #4a6ee0;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  margin-right: 8px;
  font-size: 12px;
  line-height: 20px;
}
</style>

<ol class="horizontal-ol">
  <li>Step One</li>
  <li>Step Two</li>
  <li>Step Three</li>
</ol>`,
      note: "Useful for progress indicators or step-by-step processes",
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Ordered Lists Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create and style ordered lists in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaListOl className="text-blue-500" />
          What are Ordered Lists?
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Ordered lists (<code>&lt;ol&gt;</code>) in HTML are used to present
            items in a specific sequence where the order matters. Each item in
            the list is automatically numbered by the browser, making them ideal
            for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Step-by-step instructions or recipes</li>
            <li>Sequential processes or workflows</li>
            <li>Ranked items or prioritized tasks</li>
            <li>Academic outlines or legal documents</li>
            <li>Any content where numerical order is important</li>
          </ul>
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Automatic numbering that adjusts when items are added/removed</li>
              <li>Multiple numbering styles (numbers, letters, Roman numerals)</li>
              <li>Customizable starting numbers</li>
              <li>Ability to nest lists within lists</li>
              <li>Full CSS styling capabilities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* List Basics */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("basics")}
          aria-expanded={expandedSections["basics"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Ordered List Basics
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["basics"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["basics"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listBasics.map((item, index) => (
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

      {/* List Attributes */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("attributes")}
          aria-expanded={expandedSections["attributes"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-purple-500" />
            List Numbering Types
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["attributes"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["attributes"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listAttributes.map((item, index) => (
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
                    <strong>Note:</strong> {item.note}
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

      {/* Practical Examples */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("examples")}
          aria-expanded={expandedSections["examples"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Practical Examples
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

      {/* Nesting Lists */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("nesting")}
          aria-expanded={expandedSections["nesting"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaListOl className="text-orange-500" />
            Nesting Ordered Lists
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["nesting"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["nesting"] && (
          <div className="space-y-6">
            {nestingExamples.map((item, index) => (
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
                    <strong>Usage:</strong> {item.usage}
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

      {/* Styling Techniques */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("styling")}
          aria-expanded={expandedSections["styling"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-green-500" />
            Advanced Styling Techniques
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["styling"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["styling"] && (
          <div className="space-y-6">
            {stylingTechniques.map((item, index) => (
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
                    <strong>Note:</strong> {item.note}
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

      {/* Interactive Playground */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                Ordered List Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with ordered lists in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Ordered List Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different list scenarios
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
                  Features Included
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Basic Lists
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Simple numbering
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Attributes
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      type, start, reversed
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Nesting
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Multi-level lists
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Styling
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Custom CSS examples
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
          href="//html/favicon"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/unordered-list"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}