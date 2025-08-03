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

export default function HTMLColspanRowspanPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    advanced: true,
    examples: true,
    accessibility: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Colspan & Rowspan Guide</title>
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
      text-align: center;
    }
    th {
      background-color: #4a6ee0;
      color: white;
    }
    .header-cell {
      background-color: #2c3e50;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Colspan & Rowspan Guide</h1>
    
    <!-- Basic Colspan Example -->
    <section class="example">
      <h2>Basic Colspan Example</h2>
      <table>
        <tr>
          <th colspan="2">Employee Details</th>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>johndoe@example.com</td>
        </tr>
      </table>
      
      <pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th colspan="2"&gt;Employee Details&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;John Doe&lt;/td&gt;
    &lt;td&gt;johndoe@example.com&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Basic Rowspan Example -->
    <section class="example">
      <h2>Basic Rowspan Example</h2>
      <table>
        <tr>
          <th rowspan="2">Department</th>
          <th>Employees</th>
        </tr>
        <tr>
          <td>25</td>
        </tr>
      </table>
      
      <pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th rowspan="2"&gt;Department&lt;/th&gt;
    &lt;th&gt;Employees&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;25&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Combined Example -->
    <section class="example">
      <h2>Combined Colspan & Rowspan</h2>
      <table>
        <tr>
          <th rowspan="2">Name</th>
          <th colspan="2">Contact</th>
        </tr>
        <tr>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tr>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td>555-1234</td>
        </tr>
      </table>
      
      <pre><code>&lt;table&gt;
  &lt;tr&gt;
    &lt;th rowspan="2"&gt;Name&lt;/th&gt;
    &lt;th colspan="2"&gt;Contact&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;th&gt;Email&lt;/th&gt;
    &lt;th&gt;Phone&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;John Doe&lt;/td&gt;
    &lt;td&gt;john@example.com&lt;/td&gt;
    &lt;td&gt;555-1234&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</code></pre>
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

  const basicExamples = [
    {
      title: "Basic Colspan",
      description: "Header spanning multiple columns",
      code: `<table>
  <tr>
    <th colspan="2">Employee Details</th>
  </tr>
  <tr>
    <td>John Doe</td>
    <td>johndoe@example.com</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[300px] border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th
                  className="bg-blue-600 text-white p-2 border border-gray-300"
                  colSpan={2}
                >
                  Employee Details
                </th>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">John Doe</td>
                <td className="p-2 border border-gray-300">
                  johndoe@example.com
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Basic Rowspan",
      description: "Cell spanning multiple rows",
      code: `<table>
  <tr>
    <th rowspan="2">Department</th>
    <th>Employees</th>
  </tr>
  <tr>
    <td>25</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[300px] border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th
                  className="bg-blue-600 text-white p-2 border border-gray-300"
                  rowSpan={2}
                >
                  Department
                </th>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Employees
                </th>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">25</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Combined Example",
      description: "Using both colspan and rowspan together",
      code: `<table>
  <tr>
    <th rowspan="2">Name</th>
    <th colspan="2">Contact</th>
  </tr>
  <tr>
    <th>Email</th>
    <th>Phone</th>
  </tr>
  <tr>
    <td>John Doe</td>
    <td>john@example.com</td>
    <td>555-1234</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[300px] border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th
                  className="bg-blue-600 text-white p-2 border border-gray-300"
                  rowSpan={2}
                >
                  Name
                </th>
                <th
                  className="bg-blue-600 text-white p-2 border border-gray-300"
                  colSpan={2}
                >
                  Contact
                </th>
              </tr>
              <tr>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Email
                </th>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Phone
                </th>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">John Doe</td>
                <td className="p-2 border border-gray-300">john@example.com</td>
                <td className="p-2 border border-gray-300">555-1234</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  const advancedExamples = [
    {
      title: "Complex Layout",
      description: "Advanced table with multiple spans",
      code: `<table>
  <tr>
    <th rowspan="2">Product</th>
    <th colspan="3">Quarterly Sales</th>
  </tr>
  <tr>
    <th>Q1</th>
    <th>Q2</th>
    <th>Q3</th>
  </tr>
  <tr>
    <td rowspan="2">Laptops</td>
    <td>$120,000</td>
    <td>$135,000</td>
    <td>$150,000</td>
  </tr>
  <tr>
    <td colspan="3">Total: $405,000</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th
                  className="bg-gray-800 text-white p-2 border border-gray-300"
                  rowSpan={2}
                >
                  Product
                </th>
                <th
                  className="bg-gray-800 text-white p-2 border border-gray-300"
                  colSpan={3}
                >
                  Quarterly Sales
                </th>
              </tr>
              <tr>
                <th className="bg-gray-800 text-white p-2 border border-gray-300">
                  Q1
                </th>
                <th className="bg-gray-800 text-white p-2 border border-gray-300">
                  Q2
                </th>
                <th className="bg-gray-800 text-white p-2 border border-gray-300">
                  Q3
                </th>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300" rowSpan={2}>
                  Laptops
                </td>
                <td className="p-2 border border-gray-300">$120,000</td>
                <td className="p-2 border border-gray-300">$135,000</td>
                <td className="p-2 border border-gray-300">$150,000</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300" colSpan={3}>
                  Total: $405,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Schedule Table",
      description: "Timetable with row and column spans",
      code: `<table>
  <tr>
    <th>Time</th>
    <th>Monday</th>
    <th>Tuesday</th>
    <th>Wednesday</th>
  </tr>
  <tr>
    <td rowspan="2">9:00-11:00</td>
    <td>Math</td>
    <td rowspan="3">Science Lab</td>
    <td>History</td>
  </tr>
  <tr>
    <td>Physics</td>
    <td>Geography</td>
  </tr>
  <tr>
    <td>11:00-12:00</td>
    <td colspan="2">Break</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] border-collapse border border-gray-300">
            <tbody>
              <tr>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Time
                </th>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Monday
                </th>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Tuesday
                </th>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Wednesday
                </th>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300" rowSpan={2}>
                  9:00-11:00
                </td>
                <td className="p-2 border border-gray-300">Math</td>
                <td className="p-2 border border-gray-300" rowSpan={3}>
                  Science Lab
                </td>
                <td className="p-2 border border-gray-300">History</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">Physics</td>
                <td className="p-2 border border-gray-300">Geography</td>
              </tr>
              <tr>
                <td className="p-2 border border-gray-300">11:00-12:00</td>
                <td className="p-2 border border-gray-300" colSpan={2}>
                  Break
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  const accessibilityTips = [
    {
      title: "Accessible Complex Tables",
      description: "Using scope, headers, and ARIA attributes",
      code: `<table>
  <caption>Monthly Budget</caption>
  <thead>
    <tr>
      <th id="category" scope="col">Category</th>
      <th id="jan" scope="col">January</th>
      <th id="feb" scope="col">February</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="income" headers="category" scope="row">Income</th>
      <td headers="income jan">$5,000</td>
      <td headers="income feb">$5,200</td>
    </tr>
    <tr>
      <th id="expenses" headers="category" scope="rowgroup" colspan="2">Expenses</th>
    </tr>
    <tr>
      <th id="rent" headers="category expenses" scope="row">Rent</th>
      <td headers="rent jan">$1,200</td>
      <td headers="rent feb">$1,200</td>
    </tr>
  </tbody>
</table>`,
      preview: (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px] border-collapse border border-gray-300">
            <caption className="sr-only">Monthly Budget</caption>
            <thead>
              <tr>
                <th
                  className="p-2 border border-gray-300"
                  id="category"
                  scope="col"
                >
                  Category
                </th>
                <th className="p-2 border border-gray-300" id="jan" scope="col">
                  January
                </th>
                <th className="p-2 border border-gray-300" id="feb" scope="col">
                  February
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  className="p-2 border border-gray-300"
                  id="income"
                  headers="category"
                  scope="row"
                >
                  Income
                </th>
                <td className="p-2 border border-gray-300" headers="income jan">
                  $5,000
                </td>
                <td className="p-2 border border-gray-300" headers="income feb">
                  $5,200
                </td>
              </tr>
              <tr>
                <th
                  className="p-2 border border-gray-300"
                  id="expenses"
                  headers="category"
                  scope="rowgroup"
                  colSpan={2}
                >
                  Expenses
                </th>
              </tr>
              <tr>
                <th
                  className="p-2 border border-gray-300"
                  id="rent"
                  headers="category expenses"
                  scope="row"
                >
                  Rent
                </th>
                <td className="p-2 border border-gray-300" headers="rent jan">
                  $1,200
                </td>
                <td className="p-2 border border-gray-300" headers="rent feb">
                  $1,200
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Colspan & Rowspan Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create complex table layouts using colspan and rowspan
          attributes
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaTable className="text-blue-500" />
          Introduction to Colspan & Rowspan
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The <code>colspan</code> and <code>rowspan</code> attributes allow
          table cells to span multiple columns or rows, enabling you to create
          more complex and visually appealing table layouts. These attributes
          are essential for creating headers that span multiple columns,
          vertical labels, and merged cells in data tables.
        </p>
        <button
          onClick={handleOpenEditor}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Basic Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable className="text-blue-500" />
            Basic Examples
          </h2>
          <button
            onClick={() => toggleSection("basics")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.basics ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.basics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {basicExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        copyToClipboard(example.code, example.title)
                      }
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={example.code}
                      language="html"
                      placeholder=""
                      padding={15}
                      style={{
                        fontSize: 14,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      className="rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Advanced Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable className="text-blue-500" />
            Advanced Examples
          </h2>
          <button
            onClick={() => toggleSection("advanced")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.advanced ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.advanced && (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {advancedExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        copyToClipboard(example.code, example.title)
                      }
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={example.code}
                      language="html"
                      placeholder=""
                      padding={15}
                      style={{
                        fontSize: 14,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      className="rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Accessibility Tips */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Accessibility Tips
          </h2>
          <button
            onClick={() => toggleSection("accessibility")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${
                expandedSections.accessibility ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {expandedSections.accessibility && (
          <div className="grid grid-cols-1 gap-6">
            {accessibilityTips.map((tip, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {tip.description}
                  </p>
                  <div className="mb-4">{tip.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(tip.code, tip.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === tip.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={tip.code}
                      language="html"
                      placeholder=""
                      padding={15}
                      style={{
                        fontSize: 14,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                      }}
                      className="rounded-b-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/table-styles"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/forms"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
