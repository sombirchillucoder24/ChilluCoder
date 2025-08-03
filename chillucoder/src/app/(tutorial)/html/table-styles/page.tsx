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

export default function HTMLTableStylesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    advanced: true,
    examples: true,
    accessibility: true,
    responsive: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Table Styles</title>
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
    /* Basic Table Styles */
    .basic-table {
      border-collapse: collapse;
      width: 100%;
      margin: 15px 0;
    }
    .basic-table th, .basic-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .basic-table th {
      background-color: #4a6ee0;
      color: white;
    }
    /* Zebra Striping */
    .zebra-table {
      border-collapse: collapse;
      width: 100%;
    }
    .zebra-table th {
      background-color: #2c3e50;
      color: white;
      padding: 10px;
    }
    .zebra-table td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }
    .zebra-table tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .zebra-table tr:hover {
      background-color: #e6e6e6;
    }
    /* Hover Effects */
    .hover-table {
      border-collapse: collapse;
      width: 100%;
    }
    .hover-table th, .hover-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .hover-table tr:hover {
      background-color: #f5f5f5;
      transform: scale(1.01);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    /* Condensed Table */
    .condensed-table {
      border-collapse: collapse;
      width: 100%;
      font-size: 0.9em;
    }
    .condensed-table th, .condensed-table td {
      padding: 6px;
      border: 1px solid #ddd;
    }
    .condensed-table th {
      background-color: #34495e;
      color: white;
    }
    /* Borderless Table */
    .borderless-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }
    .borderless-table th {
      background-color: #4a6ee0;
      color: white;
      padding: 10px;
      text-align: left;
    }
    .borderless-table td {
      padding: 8px;
      border-bottom: 1px solid #eee;
    }
    /* Responsive Table */
    .responsive-table-container {
      overflow-x: auto;
      margin: 15px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .responsive-table {
      width: 100%;
      min-width: 600px;
    }
    .responsive-table th {
      background-color: #3498db;
      color: white;
      padding: 10px;
    }
    .responsive-table td {
      padding: 8px;
      border-bottom: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Table Styling Guide</h1>
    
    <!-- Basic Table Styles -->
    <section class="example">
      <h2>Basic Table Styles</h2>
      <table class="basic-table">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        <tr>
          <td>Chillu Coder</td>
          <td>chillu@example.com</td>
          <td>Admin</td>
        </tr>
        <tr>
          <td>Chullu</td>
          <td>Chullu01@example.com</td>
          <td>User</td>
        </tr>
      </table>
      
      <pre><code>&lt;style&gt;
.basic-table {
  border-collapse: collapse;
  width: 100%;
}
.basic-table th, .basic-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.basic-table th {
  background-color: #4a6ee0;
  color: white;
}
&lt;/style&gt;

&lt;table class="basic-table"&gt;
  &lt;!-- table content --&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Zebra Striping -->
    <section class="example">
      <h2>Zebra Striping</h2>
      <table class="zebra-table">
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
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
      </table>
      
      <pre><code>&lt;style&gt;
.zebra-table {
  border-collapse: collapse;
  width: 100%;
}
.zebra-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
.zebra-table tr:hover {
  background-color: #e6e6e6;
}
&lt;/style&gt;

&lt;table class="zebra-table"&gt;
  &lt;!-- table content --&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Hover Effects -->
    <section class="example">
      <h2>Hover Effects</h2>
      <table class="hover-table">
        <tr>
          <th>Date</th>
          <th>Event</th>
          <th>Location</th>
        </tr>
        <tr>
          <td>June 15</td>
          <td>Conference</td>
          <td>New York</td>
        </tr>
        <tr>
          <td>July 22</td>
          <td>Workshop</td>
          <td>Chicago</td>
        </tr>
      </table>
      
      <pre><code>&lt;style&gt;
.hover-table tr:hover {
  background-color: #f5f5f5;
  transform: scale(1.01);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
&lt;/style&gt;

&lt;table class="hover-table"&gt;
  &lt;!-- table content --&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Condensed Table -->
    <section class="example">
      <h2>Condensed Table</h2>
      <table class="condensed-table">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
        <tr>
          <td>001</td>
          <td>Project Alpha</td>
          <td>Active</td>
        </tr>
        <tr>
          <td>002</td>
          <td>Project Beta</td>
          <td>Completed</td>
        </tr>
      </table>
      
      <pre><code>&lt;style&gt;
.condensed-table {
  border-collapse: collapse;
  font-size: 0.9em;
}
.condensed-table th, .condensed-table td {
  padding: 6px;
}
&lt;/style&gt;

&lt;table class="condensed-table"&gt;
  &lt;!-- table content --&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Borderless Table -->
    <section class="example">
      <h2>Borderless Table</h2>
      <table class="borderless-table">
        <tr>
          <th>Category</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Views</td>
          <td>1,245</td>
        </tr>
        <tr>
          <td>Clicks</td>
          <td>328</td>
        </tr>
      </table>
      
      <pre><code>&lt;style&gt;
.borderless-table {
  border-collapse: separate;
  border-spacing: 0;
}
.borderless-table td {
  border-bottom: 1px solid #eee;
}
&lt;/style&gt;

&lt;table class="borderless-table"&gt;
  &lt;!-- table content --&gt;
&lt;/table&gt;</code></pre>
    </section>
    
    <!-- Responsive Table -->
    <section class="example">
      <h2>Responsive Table</h2>
      <div class="responsive-table-container">
        <table class="responsive-table">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Age</th>
            <th>Start Date</th>
            <th>Salary</th>
          </tr>
          <tr>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>61</td>
            <td>2011-04-25</td>
            <td>$320,800</td>
          </tr>
          <tr>
            <td>Garrett Winters</td>
            <td>Accountant</td>
            <td>Tokyo</td>
            <td>63</td>
            <td>2011-07-25</td>
            <td>$170,750</td>
          </tr>
        </table>
      </div>
      
      <pre><code>&lt;style&gt;
.responsive-table-container {
  overflow-x: auto;
}
.responsive-table {
  min-width: 600px;
}
&lt;/style&gt;

&lt;div class="responsive-table-container"&gt;
  &lt;table class="responsive-table"&gt;
    &lt;!-- table content --&gt;
  &lt;/table&gt;
&lt;/div&gt;</code></pre>
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

  const basicStyles = [
    {
      title: "Basic Table Styling",
      description: "Simple table with borders and header styling",
      code: `<style>
.basic-table {
  border-collapse: collapse;
  width: 100%;
}
.basic-table th, .basic-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.basic-table th {
  background-color: #4a6ee0;
  color: white;
}
</style>

<table class="basic-table">
  <tr>
    <th>Name</th>
    <th>Email</th>
  </tr>
  <tr>
    <td>Chillu Coder</td>
    <td>chillu@example.com</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden border border-gray-200 rounded">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Name
                </th>
                <th className="bg-blue-600 text-white p-2 border border-gray-300">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-300">Chillu Coder</td>
                <td className="p-2 border border-gray-300">chillu@example.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Zebra Striping",
      description: "Alternating row colors for better readability",
      code: `<style>
.zebra-table {
  border-collapse: collapse;
  width: 100%;
}
.zebra-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
.zebra-table tr:hover {
  background-color: #e6e6e6;
}
</style>

<table class="zebra-table">
  <tr>
    <th>Product</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Laptop</td>
    <td>$999</td>
  </tr>
  <tr>
    <td>Phone</td>
    <td>$699</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden border border-gray-200 rounded">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-800 text-white p-2">Product</th>
                <th className="bg-gray-800 text-white p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b border-gray-300">Laptop</td>
                <td className="p-2 border-b border-gray-300">$999</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-2 border-b border-gray-300">Phone</td>
                <td className="p-2 border-b border-gray-300">$699</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Hover Effects",
      description: "Highlight rows on hover for better interactivity",
      code: `<style>
.hover-table {
  border-collapse: collapse;
  width: 100%;
}
.hover-table tr:hover {
  background-color: #f5f5f5;
}
</style>

<table class="hover-table">
  <tr>
    <th>Date</th>
    <th>Event</th>
  </tr>
  <tr>
    <td>June 15</td>
    <td>Conference</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden border border-gray-200 rounded">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-300 text-left">Date</th>
                <th className="p-2 border-b border-gray-300 text-left">Event</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 transition-colors">
                <td className="p-2 border-b border-gray-300">June 15</td>
                <td className="p-2 border-b border-gray-300">Conference</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  const advancedStyles = [
    {
      title: "Condensed Table",
      description: "Compact table with reduced padding",
      code: `<style>
.condensed-table {
  border-collapse: collapse;
  font-size: 0.9em;
}
.condensed-table th, .condensed-table td {
  padding: 6px;
}
</style>

<table class="condensed-table">
  <tr>
    <th>ID</th>
    <th>Name</th>
  </tr>
  <tr>
    <td>001</td>
    <td>Project Alpha</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden border border-gray-200 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-gray-700 text-white p-1">ID</th>
                <th className="bg-gray-700 text-white p-1">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-1 border border-gray-300">001</td>
                <td className="p-1 border border-gray-300">Project Alpha</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Borderless Table",
      description: "Minimal table with subtle dividers",
      code: `<style>
.borderless-table {
  border-collapse: separate;
  border-spacing: 0;
}
.borderless-table td {
  border-bottom: 1px solid #eee;
}
</style>

<table class="borderless-table">
  <tr>
    <th>Category</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Views</td>
    <td>1,245</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-blue-600 text-white p-2 text-left">Category</th>
                <th className="bg-blue-600 text-white p-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b border-gray-200">Views</td>
                <td className="p-2 border-b border-gray-200">1,245</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Responsive Table",
      description: "Horizontal scrolling for small screens",
      code: `<style>
.responsive-container {
  overflow-x: auto;
}
.responsive-table {
  min-width: 600px;
}
</style>

<div class="responsive-container">
  <table class="responsive-table">
    <!-- Wide table content -->
  </table>
</div>`,
      preview: (
        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="bg-blue-500 text-white p-2">Column 1</th>
                <th className="bg-blue-500 text-white p-2">Column 2</th>
                <th className="bg-blue-500 text-white p-2">Column 3</th>
                <th className="bg-blue-500 text-white p-2">Column 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b border-gray-200">Data 1</td>
                <td className="p-2 border-b border-gray-200">Data 2</td>
                <td className="p-2 border-b border-gray-200">Data 3</td>
                <td className="p-2 border-b border-gray-200">Data 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  const practicalExamples = [
    {
      title: "Product Comparison Table",
      description: "Styled table for comparing product features",
      code: `<style>
.comparison-table {
  border-collapse: collapse;
  width: 100%;
}
.comparison-table th {
  background-color: #2c3e50;
  color: white;
  padding: 12px;
  text-align: left;
}
.comparison-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.comparison-table tr:nth-child(even) {
  background-color: #f8f9fa;
}
.comparison-table .highlight {
  background-color: #fffacd;
}
</style>

<table class="comparison-table">
  <tr>
    <th>Feature</th>
    <th>Basic</th>
    <th class="highlight">Pro</th>
    <th>Enterprise</th>
  </tr>
  <tr>
    <td>Storage</td>
    <td>10GB</td>
    <td class="highlight">50GB</td>
    <td>Unlimited</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden border border-gray-200 rounded">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-800 text-white p-3 text-left">Feature</th>
                <th className="bg-gray-800 text-white p-3 text-left">Basic</th>
                <th className="bg-yellow-100 p-3 text-left">Pro</th>
                <th className="bg-gray-800 text-white p-3 text-left">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-3 border-b border-gray-200">Storage</td>
                <td className="p-3 border-b border-gray-200">10GB</td>
                <td className="p-3 border-b border-gray-200 bg-yellow-100">50GB</td>
                <td className="p-3 border-b border-gray-200">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Calendar Table",
      description: "Styled table for displaying calendar data",
      code: `<style>
.calendar {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}
.calendar th {
  background-color: #e74c3c;
  color: white;
  padding: 10px;
}
.calendar td {
  padding: 15px;
  border: 1px solid #ddd;
}
.calendar .today {
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
}
</style>

<table class="calendar">
  <tr>
    <th>Sun</th>
    <th>Mon</th>
    <th>Tue</th>
    <th>Wed</th>
    <th>Thu</th>
    <th>Fri</th>
    <th>Sat</th>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>1</td>
    <td class="today">2</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden border border-gray-200 rounded">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="bg-red-600 text-white p-2">Sun</th>
                <th className="bg-red-600 text-white p-2">Mon</th>
                <th className="bg-red-600 text-white p-2">Tue</th>
                <th className="bg-red-600 text-white p-2">Wed</th>
                <th className="bg-red-600 text-white p-2">Thu</th>
                <th className="bg-red-600 text-white p-2">Fri</th>
                <th className="bg-red-600 text-white p-2">Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-gray-300 h-12"></td>
                <td className="p-3 border border-gray-300"></td>
                <td className="p-3 border border-gray-300"></td>
                <td className="p-3 border border-gray-300"></td>
                <td className="p-3 border border-gray-300"></td>
                <td className="p-3 border border-gray-300">1</td>
                <td className="p-3 border border-gray-300 bg-red-600 text-white rounded-full">
                  2
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "Pricing Table",
      description: "Attractive table for displaying pricing plans",
      code: `<style>
.pricing-table {
  border-collapse: separate;
  border-spacing: 0 10px;
  width: 100%;
}
.pricing-table th {
  background-color: #4a6ee0;
  color: white;
  padding: 15px;
  text-align: center;
}
.pricing-table td {
  padding: 12px;
  text-align: center;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.pricing-table td:first-child {
  border-left: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
}
.pricing-table td:last-child {
  border-right: 1px solid #ddd;
  border-radius: 0 5px 5px 0;
}
.pricing-table .popular {
  background-color: #4a6ee0;
  color: white;
}
</style>

<table class="pricing-table">
  <tr>
    <th>Basic</th>
    <th class="popular">Pro</th>
    <th>Enterprise</th>
  </tr>
  <tr>
    <td>$9.99/mo</td>
    <td class="popular">$29.99/mo</td>
    <td>Custom</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden">
          <table className="w-full border-separate" style={{ borderSpacing: "0 10px" }}>
            <thead>
              <tr>
                <th className="bg-blue-600 text-white p-3 text-center">Basic</th>
                <th className="bg-blue-700 text-white p-3 text-center">Pro</th>
                <th className="bg-blue-600 text-white p-3 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-gray-50 p-3 border-t border-b border-l border-gray-300 rounded-l">
                  $9.99/mo
                </td>
                <td className="bg-blue-700 text-white p-3 border-t border-b border-gray-300">
                  $29.99/mo
                </td>
                <td className="bg-gray-50 p-3 border-t border-b border-r border-gray-300 rounded-r">
                  Custom
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  const accessibilityFeatures = [
    {
      title: "Accessible Table",
      description: "Table with proper scope and ARIA attributes",
      code: `<table aria-describedby="table-desc">
  <caption id="table-desc">Monthly Sales by Region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$10,000</td>
    </tr>
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
</style>`,
      preview: (
        <div className="overflow-hidden border border-gray-200 rounded">
          <table className="w-full border-collapse">
            <caption className="sr-only">Monthly Sales by Region</caption>
            <thead>
              <tr>
                <th className="p-2 border border-gray-300 text-left" scope="col">
                  Region
                </th>
                <th className="p-2 border border-gray-300 text-left" scope="col">
                  Sales
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-2 border border-gray-300 text-left" scope="row">
                  North
                </th>
                <td className="p-2 border border-gray-300">$10,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: "High Contrast Table",
      description: "Table designed for better visibility",
      code: `<style>
.high-contrast-table {
  border-collapse: collapse;
  width: 100%;
}
.high-contrast-table th {
  background-color: black;
  color: white;
  padding: 12px;
  border: 2px solid white;
}
.high-contrast-table td {
  padding: 10px;
  border: 2px solid black;
  background-color: white;
  color: black;
}
</style>

<table class="high-contrast-table">
  <tr>
    <th>Name</th>
    <th>Email</th>
  </tr>
  <tr>
    <td>Chillu Coder</td>
    <td>chillu@example.com</td>
  </tr>
</table>`,
      preview: (
        <div className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-black text-white p-3 border-2 border-white">
                  Name
                </th>
                <th className="bg-black text-white p-3 border-2 border-white">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-white text-black p-3 border-2 border-black">
                  Chillu Coder
                </td>
                <td className="bg-white text-black p-3 border-2 border-black">
                  chillu@example.com
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  const responsiveTechniques = [
    {
      title: "Stacked Responsive Table",
      description: "Table that stacks on small screens",
      code: `<style>
@media (max-width: 600px) {
  .stacked-table thead {
    display: none;
  }
  .stacked-table tr {
    display: block;
    margin-bottom: 15px;
    border: 1px solid #ddd;
  }
  .stacked-table td {
    display: block;
    text-align: right;
    padding-left: 50%;
    position: relative;
  }
  .stacked-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 10px;
    font-weight: bold;
  }
}
</style>

<table class="stacked-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Name">Chillu Coder</td>
      <td data-label="Email">chillu@example.com</td>
    </tr>
  </tbody>
</table>`,
      preview: (
        <div className="overflow-hidden">
          <div className="hidden sm:block">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border border-gray-300 text-left">Name</th>
                  <th className="p-2 border border-gray-300 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-300">Chillu Coder</td>
                  <td className="p-2 border border-gray-300">chillu@example.com</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sm:hidden">
            <div className="border border-gray-300 rounded mb-3 p-2">
              <div className="flex justify-between">
                <span className="font-bold">Name:</span>
                <span>Chillu Coder</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Email:</span>
                <span>chillu@example.com</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Horizontal Scroll Table",
      description: "Table with horizontal scrolling on small screens",
      code: `<style>
.scroll-table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.scroll-table {
  min-width: 600px;
}
</style>

<div class="scroll-table-container">
  <table class="scroll-table">
    <!-- Wide table content -->
  </table>
</div>`,
      preview: (
        <div className="overflow-x-auto border border-gray-200 rounded">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="p-2 border-b border-gray-300 text-left">Column 1</th>
                <th className="p-2 border-b border-gray-300 text-left">Column 2</th>
                <th className="p-2 border-b border-gray-300 text-left">Column 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b border-gray-300">Data 1</td>
                <td className="p-2 border-b border-gray-300">Data 2</td>
                <td className="p-2 border-b border-gray-300">Data 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Table Styling Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create beautiful and functional styled tables in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaTable className="text-blue-500" />
          Introduction to Table Styling
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML tables are essential for displaying tabular data, but their default appearance is often
          plain and unappealing. With CSS, you can transform basic tables into visually appealing
          components that enhance readability and user experience.
        </p>
        <button
          onClick={handleOpenEditor}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Basic Table Styles */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable className="text-blue-500" />
            Basic Table Styles
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
          <div className="grid grid-cols-1 gap-6">
            {basicStyles.map((style, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{style.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {style.description}
                  </p>
                  <div className="mb-4">{style.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(style.code, style.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === style.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={style.code}
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

      {/* Advanced Table Styles */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable className="text-blue-500" />
            Advanced Table Styles
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
          <div className="grid grid-cols-1  gap-6">
            {advancedStyles.map((style, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{style.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {style.description}
                  </p>
                  <div className="mb-4">{style.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(style.code, style.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === style.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={style.code}
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

      {/* Practical Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable className="text-blue-500" />
            Practical Examples
          </h2>
          <button
            onClick={() => toggleSection("examples")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.examples ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.examples && (
          <div className="grid grid-cols-1  gap-6">
            {practicalExamples.map((example, index) => (
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
                      onClick={() => copyToClipboard(example.code, example.title)}
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

      {/* Accessibility Features */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Accessibility Features
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {accessibilityFeatures.map((feature, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="mb-4">{feature.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(feature.code, feature.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === feature.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={feature.code}
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

      {/* Responsive Techniques */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable className="text-blue-500" />
            Responsive Techniques
          </h2>
          <button
            onClick={() => toggleSection("responsive")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${
                expandedSections.responsive ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {expandedSections.responsive && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responsiveTechniques.map((technique, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{technique.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {technique.description}
                  </p>
                  <div className="mb-4">{technique.preview}</div>
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(technique.code, technique.title)}
                      className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === technique.title ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaCopy />
                      )}
                    </button>
                    <CodeEditor
                      value={technique.code}
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
          href="/html/borders"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/colspan-rowspan"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}