"use client";

import {
  FaLaptopCode,
  FaCode,
  FaExternalLinkAlt,
  FaPlay,
} from "react-icons/fa";
import Link from "next/link";

export default function HTMLEditorsPage() {
  const editors = [
    {
      name: "Visual Studio Code",
      description:
        "Free, open-source editor with excellent HTML support and extensions",
      link: "https://code.visualstudio.com/",
      features: [
        "Syntax highlighting",
        "IntelliSense autocomplete",
        "Built-in terminal",
        "Git integration",
      ],
    },
    {
      name: "Sublime Text",
      description:
        "Lightweight but powerful text editor with great performance",
      link: "https://www.sublimetext.com/",
      features: [
        "Multiple cursors",
        "Distraction-free mode",
        "Powerful search and replace",
        "Customizable interface",
      ],
    },
    {
      name: "Atom",
      description:
        "Hackable text editor from GitHub with built-in package manager",
      link: "https://atom.io/",
      features: [
        "Built-in package manager",
        "Smart autocompletion",
        "File system browser",
        "Multiple panes",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 mb-3">
          HTML Editors
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mb-4 rounded-full"></div>
        <p className="text-gray-700 dark:text-gray-300">
          Choose the right editor to make your HTML development easier and more
          efficient.
        </p>
      </header>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Continue Your HTML Journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Step */}
          <Link
            href="/html/intro"
            className="group bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <div className="flex items-start">
              <div className="mr-3 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition">
                ←
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Previous
                </p>
                <h3 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  HTML Intro
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn what HTML is and how it works
                </p>
              </div>
            </div>
          </Link>

          {/* Next Step */}
          <Link
            href="/html/basics"
            className="group bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition text-right"
          >
            <div className="flex items-start justify-end">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Next
                </p>
                <h3 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  HTML Basics
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Learn fundamental HTML tags and structure
                </p>
              </div>
              <div className="ml-3 text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 transition">
                →
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <div className="space-y-8 pt-15">
        {/* Introduction */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <FaLaptopCode className="text-blue-500 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Why Use an HTML Editor?
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              While you can write HTML in any text editor, dedicated HTML
              editors provide features that make development faster and easier:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Syntax highlighting for better readability</li>
              <li>Code completion to reduce typing</li>
              <li>Error detection to catch mistakes early</li>
              <li>Built-in preview functionality</li>
              <li>Integration with other web technologies</li>
            </ul>
          </div>
        </section>

        {/* Popular Editors */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <FaCode className="text-purple-500 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Popular HTML Editors
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {editors.map((editor, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {editor.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {editor.description}
                </p>
                <ul className="mb-4 space-y-1">
                  {editor.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={editor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Visit Website</span>
                  <FaExternalLinkAlt className="ml-1" size={12} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Try Our Editor */}
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
  <title>Try Our Editor</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Edit me in the live editor</p>
</body>
</html>`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Continue Your HTML Journey
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Step */}
            <Link
              href="/html/intro"
              className="group bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <div className="flex items-start">
                <div className="mr-3 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition">
                  ←
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Previous
                  </p>
                  <h3 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    HTML Intro
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Learn what HTML is and how it works
                  </p>
                </div>
              </div>
            </Link>

            {/* Next Step */}
            <Link
              href="/html/basics"
              className="group bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition text-right"
            >
              <div className="flex items-start justify-end">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Next
                  </p>
                  <h3 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                    HTML Basics
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Learn fundamental HTML tags and structure
                  </p>
                </div>
                <div className="ml-3 text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 transition">
                  →
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
