"use client";

import {
  FaInfoCircle,
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLParagraphsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    formatting: true,
    semantic: true,
    examples: true,
    bestPractices: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Paragraph Examples</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      padding: 20px; 
      max-width: 800px; 
      margin: 0 auto; 
    }
    .example { 
      margin-bottom: 30px; 
      border-left: 4px solid #3b82f6; 
      padding-left: 15px; 
    }
    .bad-example { 
      border-left: 4px solid #ef4444; 
    }
    .text-sample {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
    }
    .btn { 
      display: inline-block; 
      padding: 8px 16px; 
      background: #3b82f6; 
      color: white; 
      border-radius: 4px; 
      text-decoration: none; 
    }
    .btn:hover { 
      background: #2563eb; 
    }
  </style>
</head>
<body>
  <h1>HTML Paragraphs Guide</h1>
  
  <div class="example">
    <h2>Basic Paragraphs</h2>
    <div class="text-sample">
      <p>This is a standard paragraph in HTML. The browser will automatically add some margin above and below the paragraph to separate it from other elements.</p>
      
      <p>This is another paragraph. Notice how it appears on a new line with spacing between it and the previous paragraph.</p>
    </div>
  </div>

  <div class="example">
    <h2>Text Formatting</h2>
    <div class="text-sample">
      <p>You can <strong>bold text</strong> or <em>italicize it</em> within paragraphs.</p>
      <p>Other formatting includes <u>underlined text</u>, <code>code snippets</code>, and <sup>superscript</sup> or <sub>subscript</sub> text.</p>
      <p>Line<br>breaks<br>within<br>paragraphs.</p>
    </div>
  </div>

  <div class="example">
    <h2>Semantic Text Elements</h2>
    <div class="text-sample">
      <p>The <mark>mark element</mark> highlights text for reference.</p>
      <p>The <small>small element</small> represents side-comments.</p>
      <p><time datetime="2023-05-15">May 15, 2023</time> shows a machine-readable date.</p>
      <p>The <abbr title="World Health Organization">WHO</abbr> abbreviation shows a tooltip.</p>
    </div>
  </div>

  <div class="example bad-example">
    <h2>Bad Practices</h2>
    <div class="text-sample">
      <div>Using divs instead of paragraphs for text content.</div>
      <br><br><br>
      <p>Too many line breaks instead of proper margin control.</p>
      <span style="display: block">Using spans with block display as paragraphs.</span>
    </div>
    <p>These approaches may work visually but lack semantic meaning and can cause accessibility issues.</p>
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

  const paragraphElements = [
    {
      element: "<p>",
      description: "The standard paragraph element for blocks of text",
      example: `<p>This is a paragraph of text.</p>`,
      usage: "Primary element for textual content",
    },
    {
      element: "<br>",
      description: "Line break within text (use sparingly)",
      example: `<p>First line<br>Second line</p>`,
      usage: "For intentional line breaks within content",
    },
    {
      element: "<pre>",
      description: "Preformatted text preserving whitespace",
      example: `<pre>function hello() {
  console.log("Hello");
}</pre>`,
      usage: "Code blocks or text requiring exact formatting",
    },
    {
      element: "<blockquote>",
      description: "Block quotation from another source",
      example: `<blockquote cite="https://example.com">
  <p>This is a quoted passage.</p>
</blockquote>`,
      usage: "Extended quotations with citation",
    },
    {
      element: "<hr>",
      description: "Thematic break between content sections",
      example: `<p>First section</p>
<hr>
<p>Second section</p>`,
      usage: "Visual separation between content areas",
    },
  ];

  const formattingElements = [
    {
      element: "<strong>",
      description: "Important text (typically bold)",
      example: `<p>This is <strong>important</strong> text.</p>`,
      note: "Semantic importance, not just visual styling",
    },
    {
      element: "<em>",
      description: "Emphasized text (typically italic)",
      example: `<p>Please <em>read carefully</em>.</p>`,
      note: "For verbal emphasis, not just visual styling",
    },
    {
      element: "<mark>",
      description: "Highlighted text for reference",
      example: `<p>The <mark>key point</mark> is highlighted.</p>`,
      note: "Like using a highlighter on paper",
    },
    {
      element: "<small>",
      description: "Side comments and fine print",
      example: `<p>Main content <small>Additional notes</small></p>`,
      note: "For legally required disclaimers etc.",
    },
    {
      element: "<code>",
      description: "Inline code snippets",
      example: `<p>Use <code>console.log()</code> for debugging.</p>`,
      note: "For short code references in text",
    },
  ];

  const bestPractices = [
    {
      title: "Semantic Structure",
      description:
        "Use paragraph elements for text content rather than generic containers",
      example: `<p>This is proper paragraph usage.</p>`,
      badExample: `<div>This text should be in a paragraph.</div>`,
    },
    {
      title: "Line Breaks",
      description:
        "Avoid excessive <br> tags for spacing - use CSS margins instead",
      example: `<p class="spaced">Properly spaced paragraph</p>`,
      badExample: `<p>Text<br><br><br>More text</p>`,
    },
    {
      title: "Text Formatting",
      description:
        "Use semantic elements rather than styling elements directly",
      example: `<p><strong>Important</strong> information</p>`,
      badExample: `<p><span style="font-weight: bold">Important</span> information</p>`,
    },
    {
      title: "Accessibility",
      description: "Ensure proper contrast and readable line lengths",
      example: `<p style="max-width: 65ch">Properly sized paragraph for readability</p>`,
      badExample: `<p style="width: 1000px">Extremely long lines are hard to read</p>`,
    },
  ];

  const practicalExamples = [
    {
      title: "Article Content",
      code: `<article>
  <h1>Blog Post Title</h1>
  <p>This is the introductory paragraph that sets up what the article will be about.</p>
  
  <h2>First Section</h2>
  <p>The first main point of the article with supporting details and explanations.</p>
  <p>Additional paragraphs develop the idea further with examples and evidence.</p>
  
  <blockquote>
    <p>An important quotation from a relevant source that supports the article's point.</p>
    <footer>- Source Name</footer>
  </blockquote>
  
  <h2>Conclusion</h2>
  <p>Final thoughts that summarize the article's main points and leave the reader with something to consider.</p>
</article>`,
    },
    {
      title: "Technical Documentation",
      code: `<section>
  <h1>API Reference</h1>
  <p>The following documentation explains how to use our REST API endpoints.</p>
  
  <h2>Authentication</h2>
  <p>All requests require an API key passed in the header:</p>
  <pre><code>Authorization: Bearer your_api_key</code></pre>
  
  <h2>Endpoints</h2>
  <p><strong>GET /users</strong> - Returns a list of users</p>
  <p><em>Parameters:</em></p>
  <p><code>limit</code> - Number of results to return (default: 10)</p>
  <p><code>offset</code> - Pagination offset (default: 0)</p>
</section>`,
    },
    {
      title: "Accessible Content",
      code: `<main>
  <h1>Accessibility Guidelines</h1>
  <p>Creating accessible web content benefits all users, including those with disabilities.</p>
  
  <h2>Text Considerations</h2>
  <p>Ensure proper contrast between text and background. The <mark>minimum recommended ratio</mark> is 4.5:1 for normal text.</p>
  
  <p>Use semantic HTML elements like <code>&lt;strong&gt;</code> and <code>&lt;em&gt;</code> rather than just bold and italic styling.</p>
  
  <h2>Additional Resources</h2>
  <p><small>Note: These guidelines are based on WCAG 2.1 standards.</small></p>
</main>`,
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Paragraphs Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Proper use of paragraphs and text formatting in HTML
        </p>
      </header>

      {/* Paragraph Elements */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("basics")}
          aria-expanded={expandedSections["basics"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Paragraph Elements
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["basics"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["basics"] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paragraphElements.map((element, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-lg mb-1">
                      <span className="text-purple-600 dark:text-purple-400">
                        {element.element}
                      </span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {element.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Usage: {element.usage}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(element.example, element.element);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Copy example for ${element.element}`}
                  >
                    {copied === element.element ? (
                      <FaCheck className="text-green-500 text-sm" />
                    ) : (
                      <FaCopy className="text-sm" />
                    )}
                  </button>
                </div>
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>{element.example}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Text Formatting */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("formatting")}
          aria-expanded={expandedSections["formatting"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-green-500" />
            Text Formatting Elements
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["formatting"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["formatting"] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {formattingElements.map((element, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-lg mb-1">
                      <span className="text-purple-600 dark:text-purple-400">
                        {element.element}
                      </span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {element.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Note: {element.note}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(element.example, element.element);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Copy example for ${element.element}`}
                  >
                    {copied === element.element ? (
                      <FaCheck className="text-green-500 text-sm" />
                    ) : (
                      <FaCopy className="text-sm" />
                    )}
                  </button>
                </div>
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>{element.example}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("bestPractices")}
          aria-expanded={expandedSections["bestPractices"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-orange-500" />
            Paragraph Best Practices
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["bestPractices"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["bestPractices"] && (
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{practice.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {practice.description}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-4 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Good Example
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            practice.example,
                            `${practice.title}-good`
                          )
                        }
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {copied === `${practice.title}-good` ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                    </div>
                    <CodeEditor
                      value={practice.example}
                      language="html"
                      padding={8}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }}
                      className="dark:bg-gray-900 dark:text-gray-200"
                      readOnly
                    />
                  </div>
                  <div className="p-4 bg-red-50/50 dark:bg-red-900/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        Bad Example
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            practice.badExample,
                            `${practice.title}-bad`
                          )
                        }
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {copied === `${practice.title}-bad` ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                    </div>
                    <CodeEditor
                      value={practice.badExample}
                      language="html"
                      padding={8}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#fef2f2",
                        fontFamily:
                          "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }}
                      className="dark:bg-gray-900 dark:text-gray-200"
                      readOnly
                    />
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
            <FaCode className="text-blue-500" />
            Practical Examples
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium">{example.title}</h3>
                  <button
                    onClick={() => copyToClipboard(example.code, example.title)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {copied === example.title ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy
                      </>
                    )}
                  </button>
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

      {/* Interactive Playground */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                Paragraphs Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with paragraph formatting in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Paragraph Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering proper paragraph usage
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
                  Proper Paragraph Structure
                </h4>
                <div className="space-y-4 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                  <p className="text-gray-700 dark:text-gray-300">
                    This is a properly structured paragraph with appropriate
                    line length and spacing. The content flows naturally and is
                    easy to read.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Subsequent paragraphs are separated by appropriate margins,
                    creating a comfortable reading rhythm without excessive
                    space.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Semantic Formatting
                </h4>
                <div className="space-y-4 pl-4 border-l-2 border-green-200 dark:border-green-800">
                  <p>
                    This paragraph contains <strong>important text</strong> and{" "}
                    <em>emphasized content</em> using semantic HTML elements.
                  </p>
                  <p>
                    Technical terms like <code>console.log()</code> are marked
                    up properly, and <mark>key points</mark> are highlighted for
                    emphasis.
                  </p>
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

      {/* Continue Learning */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link
            href="/html/headings"
            className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              <FaArrowLeft className="text-blue-500" />
              HTML Headings
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn about heading hierarchy and structure.
            </p>
          </Link>

          <Link
            href="/html/styles"
            className="border border-green-200 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
          >
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              HTML Styles
              <FaArrowRight className="text-green-500" />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore CSS styling and inline styles for HTML elements.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
