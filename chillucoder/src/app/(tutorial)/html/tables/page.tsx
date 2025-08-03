"use client";

import {
  FaTable,
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

export default function HTMLTablesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    advanced: true,
    examples: true,
    accessibility: true,
    styling: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Tables Examples</title>
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
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 15px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #4a6ee0;
      color: white;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .responsive-table {
      overflow-x: auto;
    }
    .zebra-table {
      border-collapse: separate;
      border-spacing: 0;
    }
    .zebra-table th {
      background-color: #2c3e50;
    }
    .zebra-table tr:nth-child(even) {
      background-color: #ecf0f1;
    }
    .zebra-table tr:hover {
      background-color: #bdc3c7;
    }
    .calendar {
      width: 100%;
      text-align: center;
    }
    .calendar th {
      background-color: #e74c3c;
      padding: 10px;
    }
    .calendar td {
      height: 40px;
      vertical-align: middle;
    }
    .today {
      background-color: #e74c3c;
      color: white;
      font-weight: bold;
      border-radius: 50%;
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Tables Guide</h1>
    
    <!-- Basic Table -->
    <section class="example">
      <h2>Basic Table Structure</h2>
      <table>
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
      
      <pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Header 1&lt;/th&gt;
    &lt;th&gt;Header 2&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Row 1, Cell 1&lt;/td&gt;
    &lt;td&gt;Row 1, Cell 2&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Row 2, Cell 1&lt;/td&gt;
    &lt;td&gt;Row 2, Cell 2&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Advanced Table -->
    <section class="example">
      <h2>Advanced Table with Semantic Elements</h2>
      <table>
        <caption>Monthly Sales Report</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Sales</th>
            <th scope="col">Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">January</th>
            <td>$10,000</td>
            <td>$3,000</td>
          </tr>
          <tr>
            <th scope="row">February</th>
            <td>$12,000</td>
            <td>$3,600</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>$22,000</td>
            <td>$6,600</td>
          </tr>
        </tfoot>
      </table>
      
      <pre><code>&lt;table&gt;
  &lt;caption&gt;Monthly Sales Report&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th scope="col"&gt;Month&lt;/th&gt;
      &lt;th scope="col"&gt;Sales&lt;/th&gt;
      &lt;th scope="col"&gt;Profit&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;January&lt;/th&gt;
      &lt;td&gt;$10,000&lt;/td&gt;
      &lt;td&gt;$3,000&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;
      &lt;th scope="row"&gt;Total&lt;/th&gt;
      &lt;td&gt;$22,000&lt;/td&gt;
      &lt;td&gt;$6,600&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Responsive Table -->
    <section class="example">
      <h2>Responsive Table</h2>
      <div class="responsive-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>(123) 456-7890</td>
              <td>123 Main St</td>
              <td>Anytown</td>
              <td>CA</td>
              <td>90210</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <pre><code>&lt;style&gt;
.responsive-table {
  overflow-x: auto;
}
&lt;/style&gt;

&lt;div class="responsive-table"&gt;
  &lt;table&gt;
    &lt;!-- table content --&gt;
  &lt;/table&gt;
&lt;/div&gt;</code></pre>
    </section>
    
    <!-- Zebra Striped Table -->
    <section class="example">
      <h2>Zebra Striped Table</h2>
      <table class="zebra-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Laptop</td>
            <td>$999</td>
            <td>15</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>$699</td>
            <td>32</td>
          </tr>
          <tr>
            <td>Tablet</td>
            <td>$399</td>
            <td>12</td>
          </tr>
        </tbody>
      </table>
      
      <pre><code>&lt;style&gt;
.zebra-table {
  border-collapse: separate;
  border-spacing: 0;
}
.zebra-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
&lt;/style&gt;

&lt;table class="zebra-table"&gt;
  &lt;!-- table content --&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Calendar Table -->
    <section class="example">
      <h2>Calendar Table</h2>
      <table class="calendar">
        <caption>July 2023</caption>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
          </tr>
          <tr>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
            <td>13</td>
            <td>14</td>
            <td>15</td>
          </tr>
          <tr>
            <td>16</td>
            <td>17</td>
            <td>18</td>
            <td>19</td>
            <td>20</td>
            <td>21</td>
            <td>22</td>
          </tr>
          <tr>
            <td>23</td>
            <td>24</td>
            <td>25</td>
            <td>26</td>
            <td>27</td>
            <td>28</td>
            <td>29</td>
          </tr>
          <tr>
            <td>30</td>
            <td>31</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
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

  const tableBasics = [
    {
      title: "Basic Table Structure",
      description: "Simple table with rows and cells",
      example: `<table>
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Row 1, Cell 1</td>
    <td>Row 1, Cell 2</td>
  </tr>
</table>`,
      usage: "For displaying simple tabular data",
    },
    {
      title: "Table with Caption",
      description: "Table with a descriptive caption",
      example: `<table>
  <caption>Monthly Expenses</caption>
  <tr>
    <th>Category</th>
    <th>Amount</th>
  </tr>
  <tr>
    <td>Food</td>
    <td>$300</td>
  </tr>
</table>`,
      usage: "When the table needs a title or description",
    },
    {
      title: "Cell Spanning",
      description: "Cells that span multiple columns or rows",
      example: `<table>
  <tr>
    <th colspan="2">Expenses</th>
  </tr>
  <tr>
    <td rowspan="2">Food</td>
    <td>$200</td>
  </tr>
  <tr>
    <td>$150</td>
  </tr>
</table>`,
      usage: "For merging cells horizontally or vertically",
    },
  ];

  const advancedFeatures = [
    {
      title: "Semantic Table Structure",
      description: "Using thead, tbody, and tfoot elements",
      example: `<table>
  <thead>
    <tr>
      <th>Month</th>
      <th>Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$1000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$1000</td>
    </tr>
  </tfoot>
</table>`,
      note: "Improves accessibility and styling control",
    },
    {
      title: "Scope Attribute",
      description: "Defining relationships between headers and cells",
      example: `<table>
  <tr>
    <th scope="col">Product</th>
    <th scope="col">Price</th>
  </tr>
  <tr>
    <th scope="row">Laptop</th>
    <td>$999</td>
  </tr>
</table>`,
      note: "Essential for screen readers to understand table structure",
    },
    {
      title: "Responsive Tables",
      description: "Making tables work on small screens",
      example: `<style>
.responsive-table {
  overflow-x: auto;
}
</style>

<div class="responsive-table">
  <table>
    <!-- wide table content -->
  </table>
</div>`,
      note: "Wraps table in a scrollable container on small screens",
    },
  ];

  const practicalExamples = [
    {
      title: "Product Comparison Table",
      code: `<h2>Smartphone Comparison</h2>
<table>
  <thead>
    <tr>
      <th scope="col">Feature</th>
      <th scope="col">Model A</th>
      <th scope="col">Model B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Price</th>
      <td>$699</td>
      <td>$899</td>
    </tr>
    <tr>
      <th scope="row">Screen Size</th>
      <td>6.1"</td>
      <td>6.7"</td>
    </tr>
    <tr>
      <th scope="row">Battery Life</th>
      <td>18 hours</td>
      <td>24 hours</td>
    </tr>
  </tbody>
</table>`,
    },
    {
      title: "Class Schedule",
      code: `<h2>Weekly Class Schedule</h2>
<table>
  <thead>
    <tr>
      <th scope="col">Time</th>
      <th scope="col">Monday</th>
      <th scope="col">Wednesday</th>
      <th scope="col">Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">9:00 AM</th>
      <td>Math</td>
      <td>Science</td>
      <td>History</td>
    </tr>
    <tr>
      <th scope="row">11:00 AM</th>
      <td>English</td>
      <td>Math</td>
      <td>Art</td>
    </tr>
  </tbody>
</table>`,
    },
    {
      title: "Pricing Plan Table",
      code: `<h2>Subscription Plans</h2>
<table class="pricing-table">
  <thead>
    <tr>
      <th scope="col">Plan</th>
      <th scope="col">Basic</th>
      <th scope="col">Pro</th>
      <th scope="col">Enterprise</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Price</th>
      <td>$9.99/mo</td>
      <td>$29.99/mo</td>
      <td>Custom</td>
    </tr>
    <tr>
      <th scope="row">Users</th>
      <td>1</td>
      <td>5</td>
      <td>Unlimited</td>
    </tr>
  </tbody>
</table>

<style>
.pricing-table {
  width: 100%;
  border-collapse: collapse;
}
.pricing-table th, .pricing-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}
.pricing-table th {
  background-color: #4a6ee0;
  color: white;
}
.pricing-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>`,
    },
  ];

  const accessibilityFeatures = [
    {
      title: "Table with Caption and Summary",
      description: "Providing context for screen readers",
      example: `<table aria-describedby="table-summary">
  <caption>Monthly Sales by Region</caption>
  <tr>
    <th scope="col">Region</th>
    <th scope="col">Sales</th>
  </tr>
  <tr>
    <th scope="row">North</th>
    <td>$10,000</td>
  </tr>
</table>
<p id="table-summary" class="visually-hidden">
  This table shows monthly sales figures by geographic region
</p>`,
      note: "The summary is visually hidden but available to screen readers",
    },
    {
      title: "Complex Table with Headers",
      description: "Multiple levels of headers for complex data",
      example: `<table>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Product</th>
      <th scope="colgroup" colspan="2">Quarter 1</th>
    </tr>
    <tr>
      <th scope="col">Jan</th>
      <th scope="col">Feb</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Widget A</th>
      <td>120</td>
      <td>150</td>
    </tr>
  </tbody>
</table>`,
      note: "Proper scope attributes are crucial for accessibility",
    },
  ];

  const stylingTechniques = [
    {
      title: "Zebra Striping",
      description: "Alternating row colors for better readability",
      example: `<style>
.striped-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>

<table class="striped-table">
  <!-- table content -->
</table>`,
      note: "Improves readability, especially for wide tables",
    },
    {
      title: "Hover Effects",
      description: "Highlighting rows on hover",
      example: `<style>
.hover-table tr:hover {
  background-color: #e6f7ff;
  cursor: pointer;
}
</style>

<table class="hover-table">
  <!-- table content -->
</table>`,
      note: "Enhances user interaction experience",
    },
    {
      title: "Border Collapse",
      description: "Controlling table borders",
      example: `<style>
.collapsed-borders {
  border-collapse: collapse;
}
.collapsed-borders th, 
.collapsed-borders td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>

<table class="collapsed-borders">
  <!-- table content -->
</table>`,
      note: "Creates cleaner, more professional-looking tables",
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Tables Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create accessible, semantic, and styled tables in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaTable className="text-blue-500" />
          What are HTML Tables?
        </h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            HTML tables (<code>&lt;table&gt;</code>) are used to display tabular
            data in rows and columns. Tables should be used for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Displaying data that has a natural tabular structure</li>
            <li>Showing relationships between different data points</li>
            <li>Presenting financial data, schedules, or comparisons</li>
            <li>Creating calendars, pricing charts, or statistical data</li>
          </ul>
          
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Semantic structure with thead, tbody, and tfoot</li>
              <li>Row and cell spanning with colspan and rowspan</li>
              <li>Accessibility features like scope and captions</li>
              <li>Responsive design techniques</li>
              <li>Extensive CSS styling possibilities</li>
            </ul>
          </div>
          
          <div className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="font-bold mb-2 text-lg">Interview & Exam Preparation</h3>
            <p className="mb-2">
              <strong>Common Interview Questions:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>When should you use a table versus other HTML elements?</li>
              <li>How do you make tables accessible for screen readers?</li>
              <li>What are the semantic elements of an HTML table?</li>
              <li>How would you create a responsive table?</li>
              <li>What are the differences between colspan and rowspan?</li>
            </ul>
            <p className="mb-2">
              <strong>Key Concepts to Remember:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tables are for tabular data, not page layout</li>
              <li>Always use proper heading structure with scope attributes</li>
              <li>Include captions for complex tables</li>
              <li>Consider mobile users with responsive techniques</li>
              <li>Test with screen readers for accessibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Table Basics */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("basics")}
          aria-expanded={expandedSections["basics"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Table Basics
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["basics"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["basics"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tableBasics.map((item, index) => (
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

      {/* Advanced Features */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("advanced")}
          aria-expanded={expandedSections["advanced"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-purple-500" />
            Advanced Table Features
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["advanced"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["advanced"] && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {advancedFeatures.map((item, index) => (
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
            Practical Table Examples
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

      {/* Accessibility Features */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("accessibility")}
          aria-expanded={expandedSections["accessibility"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-orange-500" />
            Table Accessibility
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["accessibility"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["accessibility"] && (
          <div className="space-y-6">
            {accessibilityFeatures.map((item, index) => (
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

      {/* Styling Techniques */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("styling")}
          aria-expanded={expandedSections["styling"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-green-500" />
            Table Styling Techniques
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
                Table Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with tables in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Table Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering different table scenarios
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
                      Basic Tables
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      Simple data display
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Advanced Features
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      colspan, rowspan
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Accessibility
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      scope, captions
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-md border border-gray-200 dark:border-gray-600 text-center">
                    <div className="font-mono text-sm text-purple-600 dark:text-purple-400">
                      Styling
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      CSS examples
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
                <strong>Q:</strong> When should you use a table versus CSS for layout?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> Tables should only be used for tabular data, not for page layout. For layout, use CSS Flexbox or Grid which are more semantic and responsive.
                </p>
              </li>
              <li>
                <strong>Q:</strong> How do you make complex tables accessible?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> Use proper scope attributes, headers/id associations, captions, and ARIA attributes where needed. Test with screen readers.
                </p>
              </li>
              <li>
                <strong>Q:</strong> What are the semantic elements of an HTML table?
                <p className="text-sm mt-1 bg-gray-50 dark:bg-gray-600 p-2 rounded">
                  <strong>A:</strong> &lt;table&gt;, &lt;caption&gt;, &lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;, &lt;tr&gt;, &lt;th&gt;, and &lt;td&gt;.
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
                <strong>Semantic Structure:</strong> Always use proper table elements for their intended purpose
              </li>
              <li>
                <strong>Accessibility:</strong> Tables must be navigable and understandable with screen readers
              </li>
              <li>
                <strong>Responsiveness:</strong> Tables need special handling on mobile devices
              </li>
              <li>
                <strong>Performance:</strong> Very large tables can impact performance - consider pagination
              </li>
              <li>
                <strong>Styling:</strong> Modern CSS provides many table styling options
              </li>
            </ul>
            
            <h3 className="font-bold text-lg mt-4 mb-2 text-gray-800 dark:text-gray-200">
              Practical Scenarios
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Displaying financial reports</li>
              <li>Creating comparison charts</li>
              <li>Showing schedules or calendars</li>
              <li>Presenting statistical data</li>
              <li>Building data-rich admin interfaces</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/description-list"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/borders"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}