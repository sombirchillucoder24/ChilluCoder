"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaBook,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function HTML5StructurePage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    semantic: true,
    metadata: true,
    examples: true,
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

  const structureExamples = [
    {
      title: "Basic HTML5 Document Structure",
      description: "The minimal required structure for a valid HTML5 document",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Title</title>
</head>
<body>
  <!-- Page content goes here -->
  <h1>Hello World!</h1>
</body>
</html>`,
    },
    {
      title: "HTML5 Semantic Structure",
      description: "A complete HTML5 document with semantic elements",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description">
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Website Header</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <p>Article content...</p>
    </article>
    
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="#">Link 1</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2023 Company Name</p>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>`,
    },
    {
      title: "HTML5 Document with Metadata",
      description: "A document with comprehensive metadata for SEO and social sharing",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>Your Page Title</title>
  <meta name="title" content="Your Page Title">
  <meta name="description" content="Your page description (150-160 characters)">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  <meta name="author" content="Your Name">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourdomain.com/">
  <meta property="og:title" content="Your Page Title">
  <meta property="og:description" content="Your page description">
  <meta property="og:image" content="https://yourdomain.com/image.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://yourdomain.com/">
  <meta property="twitter:title" content="Your Page Title">
  <meta property="twitter:description" content="Your page description">
  <meta property="twitter:image" content="https://yourdomain.com/image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://yourdomain.com/">
  
  <!-- CSS -->
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- Your content here -->
</body>
</html>`,
    },
  ];

  return (
    <div>
      <Head>
        <title>HTML5 Document Structure | Complete Guide with Examples</title>
        <meta
          name="description"
          content="Learn about HTML5 document structure with complete examples. Understand DOCTYPE, head section, semantic elements and proper HTML5 page organization."
        />
        <meta
          name="keywords"
          content="HTML5, document structure, HTML5 template, semantic HTML, HTML5 examples, web development"
        />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="HTML5 Document Structure | Complete Guide with Examples" />
        <meta
          property="og:description"
          content="Learn about HTML5 document structure with complete examples. Understand DOCTYPE, head section, semantic elements and proper HTML5 page organization."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/html5-structure" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML5 Document Structure
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn the proper structure of HTML5 documents with semantic elements
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          Understanding HTML5 Document Structure
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML5 introduced a standardized document structure that improves semantics, 
          accessibility, and SEO. A well-structured HTML5 document consists of several 
          key components that work together to create a valid, functional webpage.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The basic structure includes the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">DOCTYPE</code> declaration, 
          the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">html</code> root element, <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">head</code> section for metadata, 
          and the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">body</code> for content. HTML5 also introduced semantic elements 
          like <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">header</code>, <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">nav</code>, <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">main</code>, 
          and <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">footer</code> that make the document more meaningful.
        </p>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My HTML5 Page</title>
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
  </header>
  <main>
    <p>This is a basic HTML5 document structure.</p>
  </main>
  <footer>
    <p>&copy; 2023 My Website</p>
  </footer>
</body>
</html>`)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Key Components Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaBook className="text-blue-500" />
            Key Components of HTML5 Structure
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
                1. DOCTYPE Declaration
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&lt;!DOCTYPE html&gt;</code> declaration must be the first line in your HTML5 document. 
                It tells the browser which version of HTML the page is written in. Unlike previous versions, 
                HTML5&apos;s DOCTYPE is simple and case-insensitive.
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-html">
                    {`<!DOCTYPE html>`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                2. HTML Root Element
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&lt;html&gt;</code> element is the root element that wraps all content on the page. 
                It should include the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">lang</code> attribute to specify the language of the document, 
                which helps with accessibility and SEO.
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-html">
                    {`<html lang="en">\n  <!-- All content goes here -->\n</html>`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                3. Head Section
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&lt;head&gt;</code> section contains meta-information about the document that isn&apos;t 
                displayed on the page. This includes the title, character set declaration, viewport settings, 
                stylesheets, scripts, and other metadata.
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-html">
                    {`<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Page Title</title>\n  <link rel="stylesheet" href="styles.css">\n</head>`}
                  </code>
                </pre>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                4. Body Section
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&lt;body&gt;</code> element contains all the visible content of the webpage. 
                HTML5 introduced semantic elements that should be used to structure the content logically.
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-html">
                    {`<body>\n  <header><!-- Header content --></header>\n  <nav><!-- Navigation --></nav>\n  <main><!-- Main content --></main>\n  <footer><!-- Footer content --></footer>\n</body>`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Semantic Elements Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            HTML5 Semantic Elements
          </h2>
          <button
            onClick={() => toggleSection("semantic")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.semantic ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.semantic && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Why Semantic HTML Matters
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Semantic HTML5 elements clearly describe their meaning to both the browser and the developer. 
                They improve accessibility, SEO, and make your code easier to understand and maintain.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Common Semantic Elements:
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;header&gt;</code> - Introductory content</li>
                    <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;nav&gt;</code> - Navigation links</li>
                    <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;main&gt;</code> - Primary content</li>
                    <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;article&gt;</code> - Self-contained composition</li>
                    <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;section&gt;</code> - Thematic grouping</li>
                    <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;aside&gt;</code> - Sidebar content</li>
                    <li><code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;footer&gt;</code> - Footer content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Benefits:
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Improved accessibility for screen readers</li>
                    <li>Better SEO as search engines understand content structure</li>
                    <li>Easier code maintenance with meaningful tags</li>
                    <li>Future-proofing your website</li>
                    <li>Enhanced user experience across devices</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Semantic Layout Example
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Here&apos;s how you might structure a typical webpage using semantic HTML5 elements:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-html">
                    {`<body>
  <header>
    <h1>Website Title</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Heading</h2>
      <p>Article content...</p>
    </article>
    
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="#">Link 1</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2023 Company Name</p>
  </footer>
</body>`}
                  </code>
                </pre>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleOpenEditor(`<body>
  <header>
    <h1>Website Title</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Heading</h2>
      <p>Article content...</p>
    </article>
    
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="#">Link 1</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2023 Company Name</p>
  </footer>
</body>`)}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <FaPlay size={12} /> Try it
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(`<body>
  <header>
    <h1>Website Title</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Heading</h2>
      <p>Article content...</p>
    </article>
    
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="#">Link 1</a></li>
      </ul>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2023 Company Name</p>
  </footer>
</body>`, "Semantic Layout Example")
                  }
                  className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {copied === "Semantic Layout Example" ? (
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
            </div>
          </div>
        )}
      </section>

      {/* Metadata Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            HTML5 Metadata Essentials
          </h2>
          <button
            onClick={() => toggleSection("metadata")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.metadata ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.metadata && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Essential Meta Tags
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Proper metadata in the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">&lt;head&gt;</code> section is crucial for SEO, 
                social sharing, and browser behavior. Here are the most important ones:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-html">
                    {`<head>
  <!-- Character encoding -->
  <meta charset="UTF-8">
  
  <!-- Viewport for responsive design -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Page description (SEO) -->
  <meta name="description" content="A brief description of your page">
  
  <!-- Keywords (less important now but still used) -->
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  
  <!-- Author -->
  <meta name="author" content="Author Name">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  
  <!-- CSS -->
  <link rel="stylesheet" href="styles.css">
  
  <!-- Title (shown in browser tab) -->
  <title>Page Title</title>
</head>`}
                  </code>
                </pre>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleOpenEditor(`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A brief description of your page">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  <meta name="author" content="Author Name">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="styles.css">
  <title>Page Title</title>
</head>`)}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <FaPlay size={12} /> Try it
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A brief description of your page">
  <meta name="keywords" content="keyword1, keyword2, keyword3">
  <meta name="author" content="Author Name">
  <link rel="icon" href="/favicon.ico">
  <link rel="stylesheet" href="styles.css">
  <title>Page Title</title>
</head>`, "Essential Meta Tags")
                  }
                  className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {copied === "Essential Meta Tags" ? (
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
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Social Media Meta Tags
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                These Open Graph and Twitter Card tags control how your content appears when shared on 
                social media platforms like Facebook, Twitter, and LinkedIn.
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-html">
                    {`<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your page description">
<meta property="og:image" content="https://yourdomain.com/image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourdomain.com/">
<meta property="twitter:title" content="Your Page Title">
<meta property="twitter:description" content="Your page description">
<meta property="twitter:image" content="https://yourdomain.com/image.jpg">`}
                  </code>
                </pre>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleOpenEditor(`<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your page description">
<meta property="og:image" content="https://yourdomain.com/image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourdomain.com/">
<meta property="twitter:title" content="Your Page Title">
<meta property="twitter:description" content="Your page description">
<meta property="twitter:image" content="https://yourdomain.com/image.jpg">`)}
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <FaPlay size={12} /> Try it
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(`<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your page description">
<meta property="og:image" content="https://yourdomain.com/image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourdomain.com/">
<meta property="twitter:title" content="Your Page Title">
<meta property="twitter:description" content="Your page description">
<meta property="twitter:image" content="https://yourdomain.com/image.jpg">`, "Social Media Meta Tags")
                  }
                  className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {copied === "Social Media Meta Tags" ? (
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
            </div>
          </div>
        )}
      </section>

      {/* Complete Examples Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Complete HTML5 Structure Examples
          </h2>
          <button
            onClick={() => toggleSection("examples")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.examples ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.examples && (
          <div className="space-y-6">
            {structureExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
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

      {/* Best Practices Section */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          HTML5 Structure Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always include the <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">DOCTYPE</code> declaration</li>
              <li>Specify the language with the <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">lang</code> attribute</li>
              <li>Use semantic elements appropriately</li>
              <li>Include proper character encoding and viewport meta tags</li>
              <li>Structure your content logically with headings</li>
              <li>Validate your HTML using the W3C validator</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t use deprecated elements like <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;center&gt;</code> or <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;font&gt;</code></li>
              <li>Avoid unnecessary divs when semantic elements would work</li>
              <li>Don&apos;t skip the <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">&lt;title&gt;</code> element</li>
              <li>Avoid inline styles and scripts when possible</li>
              <li>Don&apos;t use tables for layout</li>
              <li>Avoid too many nested elements</li>
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
              Experiment with HTML5 structure right in your browser using our interactive
              editor with live preview:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>No installation required</li>
              <li>Real-time preview of your code</li>
              <li>Format and clean your HTML</li>
              <li>Export your work as HTML files</li>
              <li>Perfect for testing HTML5 structure concepts</li>
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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 Structure</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    header, footer { background: #f4f4f4; padding: 20px; }
    nav ul { display: flex; list-style: none; }
    nav li { margin-right: 15px; }
  </style>
</head>
<body>
  <header>
    <h1>Website Title</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <p>Article content...</p>
    </article>
  </main>
  
  <footer>
    <p>&copy; 2023 My Website</p>
  </footer>
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
        {/* Previous Link */}
        <Link
          href="/html/semantic-elements"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
           &lt; Previous (Semantic-Element)
        </Link>

        {/* Next Link */}
        <Link
          href="/html/iframes"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (iframes) &gt;
        </Link>
      </section>
    </div>
  );
}