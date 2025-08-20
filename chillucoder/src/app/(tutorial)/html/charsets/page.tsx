"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaSearch,
  FaGlobe,
  FaLanguage,
  FaFont,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function HtmlCharsetsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    common: true,
    declaration: true,
    troubleshooting: true,
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

  const charsetData = [
    {
      title: "Common Character Encodings",
      expanded: expandedSections.common,
      items: [
        { 
          name: "UTF-8", 
          code: 'meta charset="UTF-8"', 
          description: "Unicode Transformation Format (8-bit) - supports all Unicode characters", 
          usage: "98% of all websites", 
          languages: "All modern languages"
        },
        { 
          name: "ISO-8859-1", 
          code: 'meta charset="ISO-8859-1"', 
          description: "Latin-1 Western European - limited to 256 characters", 
          usage: "Legacy systems", 
          languages: "Western European"
        },
        { 
          name: "Windows-1252", 
          code: 'meta http-equiv="Content-Type" content="text/html; charset=Windows-1252"', 
          description: "Western European extension of ISO-8859-1", 
          usage: "Older Windows systems", 
          languages: "Western European"
        },
        { 
          name: "Shift_JIS", 
          code: 'meta charset="Shift_JIS"', 
          description: "Japanese character encoding", 
          usage: "Japanese websites", 
          languages: "Japanese"
        },
        { 
          name: "EUC-JP", 
          code: 'meta charset="EUC-JP"', 
          description: "Extended Unix Code for Japanese", 
          usage: "Japanese Unix systems", 
          languages: "Japanese"
        },
        { 
          name: "GB2312", 
          code: 'meta charset="GB2312"', 
          description: "Simplified Chinese encoding", 
          usage: "Chinese websites", 
          languages: "Simplified Chinese"
        },
        { 
          name: "Big5", 
          code: 'meta charset="Big5"', 
          description: "Traditional Chinese encoding", 
          usage: "Taiwan and Hong Kong", 
          languages: "Traditional Chinese"
        },
      ],
    },
  ];

  const filteredCharsets = charsetData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.languages.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div>
      <Head>
        <title>HTML Character Encodings | Complete Reference Guide</title>
        <meta
          name="description"
          content="Complete guide to HTML character encodings and charset declarations. Learn about UTF-8, ISO-8859-1, and other encodings for proper text rendering."
        />
        <meta
          name="keywords"
          content="HTML charset, character encoding, UTF-8, ISO-8859-1, meta charset, text encoding, HTML encoding"
        />
        <meta name="author" content="Your Name" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-500 mb-2">
          HTML Character Encodings
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Ensuring proper text rendering in web pages
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-green-50 dark:bg-gray-800 p-6 rounded-xl border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-green-500" />
          About Character Encodings
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Character encoding determines how bytes are mapped to characters in your HTML documents. 
          Using the correct encoding is essential for displaying text properly across different 
          languages and scripts.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaGlobe className="text-green-500" />
            <span>Global Support</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLanguage className="text-green-500" />
            <span>Multilingual</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFont className="text-green-500" />
            <span>Text Rendering</span>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Character Encoding Example</title>
</head>
<body>
  <h1>Multilingual Text</h1>
  <p>English: Hello World</p>
  <p>Spanish: ¡Hola Mundo!</p>
  <p>French: Bonjour le monde</p>
  <p>Chinese: 你好世界</p>
  <p>Japanese: こんにちは世界</p>
  <p>Russian: Привет, мир</p>
  <p>Arabic: مرحبا بالعالم</p>
</body>
</html>`)
          }
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
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
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Search encodings (name, language or description)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Basics */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-green-500" />
            Character Encoding Basics
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
              <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">
                What is Character Encoding?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Character encoding is a system that pairs each character in a character set with 
                    something else—such as a number or sequence of bits—to facilitate storage and 
                    transmission of text.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Defines how bytes map to characters</li>
                    <li>Essential for multilingual content</li>
                    <li>Affects text rendering and processing</li>
                    <li>Must be declared early in the HTML document</li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Modern HTML5 charset declaration -->
<meta charset="UTF-8">

<!-- Legacy HTML4 declaration -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- XHTML declaration -->
<?xml version="1.0" encoding="UTF-8"?>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">
                Why UTF-8 is Recommended
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    UTF-8 has become the dominant character encoding for the web because:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Supports all Unicode characters</li>
                    <li>Backward compatible with ASCII</li>
                    <li>Efficient for English and Western languages</li>
                    <li>Variable-width (1-4 bytes per character)</li>
                    <li>Supported by all modern browsers and devices</li>
                    <li>Default encoding for HTML5</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-gray-700 border-l-4 border-green-500 p-4">
                  <p className="text-green-700 dark:text-green-400">
                    <strong>Did you know?</strong> As of 2023, UTF-8 is used by 98.2% of all websites, 
                    and 100% of modern websites when considering only those that declare an encoding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Charset Tables */}
      {filteredCharsets.map((category, index) => (
        <section key={index} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaCode className="text-green-500" />
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Encoding</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Declaration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Languages</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{item.code}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.usage}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.languages}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => copyToClipboard(item.code, item.name)}
                          className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
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

      {/* Declaration Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-green-500" />
            How to Declare Character Encoding
          </h2>
          <button
            onClick={() => toggleSection("declaration")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.declaration ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.declaration && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">
                Proper Declaration Methods
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The character encoding should be declared as early as possible in your HTML document:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Must appear within the first 1024 bytes</li>
                    <li>Should be in the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&lt;head&gt;</code> section</li>
                    <li>Preferably the first element after <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&lt;head&gt;</code></li>
                    <li>Only one encoding declaration per document</li>
                  </ol>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!DOCTYPE html>
<html>
<head>
  <!-- Best practice: HTML5 charset declaration -->
  <meta charset="UTF-8">
  <title>Page Title</title>
  
  <!-- Other meta tags and links -->
</head>
<body>
  <!-- Content -->
</body>
</html>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">
                HTTP Headers and Encoding
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Character encoding can also be specified in HTTP headers, which takes precedence 
                    over in-document declarations:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">Content-Type: text/html; charset=UTF-8</code></li>
                    <li>Must match the document&apos;s actual encoding</li>
                    <li>Useful for non-HTML files (CSS, JS, etc.)</li>
                    <li>Can be set in server configuration</li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-http">
                      {`HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Date: Wed, 01 Jan 2023 12:00:00 GMT
