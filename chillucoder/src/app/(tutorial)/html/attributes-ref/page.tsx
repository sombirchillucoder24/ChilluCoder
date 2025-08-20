"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaSearch,
  FaTag,
  FaImage,
  FaLink,
  FaFileAlt,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function HtmlAttributesReference() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    global: true,
    form: true,
    media: true,
    meta: true,
    scripting: true,
    events: true,
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

  const attributeCategories = [
    {
      title: "Global Attributes",
      icon: <FaTag className="text-blue-500" />,
      expanded: expandedSections.global,
      items: [
        { 
          attribute: "class", 
          description: "Specifies one or more class names for an element", 
          example: '<div class="container main">',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "id", 
          description: "Specifies a unique id for an element", 
          example: '<section id="main-content">',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "style", 
          description: "Specifies inline CSS styles for an element", 
          example: '<p style="color: red;">',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "title", 
          description: "Specifies extra information about an element (shown as tooltip)", 
          example: '<a href="#" title="More info">',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "data-*", 
          description: "Used to store custom data private to the page", 
          example: '<div data-user-id="1234">',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "hidden", 
          description: "Specifies that an element is not yet relevant", 
          example: '<div hidden>Content</div>',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "lang", 
          description: "Specifies the language of the element's content", 
          example: '<p lang="fr">Bonjour</p>',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "dir", 
          description: "Specifies the text direction (ltr/rtl)", 
          example: '<p dir="rtl">Text right-to-left</p>',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "contenteditable", 
          description: "Specifies whether the content is editable", 
          example: '<div contenteditable="true">',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "draggable", 
          description: "Specifies whether an element is draggable", 
          example: '<div draggable="true">',
          appliesTo: "All HTML elements"
        },
        { 
          attribute: "spellcheck", 
          description: "Specifies whether the element is to have its spelling checked", 
          example: '<textarea spellcheck="true">',
          appliesTo: "Editable elements"
        },
        { 
          attribute: "tabindex", 
          description: "Specifies the tabbing order of an element", 
          example: '<button tabindex="1">',
          appliesTo: "All HTML elements"
        },
      ],
    },
    {
      title: "Form Attributes",
      icon: <FaFileAlt className="text-blue-500" />,
      expanded: expandedSections.form,
      items: [
        { 
          attribute: "action", 
          description: "Specifies where to send the form-data when a form is submitted", 
          example: '<form action="/submit.php">',
          appliesTo: "<form>"
        },
        { 
          attribute: "method", 
          description: "Specifies the HTTP method to use when sending form-data", 
          example: '<form method="post">',
          appliesTo: "<form>"
        },
        { 
          attribute: "name", 
          description: "Specifies the name of an input element", 
          example: '<input name="username">',
          appliesTo: "Form elements"
        },
        { 
          attribute: "value", 
          description: "Specifies the value of an input element", 
          example: '<input value="default">',
          appliesTo: "Form elements"
        },
        { 
          attribute: "placeholder", 
          description: "Specifies a short hint that describes the expected value", 
          example: '<input placeholder="Enter email">',
          appliesTo: "<input>, <textarea>"
        },
        { 
          attribute: "required", 
          description: "Specifies that an input field must be filled out", 
          example: '<input required>',
          appliesTo: "Form elements"
        },
        { 
          attribute: "disabled", 
          description: "Specifies that an input element should be disabled", 
          example: '<input disabled>',
          appliesTo: "Form elements"
        },
        { 
          attribute: "readonly", 
          description: "Specifies that an input field is read-only", 
          example: '<input readonly>',
          appliesTo: "Form elements"
        },
        { 
          attribute: "autocomplete", 
          description: "Specifies whether a form should have autocomplete on or off", 
          example: '<form autocomplete="off">',
          appliesTo: "<form>, <input>"
        },
        { 
          attribute: "autofocus", 
          description: "Specifies that an input element should automatically get focus", 
          example: '<input autofocus>',
          appliesTo: "Form elements"
        },
        { 
          attribute: "form", 
          description: "Specifies the form the element belongs to", 
          example: '<input form="form1">',
          appliesTo: "Form elements"
        },
        { 
          attribute: "novalidate", 
          description: "Specifies that the form should not be validated", 
          example: '<form novalidate>',
          appliesTo: "<form>"
        },
        { 
          attribute: "pattern", 
          description: "Specifies a regular expression to validate input", 
          example: '<input pattern="[A-Za-z]{3}">',
          appliesTo: "<input>"
        },
        { 
          attribute: "min/max", 
          description: "Specifies the minimum/maximum value for an input", 
          example: '<input type="number" min="1" max="10">',
          appliesTo: "<input>"
        },
        { 
          attribute: "step", 
          description: "Specifies the legal number intervals for an input", 
          example: '<input type="number" step="2">',
          appliesTo: "<input>"
        },
        { 
          attribute: "multiple", 
          description: "Specifies that multiple values can be entered", 
          example: '<input type="file" multiple>',
          appliesTo: "<input>, <select>"
        },
        { 
          attribute: "selected", 
          description: "Specifies that an option should be pre-selected", 
          example: '<option selected>Option</option>',
          appliesTo: "<option>"
        },
        { 
          attribute: "checked", 
          description: "Specifies that an input element should be pre-selected", 
          example: '<input type="checkbox" checked>',
          appliesTo: "<input>"
        },
      ],
    },
    {
      title: "Media Attributes",
      icon: <FaImage className="text-blue-500" />,
      expanded: expandedSections.media,
      items: [
        { 
          attribute: "src", 
          description: "Specifies the URL of the media file", 
          example: '<img src="image.jpg">',
          appliesTo: "<img>, <audio>, <video>, <script>, <iframe>"
        },
        { 
          attribute: "alt", 
          description: "Specifies an alternate text for images", 
          example: '<img src="logo.jpg" alt="Company Logo">',
          appliesTo: "<img>, <area>"
        },
        { 
          attribute: "width/height", 
          description: "Specifies the width/height of an element", 
          example: '<img width="200" height="100">',
          appliesTo: "<img>, <canvas>, <iframe>, <svg>"
        },
        { 
          attribute: "poster", 
          description: "Specifies an image to show while video is downloading", 
          example: '<video poster="preview.jpg">',
          appliesTo: "<video>"
        },
        { 
          attribute: "controls", 
          description: "Specifies that media controls should be displayed", 
          example: '<video controls>',
          appliesTo: "<audio>, <video>"
        },
        { 
          attribute: "autoplay", 
          description: "Specifies that media will start playing automatically", 
          example: '<video autoplay>',
          appliesTo: "<audio>, <video>"
        },
        { 
          attribute: "loop", 
          description: "Specifies that media will start over when finished", 
          example: '<audio loop>',
          appliesTo: "<audio>, <video>"
        },
        { 
          attribute: "muted", 
          description: "Specifies that audio output should be muted", 
          example: '<video muted>',
          appliesTo: "<audio>, <video>"
        },
        { 
          attribute: "preload", 
          description: "Specifies how media should be loaded", 
          example: '<video preload="auto">',
          appliesTo: "<audio>, <video>"
        },
        { 
          attribute: "playsinline", 
          description: "Specifies video should play inline on mobile", 
          example: '<video playsinline>',
          appliesTo: "<video>"
        },
        { 
          attribute: "srcset", 
          description: "Specifies multiple image resources for different scenarios", 
          example: '<img srcset="small.jpg 500w, large.jpg 1000w">',
          appliesTo: "<img>, <source>"
        },
        { 
          attribute: "sizes", 
          description: "Specifies image sizes for different page layouts", 
          example: '<img sizes="(max-width: 600px) 200px, 50vw">',
          appliesTo: "<img>"
        },
      ],
    },
    {
      title: "Meta & Link Attributes",
      icon: <FaLink className="text-blue-500" />,
      expanded: expandedSections.meta,
      items: [
        { 
          attribute: "charset", 
          description: "Specifies the character encoding", 
          example: '<meta charset="UTF-8">',
          appliesTo: "<meta>"
        },
        { 
          attribute: "name", 
          description: "Specifies a name for metadata", 
          example: '<meta name="description">',
          appliesTo: "<meta>"
        },
        { 
          attribute: "content", 
          description: "Specifies the value associated with http-equiv or name", 
          example: '<meta name="viewport" content="width=device-width">',
          appliesTo: "<meta>"
        },
        { 
          attribute: "http-equiv", 
          description: "Provides an HTTP header for information", 
          example: '<meta http-equiv="refresh">',
          appliesTo: "<meta>"
        },
        { 
          attribute: "rel", 
          description: "Specifies relationship between documents", 
          example: '<link rel="stylesheet">',
          appliesTo: "<link>, <a>, <area>"
        },
        { 
          attribute: "href", 
          description: "Specifies the URL of the linked resource", 
          example: '<link href="styles.css">',
          appliesTo: "<link>, <a>, <area>, <base>"
        },
        { 
          attribute: "target", 
          description: "Specifies where to open the linked document", 
          example: '<a target="_blank">',
          appliesTo: "<a>, <area>, <base>, <form>"
        },
        { 
          attribute: "download", 
          description: "Specifies that the target will be downloaded", 
          example: '<a download="filename">',
          appliesTo: "<a>, <area>"
        },
        { 
          attribute: "media", 
          description: "Specifies what media the resource applies to", 
          example: '<link media="print">',
          appliesTo: "<link>, <source>, <style>"
        },
        { 
          attribute: "type", 
          description: "Specifies the media type of the linked resource", 
          example: '<link type="text/css">',
          appliesTo: "<link>, <script>, <style>, <a>, <embed>, <object>, <source>"
        },
        { 
          attribute: "integrity", 
          description: "Allows a browser to check fetched resource", 
          example: '<script integrity="sha384...">',
          appliesTo: "<link>, <script>"
        },
        { 
          attribute: "crossorigin", 
          description: "Configures CORS requests for the element", 
          example: '<img crossorigin="anonymous">',
          appliesTo: "<img>, <audio>, <video>, <link>, <script>"
        },
      ],
    },
    {
      title: "Scripting Attributes",
      icon: <FaCode className="text-blue-500" />,
      expanded: expandedSections.scripting,
      items: [
        { 
          attribute: "async", 
          description: "Specifies script should execute asynchronously", 
          example: '<script async>',
          appliesTo: "<script>"
        },
        { 
          attribute: "defer", 
          description: "Specifies script should execute after page parsing", 
          example: '<script defer>',
          appliesTo: "<script>"
        },
        { 
          attribute: "onload", 
          description: "Script to run when element is loaded", 
          example: '<img onload="myFunction()">',
          appliesTo: "All elements"
        },
        { 
          attribute: "onerror", 
          description: "Script to run when error occurs", 
          example: '<img onerror="handleError()">',
          appliesTo: "All elements"
        },
        { 
          attribute: "onabort", 
          description: "Script to run when loading is aborted", 
          example: '<img onabort="handleAbort()">',
          appliesTo: "<img>, <object>"
        },
      ],
    },
    {
      title: "Event Attributes",
      icon: <FaPlay className="text-blue-500" />,
      expanded: expandedSections.events,
      items: [
        { 
          attribute: "onclick", 
          description: "Script to run on mouse click", 
          example: '<button onclick="myFunction()">',
          appliesTo: "All elements"
        },
        { 
          attribute: "ondblclick", 
          description: "Script to run on mouse double-click", 
          example: '<div ondblclick="myFunction()">',
          appliesTo: "All elements"
        },
        { 
          attribute: "onmouseover", 
          description: "Script to run when mouse pointer moves over element", 
          example: '<div onmouseover="myFunction()">',
          appliesTo: "All elements"
        },
        { 
          attribute: "onmouseout", 
          description: "Script to run when mouse pointer moves out of element", 
          example: '<div onmouseout="myFunction()">',
          appliesTo: "All elements"
        },
        { 
          attribute: "onkeydown", 
          description: "Script to run when key is pressed down", 
          example: '<input onkeydown="myFunction()">',
          appliesTo: "All elements"
        },
        { 
          attribute: "onkeyup", 
          description: "Script to run when key is released", 
          example: '<input onkeyup="myFunction()">',
          appliesTo: "All elements"
        },
        { 
          attribute: "onchange", 
          description: "Script to run when value changes", 
          example: '<input onchange="myFunction()">',
          appliesTo: "Form elements"
        },
        { 
          attribute: "onsubmit", 
          description: "Script to run when form is submitted", 
          example: '<form onsubmit="myFunction()">',
          appliesTo: "<form>"
        },
        { 
          attribute: "onreset", 
          description: "Script to run when form is reset", 
          example: '<form onreset="myFunction()">',
          appliesTo: "<form>"
        },
        { 
          attribute: "onfocus", 
          description: "Script to run when element gets focus", 
          example: '<input onfocus="myFunction()">',
          appliesTo: "Form elements"
        },
        { 
          attribute: "onblur", 
          description: "Script to run when element loses focus", 
          example: '<input onblur="myFunction()">',
          appliesTo: "Form elements"
        },
        { 
          attribute: "onselect", 
          description: "Script to run when text is selected", 
          example: '<input onselect="myFunction()">',
          appliesTo: "<input>, <textarea>"
        },
      ],
    },
  ];

  const filteredCategories = attributeCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.attribute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div>
      <Head>
        <title>HTML Attributes Reference | Complete List with Examples</title>
        <meta
          name="description"
          content="Complete reference of all HTML attributes with examples and usage. Learn about global, form, media, and event attributes for HTML elements."
        />
        <meta
          name="keywords"
          content="HTML attributes, HTML reference, HTML elements, HTML syntax, HTML examples, web development"
        />
        <meta name="author" content="Your Name" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mb-2">
          HTML Attributes Reference
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Complete list of HTML attributes with examples
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          About HTML Attributes
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML attributes provide additional information about HTML elements. They 
          are always specified in the start tag and usually come in name/value pairs. 
          This reference covers standard HTML5 attributes with examples and usage information.
        </p>
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FaTag className="text-blue-500" />
            <span>Global Attributes</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFileAlt className="text-blue-500" />
            <span>Form Attributes</span>
          </div>
          <div className="flex items-center gap-2">
            <FaImage className="text-blue-500" />
            <span>Media Attributes</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPlay className="text-blue-500" />
            <span>Event Attributes</span>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Attributes Example</title>
  <style>
    .highlight { background-color: yellow; }
    #main { max-width: 800px; margin: 0 auto; }
  </style>
