"use client";

import {
  FaListUl,
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

export default function HTMLUnorderedListPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    markers: true,
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
  <title>Unordered List Examples</title>
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
      position: relative;
      padding-left: 25px;
      margin-bottom: 10px;
    }
    .custom-marker li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #4a6ee0;
      font-size: 20px;
      line-height: 1;
    }
    .checklist {
      list-style-type: none;
      padding-left: 0;
    }
    .checklist li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 8px;
    }
    .checklist li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #2ecc71;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Unordered Lists</h1>
    
    <!-- Basic Unordered List -->
    <section class="example">
      <h2>Basic Unordered List</h2>
      <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>
      
      <pre><code>&lt;ul&gt;
  &lt;li&gt;First item&lt;/li&gt;
  &lt;li&gt;Second item&lt;/li&gt;
  &lt;li&gt;Third item&lt;/li&gt;
&lt;/ul&gt;</code></pre>
    </section>
    
    <!-- List with Different Markers -->
    <section class="example">
      <h2>List with Different Markers</h2>
      <ul style="list-style-type: square;">
        <li>Square bullet item 1</li>
        <li>Square bullet item 2</li>
      </ul>
      <ul style="list-style-type: circle;">
        <li>Circle bullet item 1</li>
        <li>Circle bullet item 2</li>
      </ul>
      
      <pre><code>&lt;ul style="list-style-type: square;"&gt;
  &lt;li&gt;Square bullet item 1&lt;/li&gt;
  &lt;li&gt;Square bullet item 2&lt;/li&gt;
&lt;/ul&gt;
&lt;ul style="list-style-type: circle;"&gt;
  &lt;li&gt;Circle bullet item 1&lt;/li&gt;
  &lt;li&gt;Circle bullet item 2&lt;/li&gt;
&lt;/ul&gt;</code></pre>
    </section>
    
    <!-- Nested Lists -->
    <section class="example">
      <h2>Nested Unordered Lists</h2>
      <ul>
        <li>Main item 1
          <ul>
            <li>Sub item 1.1</li>
            <li>Sub item 1.2</li>
          </ul>
        </li>
        <li>Main item 2
          <ul>
            <li>Sub item 2.1</li>
            <li>Sub item 2.2</li>
          </ul>
        </li>
      </ul>
      
      <pre><code>&lt;ul&gt;
  &lt;li&gt;Main item 1
    &lt;ul&gt;
      &lt;li&gt;Sub item 1.1&lt;/li&gt;
      &lt;li&gt;Sub item 1.2&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
  &lt;li&gt;Main item 2
    &lt;ul&gt;
      &lt;li&gt;Sub item 2.1&lt;/li&gt;
      &lt;li&gt;Sub item 2.2&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
    </section>
    
    <!-- Custom Styled List -->
    <section class="example">
      <h2>Custom Styled List</h2>
      <ul class="custom-marker">
        <li>Custom bullet item 1</li>
        <li>Custom bullet item 2</li>
        <li>Custom bullet item 3</li>
      </ul>
      
      <pre><code>&lt;style&gt;
.custom-marker {
  list-style-type: none;
  padding-left: 0;
}
.custom-marker li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 10px;
}
.custom-marker li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4a6ee0;
  font-size: 20px;
  line-height: 1;
}
&lt;/style&gt;

&lt;ul class="custom-marker"&gt;
  &lt;li&gt;Custom bullet item 1&lt;/li&gt;
  &lt;li&gt;Custom bullet item 2&lt;/li&gt;
  &lt;li&gt;Custom bullet item 3&lt;/li&gt;
&lt;/ul&gt;</code></pre>
    </section>
    
    <!-- Checklist -->
    <section class="example">
      <h2>Checklist</h2>
      <ul class="checklist">
        <li>Complete project research</li>
        <li>Write first draft</li>
        <li>Review with team</li>
        <li>Submit final version</li>
      </ul>
      
      <pre><code>&lt;style&gt;
.checklist {
  list-style-type: none;
  padding-left: 0;
}
.checklist li {
  position: relative;
  padding-left: 30px;
  margin-bottom: 8px;
}
.checklist li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #2ecc71;
  font-weight: bold;
}
&lt;/style&gt;

