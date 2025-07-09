"use client"

export default function HTMLTutorialPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">HTML Tutorial</h1>
      
      <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-600 p-4 mb-6">
        <p className="dark:text-yellow-100">HTML is the standard markup language for Web pages.</p>
      </div>
      
      <div className="prose max-w-none dark:prose-invert">
        {/* Introduction Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">What is HTML?</h2>
          <ul className="space-y-2 dark:text-gray-300 mb-6">
            <li>HTML stands for <strong>H</strong>yper <strong>T</strong>ext <strong>M</strong>arkup <strong>L</strong>anguage</li>
            <li>HTML is the standard markup language for creating Web pages</li>
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
        </section>

        {/* HTML Elements Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">HTML Elements</h2>
          <p className="dark:text-gray-300 mb-4">
            An HTML element is defined by a start tag, some content, and an end tag:
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-4">
            <code className="text-sm dark:text-gray-200">
              &lt;tagname&gt;Content goes here...&lt;/tagname&gt;
            </code>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
            <h3 className="font-bold mb-2 dark:text-blue-200">Note:</h3>
            <p className="dark:text-blue-100">
              Some HTML elements have no content (like the &lt;br&gt; element). These elements are called empty elements. Empty elements do not have an end tag!
            </p>
          </div>
        </section>

        {/* Basic HTML Page Structure */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">HTML Page Structure</h2>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-800 text-white px-4 py-2 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm">basic.html</span>
            </div>
            <pre className="p-4 overflow-x-auto">
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
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold mb-2 dark:text-white">Example Explained</h3>
              <ul className="space-y-2 text-sm dark:text-gray-300">
                <li>The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">!DOCTYPE html</code> declaration defines this document to be HTML5</li>
                <li>The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">html</code> element is the root element</li>
                <li>The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">head</code> element contains meta information</li>
                <li>The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">title</code> element specifies a title</li>
                <li>The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">body</code> element contains the visible content</li>
              </ul>
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
                    <td className="py-2"><code>&lt;html&gt;</code></td>
                    <td className="py-2">Defines the root of an HTML document</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="py-2"><code>&lt;head&gt;</code></td>
                    <td className="py-2">Contains metadata/information</td>
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="py-2"><code>&lt;body&gt;</code></td>
                    <td className="py-2">Defines the document's body</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>&lt;h1&gt;</code></td>
                    <td className="py-2">Defines a large heading</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Try It Yourself Section */}
        <section className="mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold mb-3 dark:text-green-200">Try it Yourself</h3>
            <p className="dark:text-green-100 mb-4">
              Edit the code below to see how HTML works:
            </p>
            
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-4">
              <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm">example.html</span>
                </div>
                <button className="text-xs bg-green-600 hover:bg-green-700 px-2 py-1 rounded">
                  Run &raquo;
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="language-html">
{`<!DOCTYPE html>
<html>
<body>

<h2>HTML Example</h2>
<p>Edit this code and click "Run"</p>

</body>
</html>`}
                </code>
              </pre>
            </div>
            
            <a 
              href="/html/tryit" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Try it Yourself &raquo;
            </a>
          </div>
        </section>

        {/* Next Steps */}
        <section className="border-t dark:border-gray-700 pt-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">What's Next?</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="dark:text-gray-300 mb-3">Now you know the basics of HTML. Continue learning:</p>
            <ul className="space-y-2">
              <li>
                <a href="/html/elements" className="text-blue-600 dark:text-blue-400 hover:underline">
                  HTML Elements &raquo;
                </a>
              </li>
              <li>
                <a href="/html/attributes" className="text-blue-600 dark:text-blue-400 hover:underline">
                  HTML Attributes &raquo;
                </a>
              </li>
              <li>
                <a href="/html/headings" className="text-blue-600 dark:text-blue-400 hover:underline">
                  HTML Headings &raquo;
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}