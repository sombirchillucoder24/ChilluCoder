"use client";

import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaCopy,
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";
import { useState, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLVideoTutorial() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    attributes: true,
    advanced: true,
  });
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Sample video files
  const videoFiles = {
    mp4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    webm: "https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.webm",
    ogv: "https://archive.org/download/ElephantsDream/ed_1024_512kb.ogv",
    poster: "https://sample-videos.com/img/Sample-jpg-image-1mb.jpg",
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

  const handlePlayPause = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const handleMute = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.muted = !video.muted;
    }
  };

  const handleFullscreen = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      // Modern browsers support requestFullscreen without vendor prefixes
      if (video.requestFullscreen) {
        video.requestFullscreen().catch((err) => {
          console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        // Fallback message for very old browsers (extremely rare now)
        alert("Fullscreen is not supported in this browser");
      }
    }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          HTML Video Tutorial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to embed and control video content in your HTML pages
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          Introduction to HTML Video
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The HTML{" "}
          <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
            &lt;video&gt;
          </code>{" "}
          element allows you to embed video content directly in your web pages.
          It supports multiple video formats and provides built-in controls for
          playback.
        </p>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
          <h3 className="font-bold mb-2">Basic Syntax:</h3>
          <CodeEditor
            value={`<video controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>`}
            language="html"
            style={{
              fontSize: 14,
              backgroundColor: "#f8fafc",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
            className="rounded-lg"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() =>
                copyToClipboard(
                  `<video controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>`,
                  "basic video"
                )
              }
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {copied === "basic video" ? (
                <>
                  <FaCheck className="text-green-500" /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </button>
            <button
              onClick={() =>
                handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Basic Video Example</title>
</head>
<body>
  <video controls width="600">
    <source src="${videoFiles.mp4}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</body>
</html>`)
              }
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              <FaPlay size={12} /> Try it
            </button>
          </div>
        </div>
      </section>

      {/* Basic Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Basic Video Examples
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
            {/* Example 1: Basic Video */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  1. Basic Video Player
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The simplest way to embed a video with default controls.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <video
                    controls
                    width="600"
                    ref={(el) => {
                      videoRefs.current["basic-video"] = el;
                    }}
                    className="w-full max-w-full"
                  >
                    <source src={videoFiles.mp4} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Basic Video</title>
</head>
<body>
  <video controls width="600">
    <source src="${videoFiles.mp4}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<video controls width="600">
  <source src="${videoFiles.mp4}" type="video/mp4">
  Your browser does not support the video tag.
</video>`,
                        "basic video"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "basic video" ? (
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
                  value={`<video controls width="600">
  <source src="${videoFiles.mp4}" type="video/mp4">
  Your browser does not support the video tag.
</video>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 2: Multiple Sources */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  2. Multiple Video Sources
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Provide multiple formats for better browser compatibility.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <video
                    controls
                    width="600"
                    ref={(el) => {
                      videoRefs.current["multiple-sources"] = el;
                    }}
                    className="w-full max-w-full"
                  >
                    <source src={videoFiles.webm} type="video/webm" />
                    <source src={videoFiles.mp4} type="video/mp4" />
                    <source src={videoFiles.ogv} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Multiple Sources</title>
</head>
<body>
  <video controls width="600">
    <source src="${videoFiles.webm}" type="video/webm">
    <source src="${videoFiles.mp4}" type="video/mp4">
    <source src="${videoFiles.ogv}" type="video/ogg">
    Your browser does not support the video tag.
  </video>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<video controls width="600">
  <source src="${videoFiles.webm}" type="video/webm">
  <source src="${videoFiles.mp4}" type="video/mp4">
  <source src="${videoFiles.ogv}" type="video/ogg">
  Your browser does not support the video tag.
</video>`,
                        "multiple sources"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "multiple sources" ? (
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
                  value={`<video controls width="600">
  <source src="${videoFiles.webm}" type="video/webm">
  <source src="${videoFiles.mp4}" type="video/mp4">
  <source src="${videoFiles.ogv}" type="video/ogg">
  Your browser does not support the video tag.
</video>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 3: Video with Poster */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  3. Video with Poster Image
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Show a preview image before the video plays.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <video
                    controls
                    width="600"
                    poster={videoFiles.poster}
                    ref={(el) => {
                      videoRefs.current["poster-video"] = el;
                    }}
                    className="w-full max-w-full"
                  >
                    <source src={videoFiles.mp4} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Video with Poster</title>
</head>
<body>
  <video controls width="600" poster="${videoFiles.poster}">
    <source src="${videoFiles.mp4}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<video controls width="600" poster="${videoFiles.poster}">
  <source src="${videoFiles.mp4}" type="video/mp4">
  Your browser does not support the video tag.
</video>`,
                        "poster video"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "poster video" ? (
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
                  value={`<video controls width="600" poster="${videoFiles.poster}">
  <source src="${videoFiles.mp4}" type="video/mp4">
  Your browser does not support the video tag.
</video>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Video Attributes */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Video Attributes
          </h2>
          <button
            onClick={() => toggleSection("attributes")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.attributes ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.attributes && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Attribute
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Example
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        controls
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Shows the default video controls (play/pause, volume,
                      etc.)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;video controls&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        autoplay
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Video starts playing as soon as it&apos;s ready (may be
                      blocked by browsers)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;video autoplay&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        loop
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Video will start over again when finished
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;video loop&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        muted
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Video will be muted by default
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;video muted&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        poster
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      URL of an image to show while video is downloading
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;video poster=&quot;image.jpg&quot;&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        preload
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Specifies if/how the video should be loaded when page
                      loads (auto, metadata, none)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;video preload=&quot;auto&quot;&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        width
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Sets the width of the video player in pixels
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;video width=&quot;600&quot;&gt;
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        height
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Sets the height of the video player in pixels
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        &lt;video height=&quot;400&quot;&gt;
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Advanced Techniques */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Advanced Video Techniques
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
            {/* Custom Controls */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  Custom Video Controls
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create your own controls using JavaScript instead of the
                  default browser controls.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                  <video
                    width="600"
                    poster={videoFiles.poster}
                    ref={(el) => {
                      videoRefs.current["custom-controls"] = el;
                    }}
                    className="w-full max-w-full mb-4"
                  >
                    <source src={videoFiles.mp4} type="video/mp4" />
                  </video>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => handlePlayPause("custom-controls")}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
                    >
                      {videoRefs.current["custom-controls"]?.paused ? (
                        <>
                          <FaPlay /> Play
                        </>
                      ) : (
                        <>
                          <FaPause /> Pause
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleMute("custom-controls")}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2"
                    >
                      {videoRefs.current["custom-controls"]?.muted ? (
                        <>
                          <FaVolumeMute /> Unmute
                        </>
                      ) : (
                        <>
                          <FaVolumeUp /> Mute
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleFullscreen("custom-controls")}
                      className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                      Fullscreen
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Custom Video Controls</title>
  <style>
    .video-controls {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .video-controls button {
      padding: 8px 16px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <video id="custom-video" width="600" poster="${videoFiles.poster}">
    <source src="${videoFiles.mp4}" type="video/mp4">
  </video>
  
  <div class="video-controls">
    <button onclick="document.getElementById('custom-video').play()">Play</button>
    <button onclick="document.getElementById('custom-video').pause()">Pause</button>
    <button onclick="document.getElementById('custom-video').muted = !document.getElementById('custom-video').muted">
      Toggle Mute
    </button>
    <button onclick="document.getElementById('custom-video').requestFullscreen()">
      Fullscreen
    </button>
  </div>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<!DOCTYPE html>
<html>
<head>
  <title>Custom Video Controls</title>
  <style>
    .video-controls {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .video-controls button {
      padding: 8px 16px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <video id="custom-video" width="600" poster="${videoFiles.poster}">
    <source src="${videoFiles.mp4}" type="video/mp4">
  </video>
  
  <div class="video-controls">
    <button onclick="document.getElementById('custom-video').play()">Play</button>
    <button onclick="document.getElementById('custom-video').pause()">Pause</button>
    <button onclick="document.getElementById('custom-video').muted = !document.getElementById('custom-video').muted">
      Toggle Mute
    </button>
    <button onclick="document.getElementById('custom-video').requestFullscreen()">
      Fullscreen
    </button>
  </div>
</body>
</html>`,
                        "custom controls"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "custom controls" ? (
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
                  value={`<!DOCTYPE html>
<html>
<head>
  <title>Custom Video Controls</title>
  <style>
    .video-controls {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .video-controls button {
      padding: 8px 16px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <video id="custom-video" width="600" poster="${videoFiles.poster}">
    <source src="${videoFiles.mp4}" type="video/mp4">
  </video>
  
  <div class="video-controls">
    <button onclick="document.getElementById('custom-video').play()">Play</button>
    <button onclick="document.getElementById('custom-video').pause()">Pause</button>
    <button onclick="document.getElementById('custom-video').muted = !document.getElementById('custom-video').muted">
      Toggle Mute
    </button>
    <button onclick="document.getElementById('custom-video').requestFullscreen()">
      Fullscreen
    </button>
  </div>
</body>
</html>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Video with Captions */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">Video with Captions</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Add subtitles/captions to your videos for accessibility.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                  <video
                    controls
                    width="600"
                    ref={(el) => {
                      videoRefs.current["captions-video"] = el;
                    }}
                    className="w-full max-w-full"
                  >
                    <source src={videoFiles.mp4} type="video/mp4" />
                    <track
                      kind="subtitles"
                      src="/videos/captions.vtt"
                      srcLang="en"
                      label="English"
                    />
                  </video>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    Note: This example requires a WebVTT file for captions
                  </p>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Video with Captions</title>
</head>
<body>
  <video controls width="600">
    <source src="${videoFiles.mp4}" type="video/mp4">
    <track kind="subtitles" src="captions.vtt" srclang="en" label="English">
  </video>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<!DOCTYPE html>
<html>
<head>
  <title>Video with Captions</title>
</head>
<body>
  <video controls width="600">
    <source src="${videoFiles.mp4}" type="video/mp4">
    <track kind="subtitles" src="captions.vtt" srclang="en" label="English">
  </video>
</body>
</html>`,
                        "captions video"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "captions video" ? (
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
                  value={`<!DOCTYPE html>
<html>
<head>
  <title>Video with Captions</title>
</head>
<body>
  <video controls width="600">
    <source src="${videoFiles.mp4}" type="video/mp4">
    <track kind="subtitles" src="captions.vtt" srclang="en" label="English">
  </video>
</body>
</html>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Best Practices */}
      <section className="mb-8 bg-yellow-50 dark:bg-gray-800 p-6 rounded-lg border border-yellow-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800 dark:text-yellow-200">
          Video Best Practices
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Accessibility</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always provide controls for video playback</li>
              <li>Include captions/subtitles for spoken content</li>
              <li>Provide audio descriptions when needed</li>
              <li>
                Don&apos;t autoplay videos with sound (it&apos;s often blocked
                anyway)
              </li>
              <li>Ensure sufficient color contrast for any custom controls</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Performance</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use MP4 format for broadest compatibility (H.264 codec)</li>
              <li>
                Optimize video files (compression, appropriate resolution)
              </li>
              <li>Use poster images for faster perceived loading</li>
              <li>Consider lazy loading for videos below the fold</li>
              <li>For large videos, consider streaming solutions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Browser Support */}
      <section className="mb-8 bg-green-50 dark:bg-gray-800 p-6 rounded-lg border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">
          Browser Support
        </h2>

        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The HTML5{" "}
          <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
            &lt;video&gt;
          </code>{" "}
          element is supported in all modern browsers:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 rounded-lg">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-2 text-left">Browser</th>
                <th className="px-4 py-2 text-left">MP4</th>
                <th className="px-4 py-2 text-left">WebM</th>
                <th className="px-4 py-2 text-left">Ogg</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">Chrome</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">Firefox</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">Safari</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
                <td className="px-4 py-2 text-yellow-600">Partial</td>
                <td className="px-4 py-2 text-red-600">No</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Edge</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
                <td className="px-4 py-2 text-green-600">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Note: For widest compatibility, provide multiple formats (MP4 + WebM
          recommended).
        </p>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        {/* Previous Link */}
        <Link
          href="/html/audio"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        {/* Next Link */}
        <Link
          href="/html/youtube"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
