"use client";

import { FaInfoCircle, FaCode, FaCopy, FaCheck, FaChevronDown, FaPlay, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLAttributesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    core: true,
    global: true,
    element: true,
    examples: true,
    reference: true
  });
  const router = useRouter();

const handleOpenEditor = () => {
    const staticHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Examples</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
    .example { margin-bottom: 30px; border-left: 4px solid #3b82f6; padding-left: 15px; }
    h2 { color: #3b82f6; margin-top: 40px; }
    .container { max-width: 800px; margin: 0 auto; }
    .example-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px; margin: 20px 0; }
    .example-item { padding: 15px; border: 1px solid #e2e8f0; border-radius: 8px; background: white; }
    h3 { margin-top: 0; color: #4f46e5; }
    .btn { display: inline-block; padding: 8px 16px; background: #3b82f6; color: white; border-radius: 4px; text-decoration: none; margin: 5px 0; }
    .btn:hover { background: #2563eb; }
  </style>
</head>
<body>
  <div class="container">
    <h1>HTML Attributes Examples</h1>
    
    <div class="example">
      <h2>Global Attributes</h2>
      <div class="example-grid">
        <div class="example-item">
          <h3>accesskey</h3>
          <button accesskey="s" class="btn">Save (Press Alt+S)</button>
          <p>Shortcut key to activate/focus</p>
        </div>
        <div class="example-item">
          <h3>contenteditable</h3>
          <p contenteditable="true">Click to edit this text</p>
        </div>
        <div class="example-item">
          <h3>data-*</h3>
          <div data-user-id="123" data-role="admin">User Data Element</div>
        </div>
        <div class="example-item">
          <h3>hidden</h3>
          <div hidden>This content is hidden</div>
          <button onclick="this.previousElementSibling.hidden = !this.previousElementSibling.hidden">Toggle Visibility</button>
        </div>
      </div>
    </div>

    <div class="example">
      <h2>Core Attributes</h2>
      <div class="example-grid">
        <div class="example-item">
          <h3>id</h3>
          <div id="header-example">Page Header</div>
        </div>
        <div class="example-item">
          <h3>class</h3>
          <p class="text large blue">Styled paragraph</p>
        </div>
        <div class="example-item">
          <h3>style</h3>
          <div style="color: blue; font-weight: bold;">Inline styled div</div>
        </div>
        <div class="example-item">
          <h3>title</h3>
          <abbr title="HyperText Markup Language">HTML</abbr>
          <p>Hover over the abbreviation</p>
        </div>
      </div>
    </div>

    <div class="example">
      <h2>Element-Specific Attributes</h2>
      <div class="example-grid">
        <div class="example-item">
          <h3>Anchor Tags</h3>
          <a href="#link" class="btn" target="_blank" rel="noopener">Example Link</a>
          <p>target="_blank" rel="noopener"</p>
        </div>
        <div class="example-item">
          <h3>Images</h3>
          <img src="https://via.placeholder.com/150" alt="Placeholder" width="150">
          <p>alt text is required</p>
        </div>
        <div class="example-item">
          <h3>Inputs</h3>
          <input type="email" placeholder="Enter email" required>
          <p>type="email" required</p>
        </div>
      </div>
    </div>

    <div class="example">
      <h2>Complete Examples</h2>
      <div class="example-item">
        <h3>Contact Form</h3>
        <form id="contact-form-example" onsubmit="alert('Form submitted!'); return false;">
          <input type="text" name="name" placeholder="Your name" required><br>
          <input type="email" name="email" placeholder="Your email" required><br>
          <textarea name="message" placeholder="Your message"></textarea><br>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  </div>

  <script>
    // Simple interactive examples
    document.addEventListener('DOMContentLoaded', function() {
      // Make all example items interactive
      document.querySelectorAll('.example-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
          this.style.boxShadow = this.style.boxShadow ? '' : '0 0 0 2px #3b82f6';
        });
      });
    });
  </script>
</body>
</html>`;

    try {
      localStorage.setItem('html-code', staticHtmlContent);
      router.push('/compilers/html-editor');
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

 const htmlGlobalAttributes = [
  {
    attribute: "accesskey",
    description: "Allows users to press a specific keyboard key (like Alt + S) to quickly focus or activate this element. It's like a shortcut for better accessibility.",
    example: `<button accesskey="s">Save</button>`
  },
  {
    attribute: "class",
    description: "Lets you assign one or more names to an element. These names can be used in CSS to style the element or in JavaScript to select it.",
    example: `<div class="card highlight"></div>`
  },
  {
    attribute: "contenteditable",
    description: "Turns any element into something you can edit directly on the webpage—just like a text field. Great for custom editors or notes.",
    example: `<p contenteditable="true">Edit me</p>`
  },
  {
    attribute: "data-*",
    description: "Lets you store custom data in any element using attributes like `data-user-id`. You can later access these values using JavaScript.",
    example: `<div data-user-id="123"></div>`
  },
  {
    attribute: "dir",
    description: "Controls the text direction. Use 'ltr' for left-to-right (like English), and 'rtl' for right-to-left (like Arabic or Hebrew).",
    example: `<p dir="rtl">مرحبا</p>`
  },
  {
    attribute: "draggable",
    description: "Allows the user to drag the element with a mouse or touch. Set it to 'true' or 'false'. Often used in drag-and-drop interfaces.",
    example: `<img draggable="false" src="image.jpg">`
  },
  {
    attribute: "enterkeyhint",
    description: "Suggests what the Enter key should say or do on mobile keyboards (like 'send', 'search', etc.). Improves user experience on mobile.",
    example: `<textarea enterkeyhint="send"></textarea>`
  },
  {
    attribute: "hidden",
    description: "Makes the element invisible to users, but it still exists in the HTML. Can be shown later using JavaScript.",
    example: `<div hidden>This is hidden</div>`
  },
  {
    attribute: "id",
    description: "Gives a unique name to the element. Useful for linking, JavaScript targeting, or CSS styling. Only one element should use the same ID.",
    example: `<section id="intro"></section>`
  },
  {
    attribute: "inert",
    description: "Disables all interactions with the element and its children (clicks, focus, etc.). The user can't interact with it at all.",
    example: `<div inert>This section is disabled</div>`
  },
  {
    attribute: "inputmode",
    description: "Tells mobile keyboards what kind of keyboard to show (numeric, email, etc.). Helps users type the right input.",
    example: `<input inputmode="numeric">`
  },
  {
    attribute: "lang",
    description: "Defines the language of the content in the element. Helps search engines and screen readers understand the language.",
    example: `<html lang="en">`
  },
  {
    attribute: "popover",
    description: "Connects a button to a popover element that shows more info when clicked. Works with the new Popover API.",
    example: `<button popover="infoBox">More Info</button>`
  },
  {
    attribute: "spellcheck",
    description: "Tells the browser whether to check spelling in the element (usually text inputs or contenteditable areas).",
    example: `<textarea spellcheck="false"></textarea>`
  },
  {
    attribute: "style",
    description: "Applies custom CSS styles directly to the element. Use carefully—it's better to use CSS files when possible.",
    example: `<p style="color: red;">Warning</p>`
  },
  {
    attribute: "tabindex",
    description: "Sets the order in which users can move through elements using the Tab key. Great for keyboard navigation.",
    example: `<div tabindex="0">I can be tabbed</div>`
  },
  {
    attribute: "title",
    description: "Adds a tooltip (a small popup) that appears when you hover your mouse over the element.",
    example: `<abbr title="World Health Organization">WHO</abbr>`
  },
  {
    attribute: "translate",
    description: "Tells the browser whether to translate the content (useful for things like brand names or technical terms).",
    example: `<p translate="no">ReactJS</p>`
  }
];


  const coreAttributes = [
    { 
      name: "id", 
      description: "Unique identifier for an element",
      example: `<div id="header">`,
      usage: "Single use per page"
    },
    { 
      name: "class", 
      description: "Space-separated list of class names",
      example: `<p class="text large">`,
      usage: "Reusable across elements"
    },
    { 
      name: "style", 
      description: "Inline CSS styling",
      example: `<div style="color: red;">`,
      usage: "Avoid for maintainability"
    },
    { 
      name: "title", 
      description: "Additional information (tooltip)",
      example: `<abbr title="HyperText Markup Language">HTML</abbr>`,
      usage: "Accessibility enhancement"
    }
  ];

  const globalAttributes = [
    { 
      name: "data-*", 
      description: "Custom data attributes for JavaScript",
      example: `<div data-user-id="123"></div>`
    },
    { 
      name: "aria-*", 
      description: "Accessibility attributes",
      example: `<button aria-label="Close">X</button>`
    },
    { 
      name: "hidden", 
      description: "Hides element from display",
      example: `<div hidden>Not visible</div>`
    },
    { 
      name: "tabindex", 
      description: "Controls keyboard navigation",
      example: `<div tabindex="0">Focusable</div>`
    },
    { 
      name: "contenteditable", 
      description: "Makes element editable",
      example: `<div contenteditable="true">Edit me</div>`
    }
  ];

  const elementSpecificAttributes = [
    {
      element: "<a>",
      attributes: [
        { 
          name: "href", 
          description: "URL of the link",
          example: `<a href="https://example.com">Link</a>`
        },
        { 
          name: "target", 
          description: "Where to open (_blank, _self)",
          example: `<a href="/about" target="_blank">About</a>`
        },
        { 
          name: "rel", 
          description: "Relationship (nofollow, etc.)",
          example: `<a href="https://external.com" rel="nofollow">External</a>`
        }
      ]
    },
    {
      element: "<img>",
      attributes: [
        { 
          name: "src", 
          description: "Image source URL",
          example: `<img src="photo.jpg" alt="A photo">`
        },
        { 
          name: "alt", 
          description: "Alternative text (required)",
          example: `<img src="logo.png" alt="Company Logo">`
        },
        { 
          name: "width/height", 
          description: "Dimensions in pixels",
          example: `<img src="icon.png" width="32" height="32">`
        }
      ]
    },
    {
      element: "<input>",
      attributes: [
        { 
          name: "type", 
          description: "Input type (text, email, etc.)",
          example: `<input type="email" name="email">`
        },
        { 
          name: "placeholder", 
          description: "Hint text",
          example: `<input placeholder="Enter your name">`
        },
        { 
          name: "required", 
          description: "Makes field mandatory",
          example: `<input type="text" required>`
        }
      ]
    }
  ];

  const exampleSnippets = [
    {
      title: "Basic Attributes",
      code: `<div id="app" class="container" title="Main Application">
  <a href="/about" target="_blank" rel="noopener">About Us</a>
</div>`
    },
    {
      title: "Form with Attributes",
      code: `<form id="contact-form">
  <input type="email" name="email" placeholder="Your email" required>
  <button type="submit" disabled>Submit</button>
</form>`
    },
    {
      title: "Accessibility Attributes",
      code: `<nav aria-label="Main navigation">
  <button aria-expanded="false" aria-controls="dropdown">
    Menu
  </button>
  <ul id="dropdown" hidden>
    <li><a href="/">Home</a></li>
  </ul>
</nav>`
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Attributes Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Comprehensive reference for all HTML attributes
        </p>
      </header>

      {/* Global Attributes Reference */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('reference')}
          aria-expanded={expandedSections['reference']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Global Attributes Reference
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['reference'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['reference'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {htmlGlobalAttributes.map((attr, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-sm md:text-base">
                      <span className="text-purple-600 dark:text-purple-400">{attr.attribute}</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{attr.description}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(attr.example, attr.attribute);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Copy example for ${attr.attribute}`}
                  >
                    {copied === attr.attribute ? (
                      <FaCheck className="text-green-500 text-sm" />
                    ) : (
                      <FaCopy className="text-sm" />
                    )}
                  </button>
                </div>
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs md:text-sm">
                  <code>{attr.example}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Core Attributes Section */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('core')}
          aria-expanded={expandedSections['core']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaInfoCircle className="text-blue-500" />
            Core Attributes
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['core'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['core'] && (
          <div className="grid md:grid-cols-2 gap-4">
            {coreAttributes.map((attr, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-mono font-bold text-lg mb-1">{attr.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{attr.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Usage: {attr.usage}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(attr.example, attr.name);
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Copy example for ${attr.name}`}
                  >
                    {copied === attr.name ? (
                      <FaCheck className="text-green-500 text-sm" />
                    ) : (
                      <FaCopy className="text-sm" />
                    )}
                  </button>
                </div>
                <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                  <code>{attr.example}</code>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Element-Specific Attributes */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('element')}
          aria-expanded={expandedSections['element']}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-green-500" />
            Element-Specific Attributes
          </h2>
          <FaChevronDown className={`transition-transform ${expandedSections['element'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['element'] && (
          <div className="space-y-6">
            {elementSpecificAttributes.map((element, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-mono font-bold text-xl mb-3">{element.element}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {element.attributes.map((attr, attrIndex) => (
                    <div key={attrIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-mono font-bold">{attr.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{attr.description}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(attr.example, `${element.element}-${attr.name}`);
                          }}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          aria-label={`Copy example for ${attr.name}`}
                        >
                          {copied === `${element.element}-${attr.name}` ? (
                            <FaCheck className="text-green-500 text-sm" />
                          ) : (
                            <FaCopy className="text-sm" />
                          )}
                        </button>
                      </div>
                      <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded text-xs">
                        <code>{attr.example}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Example Snippets */}
      <section className="mb-12">
        <button 
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection('examples')}
          aria-expanded={expandedSections['examples']}
        >
          <h2 className="text-2xl font-bold">Practical Examples</h2>
          <FaChevronDown className={`transition-transform ${expandedSections['examples'] ? 'rotate-180' : ''}`} />
        </button>

        {expandedSections['examples'] && (
          <div className="space-y-4">
            {exampleSnippets.map((example, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-medium">{example.title}</h3>
                  <button
                    onClick={() => copyToClipboard(example.code, example.title)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1 text-sm px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label={`Copy ${example.title} code`}
                  >
                    {copied === example.title ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy
                      </>
                    )}
                  </button>
                </div>
                <CodeEditor
                  value={example.code}
                  language="html"
                  padding={12}
                  style={{
                    fontSize: 13,
                    backgroundColor: "#f8fafc",
                    fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
                  }}
                  className="dark:bg-gray-900 dark:text-gray-200"
                  readOnly
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* // Add this new section just before the "Next Steps" section */}
<section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              Interactive HTML Playground
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore and experiment with all HTML examples in our live editor
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                HTML Examples Preview
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Ready-to-use examples covering all attribute types
              </p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              Live Preview
            </span>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Global Attributes
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {htmlGlobalAttributes.slice(0, 4).map((attr) => (
                  <div key={attr.attribute} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600">
                    <code className="text-sm font-mono text-purple-600 dark:text-purple-400">{attr.attribute}</code>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{attr.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Element-Specific Examples
              </h4>
              <div className="flex flex-wrap gap-2">
                {elementSpecificAttributes.map((el) => (
                  <span key={el.element} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {el.element}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={handleOpenEditor}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaPlay className="mr-2" />
                Open in Live Editor
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All examples will be loaded into an interactive editor where you can modify and test them
          </p>
        </div>
      </div>
    </section>
    

      
<section className="mt-8">
  <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <Link
      href="/html/elements"
      className="border border-blue-200 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
    >
      <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
        <FaArrowLeft className="text-blue-500" />
        HTML Elements
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">Learn about the building blocks of HTML.</p>
    </Link>

    <Link
      href="/html/headings"
      className="border border-green-200 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg hover:shadow-md transition-shadow flex flex-col"
    >
      <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
        Html Headings
        <FaArrowRight className="text-green-500" />
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">Understand the importance of heading tags.</p>
    </Link>
  </div>
</section>
    </div>
  );
}