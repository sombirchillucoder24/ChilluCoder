"use client";

import { FaInfoCircle, FaCode, FaCopy, FaCheck, FaChevronDown, FaPlay, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, MouseEvent } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLFormattingPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    semantic: true,
    examples: true,
    bestPractices: true
  });
  const router = useRouter();

  const handleOpenEditor = (content: string) => {
    try {
      localStorage.setItem('html-code', content);
      router.push('/compilers/html-editor');
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  // Basic template for the editor
  const getFullHtmlTemplate = (content: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Formatting Example</title>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      line-height: 1.6; 
      padding: 20px; 
      max-width: 800px; 
      margin: 0 auto; 
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;
  };

  // Handler for try buttons
  const handleTryButtonClick = (example: string) => (e: MouseEvent) => {
    e.stopPropagation();
    handleOpenEditor(getFullHtmlTemplate(example));
  };

const basicFormatting = [
    {
        element: "<b>",
        description: "Bold text (presentational)",
        example: `<p>This is <b>bold</b> text.</p>`,
        note: "Use <strong> for semantic importance"
    },
    {
        element: "<i>",
        description: "Italic text (presentational)",
        example: `<p>This is <i>italic</i> text.</p>`,
        note: "Use <em> for semantic emphasis"
    },
    {
        element: "<u>",
        description: "Underlined text",
        example: `<p>This is <u>underlined</u> text.</p>`,
        note: "Avoid - can be confused with links"
    },
    {
        element: "<sup>",
        description: "Superscript text",
        example: `<p>E = mc<sup>2</sup></p>`,
        note: "For exponents, footnotes, etc."
    },
    {
        element: "<sub>",
        description: "Subscript text",
        example: `<p>H<sub>2</sub>O</p>`,
        note: "For chemical formulas, etc."
    },
    {
        element: "<strong>",
        description: "Important text (semantic)",
        example: `<p><strong>Warning:</strong> Hot surface.</p>`,
        note: "Browsers typically render as bold"
    },
    {
        element: "<em>",
        description: "Emphasized text (semantic)",
        example: `<p>You <em>must</em> complete the form.</p>`,
        note: "Browsers typically render as italic"
    },
    {
        element: "<mark>",
        description: "Highlighted text",
        example: `<p>Search results for <mark>HTML</mark> formatting.</p>`,
        note: "Default background color is yellow"
    },
    {
        element: "<small>",
        description: "Smaller text",
        example: `<p>Regular text <small>Small disclaimer</small></p>`,
        note: "Often used for legal disclaimers"
    },
    {
        element: "<del>",
        description: "Deleted text",
        example: `<p>Price: <del>$99</del> $79</p>`,
        note: "Typically rendered with strikethrough"
    },
    {
        element: "<ins>",
        description: "Inserted text",
        example: `<p>My favorite color is <del>blue</del> <ins>red</ins>.</p>`,
        note: "Typically rendered with underline"
    },
    {
        element: "<code>",
        description: "Inline code snippet",
        example: `<p>Use the <code>printf()</code> function.</p>`,
        note: "Monospace font by default"
    },
    {
        element: "<kbd>",
        description: "Keyboard input",
        example: `<p>Press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save.</p>`,
        note: "Represents user keyboard input"
    },
    {
        element: "<samp>",
        description: "Sample output",
        example: `<p>Output: <samp>File not found.</samp></p>`,
        note: "For program output samples"
    },
    {
        element: "<var>",
        description: "Variable name",
        example: `<p>The variable <var>x</var> represents...</p>`,
        note: "Typically rendered in italics"
    },
    {
        element: "<abbr>",
        description: "Abbreviation or acronym",
        example: `<p>The <abbr title="World Health Organization">WHO</abbr> was founded...</p>`,
        note: "Use title attribute for full expansion"
    },
    {
        element: "<q>",
        description: "Short inline quotation",
        example: `<p>She said <q>Hello world!</q></p>`,
        note: "Browsers typically add quotation marks"
    },
    {
        element: "<cite>",
        description: "Citation or reference",
        example: `<p><cite>The Scream</cite> by Edvard Munch</p>`,
        note: "Typically rendered in italics"
    },
    {
        element: "<time>",
        description: "Machine-readable date/time",
        example: `<p>The event is on <time datetime="2023-12-25">Christmas</time>.</p>`,
        note: "Use datetime attribute for parsing"
    }
];

  const semanticFormatting = [
    {
      element: "<strong>",
      description: "Indicates important text",
      example: `<p><strong>Warning:</strong> Do not touch.</p>`,
      note: "Screen readers may emphasize"
    },
    {
      element: "<em>",
      description: "Indicates emphasized text",
      example: `<p>You <em>must</em> complete this.</p>`,
      note: "Screen readers may change tone"
    },
    {
      element: "<mark>",
      description: "Highlighted text for reference",
      example: `<p>The <mark>key term</mark> is highlighted.</p>`,
      note: "Like a highlighter pen"
    },
    {
      element: "<small>",
      description: "Side comments and fine print",
      example: `<p>Price: $9.99 <small>+ tax</small></p>`,
      note: "For legal disclaimers, etc."
    },
    {
      element: "<code>",
      description: "Inline code snippet",
      example: `<p>Use <code>console.log()</code> for debugging.</p>`,
      note: "For short code references"
    }
  ];

  const bestPractices = [
    {
      title: "Semantic Over Presentational",
      description: "Use semantic elements that convey meaning rather than just visual styling",
      example: `<p><strong>Important:</strong> Read carefully.</p>`,
      badExample: `<p><b>Important:</b> Read carefully.</p>`
    },
    {
      title: "Accessibility",
      description: "Ensure text formatting works for all users, including screen readers",
      example: `<p><em>Please</em> fill out the form.</p>`,
      badExample: `<p><i>Please</i> fill out the form.</p>`
    },
    {
      title: "Moderation",
      description: "Avoid excessive formatting that reduces readability",
      example: `<p>Use <strong>sparingly</strong> for emphasis.</p>`,
      badExample: `<p><strong><em><u>Everything</u></em></strong> is <mark>formatted</mark> <small>excessively</small>.</p>`
    }
  ];

  const practicalExamples = [
    {
      title: "Technical Article",
      code: `<article>
  <h1>JavaScript Closures</h1>
  
  <p>A <strong>closure</strong> is the combination of a function bundled together with references to its surrounding state. In other words, a closure gives you access to an outer function's scope from an inner function.</p>
  
  <p><em>Example:</em></p>
  
  <pre><code>function outer() {
  const name = 'John';
  
  function inner() {
    console.log(name);
  }
  
  return inner;
}</code></pre>
  
  <p>In this example, <code>inner()</code> forms a closure that includes the <mark>name</mark> variable from its parent scope.</p>
  
  <p><small>Note: Closures are created every time a function is created.</small></p>
</article>`
    },
    {
      title: "Product Description",
      code: `<section>
  <h1>Premium Coffee Beans</h1>
  
  <p>Our <strong>single-origin</strong> coffee beans are sourced directly from small farms in Colombia. <em>Freshly roasted</em> to bring out their natural flavors.</p>
  
  <p>Available in:</p>
  <ul>
    <li>Light roast <small>(fruity notes)</small></li>
    <li>Medium roast <small>(balanced flavor)</small></li>
    <li>Dark roast <small>(bold intensity)</small></li>
  </ul>
  
  <p>Price: $14.99 <small>per 12oz bag</small></p>
  
  <p><del>Was $16.99</del> <ins>Now 12% off</ins></p>
</section>`
    },
    {
      title: "Scientific Paper Excerpt",
      code: `<div class="paper">
  <h1>Effects of CO<sub>2</sub> on Plant Growth</h1>
  
  <p>Elevated CO<sub>2</sub> concentrations (800 ppm) resulted in a <strong>significant increase</strong> in biomass production compared to ambient conditions (400 ppm).</p>
  
  <p>The growth response followed the equation:</p>
  
  <p>y = 2x<sup>2</sup> + 3x + 5</p>
  
  <p><mark>Key finding:</mark> The effect was more pronounced in C<sub>3</sub> plants than in C<sub>4</sub> plants.</p>
  
  <p><small>Data collected from 2015-2020 at the University Research Center.</small></p>
</div>`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Text Formatting Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Semantic and presentational text formatting in HTML
        </p>
      </header>

      {/* Basic Formatting */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('basic')}
          aria-expanded={expandedSections['basic']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Basic Text Formatting
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['basic'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['basic'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {basicFormatting.map((element, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-lg mb-1">
                      <span className="text-purple-600 dark:text-purple-400">{element.element}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{element.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Note: {element.note}</p>
                  </div>
                  <div className="flex gap-1">
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
                    <button
                      onClick={handleTryButtonClick(element.example)}
                      className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                      aria-label={`Try ${element.element} in editor`}
                    >
                      <FaPlay className="text-sm" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>{element.example}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Semantic Formatting */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('semantic')}
          aria-expanded={expandedSections['semantic']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-green-500" />
            Semantic Text Elements
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['semantic'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['semantic'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {semanticFormatting.map((element, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-lg mb-1">
                      <span className="text-purple-600 dark:text-purple-400">{element.element}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{element.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Note: {element.note}</p>
                  </div>
                  <div className="flex gap-1">
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
                    <button
                      onClick={handleTryButtonClick(element.example)}
                      className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                      aria-label={`Try ${element.element} in editor`}
                    >
                      <FaPlay className="text-sm" />
                    </button>
                  </div>
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
          onClick={() => toggleSection('bestPractices')}
          aria-expanded={expandedSections['bestPractices']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-orange-500" />
            Formatting Best Practices
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['bestPractices'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['bestPractices'] && (
          <div className="space-y-6">
            {bestPractices.map((practice, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{practice.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{practice.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-4 border-r border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">Good Example</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => copyToClipboard(practice.example, `${practice.title}-good`)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {copied === `${practice.title}-good` ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaCopy />
                          )}
                        </button>
                        <button
                          onClick={handleTryButtonClick(practice.example)}
                          className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <FaPlay />
                        </button>
                      </div>
                    </div>
                    <CodeEditor
                      value={practice.example}
                      language="html"
                      padding={8}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#f8fafc",
                        fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }}
                      className="dark:bg-gray-900 dark:text-gray-200"
                      readOnly
                    />
                  </div>
                  <div className="p-4 bg-red-50/50 dark:bg-red-900/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-red-600 dark:text-red-400">Bad Example</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => copyToClipboard(practice.badExample, `${practice.title}-bad`)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {copied === `${practice.title}-bad` ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaCopy />
                          )}
                        </button>
                        <button
                          onClick={handleTryButtonClick(practice.badExample)}
                          className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                        >
                          <FaPlay />
                        </button>
                      </div>
                    </div>
                    <CodeEditor
                      value={practice.badExample}
                      language="html"
                      padding={8}
                      style={{
                        fontSize: 12,
                        backgroundColor: "#fef2f2",
                        fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
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
          onClick={() => toggleSection('examples')}
          aria-expanded={expandedSections['examples']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Practical Examples
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['examples'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['examples'] && (
          <div className="space-y-4">
            {practicalExamples.map((example, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium">{example.title}</h3>
                  <div className="flex gap-2">
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
                    <button
                      onClick={handleTryButtonClick(example.code)}
                      className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 text-sm px-3 py-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <FaPlay /> Try
                    </button>
                  </div>
                </div>
                <CodeEditor
                  value={example.code}
                  language="html"
                  padding={12}
                  style={{
                    fontSize: 13,
                    backgroundColor: "#f8fafc",
                    fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
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
                Formatting Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with text formatting in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Formatting Examples Preview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Ready-to-use examples covering text formatting
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
                  Basic Formatting
                </h4>
                <div className="space-y-2 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                  <p>This is <b>bold</b>, <i>italic</i>, and <u>underlined</u> text.</p>
                  <p>H<sub>2</sub>O and E = mc<sup>2</sup> examples.</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Semantic Formatting
                </h4>
                <div className="space-y-2 pl-4 border-l-2 border-green-200 dark:border-green-800">
                  <p><strong>Important:</strong> This is <em>emphasized</em> text.</p>
                  <p>The <mark>highlighted</mark> term and <code>code snippet</code>.</p>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  onClick={() => handleOpenEditor(getFullHtmlTemplate(practicalExamples[0].code))}
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
              All examples will be loaded into an interactive editor where you can modify and test them
            </p>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
<section className="mt-12">
  <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Continue Your HTML Journey</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Previous Topic Card */}
    <Link
      href="/html/styles"
      className="group border border-blue-100 bg-white dark:bg-gray-800 p-4 rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col hover:border-blue-200 dark:hover:border-blue-700"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
          <FaArrowLeft className="text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">HTML Styles</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 ml-11">Learn how to style HTML elements with CSS</p>
    </Link>

    {/* Next Topic Card */}
    <Link
      href="/html/quotation"
      className="group border border-green-100 bg-white dark:bg-gray-800 p-4 rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col hover:border-green-200 dark:hover:border-green-700"
    >
      <div className="flex items-center gap-3 mb-2">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">HTML Quotations</h3>
        <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
          <FaArrowRight className="text-green-500 dark:text-green-400" />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">Master different quotation elements in HTML</p>
    </Link>
  </div>
</section>
    </div>
  );
}