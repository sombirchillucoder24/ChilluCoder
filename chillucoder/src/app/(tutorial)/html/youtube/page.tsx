"use client";

import { FaCopy, FaCheck, FaChevronDown, FaCode, FaPlay } from "react-icons/fa";
import { useState, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLYouTubeTutorial() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    parameters: true,
    advanced: true,
  });

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

  const handleOpenEditor = (code: string) => {
    try {
      localStorage.setItem("html-code", code);
      router.push("/compilers/html-editor");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  // Sample YouTube video IDs
  const youtubeVideos = {
    sample1: "dQw4w9WgXcQ",
    sample2: "9bZkp7q19f0",
    sample3: "JGwWNGJdvx8",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          HTML YouTube Embed Tutorial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to embed YouTube videos in your HTML pages
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-red-50 dark:bg-gray-800 p-6 rounded-lg border border-red-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">
          Introduction to YouTube Embeds
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          YouTube provides an easy way to embed videos on your website using either
          iframe or object embed code. This is the recommended way to add YouTube
          videos to your HTML pages.
        </p>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
          <h3 className="font-bold mb-2">Basic YouTube Embed:</h3>
          <CodeEditor
            value={`<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/${youtubeVideos.sample1}" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`}
            language="html"
            style={{
              fontSize: 14,
              backgroundColor: "#f8fafc",
              fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
            className="rounded-lg"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => copyToClipboard(`<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/${youtubeVideos.sample1}" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`, "basic youtube embed")}
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {copied === "basic youtube embed" ? (
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
              onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>YouTube Embed Example</title>
</head>
<body>
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/${youtubeVideos.sample1}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</body>
</html>`)}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
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
            Basic YouTube Embed Examples
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
            {/* Example 1: Basic Embed */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">1. Basic YouTube Embed</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The standard way to embed a YouTube video using iframe.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${youtubeVideos.sample1}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full max-w-full aspect-video"
                  ></iframe>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Basic YouTube Embed</title>
</head>
<body>
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/${youtubeVideos.sample1}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/${youtubeVideos.sample1}" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`, "basic youtube embed")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "basic youtube embed" ? (
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
                  value={`<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/${youtubeVideos.sample1}" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 2: Responsive Embed */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">2. Responsive YouTube Embed</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Make your YouTube embed responsive using CSS.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeVideos.sample2}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Responsive YouTube Embed</title>
  <style>
    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
    }
    .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div class="video-container">
    <iframe 
      src="https://www.youtube.com/embed/${youtubeVideos.sample2}" 
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<div class="video-container">
  <iframe 
    src="https://www.youtube.com/embed/${youtubeVideos.sample2}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

<style>
  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>`, "responsive youtube embed")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "responsive youtube embed" ? (
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
                  value={`<div class="video-container">
  <iframe 
    src="https://www.youtube.com/embed/${youtubeVideos.sample2}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

<style>
  .video-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 3: Autoplay Embed */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">3. Autoplay YouTube Video</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Note: Autoplay often requires the video to be muted and may not work on all devices.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${youtubeVideos.sample3}?autoplay=1&mute=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full max-w-full aspect-video"
                  ></iframe>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Autoplay YouTube Video</title>
</head>
<body>
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/${youtubeVideos.sample3}?autoplay=1&mute=1" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/${youtubeVideos.sample3}?autoplay=1&mute=1" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`, "autoplay youtube embed")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "autoplay youtube embed" ? (
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
                  value={`<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/${youtubeVideos.sample3}?autoplay=1&mute=1" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* URL Parameters */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            YouTube URL Parameters
          </h2>
          <button
            onClick={() => toggleSection("parameters")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.parameters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.parameters && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Parameter
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
                      <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-sm">
                        autoplay
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Automatically start playback (1 = autoplay, 0 = no autoplay)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ?autoplay=1
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-sm">
                        mute
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Mute the video (1 = muted, 0 = not muted)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ?mute=1
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-sm">
                        loop
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Loop the video (1 = loop, 0 = no loop)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ?loop=1
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-sm">
                        controls
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Show video controls (1 = show, 0 = hide)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ?controls=0
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-sm">
                        start
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Start video at specific time (in seconds)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ?start=45
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-sm">
                        end
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      End video at specific time (in seconds)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ?end=120
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-sm">
                        rel
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Show related videos at end (1 = show, 0 = hide)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ?rel=0
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-red-100 dark:bg-red-900 px-2 py-1 rounded text-sm">
                        modestbranding
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Reduce YouTube branding (1 = modest, 0 = normal)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ?modestbranding=1
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
            Advanced YouTube Embed Techniques
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
            {/* Example 1: Playlist Embed */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">1. Embedding a Playlist</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Embed an entire YouTube playlist with navigation controls.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/videoseries?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full max-w-full aspect-video"
                  ></iframe>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>YouTube Playlist Embed</title>
</head>
<body>
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/videoseries?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`, "playlist embed")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "playlist embed" ? (
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
                  value={`<iframe width="560" height="315" 
  src="https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  }}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Example 2: JavaScript API */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">2. YouTube Player API</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Control YouTube videos using the YouTube IFrame API.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                  <div id="player" className="w-full max-w-full aspect-video"></div>
                  <div className="flex gap-2 mt-4 flex-wrap justify-center">
                    <button
                      id="play-button"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Play
                    </button>
                    <button
                      id="pause-button"
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Pause
                    </button>
                    <button
                      id="stop-button"
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Stop
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    (Functionality would be implemented with JavaScript)
                  </p>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>YouTube Player API</title>
</head>
<body>
  <div id="player"></div>
  <div class="controls">
    <button id="play-button">Play</button>
    <button id="pause-button">Pause</button>
    <button id="stop-button">Stop</button>
  </div>

  <script>
    // Load the IFrame Player API code asynchronously
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create player
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: '${youtubeVideos.sample1}',
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    function onPlayerReady(event) {
      document.getElementById('play-button').addEventListener('click', function() {
        player.playVideo();
      });
      document.getElementById('pause-button').addEventListener('click', function() {
        player.pauseVideo();
      });
      document.getElementById('stop-button').addEventListener('click', function() {
        player.stopVideo();
      });
    }
  </script>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<!DOCTYPE html>
<html>
<head>
  <title>YouTube Player API</title>
</head>
<body>
  <div id="player"></div>
  <div class="controls">
    <button id="play-button">Play</button>
    <button id="pause-button">Pause</button>
    <button id="stop-button">Stop</button>
  </div>

  <script>
    // Load the IFrame Player API code asynchronously
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create player
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: 'VIDEO_ID',
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    function onPlayerReady(event) {
      document.getElementById('play-button').addEventListener('click', function() {
        player.playVideo();
      });
      document.getElementById('pause-button').addEventListener('click', function() {
        player.pauseVideo();
      });
      document.getElementById('stop-button').addEventListener('click', function() {
        player.stopVideo();
      });
    }
  </script>
</body>
</html>`, "youtube api")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "youtube api" ? (
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
  <title>YouTube Player API</title>
</head>
<body>
  <div id="player"></div>
  <div class="controls">
    <button id="play-button">Play</button>
    <button id="pause-button">Pause</button>
    <button id="stop-button">Stop</button>
  </div>

  <script>
    // Load the IFrame Player API code asynchronously
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Create player
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '315',
        width: '560',
        videoId: 'VIDEO_ID',
        events: {
          'onReady': onPlayerReady
        }
      });
    }

    function onPlayerReady(event) {
      document.getElementById('play-button').addEventListener('click', function() {
        player.playVideo();
      });
      document.getElementById('pause-button').addEventListener('click', function() {
        player.pauseVideo();
      });
      document.getElementById('stop-button').addEventListener('click', function() {
        player.stopVideo();
      });
    }
  </script>
</body>
</html>`}
                  language="html"
                  style={{
                    fontSize: 14,
                    backgroundColor: "#f8fafc",
                    fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
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
          YouTube Embed Best Practices
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Performance</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use lazy loading for YouTube embeds below the fold</li>
              <li>Consider using placeholder images until user interacts</li>
              <li>Use the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">loading="lazy"</code> attribute</li>
              <li>Only load videos when needed (click to play)</li>
              <li>Use responsive embeds to prevent layout shifts</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">User Experience</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Avoid autoplay with sound (it's often blocked anyway)</li>
              <li>Provide clear play buttons for click-to-play</li>
              <li>Consider privacy-enhanced mode if needed</li>
              <li>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">rel=0</code> to limit related videos</li>
              <li>Add titles and descriptions for accessibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Privacy Considerations */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          Privacy Considerations
        </h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          YouTube embeds can track users even if they don't play the video. Consider these privacy options:
        </p>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
          <h3 className="font-bold mb-2">Privacy Enhanced Mode:</h3>
          <CodeEditor
            value={`<iframe width="560" height="315" 
  src="https://www.youtube-nocookie.com/embed/${youtubeVideos.sample1}" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`}
            language="html"
            style={{
              fontSize: 14,
              backgroundColor: "#f8fafc",
              fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
            className="rounded-lg"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => copyToClipboard(`<iframe width="560" height="315" 
  src="https://www.youtube-nocookie.com/embed/${youtubeVideos.sample1}" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>`, "privacy embed")}
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {copied === "privacy embed" ? (
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
              onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Privacy Enhanced YouTube Embed</title>
</head>
<body>
  <iframe width="560" height="315" 
    src="https://www.youtube-nocookie.com/embed/${youtubeVideos.sample1}" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</body>
</html>`)}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              <FaPlay size={12} /> Try it
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Note: For maximum privacy, consider click-to-play solutions that only load the YouTube iframe after user interaction.
        </p>
      </section>

      {/* Navigation */}
      <section className="flex justify-between items-center px-4 py-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/html/video"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded shadow flex items-center gap-2"
        >
          &lt; Previous: HTML Video
        </Link>
        <Link
          href="/html/canvas"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded shadow flex items-center gap-2"
        >
          Next: HTML Canvas &gt;
        </Link>
      </section>
    </div>
  );
}