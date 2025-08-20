"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaSearch,
  FaQuoteLeft,
  FaLessThan,
  FaGreaterThan,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function HtmlEntitiesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    reserved: true,
    symbols: true,
    diacritics: true,
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

  const entityCategories = [
    {
      title: "Reserved Characters",
      expanded: expandedSections.reserved,
      items: [
        { name: "Ampersand", code: "&amp;", symbol: "&", hex: "&#x26;", description: "Must be escaped in HTML" },
        { name: "Less Than", code: "&lt;", symbol: "<", hex: "&#x3C;", description: "Starts HTML tags" },
        { name: "Greater Than", code: "&gt;", symbol: ">", hex: "&#x3E;", description: "Ends HTML tags" },
        { name: "Double Quote", code: "&quot;", symbol: "\"", hex: "&#x22;", description: "For attribute values" },
        { name: "Single Quote", code: "&apos;", symbol: "'", hex: "&#x27;", description: "Alternative for attributes" },
      ],
    },
    {
      title: "Common Symbols",
      expanded: expandedSections.symbols,
      items: [
        { name: "Non-breaking Space", code: "&nbsp;", symbol: " ", hex: "&#xA0;", description: "Prevents line breaks" },
        { name: "Copyright", code: "&copy;", symbol: "©", hex: "&#xA9;", description: "Copyright symbol" },
        { name: "Registered Trademark", code: "&reg;", symbol: "®", hex: "&#xAE;", description: "Registered mark" },
        { name: "Trademark", code: "&trade;", symbol: "™", hex: "&#x2122;", description: "Trademark symbol" },
        { name: "Euro", code: "&euro;", symbol: "€", hex: "&#x20AC;", description: "Euro currency" },
        { name: "Pound", code: "&pound;", symbol: "£", hex: "&#xA3;", description: "British pound" },
      ],
    },
    {
      title: "Mathematical Symbols",
      expanded: expandedSections.symbols,
      items: [
        { name: "Plus", code: "&plus;", symbol: "+", hex: "&#x2B;", description: "Addition" },
        { name: "Minus", code: "&minus;", symbol: "-", hex: "&#x2212;", description: "Subtraction" },
        { name: "Multiplication", code: "&times;", symbol: "×", hex: "&#xD7;", description: "Multiply" },
        { name: "Division", code: "&divide;", symbol: "÷", hex: "&#xF7;", description: "Divide" },
        { name: "Equals", code: "&equals;", symbol: "=", hex: "&#x3D;", description: "Equality" },
        { name: "Not Equal", code: "&ne;", symbol: "≠", hex: "&#x2260;", description: "Inequality" },
      ],
    },
    {
      title: "Accented Characters",
      expanded: expandedSections.diacritics,
      items: [
        { name: "A acute", code: "&aacute;", symbol: "á", hex: "&#xE1;", description: "Latin small a with acute" },
        { name: "E grave", code: "&egrave;", symbol: "è", hex: "&#xE8;", description: "Latin small e with grave" },
        { name: "I circumflex", code: "&icirc;", symbol: "î", hex: "&#xEE;", description: "Latin small i with circumflex" },
        { name: "O tilde", code: "&otilde;", symbol: "õ", hex: "&#xF5;", description: "Latin small o with tilde" },
        { name: "U umlaut", code: "&uuml;", symbol: "ü", hex: "&#xFC;", description: "Latin small u with diaeresis" },
        { name: "C cedilla", code: "&ccedil;", symbol: "ç", hex: "&#xE7;", description: "Latin small c with cedilla" },
      ],
    },
    {
      title: "Greek Letters",
      expanded: expandedSections.symbols,
      items: [
        { name: "Alpha", code: "&alpha;", symbol: "α", hex: "&#x3B1;", description: "Greek small alpha" },
        { name: "Beta", code: "&beta;", symbol: "β", hex: "&#x3B2;", description: "Greek small beta" },
        { name: "Gamma", code: "&gamma;", symbol: "γ", hex: "&#x3B3;", description: "Greek small gamma" },
        { name: "Delta", code: "&delta;", symbol: "δ", hex: "&#x3B4;", description: "Greek small delta" },
        { name: "Pi", code: "&pi;", symbol: "π", hex: "&#x3C0;", description: "Greek small pi" },
        { name: "Omega", code: "&omega;", symbol: "ω", hex: "&#x3C9;", description: "Greek small omega" },
      ],
    },
  ];

  const filteredCategories = entityCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symbol.includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div>
      <Head>
        <title>HTML Entities | Complete Reference Guide</title>
        <meta
          name="description"
          content="Complete reference of HTML entities for reserved characters, symbols, and special characters. Learn how to properly escape characters in HTML."
        />
        <meta
          name="keywords"
          content="HTML entities, special characters, reserved characters, HTML escapes, character entities, HTML symbols"
        />
        <meta name="author" content="Your Name" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mb-2">
          HTML Entities
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Complete reference for special characters in HTML
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          About HTML Entities
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML entities are used to display reserved characters and symbols that either aren&apos;t available on keyboards or have special meaning in HTML. 
          They begin with an ampersand (<code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;</code>) and end with a semicolon (<code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">;</code>).
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaLessThan className="text-blue-500" />
            <span>Reserved Characters</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGreaterThan className="text-blue-500" />
            <span>Special Symbols</span>
          </div>
          <div className="flex items-center gap-2">
            <FaQuoteLeft className="text-blue-500" />
            <span>Diacritical Marks</span>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Entities Example</title>
</head>
<body>
  <h1>Essential HTML Entities</h1>
  
  <h2>Reserved Characters</h2>
  <p>&lt;div&gt; (&amp;lt;div&amp;gt;)</p>
  <p>&quot;Quote&quot; (&amp;quot;Quote&amp;quot;)</p>
  
  <h2>Common Symbols</h2>
  <p>Copyright &copy; (&amp;copy;)</p>
  <p>Price &euro;10 (&amp;euro;10)</p>
  
  <h2>Accented Letters</h2>
  <p>Resum&eacute; (&amp;eacute;)</p>
  <p>Ni&ntilde;o (&amp;ntilde;)</p>
</body>
</html>`)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
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
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search entities (name, code or symbol)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Basics */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            HTML Entity Syntax
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
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Entity Formats
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    HTML entities can be represented in several ways:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <strong>Named entities</strong>: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;name;</code>
                      <br />Example: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;copy;</code> becomes ©
                    </li>
                    <li>
                      <strong>Decimal numeric entities</strong>: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#number;</code>
                      <br />Example: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#169;</code> becomes ©
                    </li>
                    <li>
                      <strong>Hexadecimal numeric entities</strong>: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#xHex;</code>
                      <br />Example: <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&amp;#xA9;</code> becomes ©
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Named entity -->
<p>Copyright &copy; 2023</p>

<!-- Decimal entity -->
<p>Copyright &#169; 2023</p>

<!-- Hexadecimal entity -->
<p>Copyright &#xA9; 2023</p>

<!-- All display as: Copyright © 2023 -->`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                When to Use Entities
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    HTML entities are essential for:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Displaying reserved HTML characters (&lt;, &gt;, &amp;, etc.)</li>
                    <li>Showing characters not on your keyboard (©, €, etc.)</li>
                    <li>Ensuring proper rendering across different encodings</li>
                    <li>Adding invisible characters (non-breaking spaces)</li>
                    <li>Displaying mathematical and scientific notation</li>
                    <li>Showing accented and special characters</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500 p-4">
                  <p className="text-blue-700 dark:text-blue-400">
                    <strong>Important:</strong> Always declare <code className="bg-blue-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">&lt;meta charset=&quot;UTF-8&quot;&gt;</code> in your HTML to ensure proper character rendering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Entity Tables */}
      {filteredCategories.map((category, index) => (
        <section key={index} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaCode className="text-blue-500" />
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
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
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => copyToClipboard(item.code, item.name)}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
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
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Entity Usage Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always escape reserved HTML characters (&lt;, &gt;, &amp;, &quot;, &apos;)</li>
              <li>Use named entities when available for better readability</li>
              <li>Use numeric entities for obscure or less common characters</li>
              <li>Declare UTF-8 character encoding in your HTML</li>
              <li>Test entities in different browsers and devices</li>
              <li>Consider accessibility when using symbolic entities</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t copy-paste special characters directly (use entities)</li>
              <li>Avoid using entities for styling (use CSS instead)</li>
              <li>Don&apos;t overuse non-breaking spaces for layout</li>
              <li>Avoid mixing entity formats unnecessarily</li>
              <li>Don&apos;t forget to close entities with semicolons</li>
              <li>Avoid using obscure entities that may not render consistently</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our HTML Entities Editor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Experiment with HTML entities in our interactive editor:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test different entity formats</li>
              <li>See how entities render in real-time</li>
              <li>Practice escaping reserved characters</li>
              <li>Experiment with mathematical notation</li>
            </ul>
            <button
              onClick={() => {
                const entitiesExample = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HTML Entities Playground</title>
</head>
<body>
  <h1>HTML Entities Examples</h1>
  
  <h2>Reserved Characters</h2>
  <p>&lt;div&gt; (&amp;lt;div&amp;gt;)</p>
  <p>&amp; (&amp;amp;)</p>
  <p>&quot;Quote&quot; (&amp;quot;Quote&amp;quot;)</p>
  
  <h2>Common Symbols</h2>
  <p>Copyright &copy; (&amp;copy;)</p>
  <p>Registered &reg; (&amp;reg;)</p>
  <p>Price &euro;10 (&amp;euro;10)</p>
  
  <h2>Mathematical Symbols</h2>
  <p>&pi; (&amp;pi;) ≈ 3.14</p>
  <p>&radic;4 (&amp;radic;4) = 2</p>
  <p>&infin; (&amp;infin;) is endless</p>
  
  <h2>Accented Letters</h2>
  <p>Resum&eacute; (&amp;eacute;)</p>
  <p>Ni&ntilde;o (&amp;ntilde;)</p>
  <p>Voil&agrave; (&amp;agrave;)</p>
</body>
</html>`;
                localStorage.setItem("html-code", entitiesExample);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch Entities Editor
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
  <!-- Reserved characters -->
  <p>&lt;div&gt; &amp; &quot;</p>
  
  <!-- Common symbols -->
  <p>&copy; &reg; &trade;</p>
  
  <!-- Currency -->
  <p>&euro; &pound; &yen;</p>
  
  <!-- Math -->
  <p>&pi; &radic; &infin;</p>
  
  <!-- Accents -->
  <p>&eacute; &ntilde; &uuml;</p>
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
          href="/html/symbols"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (HTML Symbols)
        </Link>
        <Link
          href="/html/charsets"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (Character Sets) &gt;
        </Link>
      </section>
    </div>
  );
}