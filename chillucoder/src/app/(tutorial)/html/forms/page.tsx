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

export default function HTMLFormsPage() {
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

  const basicExamples = [
    {
      title: "Basic Form",
      description: "Simple form with text inputs and submit button",
      code: `<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      ),
    },
    {
      title: "Login Form",
      description: "Typical login form with username and password",
      code: `<form>
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>
  
  <button type="submit">Login</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      ),
    },
  ];

  const inputTypes = [
    {
      title: "Text Inputs",
      description: "Various text-based input types",
      code: `<form>
  <label for="text">Text:</label>
  <input type="text" id="text" name="text">
  
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">
  
  <label for="tel">Phone:</label>
  <input type="tel" id="tel" name="tel">
  
  <label for="url">Website:</label>
  <input type="url" id="url" name="url">
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
                Text:
              </label>
              <input
                type="text"
                id="text"
                name="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">
                Phone:
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Website:
              </label>
              <input
                type="url"
                id="url"
                name="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Specialized Inputs",
      description: "Date, color, range, and file inputs",
      code: `<form>
  <label for="date">Date:</label>
  <input type="date" id="date" name="date">
  
  <label for="color">Color:</label>
  <input type="color" id="color" name="color">
  
  <label for="range">Volume:</label>
  <input type="range" id="range" name="range" min="0" max="100">
  
  <label for="file">Upload File:</label>
  <input type="file" id="file" name="file">
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                Color:
              </label>
              <input
                type="color"
                id="color"
                name="color"
                className="w-full h-10 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="range" className="block text-sm font-medium text-gray-700 mb-1">
                Volume:
              </label>
              <input
                type="range"
                id="range"
                name="range"
                min="0"
                max="100"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Upload File:
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className="w-full px-3 py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </form>
        </div>
      ),
    },
  ];

  const formControls = [
    {
      title: "Checkboxes & Radios",
      description: "Selection controls with labels",
      code: `<form>
  <fieldset>
    <legend>Choose your interests:</legend>
    <label>
      <input type="checkbox" name="sports"> Sports
    </label>
    <label>
      <input type="checkbox" name="music"> Music
    </label>
    <label>
      <input type="checkbox" name="movies"> Movies
    </label>
  </fieldset>
  
  <fieldset>
    <legend>Gender:</legend>
    <label>
      <input type="radio" name="gender" value="male"> Male
    </label>
    <label>
      <input type="radio" name="gender" value="female"> Female
    </label>
    <label>
      <input type="radio" name="gender" value="other"> Other
    </label>
  </fieldset>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-6">
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700">Choose your interests:</legend>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="sports"
                  name="sports"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="sports" className="ml-2 block text-sm text-gray-700">
                  Sports
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="music"
                  name="music"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="music" className="ml-2 block text-sm text-gray-700">
                  Music
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="movies"
                  name="movies"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="movies" className="ml-2 block text-sm text-gray-700">
                  Movies
                </label>
              </div>
            </fieldset>
            
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700">Gender:</legend>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="male" className="ml-2 block text-sm text-gray-700">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="female" className="ml-2 block text-sm text-gray-700">
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="other" className="ml-2 block text-sm text-gray-700">
                  Other
                </label>
              </div>
            </fieldset>
          </form>
        </div>
      ),
    },
    {
      title: "Select & Textarea",
      description: "Dropdown and multi-line text inputs",
      code: `<form>
  <label for="country">Country:</label>
  <select id="country" name="country">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="au">Australia</option>
  </select>
  
  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4"></textarea>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country:
              </label>
              <select
                id="country"
                name="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </form>
        </div>
      ),
    },
  ];

  const validationExamples = [
    {
      title: "HTML5 Validation",
      description: "Built-in form validation attributes",
      code: `<form>
  <label for="username">Username (required):</label>
  <input type="text" id="username" name="username" required minlength="4">
  
  <label for="email">Email (valid format):</label>
  <input type="email" id="email" name="email" required>
  
  <label for="age">Age (18-100):</label>
  <input type="number" id="age" name="age" min="18" max="100">
  
  <label for="password">Password (pattern):</label>
  <input type="password" id="password" name="password" 
         pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
         title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters">
  
  <button type="submit">Submit</button>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username (required):
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                minLength={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (valid format):
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age (18-100):
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="18"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password (pattern):
              </label>
              <input
                type="password"
                id="password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
          HTML Forms Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to create interactive forms with HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Introduction to HTML Forms
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML forms are essential for collecting user input on websites. They allow users to enter data that is sent to a server for processing.
          Forms can contain various input elements like text fields, checkboxes, radio buttons, dropdowns, and more.
        </p>
        <button
          onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Forms</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      margin: 5px 0 15px;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <h1>HTML Forms</h1>
  <p>Try creating your own form here!</p>
</body>
</html>`)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Basic Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Basic Form Examples
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>${example.title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      margin: 5px 0 15px;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  ${example.code}
</body>
</html>`)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Try in Editor"
                      >
                        <FaPlay size={12} />
                      </button>
                      <button
                        onClick={() => copyToClipboard(example.code, example.title)}
                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Copy to Clipboard"
                      >
                        {copied === example.title ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
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
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Input Types */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Input Types
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
            {inputTypes.map((input, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{input.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {input.description}
                  </p>
                  <div className="mb-4">{input.preview}</div>
                  <div className="relative">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>${input.title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      margin: 5px 0 15px;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  ${input.code}
</body>
</html>`)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Try in Editor"
                      >
                        <FaPlay size={12} />
                      </button>
                      <button
                        onClick={() => copyToClipboard(input.code, input.title)}
                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Copy to Clipboard"
                      >
                        {copied === input.title ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                    </div>
                    <CodeEditor
                      value={input.code}
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

      {/* Form Controls */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Form Controls
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formControls.map((control, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{control.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {control.description}
                  </p>
                  <div className="mb-4">{control.preview}</div>
                  <div className="relative">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>${control.title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      margin: 5px 0 15px;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  ${control.code}
</body>
</html>`)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Try in Editor"
                      >
                        <FaPlay size={12} />
                      </button>
                      <button
                        onClick={() => copyToClipboard(control.code, control.title)}
                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Copy to Clipboard"
                      >
                        {copied === control.title ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                    </div>
                    <CodeEditor
                      value={control.code}
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

      {/* Validation */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Form Validation
          </h2>
          <button
            onClick={() => toggleSection("validation")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${
                expandedSections.validation ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {expandedSections.validation && (
          <div className="grid grid-cols-1 gap-6">
            {validationExamples.map((example, index) => (
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
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>${example.title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      margin: 5px 0 15px;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  ${example.code}
</body>
</html>`)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Try in Editor"
                      >
                        <FaPlay size={12} />
                      </button>
                      <button
                        onClick={() => copyToClipboard(example.code, example.title)}
                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="Copy to Clipboard"
                      >
                        {copied === example.title ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
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
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/colspan-rowspan"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/input-types"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}