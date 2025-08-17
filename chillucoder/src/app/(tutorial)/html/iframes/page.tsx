"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaShieldAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function IframesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    security: true,
    advanced: true,
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

  const iframeExamples = [
    {
      title: "Basic Iframe Embed",
      description: "Embedding external content with basic attributes",
      code: `<iframe 
  src="https://example.com" 
  width="600" 
  height="400"
  title="Example Website Embed"
  loading="lazy">
</iframe>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <iframe 
            src="https://example.com" 
            width="100%" 
            height="300"
            title="Example Website Embed"
            className="border border-gray-300 rounded"
            loading="lazy"
          />
        </div>
      ),
    },
    {
      title: "YouTube Video Embed",
      description: "Responsive YouTube embed with aspect ratio preservation",
      code: `<div class="aspect-w-16 aspect-h-9">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    class="w-full h-full">
  </iframe>
</div>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Sandboxed Iframe",
      description: "Secure iframe with restricted capabilities",
      code: `<iframe
  src="/"
  sandbox="allow-scripts allow-same-origin"
  width="100%"
  height="500"
  title="Sandboxed Content">
</iframe>`,
      preview: (
        <div className="border border-gray-200 rounded p-4 bg-white">
          <iframe
            src="/"
            sandbox="allow-scripts allow-same-origin"
            width="100%"
            height="300"
            title="Sandboxed Content"
            className="border border-gray-300 rounded"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>HTML Iframes | Complete Guide with Examples</title>
        <meta
          name="description"
          content="Learn how to use HTML iframes with security best practices. Includes examples for embedding videos, maps, and external content."
        />
        <meta
          name="keywords"
          content="HTML iframe, embed content, sandbox iframe, YouTube embed, secure iframes"
        />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Iframes Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Embed external content securely with iframes
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          What are Iframes?
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Iframes (Inline Frames) allow you to embed another HTML document within
          your current page. They're commonly used for videos, maps, ads, and
          third-party widgets.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() =>
              handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Iframe Example</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .container { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Embedding Content</h1>
    <iframe 
      src="https://example.com" 
      width="100%" 
      height="400"
      title="Example Embed"
      loading="lazy">
    </iframe>
  </div>
</body>
</html>`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaPlay size={14} /> Open in Live Editor
          </button>
          <Link
            href="#security"
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaShieldAlt size={14} /> Jump to Security
          </Link>
        </div>
      </section>

      {/* Basic Usage */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Basic Iframe Usage
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
                Essential Attributes
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">src</code> - URL of the
                      content to embed
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">width</code>/<code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">height</code> - Dimensions in pixels or %
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">title</code> - Required for
                      accessibility
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">loading</code> - "lazy" for
                      deferred loading
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Basic iframe structure -->
<iframe
  src="url-to-embed"
  width="300"
  height="200"
  title="Description"
  loading="lazy">
</iframe>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Responsive Iframes
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                For responsive designs, use CSS aspect ratio techniques:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Aspect ratio container -->
<div class="iframe-container">
  <iframe src="..." title="..."></iframe>
</div>

<style>
  .iframe-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    overflow: hidden;
  }
  .iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>`}
                    </code>
                  </pre>
                </div>
                <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <div className="w-full">
                    <div className="relative pb-[56.25%] h-0 overflow-hidden">
                      <iframe
                        src="https://example.com"
                        title="Responsive Example"
                        className="absolute top-0 left-0 w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Security Section */}
      <section id="security" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaShieldAlt className="text-blue-500" />
            Iframe Security
          </h2>
          <button
            onClick={() => toggleSection("security")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.security ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.security && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Sandbox Attribute
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                The <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">sandbox</code> attribute enables
                extra restrictions for iframe content:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">allow-scripts</code>: Allow
                      JavaScript execution
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">allow-same-origin</code>: Allow
                      same-origin access
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">allow-forms</code>: Allow form
                      submission
                    </li>
                    <li>
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">allow-popups</code>: Allow
                      popups/new windows
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-html">
                      {`<!-- Secure sandboxed iframe -->
<iframe
  src="untrusted-content.html"
  sandbox="allow-scripts allow-same-origin"
  title="Secure Content">
</iframe>`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Security Best Practices
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Always use the <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">sandbox</code> attribute for untrusted content</li>
                    <li>Include <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">title</code> for accessibility</li>
                    <li>Use <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">loading="lazy"</code> for performance</li>
                    <li>Consider Content Security Policy (CSP) headers</li>
                    <li>Validate all embedded URLs</li>
                  </ul>
                </div>
                <div>
                  <div className="bg-red-50 dark:bg-gray-700 border-l-4 border-red-500 p-4">
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">
                      <FaShieldAlt className="inline mr-2" />
                      Never Do This
                    </h4>
                    <pre className="text-sm overflow-x-auto bg-red-100 dark:bg-gray-800 p-2 rounded">
                      <code className="language-html">
                        {`<!-- UNSECURE - Avoid this! -->
<iframe 
  src="untrusted.com" 
  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
  allow="autoplay; camera; microphone">
</iframe>`}
                      </code>
                    </pre>
                  </div>
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
            Practical Examples
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {iframeExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {example.description}
                  </p>
                  <div className="mb-4">{example.preview}</div>
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

      {/* Advanced Techniques */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaExternalLinkAlt className="text-blue-500" />
            Advanced Techniques
          </h2>
          <button
            onClick={() => toggleSection("advanced")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.advanced ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.advanced && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Cross-Domain Communication
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Use <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">window.postMessage()</code> for
                secure communication between iframes and parent pages:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-javascript">
                      {`// Parent window sending message
const iframe = document.getElementById('myIframe');
iframe.contentWindow.postMessage(
  { key: 'value' }, 
  'https://allowed-origin.com'
);

// Iframe receiving message
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://parent-site.com') return;
  console.log('Received:', event.data);
});`}
                    </code>
                  </pre>
                </div>
                <div>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Always verify <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">event.origin</code></li>
                    <li>Use specific target origins (not *)</li>
                    <li>Consider using libraries like <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">iframe-resizer</code></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
                Embedding Popular Services
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">Service</th>
                      <th className="px-4 py-2 text-left">Implementation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-4 py-2">Google Maps</td>
                      <td className="px-4 py-2">
                        <code className="text-sm bg-gray-100 dark:bg-gray-700 p-1 rounded">
                          {`<iframe src="https://maps.google.com/maps?q=[address]&output=embed"></iframe>`}
                        </code>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Twitter</td>
                      <td className="px-4 py-2">
                        <code className="text-sm bg-gray-100 dark:bg-gray-700 p-1 rounded">
                          {`<iframe src="https://platform.twitter.com/embed/Tweet.html?id=[tweet-id]"></iframe>`}
                        </code>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Spotify</td>
                      <td className="px-4 py-2">
                        <code className="text-sm bg-gray-100 dark:bg-gray-700 p-1 rounded">
                          {`<iframe src="https://open.spotify.com/embed/track/[track-id]"></iframe>`}
                        </code>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
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
              Experiment with iframes in our interactive editor:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test different sandbox configurations</li>
              <li>See responsive iframes in action</li>
              <li>Try embedding popular services</li>
              <li>Practice secure communication techniques</li>
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
  <title>Iframe Playground</title>
  <style>
    .iframe-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    }
    .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div class="iframe-container">
    <iframe 
      src="https://example.com" 
      sandbox="allow-same-origin"
      title="Playground Iframe">
    </iframe>
  </div>
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
          href="/html/html5-structure"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (HTML5-Structure)
        </Link>
        <Link
          href="/html/meta"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (Meta) &gt;
        </Link>
      </section>
    </div>
  );
}