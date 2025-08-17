"use client";

import {
  FaCode,
  FaLayerGroup,
  FaMobileAlt,
  FaSearch,
  FaAccessibleIcon,
  FaCopy,
  FaPlay,
} from "react-icons/fa";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HTMLSemanticElementsPage() {
  const router = useRouter();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy code:", err);
      });
  };

  const handleOpenEditor = (code: string) => {
    try {
      localStorage.setItem("html-code", code);
      router.push("/compilers/html-editor");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  const semanticElements = [
    {
      tag: "<header>",
      description: "Introductory content or navigation",
      purpose: "Contains site headers, logos, and primary navigation",
      example: `<header>
  <h1>Site Title</h1>
  <nav>...</nav>
</header>`,
      benefits: ["Improves accessibility", "Helps with SEO"],
    },
    {
      tag: "<nav>",
      description: "Navigation links",
      purpose: "Should wrap major navigation blocks",
      example: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,
      benefits: ["Screen reader friendly", "Clear semantic meaning"],
    },
    {
      tag: "<main>",
      description: "Primary content",
      purpose: "Contains the dominant content of the document",
      example: `<main>
  <article>...</article>
  <section>...</section>
</main>`,
      benefits: ["Only one per page", "Helps with keyboard navigation"],
    },
    {
      tag: "<article>",
      description: "Self-contained composition",
      purpose: "Content that makes sense on its own",
      example: `<article>
  <h2>Blog Post Title</h2>
  <p>Content...</p>
</article>`,
      benefits: ["Syndication ready", "Improves SEO"],
    },
    {
      tag: "<section>",
      description: "Thematic grouping",
      purpose: "Groups related content together",
      example: `<section>
  <h2>Chapter Title</h2>
  <p>Content...</p>
</section>`,
      benefits: ["Better document outline", "Improved readability"],
    },
    {
      tag: "<aside>",
      description: "Side content",
      purpose: "Content indirectly related to main content",
      example: `<aside>
  <h3>Related Links</h3>
  <ul>...</ul>
</aside>`,
      benefits: ["Clear content separation", "Better mobile layouts"],
    },
    {
      tag: "<footer>",
      description: "Closing content",
      purpose: "Contains footer information",
      example: `<footer>
  <p>Copyright © 2023</p>
</footer>`,
      benefits: ["Expected location", "Accessibility benefits"],
    },
  ];

  const semanticBenefits = [
    {
      icon: <FaAccessibleIcon className="text-blue-500" />,
      title: "Accessibility",
      description: "Screen readers use semantic tags to navigate content",
    },
    {
      icon: <FaSearch className="text-purple-500" />,
      title: "SEO Benefits",
      description: "Search engines prioritize well-structured content",
    },
    {
      icon: <FaMobileAlt className="text-green-500" />,
      title: "Responsive Design",
      description: "Easier to create mobile-friendly layouts",
    },
    {
      icon: <FaLayerGroup className="text-yellow-500" />,
      title: "Maintainability",
      description: "Clear structure makes code easier to update",
    },
  ];

  return (
    <>
      <Head>
        <title>HTML Semantic Elements | Web Development Guide</title>
        <meta
          name="description"
          content="Learn about HTML semantic elements and how to properly structure your web pages for better accessibility, SEO, and maintainability."
        />
        <meta
          name="keywords"
          content="HTML, semantic elements, web development, accessibility, SEO, header, nav, main, article, section, aside, footer"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-500 mb-4">
            HTML Semantic Elements
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how to use semantic HTML elements to create well-structured,
            accessible, and SEO-friendly web pages.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto mt-6 rounded-full" />
        </header>

        {/* Why Semantic HTML Matters */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
            <FaCode className="text-blue-500 mr-3" />
            The Power of Semantic HTML
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Semantic HTML provides meaning to your web content, making it
                more accessible to both users and machines. Proper use of
                semantic elements:
              </p>

              <div className="grid grid-cols-2 gap-4">
                {semanticBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="text-2xl mb-2">{benefit.icon}</div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-200 dark:bg-gray-600 px-4 py-2 text-sm font-mono">
                  Semantic HTML Structure
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="language-html">
                    {`<!DOCTYPE html>
<html>
<head>
  <title>Document Title</title>
</head>
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <article>...</article>
    <section>...</section>
  </main>
  <aside>...</aside>
  <footer>...</footer>
</body>
</html>`}
                  </code>
                </pre>
                <div className="bg-gray-200 dark:bg-gray-600 px-4 py-2 flex justify-end space-x-2">
                  <button
                    onClick={() =>
                      handleCopyCode(
                        `<!DOCTYPE html>
<html>
<head>
  <title>Document Title</title>
</head>
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <article>...</article>
    <section>...</section>
  </main>
  <aside>...</aside>
  <footer>...</footer>
</body>
</html>`,
                        -1
                      )
                    }
                    className="flex items-center px-3 py-1 text-sm bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400 rounded"
                  >
                    <FaCopy className="mr-1" />{" "}
                    {copiedIndex === -1 ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Document Title</title>
</head>
<body>
  <header>...</header>
  <nav>...</nav>
  <main>
    <article>...</article>
    <section>...</section>
  </main>
  <aside>...</aside>
  <footer>...</footer>
</body>
</html>`)
                    }
                    className="flex items-center px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    <FaPlay className="mr-1" /> Try It
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense Ad Unit */}
        <div className="my-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-YOUR_ADSENSE_ID"
            data-ad-slot="YOUR_AD_SLOT"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>

        {/* Semantic Elements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Essential Semantic Elements
          </h2>

          <div className="space-y-6">
            {semanticElements.map((element, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3">
                  <h3 className="font-mono text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {element.tag}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {element.description}
                  </p>
                </div>

                <div className="p-4 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Purpose:
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {element.purpose}
                    </p>

                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Benefits:
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      {element.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded overflow-hidden">
                    <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600">
                      Example:
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm">
                      <code className="language-html">{element.example}</code>
                    </pre>
                    <div className="px-3 py-2 flex justify-end space-x-2 bg-gray-200 dark:bg-gray-600">
                      <button
                        onClick={() => handleCopyCode(element.example, index)}
                        className="flex items-center px-3 py-1 text-sm bg-gray-300 dark:bg-gray-500 hover:bg-gray-400 dark:hover:bg-gray-400 rounded"
                      >
                        <FaCopy className="mr-1" />{" "}
                        {copiedIndex === index ? "Copied!" : "Copy"}
                      </button>
                      <button
                        onClick={() => handleOpenEditor(element.example)}
                        className="flex items-center px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
                      >
                        <FaPlay className="mr-1" /> Try It
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Semantic HTML Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
                Do's
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Use semantic elements for their intended purpose</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Maintain a logical document outline</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Ensure proper nesting of elements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Use headings (h1-h6) hierarchically</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
                Don'ts
              </h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>
                    Don't use divs when semantic elements are available
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Avoid using semantic elements just for styling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Don't skip heading levels (e.g., h1 to h3)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Avoid unnecessary nesting of sections</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practice Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Practice Semantic HTML
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Apply what you've learned in our interactive HTML editor.
            </p>
            <Link
              href="/compilers/html-editor"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition"
            >
              Open HTML Editor
              <FaCode className="ml-2" />
            </Link>
          </div>
        </section>

        {/* Next Steps */}
        <section className="flex justify-between items-center px-4 py-6 border-t">
          {/* Previous Link */}
          <Link
            href="/html/web-storage"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
          >
             &lt; Previous (Web-Storage)
          </Link>

          {/* Next Link */}
          <Link
            href="/html/html5-structure"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
          >
             &lt; Previous (HTML5-structure)
          </Link>
        </section>
      </div>
    </>
  );
}
