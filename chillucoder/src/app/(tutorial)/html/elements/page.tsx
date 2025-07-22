"use client";

import { FaCode, FaTags, FaInfoCircle, FaExternalLinkAlt, FaLaptopCode, FaLightbulb, FaLayerGroup, FaQuestionCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";

export default function HTMLBasicsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("structure");
  const basicTags = [
  { tag: "<!DOCTYPE html>", description: "Defines the document type and HTML version (HTML5)", importance: "Required" },
  { tag: "<html>", description: "Root element that wraps the entire HTML document", importance: "Required" },
  { tag: "<head>", description: "Contains page info like title, styles, and meta data", importance: "Required" },
  { tag: "<title>", description: "Shows text on browser tab (used in SEO)", importance: "Required" },
  { tag: "<meta>", description: "Sets character encoding, responsive settings, and page info", importance: "Highly Recommended" },
  { tag: "<link>", description: "Links external files like CSS", importance: "Highly Recommended" },
  { tag: "<style>", description: "Writes internal CSS styles", importance: "Highly Recommended" },
  { tag: "<script>", description: "Adds JavaScript for interactive features", importance: "Highly Recommended" },
  { tag: "<body>", description: "Holds everything visible on the page", importance: "Required" },

  // Structure
  { tag: "<div>", description: "Block-level container for layout or grouping content", importance: "Layout" },
  { tag: "<span>", description: "Inline container for text and styling", importance: "Styling" },
  { tag: "<section>", description: "Groups related content into sections", importance: "Semantic Value" },
  { tag: "<article>", description: "Used for independent pieces like blog posts", importance: "Semantic Value" },
  { tag: "<header>", description: "Defines the top part (e.g., logo, nav)", importance: "Semantic Value" },
  { tag: "<footer>", description: "Defines the bottom part (e.g., copyright)", importance: "Semantic Value" },
  { tag: "<main>", description: "Marks the main content area", importance: "Semantic Value" },
  { tag: "<nav>", description: "Contains navigation links", importance: "Semantic Value" },
  { tag: "<aside>", description: "Holds side content like ads or tips", importance: "Semantic Value" },

  // Text
  { tag: "<h1>-<h6>", description: "Headings (h1 = most important)", importance: "Semantic Value" },
  { tag: "<p>", description: "Creates a paragraph of text", importance: "Structural" },
  { tag: "<br>", description: "Line break (new line)", importance: "Structural" },
  { tag: "<hr>", description: "Horizontal line for content separation", importance: "Structural" },

  // Text formatting
  { tag: "<strong>", description: "Bold text to show importance", importance: "Styling" },
  { tag: "<em>", description: "Italic text for emphasis", importance: "Styling" },
  { tag: "<b>", description: "Bold text (no special meaning)", importance: "Styling" },
  { tag: "<i>", description: "Italic text (no special meaning)", importance: "Styling" },
  { tag: "<u>", description: "Underlined text", importance: "Styling" },
  { tag: "<mark>", description: "Highlights the text", importance: "Styling" },
  { tag: "<small>", description: "Smaller text", importance: "Styling" },
  { tag: "<del>", description: "Strikethrough (deleted) text", importance: "Styling" },
  { tag: "<ins>", description: "Inserted text (usually underlined)", importance: "Styling" },
  { tag: "<sub>", description: "Subscript text (below)", importance: "Styling" },
  { tag: "<sup>", description: "Superscript text (above)", importance: "Styling" },

  // Links & Media
  { tag: "<a>", description: "Adds a link (use href)", importance: "Fundamental" },
  { tag: "<img>", description: "Displays an image (needs src)", importance: "Visual Content" },
  { tag: "<figure>", description: "Groups an image and caption", importance: "Semantic Value" },
  { tag: "<figcaption>", description: "Caption for a <figure>", importance: "Semantic Value" },
  { tag: "<audio>", description: "Plays audio files", importance: "Media" },
  { tag: "<video>", description: "Plays video files", importance: "Media" },
  { tag: "<source>", description: "Provides media source for <video>/<audio>", importance: "Media" },
  { tag: "<iframe>", description: "Displays external page in a box", importance: "Media" },

  // Lists
  { tag: "<ul>", description: "Unordered (bullet point) list", importance: "Structural" },
  { tag: "<ol>", description: "Ordered (numbered) list", importance: "Structural" },
  { tag: "<li>", description: "List item inside ul or ol", importance: "Structural" },

  // Tables
  { tag: "<table>", description: "Starts a table", importance: "Structural" },
  { tag: "<tr>", description: "Adds a row to a table", importance: "Structural" },
  { tag: "<td>", description: "Adds data cell", importance: "Structural" },
  { tag: "<th>", description: "Adds table header cell (bold)", importance: "Structural" },
  { tag: "<thead>", description: "Groups header rows", importance: "Semantic Value" },
  { tag: "<tbody>", description: "Groups body rows", importance: "Semantic Value" },
  { tag: "<tfoot>", description: "Groups footer rows", importance: "Semantic Value" },

  // Forms
  { tag: "<form>", description: "Creates a form to collect user input", importance: "Fundamental" },
  { tag: "<input>", description: "Creates an input field", importance: "Fundamental" },
  { tag: "<textarea>", description: "Multi-line input field", importance: "Fundamental" },
  { tag: "<button>", description: "Clickable button", importance: "Fundamental" },
  { tag: "<select>", description: "Drop-down menu", importance: "Form Element" },
  { tag: "<option>", description: "Options for drop-down", importance: "Form Element" },
  { tag: "<label>", description: "Label for form elements", importance: "Accessibility" },

  // Extras
  { tag: "<details>", description: "Expandable section of content", importance: "Semantic Value" },
  { tag: "<summary>", description: "Title for <details>", importance: "Semantic Value" },
  { tag: "<canvas>", description: "Drawing area using JavaScript", importance: "Visual/Graphics" },
  { tag: "<svg>", description: "Draw shapes and icons using code", importance: "Graphics" },
  { tag: "<noscript>", description: "Fallback if JavaScript is disabled", importance: "Accessibility" },
  { tag: "<template>", description: "Hidden HTML for future use", importance: "Advanced" }
];

  // Toggle FAQ expansion
  const toggleExpand = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // ... (keep all your existing constant declarations)

  // Add FAQ items
  const faqItems = [
    {
      question: "Why is the DOCTYPE declaration important?",
      answer: "The DOCTYPE declaration tells browsers which version of HTML the page is written in. Without it, browsers may render your page in 'quirks mode' which can cause inconsistent styling and layout issues."
    },
    {
      question: "What's the difference between <div> and <section>?",
      answer: "<div> is a generic container with no semantic meaning, while <section> represents a thematic grouping of content. Use <section> when the content belongs together thematically and deserves its own heading."
    },
    {
      question: "How many heading levels should I use?",
      answer: "HTML supports h1-h6, but you should maintain a logical hierarchy. Typically, use one h1 per page (main title), with h2 for major sections, h3 for subsections, and so on. Avoid skipping levels (e.g., don't go from h2 to h4)."
    }
  ];

  // Add interactive quiz
  const quizQuestions = [
    {
      question: "Which tag is required for a valid HTML5 document?",
      options: [
        { text: "<!DOCTYPE html>", correct: true },
        { text: "<head>", correct: false },
        { text: "<body>", correct: false },
        { text: "<html>", correct: false }
      ],
      explanation: "While all these tags are typically used, only <!DOCTYPE html> is absolutely required to declare the document as HTML5."
    },
    {
      question: "Where should the <title> tag be placed?",
      options: [
        { text: "In the <body>", correct: false },
        { text: "In the <head>", correct: true },
        { text: "Right after <html>", correct: false },
        { text: "At the end of the document", correct: false }
      ],
      explanation: "The <title> tag belongs in the <head> section as it provides metadata about the document rather than visible content."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Enhanced Header with Learning Progress */}
      <header className="mb-8 relative">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
            HTML Fundamentals
          </h1>
          <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Beginner Level
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          Complete this lesson to unlock: <span className="font-medium">HTML Structure</span>
        </p>
      </header>

      {/* Interactive Tabs Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'structure' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('structure')}
        >
          Structure
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'elements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('elements')}
        >
          Elements
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'practice' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('practice')}
        >
          Practice
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'structure' && (
        <div>
          {/* Enhanced Document Structure Section */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
                <FaCode className="text-blue-500 mr-3" />
                Document Structure
              </h2>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Essential
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Basic Template</h3>
                <div className="relative">
                  <CodeEditor
                    value={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</body>
</html>`}
                    language="html"
                    padding={12}
                    style={{
                      fontSize: 13,
                      backgroundColor: "#f8fafc",
                      fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      borderRadius: "0.5rem",
                      border: "1px solid #e2e8f0"
                    }}
                    readOnly
                  />
                  <button 
                    className="absolute top-2 right-2 bg-blue-100 text-blue-800 p-1 rounded text-xs"
                    onClick={() => navigator.clipboard.writeText(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</body>
</html>`)}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">Visual Representation</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <div className="font-mono text-sm">html</div>
                      <div className="ml-4 space-y-3 mt-2">
                        <div className="border-l-4 border-purple-500 pl-3">
                          <div className="font-mono text-sm">head</div>
                        </div>
                        <div className="border-l-4 border-green-500 pl-3">
                          <div className="font-mono text-sm">body</div>
                          <div className="ml-4 space-y-2 mt-2">
                            <div className="border-l-4 border-yellow-500 pl-3">
                              <div className="font-mono text-sm">header</div>
                            </div>
                            <div className="border-l-4 border-red-500 pl-3">
                              <div className="font-mono text-sm">main</div>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-3">
                              <div className="font-mono text-sm">footer</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  This tree structure shows the proper nesting of HTML elements.
                </p>
              </div>
            </div>
          </section>

          {/* New Interactive Quiz Section */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
              <FaQuestionCircle className="text-yellow-500 mr-3" />
              Quick Knowledge Check
            </h2>
            
            <div className="space-y-6">
              {quizQuestions.map((quiz, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    {index + 1}. {quiz.question}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {quiz.options.map((option, optIndex) => (
                      <button
                        key={optIndex}
                        className={`p-3 text-left rounded border ${option.correct ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                      >
                        {option.text}
                        {option.correct && (
                          <span className="ml-2 text-green-600 dark:text-green-400">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Explanation:</strong> {quiz.explanation}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'elements' && (
        <div>
          {/* Enhanced HTML Tags Section */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
              <FaTags className="text-purple-500 mr-3" />
              Essential HTML Elements
            </h2>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search elements..."
                className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-700">
                    <th className="text-left py-3 px-4">Element</th>
                    <th className="text-left py-3 px-4">Description</th>
                    <th className="text-left py-3 px-4">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {basicTags.map((item, index) => (
                    <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3 px-4 font-mono">
                        <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                          {item.tag}
                        </code>
                      </td>
                      <td className="py-3 px-4">{item.description}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.importance === "Required" ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200" :
                          item.importance === "Highly Recommended" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200" :
                          "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                        }`}>
                          {item.importance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'practice' && (
        <div>
          {/* Enhanced Practice Section */}
          <section className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Hands-On Practice
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Try these exercises to reinforce your learning:
                </p>
                <ol className="list-decimal pl-5 space-y-3 mb-6 text-gray-700 dark:text-gray-300">
                  <li>Create a basic HTML page with proper structure</li>
                  <li>Add headings and paragraphs with different formatting</li>
                  <li>Insert an image with alt text</li>
                  <li>Create a simple navigation menu</li>
                  <li>Build a contact form with name and email fields</li>
                </ol>
                <div className="flex gap-3">
                  <Link 
                    href="/compilers/html-editor" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
                  >
                    Launch Editor
                  </Link>
                  <button className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded">
                    Show Solution
                  </button>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!DOCTYPE html>
<html>
<head>
  <title>Practice Page</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>Try adding:</p>
  <ul>
    <li>Multiple paragraphs</li>
    <li>Different heading levels</li>
    <li>Links to other pages</li>
  </ul>
</body>
</html>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* FAQ Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => toggleExpand(`faq-${index}`)}
              >
                <h3 className="font-medium text-left text-gray-800 dark:text-gray-200">
                  {item.question}
                </h3>
                {expandedSection === `faq-${index}` ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              {expandedSection === `faq-${index}` && (
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Continue Your Learning Path
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/html/structure"
            className="group bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <div className="flex items-start">
              <div className="mr-3 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition">
                ←
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Previous</p>
                <h3 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  HTML Document Structure
                </h3>
              </div>
            </div>
          </Link>
          <Link
            href="/html/attributes"
            className="group bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition text-right"
          >
            <div className="flex items-start justify-end">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Next</p>
                <h3 className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  HTML Attributes
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