"use client";

import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaCode,
} from "react-icons/fa";
import { useState, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLAudioPage() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    attributes: true,
    advanced: true,
  });
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  // Sample audio files (replace with your actual files)
  const audioFiles = {
    mp3: "/audio/tur_tu_chir_audio.mp3",
    ogg: "/audio/tur_tu_chir_audio.ogg", // Example only - replace with actual OGG file
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
    const audio = audioRefs.current[id];
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  const handleMute = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.muted = !audio.muted;
    }
  };

  const handleOpenEditor = (code: string) => {
    try {
      // Use sessionStorage instead of localStorage for better practice
      sessionStorage.setItem("html-code", code);
      router.push("/compilers/html-editor");
    } catch (error) {
      console.error("Error saving to sessionStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  const setupAudioRef = (el: HTMLAudioElement | null, id: string) => {
    if (el) {
      audioRefs.current[id] = el;
      el.onplay = () => console.log("Audio started playing");
      el.onpause = () => console.log("Audio paused");
      el.onended = () => console.log("Audio finished playing");
    } else {
      delete audioRefs.current[id]; // Fixed: Use delete instead of setting to null
    }
  };

  const audioExamples = [
    {
      id: "basic-audio",
      title: "Basic Audio Player",
      description: "A simple audio player with default controls",
      code: `<audio controls>
  <source src="${audioFiles.mp3}" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>`,
      preview: (
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
          <audio
            controls
            ref={(el) => setupAudioRef(el, "basic-audio")}
            className="w-full"
          >
            <source src={audioFiles.mp3} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ),
    },
    {
      id: "multiple-sources",
      title: "Multiple Audio Sources",
      description:
        "Provide multiple source formats for better browser compatibility",
      code: `<audio controls>
  <source src="${audioFiles.ogg}" type="audio/ogg">
  <source src="${audioFiles.mp3}" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>`,
      preview: (
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
          <audio
            controls
            ref={(el) => setupAudioRef(el, "multiple-sources")}
            className="w-full"
          >
            <source src={audioFiles.ogg} type="audio/ogg" />
            <source src={audioFiles.mp3} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ),
    },
    {
      id: "custom-controls",
      title: "Custom Controls",
      description: "Create your own controls with JavaScript",
      code: `<audio id="custom-audio">
  <source src="${audioFiles.mp3}" type="audio/mpeg">
</audio>

<div class="audio-controls">
  <button onclick="document.getElementById('custom-audio').play()">Play</button>
  <button onclick="document.getElementById('custom-audio').pause()">Pause</button>
  <button onclick="document.getElementById('custom-audio').muted = !document.getElementById('custom-audio').muted">
    Toggle Mute
  </button>
</div>`,
      preview: (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded">
          <audio
            ref={(el) => setupAudioRef(el, "custom-controls")}
            className="mb-4"
          >
            <source src={audioFiles.mp3} type="audio/mpeg" />
          </audio>
          <div className="flex gap-2">
            <button
              onClick={() => handlePlayPause("custom-controls")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {audioRefs.current["custom-controls"]?.paused ? (
                <FaPlay />
              ) : (
                <FaPause />
              )}
            </button>
            <button
              onClick={() => handleMute("custom-controls")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              {audioRefs.current["custom-controls"]?.muted ? (
                <FaVolumeMute />
              ) : (
                <FaVolumeUp />
              )}
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "audio-attributes",
      title: "Audio Attributes",
      description: "Using various audio element attributes",
      code: `<audio controls loop muted preload="auto">
  <source src="${audioFiles.mp3}" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>`,
      preview: (
        <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
          <audio
            controls
            loop
            muted
            ref={(el) => setupAudioRef(el, "audio-attributes")}
            className="w-full"
          >
            <source src={audioFiles.mp3} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ),
    },
    {
      id: "background-audio",
      title: "Background Audio",
      description: "Audio that plays after user interaction",
      code: `<button id="play-btn">Play Background Music</button>
<audio id="bg-audio" loop>
  <source src="${audioFiles.mp3}" type="audio/mpeg">
</audio>

<script>
  document.getElementById('play-btn').addEventListener('click', () => {
    document.getElementById('bg-audio').play();
  });
</script>`,
      preview: (
        <div className="p-4 bg-gray-100 rounded">
          <audio
            ref={(el) => setupAudioRef(el, "background-audio")}
            loop
            className="hidden"
          >
            <source src={audioFiles.mp3} type="audio/mpeg" />
          </audio>
          <button
            onClick={() => {
              const audio = audioRefs.current["background-audio"];
              if (audio) {
                audio.play().catch(console.error);
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2"
          >
            Play Background Music
          </button>
          <p className="text-sm text-gray-600">
            (Click button to start background music)
          </p>
        </div>
      ),
    },
    {
      id: "audio-events",
      title: "Audio Events",
      description: "Using JavaScript to handle audio events",
      code: `<audio id="event-audio" controls>
  <source src="${audioFiles.mp3}" type="audio/mpeg">
</audio>

<script>
  const audio = document.getElementById('event-audio');
  
  audio.addEventListener('play', () => {
    console.log('Audio started playing');
  });
  
  audio.addEventListener('pause', () => {
    console.log('Audio paused');
  });
  
  audio.addEventListener('ended', () => {
    console.log('Audio finished playing');
  });
</script>`,
      preview: (
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded">
          <audio
            controls
            ref={(el) => setupAudioRef(el, "audio-events")}
            className="w-full mb-4"
          >
            <source src={audioFiles.mp3} type="audio/mpeg" />
          </audio>
          <p className="text-sm text-gray-600">
            Check browser console for event logs
          </p>
        </div>
      ),
    },
  ];

  const audioAttributes = [
    {
      name: "controls",
      description:
        "Shows the default audio controls (play, pause, volume, etc.)",
      example: "<audio controls>...</audio>",
    },
    {
      name: "autoplay",
      description:
        "Audio will start playing as soon as it's ready (may be blocked by browsers)",
      example: "<audio autoplay>...</audio>",
    },
    {
      name: "loop",
      description: "Audio will start over again when finished",
      example: "<audio loop>...</audio>",
    },
    {
      name: "muted",
      description: "Audio output will be muted by default",
      example: "<audio muted>...</audio>",
    },
    {
      name: "preload",
      description:
        "Specifies if and how the audio should be loaded when the page loads (auto, metadata, none)",
      example: '<audio preload="auto">...</audio>',
    },
    {
      name: "src",
      description:
        "Specifies the URL of the audio file (alternative to using <source> element)",
      example: `<audio src="${audioFiles.mp3}">...</audio>`,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Audio Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to embed and control audio content in your web pages
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaPlay className="text-blue-500" />
          Introduction to HTML Audio
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The HTML <code>&lt;audio&gt;</code> element is used to embed sound
          content in documents. It can contain one or more audio sources,
          represented using the <code>src</code> attribute or the{" "}
          <code>&lt;source&gt;</code> element.
        </p>
        <button
          onClick={() =>
            handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>HTML Audio Example</title>
</head>
<body>
  <h1>Basic Audio Player</h1>
  <audio controls>
    <source src="${audioFiles.mp3}" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
</body>
</html>`)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlay size={14} /> Open in Live Editor
        </button>
      </section>

      {/* Audio Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaPlay className="text-blue-500" />
            Audio Examples
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {audioExamples.map((example, index) => (
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

      {/* Audio Attributes */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Audio Attributes
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
                  {audioAttributes.map((attr, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                          {attr.name}
                        </code>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {attr.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                          {attr.example}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Advanced Techniques */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Advanced Audio Techniques
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Audio Visualization */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">Audio Visualization</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Using the Web Audio API to create visualizations
                </p>
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    (Audio visualization would appear here with actual
                    implementation)
                  </p>
                </div>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Audio Visualization</title>
  <style>
    #visualizer { width: 100%; height: 100px; background: #f0f0f0; }
  </style>
</head>
<body>
  <audio id="audio" controls src="${audioFiles.mp3}"></audio>
  <canvas id="visualizer"></canvas>
  
  <script>
    const audio = document.getElementById('audio');
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    
    // Web Audio API setup would go here
    // This is a simplified example
  </script>
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
  <title>Audio Visualization</title>
  <style>
    #visualizer { width: 100%; height: 100px; background: #f0f0f0; }
  </style>
</head>
<body>
  <audio id="audio" controls src="${audioFiles.mp3}"></audio>
  <canvas id="visualizer"></canvas>
  
  <script>
    const audio = document.getElementById('audio');
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    
    // Web Audio API setup would go here
    // This is a simplified example
  </script>
</body>
</html>`,
                        "Audio Visualization"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "Audio Visualization" ? (
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
  <title>Audio Visualization</title>
  <style>
    #visualizer { width: 100%; height: 100px; background: #f0f0f0; }
  </style>
</head>
<body>
  <audio id="audio" controls src="${audioFiles.mp3}"></audio>
  <canvas id="visualizer"></canvas>
  
  <script>
    const audio = document.getElementById('audio');
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    
    // Web Audio API setup would go here
    // This is a simplified example
  </script>
</body>
</html>`}
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

            {/* Audio Streaming */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">Audio Streaming</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Implementing live audio streaming
                </p>
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    (Audio streaming player would appear here with actual
                    implementation)
                  </p>
                </div>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Audio Streaming</title>
</head>
<body>
  <audio controls>
    <source src="http://stream.example.com/stream" type="audio/mpeg">
    Your browser does not support audio streaming.
  </audio>
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
  <title>Audio Streaming</title>
</head>
<body>
  <audio controls>
    <source src="http://stream.example.com/stream" type="audio/mpeg">
    Your browser does not support audio streaming.
  </audio>
</body>
</html>`,
                        "Audio Streaming"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "Audio Streaming" ? (
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
  <title>Audio Streaming</title>
</head>
<body>
  <audio controls>
    <source src="http://stream.example.com/stream" type="audio/mpeg">
    Your browser does not support audio streaming.
  </audio>
</body>
</html>`}
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
          </div>
        )}
      </section>

      {/* Best Practices */}
      <section className="mb-8 bg-yellow-50 dark:bg-gray-800 p-6 rounded-xl border border-yellow-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Audio Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
              Accessibility
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Always provide controls for audio playback</li>
              <li>Include fallback content for unsupported browsers</li>
              <li>Provide transcripts for spoken audio content</li>
              <li>Allow users to control volume and mute audio</li>
              <li>Don&apos;t autoplay audio without user consent</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-200">
              Performance
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                Use appropriate audio formats (MP3 for broad compatibility)
              </li>
              <li>
                Consider using <code>preload=&quot;metadata&quot;</code> for
                large files
              </li>
              <li>Optimize audio files for web (bitrate, length)</li>
              <li>Use CDN for audio files if serving to many users</li>
              <li>Implement lazy loading for non-critical audio</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        <Link
          href="/html/video"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous: HTML Video
        </Link>
        <Link
          href="/html/canvas"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next: HTML Canvas &gt;
        </Link>
      </section>
    </div>
  );
}