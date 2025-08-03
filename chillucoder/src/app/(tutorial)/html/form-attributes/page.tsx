"use client";

import {
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

export default function HTMLFormAttributesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    attributes: true,
    advanced: true,
  });
  const router = useRouter();

  const handleOpenEditor = (code: string) => {
    try {
      // Store code in memory instead of localStorage
      const editorWindow = window.open("/compilers/html-editor", "_blank");
      if (editorWindow) {
        editorWindow.addEventListener('load', () => {
          editorWindow.postMessage({ code }, "*");
        });
      }
    } catch (error) {
      console.error("Error opening editor:", error);
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

  const formAttributeExamples = [
    {
      title: "Form Element Attributes",
      description: "Essential attributes for the form element itself",
      code: `<form action="/submit" method="POST" enctype="multipart/form-data" target="_blank" autocomplete="on" novalidate>
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  
  <label for="avatar">Profile Picture:</label>
  <input type="file" id="avatar" name="avatar" accept="image/*">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Profile Picture:
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      ),
    },
    {
      title: "Input Validation Attributes",
      description: "Attributes for client-side form validation",
      code: `<form>
  <label for="email">Email (required):</label>
  <input type="email" id="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
  
  <label for="age">Age (18-100):</label>
  <input type="number" id="age" name="age" min="18" max="100" step="1" required>
  
  <label for="password">Password (8+ chars):</label>
  <input type="password" id="password" name="password" minlength="8" maxlength="50" required>
  
  <label for="website">Website URL:</label>
  <input type="url" id="website" name="website" placeholder="https://example.com">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email (required):
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Age (18-100):
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                max="100"
                step="1"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password (8+ chars):
              </label>
              <input
                type="password"
                id="password"
                name="password"
                minLength="8"
                maxLength="50"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website URL:
              </label>
              <input
                type="url"
                id="website"
                name="website"
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      ),
    },
    {
      title: "Input State Attributes",
      description: "Attributes that control input behavior and state",
      code: `<form>
  <label for="readonly-field">Read-only Field:</label>
  <input type="text" id="readonly-field" name="readonly-field" value="Cannot edit this" readonly>
  
  <label for="disabled-field">Disabled Field:</label>
  <input type="text" id="disabled-field" name="disabled-field" value="Disabled input" disabled>
  
  <label for="autofocus-field">Auto-focus Field:</label>
  <input type="text" id="autofocus-field" name="autofocus-field" placeholder="This field gets focus" autofocus>
  
  <label for="hidden-field">Hidden Field (not visible):</label>
  <input type="hidden" id="hidden-field" name="hidden-field" value="secret-value">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="readonly-field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Read-only Field:
              </label>
              <input
                type="text"
                id="readonly-field"
                name="readonly-field"
                defaultValue="Cannot edit this"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="disabled-field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Disabled Field:
              </label>
              <input
                type="text"
                id="disabled-field"
                name="disabled-field"
                defaultValue="Disabled input"
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="autofocus-field"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Auto-focus Field:
              </label>
              <input
                type="text"
                id="autofocus-field"
                name="autofocus-field"
                placeholder="This field gets focus"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <input type="hidden" name="hidden-field" value="secret-value" />
            <p className="text-sm text-gray-500">
              (Hidden field with value "secret-value" - not visible but present in form)
            </p>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      ),
    },
    {
      title: "Select & Option Attributes",
      description: "Attributes specific to select elements and options",
      code: `<form>
  <label for="single-select">Single Selection:</label>
  <select id="single-select" name="single-select" required>
    <option value="">Choose an option</option>
    <option value="option1">Option 1</option>
    <option value="option2" selected>Option 2 (Pre-selected)</option>
    <option value="option3" disabled>Option 3 (Disabled)</option>
  </select>
  
  <label for="multi-select">Multiple Selection:</label>
  <select id="multi-select" name="multi-select" multiple size="4">
    <option value="red" selected>Red</option>
    <option value="blue">Blue</option>
    <option value="green" selected>Green</option>
    <option value="yellow">Yellow</option>
  </select>
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="single-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Single Selection:
              </label>
              <select
                id="single-select"
                name="single-select"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2" selected>Option 2 (Pre-selected)</option>
                <option value="option3" disabled>Option 3 (Disabled)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="multi-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Multiple Selection:
              </label>
              <select
                id="multi-select"
                name="multi-select"
                multiple
                size={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="red" selected>Red</option>
                <option value="blue">Blue</option>
                <option value="green" selected>Green</option>
                <option value="yellow">Yellow</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      ),
    },
    {
      title: "Textarea Attributes",
      description: "Attributes for textarea elements",
      code: `<form>
  <label for="basic-textarea">Basic Textarea:</label>
  <textarea id="basic-textarea" name="basic-textarea" rows="4" cols="50" placeholder="Enter your message here..."></textarea>
  
  <label for="limited-textarea">Limited Textarea (max 200 chars):</label>
  <textarea id="limited-textarea" name="limited-textarea" rows="3" maxlength="200" required wrap="soft" placeholder="Maximum 200 characters allowed"></textarea>
  
  <label for="fixed-textarea">Fixed Size Textarea:</label>
  <textarea id="fixed-textarea" name="fixed-textarea" rows="2" cols="30" wrap="hard" style="resize: none;" placeholder="Cannot resize this"></textarea>
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="basic-textarea"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Basic Textarea:
              </label>
              <textarea
                id="basic-textarea"
                name="basic-textarea"
                rows={4}
                placeholder="Enter your message here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="limited-textarea"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Limited Textarea (max 200 chars):
              </label>
              <textarea
                id="limited-textarea"
                name="limited-textarea"
                rows={3}
                maxLength={200}
                required
                placeholder="Maximum 200 characters allowed"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="fixed-textarea"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fixed Size Textarea:
              </label>
              <textarea
                id="fixed-textarea"
                name="fixed-textarea"
                rows={2}
                placeholder="Cannot resize this"
                style={{ resize: 'none' }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      ),
    },
    {
      title: "Advanced Form Attributes",
      description: "Advanced attributes for enhanced form functionality",
      code: `<form id="main-form">
  <label for="form-outside">Input Outside Form:</label>
  <input type="text" id="form-outside" name="form-outside" form="main-form" placeholder="This input belongs to main-form">
</form>

<!-- Input outside the form but associated with it -->
<div style="margin-top: 20px; padding: 10px; border: 1px solid #ddd;">
  <label for="external-input">External Input (linked to form above):</label>
  <input type="email" id="external-input" name="external-input" form="main-form" placeholder="email@example.com" required>
  
  <button type="submit" form="main-form">Submit Main Form</button>
  <button type="reset" form="main-form">Reset Main Form</button>
</div>

<form style="margin-top: 20px;">
  <label for="with-datalist">Input with Datalist:</label>
  <input type="text" id="with-datalist" name="with-datalist" list="suggestions" placeholder="Type to see suggestions">
  
  <datalist id="suggestions">
    <option value="Apple">
    <option value="Banana">
    <option value="Cherry">
    <option value="Date">
    <option value="Elderberry">
  </datalist>
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form id="main-form-preview" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="form-outside"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Input Inside Form:
              </label>
              <input
                type="text"
                id="form-outside"
                name="form-outside"
                placeholder="This input is inside the form"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>

          <div className="mt-4 p-3 border border-dashed border-gray-300 rounded">
            <div className="mb-4">
              <label
                htmlFor="external-input"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                External Input (would be linked to form above in real HTML):
              </label>
              <input
                type="email"
                id="external-input"
                name="external-input"
                placeholder="email@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Main Form
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Reset Main Form
              </button>
            </div>
          </div>

          <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="with-datalist"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Input with Datalist:
              </label>
              <input
                type="text"
                id="with-datalist"
                name="with-datalist"
                list="suggestions"
                placeholder="Type to see suggestions"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <datalist id="suggestions">
                <option value="Apple" />
                <option value="Banana" />
                <option value="Cherry" />
                <option value="Date" />
                <option value="Elderberry" />
              </datalist>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Form Attributes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Master all the essential attributes for HTML forms and form elements
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Understanding HTML Form Attributes
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML form attributes provide powerful control over form behavior, validation, 
          and user experience. These attributes can be applied to form elements to 
          enhance functionality, improve accessibility, and create better user interfaces.
          From basic validation to advanced form handling, attributes are essential 
          for creating professional web forms.
        </p>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Form Attributes</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    form { max-width: 500px; margin: 0 auto; }
    label { display: block; margin-top: 15px; font-weight: bold; }
    input, select, textarea { width: 100%; padding: 8px; margin-top: 5px; }
    input:invalid { border-color: red; }
    input:valid { border-color: green; }
  </style>
</head>
<body>
  <h1>Form with Attributes</h1>
  <form action="/submit" method="POST">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required placeholder="Enter your email">
    
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" min="18" max="100" required>
    
    <button type="submit">Submit</button>
  </form>
</body>
</html>`)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Attribute Categories */}
      <section className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
          <FaCode className="text-blue-600 dark:text-blue-400 text-2xl" />
          Form Attribute Categories
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          HTML form attributes can be grouped into different categories based on their functionality.
          Understanding these categories helps you choose the right attributes for your forms.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Form Element Attributes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Form Element Attributes
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Attributes that control the form element behavior and submission.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>📤 <code>action</code> – Where to send form data</li>
              <li>📨 <code>method</code> – HTTP method (GET/POST)</li>
              <li>📎 <code>enctype</code> – Encoding type for file uploads</li>
              <li>🎯 <code>target</code> – Where to display response</li>
              <li>✨ <code>autocomplete</code> – Enable/disable autocomplete</li>
              <li>🚫 <code>novalidate</code> – Skip client-side validation</li>
            </ul>
          </div>

          {/* Input Attributes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
              Input Attributes
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Attributes for controlling input field behavior and validation.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>🏷️ <code>name</code> – Field name for form submission</li>
              <li>💾 <code>value</code> – Default or current field value</li>
              <li>💡 <code>placeholder</code> – Hint text for users</li>
              <li>✅ <code>required</code> – Makes field mandatory</li>
              <li>🔒 <code>readonly</code> – Prevents editing</li>
              <li>❌ <code>disabled</code> – Disables the field</li>
            </ul>
          </div>

          {/* Validation Attributes */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
              Validation Attributes
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Attributes for client-side form validation and constraints.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>🎯 <code>pattern</code> – Regular expression validation</li>
              <li>📏 <code>minlength/maxlength</code> – Text length limits</li>
              <li>🔢 <code>min/max</code> – Number range limits</li>
              <li>📐 <code>step</code> – Number increment value</li>
              <li>📁 <code>accept</code> – File type restrictions</li>
              <li>🔄 <code>multiple</code> – Allow multiple values</li>
            </ul>
          </div>

          {/* Accessibility & UX */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-orange-600 dark:text-orange-400 mb-2">
              Accessibility & UX
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Attributes that improve accessibility and user experience.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li>🎯 <code>autofocus</code> – Auto-focus on page load</li>
              <li>📊 <code>tabindex</code> – Tab order control</li>
              <li>📝 <code>title</code> – Tooltip text</li>
              <li>🔗 <code>form</code> – Associate with specific form</li>
              <li>📋 <code>list</code> – Link to datalist options</li>
              <li>📏 <code>size</code> – Visual size of the field</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Form Attribute Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Form Attribute Examples
          </h2>
          <button
            onClick={() => toggleSection("attributes")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.attributes ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.attributes && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formAttributeExamples.map((example, index) => (
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
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => handleOpenEditor(example.code)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(example.code, example.title)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === example.title ? (
                        <>
                          <FaCheck className="text-green-500" /> Copied!
                        </>
                      ) : (
                        <>
                          <FaCopy /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
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
            ))}
          </div>
        )}
      </section>

      {/* Attribute Reference Table */}
      <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Quick Reference: Common Form Attributes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="text-left p-2 font-semibold">Attribute</th>
                <th className="text-left p-2 font-semibold">Applies To</th>
                <th className="text-left p-2 font-semibold">Description</th>
                <th className="text-left p-2 font-semibold">Example</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2"><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">action</code></td>
                <td className="p-2">form</td>
                <td className="p-2">URL where form data is sent</td>
                <td className="p-2"><code>action="/submit"</code></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2"><code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">method</code></td>
                <td className="p-2">form</td>
                <td className="p-2">HTTP method (GET, POST)</td>
                <td className="p-2"><code>method="POST"</code></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2"><code className="bg-green-100 dark:bg-green-900 px-1 rounded">required</code></td>
                <td className="p-2">input, select, textarea</td>
                <td className="p-2">Makes field mandatory</td>
                <td className="p-2"><code>required</code></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2"><code className="bg-green-100 dark:bg-green-900 px-1 rounded">placeholder</code></td>
                <td className="p-2">input, textarea</td>
                <td className="p-2">Hint text for users</td>
                <td className="p-2"><code>placeholder="Enter name"</code></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2"><code className="bg-purple-100 dark:bg-purple-900 px-1 rounded">pattern</code></td>
                <td className="p-2">input</td>
                <td className="p-2">Regular expression validation</td>
                <td className="p-2"><code>pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"</code></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2"><code className="bg-purple-100 dark:bg-purple-900 px-1 rounded">min/max</code></td>
                <td className="p-2">input (number, date)</td>
                <td className="p-2">Range constraints</td>
                <td className="p-2"><code>min="1" max="100"</code></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2"><code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">disabled</code></td>
                <td className="p-2">form elements</td>
                <td className="p-2">Disables the element</td>
                <td className="p-2"><code>disabled</code></td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2"><code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">readonly</code></td>
                <td className="p-2">input, textarea</td>
                <td className="p-2">Prevents editing</td>
                <td className="p-2"><code>readonly</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-8 bg-yellow-50 dark:bg-gray-800 p-6 rounded-xl border border-yellow-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Form Attribute Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
              Validation & Security
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Always validate on both client and server side
              </li>
              <li>
                Use appropriate input types for better validation
              </li>
              <li>
                Set <code>method="POST"</code> for sensitive data
              </li>
              <li>
                Use <code>enctype="multipart/form-data"</code> for file uploads
              </li>
              <li>Implement CSRF protection for form submissions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
              User Experience
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Provide clear placeholder text and labels
              </li>
              <li>
                Use <code>autofocus</code> sparingly - only on primary fields
              </li>
              <li>
                Group related fields with <code>fieldset</code>
              </li>
              <li>
                Enable autocomplete for common fields like name, email
              </li>
              <li>Show validation errors clearly and helpfully</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advanced Techniques */}
      <section className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-purple-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Advanced Form Attribute Techniques</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">
              Custom Validation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Use pattern attribute with regex for complex validation:
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}"
            </code>
            <p className="text-xs text-gray-500 mt-1">Password with uppercase, lowercase, and number</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">
              Form Association
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Link inputs to forms using form attribute:
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
              &lt;input form="myform" name="field"&gt;
            </code>
            <p className="text-xs text-gray-500 mt-1">Input can be outside the form element</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">
              Multiple File Upload
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Allow multiple file selection:
            </p>
            <code className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded block">
              &lt;input type="file" multiple accept="image/*"&gt;
            </code>
            <p className="text-xs text-gray-500 mt-1">Accept multiple image files</p>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our Online HTML Editor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Practice using HTML form attributes with our interactive editor. 
              Test validation, styling, and form behavior in real-time:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Live preview of form attributes in action</li>
              <li>Test form validation and user interactions</li>
              <li>Experiment with different attribute combinations</li>
              <li>See how browsers handle various form features</li>
              <li>Export your forms as complete HTML files</li>
            </ul>
            <Link
              href="/compilers/html-editor"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch HTML Editor
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm overflow-x-auto">
                <code className="language-html">
                  {`<!DOCTYPE html>
<html>
<head>
  <title>Advanced Form Attributes</title>
  <style>
    form { max-width: 600px; margin: 0 auto; padding: 20px; }
    label { display: block; margin-top: 15px; font-weight: bold; }
    input, select, textarea { 
      width: 100%; 
      padding: 10px; 
      margin-top: 5px; 
      border: 2px solid #ddd;
      border-radius: 5px;
    }
    input:valid { border-color: green; }
    input:invalid { border-color: red; }
    .required::after { content: "*"; color: red; }
  </style>
</head>
<body>
  <form action="/submit" method="POST" enctype="multipart/form-data">
    <label for="email" class="required">Email:</label>
    <input type="email" id="email" name="email" required 
           pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
           placeholder="Enter your email address">
    
    <label for="age" class="required">Age:</label>
    <input type="number" id="age" name="age" required
           min="13" max="120" step="1">
    
    <label for="bio">Bio:</label>
    <textarea id="bio" name="bio" rows="4" maxlength="500"
              placeholder="Tell us about yourself (max 500 chars)"></textarea>
    
    <button type="submit">Submit Form</button>
  </form>
</body>
</html>`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t mt-5">
        <Link
          href="/html/form-elements"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous: Form Elements
        </Link>
        <Link
          href="/html/form-validation"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next: Form Validation &gt;
        </Link>
      </section>
    </div>
  );
}