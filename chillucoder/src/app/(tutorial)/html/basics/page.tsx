"use client"
import { useRouter } from 'next/navigation';
import {
  FaCode,
  FaTags,
  FaPlay,
  FaInfoCircle,
  FaLaptopCode,
  FaLightbulb,
} from "react-icons/fa";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";

export default function HTMLBasicsPage() {
  const router = useRouter();
  const basicTags = [
    {
      tag: "<!DOCTYPE html>",
      description: "Defines the document type and HTML version (HTML5)",
      importance: "Required",
    },
    {
      tag: "<html>",
      description: "Root element that wraps the entire HTML document",
      importance: "Required",
    },
    {
      tag: "<head>",
      description: "Contains page info like title, styles, and meta data",
      importance: "Required",
    },
    {
      tag: "<title>",
      description: "Shows text on browser tab (used in SEO)",
      importance: "Required",
    },
    {
      tag: "<meta>",
      description:
        "Sets character encoding, responsive settings, and page info",
      importance: "Highly Recommended",
    },
    {
      tag: "<link>",
      description: "Links external files like CSS",
      importance: "Highly Recommended",
    },
    {
      tag: "<style>",
      description: "Writes internal CSS styles",
      importance: "Highly Recommended",
    },
    {
      tag: "<script>",
      description: "Adds JavaScript for interactive features",
      importance: "Highly Recommended",
    },
    {
      tag: "<body>",
      description: "Holds everything visible on the page",
      importance: "Required",
    },

    // Structure
    {
      tag: "<div>",
      description: "Block-level container for layout or grouping content",
      importance: "Layout",
    },
    {
      tag: "<span>",
      description: "Inline container for text and styling",
      importance: "Styling",
    },
    {
      tag: "<section>",
      description: "Groups related content into sections",
      importance: "Semantic Value",
    },
    {
      tag: "<article>",
      description: "Used for independent pieces like blog posts",
      importance: "Semantic Value",
    },
    {
      tag: "<header>",
      description: "Defines the top part (e.g., logo, nav)",
      importance: "Semantic Value",
    },
    {
      tag: "<footer>",
      description: "Defines the bottom part (e.g., copyright)",
      importance: "Semantic Value",
    },
    {
      tag: "<main>",
      description: "Marks the main content area",
      importance: "Semantic Value",
    },
    {
      tag: "<nav>",
      description: "Contains navigation links",
      importance: "Semantic Value",
    },
    {
      tag: "<aside>",
      description: "Holds side content like ads or tips",
      importance: "Semantic Value",
    },

    // Text
    {
      tag: "<h1>-<h6>",
      description: "Headings (h1 = most important)",
      importance: "Semantic Value",
    },
    {
      tag: "<p>",
      description: "Creates a paragraph of text",
      importance: "Structural",
    },
    {
      tag: "<br>",
      description: "Line break (new line)",
      importance: "Structural",
    },
    {
      tag: "<hr>",
      description: "Horizontal line for content separation",
      importance: "Structural",
    },

    // Text formatting
    {
      tag: "<strong>",
      description: "Bold text to show importance",
      importance: "Styling",
    },
    {
      tag: "<em>",
      description: "Italic text for emphasis",
      importance: "Styling",
    },
    {
      tag: "<b>",
      description: "Bold text (no special meaning)",
      importance: "Styling",
    },
    {
      tag: "<i>",
      description: "Italic text (no special meaning)",
      importance: "Styling",
    },
    { tag: "<u>", description: "Underlined text", importance: "Styling" },
    {
      tag: "<mark>",
      description: "Highlights the text",
      importance: "Styling",
    },
    { tag: "<small>", description: "Smaller text", importance: "Styling" },
    {
      tag: "<del>",
      description: "Strikethrough (deleted) text",
      importance: "Styling",
    },
    {
      tag: "<ins>",
      description: "Inserted text (usually underlined)",
      importance: "Styling",
    },
    {
      tag: "<sub>",
      description: "Subscript text (below)",
      importance: "Styling",
    },
    {
      tag: "<sup>",
      description: "Superscript text (above)",
      importance: "Styling",
    },

    // Links & Media
    {
      tag: "<a>",
      description: "Adds a link (use href)",
      importance: "Fundamental",
    },
    {
      tag: "<img>",
      description: "Displays an image (needs src)",
      importance: "Visual Content",
    },
    {
      tag: "<figure>",
      description: "Groups an image and caption",
      importance: "Semantic Value",
    },
    {
      tag: "<figcaption>",
      description: "Caption for a <figure>",
      importance: "Semantic Value",
    },
    { tag: "<audio>", description: "Plays audio files", importance: "Media" },
    { tag: "<video>", description: "Plays video files", importance: "Media" },
    {
      tag: "<source>",
      description: "Provides media source for <video>/<audio>",
      importance: "Media",
    },
    {
      tag: "<iframe>",
      description: "Displays external page in a box",
      importance: "Media",
    },

    // Lists
    {
      tag: "<ul>",
      description: "Unordered (bullet point) list",
      importance: "Structural",
    },
    {
      tag: "<ol>",
      description: "Ordered (numbered) list",
      importance: "Structural",
    },
    {
      tag: "<li>",
      description: "List item inside ul or ol",
      importance: "Structural",
    },

    // Tables
    { tag: "<table>", description: "Starts a table", importance: "Structural" },
    {
      tag: "<tr>",
      description: "Adds a row to a table",
      importance: "Structural",
    },
    { tag: "<td>", description: "Adds data cell", importance: "Structural" },
    {
      tag: "<th>",
      description: "Adds table header cell (bold)",
      importance: "Structural",
    },
    {
      tag: "<thead>",
      description: "Groups header rows",
      importance: "Semantic Value",
    },
    {
      tag: "<tbody>",
      description: "Groups body rows",
      importance: "Semantic Value",
    },
    {
      tag: "<tfoot>",
      description: "Groups footer rows",
      importance: "Semantic Value",
    },

    // Forms
    {
      tag: "<form>",
      description: "Creates a form to collect user input",
      importance: "Fundamental",
    },
    {
      tag: "<input>",
      description: "Creates an input field",
      importance: "Fundamental",
    },
    {
      tag: "<textarea>",
      description: "Multi-line input field",
      importance: "Fundamental",
    },
    {
      tag: "<button>",
      description: "Clickable button",
      importance: "Fundamental",
    },
    {
      tag: "<select>",
      description: "Drop-down menu",
      importance: "Form Element",
    },
    {
      tag: "<option>",
      description: "Options for drop-down",
      importance: "Form Element",
    },
    {
      tag: "<label>",
      description: "Label for form elements",
      importance: "Accessibility",
    },

    // Extras
    {
      tag: "<details>",
      description: "Expandable section of content",
      importance: "Semantic Value",
    },
    {
      tag: "<summary>",
      description: "Title for <details>",
      importance: "Semantic Value",
    },
    {
      tag: "<canvas>",
      description: "Drawing area using JavaScript",
      importance: "Visual/Graphics",
    },
    {
      tag: "<svg>",
      description: "Draw shapes and icons using code",
      importance: "Graphics",
    },
    {
      tag: "<noscript>",
      description: "Fallback if JavaScript is disabled",
      importance: "Accessibility",
    },
    {
      tag: "<template>",
      description: "Hidden HTML for future use",
      importance: "Advanced",
    },
  ];

  const exampleCode = (code: string) => (
    <CodeEditor
      value={code}
      language="html"
      padding={12}
      minHeight={80}
      style={{
        color: "#451255", // Light text
        fontSize: 14,
        borderRadius: 8,
        border: "1px solid #888", // Border for separation
        fontFamily:
          "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
      }}
      readOnly
    />
  );

  const studentBenefits = [
    {
      icon: <FaLaptopCode className="text-blue-500" />,
      title: "Industry-Standard Foundation",
      description:
        "Learn exactly how professional developers structure HTML documents",
    },
    {
      icon: <FaCode className="text-purple-500" />,
      title: "Debugging Skills",
      description:
        "Understand common mistakes and how to fix them early in your learning",
    },
    {
      icon: <FaLightbulb className="text-yellow-500" />,
      title: "Semantic Understanding",
      description:
        "Grasp why proper HTML structure matters for accessibility and SEO",
    },
  ];

  return (
    <div className="">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 mb-3">
          HTML Basics
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mb-4 rounded-full"></div>
        <p className="text-gray-700 dark:text-gray-300">
          Master the foundational markup language that powers every website on
          the internet.
        </p>
      </header>

      {/* Why Learn HTML Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <FaInfoCircle className="text-blue-500 mr-2" />
          Why HTML Matters for Developers
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {studentBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="text-2xl mb-2">{benefit.icon}</div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-1">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HTML Document Structure */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaCode className="text-blue-500 text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Anatomy of an HTML Document
          </h2>
        </div>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            Every valid HTML document follows a specific structure that browsers
            use to render content correctly:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <pre className="overflow-x-auto text-sm">
              <code className="language-html">
                {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Title</title>
</head>
<body>
  <!-- Visible content goes here -->
</body>
</html>`}
              </code>
            </pre>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold mb-2 dark:text-blue-200">
              Critical Components:
            </h3>
            <ul className="list-disc pl-5 space-y-1 dark:text-blue-100">
              <li>
                <code>lang=&quot;en&quot;</code> - Specifies language for
                accessibility
              </li>
              <li>
                <code>charset=&quot;UTF-8&quot;</code> - Ensures proper
                character encoding
              </li>
              <li>Viewport meta tag - Makes site mobile-friendly</li>
              <li>
                Semantic structure - Helps search engines understand content
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Essential HTML Tags */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaTags className="text-purple-500 text-2xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Essential HTML Tags Cheat Sheet
          </h2>
        </div>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            These are the building blocks you&apos;ll use in nearly every
            project:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
                  <th className="text-left py-3 px-4">Tag</th>
                  <th className="text-left py-3 px-4">Description</th>
                  <th className="text-left py-3 px-4">Importance</th>
                </tr>
              </thead>
              <tbody>
                {basicTags.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="py-3 px-4 font-mono">
                      <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                        {item.tag}
                      </code>
                    </td>
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          item.importance === "Required"
                            ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                            : item.importance === "Highly Recommended"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                              : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {item.importance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
          <FaLightbulb className="text-yellow-500 mr-2" />
          Common Beginner Mistakes to Avoid
        </h2>

        <div className="space-y-6">
          {/* 1. Missing Closing Tags */}
          <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">
              1. Missing Closing Tags
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-2">
              Always close your tags. Missing tags can break layout and cause
              rendering issues.
            </p>
            {exampleCode(`<!-- Wrong -->
<p>This paragraph has no closing tag

<!-- Right -->
<p>This paragraph is properly closed</p>`)}
          </div>

          {/* 2. Improper Nesting */}
          <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800">
            <h3 className="font-bold text-amber-700 dark:text-amber-300 mb-2">
              2. Improper Nesting
            </h3>
            <p className="text-amber-600 dark:text-amber-300 mb-2">
              Tags must be closed in the correct order. Nest properly.
            </p>
            {exampleCode(`<!-- Wrong -->
<p><strong>Wrong order</p></strong>

<!-- Right -->
<p><strong>Correct nesting</strong></p>`)}
          </div>

          {/* 3. Missing Alt on Images */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">
              3. Missing alt on Images
            </h3>
            <p className="text-yellow-600 dark:text-yellow-300 mb-2">
              Alt text helps screen readers and SEO. Always use it for{" "}
              <code>&lt;img&gt;</code>.
            </p>
            {exampleCode(`<!-- Wrong -->
<img src="logo.png">

<!-- Right -->
<img src="logo.png" alt="Company Logo">`)}
          </div>

          {/* 4. Block Elements Inside Inline Tags */}
          <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">
              4. Block Inside Inline
            </h3>
            <p className="text-purple-600 dark:text-purple-300 mb-2">
              Never place block elements like <code>&lt;div&gt;</code> inside
              inline tags like <code>&lt;span&gt;</code>.
            </p>
            {exampleCode(`<!-- Wrong -->
<span><div>Invalid!</div></span>

<!-- Right -->
<div><span>Valid</span></div>`)}
          </div>

          {/* 5. Missing Viewport Meta */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
              5. Missing Viewport Meta
            </h3>
            <p className="text-blue-600 dark:text-blue-300 mb-2">
              Missing this tag causes mobile scaling issues.
            </p>
            {exampleCode(
              `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
            )}
          </div>

          {/* 6. Overusing Inline Styles */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900/10 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">
              6. Too Much Inline Styling
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Keep your styles in CSS. Avoid inline styles for reusable and
              clean code.
            </p>
            {exampleCode(`<!-- Avoid -->
<h1 style="color: red;">Hi</h1>

<!-- Better -->
<h1 class="highlight">Hi</h1>

/* In CSS */
.highlight {
  color: red;
}`)}
          </div>
        </div>
      </section>

      {/* Practice Section */}
      <section className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Hands-On Practice
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Apply responsive design concepts in our interactive playground:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Experiment with media queries and breakpoints</li>
              <li>Test flexbox and grid layouts</li>
              <li>See real-time responsive preview</li>
              <li>Save your responsive designs</li>
            </ul>
            <button
              onClick={() => {
                const responsivePracticeCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Practice</title>
  <style>
    /* Base mobile styles */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f4f4f4;
    }
    
    .container {
      width: 95%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
    }
    
    header {
      background: #3b82f6;
      color: white;
      padding: 1rem;
      text-align: center;
      margin-bottom: 1rem;
    }
    
    nav {
      background: #1e40af;
      padding: 0.5rem;
    }
    
    nav ul {
      display: flex;
      flex-direction: column;
      list-style: none;
    }
    
    nav li {
      padding: 0.5rem;
      text-align: center;
    }
    
    nav a {
      color: white;
      text-decoration: none;
    }
    
    .main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin: 1rem 0;
    }
    
    .card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    footer {
      background: #1e3a8a;
      color: white;
      text-align: center;
      padding: 1rem;
      margin-top: 1rem;
    }
    
    /* Tablet styles */
    @media (min-width: 768px) {
      nav ul {
        flex-direction: row;
        justify-content: center;
      }
      
      .main {
        flex-direction: row;
        flex-wrap: wrap;
      }
      
      .card {
        flex: 1 1 calc(50% - 0.5rem);
      }
    }
    
    /* Desktop styles */
    @media (min-width: 1024px) {
      .card {
        flex: 1 1 calc(33.333% - 0.666rem);
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>Responsive Layout Practice</h1>
    <p>Resize the browser to see the responsive behavior</p>
  </header>
  
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  
  <div class="container">
    <main class="main">
      <article class="card">
        <h2>Article 1</h2>
        <p>This is a sample card that will respond to different screen sizes.</p>
      </article>
      
      <article class="card">
        <h2>Article 2</h2>
        <p>Notice how the layout changes at different breakpoints.</p>
      </article>
      
      <article class="card">
        <h2>Article 3</h2>
        <p>Try adding your own content and adjusting the media queries.</p>
      </article>
    </main>
  </div>
  
  <footer>
    <p>&copy; 2025 Responsive Design Practice</p>
  </footer>
</body>
</html>`;
                localStorage.setItem("html-code", responsivePracticeCode);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
            >
              <FaPlay className="inline mr-2" /> Launch HTML Editor
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm overflow-x-auto">
                <code className="language-html">
                  {`<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Mobile-first base styles */
    .container {
      width: 100%;
      padding: 1rem;
    }
    
    /* Tablet breakpoint */
    @media (min-width: 768px) {
      .container {
        max-width: 720px;
        margin: 0 auto;
      }
    }
    
    /* Desktop breakpoint */
    @media (min-width: 1024px) {
      .container {
        max-width: 960px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Responsive Practice</h1>
    <p>Try adding your own responsive elements</p>
  </div>
</body>
</html>`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Continue Your Learning Path
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/html/editors"
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
                  HTML Editors
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Try Our Online HTML Editor
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="/html/structure"
            className="group bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition text-right"
          >
            <div className="flex items-start justify-end">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Next
                </p>
                <h3 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  HTML Document Structure
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Deep dive into semantic HTML and proper nesting
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
  );
}
