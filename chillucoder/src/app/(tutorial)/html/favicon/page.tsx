"use client";

import { useState } from "react";
import { FaCopy, FaCheck, FaCode, FaEye, FaDownload } from "react-icons/fa";
import Head from "next/head";

export default function FaviconPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"html" | "react">("html");

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadFavicon = (type: string) => {
    // In a real implementation, you would serve actual icon files
    alert(`Downloading ${type} favicon`);
  };

  const faviconExamples = [
    {
      id: "basic",
      title: "Basic Favicon",
      description: "Standard 16x16 or 32x32 pixel favicon",
      htmlCode: `<!-- Place in head section -->
<link rel="icon" href="/favicon.ico" type="image/x-icon">`,
      reactCode: `// Place in _document.js or _app.js
<Head>
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />
</Head>`,
      preview: "/favicon.ico" // Path to your icon
    },
    {
      id: "modern",
      title: "Modern Multi-Size",
      description: "Supports multiple device resolutions",
      htmlCode: `<!-- Multiple sizes for different devices -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`,
      reactCode: `// Modern favicon setup
<Head>
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</Head>`,
      preview: "/favicon-32x32.png"
    },
    {
      id: "svg",
      title: "SVG Favicon",
      description: "Scalable vector graphics favicon",
      htmlCode: `<!-- SVG favicon for crisp rendering -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">`,
      reactCode: `// SVG favicon
<Head>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</Head>`,
      preview: "/favicon.svg"
    },
    {
      id: "emoji",
      title: "Emoji Favicon",
      description: "Using emoji as a favicon",
      htmlCode: `<!-- Emoji as favicon -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>">`,
      reactCode: `// Emoji favicon
<Head>
  <link 
    rel="icon" 
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>" 
  />
</Head>`,
      preview: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>"
    },
    {
      id: "animated",
      title: "Animated Favicon",
      description: "Animated SVG favicon",
      htmlCode: `<!-- Animated SVG favicon -->
<link rel="icon" href="/animated-favicon.svg" type="image/svg+xml">`,
      reactCode: `// Animated favicon
<Head>
  <link rel="icon" href="/animated-favicon.svg" type="image/svg+xml" />
</Head>`,
      preview: "/animated-favicon.svg"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Head>
        <title>HTML Favicon Examples</title>
        <meta name="description" content="Collection of favicon implementation examples" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          Favicon Implementation Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Various ways to implement favicons in your HTML and React projects
        </p>
      </header>

      <div className="grid gap-8">
        {faviconExamples.map((example) => (
          <section key={example.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">{example.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {example.description}
              </p>
            </div>

            <div className="p-4 grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === "html" ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
                    onClick={() => setActiveTab("html")}
                  >
                    HTML
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === "react" ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
                    onClick={() => setActiveTab("react")}
                  >
                    React/Next.js
                  </button>
                </div>

                <div className="relative">
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {activeTab === "html" ? example.htmlCode : example.reactCode}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(activeTab === "html" ? example.htmlCode : example.reactCode, example.id)}
                    className="absolute top-2 right-2 p-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {copied === example.id ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaCopy />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Preview</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                    {example.preview.startsWith("data:") ? (
                      <div dangerouslySetInnerHTML={{ __html: example.preview.split(",")[1] }} />
                    ) : (
                      <img 
                        src={example.preview} 
                        alt={`${example.title} preview`} 
                        className="max-w-full max-h-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      This is how it appears in browser tabs
                    </p>
                    <button
                      onClick={() => downloadFavicon(example.id)}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      <FaDownload /> Download Assets
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Implementation Notes</h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {example.id === "basic" && (
                      <>
                        <li>• Traditional .ico format</li>
                        <li>• Works in all browsers</li>
                        <li>• Limited to 16x16 or 32x32 pixels</li>
                      </>
                    )}
                    {example.id === "modern" && (
                      <>
                        <li>• Supports multiple resolutions</li>
                        <li>• Includes Apple Touch Icon</li>
                        <li>• Web Manifest for PWA support</li>
                      </>
                    )}
                    {example.id === "svg" && (
                      <>
                        <li>• Crisp rendering at any size</li>
                        <li>• Small file size</li>
                        <li>• Not supported in Safari</li>
                      </>
                    )}
                    {example.id === "emoji" && (
                      <>
                        <li>• No image files needed</li>
                        <li>• Easy to change</li>
                        <li>• Limited customization</li>
                      </>
                    )}
                    {example.id === "animated" && (
                      <>
                        <li>• Dynamic, eye-catching</li>
                        <li>• SVG animation support required</li>
                        <li>• Can be distracting if overused</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}