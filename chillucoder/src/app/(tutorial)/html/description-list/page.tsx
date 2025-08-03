"use client";

import {
  FaList,
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

export default function HTMLDescriptionListPage() {
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
  <title>Description List Examples</title>
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
    .styled-dl {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 5px;
    }
    .styled-dl dt {
      font-weight: bold;
      color: #2c3e50;
      margin-top: 10px;
      font-size: 1.1em;
    }
    .styled-dl dd {
      margin-left: 20px;
      padding: 5px 0;
    }
    .horizontal-dl {
      display: grid;
      grid-template-columns: max-content auto;
      gap: 10px 20px;
    }
    .horizontal-dl dt {
      grid-column: 1;
      font-weight: bold;
      text-align: right;
    }
    .horizontal-dl dd {
      grid-column: 2;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Description Lists</h1>
    
    <!-- Basic Description List -->
    <section class="example">
      <h2>Basic Description List</h2>
      <dl>
        <dt>HTML</dt>
        <dd>HyperText Markup Language - the standard markup language for documents designed to be displayed in a web browser</dd>
        
        <dt>CSS</dt>
        <dd>Cascading Style Sheets - a style sheet language used for describing the presentation of a document written in HTML</dd>
        
        <dt>JavaScript</dt>
        <dd>A programming language that conforms to the ECMAScript specification, used to create dynamic content on web pages</dd>
      </dl>
      
      <pre><code>&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;HyperText Markup Language...&lt;/dd&gt;
  
  &lt;dt&gt;CSS&lt;/dt&gt;
  &lt;dd&gt;Cascading Style Sheets...&lt;/dd&gt;
  
  &lt;dt&gt;JavaScript&lt;/dt&gt;
  &lt;dd&gt;A programming language...&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
    </section>
    
    <!-- Styled Description List -->
    <section class="example">
      <h2>Styled Description List</h2>
      <dl class="styled-dl">
        <dt>Semantic HTML</dt>
        <dd>HTML that introduces meaning to the web page rather than just presentation</dd>
        <dd>Examples include &lt;header&gt;, &lt;footer&gt;, &lt;article&gt;, and &lt;section&gt;</dd>
        
        <dt>Responsive Design</dt>
        <dd>An approach to web design that makes web pages render well on a variety of devices</dd>
        <dd>Uses flexible layouts, flexible images, and CSS media queries</dd>
      </dl>
      
      <pre><code>&lt;style&gt;
.styled-dl {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
}
.styled-dl dt {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 10px;
  font-size: 1.1em;
}
.styled-dl dd {
  margin-left: 20px;
  padding: 5px 0;
}
&lt;/style&gt;

&lt;dl class="styled-dl"&gt;
  &lt;dt&gt;Semantic HTML&lt;/dt&gt;
  &lt;dd&gt;HTML that introduces meaning...&lt;/dd&gt;
  
  &lt;dt&gt;Responsive Design&lt;/dt&gt;
  &lt;dd&gt;An approach to web design...&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
    </section>
    
    <!-- Horizontal Description List -->
    <section class="example">
      <h2>Horizontal Description List</h2>
      <dl class="horizontal-dl">
        <dt>Name:</dt>
        <dd>John Doe</dd>
        
        <dt>Email:</dt>
        <dd>john@example.com</dd>
        
        <dt>Phone:</dt>
        <dd>(123) 456-7890</dd>
        
        <dt>Address:</dt>
        <dd>123 Main St, Anytown, USA</dd>
      </dl>
      
      <pre><code>&lt;style&gt;
.horizontal-dl {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 10px 20px;
}
.horizontal-dl dt {
  grid-column: 1;
  font-weight: bold;
  text-align: right;
}
.horizontal-dl dd {
  grid-column: 2;
  margin: 0;
}
&lt;/style&gt;

&lt;dl class="horizontal-dl"&gt;
  &lt;dt&gt;Name:&lt;/dt&gt;
  &lt;dd&gt;John Doe&lt;/dd&gt;
  
  &lt;dt&gt;Email:&lt;/dt&gt;
  &lt;dd&gt;john@example.com&lt;/dd&gt;
  
  &lt;dt&gt;Phone:&lt;/dt&gt;
  &lt;dd&gt;(123) 456-7890&lt;/dd&gt;
  
  &lt;dt&gt;Address:&lt;/dt&gt;
  &lt;dd&gt;123 Main St, Anytown, USA&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
    </section>
    
    <!-- Multiple Descriptions -->
    <section class="example">
      <h2>Multiple Descriptions</h2>
      <dl>
        <dt>API</dt>
        <dd>Application Programming Interface</dd>
        <dd>A set of protocols and tools for building software applications</dd>
        <dd>A way for different software components to communicate</dd>
        
        <dt>CMS</dt>
        <dd>Content Management System</dd>
        <dd>Software used to manage the creation and modification of digital content</dd>
      </dl>
      
      <pre><code>&lt;dl&gt;
  &lt;dt&gt;API&lt;/dt&gt;
  &lt;dd&gt;Application Programming Interface&lt;/dd&gt;
  &lt;dd&gt;A set of protocols and tools...&lt;/dd&gt;
  
  &lt;dt&gt;CMS&lt;/dt&gt;
  &lt;dd&gt;Content Management System&lt;/dd&gt;
  &lt;dd&gt;Software used to manage...&lt;/dd&gt;
&lt;/dl&gt;</code></pre>
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
      title: "Basic Description List",
      description: "Simple term-definition pairs with default styling",
      example: `<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>`,
      usage: "For glossaries, metadata displays, or any term-definition content",
    },
    {
      title: "Multiple Descriptions",
      description: "Single term with multiple descriptions",
      example: `<dl>
  <dt>JavaScript</dt>
  <dd>A programming language</dd>
  <dd>Used for web development</dd>
  <dd>Runs in the browser</dd>
</dl>`,
      usage: "When a term has several definitions or aspects that need explanation",
    },
    {
      title: "Empty Term",
      description: "Description list with visually hidden terms",
      example: `<dl>
  <dt style="visibility: hidden;">Hidden Term</dt>
  <dd>This description stands alone visually</dd>
  
  <dt style="display: none;">Completely Hidden</dt>
  <dd>Another standalone description</dd>
</dl>`,
      usage: "For visually consistent layouts when terms aren't needed visually",
    },
  ];

  const advancedTechniques = [
    {
      title: "Horizontal Layout",
      description: "Terms and descriptions displayed in columns",
      example: `<style>
.dl-horizontal {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 10px 20px;
}
.dl-horizontal dt {
  grid-column: 1;
  font-weight: bold;
}
.dl-horizontal dd {
  grid-column: 2;
  margin: 0;
}
</style>

<dl class="dl-horizontal">
  <dt>Name:</dt>
  <dd>John Smith</dd>
  
  <dt>Email:</dt>
  <dd>john@example.com</dd>
</dl>`,
      note: "Ideal for contact information or key-value pairs",
    },
    {
      title: "Card Layout",
      description: "Description list styled as cards",
      example: `<style>
.dl-cards dt {
  background: #4a6ee0;
  color: white;
  padding: 8px 15px;
  border-radius: 5px 5px 0 0;
  margin-top: 15px;
}
.dl-cards dd {
  background: white;
  margin: 0;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 5px 5px;
}
</style>

<dl class="dl-cards">
  <dt>Frontend</dt>
  <dd>HTML, CSS, JavaScript</dd>
  
  <dt>Backend</dt>
  <dd>Node.js, Python, PHP</dd>
</dl>`,
      note: "Great for highlighting categories with their items",
    },
    {
      title: "Inline Layout",
      description: "Terms and descriptions displayed inline",
      example: `<style>
.dl-inline dt, .dl-inline dd {
  display: inline;
  margin: 0;
}
.dl-inline dt {
  font-weight: bold;
}
.dl-inline dt::after {
  content: ": ";
}
.dl-inline dd::after {
  content: "\\A";
  white-space: pre;
}
</style>

<dl class="dl-inline">
  <dt>Browser</dt>
  <dd>Chrome</dd>
  <dt>Version</dt>
  <dd>102.0</dd>
  <dt>OS</dt>
  <dd>Windows 10</dd>
</dl>`,
      note: "Useful for compact metadata displays",
    },
  ];

  const practicalExamples = [
    {
      title: "Glossary of Terms",
      code: `<h2>Web Development Glossary</h2>
<dl class="glossary">
  <dt>DOM</dt>
  <dd>Document Object Model - a programming interface for web documents</dd>
  
  <dt>AJAX</dt>
  <dd>Asynchronous JavaScript and XML - technique for creating async web apps</dd>
  
  <dt>SEO</dt>
  <dd>Search Engine Optimization - process of improving website visibility</dd>
</dl>

<style>
.glossary dt {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 15px;
  font-size: 1.1em;
}
.glossary dd {
  margin-left: 20px;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}
</style>`,
    },
    {
      title: "Product Specifications",
      code: `<h2>Product Specifications</h2>
<dl class="specs">
  <dt>Model Number</dt>
  <dd>XJ-4500</dd>
  
  <dt>Dimensions</dt>
  <dd>12.5 x 8.2 x 1.4 inches</dd>
  
  <dt>Weight</dt>
  <dd>2.5 lbs</dd>
  
  <dt>Warranty</dt>
  <dd>1 year limited warranty</dd>
</dl>

<style>
.specs {
  display: grid;
  grid-template-columns: max-content auto;
  gap: 10px 20px;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
}
.specs dt {
  font-weight: bold;
  color: #4a6ee0;
}
.specs dd {
  margin: 0;
}
</style>`,
    },
    {
      title: "FAQ Section",
      code: `<h2>Frequently Asked Questions</h2>
<dl class="faq">
  <dt>How do I reset my password?</dt>
  <dd>Click on "Forgot password" on the login page and follow the instructions.</dd>
  
  <dt>What payment methods do you accept?</dt>
  <dd>We accept all major credit cards, PayPal, and bank transfers.</dd>
  
  <dt>Is there a mobile app available?</dt>
  <dd>Yes, our app is available on both iOS and Android platforms.</dd>
</dl>

<style>
.faq dt {
  font-weight: bold;
  background: #f0f4f8;
  padding: 10px 15px;
  border-left: 3px solid #4a6ee0;
  cursor: pointer;
}
.faq dt:hover {
  background: #e1e8f0;
}
.faq dd {
  margin: 0;
  padding: 10px 15px 20px;
  border-bottom: 1px solid #eee;
}
</style>`,
    },
  ];

  const nestingExamples = [
    {
      title: "Nested Description Lists",
      description: "Description lists within description lists",
      example: `<dl>
  <dt>Frontend Technologies</dt>
  <dd>
    <dl>
      <dt>HTML</dt>
      <dd>Structure of web pages</dd>
      
      <dt>CSS</dt>
      <dd>Styling of web pages</dd>
    </dl>
  </dd>
  
  <dt>Backend Technologies</dt>
  <dd>
    <dl>
      <dt>Node.js</dt>
      <dd>JavaScript runtime</dd>
      
      <dt>Python</dt>
      <dd>General purpose language</dd>
    </dl>
  </dd>
</dl>`,
      usage: "For hierarchical term-definition structures",
    },
    {
      title: "Mixed with Other Lists",
      description: "Combining description lists with ordered/unordered lists",
      example: `<dl>
  <dt>Development Process</dt>
  <dd>
    <ol>
      <li>Planning</li>
      <li>Design</li>
      <li>Implementation</li>
    </ol>
  </dd>
  
  <dt>Required Skills</dt>
  <dd>
    <ul>
      <li>HTML/CSS</li>
      <li>JavaScript</li>
      <li>Version Control</li>
    </ul>
  </dd>
</dl>`,
      usage: "When definitions require list structures",
    },
  ];

  const stylingTechniques = [
    {
      title: "Custom Term Indicators",
      description: "Replacing default styling with custom markers",
      example: `<style>
.custom-terms dt {
  position: relative;
  padding-left: 25px;
  font-weight: bold;
}
.custom-terms dt::before {
  content: "❯";
  position: absolute;
  left: 0;
  color: #4a6ee0;
}
.custom-terms dd {
  margin-left: 25px;
  padding: 5px 0;
}
</style>

<dl class="custom-terms">
  <dt>Accessibility</dt>
  <dd>Making websites usable by people with disabilities</dd>
  
  <dt>Responsiveness</dt>
  <dd>Adapting layout to different screen sizes</dd>
</dl>`,
      note: "Allows for creative visual indicators for terms",
    },
    {
      title: "Bordered Layout",
      description: "Description list with bordered sections",
      example: `<style>
.bordered-dl dt {
  background: #4a6ee0;
  color: white;
  padding: 8px 15px;
  margin-top: 15px;
  border-radius: 5px 5px 0 0;
}
.bordered-dl dd {
  margin: 0;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-top: none;
}
.bordered-dl dd:last-child {
  border-radius: 0 0 5px 5px;
}
</style>

<dl class="bordered-dl">
  <dt>HTML Elements</dt>
  <dd>&lt;div&gt; - content division</dd>
  <dd>&lt;span&gt; - inline container</dd>
  
  <dt>CSS Properties</dt>
  <dd>display - controls layout</dd>
  <dd>position - positioning method</dd>
</dl>`,
      note: "Creates visual separation between term groups",
    },
  ];

  return (
    <div className="">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Description Lists Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create and style description lists (definition lists) in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaList className="text-blue-500" />
          What are Description Lists?
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Description lists (<code>&lt;dl&gt;</code>) in HTML are used to
            represent a list of terms and their corresponding descriptions. This
            element is perfect for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Glossaries and dictionaries</li>
            <li>Metadata displays (key-value pairs)</li>
            <li>FAQ sections</li>
            <li>Product specifications</li>
            <li>Any content that pairs terms with explanations</li>
          </ul>
          
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Semantically associates terms with their definitions</li>
              <li>Supports multiple descriptions for a single term</li>
              <li>Flexible styling options with CSS</li>
              <li>Can be nested or combined with other list types</li>
              <li>Improves accessibility for term-definition content</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold mb-2 text-lg">Interview & Exam Preparation</h3>
            <p className="mb-2">
              <strong>Common Interview Questions:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>What is the purpose of the &lt;dl&gt; element in HTML?</li>
              <li>How does a description list differ from ordered/unordered lists?</li>
              <li>When would you use multiple &lt;dd&gt; elements for a single &lt;dt&gt;?</li>
              <li>How would you style a description list to display horizontally?</li>
              <li>What are the accessibility benefits of using description lists?</li>
            </ul>
            <p className="mb-2">
              <strong>Key Concepts to Remember:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Description lists are semantic HTML elements specifically for term-definition pairs</li>
              <li>They consist of &lt;dt&gt; (term) and &lt;dd&gt; (description) elements</li>
              <li>Each &lt;dt&gt; can have one or more &lt;dd&gt; elements</li>
              <li>Modern CSS Grid/Flexbox makes horizontal layouts easy</li>
              <li>Screen readers understand the term-definition relationship</li>
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
            Description List Basics
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

      {/* Advanced Techniques */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("attributes")}
          aria-expanded={expandedSections["attributes"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-purple-500" />
            Advanced Layout Techniques
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["attributes"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["attributes"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <FaList className="text-orange-500" />
            Nesting and Combining Lists
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
                Description List Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with description lists in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Description List Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different use cases
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
                      Term-definition pairs
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Multiple Descriptions
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      One term, many definitions
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Layouts
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Horizontal, card, etc.
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
                <strong>Q:</strong> What is the semantic purpose of the &lt;dl&gt; element?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> The &lt;dl&gt; element is specifically designed for associating terms (&lt;dt&gt;) with their descriptions (&lt;dd&gt;), making it semantically appropriate for glossaries, metadata, and other term-definition content.
                </p>
              </li>
              <li>
                <strong>Q:</strong> How would you style a description list to display terms and descriptions side by side?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> Using CSS Grid with <code>grid-template-columns: max-content auto;</code> on the &lt;dl&gt; and assigning &lt;dt&gt; to column 1 and &lt;dd&gt; to column 2 creates a clean side-by-side layout.
                </p>
              </li>
              <li>
                <strong>Q:</strong> When would you choose a description list over a table for displaying key-value pairs?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> Description lists are more semantic for simple term-description relationships, while tables are better for complex data with multiple related values. DLs are also more accessible for screen readers in these cases.
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
                <strong>Semantic Structure:</strong> &lt;dl&gt; is for term-description pairs, &lt;ul&gt;/&lt;ol&gt; are for general lists
              </li>
              <li>
                <strong>Multiple Descriptions:</strong> A single &lt;dt&gt; can have multiple &lt;dd&gt; elements
              </li>
              <li>
                <strong>Accessibility:</strong> Screen readers announce the relationship between terms and descriptions
              </li>
              <li>
                <strong>Styling Flexibility:</strong> Modern CSS allows for horizontal, card, and other creative layouts
              </li>
              <li>
                <strong>Common Uses:</strong> Glossaries, metadata displays, FAQs, and specifications
              </li>
            </ul>
            
            <h3 className="font-bold text-lg mt-4 mb-2 text-gray-800 dark:text-gray-200">
              Practical Scenarios
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Creating a product specification sheet</li>
              <li>Building an accessible FAQ section</li>
              <li>Displaying metadata like author, date, etc.</li>
              <li>Implementing a glossary of technical terms</li>
              <li>Showing key-value pairs in a settings panel</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/unordered-list"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/tables"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}