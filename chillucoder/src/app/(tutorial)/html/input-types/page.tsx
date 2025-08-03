"use client";

import {
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

export default function HTMLInputTypesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    inputs: true,
    advanced: true,
    validation: true,
  });
  const router = useRouter();

  const handleOpenEditor = (code: string) => {
    try {
      localStorage.setItem("html-code", code);
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

  const inputTypeExamples = [
    {
      title: "Text Input Types",
      description: "Common text-based input types with different purposes",
      code: `<form>
  <label for="text">Text:</label>
  <input type="text" id="text" name="text" placeholder="Enter text">
  
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" placeholder="Enter password">
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" placeholder="Enter email">
  
  <label for="search">Search:</label>
  <input type="search" id="search" name="search" placeholder="Search...">
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Text:
              </label>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="Enter text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search:
              </label>
              <input
                type="search"
                id="search"
                name="search"
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Numeric Input Types",
      description: "Input types for numeric values with validation",
      code: `<form>
  <label for="number">Number:</label>
  <input type="number" id="number" name="number" min="1" max="10" step="1">
  
  <label for="range">Range:</label>
  <input type="range" id="range" name="range" min="0" max="100" step="5">
  
  <label for="tel">Telephone:</label>
  <input type="tel" id="tel" name="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Number:
              </label>
              <input
                type="number"
                id="number"
                name="number"
                min="1"
                max="10"
                step="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="range"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Range:
              </label>
              <input
                type="range"
                id="range"
                name="range"
                min="0"
                max="100"
                step="5"
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="tel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Telephone:
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Date & Time Inputs",
      description: "Specialized inputs for date and time selection",
      code: `<form>
  <label for="date">Date:</label>
  <input type="date" id="date" name="date">
  
  <label for="time">Time:</label>
  <input type="time" id="time" name="time">
  
  <label for="datetime-local">Local DateTime:</label>
  <input type="datetime-local" id="datetime-local" name="datetime-local">
  
  <label for="month">Month:</label>
  <input type="month" id="month" name="month">
  
  <label for="week">Week:</label>
  <input type="week" id="week" name="week">
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Time:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="datetime-local"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Local DateTime:
              </label>
              <input
                type="datetime-local"
                id="datetime-local"
                name="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="month"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Month:
              </label>
              <input
                type="month"
                id="month"
                name="month"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="week"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Week:
              </label>
              <input
                type="week"
                id="week"
                name="week"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Special Input Types",
      description: "Unique input types for specific purposes",
      code: `<form>
  <label for="color">Color Picker:</label>
  <input type="color" id="color" name="color" value="#ff0000">
  
  <label for="file">File Upload:</label>
  <input type="file" id="file" name="file">
  
  <label for="url">URL:</label>
  <input type="url" id="url" name="url" placeholder="https://example.com">
  
  <label for="hidden">Hidden Input:</label>
  <input type="hidden" id="hidden" name="hidden" value="secret-value">
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Color Picker:
              </label>
              <input
                type="color"
                id="color"
                name="color"
                defaultValue="#ff0000"
                className="w-full h-10 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                File Upload:
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className="w-full px-3 py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL:
              </label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="text-sm text-gray-500">
              Note: Hidden inputs are not visible to users but are included in
              form submissions.
            </div>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Input Types
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore the different input types available in HTML forms
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Introduction to HTML Input Types
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML provides a variety of input types to create rich form controls.
          Each input type serves a specific purpose and provides different user
          interfaces and validation capabilities.
        </p>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Input Types</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    form { max-width: 500px; margin: 0 auto; }
    label { display: block; margin-top: 15px; }
    input { width: 100%; padding: 8px; margin-top: 5px; }
  </style>
</head>
<body>
  <h1>HTML Input Types</h1>
  <form>
    <label for="text">Text Input:</label>
    <input type="text" id="text" name="text">
    
    <label for="email">Email Input:</label>
    <input type="email" id="email" name="email">
    
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

      {/* Input Type Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Input Type Examples
          </h2>
          <button
            onClick={() => toggleSection("inputs")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.inputs ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.inputs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputTypeExamples.map((example, index) => (
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
              Experiment with HTML right in your browser using our interactive
              editor with live preview:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>No installation required</li>
              <li>Real-time preview of your code</li>
              <li>Format and clean your HTML</li>
              <li>Export your work as HTML files</li>
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
                          <title>HTML Input Types</title>
                          <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            form { max-width: 500px; margin: 0 auto; }
                            label { display: block; margin-top: 15px; }
                            input { width: 100%; padding: 8px; margin-top: 5px; }
                          </style>
                        </head>
                        <body>
                          <h1>HTML Input Types</h1>
                          <form>
                            <label for="text">Text Input:</label>
                            <input type="text" id="text" name="text" />
                      
                            <label for="email">Email Input:</label>
                            <input type="email" id="email" name="email" />
                      
                            <button type="submit">Submit</button>
                          </form>
                        </body>
                      </html>
                      `}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

            {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t mt-5">
        {/* Previous Link */}
        <Link
          href="/html/forms"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/form-elements"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
