"use client";

import {
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaSearch,
  FaTag,
  FaHeading,
  FaParagraph,
  FaList,
  FaTable,
  FaImage,
  FaLink,
  FaFileAlt,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function HtmlTagsReference() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    text: true,
    media: true,
    lists: true,
    tables: true,
    forms: true,
    semantic: true,
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

  const tagCategories = [
    {
      title: "Basic Structure Tags",
      icon: <FaTag className="text-blue-500" />,
      expanded: expandedSections.basics,
      items: [
        { 
          tag: "<!DOCTYPE>", 
          description: "Defines the document type and HTML version", 
          example: '<!DOCTYPE html>',
          attributes: "None"
        },
        { 
          tag: "<html>", 
          description: "Root element of an HTML page", 
          example: '<html lang="en">...</html>',
          attributes: "lang, xmlns"
        },
        { 
          tag: "<head>", 
          description: "Contains meta information about the document", 
          example: '<head><title>Page Title</title></head>',
          attributes: "None"
        },
        { 
          tag: "<title>", 
          description: "Specifies a title for the document", 
          example: '<title>My Page</title>',
          attributes: "None"
        },
        { 
          tag: "<body>", 
          description: "Contains the visible page content", 
          example: '<body>...</body>',
          attributes: "Various (onload, onunload, etc.)"
        },
        { 
          tag: "<div>", 
          description: "Defines a division or section", 
          example: '<div class="container">...</div>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<span>", 
          description: "Inline container for styling", 
          example: '<span class="highlight">text</span>',
          attributes: "class, id, style, etc."
        },
      ],
    },
    {
      title: "Text Formatting Tags",
      icon: <FaParagraph className="text-blue-500" />,
      expanded: expandedSections.text,
      items: [
        { 
          tag: "<h1> to <h6>", 
          description: "HTML headings", 
          example: '<h1>Main Heading</h1>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<p>", 
          description: "Defines a paragraph", 
          example: '<p>This is a paragraph.</p>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<br>", 
          description: "Inserts a single line break", 
          example: 'Line 1<br>Line 2',
          attributes: "None"
        },
        { 
          tag: "<hr>", 
          description: "Defines a thematic break", 
          example: '<hr>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<strong>", 
          description: "Important text (bold)", 
          example: '<strong>Important!</strong>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<em>", 
          description: "Emphasized text (italic)", 
          example: '<em>Emphasized</em>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<mark>", 
          description: "Marked/highlighted text", 
          example: '<mark>Highlighted</mark>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<small>", 
          description: "Smaller text", 
          example: '<small>Small text</small>',
          attributes: "class, id, style, etc."
        },
      ],
    },
    {
      title: "Media Tags",
      icon: <FaImage className="text-blue-500" />,
      expanded: expandedSections.media,
      items: [
        { 
          tag: "<img>", 
          description: "Embeds an image", 
          example: '<img src="image.jpg" alt="Description">',
          attributes: "src, alt, width, height, loading, etc."
        },
        { 
          tag: "<audio>", 
          description: "Embeds sound content", 
          example: '<audio controls><source src="audio.mp3"></audio>',
          attributes: "controls, autoplay, loop, muted, etc."
        },
        { 
          tag: "<video>", 
          description: "Embeds video content", 
          example: '<video controls width="250"><source src="video.mp4"></video>',
          attributes: "controls, autoplay, loop, muted, poster, etc."
        },
        { 
          tag: "<iframe>", 
          description: "Embeds another HTML page", 
          example: '<iframe src="page.html" title="Description"></iframe>',
          attributes: "src, title, width, height, allow, etc."
        },
        { 
          tag: "<picture>", 
          description: "Container for multiple image sources", 
          example: '<picture><source media="(min-width:650px)" srcset="large.jpg"><img src="small.jpg"></picture>',
          attributes: "None (contains <source> and <img>)"
        },
        { 
          tag: "<svg>", 
          description: "Container for SVG graphics", 
          example: '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"></svg>',
          attributes: "width, height, viewBox, etc."
        },
      ],
    },
    {
      title: "List Tags",
      icon: <FaList className="text-blue-500" />,
      expanded: expandedSections.lists,
      items: [
        { 
          tag: "<ul>", 
          description: "Defines an unordered list", 
          example: '<ul><li>Item 1</li><li>Item 2</li></ul>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<ol>", 
          description: "Defines an ordered list", 
          example: '<ol><li>First</li><li>Second</li></ol>',
          attributes: "reversed, start, type"
        },
        { 
          tag: "<li>", 
          description: "Defines a list item", 
          example: '<li>List item</li>',
          attributes: "value (for <ol>)"
        },
        { 
          tag: "<dl>", 
          description: "Defines a description list", 
          example: '<dl><dt>Term</dt><dd>Description</dd></dl>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<dt>", 
          description: "Defines a term in a description list", 
          example: '<dt>HTML</dt>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<dd>", 
          description: "Describes a term in a description list", 
          example: '<dd>HyperText Markup Language</dd>',
          attributes: "class, id, style, etc."
        },
      ],
    },
    {
      title: "Table Tags",
      icon: <FaTable className="text-blue-500" />,
      expanded: expandedSections.tables,
      items: [
        { 
          tag: "<table>", 
          description: "Defines a table", 
          example: '<table>...</table>',
          attributes: "border, cellpadding, cellspacing, etc."
        },
        { 
          tag: "<tr>", 
          description: "Defines a table row", 
          example: '<tr>...</tr>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<th>", 
          description: "Defines a table header cell", 
          example: '<th>Header</th>',
          attributes: "colspan, rowspan, scope, etc."
        },
        { 
          tag: "<td>", 
          description: "Defines a table cell", 
          example: '<td>Data</td>',
          attributes: "colspan, rowspan, headers, etc."
        },
        { 
          tag: "<caption>", 
          description: "Defines a table caption", 
          example: '<caption>Monthly Savings</caption>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<thead>", 
          description: "Groups header content in a table", 
          example: '<thead>...</thead>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<tbody>", 
          description: "Groups body content in a table", 
          example: '<tbody>...</tbody>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<tfoot>", 
          description: "Groups footer content in a table", 
          example: '<tfoot>...</tfoot>',
          attributes: "class, id, style, etc."
        },
      ],
    },
    {
      title: "Form Tags",
      icon: <FaFileAlt className="text-blue-500" />,
      expanded: expandedSections.forms,
      items: [
        { 
          tag: "<form>", 
          description: "Defines an HTML form", 
          example: '<form action="/submit" method="post">...</form>',
          attributes: "action, method, enctype, target, etc."
        },
        { 
          tag: "<input>", 
          description: "Defines an input control", 
          example: '<input type="text" name="username">',
          attributes: "type, name, value, placeholder, required, etc."
        },
        { 
          tag: "<textarea>", 
          description: "Defines a multiline input control", 
          example: '<textarea name="message" rows="4"></textarea>',
          attributes: "name, rows, cols, placeholder, etc."
        },
        { 
          tag: "<button>", 
          description: "Defines a clickable button", 
          example: '<button type="submit">Submit</button>',
          attributes: "type, name, value, disabled, etc."
        },
        { 
          tag: "<select>", 
          description: "Defines a drop-down list", 
          example: '<select name="colors"><option value="red">Red</option></select>',
          attributes: "name, multiple, required, etc."
        },
        { 
          tag: "<option>", 
          description: "Defines an option in a drop-down list", 
          example: '<option value="green">Green</option>',
          attributes: "value, selected, disabled, etc."
        },
        { 
          tag: "<label>", 
          description: "Defines a label for an input element", 
          example: '<label for="name">Name:</label>',
          attributes: "for"
        },
        { 
          tag: "<fieldset>", 
          description: "Groups related elements in a form", 
          example: '<fieldset><legend>Personal Info</legend>...</fieldset>',
          attributes: "disabled, form, name"
        },
        { 
          tag: "<legend>", 
          description: "Defines a caption for a fieldset", 
          example: '<legend>Contact Details</legend>',
          attributes: "None"
        },
      ],
    },
    {
      title: "Semantic Tags",
      icon: <FaHeading className="text-blue-500" />,
      expanded: expandedSections.semantic,
      items: [
        { 
          tag: "<header>", 
          description: "Defines a header for a document or section", 
          example: '<header><h1>Page Title</h1></header>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<nav>", 
          description: "Defines navigation links", 
          example: '<nav><a href="/">Home</a></nav>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<main>", 
          description: "Specifies the main content of a document", 
          example: '<main>...</main>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<section>", 
          description: "Defines a section in a document", 
          example: '<section><h2>Chapter 1</h2></section>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<article>", 
          description: "Defines independent, self-contained content", 
          example: '<article><h2>Blog Post</h2></article>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<aside>", 
          description: "Defines content aside from the page content", 
          example: '<aside><p>Related content</p></aside>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<footer>", 
          description: "Defines a footer for a document or section", 
          example: '<footer><p>Copyright</p></footer>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<figure>", 
          description: "Specifies self-contained content", 
          example: '<figure><img src="image.jpg"><figcaption>Caption</figcaption></figure>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<figcaption>", 
          description: "Defines a caption for a figure element", 
          example: '<figcaption>Image description</figcaption>',
          attributes: "class, id, style, etc."
        },
        { 
          tag: "<time>", 
          description: "Defines a date/time", 
          example: '<time datetime="2023-01-01">New Year</time>',
          attributes: "datetime"
        },
      ],
    },
    {
      title: "Link & Scripting Tags",
      icon: <FaLink className="text-blue-500" />,
      expanded: expandedSections.basics,
      items: [
        { 
          tag: "<a>", 
          description: "Defines a hyperlink", 
          example: '<a href="https://example.com">Link</a>',
          attributes: "href, target, rel, download, etc."
        },
        { 
          tag: "<link>", 
          description: "Defines the relationship to an external resource", 
          example: '<link rel="stylesheet" href="styles.css">',
          attributes: "rel, href, type, media, etc."
        },
        { 
          tag: "<script>", 
          description: "Defines a client-side script", 
          example: '<script src="app.js"></script>',
          attributes: "src, async, defer, type, etc."
        },
        { 
          tag: "<style>", 
          description: "Defines style information for a document", 
          example: '<style>body { color: red; }</style>',
          attributes: "type, media, etc."
        },
        { 
          tag: "<meta>", 
          description: "Defines metadata about an HTML document", 
          example: '<meta charset="UTF-8">',
          attributes: "charset, name, content, http-equiv, etc."
        },
        { 
          tag: "<base>", 
          description: "Specifies the base URL/target for relative URLs", 
          example: '<base href="https://example.com/">',
          attributes: "href, target"
        },
      ],
    },
  ];

  const filteredCategories = tagCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div>
      <Head>
        <title>HTML Tags Reference | Complete List with Examples</title>
        <meta
          name="description"
          content="Complete reference of all HTML tags with examples and usage. Learn about structural, formatting, media, form, and semantic HTML tags."
        />
        <meta
          name="keywords"
          content="HTML tags, HTML reference, HTML elements, HTML syntax, HTML examples, web development"
        />
        <meta name="author" content="Your Name" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mb-2">
          HTML Tags Reference
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Complete list of HTML elements with examples
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          About HTML Tags
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML tags are the building blocks of web pages. They define the structure and content of a webpage, 
          telling browsers how to display text, images, and other media. This reference covers all standard 
          HTML5 tags with examples and usage information.
        </p>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FaTag className="text-blue-500" />
            <span>Structural Tags</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeading className="text-blue-500" />
            <span>Semantic Tags</span>
          </div>
          <div className="flex items-center gap-2">
            <FaFileAlt className="text-blue-500" />
            <span>Form Tags</span>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Tags Example</title>
</head>
<body>
  <header>
    <h1>Page Title</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <p>This is a paragraph with <strong>important</strong> text.</p>
      <img src="image.jpg" alt="Example image">
    </article>
    
    <aside>
      <h3>Related Links</h3>
      <ul>
        <li><a href="#link1">Link 1</a></li>
        <li><a href="#link2">Link 2</a></li>
      </ul>
    </aside>
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

      {/* Search */}
      <section className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search tags (name or description)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Tag Categories */}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tag</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Example</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Common Attributes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 font-mono">{item.tag}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{item.example}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{item.attributes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() => copyToClipboard(item.example, item.tag)}
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                        >
                          {copied === item.tag ? (
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
          HTML Tag Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Do&apos;s:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use semantic HTML5 tags when possible</li>
              <li>Close all tags properly (even self-closing tags in XHTML)</li>
              <li>Use lowercase for tag names and attributes</li>
              <li>Quote all attribute values</li>
              <li>Include alt attributes for images</li>
              <li>Use proper nesting (close tags in reverse order)</li>
              <li>Validate your HTML</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Don&apos;ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don&apos;t use deprecated tags (like &lt;font&gt; or &lt;center&gt;)</li>
              <li>Avoid presentational tags (use CSS instead)</li>
              <li>Don&apos;t skip closing tags (except void elements)</li>
              <li>Avoid excessive div nesting</li>
              <li>Don&apos;t use tables for layout</li>
              <li>Avoid inline styles</li>
              <li>Don&apos;t forget the document type declaration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our HTML Tags Editor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Experiment with HTML tags in our interactive editor:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test different HTML elements</li>
              <li>See how tags render in real-time</li>
              <li>Practice semantic HTML structure</li>
              <li>Experiment with forms and media</li>
            </ul>
            <button
              onClick={() => {
                const tagsExample = `<!DOCTYPE html>
<html>
<head>
  <title>HTML Tags Playground</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    header { background: #f8f9fa; padding: 20px; }
    nav a { margin-right: 15px; }
    article { max-width: 800px; margin: 20px auto; }
    aside { background: #e9ecef; padding: 15px; }
  </style>
</head>
<body>
  <header>
    <h1>Welcome to HTML Tags</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <p>This is a paragraph with <strong>important</strong> text and <em>emphasized</em> content.</p>
      
      <section>
        <h3>Section Title</h3>
        <p>More content here with a <a href="#link">hyperlink</a>.</p>
        <ul>
          <li>List item 1</li>
          <li>List item 2</li>
        </ul>
      </section>
    </article>
    
    <aside>
      <h3>Related Content</h3>
      <p>Additional information goes here.</p>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`;
                localStorage.setItem("html-code", tagsExample);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch Tags Editor
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm overflow-x-auto">
                <code className="language-html">
                  {`<!DOCTYPE html>
<html>
<head>
  <title>HTML Tags Example</title>
</head>
<body>
  <!-- Semantic structure -->
  <header>...</header>
  
  <main>
    <article>
      <h1>Title</h1>
      <p>Paragraph with <a href="#">link</a>.</p>
    </article>
  </main>
  
  <footer>...</footer>
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
          href="/html/charsets"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (Character Encodings)
        </Link>
        <Link
          href="/html/attributes-ref"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (Attribute Reference) &gt;
        </Link>
      </section>
    </div>
  );
}