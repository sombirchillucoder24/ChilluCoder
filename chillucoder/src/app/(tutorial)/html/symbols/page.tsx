"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaSearch,
  FaHashtag,
  FaCopyright,
  FaRegCopyright,
} from "react-icons/fa";
import { useState } from "react";
// import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function HtmlSymbolsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    common: true,
    math: true,
    currency: true,
  });
  const [searchTerm, setSearchTerm] = useState("");
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

  const symbolCategories = [
    {
      title: "Common Symbols",
      expanded: expandedSections.common,
      items: [
        { name: "Copyright", code: "&copy;", symbol: "©", hex: "&#xA9;" },
        { name: "Registered Trademark", code: "&reg;", symbol: "®", hex: "&#xAE;" },
        { name: "Trademark", code: "&trade;", symbol: "™", hex: "&#x2122;" },
        { name: "Non-breaking Space", code: "&nbsp;", symbol: " ", hex: "&#xA0;" },
        { name: "Ampersand", code: "&amp;", symbol: "&", hex: "&#x26;" },
        { name: "Less Than", code: "&lt;", symbol: "<", hex: "&#x3C;" },
        { name: "Greater Than", code: "&gt;", symbol: ">", hex: "&#x3E;" },
        { name: "Quotation Mark", code: "&quot;", symbol: "\"", hex: "&#x22;" },
        { name: "Apostrophe", code: "&apos;", symbol: "'", hex: "&#x27;" },
      ],
    },
    {
      title: "Mathematical Symbols",
      expanded: expandedSections.math,
      items: [
        { name: "Plus", code: "&plus;", symbol: "+", hex: "&#x2B;" },
        { name: "Minus", code: "&minus;", symbol: "-", hex: "&#x2212;" },
        { name: "Multiplication", code: "&times;", symbol: "×", hex: "&#xD7;" },
        { name: "Division", code: "&divide;", symbol: "÷", hex: "&#xF7;" },
        { name: "Equals", code: "&equals;", symbol: "=", hex: "&#x3D;" },
        { name: "Not Equal", code: "&ne;", symbol: "≠", hex: "&#x2260;" },
        { name: "Less Than or Equal", code: "&le;", symbol: "≤", hex: "&#x2264;" },
        { name: "Greater Than or Equal", code: "&ge;", symbol: "≥", hex: "&#x2265;" },
        { name: "Infinity", code: "&infin;", symbol: "∞", hex: "&#x221E;" },
        { name: "Square Root", code: "&radic;", symbol: "√", hex: "&#x221A;" },
        { name: "Pi", code: "&pi;", symbol: "π", hex: "&#x3C0;" },
        { name: "Degree", code: "&deg;", symbol: "°", hex: "&#xB0;" },
      ],
    },
    {
      title: "Currency Symbols",
      expanded: expandedSections.currency,
      items: [
        { name: "Dollar", code: "&dollar;", symbol: "$", hex: "&#x24;" },
        { name: "Euro", code: "&euro;", symbol: "€", hex: "&#x20AC;" },
        { name: "Pound", code: "&pound;", symbol: "£", hex: "&#xA3;" },
        { name: "Yen", code: "&yen;", symbol: "¥", hex: "&#xA5;" },
        { name: "Cent", code: "&cent;", symbol: "¢", hex: "&#xA2;" },
        { name: "Indian Rupee", code: "&inr;", symbol: "₹", hex: "&#x20B9;" },
        { name: "Russian Ruble", code: "&rub;", symbol: "₽", hex: "&#x20BD;" },
      ],
    },
    {
      title: "Arrows",
      expanded: expandedSections.common,
      items: [
        { name: "Left Arrow", code: "&larr;", symbol: "←", hex: "&#x2190;" },
        { name: "Up Arrow", code: "&uarr;", symbol: "↑", hex: "&#x2191;" },
        { name: "Right Arrow", code: "&rarr;", symbol: "→", hex: "&#x2192;" },
        { name: "Down Arrow", code: "&darr;", symbol: "↓", hex: "&#x2193;" },
        { name: "Left-Right Arrow", code: "&harr;", symbol: "↔", hex: "&#x2194;" },
        { name: "Up-Down Arrow", code: "&varr;", symbol: "↕", hex: "&#x2195;" },
      ],
    },
    {
      title: "Greek Letters",
      expanded: expandedSections.math,
      items: [
        { name: "Alpha", code: "&alpha;", symbol: "α", hex: "&#x3B1;" },
        { name: "Beta", code: "&beta;", symbol: "β", hex: "&#x3B2;" },
        { name: "Gamma", code: "&gamma;", symbol: "γ", hex: "&#x3B3;" },
        { name: "Delta", code: "&delta;", symbol: "δ", hex: "&#x3B4;" },
        { name: "Epsilon", code: "&epsilon;", symbol: "ε", hex: "&#x3B5;" },
      ],
    },
  ];

  const filteredCategories = symbolCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.includes(searchTerm)
    )
  })).filter(category => category.items.length > 0);

  return (
    <div>
      <Head>
        <title>HTML Symbols and Entities | Complete Reference Guide</title>
        <meta
          name="description"
          content="Complete reference of HTML symbols, entities, and special characters. Learn how to use copyright, currency, mathematical symbols and more in your web pages."
        />
        <meta
          name="keywords"
          content="HTML symbols, HTML entities, special characters, copyright symbol, currency symbols, mathematical symbols, HTML codes"
        />
        <meta name="author" content="Your Name" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500 mb-2">
          HTML Symbols & Entities
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Complete reference for special characters in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-indigo-50 dark:bg-gray-800 p-6 rounded-xl border border-indigo-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-indigo-500" />
          About HTML Symbols
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML symbols are special characters that aren&apos;t readily available on standard keyboards or have special meaning in HTML. 
          They can be displayed using entity names (like <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;copy;</code>) 
          or entity numbers (like <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#xA9;</code>).
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaHashtag className="text-indigo-500" />
            <span>Entity Numbers</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegCopyright className="text-indigo-500" />
            <span>Entity Names</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCopyright className="text-indigo-500" />
            <span>Symbols</span>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Symbols Example</title>
</head>
<body>
  <h1>Common HTML Symbols</h1>
  <p>Copyright: &copy; (&amp;copy;)</p>
  <p>Registered: &reg; (&amp;reg;)</p>
  <p>Trademark: &trade; (&amp;trade;)</p>
  <p>Euro: &euro; (&amp;euro;)</p>
  <p>Math: &pi; = 3.14, &radic;4 = 2</p>
</body>
</html>`)
          }
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Search */}
      <section className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Search symbols (name, code or symbol)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Basics */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-indigo-500" />
            How to Use HTML Symbols
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
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">
                Entity Syntax
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    HTML symbols can be added using either entity names or entity numbers:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Entity names</strong>: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;name;</code>
                      <br />Example: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;copy;</code> becomes ©
                    </li>
                    <li>
                      <strong>Entity numbers</strong>: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#number;</code>
                      <br />Example: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#169;</code> becomes ©
                    </li>
                    <li>
                      <strong>Hexadecimal numbers</strong>: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#xHex;</code>
                      <br />Example: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#xA9;</code> becomes ©
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Entity name example -->
<p>Copyright &copy; 2023</p>

<!-- Entity number example -->
<p>Copyright &#169; 2023</p>

<!-- Hexadecimal example -->
<p>Copyright &#xA9; 2023</p>

<!-- All three display as: Copyright © 2023 -->`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">
                When to Use Symbols
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    HTML symbols are essential for:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Displaying special characters (©, ®, ™)</li>
                    <li>Showing currency symbols (€, £, ¥)</li>
                    <li>Mathematical notation (π, √, ∞)</li>
                    <li>Arrows and directional indicators (→, ↑, ↓)</li>
                    <li>Reserved characters in HTML (&lt;, &gt;, &amp;)</li>
                    <li>Accented characters (é, ñ, ü)</li>
                  </ul>
                </div>
                <div className="bg-indigo-50 dark:bg-gray-700 border-l-4 border-indigo-500 p-4">
                  <p className="text-indigo-700 dark:text-indigo-400">
                    <strong>Tip:</strong> For better accessibility, always use semantic HTML elements 
                    where possible (like <code className="bg-indigo-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">&lt;sup&gt;</code> 
                    for exponents) rather than symbol entities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Symbol Tables */}
      {filteredCategories.map((category, index) => (
        <section key={index} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaCode className="text-indigo-500" />
              {category.title}
            </h2>
            <button
              onClick={() => toggleSection(category.title.toLowerCase().replace(/\s+/g, ''))}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <FaChevronDown
                className={`transition-transform ${category.expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {category.expanded && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Entity Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Entity Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{item.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{item.hex}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300 text-2xl">{item.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => copyToClipboard(item.code, item.name)}
                          className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400"
                        >
                          {copied === item.name ? (
                            <span className="flex items-center gap-1">
                              <FaCheck className="text-green-500" /> Copied!
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <FaCopy /> Copy
                            </span>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      {/* Best Practices Section */}
      <section className="mb-8 bg-indigo-50 dark:bg-gray-800 p-6 rounded-xl border border-indigo-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-indigo-500" />
          Symbol Usage Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use named entities when available (more readable)</li>
              <li>Use numeric entities for obscure characters</li>
              <li>Test symbols in different browsers</li>
              <li>Consider accessibility (provide alt text if needed)</li>
              <li>Use UTF-8 character encoding in your HTML</li>
              <li>Escape reserved HTML characters (&lt;, &gt;, &amp;, etc.)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-indigo-600 dark:text-indigo-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t copy-paste symbols directly (use entities)</li>
              <li>Avoid overusing decorative symbols</li>
              <li>Don&apos;t use symbols for critical interface elements</li>
              <li>Avoid mixing symbol types unnecessarily</li>
              <li>Don&apos;t forget to declare UTF-8 charset</li>
              <li>Avoid using symbols that may not render consistently</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-indigo-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our HTML Symbols Editor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Experiment with HTML symbols in our interactive editor:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test different symbol formats</li>
              <li>See how symbols render in real-time</li>
              <li>Try combining symbols with text</li>
              <li>Experiment with mathematical notation</li>
            </ul>
            <button
              onClick={() => {
                const symbolsExample = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HTML Symbols Playground</title>
</head>
<body>
  <h1>HTML Symbols Examples</h1>
  
  <h2>Common Symbols</h2>
  <p>Copyright: &copy; (&amp;copy;)</p>
  <p>Registered: &reg; (&amp;reg;)</p>
  <p>Trademark: &trade; (&amp;trade;)</p>
  
  <h2>Currency Symbols</h2>
  <p>Euro: &euro; (&amp;euro;)</p>
  <p>Pound: &pound; (&amp;pound;)</p>
  <p>Yen: &yen; (&amp;yen;)</p>
  
  <h2>Mathematical Symbols</h2>
  <p>&pi; (&amp;pi;) = 3.14159</p>
  <p>&radic;4 (&amp;radic;4) = 2</p>
  <p>&infin; (&amp;infin;) is endless</p>
  
  <h2>Arrows</h2>
  <p>&larr; &uarr; &rarr; &darr;</p>
  <p>&larr; (&amp;larr;) Left arrow</p>
  <p>&rarr; (&amp;rarr;) Right arrow</p>
</body>
</html>`;
                localStorage.setItem("html-code", symbolsExample);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch Symbols Editor
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm overflow-x-auto">
                <code className="language-html">
                  {`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <!-- Common symbols -->
  <p>&copy; &reg; &trade;</p>
  
  <!-- Currency -->
  <p>&euro; &pound; &yen;</p>
  
  <!-- Math -->
  <p>&pi; &radic; &infin;</p>
  
  <!-- Arrows -->
  <p>&larr; &uarr; &rarr; &darr;</p>
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
          href="/html/media-queries"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (Media Queries)
        </Link>
        <Link
          href="/html/entities"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (HTML Entities) &gt;
        </Link>
      </section>
    </div>
  );
}