Server: Apache

<!DOCTYPE html>
<html>
...
</html>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Troubleshooting Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-green-500" />
            Troubleshooting Encoding Issues
          </h2>
          <button
            onClick={() => toggleSection("troubleshooting")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.troubleshooting ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.troubleshooting && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">
              Common Encoding Problems and Solutions
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">1. Gibberish or Question Marks</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Symptoms:</strong> Text appears as random characters or question marks (���)
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Solution:</strong> Ensure the declared encoding matches the actual file encoding. 
                  Save files as UTF-8 and declare <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&lt;meta charset=&quot;UTF-8&quot;&gt;</code>.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">2. Mixed Encoding in Same Page</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Symptoms:</strong> Some text renders correctly while other parts don&apos;t
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Solution:</strong> Ensure all external resources (CSS, JS) are also UTF-8 encoded. 
                  Check database connections if content is dynamic.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">3. Double Encoding</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Symptoms:</strong> Characters appear with extra symbols (Ã© instead of é)
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Solution:</strong> The text has been encoded multiple times. Ensure your 
                  server isn&apos;t applying additional encoding transformations.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">4. BOM (Byte Order Mark) Issues</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Symptoms:</strong> Strange characters at start of file (ï»¿) or layout issues
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Solution:</strong> Save files without BOM or ensure your server handles BOM correctly.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Best Practices Section */}
      <section className="mb-8 bg-green-50 dark:bg-gray-800 p-6 rounded-xl border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-green-500" />
          Encoding Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always use UTF-8 for new projects</li>
              <li>Declare encoding early in the document</li>
              <li>Ensure your editor saves files in UTF-8</li>
              <li>Set encoding in HTTP headers when possible</li>
              <li>Test with multilingual content</li>
              <li>Check database connection encodings</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-green-600 dark:text-green-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t rely on default encodings</li>
              <li>Avoid legacy encodings unless necessary</li>
              <li>Don&apos;t mix encodings in the same document</li>
              <li>Avoid BOM in UTF-8 for web content</li>
              <li>Don&apos;t forget to check external resources</li>
              <li>Avoid server-side encoding conversions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-green-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our Encoding Tester
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Experiment with different character encodings in our interactive editor:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test multilingual text rendering</li>
              <li>Try different charset declarations</li>
              <li>See how encoding affects special characters</li>
              <li>Experiment with encoding-related issues</li>
            </ul>
            <button
              onClick={() => {
                const encodingExample = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Encoding Test</title>
</head>
<body>
  <h1>Character Encoding Test</h1>
  
  <h2>European Languages</h2>
  <p>English: Hello World</p>
  <p>French: Bonjour le monde</p>
  <p>German: Hallo Welt</p>
  <p>Spanish: ¡Hola Mundo!</p>
  <p>Russian: Привет, мир</p>
  
  <h2>Asian Languages</h2>
  <p>Chinese: 你好世界</p>
  <p>Japanese: こんにちは世界</p>
  <p>Korean: 안녕하세요 세상</p>
  
  <h2>Special Characters</h2>
  <p>Copyright: ©</p>
  <p>Trademark: ™</p>
  <p>Euro: €</p>
  <p>Math: π ≠ √-1</p>
  <p>Emoji: 😊 👍 🚀</p>
</body>
</html>`;
                localStorage.setItem("html-code", encodingExample);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch Encoding Tester
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm overflow-x-auto">
                <code className="language-html">
                  {`<!DOCTYPE html>
<!-- Try changing the charset to see effects -->
<html>
<head>
  <meta charset="ISO-8859-1">
  <title>Encoding Test</title>
</head>
<body>
  <p>English: Hello</p>
  <p>French: Bonjour</p>
  <p>Chinese: 你好</p>
  <p>Russian: Привет</p>
  <p>Special: © € π</p>
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
          href="/html/entities"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (HTML Entities)
        </Link>
         <Link
          href="/html/tags"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (Tag Reference) &gt;
        </Link>
      </section>
    </div>
  );
}