&lt;ul class="checklist"&gt;
  &lt;li&gt;Complete project research&lt;/li&gt;
  &lt;li&gt;Write first draft&lt;/li&gt;
  &lt;li&gt;Review with team&lt;/li&gt;
  &lt;li&gt;Submit final version&lt;/li&gt;
&lt;/ul&gt;</code></pre>
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
      title: "Basic Unordered List",
      description: "Simple bulleted list with default styling",
      example: `<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>`,
      usage: "For grouping related items where order doesn't matter",
    },
    {
      title: "Compact List",
      description: "List with reduced spacing between items",
      example: `<ul style="line-height: 1.2;">
  <li style="margin-bottom: 4px;">Compact item 1</li>
  <li style="margin-bottom: 4px;">Compact item 2</li>
  <li style="margin-bottom: 4px;">Compact item 3</li>
</ul>`,
      usage: "When space is limited or for dense information display",
    },
    {
      title: "List with Custom Indentation",
      description: "List with adjusted indentation levels",
      example: `<ul style="padding-left: 10px;">
  <li>Less indented item 1</li>
  <li>Less indented item 2</li>
</ul>

<ul style="padding-left: 40px;">
  <li>More indented item 1</li>
  <li>More indented item 2</li>
</ul>`,
      usage: "To control visual hierarchy and grouping",
    },
  ];

  const markerTypes = [
    {
      title: "Disc (Default)",
      description: "Filled circular bullet points",
      example: `<ul style="list-style-type: disc;">
  <li>Disc item 1</li>
  <li>Disc item 2</li>
</ul>`,
      note: "This is the default style if none specified",
    },
    {
      title: "Circle",
      description: "Hollow circular bullet points",
      example: `<ul style="list-style-type: circle;">
  <li>Circle item 1</li>
  <li>Circle item 2</li>
</ul>`,
      note: "Provides a lighter visual appearance than disc",
    },
    {
      title: "Square",
      description: "Filled square bullet points",
      example: `<ul style="list-style-type: square;">
  <li>Square item 1</li>
  <li>Square item 2</li>
</ul>`,
      note: "Offers a more angular, modern look",
    },
    {
      title: "None",
      description: "No visible markers",
      example: `<ul style="list-style-type: none;">
  <li>No marker item 1</li>
  <li>No marker item 2</li>
</ul>`,
      note: "Useful when creating custom markers with CSS",
    },
  ];

  const practicalExamples = [
    {
      title: "Navigation Menu",
      code: `<nav>
  <ul style="list-style-type: none; padding: 0; display: flex; gap: 15px;">
    <li><a href="#home" style="text-decoration: none; color: #333;">Home</a></li>
    <li><a href="#about" style="text-decoration: none; color: #333;">About</a></li>
    <li><a href="#services" style="text-decoration: none; color: #333;">Services</a></li>
    <li><a href="#contact" style="text-decoration: none; color: #333;">Contact</a></li>
  </ul>
</nav>`,
    },
    {
      title: "Feature List",
      code: `<h2>Product Features</h2>
<ul style="list-style-type: none; padding-left: 0;">
  <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
    <span style="font-weight: bold; color: #4a6ee0;">✓</span> Fast performance
  </li>
  <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
    <span style="font-weight: bold; color: #4a6ee0;">✓</span> Secure data handling
  </li>
  <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
    <span style="font-weight: bold; color: #4a6ee0;">✓</span> 24/7 customer support
  </li>
  <li style="padding: 8px 0;">
    <span style="font-weight: bold; color: #4a6ee0;">✓</span> Easy to use interface
  </li>
</ul>`,
    },
    {
      title: "Ingredient List",
      code: `<h2>Pasta Salad Ingredients</h2>
<ul style="list-style-type: none; padding-left: 0;">
  <li style="padding: 5px 0;">
    <span style="display: inline-block; width: 20px; text-align: center;">•</span> 2 cups cooked pasta
  </li>
  <li style="padding: 5px 0;">
    <span style="display: inline-block; width: 20px; text-align: center;">•</span> 1 cup cherry tomatoes, halved
  </li>
  <li style="padding: 5px 0;">
    <span style="display: inline-block; width: 20px; text-align: center;">•</span> 1/2 cup sliced cucumbers
  </li>
  <li style="padding: 5px 0;">
    <span style="display: inline-block; width: 20px; text-align: center;">•</span> 1/4 cup olive oil
  </li>
  <li style="padding: 5px 0;">
    <span style="display: inline-block; width: 20px; text-align: center;">•</span> 2 tbsp balsamic vinegar
  </li>
  <li style="padding: 5px 0;">
    <span style="display: inline-block; width: 20px; text-align: center;">•</span> Salt and pepper to taste
  </li>
</ul>`,
    },
  ];

  const nestingExamples = [
    {
      title: "Multi-level Navigation",
      description: "Nested lists for dropdown navigation",
      example: `<nav>
  <ul style="list-style-type: none; padding-left: 0;">
    <li>
      <a href="#">Home</a>
    </li>
    <li>
      <a href="#">Products</a>
      <ul style="list-style-type: none; padding-left: 20px;">
        <li><a href="#">Product 1</a></li>
        <li><a href="#">Product 2</a></li>
        <li><a href="#">Product 3</a></li>
      </ul>
    </li>
    <li>
      <a href="#">Services</a>
      <ul style="list-style-type: none; padding-left: 20px;">
        <li><a href="#">Service A</a></li>
        <li><a href="#">Service B</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
      usage: "For creating hierarchical navigation menus",
    },
    {
      title: "Document Outline",
      description: "Nested lists for content structure",
      example: `<div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
  <ul style="list-style-type: none; padding-left: 0;">
    <li>
      <strong>Chapter 1: Introduction</strong>
      <ul style="list-style-type: none; padding-left: 20px;">
        <li>1.1 Background</li>
        <li>1.2 Objectives</li>
      </ul>
    </li>
    <li>
      <strong>Chapter 2: Literature Review</strong>
      <ul style="list-style-type: none; padding-left: 20px;">
        <li>2.1 Previous Studies</li>
        <li>2.2 Current Research</li>
      </ul>
    </li>
  </ul>
</div>`,
      usage: "For creating document outlines or table of contents",
    },
  ];

  const stylingTechniques = [
    {
      title: "Custom Bullet Icons",
      description: "Using CSS to replace default bullets with custom icons",
      example: `<style>
.custom-icon-list {
  list-style-type: none;
  padding-left: 0;
}
.custom-icon-list li {
  padding-left: 25px;
  position: relative;
  margin-bottom: 8px;
}
.custom-icon-list li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #4a6ee0;
  font-weight: bold;
}
</style>

<ul class="custom-icon-list">
  <li>Featured product</li>
  <li>New arrival</li>
  <li>Limited edition</li>
</ul>`,
      note: "Allows for creative visual styling beyond standard bullets",
    },
    {
      title: "Horizontal List",
      description: "Displaying list items in a row instead of vertically",
      example: `<style>
.horizontal-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 15px;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
}
.horizontal-list li {
  padding: 5px 10px;
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>

<ul class="horizontal-list">
  <li>Popular</li>
  <li>Trending</li>
  <li>New</li>
  <li>Featured</li>
</ul>`,
      note: "Ideal for tags, filters, or horizontal navigation",
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Unordered Lists Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create and style unordered lists in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaListUl className="text-blue-500" />
          What are Unordered Lists?
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Unordered lists (<code>&lt;ul&gt;</code>) in HTML are used to group
            collections of items that do not require a specific order or sequence.
            Each item in the list is marked with a bullet point by default,
            making them ideal for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Navigation menus and site maps</li>
            <li>Feature lists and product specifications</li>
            <li>Ingredients or item collections</li>
            <li>Any content where the order of items isn't important</li>
          </ul>
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Simple bullet-pointed item display</li>
              <li>Multiple bullet style options (disc, circle, square)</li>
              <li>Ability to remove bullets completely</li>
              <li>Support for nested lists within lists</li>
              <li>Full CSS styling capabilities for custom designs</li>
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
            Unordered List Basics
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

      {/* Marker Types */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("markers")}
          aria-expanded={expandedSections["markers"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-purple-500" />
            List Marker Types
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["markers"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["markers"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {markerTypes.map((item, index) => (
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
            <FaListUl className="text-orange-500" />
            Nesting Unordered Lists
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
                Unordered List Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with unordered lists in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Unordered List Examples Preview
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
                      Simple bullet points
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Marker Types
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      disc, circle, square
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
          href="/html/ordered-list"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/description-list"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}