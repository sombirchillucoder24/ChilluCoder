"use client";

import {
  FaInfoCircle,
  FaHistory,
  FaCode,
  FaGlobe,
  FaLaptopCode,
  FaTags,
  FaCopy,
  FaLightbulb,
} from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function HtmlIntroPage() {
  const [activeExample, setActiveExample] = useState(0);
  const router = useRouter();

  const examples = [
    {
      name: "Basic Page",
      code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This is my first HTML page.</p>
</body>
</html>`,
    },
    {
      name: "Form Example",
      code: `<!DOCTYPE html>
<html>
<body>
  <h2>Contact Form</h2>
  <form>
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name"><br>
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email"><br>
    <input type="submit" value="Submit">
  </form> 
</body>
</html>`,
    },
    {
      name: "Image Gallery",
      code: `<!DOCTYPE html>
<html>
<body>
  <h1>My Gallery</h1>
  <div style="display: flex; gap: 10px;">
    <img src="https://picsum.photos/200/300" alt="Sample 1">
    <img src="https://picsum.photos/200/301" alt="Sample 2">
    <img src="https://picsum.photos/200/302" alt="Sample 3">
  </div>
</body>
</html>`,
    },
  ];

const handleTryYourself = () => {
    // Save to localStorage before redirecting
    localStorage.setItem("html-code", examples[activeExample].code);
    router.push("/compilers/html-editor");
  };

const copyToClipboard = () => {
    navigator.clipboard.writeText(examples[activeExample].code);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Code copied!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 mb-3">
          HTML Tutorial
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mb-4 rounded-full"></div>

        <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-600 p-4 mb-6">
          <p className="dark:text-yellow-100">
            HTML is the standard markup language for Web pages.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-8">
        {/* What is HTML Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <FaInfoCircle className="text-blue-500 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              What is HTML?
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="space-y-2 dark:text-gray-300 mb-6">
              <li>
                HTML stands for <strong>H</strong>yper <strong>T</strong>ext{" "}
                <strong>M</strong>arkup <strong>L</strong>anguage
              </li>
              <li>
                HTML is the standard markup language for creating Web pages
              </li>
              <li>HTML describes the structure of a Web page</li>
              <li>HTML consists of a series of elements</li>
              <li>HTML elements tell the browser how to display the content</li>
            </ul>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="font-bold mb-2 dark:text-white">HTML Example</h3>
              <pre className="bg-white dark:bg-gray-900 p-4 rounded overflow-x-auto">
                <code className="language-html">
                  {`<!DOCTYPE html>
<html>
<head>
  <title>HTML Tutorial</title>
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Brief History Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <FaHistory className="text-emerald-500 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Brief History of HTML
            </h2>
          </div>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              HTML was created by <strong>Tim Berners-Lee</strong> in 1991 while
              working at CERN. The first version had just 18 elements. Today's
              HTML5 includes over 100 elements.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {[
                {
                  year: "1991",
                  version: "HTML",
                  note: "First public description",
                },
                {
                  year: "1995",
                  version: "HTML 2.0",
                  note: "First standardized version",
                },
                {
                  year: "1997",
                  version: "HTML 3.2",
                  note: "W3C recommendation",
                },
                {
                  year: "1999",
                  version: "HTML 4.01",
                  note: "Final classic version",
                },
                {
                  year: "2000",
                  version: "XHTML",
                  note: "XML-based reformulation",
                },
                { year: "2014", version: "HTML5", note: "Current standard" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="font-bold text-blue-600 dark:text-blue-400">
                    {item.year}
                  </div>
                  <div className="font-semibold">{item.version}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HTML Elements Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <FaCode className="text-purple-500 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              HTML Elements
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              An HTML element is defined by a start tag, some content, and an
              end tag:
            </p>

            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-4">
              <code className="text-sm dark:text-gray-200">
                &lt;tagname&gt;Content goes here...&lt;/tagname&gt;
              </code>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
              <h3 className="font-bold mb-2 dark:text-blue-200">Note:</h3>
              <p className="dark:text-blue-100">
                Some HTML elements have no content (like the &lt;br&gt;
                element). These elements are called empty elements. Empty
                elements do not have an end tag!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2 dark:text-white">
                  HTML Page Structure
                </h3>
                <div className="bg-white dark:bg-gray-900 p-4 rounded overflow-x-auto">
                  <pre>
                    <code className="language-html">
                      {`<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</body>
</html>`}
                    </code>
                  </pre>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2 dark:text-white">HTML Tags</h3>
                <table className="w-full text-sm dark:text-gray-300">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2">Tag</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2">
                        <code>&lt;html&gt;</code>
                      </td>
                      <td className="py-2">
                        Defines the root of an HTML document
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2">
                        <code>&lt;head&gt;</code>
                      </td>
                      <td className="py-2">Contains metadata/information</td>
                    </tr>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-2">
                        <code>&lt;body&gt;</code>
                      </td>
                      <td className="py-2">Defines the document's body</td>
                    </tr>
                    <tr>
                      <td className="py-2">
                        <code>&lt;h1&gt;</code>
                      </td>
                      <td className="py-2">Defines a large heading</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* HTML Tags Section */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <FaTags className="text-purple-500 text-2xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              HTML Tags
            </h2>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              HTML tags are the building blocks of web pages. They define how
              content should be structured and displayed.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Tags */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="font-bold mb-3 dark:text-white">
                  Basic Structure Tags
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-600">
                      <th className="text-left py-2">Tag</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-600">
                      <td className="py-2">
                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                          &lt;html&gt;
                        </code>
                      </td>
                      <td className="py-2">Root element of an HTML page</td>
                    </tr>
                    <tr className="border-b dark:border-gray-600">
                      <td className="py-2">
                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                          &lt;head&gt;
                        </code>
                      </td>
                      <td className="py-2">
                        Contains metadata and document info
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-600">
                      <td className="py-2">
                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                          &lt;body&gt;
                        </code>
                      </td>
                      <td className="py-2">
                        Contains the visible page content
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-600">
                      <td className="py-2">
                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                          &lt;title&gt;
                        </code>
                      </td>
                      <td className="py-2">Specifies the browser tab title</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Content Tags */}
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="font-bold mb-3 dark:text-white">Content Tags</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-600">
                      <th className="text-left py-2">Tag</th>
                      <th className="text-left py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-600">
                      <td className="py-2">
                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                          &lt;h1&gt;-&lt;h6&gt;
                        </code>
                      </td>
                      <td className="py-2">
                        Heading levels (h1 is most important)
                      </td>
                    </tr>
                    <tr className="border-b dark:border-gray-600">
                      <td className="py-2">
                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                          &lt;p&gt;
                        </code>
                      </td>
                      <td className="py-2">Paragraph of text</td>
                    </tr>
                    <tr className="border-b dark:border-gray-600">
                      <td className="py-2">
                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                          &lt;a&gt;
                        </code>
                      </td>
                      <td className="py-2">Hyperlink to other pages</td>
                    </tr>
                    <tr>
                      <td className="py-2">
                        <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                          &lt;img&gt;
                        </code>
                      </td>
                      <td className="py-2">Embeds an image</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Self-Closing Tags */}
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
              <h3 className="font-bold mb-2 dark:text-blue-200">
                Self-Closing Tags
              </h3>
              <p className="dark:text-blue-100">
                Some tags don't need closing tags. These are called void
                elements:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  &lt;br&gt;
                </code>
                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  &lt;hr&gt;
                </code>
                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  &lt;img&gt;
                </code>
                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  &lt;input&gt;
                </code>
                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                  &lt;meta&gt;
                </code>
              </div>
            </div>

            {/* Tag Attributes */}
            <div className="mt-6">
              <h3 className="font-bold mb-3 dark:text-white">Tag Attributes</h3>
              <p className="mb-3">
                Tags can have attributes that provide additional information:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-html">
                    {`<a href="https://example.com" target="_blank" class="link">
  Visit Example
</a>`}
                  </code>
                </pre>
                <div className="mt-2 text-sm">
                  <p>Common attributes include:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                        class
                      </code>{" "}
                      - For CSS styling
                    </li>
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                        id
                      </code>{" "}
                      - Unique identifier
                    </li>
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                        style
                      </code>{" "}
                      - Inline CSS
                    </li>
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                        src
                      </code>{" "}
                      - Source for images/scripts
                    </li>
                    <li>
                      <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">
                        href
                      </code>{" "}
                      - Link destination
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-xl font-bold mb-3 dark:text-green-200 flex items-center">
            <FaCode className="mr-2" />
            Try it Yourself
          </h3>
          <p className="dark:text-green-100 mb-4">
            Edit the code below to see how HTML works:
          </p>

          {/* Example Selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">
              Select Example:
            </label>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExample(index)}
                  className={`px-3 py-1 text-sm rounded ${
                    activeExample === index
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {example.name}
                </button>
              ))}
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FaCopy /> Copy
              </button>
            </div>
          </div>

          {/* Code Display */}
          <div className="mb-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                Example Code Preview
              </h4>
              <button
                onClick={handleTryYourself}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Open in Editor
              </button>
            </div>
            <pre className="bg-white dark:bg-gray-900 p-4 rounded overflow-x-auto text-sm">
              <code>{examples[activeExample].code}</code>
            </pre>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mt-4">
            <div className="flex items-start">
              <FaLightbulb className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-bold mb-2 dark:text-blue-200">Tips:</h4>
                <ul className="list-disc pl-5 space-y-1 dark:text-blue-100">
                  <li>
                    Try changing the text between the <code>&lt;h2&gt;</code>{" "}
                    tags
                  </li>
                  <li>
                    Add a new paragraph with <code>&lt;p&gt;</code> tags
                  </li>
                  <li>
                    Insert an image with <code>&lt;img src="..."&gt;</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            Ready to Continue?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Now that you understand what HTML is, let's explore how to work with
            it:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="/html/editors"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-1">
                HTML Editors →
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Learn about tools for writing HTML
              </p>
            </a>
            <a
              href="/html/basics"
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                HTML Basics →
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Start learning fundamental syntax
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