</head>
<body>
  <header>
    <h1 title="Main page header">HTML Attributes Demo</h1>
    <nav>
      <a href="#home" target="_blank" title="Home page">Home</a>
      <a href="#about" download="about.html">About</a>
    </nav>
  </header>
  
  <main id="main">
    <form action="/submit" method="post" autocomplete="off">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required placeholder="Enter your name">
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" pattern=".+@.+\..+" title="Enter valid email">
      
      <button type="submit" onclick="alert('Submitted!')">Submit</button>
    </form>
    
    <img src="example.jpg" alt="Example image" width="400" height="300" loading="lazy">
    
    <video controls width="600">
      <source src="movie.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </main>
  
  <footer>
    <p class="highlight" contenteditable="true">Edit this footer text</p>
  </footer>
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
            placeholder="Search attributes (name or description)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Attribute Categories */}
      {filteredCategories.map((category, index) => (
        <section key={index} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {category.icon}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Attribute</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applies To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 font-mono">{item.attribute}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{item.example}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.appliesTo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => copyToClipboard(item.example, item.attribute)}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                        >
                          {copied === item.attribute ? (
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
          HTML Attribute Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always use quotes around attribute values</li>
              <li>Use semantic attributes like alt for images</li>
              <li>Include required attributes for form elements</li>
              <li>Use data-* attributes for custom data storage</li>
              <li>Specify width and height for images to prevent layout shifts</li>
              <li>Use appropriate input types and attributes for forms</li>
              <li>Validate your HTML attributes</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t use deprecated attributes (like align or bgcolor)</li>
              <li>Avoid inline styles when possible (use CSS classes)</li>
              <li>Don&apos;t skip required attributes</li>
              <li>Avoid using the same ID for multiple elements</li>
              <li>Don&apos;t use event attributes for complex logic (use JavaScript instead)</li>
              <li>Avoid unnecessary attributes</li>
              <li>Don&apos;t forget accessibility attributes (alt, aria-*)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our HTML Attributes Editor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Experiment with HTML attributes in our interactive editor:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test different HTML attributes</li>
              <li>See how attributes affect elements in real-time</li>
              <li>Practice form validation with attributes</li>
              <li>Experiment with media attributes</li>
            </ul>
            <button
              onClick={() => {
                const attributesExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Attributes Playground</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    .box { border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; }
    input[type="text"] { width: 100%; padding: 8px; margin: 5px 0; }
    button { padding: 8px 16px; background: #4CAF50; color: white; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <header>
    <h1 title="Playground Header">HTML Attributes Playground</h1>
    <nav>
      <a href="#section1" target="_self">Section 1</a> |
      <a href="#section2" target="_blank">Section 2 (new tab)</a>
    </nav>
  </header>
  
  <main>
    <section id="section1" class="box">
      <h2>Form Attributes</h2>
      <form action="#" method="get" autocomplete="on" novalidate>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required placeholder="Enter username" minlength="3" maxlength="20">
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" pattern=".+@.+\..+" title="Enter valid email">
        
        <button type="submit" onclick="alert('Form submitted!')">Submit</button>
      </form>
    </section>
    
    <section id="section2" class="box" contenteditable="true">
      <h2>Editable Section</h2>
      <p>Try editing this content (it's editable because of contenteditable="true")</p>
    </section>
    
    <section class="box">
      <h2>Media Attributes</h2>
      <img src="https://via.placeholder.com/400x200" alt="Placeholder image" width="400" height="200" loading="lazy">
      
      <video controls width="400" muted>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        Your browser does not support HTML video.
      </video>
    </section>
  </main>
  
  <footer>
    <p data-author="web-dev" data-created="2023">Created with HTML attributes</p>
  </footer>
</body>
</html>`;
                localStorage.setItem("html-code", attributesExample);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch Attributes Editor
            </button>
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
  <title>Example</title>
</head>
<body>
  <!-- Form with attributes -->
  <form action="/submit" method="post">
    <input type="text" name="username" required placeholder="Username">
    <button type="submit">Submit</button>
  </form>
  
  <!-- Image with attributes -->
  <img src="image.jpg" alt="Description" width="400" height="300">
  
  <!-- Custom data attribute -->
  <div data-user-id="1234">User content</div>
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
          href="/html/tags-ref"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (HTML Tags Reference)
        </Link>
        <Link
          href="/html/forms"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (HTML Forms) &gt;
        </Link>
      </section>
    </div>
  );
}