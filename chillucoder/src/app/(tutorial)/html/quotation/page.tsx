"use client";

import {
  FaInfoCircle,
  FaQuoteLeft,
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

export default function HTMLQuotationsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    elements: true,
    attributes: true,
    examples: true,
    bestPractices: true,
    accessibility: true,
    microdata: true,
  });
  const router = useRouter();

  const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced HTML Quotations</title>
  <style>
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
      color: #333;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    blockquote {
      background: #f9f9f9;
      border-left: 4px solid #4a6ee0;
      margin: 1.5em 0;
      padding: 1em 1.5em;
      quotes: "\\201C""\\201D""\\2018""\\2019";
      position: relative;
    }
    blockquote:before {
      color: #4a6ee0;
      content: open-quote;
      font-size: 4em;
      line-height: 0.1em;
      margin-right: 0.25em;
      vertical-align: -0.4em;
      opacity: 0.3;
    }
    q {
      font-style: italic;
      color: #2c5282;
      quotes: "\\201C""\\201D" "\\2018""\\2019";
    }
    q:before {
      content: open-quote;
    }
    q:after {
      content: close-quote;
    }
    .quote-source {
      text-align: right;
      font-style: italic;
      margin-top: -0.5em;
      color: #666;
      font-size: 0.9em;
    }
    .quote-source:before {
      content: "— ";
    }
    [itemscope] {
      border: 1px dashed #e2e8f0;
      padding: 10px;
      margin: 10px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Advanced HTML Quotation Techniques</h1>
    
    <section>
      <h2>Semantic Blockquote with Microdata</h2>
      <blockquote cite="https://www.goodreads.com/quotes/7" itemscope itemtype="https://schema.org/Quotation">
        <p itemprop="text">The only way to do great work is to love what you do.</p>
        <footer class="quote-source" itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Steve Jobs</span>
        </footer>
        <meta itemprop="dateCreated" content="2005-06-12" />
      </blockquote>
    </section>
    
    <section>
      <h2>Inline Quote with ARIA</h2>
      <p>As the saying goes: <q cite="https://example.com/philosophy" aria-label="Quote: Knowledge is power">Knowledge is power</q> and this is especially true in technology.</p>
    </section>
    
    <section>
      <h2>Citation with Schema.org</h2>
      <p>Learn more about web development in <cite itemprop="name">HTML & CSS: Design and Build Websites</cite> by 
      <span itemprop="author" itemscope itemtype="https://schema.org/Person">
        <span itemprop="name">Jon Duckett</span>
      </span>.</p>
    </section>
    
    <section>
      <h2>Abbreviation with Definition</h2>
      <p>The <abbr title="World Wide Web Consortium" data-definition="International community that develops open standards for the Web">W3C</abbr> maintains web standards.</p>
      <button onclick="showDefinition('W3C')" aria-describedby="w3c-def">What is W3C?</button>
      <div id="w3c-def" hidden>International community that develops open standards for the Web</div>
    </section>
    
    <section>
      <h2>Nested Quotations</h2>
      <blockquote>
        <p>As Einstein famously said: <q>Imagination is more important than knowledge.</q></p>
        <footer class="quote-source">Response during an interview</footer>
      </blockquote>
    </section>
  </div>
  
  <script>
    function showDefinition(abbr) {
      const element = document.querySelector(\`abbr[title="\${abbr}"]\`);
      const definition = element.dataset.definition;
      const defElement = document.getElementById(\`\${abbr.toLowerCase()}-def\`);
      defElement.hidden = !defElement.hidden;
    }
  </script>
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

  const quotationElements = [
    {
      element: "<blockquote>",
      description: "Defines a section that is quoted from another source",
      example: `<blockquote cite="https://example.com" itemscope itemtype="https://schema.org/Quotation">
  <p itemprop="text">This is a quoted text from another source.</p>
  <footer itemprop="author" itemscope itemtype="https://schema.org/Person">
    <span itemprop="name">Author Name</span>
  </footer>
</blockquote>`,
      attributes: "cite, itemprop, itemscope, itemtype",
      usage: "For long quotations that should stand out as a separate block",
      technicalNotes: [
        "Supports microdata via itemscope/itemtype for rich snippets",
        "Should include a cite attribute when possible for attribution",
        "Consider adding ARIA role='quote' for accessibility",
      ],
    },
    {
      element: "<q>",
      description: "Defines a short inline quotation",
      example: `<p>He said <q cite="https://example.com" aria-label="Quote: This is a quote">This is a quote</q> and continued.</p>`,
      attributes: "cite, aria-label",
      usage: "For short quotes within a paragraph",
      technicalNotes: [
        "Browser automatically adds quotation marks (configurable via CSS quotes property)",
        "Use aria-label to provide context for screen readers",
        "Consider semantic meaning - use for actual quotes, not just emphasis",
      ],
    },
    {
      element: "<cite>",
      description: "Defines the title of a creative work",
      example: `<p>From <cite itemprop="name">The Great Gatsby</cite> by 
<span itemprop="author" itemscope itemtype="https://schema.org/Person">
  <span itemprop="name">F. Scott Fitzgerald</span>
</span></p>`,
      attributes: "itemprop, itemscope, itemtype",
      usage: "To reference books, movies, research papers, etc.",
      technicalNotes: [
        "Should reference the work title, not the author",
        "Can be enhanced with Schema.org microdata",
        "Browsers typically render in italic by default",
      ],
    },
    {
      element: "<abbr>",
      description: "Defines an abbreviation or acronym",
      example: `<p>The <abbr title="World Health Organization" 
data-definition="Specialized agency of the UN responsible for international public health"
aria-describedby="who-def">WHO</abbr> was founded in 1948.</p>
<button onclick="showDefinition('WHO')">Explain</button>
<div id="who-def" hidden>Specialized agency of the UN...</div>`,
      attributes: "title, data-*, aria-*",
      usage: "For abbreviations that need explanation on first use",
      technicalNotes: [
        "Title attribute shows on hover but isn't accessible to all users",
        "Consider adding interactive explanation for complex terms",
        "Use data-* attributes for extended definitions",
        "For acronyms, consider <acronym> element (though less supported)",
      ],
    },
  ];

  const practicalExamples = [
    {
      title: "Academic Citation with Schema.org",
      code: `<article itemscope itemtype="https://schema.org/ScholarlyArticle">
  <h2 itemprop="headline">Research Findings on Quantum Computing</h2>
  
  <blockquote cite="https://www.researchjournal.org/study123" 
              itemscope 
              itemtype="https://schema.org/Quotation">
    <p itemprop="text">The results indicate a 72% improvement in 
    processing speed using the new quantum algorithm.</p>
    <footer>
      <span itemprop="author" itemscope itemtype="https://schema.org/Person">
        <span itemprop="name">Dr. Alice Chen</span>,
      </span>
      <cite itemprop="isPartOf" itemscope itemtype="https://schema.org/Periodical">
        <span itemprop="name">Journal of Quantum Physics</span>,
      </cite>
      <time itemprop="datePublished" datetime="2023-05-15">May 2023</time>
    </footer>
  </blockquote>
  
  <p>This aligns with our own findings regarding 
  <abbr title="Quantum Field Theory" aria-label="Quantum Field Theory">QFT</abbr> 
  applications in <span itemprop="keywords">algorithm optimization</span>.</p>
</article>`,
    },
    {
      title: "News Article with Multiple Sources",
      code: `<article itemscope itemtype="https://schema.org/NewsArticle">
  <h1 itemprop="headline">City Council Approves New Green Initiative</h1>
  
  <div itemprop="articleBody">
    <p>In a 5-2 vote last night, the city council approved the new 
    environmental protection plan. Mayor Johnson stated:</p>
    
    <blockquote itemprop="citation" itemscope itemtype="https://schema.org/Quotation">
      <p itemprop="text">This initiative represents our commitment to 
      sustainable urban development while protecting local ecosystems.</p>
      <footer>
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Mayor Sarah Johnson</span>
        </span>,
        <time itemprop="dateCreated" datetime="2023-06-10T19:30:00-05:00">
          June 10, 2023
        </time>
      </footer>
    </blockquote>
    
    <p>Opposition leader <span itemprop="author">Councilman Harris</span> countered:</p>
    
    <blockquote class="opposition" itemscope itemtype="https://schema.org/Quotation">
      <p itemprop="text">While we support environmental protection, 
      this plan imposes unreasonable costs on local businesses.</p>
      <footer>
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Councilman Mark Harris</span>
        </span>
      </footer>
    </blockquote>
  </div>
</article>`,
    },
    {
      title: "Interactive Literary Reference",
      code: `<div class="literary-review" itemscope itemtype="https://schema.org/Review">
  <h2>Review: <cite itemprop="itemReviewed" itemscope itemtype="https://schema.org/Book">
    <span itemprop="name">Midnight's Children</span>
  </cite></h2>
  
  <div itemprop="reviewBody">
    <blockquote itemprop="citation" itemscope itemtype="https://schema.org/Quotation">
      <p itemprop="text">To understand just one life, you have to swallow the world.</p>
      <footer>
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Salman Rushdie</span>
        </span>,
        <cite itemprop="isPartOf" itemscope itemtype="https://schema.org/Book">
          <span itemprop="name">Midnight's Children</span>
        </cite>
      </footer>
    </blockquote>
    
    <p>This iconic opening sets the tone for Rushdie's masterpiece. 
    As noted by the <abbr title="New York Times" 
    data-definition="American daily newspaper based in New York City">NYT</abbr>, 
    it's <q cite="https://nytimes.com/review" 
    aria-label="New York Times review quote">one of the most important 
    novels of the 20th century</q>.</p>
    
    <button onclick="toggleDefinition('NYT')" 
            aria-expanded="false" 
            aria-controls="nyt-def">
      What does NYT mean?
    </button>
    <div id="nyt-def" hidden 
         aria-live="polite" 
         itemscope 
         itemtype="https://schema.org/Organization">
      <p><span itemprop="name">New York Times</span>: 
      <span itemprop="description">American daily newspaper based in New York City</span></p>
    </div>
  </div>
</div>

<script>
  function toggleDefinition(abbr) {
    const def = document.getElementById(\`\${abbr.toLowerCase()}-def\`);
    const button = document.querySelector(\`button[aria-controls="\${abbr.toLowerCase()}-def"]\`);
    const isExpanded = def.hidden;
    
    def.hidden = !isExpanded;
    button.setAttribute('aria-expanded', String(!isExpanded));
    button.textContent = isExpanded ? 
      'Hide definition' : 
      'What does ' + abbr + ' mean?';
  }
</script>`,
    },
  ];

  const bestPractices = [
    {
      title: "Semantic Attribution",
      description:
        "Properly attribute quotes with semantic markup and microdata",
      example: `<blockquote cite="https://example.com/source" itemscope itemtype="https://schema.org/Quotation">
  <p itemprop="text">Quoted text here...</p>
  <footer>
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">Author Name</span>
    </span>,
    <cite itemprop="isPartOf" itemscope itemtype="https://schema.org/Book">
      <span itemprop="name">Source Title</span>
    </cite>
  </footer>
</blockquote>`,
      badExample: `<blockquote>
  <p>Quoted text with no attribution</p>
  <div>— Some Person</div>
</blockquote>`,
      technicalImpact:
        "Semantic markup enables better SEO, accessibility, and potential for rich snippets in search results",
    },
    {
      title: "Accessible Abbreviations",
      description: "Make abbreviations accessible to all users",
      example: `<p>The <abbr title="World Wide Web Consortium" 
data-definition="International standards organization for the web"
aria-describedby="w3c-def">W3C</abbr> sets web standards.</p>
<button onclick="showDefinition('W3C')" aria-expanded="false">Explain W3C</button>
<div id="w3c-def" hidden>International standards organization for the web</div>`,
      badExample: `<p>The W3C sets web standards.</p>`,
      technicalImpact:
        "Proper abbreviation markup helps screen readers, provides tooltips, and improves comprehension",
    },
    {
      title: "International Quotation Marks",
      description: "Handle quotation marks properly for different languages",
      example: `<style>
  /* French quotes */
  .french q:before { content: "«\\00A0"; }
  .french q:after { content: "\\00A0»"; }
  
  /* German quotes */
  .german q:before { content: "\\201E"; }
  .german q:after { content: "\\201C"; }
</style>

<p class="french">Il a dit <q>Bonjour</q> en souriant.</p>
<p class="german">Er sagte <q>Guten Tag</q> und lächelte.</p>`,
      badExample: `<p>He said "Hello" smiling.</p>`,
      technicalImpact:
        "Proper quotation marks improve typography and localization",
    },
  ];

  const accessibilityGuidelines = [
    {
      principle: "Screen Reader Compatibility",
      implementation: "Use ARIA attributes to provide context for quotes",
      example: `<blockquote aria-labelledby="quote1-source">
  <p id="quote1-text">The content of the quote...</p>
  <footer id="quote1-source">— <cite>Source Name</cite></footer>
</blockquote>`,
      impact:
        "Helps screen reader users understand the quote's context and source",
    },
    {
      principle: "Keyboard Navigation",
      implementation:
        "Ensure interactive quote elements are keyboard accessible",
      example: `<abbr title="Accessible Rich Internet Applications" tabindex="0">ARIA</abbr>
<button onclick="showDefinition('ARIA')">Explain</button>`,
      impact: "Allows keyboard-only users to access interactive quote features",
    },
    {
      principle: "Contrast Ratios",
      implementation: "Maintain proper contrast for quoted text",
      example: `<style>
  blockquote {
    background: #f8f9fa;
    color: #212529; /* 8.59:1 contrast on white */
    border-left: 4px solid #0d6efd;
  }
</style>`,
      impact:
        "Ensures quoted text is readable for users with visual impairments",
    },
  ];

  const microdataExamples = [
    {
      type: "CreativeWork Citation",
      schema: "https://schema.org/CreativeWork",
      example: `<p>From <cite itemprop="citation" itemscope itemtype="https://schema.org/Book">
  <span itemprop="name">HTML & CSS: Design and Build Websites</span>
</cite> by <span itemprop="author">Jon Duckett</span>.</p>`,
    },
    {
      type: "Quotation with Author",
      schema: "https://schema.org/Quotation",
      example: `<blockquote itemscope itemtype="https://schema.org/Quotation">
  <p itemprop="text">The quote text goes here...</p>
  <footer itemprop="author" itemscope itemtype="https://schema.org/Person">
    <span itemprop="name">Author Name</span>
  </footer>
</blockquote>`,
    },
    {
      type: "News Article Citation",
      schema: "https://schema.org/NewsArticle",
      example: `<blockquote itemprop="citation" itemscope itemtype="https://schema.org/NewsArticle">
  <p itemprop="headline">Article Headline</p>
  <footer>
    <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
      <span itemprop="name">News Source</span>
    </span>,
    <time itemprop="datePublished" datetime="2023-01-01">Jan 1, 2023</time>
  </footer>
</blockquote>`,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          Advanced HTML Quotation Techniques
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Semantic markup, accessibility, and structured data for quotations
        </p>
      </header>

      {/* Technical Overview */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Technical Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">DOM Representation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Quotation elements create specific node types in the Document
              Object Model:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                <code>HTMLQuoteElement</code> for{" "}
                <code>&lt;blockquote&gt;</code> and <code>&lt;q&gt;</code>
              </li>
              <li>
                <code>HTMLElement</code> for <code>&lt;cite&gt;</code> and{" "}
                <code>&lt;abbr&gt;</code>
              </li>
              <li>Special CSS pseudo-elements for quotation marks</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Browser Support</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              All modern browsers fully support quotation elements, with some
              nuances:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>
                Automatic quotation marks via CSS <code>quotes</code> property
              </li>
              <li>Microdata parsing for search engine optimization</li>
              <li>Varying default styling across browsers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quotation Elements - Enhanced */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("elements")}
          aria-expanded={expandedSections["elements"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaQuoteLeft className="text-blue-500" />
            Semantic Quotation Elements
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["elements"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["elements"] && (
          <div className="grid grid-cols-1 gap-4">
            {quotationElements.map((element, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
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
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                          Attributes: {element.attributes}
                        </span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          Usage: {element.usage}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          try {
                            localStorage.setItem("html-code", element.example);
                            router.push("/compilers/html-editor");
                          } catch (error) {
                            console.error(
                              "Error saving to localStorage:",
                              error
                            );
                            alert("Could not open editor. Please try again.");
                          }
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label={`Try ${element.element}`}
                      >
                        <FaPlay className="text-sm" />
                      </button>
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
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-900">
                  <CodeEditor
                    value={element.example}
                    language="html"
                    padding={12}
                    style={{
                      fontSize: 13,
                      backgroundColor: "#f8fafc",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                    }}
                    className="dark:bg-gray-800 dark:text-gray-200"
                    readOnly
                  />
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Technical Notes:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {element.technicalNotes.map((note, noteIndex) => (
                      <li key={noteIndex}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Microdata Integration */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("microdata")}
          aria-expanded={expandedSections["microdata"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-purple-500" />
            Structured Data & Microdata
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["microdata"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["microdata"] && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-medium">
                  Why Use Microdata for Quotations?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Schema.org markup helps search engines understand and
                  potentially display your content as rich snippets.
                </p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {microdataExamples.map((example, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-bold mb-2">{example.type}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Schema: {example.schema}
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                        <code>{example.example}</code>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button
                          onClick={() => {
                            try {
                              localStorage.setItem(
                                "html-code",
                                example.example
                              );
                              router.push("/compilers/html-editor");
                            } catch (error) {
                              console.error(
                                "Error saving to localStorage:",
                                error
                              );
                              alert("Could not open editor. Please try again.");
                            }
                          }}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          Try in Editor
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(example.example, example.type)
                          }
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {copied === example.type ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                    Testing Your Markup
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-2">
                    Use Google's{" "}
                    <a
                      href="https://search.google.com/test/rich-results"
                      className="underline"
                      target="_blank"
                    >
                      Rich Results Test
                    </a>{" "}
                    to validate your structured data.
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    Note: While Schema.org is widely supported, rich snippet
                    display is at the search engine's discretion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Accessibility Section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("accessibility")}
          aria-expanded={expandedSections["accessibility"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-green-500" />
            Accessibility Considerations
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["accessibility"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["accessibility"] && (
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium">WCAG Guidelines for Quotations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Ensuring quotations are accessible to all users, including
                  those using assistive technologies.
                </p>
              </div>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {accessibilityGuidelines.map((guideline, index) => (
                  <div key={index} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{guideline.principle}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {guideline.implementation}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                          Impact: {guideline.impact}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            try {
                              localStorage.setItem(
                                "html-code",
                                guideline.example
                              );
                              router.push("/compilers/html-editor");
                            } catch (error) {
                              console.error(
                                "Error saving to localStorage:",
                                error
                              );
                              alert("Could not open editor. Please try again.");
                            }
                          }}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          Try
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              guideline.example,
                              `${guideline.principle}-accessibility`
                            )
                          }
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          {copied === `${guideline.principle}-accessibility`
                            ? "Copied!"
                            : "Copy"}
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 bg-gray-50 dark:bg-gray-900 p-3 rounded text-xs overflow-x-auto">
                      <code>{guideline.example}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-600 p-4 rounded-r-lg">
              <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">
                Testing Accessibility
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Use tools like{" "}
                <a
                  href="https://wave.webaim.org/"
                  className="underline"
                  target="_blank"
                >
                  WAVE
                </a>{" "}
                or browser developer tools to test how your quotations are
                presented to screen readers.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Best Practices - Enhanced */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("bestPractices")}
          aria-expanded={expandedSections["bestPractices"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-orange-500" />
            Quotation Implementation Best Practices
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{practice.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {practice.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          try {
                            localStorage.setItem("html-code", practice.example);
                            router.push("/compilers/html-editor");
                          } catch (error) {
                            console.error(
                              "Error saving to localStorage:",
                              error
                            );
                            alert("Could not open editor. Please try again.");
                          }
                        }}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <FaPlay size={10} /> Try
                      </button>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            practice.example,
                            `${practice.title}-good`
                          )
                        }
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {copied === `${practice.title}-good` ? (
                          <FaCheck size={10} className="text-green-500" />
                        ) : (
                          <FaCopy size={10} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <h4 className="font-medium text-sm">
                        Recommended Implementation
                      </h4>
                    </div>
                    <CodeEditor
                      value={practice.example}
                      language="html"
                      padding={12}
                      style={{
                        fontSize: 13,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }}
                      className="dark:bg-gray-800 dark:text-gray-200"
                      readOnly
                    />
                    {practice.technicalImpact && (
                      <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                        <strong>Technical Impact:</strong>{" "}
                        {practice.technicalImpact}
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <h4 className="font-medium text-sm">
                        Problematic Implementation
                      </h4>
                    </div>
                    <CodeEditor
                      value={practice.badExample}
                      language="html"
                      padding={12}
                      style={{
                        fontSize: 13,
                        backgroundColor: "#f8fafc",
                        fontFamily:
                          "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                      }}
                      className="dark:bg-gray-800 dark:text-gray-200"
                      readOnly
                    />
                    <div className="mt-2 text-xs text-red-600 dark:text-red-400">
                      <strong>Issues:</strong> Lacks semantic meaning,
                      accessibility concerns, or missed SEO opportunities
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Practical Examples - Enhanced */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("examples")}
          aria-expanded={expandedSections["examples"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Advanced Practical Examples
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
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6 hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{example.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Demonstrates semantic markup, accessibility, and
                      structured data integration
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        try {
                          localStorage.setItem("html-code", example.code);
                          router.push("/compilers/html-editor");
                        } catch (error) {
                          console.error("Error saving to localStorage:", error);
                          alert("Could not open editor. Please try again.");
                        }
                      }}
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(example.code, example.title)
                      }
                      className="flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {copied === example.title ? (
                        <FaCheck size={12} className="text-green-500" />
                      ) : (
                        <FaCopy size={12} />
                      )}
                      {copied === example.title ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4">
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
                    className="dark:bg-gray-800 dark:text-gray-200"
                    readOnly
                  />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-sm mb-2 text-gray-700 dark:text-gray-300">
                    Key Features:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <li>Semantic HTML5 elements</li>
                    <li>Schema.org microdata integration</li>
                    <li>Accessibility enhancements</li>
                    <li>Interactive components where applicable</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Interactive Playground - Enhanced */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                Advanced Quotation Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with semantic markup, microdata, and accessibility
              features
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Comprehensive Quotation Examples
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Includes semantic markup, microdata, and accessibility
                  features
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Ready for Production
              </span>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Features Included
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                    <div className="font-medium text-sm mb-1">
                      Semantic HTML
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Proper element usage
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                    <div className="font-medium text-sm mb-1">Schema.org</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Rich snippet markup
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                    <div className="font-medium text-sm mb-1">ARIA</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Accessibility attributes
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                    <div className="font-medium text-sm mb-1">Interactive</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Definition toggles
                    </div>
                  </div>
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
              All examples include production-ready markup with semantic
              structure and accessibility features
            </p>
          </div>
        </div>
      </section>

      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/formatting"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/text-formatting"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
