"use client";

import {
  FaCode,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaSearch,
  FaMousePointer,
  FaKeyboard,
  FaWindowMaximize,
  FaEdit,
  FaArrowsAlt,
  FaClipboardList,
  FaVideo,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function HtmlEventsReference() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    mouse: true,
    keyboard: true,
    window: true,
    form: true,
    drag: true,
    clipboard: true,
    media: true,
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

  const eventCategories = [
    {
      title: "Mouse Events",
      icon: <FaMousePointer className="text-blue-500" />,
      expanded: expandedSections.mouse,
      items: [
        {
          event: "onclick",
          description: "Occurs when the user clicks on an element",
          example: '<button onclick="handleClick()">Click me</button>',
          bubbles: true,
          elements: "All visible elements",
        },
        {
          event: "ondblclick",
          description: "Occurs when the user double-clicks on an element",
          example: '<div ondblclick="handleDoubleClick()">Double click</div>',
          bubbles: true,
          elements: "All visible elements",
        },
        {
          event: "onmousedown",
          description:
            "Occurs when the user presses a mouse button over an element",
          example: '<div onmousedown="handleMouseDown()">Press</div>',
          bubbles: true,
          elements: "All visible elements",
        },
        {
          event: "onmouseup",
          description:
            "Occurs when the user releases a mouse button over an element",
          example: '<div onmouseup="handleMouseUp()">Release</div>',
          bubbles: true,
          elements: "All visible elements",
        },
        {
          event: "onmouseover",
          description: "Occurs when the pointer is moved onto an element",
          example: '<div onmouseover="handleMouseOver()">Hover</div>',
          bubbles: true,
          elements: "All visible elements",
        },
        {
          event: "onmouseout",
          description: "Occurs when the pointer moves out of an element",
          example: '<div onmouseout="handleMouseOut()">Out</div>',
          bubbles: true,
          elements: "All visible elements",
        },
        {
          event: "onmousemove",
          description: "Occurs when the pointer moves while over an element",
          example: '<div onmousemove="handleMouseMove(event)">Move</div>',
          bubbles: true,
          elements: "All visible elements",
        },
        {
          event: "oncontextmenu",
          description:
            "Occurs when the user right-clicks on an element to open a context menu",
          example: '<div oncontextmenu="handleContextMenu()">Right click</div>',
          bubbles: true,
          elements: "All visible elements",
        },
      ],
    },
    {
      title: "Keyboard Events",
      icon: <FaKeyboard className="text-blue-500" />,
      expanded: expandedSections.keyboard,
      items: [
        {
          event: "onkeydown",
          description: "Occurs when the user is pressing a key",
          example: '<input onkeydown="handleKeyDown(event)">',
          bubbles: true,
          elements: "Form elements, contenteditable",
        },
        {
          event: "onkeyup",
          description: "Occurs when the user releases a key",
          example: '<input onkeyup="handleKeyUp(event)">',
          bubbles: true,
          elements: "Form elements, contenteditable",
        },
        {
          event: "onkeypress",
          description:
            "Occurs when the user presses a key (deprecated, use onkeydown instead)",
          example: '<input onkeypress="handleKeyPress(event)">',
          bubbles: true,
          elements: "Form elements, contenteditable",
        },
      ],
    },
    {
      title: "Window Events",
      icon: <FaWindowMaximize className="text-blue-500" />,
      expanded: expandedSections.window,
      items: [
        {
          event: "onload",
          description: "Occurs when an object has loaded",
          example: '<body onload="initPage()">',
          bubbles: false,
          elements:
            "<body>, <frame>, <iframe>, <img>, <input type='image'>, <link>, <script>, <style>",
        },
        {
          event: "onunload",
          description: "Occurs once a page has unloaded",
          example: '<body onunload="cleanUp()">',
          bubbles: false,
          elements: "<body>",
        },
        {
          event: "onresize",
          description: "Occurs when the browser window is resized",
          example: '<body onresize="handleResize()">',
          bubbles: false,
          elements: "<body>",
        },
        {
          event: "onscroll",
          description: "Occurs when an element's scrollbar is being scrolled",
          example: '<div onscroll="handleScroll()">Scrollable content</div>',
          bubbles: false,
          elements: "Scrollable elements",
        },
      ],
    },
    {
      title: "Form Events",
      icon: <FaEdit className="text-blue-500" />,
      expanded: expandedSections.form,
      items: [
        {
          event: "onchange",
          description: "Occurs when the value of an element changes",
          example: '<select onchange="handleChange(this.value)">',
          bubbles: true,
          elements: "<input>, <select>, <textarea>",
        },
        {
          event: "onfocus",
          description: "Occurs when an element gets focus",
          example: '<input onfocus="handleFocus()">',
          bubbles: false,
          elements: "Form elements, links",
        },
        {
          event: "onblur",
          description: "Occurs when an element loses focus",
          example: '<input onblur="validate(this)">',
          bubbles: false,
          elements: "Form elements, links",
        },
        {
          event: "oninput",
          description: "Occurs when an element gets user input",
          example: '<input oninput="handleInput(this.value)">',
          bubbles: true,
          elements: "<input>, <textarea>",
        },
        {
          event: "oninvalid",
          description: "Occurs when an element is invalid",
          example: '<input required oninvalid="handleInvalid(this)">',
          bubbles: true,
          elements: "<input>",
        },
        {
          event: "onreset",
          description: "Occurs when a form is reset",
          example: '<form onreset="handleReset()">',
          bubbles: true,
          elements: "<form>",
        },
        {
          event: "onselect",
          description: "Occurs after some text has been selected in an element",
          example: '<input onselect="handleSelect()">',
          bubbles: true,
          elements: "<input>, <textarea>",
        },
        {
          event: "onsubmit",
          description: "Occurs when a form is submitted",
          example: '<form onsubmit="return validateForm()">',
          bubbles: true,
          elements: "<form>",
        },
      ],
    },
    {
      title: "Drag & Drop Events",
      icon: <FaArrowsAlt className="text-blue-500" />,
      expanded: expandedSections.drag,
      items: [
        {
          event: "ondrag",
          description: "Occurs when an element is being dragged",
          example:
            '<div draggable="true" ondrag="handleDrag(event)">Drag me</div>',
          bubbles: true,
          elements: "Draggable elements",
        },
        {
          event: "ondragstart",
          description: "Occurs when the user starts to drag an element",
          example:
            '<div draggable="true" ondragstart="handleDragStart(event)">',
          bubbles: true,
          elements: "Draggable elements",
        },
        {
          event: "ondragend",
          description: "Occurs when the user has finished dragging an element",
          example: '<div draggable="true" ondragend="handleDragEnd(event)">',
          bubbles: true,
          elements: "Draggable elements",
        },
        {
          event: "ondragenter",
          description: "Occurs when the dragged element enters the drop target",
          example: '<div ondragenter="handleDragEnter(event)">Drop here</div>',
          bubbles: true,
          elements: "All elements",
        },
        {
          event: "ondragleave",
          description: "Occurs when the dragged element leaves the drop target",
          example: '<div ondragleave="handleDragLeave(event)">',
          bubbles: true,
          elements: "All elements",
        },
        {
          event: "ondragover",
          description:
            "Occurs when the dragged element is over the drop target",
          example: '<div ondragover="handleDragOver(event)">',
          bubbles: true,
          elements: "All elements",
        },
        {
          event: "ondrop",
          description:
            "Occurs when the dragged element is dropped on the drop target",
          example: '<div ondrop="handleDrop(event)">',
          bubbles: true,
          elements: "All elements",
        },
      ],
    },
    {
      title: "Clipboard Events",
      icon: <FaClipboardList className="text-blue-500" />,
      expanded: expandedSections.clipboard,
      items: [
        {
          event: "oncopy",
          description: "Occurs when the user copies the content of an element",
          example: '<div oncopy="handleCopy(event)">Copy me</div>',
          bubbles: true,
          elements: "All elements",
        },
        {
          event: "oncut",
          description: "Occurs when the user cuts the content of an element",
          example: '<div oncut="handleCut(event)">Cut me</div>',
          bubbles: true,
          elements: "All elements",
        },
        {
          event: "onpaste",
          description: "Occurs when the user pastes some content in an element",
          example: '<div onpaste="handlePaste(event)">Paste here</div>',
          bubbles: true,
          elements: "All elements",
        },
      ],
    },
    {
      title: "Media Events",
      icon: <FaVideo className="text-blue-500" />,
      expanded: expandedSections.media,
      items: [
        {
          event: "onabort",
          description: "Occurs when loading of a media is aborted",
          example: '<img onabort="handleAbort()" src="image.jpg">',
          bubbles: false,
          elements: "<img>, <object>",
        },
        {
          event: "oncanplay",
          description: "Occurs when the browser can start playing the media",
          example: '<video oncanplay="handleCanPlay()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "oncanplaythrough",
          description:
            "Occurs when the browser can play through the media without stopping",
          example: '<video oncanplaythrough="handleCanPlayThrough()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "ondurationchange",
          description: "Occurs when the duration of the media changes",
          example: '<video ondurationchange="handleDurationChange()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onended",
          description: "Occurs when the media has reached the end",
          example: '<audio onended="handleEnded()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onerror",
          description:
            "Occurs when an error occurs during loading of a media file",
          example: '<img onerror="handleError()" src="missing.jpg">',
          bubbles: false,
          elements: "<img>, <audio>, <video>, <script>, <style>, <link>",
        },
        {
          event: "onloadeddata",
          description: "Occurs when media data is loaded",
          example: '<video onloadeddata="handleLoadedData()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onloadedmetadata",
          description:
            "Occurs when metadata (like dimensions and duration) are loaded",
          example: '<video onloadedmetadata="handleLoadedMetadata()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onloadstart",
          description: "Occurs when the browser starts looking for the media",
          example: '<video onloadstart="handleLoadStart()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onpause",
          description: "Occurs when the media is paused",
          example: '<video onpause="handlePause()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onplay",
          description: "Occurs when the media is ready to start playing",
          example: '<video onplay="handlePlay()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onplaying",
          description: "Occurs when the media has started playing",
          example: '<video onplaying="handlePlaying()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onprogress",
          description: "Occurs when the browser is downloading the media",
          example: '<video onprogress="handleProgress()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onratechange",
          description: "Occurs when the playing speed of the media changes",
          example: '<video onratechange="handleRateChange()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onseeked",
          description: "Occurs when the seeking attribute is set to false",
          example: '<video onseeked="handleSeeked()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onseeking",
          description: "Occurs when the seeking attribute is set to true",
          example: '<video onseeking="handleSeeking()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onstalled",
          description: "Occurs when the browser is unable to fetch media data",
          example: '<video onstalled="handleStalled()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onsuspend",
          description:
            "Occurs when the browser is intentionally not loading media data",
          example: '<video onsuspend="handleSuspend()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "ontimeupdate",
          description: "Occurs when the playing position has changed",
          example: '<video ontimeupdate="handleTimeUpdate()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onvolumechange",
          description: "Occurs when the volume is changed",
          example: '<video onvolumechange="handleVolumeChange()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
        {
          event: "onwaiting",
          description:
            "Occurs when the media has paused but is expected to resume",
          example: '<video onwaiting="handleWaiting()">',
          bubbles: false,
          elements: "<audio>, <video>",
        },
      ],
    },
  ];

  const filteredCategories = eventCategories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div>
      <Head>
        <title>HTML Events Reference | Complete List with Examples</title>
        <meta
          name="description"
          content="Complete reference of all HTML event attributes with examples and usage. Learn about mouse, keyboard, form, drag and drop, clipboard, and media events."
        />
        <meta
          name="keywords"
          content="HTML events, event handlers, JavaScript events, DOM events, web development, mouse events, keyboard events"
        />
        <meta name="author" content="Your Name" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 mb-2">
          HTML Events Reference
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Complete list of HTML event attributes with examples
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaInfoCircle className="text-blue-500" />
          About HTML Events
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          HTML events are "things" that happen to HTML elements. When JavaScript
          is used in HTML pages, JavaScript can "react" on these events. This
          reference covers all standard HTML5 event attributes with examples and
          usage information.
        </p>
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FaMousePointer className="text-blue-500" />
            <span>Mouse Events</span>
          </div>
          <div className="flex items-center gap-2">
            <FaKeyboard className="text-blue-500" />
            <span>Keyboard Events</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEdit className="text-blue-500" />
            <span>Form Events</span>
          </div>
          <div className="flex items-center gap-2">
            <FaArrowsAlt className="text-blue-500" />
            <span>Drag Events</span>
          </div>
          <div className="flex items-center gap-2">
            <FaVideo className="text-blue-500" />
            <span>Media Events</span>
          </div>
        </div>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Events Example</title>
  <style>
    #container { width: 300px; height: 200px; border: 1px solid #ccc; }
    .highlight { background-color: yellow; }
  </style>
</head>
<body>
  <h1>HTML Events Demo</h1>
  
  <!-- Mouse Events -->
  <div id="mouse-area" 
       onclick="alert('Clicked!')"
       onmouseover="this.classList.add('highlight')"
       onmouseout="this.classList.remove('highlight')"
       style="padding: 20px; border: 1px solid #ddd; margin: 10px 0;">
    Mouse over and click me
  </div>
  
  <!-- Keyboard Events -->
  <input type="text" 
         onkeydown="console.log('Key pressed:', event.key)"
         placeholder="Type something">
  
  <!-- Form Events -->
  <form onsubmit="alert('Form submitted!'); return false;">
    <input type="text" 
           onfocus="this.style.backgroundColor='lightyellow'"
           onblur="this.style.backgroundColor='white'"
           placeholder="Focus and blur me">
    <button type="submit">Submit</button>
  </form>
  
  <!-- Drag Events -->
  <div draggable="true" 
       ondragstart="event.dataTransfer.setData('text/plain', 'Dragged data')"
       style="padding: 10px; background: #f0f0f0; display: inline-block;">
    Drag me
  </div>
  
  <div ondrop="event.preventDefault(); alert('Dropped: ' + event.dataTransfer.getData('text/plain'))"
       ondragover="event.preventDefault()"
       style="width: 200px; height: 100px; border: 2px dashed #ccc; margin-top: 20px;">
    Drop here
  </div>
  
  <script>
    // Additional event listeners can be added here
  </script>
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
            placeholder="Search events (name or description)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Event Categories */}
      {filteredCategories.map((category, index) => (
        <section key={index} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {category.icon}
              {category.title}
            </h2>
            <button
              onClick={() =>
                toggleSection(category.title.toLowerCase().replace(/\s+/g, ""))
              }
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Example
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Bubbles
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Applies To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item, itemIndex) => (
                    <tr
                      key={itemIndex}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300 font-mono">
                        {item.event}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {item.example}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {item.bubbles ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {item.elements}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <button
                          onClick={() =>
                            copyToClipboard(item.example, item.event)
                          }
                          className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                        >
                          {copied === item.event ? (
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
          HTML Event Best Practices
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Do's:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use event delegation for dynamic elements</li>
              <li>Prefer addEventListener over inline event handlers</li>
              <li>Remove event listeners when no longer needed</li>
              <li>Use passive event listeners for scroll events</li>
              <li>Consider accessibility when handling keyboard events</li>
              <li>Prevent default behavior only when necessary</li>
              <li>Use event.preventDefault() instead of return false</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3 text-blue-600 dark:text-blue-400">
              Don'ts:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Don't use inline JavaScript in production code</li>
              <li>Avoid attaching too many event listeners to the document</li>
              <li>Don't block the main thread with heavy event handlers</li>
              <li>Avoid using deprecated events like onkeypress</li>
              <li>Don't rely only on mouse events (consider touch devices)</li>
              <li>Avoid nesting too many event handlers</li>
              <li>
                Don't forget to remove event listeners on component unmount
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Live Editor Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-100 dark:border-gray-700 mb-8">
        <div className="flex items-center mb-4">
          <FaPlay className="text-green-500 text-xl mr-3" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Try Our HTML Events Editor
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Experiment with HTML events in our interactive editor:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
              <li>Test different event handlers</li>
              <li>See how events work in real-time</li>
              <li>Practice event delegation</li>
              <li>Experiment with drag and drop</li>
            </ul>
            <button
              onClick={() => {
                const eventsExample = `<!DOCTYPE html>
<html>
<head>
  <title>Events Playground</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .interactive { padding: 15px; margin: 10px 0; border: 1px solid #ddd; cursor: pointer; }
    .highlight { background-color: yellow; }
    #drop-area { width: 200px; height: 100px; border: 2px dashed #ccc; padding: 20px; text-align: center; }
  </style>
</head>
<body>
  <h1>Events Playground</h1>
  
  <!-- Mouse Events -->
  <div class="interactive" 
       onclick="alert('Clicked!')"
       onmouseover="this.classList.add('highlight')"
       onmouseout="this.classList.remove('highlight')">
    Mouse over and click me
  </div>
  
  <!-- Keyboard Events -->
  <input type="text" 
         onkeydown="console.log('Key pressed:', event.key)"
         placeholder="Type something and check console">
  
  <!-- Form Events -->
  <form onsubmit="alert('Form submitted!'); return false;">
    <input type="text" 
           onfocus="this.style.backgroundColor='lightyellow'"
           onblur="this.style.backgroundColor='white'"
           placeholder="Focus and blur me">
    <button type="submit">Submit</button>
  </form>
  
  <!-- Drag and Drop -->
  <div draggable="true" 
       ondragstart="event.dataTransfer.setData('text/plain', 'Dragged item')"
       style="padding: 10px; background: #f0f0f0; display: inline-block;">
    Drag me
  </div>
  
  <div id="drop-area"
       ondrop="event.preventDefault(); alert('Dropped: ' + event.dataTransfer.getData('text/plain'))"
       ondragover="event.preventDefault()">
    Drop here
  </div>
  
  <!-- Media Events -->
  <video controls width="400" onplay="console.log('Video playing')">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    Your browser does not support HTML video.
  </video>
  
  <script>
    // Modern event listener example
    document.addEventListener('DOMContentLoaded', function() {
      console.log('Document loaded');
      
      // Better way to handle events than inline attributes
      document.querySelector('.interactive').addEventListener('click', function(e) {
        console.log('Clicked via addEventListener');
      });
    });
  </script>
</body>
</html>`;
                localStorage.setItem("html-code", eventsExample);
                router.push("/compilers/html-editor");
              }}
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Launch Events Editor
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
              <pre className="text-sm overflow-x-auto">
                <code className="language-html">
                  {`<!DOCTYPE html>
<html>
<body>
  <!-- Mouse event example -->
  <button onclick="handleClick()">Click me</button>
  
  <!-- Keyboard event example -->
  <input onkeydown="handleKeyPress(event)">
  
  <!-- Form event example -->
  <form onsubmit="return validateForm()">
    <input onfocus="handleFocus()" onblur="handleBlur()">
    <button type="submit">Submit</button>
  </form>
  
  <!-- Modern event listener -->
  <script>
    document.getElementById('myBtn').addEventListener('click', function() {
      alert('Button clicked!');
    });
  </script>
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
          href="/html/attributes-ref"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (Attributes Reference)
        </Link>
        <Link
          href="/html/dom"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (DOM Manipulation) &gt;
        </Link>
      </section>
    </div>
  );
}
