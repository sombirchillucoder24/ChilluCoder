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

export default function HTMLFormElementsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    elements: true,
    advanced: true,
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

  const formElementExamples = [
    {
      title: "Text Input & Textarea",
      description: "Basic text input fields and multi-line text areas",
      code: `<form>
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required>
  
  <label for="bio">Bio:</label>
  <textarea id="bio" name="bio" rows="4" cols="50"></textarea>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
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
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio:
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Select Dropdown",
      description: "Dropdown menus for selecting from multiple options",
      code: `<form>
  <label for="country">Country:</label>
  <select id="country" name="country">
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="au">Australia</option>
  </select>
  
  <label for="colors">Favorite Colors (multiple):</label>
  <select id="colors" name="colors" multiple size="4">
    <option value="red">Red</option>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="yellow">Yellow</option>
  </select>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label
                htmlFor="colors"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Favorite Colors (multiple):
              </label>
              <select
                id="colors"
                name="colors"
                multiple
                size={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
              </select>
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Radio Buttons & Checkboxes",
      description: "Single and multiple choice selection elements",
      code: `<form>
  <fieldset>
    <legend>Gender:</legend>
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">Male</label><br>
    
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">Female</label><br>
    
    <input type="radio" id="other" name="gender" value="other">
    <label for="other">Other</label>
  </fieldset>
  
  <fieldset>
    <legend>Interests:</legend>
    <input type="checkbox" id="sports" name="interests" value="sports">
    <label for="sports">Sports</label><br>
    
    <input type="checkbox" id="music" name="interests" value="music">
    <label for="music">Music</label><br>
    
    <input type="checkbox" id="reading" name="interests" value="reading">
    <label for="reading">Reading</label>
  </fieldset>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <fieldset className="border border-gray-300 p-3 rounded">
              <legend className="px-2 font-medium text-gray-700">
                Gender:
              </legend>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label
                    htmlFor="male"
                    className="ml-2 block text-sm text-gray-700"
                  >
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
                  <label
                    htmlFor="female"
                    className="ml-2 block text-sm text-gray-700"
                  >
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
                  <label
                    htmlFor="other"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Other
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset className="border border-gray-300 p-3 rounded">
              <legend className="px-2 font-medium text-gray-700">
                Interests:
              </legend>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sports"
                    name="interests"
                    value="sports"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="sports"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Sports
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="music"
                    name="interests"
                    value="music"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="music"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Music
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="reading"
                    name="interests"
                    value="reading"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="reading"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Reading
                  </label>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      ),
    },
    {
      title: "Buttons & Form Submission",
      description: "Different types of buttons and form submission controls",
      code: `<form>
  <button type="submit">Submit Form</button>
  <button type="reset">Reset Form</button>
  <button type="button">Regular Button</button>
  
  <input type="submit" value="Submit Input">
  <input type="reset" value="Reset Input">
  <input type="button" value="Button Input">
  
  <input type="image" src="/images/html/ABeautifulLandscape.pngpng" alt="Submit" width="150">
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Form
              </button>
              <button
                type="reset"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Reset Form
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Regular Button
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <input
                type="submit"
                value="Submit Input"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              />
              <input
                type="reset"
                value="Reset Input"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 cursor-pointer"
              />
              <input
                type="button"
                value="Button Input"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer"
              />
            </div>
            <div className="text-sm text-gray-500">
              <input
                type="image"
                src="/images/html/ABeautifulLandscape.png"
                alt="Submit"
                width="150"
              />
            </div>
          </form>
        </div>
      ),
    },
    {
      title: "Fieldset & Legend",
      description: "Grouping related form elements with labels",
      code: `<form>
  <fieldset>
    <legend>Contact Information</legend>
    
    <label for="name">Name:</label>
    <input type="text" id="name" name="name"><br>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email"><br>
  </fieldset>
  
  <fieldset>
    <legend>Preferences</legend>
    
    <label for="newsletter">Subscribe to newsletter:</label>
    <input type="checkbox" id="newsletter" name="newsletter"><br>
    
    <label for="frequency">Email frequency:</label>
    <select id="frequency" name="frequency">
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  </fieldset>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-6">
            <fieldset className="border border-gray-300 p-4 rounded">
              <legend className="px-2 font-medium text-gray-700">
                Contact Information
              </legend>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </fieldset>
            <fieldset className="border border-gray-300 p-4 rounded">
              <legend className="px-2 font-medium text-gray-700">
                Preferences
              </legend>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Subscribe to newsletter:
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="frequency"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email frequency:
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      ),
    },
    {
      title: "Datalist Element",
      description: "Predefined options for text inputs with autocomplete",
      code: `<form>
  <label for="browser">Choose your browser:</label>
  <input list="browsers" id="browser" name="browser">
  
  <datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
    <option value="Opera">
  </datalist>
  
  <label for="car">Choose your car:</label>
  <input list="cars" id="car" name="car">
  <datalist id="cars">
    <option value="Toyota">
    <option value="Honda">
    <option value="Ford">
    <option value="BMW">
    <option value="Tesla">
  </datalist>
</form>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="browser"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Choose your browser:
              </label>
              <input
                list="browsers"
                id="browser"
                name="browser"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <datalist id="browsers">
                <option value="Chrome" />
                <option value="Firefox" />
                <option value="Safari" />
                <option value="Edge" />
                <option value="Opera" />
              </datalist>
            </div>
            <div>
              <label
                htmlFor="car"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Choose your car:
              </label>
              <input
                list="cars"
                id="car"
                name="car"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <datalist id="cars">
                <option value="Toyota" />
                <option value="Honda" />
                <option value="Ford" />
                <option value="BMW" />
                <option value="Tesla" />
              </datalist>
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
          HTML Form Elements
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn about all the different form elements available in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Introduction to HTML Form Elements
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML provides a rich set of form elements that allow users to interact
          with web pages. These elements include various types of input
          controls, dropdowns, checkboxes, radio buttons, and more.
          Understanding these elements is crucial for creating interactive and
          user-friendly web forms.
        </p>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Form Elements</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    form { max-width: 500px; margin: 0 auto; }
    label { display: block; margin-top: 15px; }
    input, select, textarea { width: 100%; padding: 8px; margin-top: 5px; }
    fieldset { margin-top: 20px; padding: 10px; border: 1px solid #ddd; }
    legend { padding: 0 5px; }
  </style>
</head>
<body>
  <h1>HTML Form Elements</h1>
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
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

      <section className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
          <FaCode className="text-blue-600 dark:text-blue-400 text-2xl" />
          All HTML Form Elements
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
          HTML offers a wide variety of form elements to capture user input
          efficiently. Below are grouped examples with usage tips and semantic
          importance.
        </p>

        <div className="grid gap-6">
          {/* Category 1: Basic Inputs */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
              Basic Inputs
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Standard fields for collecting text-based or structured data from
              users.
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                🔤 <code>&lt;input type=&quot;text&quot;&gt;</code> – Single-line text
                input
              </li>
              <li>
                📧 <code>&lt;input type=&quot;email&quot;&gt;</code> – Email input with
                built-in validation
              </li>
              <li>
                🔒 <code>&lt;input type=&quot;password&quot;&gt;</code> – Concealed text
                entry
              </li>
              <li>
                🔢 <code>&lt;input type=&quot;number&quot;&gt;</code> – Numeric input with
                increment/decrement buttons
              </li>
              <li>
                📅 <code>&lt;input type=&quot;date&quot;gt;</code> – Date picker input
              </li>
              <li>
                📁 <code>&lt;input type=&quot;file&quot;&gt;</code> – File upload control
              </li>
            </ul>
          </div>

          {/* Category 2: Choice Controls */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
              Choice Controls
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Use these elements to allow users to choose one or multiple
              predefined options.
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                ⬇️ <code>&lt;select&gt;</code> – Dropdown selector with{" "}
                <code>&lt;option&gt;</code> choices
              </li>
              <li>
                🔘 <code>&lt;input type=&quot;radio&quot;&gt;</code> – Select one option
                from a group
              </li>
              <li>
                ☑️ <code>&lt;input type=&quot;checkbox&quot;&gt;</code> – Select multiple
                options independently
              </li>
              <li>
                📃 <code>&lt;datalist&gt;</code> – Autocomplete suggestions for
                text input
              </li>
            </ul>
          </div>

          {/* Category 3: Structure & Actions */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
              Structure & Actions
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Elements that define layout and submission functionality of forms.
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <li>
                📝 <code>&lt;form&gt;</code> – Wraps all form inputs, required
                for submission
              </li>
              <li>
                📦 <code>&lt;fieldset&gt;</code> – Groups related fields, used
                with <code>&lt;legend&gt;</code>
              </li>
              <li>
                🏷️ <code>&lt;label&gt;</code> – Describes input fields and
                improves accessibility
              </li>
              <li>
                🧾 <code>&lt;textarea&gt;</code> – Multiline text input
              </li>
              <li>
                🚀 <code>&lt;button&gt;</code> /{" "}
                <code>&lt;input type=&quot;submit&quot;&gt;</code> – Triggers form
                submission
              </li>
              <li>
                🖼️ <code>&lt;input type=&quot;image&quot;&gt;</code> – Submit button with
                a custom image
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Form Element Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Form Element Examples
          </h2>
          <button
            onClick={() => toggleSection("elements")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.elements ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.elements && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formElementExamples.map((example, index) => (
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

      {/* Best Practices */}
      <section className="mb-8 bg-yellow-50 dark:bg-gray-800 p-6 rounded-xl border border-yellow-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Form Element Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
              Accessibility Tips
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Always use <code>&lt;label&gt;</code> elements for form controls
              </li>
              <li>
                Group related elements with <code>&lt;fieldset&gt;</code> and{" "}
                <code>&lt;legend&gt;</code>
              </li>
              <li>Use proper input types for better mobile keyboard support</li>
              <li>Ensure sufficient color contrast for readability</li>
              <li>Provide clear error messages and validation feedback</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
              Usability Recommendations
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Keep forms as short as possible - only ask for necessary
                information
              </li>
              <li>Use logical tab ordering for keyboard navigation</li>
              <li>Provide clear calls-to-action on buttons</li>
              <li>Use appropriate input types for the expected data</li>
              <li>Consider mobile users with small touch targets</li>
            </ul>
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
              Experiment with HTML form elements right in your browser using our
              interactive editor with live preview:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>No installation required</li>
              <li>Real-time preview of your forms</li>
              <li>Test form validation and behavior</li>
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
  <title>Form Example</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    form { max-width: 500px; margin: 0 auto; }
    label { display: block; margin-top: 15px; }
    input, select, textarea { 
      width: 100%; 
      padding: 8px; 
      margin-top: 5px; 
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <h1>Contact Form</h1>
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">Send Message</button>
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
          href="/html/input-types"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>
        <Link
          href="/html/form-attributes"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
