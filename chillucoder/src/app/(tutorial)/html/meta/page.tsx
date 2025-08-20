"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaSearch,
  FaMobileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function HTMLMetaTagsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    essentials: true,
    seo: true,
    social: true,
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

  const metaExamples = [
    {
      title: "Basic Meta Tags",
      description: "Essential meta tags every HTML document should have",
      code: `<head>
  <!-- Character encoding -->
  <meta charset="UTF-8">
  
  <!-- Viewport for responsive design -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Page description (SEO) -->
  <meta name="description" content="Learn about HTML meta tags and their importance for SEO and web development">
  
  <!-- Keywords (less important now but still used) -->
  <meta name="keywords" content="HTML, meta tags, SEO, web development">
  
  <!-- Author -->
  <meta name="author" content="Your Name">
  
  <!-- Title tag -->
  <title>HTML Meta Tags Guide</title>
</head>`,
    },
    {
      title: "Social Media Meta Tags",
      description: "Open Graph and Twitter Card tags for rich social sharing",
      code: `<!-- Primary Meta Tags -->
<meta name="title" content="HTML Meta Tags Guide">
<meta name="description" content="Learn about HTML meta tags and their importance for SEO and web development">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourdomain.com/html/meta">
<meta property="og:title" content="HTML Meta Tags Guide">
<meta property="og:description" content="Learn about HTML meta tags and their importance for SEO and web development">
<meta property="og:image" content="https://yourdomain.com/images/meta-tags-preview.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourdomain.com/html/meta">
<meta property="twitter:title" content="HTML Meta Tags Guide">
<meta property="twitter:description" content="Learn about HTML meta tags and their importance for SEO and web development">
<meta property="twitter:image" content="https://yourdomain.com/images/meta-tags-preview.jpg">`,
    },
    {
      title: "Advanced Meta Tags",
      description: "Specialized meta tags for browsers and search engines",
      code: `<!-- Prevent search engines from indexing -->
<meta name="robots" content="noindex,nofollow">

<!-- Theme color for browsers -->
<meta name="theme-color" content="#3a86ff">

<!-- Canonical URL to prevent duplicate content -->
<link rel="canonical" href="https://yourdomain.com/preferred-url">

<!-- Mobile web app capable -->
<meta name="mobile-web-app-capable" content="yes">

<!-- Apple specific -->
<meta name="apple-mobile-web-app-title" content="App Title">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!-- IE compatibility -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<!-- Disable automatic detection of phone numbers -->
<meta name="format-detection" content="telephone=no">`,
    },
  ];

  return (
    <div>
      <Head>
        <title>HTML Meta Tags | Complete Guide with Examples</title>
        <meta
          name="description"
          content="Learn about essential HTML meta tags for SEO, social media, and browser behavior. Includes examples of viewport, Open Graph, Twitter Cards, and more."
        />
        <meta
          name="keywords"
          content="HTML meta tags, meta description, viewport, Open Graph, Twitter Cards, SEO meta tags, HTML head"
        />
        <meta name="author" content="Your Name" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Meta Tags Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Master the metadata that powers SEO, social sharing, and browser behavior
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          What Are Meta Tags?
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Meta tags provide metadata about your HTML document that isn&apos;t displayed
          on the page itself, but is used by browsers, search engines, and social
          media platforms. They influence how your content appears in search
          results, social shares, and even how browsers render your page.
        </p>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="A sample page demonstrating meta tags">
  <title>Meta Tags Example</title>
</head>
<body>
  <h1>Welcome to My Page</h1>
  <p>This page demonstrates essential HTML meta tags.</p>
</body>
</html>`)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Essential Meta Tags */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaShieldAlt className="text-blue-500" />
            Essential Meta Tags
          </h2>
          <button
            onClick={() => toggleSection("essentials")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.essentials ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.essentials && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Character Encoding
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">charset</code> meta tag
                    declares the document&apos;s character encoding. UTF-8 is the
                    standard encoding for the web and supports all Unicode
                    characters.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleOpenEditor(`<meta charset="UTF-8">`)
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<meta charset="UTF-8">`,
                          "Charset Meta Tag"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === "Charset Meta Tag" ? (
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
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Always include this as the first meta tag -->
<meta charset="UTF-8">`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Viewport Tag
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">viewport</code> meta tag
                    controls layout on mobile browsers. Without it, your site may
                    appear zoomed out on mobile devices.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <FaMobileAlt className="text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Essential for responsive design
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() =>
                        handleOpenEditor(
                          `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      <FaPlay size={12} /> Try it
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
                          "Viewport Meta Tag"
                        )
                      }
                      className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {copied === "Viewport Meta Tag" ? (
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
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Standard responsive viewport tag -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Additional options -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Description & Keywords
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">description</code> meta tag
                    provides a brief summary of your page&apos;s content, often used as
                    the preview text in search results.
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <FaSearch className="text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Important for SEO and click-through rates
                    </span>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Description (150-160 characters ideal) -->
<meta name="description" content="Learn about HTML meta tags and their importance for SEO and web development">

<!-- Keywords (less important today) -->
<meta name="keywords" content="HTML, meta tags, SEO, web development">`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SEO Meta Tags */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaSearch className="text-blue-500" />
            SEO Meta Tags
          </h2>
          <button
            onClick={() => toggleSection("seo")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.seo ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.seo && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Robots Meta Tag
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">robots</code> meta tag
                    controls how search engines index and follow links on your
                    page.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">index/noindex</code>: Allow/prevent
                      indexing
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">follow/nofollow</code>: Control
                      link following
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">noarchive</code>: Prevent cached
                      copies
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">nosnippet</code>: Prevent
                      snippets in results
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Allow indexing and link following (default) -->
<meta name="robots" content="index,follow">

<!-- Prevent indexing but allow link following -->
<meta name="robots" content="noindex,follow">

<!-- Allow indexing but prevent link following -->
<meta name="robots" content="index,nofollow">

<!-- Prevent both indexing and link following -->
<meta name="robots" content="noindex,nofollow">`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Canonical URLs
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">canonical</code> link tag
                    helps prevent duplicate content issues by specifying the
                    &quot;master&quot; version of a page.
                  </p>
                  <div className="bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-400 p-4">
                    <p className="text-yellow-700 dark:text-yellow-400">
                      <strong>Important:</strong> Use when you have multiple URLs
                      that show the same content.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Specify the preferred version of this page -->
<link rel="canonical" href="https://example.com/preferred-url">

<!-- Dynamic canonical URL example -->
<link rel="canonical" href="<?php echo $canonicalUrl; ?>">`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Social Media Meta Tags */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Social Media Meta Tags
          </h2>
          <button
            onClick={() => toggleSection("social")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.social ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.social && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Open Graph (Facebook)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Open Graph tags control how your content appears when shared on
                    Facebook, LinkedIn, and other platforms.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">og:title</code>: The title of
                      your content
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">og:description</code>: A brief
                      description
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">og:image</code>: The image to
                      display
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">og:url</code>: The canonical
                      URL
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page">
<meta property="og:title" content="Your Page Title">
<meta property="og:description" content="Your engaging description">
<meta property="og:image" content="https://example.com/image.jpg">

<!-- Image dimensions (recommended) -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Twitter Cards
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="mb-4 text-gray-700 dark:text-gray-300">
                    Twitter Card tags enhance how your content appears in tweets.
                    Twitter will fall back to Open Graph tags if these aren&apos;t
                    present.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">twitter:card</code>: Type of card
                      (summary, summary_large_image, etc.)
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">twitter:site</code>: Your
                      Twitter @username
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">twitter:creator</code>: Content
                      creator&apos;s @username
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Twitter Card data -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@yourusername">
<meta name="twitter:creator" content="@contentcreator">
<meta name="twitter:title" content="Your Page Title">
<meta name="twitter:description" content="Your engaging description">
<meta name="twitter:image" content="https://example.com/image.jpg">`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Examples Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Complete Examples
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
            {metaExamples.map((example, index) => (
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
          Meta Tag Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always include charset and viewport tags</li>
              <li>Write unique, compelling meta descriptions</li>
              <li>Use social meta tags for better sharing</li>
              <li>Specify canonical URLs for duplicate content</li>
              <li>Test with Facebook Sharing Debugger and Twitter Validator</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t stuff keywords in meta tags</li>
              <li>Avoid duplicate meta descriptions</li>
              <li>Don&apos;t use misleading titles or descriptions</li>
              <li>Avoid noindex unless absolutely necessary</li>
              <li>Don&apos;t forget to update when content changes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our HTML Editor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Experiment with meta tags in our interactive editor:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test different meta tag combinations</li>
              <li>See how they affect search results and social sharing</li>
              <li>Practice with Open Graph and Twitter Cards</li>
              <li>Learn through hands-on experimentation</li>
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
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Learn about HTML meta tags">
  
  <!-- Open Graph -->
  <meta property="og:title" content="HTML Meta Tags Guide">
  <meta property="og:description" content="Learn about HTML meta tags">
  <meta property="og:image" content="image.jpg">
  
  <title>Meta Tags Playground</title>
</head>
<body>
  <h1>Experiment with Meta Tags</h1>
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
          href="/html/head"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (HTML Head)
        </Link>
        <Link
          href="/html/semantic"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (Semantic HTML) &gt;
        </Link>
      </section>
    </div>
  );
}