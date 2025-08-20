"use client";

import {
  FaBorderAll,
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaBook,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLBordersPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    styling: true,
    examples: true,
    advanced: true,
    interview: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Border Examples</title>
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
    /* Basic Border Examples */
    .solid-border {
      border: 2px solid #4a6ee0;
      padding: 10px;
      margin: 10px 0;
    }
    .dashed-border {
      border: 2px dashed #e74c3c;
      padding: 10px;
      margin: 10px 0;
    }
    .dotted-border {
      border: 2px dotted #2ecc71;
      padding: 10px;
      margin: 10px 0;
    }
    /* Individual Side Borders */
    .mixed-borders {
      border-top: 3px solid #3498db;
      border-right: 3px dashed #e74c3c;
      border-bottom: 3px dotted #2ecc71;
      border-left: 3px double #f39c12;
      padding: 15px;
      margin: 15px 0;
    }
    /* Border Radius Examples */
    .rounded-corners {
      border: 2px solid #4a6ee0;
      border-radius: 10px;
      padding: 15px;
      margin: 15px 0;
    }
    .circle {
      width: 100px;
      height: 100px;
      border: 3px solid #e74c3c;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 15px 0;
    }
    /* Table Border Examples */
    .table-borders {
      border-collapse: collapse;
      width: 100%;
      margin: 15px 0;
    }
    .table-borders th, .table-borders td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .table-borders th {
      border-bottom: 2px solid #4a6ee0;
    }
    .table-borders tr:hover {
      border: 2px solid #f39c12;
    }
    /* Advanced Border Effects */
    .gradient-border {
      border: 5px solid transparent;
      border-image: linear-gradient(to right, #4a6ee0, #e74c3c);
      border-image-slice: 1;
      padding: 15px;
      margin: 15px 0;
    }
    .shadow-border {
      border: 2px solid #4a6ee0;
      box-shadow: 0 0 10px rgba(74, 110, 224, 0.5);
      padding: 15px;
      margin: 15px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML & CSS Border Styling Guide</h1>
    
    <!-- Basic Border Styles -->
    <section class="example">
      <h2>Basic Border Styles</h2>
      <div class="solid-border">Solid Border</div>
      <div class="dashed-border">Dashed Border</div>
      <div class="dotted-border">Dotted Border</div>
      
      <pre><code>.solid-border {
  border: 2px solid #4a6ee0;
}

.dashed-border {
  border: 2px dashed #e74c3c;
}

.dotted-border {
  border: 2px dotted #2ecc71;
}</code></pre>
    </section>
    
    <!-- Individual Side Borders -->
    <section class="example">
      <h2>Individual Side Borders</h2>
      <div class="mixed-borders">
        Different borders on each side
      </div>
      
      <pre><code>.mixed-borders {
  border-top: 3px solid #3498db;
  border-right: 3px dashed #e74c3c;
  border-bottom: 3px dotted #2ecc71;
  border-left: 3px double #f39c12;
}</code></pre>
    </section>
    
    <!-- Border Radius -->
    <section class="example">
      <h2>Border Radius</h2>
      <div class="rounded-corners">Rounded Corners</div>
      <div class="circle">Circle</div>
      
      <pre><code>.rounded-corners {
  border-radius: 10px;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}</code></pre>
    </section>
    
    <!-- Table Borders -->
    <section class="example">
      <h2>Table Border Styles</h2>
      <table class="table-borders">
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
        </tr>
      </table>
      
      <pre><code>.table-borders {
  border-collapse: collapse;
}

.table-borders th, 
.table-borders td {
  border: 1px solid #ddd;
}

.table-borders th {
  border-bottom: 2px solid #4a6ee0;
}

.table-borders tr:hover {
  border: 2px solid #f39c12;
}</code></pre>
    </section>
    
    <!-- Advanced Border Effects -->
    <section class="example">
      <h2>Advanced Border Effects</h2>
      <div class="gradient-border">Gradient Border</div>
      <div class="shadow-border">Shadow Border</div>
      
      <pre><code>.gradient-border {
  border: 5px solid transparent;
  border-image: linear-gradient(to right, #4a6ee0, #e74c3c);
  border-image-slice: 1;
}

.shadow-border {
  box-shadow: 0 0 10px rgba(74, 110, 224, 0.5);
}</code></pre>
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

  const borderBasics = [
    {
      title: "Basic Border Properties",
      description: "Core CSS border properties",
      example: `.element {
  border-width: 2px;
  border-style: solid;
  border-color: #4a6ee0;
  /* Shorthand: */
  border: 2px solid #4a6ee0;
}`,
      usage: "For applying basic borders to any HTML element",
    },
    {
      title: "Border Styles",
      description: "Different border style options",
      example: `.solid { border-style: solid; }
.dashed { border-style: dashed; }
.dotted { border-style: dotted; }
.double { border-style: double; }
.groove { border-style: groove; }
.ridge { border-style: ridge; }
.inset { border-style: inset; }
.outset { border-style: outset; }
.none { border-style: none; }
.hidden { border-style: hidden; }`,
      usage: "Choose the appropriate style for your design needs",
    },
    {
      title: "Individual Side Borders",
      description: "Setting borders on specific sides",
      example: `.element {
  border-top: 2px solid red;
  border-right: 3px dashed blue;
  border-bottom: 1px dotted green;
  border-left: 4px double orange;
}`,
      usage: "When you need different borders on different sides",
    },
  ];

  const borderStyling = [
    {
      title: "Border Radius",
      description: "Creating rounded corners",
      example: `.rounded {
  border-radius: 10px;
}

.circle {
  border-radius: 50%;
}

.elliptical {
  border-radius: 50% / 20%;
}`,
      note: "Use percentages for responsive rounded corners",
    },
    {
      title: "Border Colors",
      description: "Various ways to specify border colors",
      example: `.element {
  /* Named color */
  border-color: red;
  
  /* HEX color */
  border-color: #4a6ee0;
  
  /* RGB/RGBA */
  border-color: rgb(74, 110, 224);
  border-color: rgba(74, 110, 224, 0.5);
  
  /* HSL/HSLA */
  border-color: hsl(225, 73%, 58%);
  border-color: hsla(225, 73%, 58%, 0.5);
}`,
      note: "Alpha channel (transparency) is supported in RGBA/HSLA",
    },
    {
      title: "Border Width",
      description: "Controlling border thickness",
      example: `.thin { border-width: 1px; }
.medium { border-width: 3px; }
.thick { border-width: 5px; }
.mixed {
  border-top-width: 2px;
  border-right-width: 4px;
  border-bottom-width: 6px;
  border-left-width: 8px;
}`,
      note: "Can use px, em, rem, or other length units",
    },
  ];

  const practicalExamples = [
    {
      title: "Card with Border",
      code: `<div class="card">
  <h3>Card Title</h3>
  <p>This is a card with a nice border effect.</p>
</div>

<style>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  max-width: 300px;
}
.card:hover {
  border-color: #4a6ee0;
  box-shadow: 0 4px 8px rgba(74, 110, 224, 0.2);
}
</style>`,
    },
    {
      title: "Table with Custom Borders",
      code: `<table class="custom-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Laptop</td>
      <td>$999</td>
    </tr>
    <tr>
      <td>Phone</td>
      <td>$699</td>
    </tr>
  </tbody>
</table>

<style>
.custom-table {
  border-collapse: collapse;
  width: 100%;
}
.custom-table th {
  border-bottom: 2px solid #4a6ee0;
  padding: 10px;
  text-align: left;
}
.custom-table td {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
.custom-table tr:hover td {
  border-bottom: 1px solid #f39c12;
}
</style>`,
    },
    {
      title: "Circular Avatar with Border",
      code: `<div class="avatar-container">
  <img src="avatar.jpg" alt="User Avatar" class="avatar">
</div>

<style>
.avatar {
  width: 100px;
  height: 100px;
  border: 3px solid #4a6ee0;
  border-radius: 50%;
  object-fit: cover;
}
.avatar-container {
  display: inline-block;
  padding: 5px;
  border: 2px dashed #ddd;
  border-radius: 50%;
}
</style>`,
    },
  ];

  const advancedTechniques = [
    {
      title: "Gradient Borders",
      description: "Creating borders with gradient colors",
      example: `.gradient-border {
  border: 5px solid transparent;
  border-image: linear-gradient(to right, red, blue);
  border-image-slice: 1;
}

/* Alternative method */
.gradient-border-alt {
  background: 
    linear-gradient(white, white) padding-box,
    linear-gradient(to right, red, blue) border-box;
  border: 5px solid transparent;
}`,
      note: "Requires understanding of border-image or background-clip",
    },
    {
      title: "Border Shadows",
      description: "Adding shadow effects to borders",
      example: `.shadow-border {
  border: 2px solid #4a6ee0;
  box-shadow: 0 0 10px rgba(74, 110, 224, 0.5);
}

.inset-shadow {
  border: none;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.5);
}

.multiple-shadows {
  border: none;
  box-shadow: 
    0 0 5px red,
    0 0 10px blue,
    0 0 15px green;
}`,
      note: "Can combine multiple shadows for complex effects",
    },
    {
      title: "Animated Borders",
      description: "Creating interactive border effects",
      example: `.animated-border {
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(to right, #4a6ee0, #e74c3c) border-box;
  transition: all 0.3s;
}

.animated-border:hover {
  background: linear-gradient(white, white) padding-box,
              linear-gradient(to right, #e74c3c, #4a6ee0) border-box;
  border-radius: 15px;
}`,
      note: "Combine with CSS transitions for smooth animations",
    },
  ];

  return (
    <div className="">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML & CSS Border Styling Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create and style borders for HTML elements
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaBorderAll className="text-blue-500" />
          What are CSS Borders?
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            CSS borders are used to create visible boundaries around HTML elements.
            They can be styled in various ways to enhance the visual design of your
            web pages. Borders are commonly used for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Defining boundaries around containers and sections</li>
            <li>Highlighting interactive elements like buttons and cards</li>
            <li>Creating visual separation between content areas</li>
            <li>Adding decorative elements to images and components</li>
            <li>Improving table readability with cell borders</li>
          </ul>
          
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Key Border Properties:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><code>border-width</code>: Controls the thickness of the border</li>
              <li><code>border-style</code>: Determines the line style (solid, dashed, etc.)</li>
              <li><code>border-color</code>: Sets the color of the border</li>
              <li><code>border-radius</code>: Creates rounded corners</li>
              <li><code>border-collapse</code>: Controls table border behavior</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold mb-2 text-lg">Interview & Exam Preparation</h3>
            <p className="mb-2">
              <strong>Common Interview Questions:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>What are the different border styles available in CSS?</li>
              <li>How would you create a circle using CSS borders?</li>
              <li>What&apos;s the difference between border-collapse values?</li>
              <li>How can you create a gradient border in CSS?</li>
              <li>What&apos;s the purpose of the border-image property?</li>
            </ul>
            <p className="mb-2">
              <strong>Key Concepts to Remember:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Borders can be applied to any HTML element</li>
              <li>Shorthand border property combines width, style, and color</li>
              <li>Border-radius can create circles and elliptical shapes</li>
              <li>Table borders require special consideration for accessibility</li>
              <li>Modern CSS allows for complex border effects with gradients</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Border Basics */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("basics")}
          aria-expanded={expandedSections["basics"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Border Basics
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["basics"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["basics"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {borderBasics.map((item, index) => (
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

      {/* Border Styling */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("styling")}
          aria-expanded={expandedSections["styling"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-purple-500" />
            Border Styling Techniques
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["styling"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["styling"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {borderStyling.map((item, index) => (
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
                    language="css"
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
            <FaBook className="text-blue-500" />
            Practical Border Examples
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

      {/* Advanced Techniques */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("advanced")}
          aria-expanded={expandedSections["advanced"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-orange-500" />
            Advanced Border Techniques
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
                    language="css"
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
                Border Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with border styles in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Border Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different border scenarios
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
                      Basic Borders
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Solid, dashed, dotted
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Rounded Corners
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      border-radius
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Table Borders
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      border-collapse
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Advanced Effects
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Gradients, shadows
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

      {/* Exam & Interview Preparation */}
      <section className="mb-8 bg-yellow-50 dark:bg-gray-800 p-6 rounded-xl border border-yellow-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaBook className="text-yellow-600 dark:text-yellow-400" />
          Exam & Interview Preparation
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">
              Common Interview Questions
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Q:</strong> What are the different ways to create a circle in CSS?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> Using border-radius: 50% on a square element, or with SVG/canvas. The border-radius method is most common.
                </p>
              </li>
              <li>
                <strong>Q:</strong> How would you create a border that changes color on hover?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> Use the :hover pseudo-class with a different border-color value, optionally with a transition for smooth animation.
                </p>
              </li>
              <li>
                <strong>Q:</strong> What&apos;s the difference between border-collapse: collapse and separate?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> Collapse merges adjacent borders into a single border, while separate keeps them distinct (with optional spacing).
                </p>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">
              Key Concepts to Remember
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Border Properties:</strong> Understand width, style, and color properties
              </li>
              <li>
                <strong>Shorthand:</strong> border: 1px solid black combines all three
              </li>
              <li>
                <strong>Individual Sides:</strong> Can style each side separately
              </li>
              <li>
                <strong>Rounded Corners:</strong> border-radius can create circles and more
              </li>
              <li>
                <strong>Advanced Effects:</strong> Gradient borders and shadows
              </li>
            </ul>
            
            <h3 className="font-bold text-lg mt-4 mb-2 text-gray-800 dark:text-gray-200">
              Practical Scenarios
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Creating card components with borders</li>
              <li>Styling table cells with appropriate borders</li>
              <li>Making circular avatars or buttons</li>
              <li>Highlighting form inputs on focus</li>
              <li>Creating custom dividers between sections</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/tables"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/table-styles"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}