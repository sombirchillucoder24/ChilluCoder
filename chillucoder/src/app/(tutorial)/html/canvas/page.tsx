"use client";

import { FaCopy, FaCheck, FaChevronDown, FaCode, FaPlay } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLCanvasTutorial() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    drawing: true,
    advanced: true,
  });

  // Refs for canvas examples
  const basicCanvasRef = useRef<HTMLCanvasElement>(null);
  const shapesCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationCanvasRef = useRef<HTMLCanvasElement>(null);
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvas examples
  useEffect(() => {
    // Basic Canvas
    if (basicCanvasRef.current) {
      const ctx = basicCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(10, 10, 100, 100);
      }
    }

    // Shapes Canvas
    if (shapesCanvasRef.current) {
      const ctx = shapesCanvasRef.current.getContext('2d');
      if (ctx) {
        // Rectangle
        ctx.fillStyle = '#4f46e5';
        ctx.fillRect(10, 10, 100, 80);
        
        // Circle
        ctx.beginPath();
        ctx.arc(200, 50, 40, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        
        // Line
        ctx.beginPath();
        ctx.moveTo(300, 10);
        ctx.lineTo(400, 90);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 5;
        ctx.stroke();
      }
    }

    // Animation Canvas
    if (animationCanvasRef.current) {
      const canvas = animationCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let posX = 0;
        let speed = 2;
        
        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          ctx.beginPath();
          ctx.arc(posX, 50, 30, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();
          
          posX += speed;
          if (posX > canvas.width || posX < 0) {
            speed = -speed;
          }
          
          requestAnimationFrame(animate);
        };
        
        animate();
      }
    }
  }, []);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          HTML Canvas Tutorial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to draw graphics and create animations using the HTML Canvas element
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-purple-50 dark:bg-gray-800 p-6 rounded-lg border border-purple-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-400">
          Introduction to HTML Canvas
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The HTML <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">&lt;canvas&gt;</code> element is used to draw graphics on a web page via JavaScript. 
          It provides a powerful API for creating animations, games, data visualizations, and more.
        </p>
        
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
          <h3 className="font-bold mb-2">Basic Syntax:</h3>
          <CodeEditor
            value={`<canvas id="myCanvas" width="200" height="100"></canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(10, 10, 100, 80);
</script>`}
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
              onClick={() => copyToClipboard(`<canvas id="myCanvas" width="200" height="100"></canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(10, 10, 100, 80);
</script>`, "basic canvas")}
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {copied === "basic canvas" ? (
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
  <title>Basic Canvas Example</title>
</head>
<body>
  <canvas id="myCanvas" width="200" height="100"></canvas>

  <script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(10, 10, 100, 80);
  </script>
</body>
</html>`)}
              className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
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
            Basic Canvas Examples
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
            {/* Example 1: Basic Canvas */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">1. Basic Canvas Drawing</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Draw a simple rectangle on a canvas element.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <canvas 
                    ref={basicCanvasRef}
                    width="300" 
                    height="120"
                    className="border border-gray-300 bg-white"
                  ></canvas>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Basic Canvas Drawing</title>
</head>
<body>
  <canvas id="myCanvas" width="300" height="120"></canvas>

  <script>
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(10, 10, 100, 100);
  </script>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<canvas id="myCanvas" width="300" height="120"></canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(10, 10, 100, 100);
</script>`, "basic canvas")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "basic canvas" ? (
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
                  value={`<canvas id="myCanvas" width="300" height="120"></canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(10, 10, 100, 100);
</script>`}
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

            {/* Example 2: Drawing Shapes */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">2. Drawing Different Shapes</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Draw rectangles, circles, and lines on a canvas.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <canvas 
                    ref={shapesCanvasRef}
                    width="450" 
                    height="120"
                    className="border border-gray-300 bg-white"
                  ></canvas>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Drawing Shapes</title>
</head>
<body>
  <canvas id="shapesCanvas" width="450" height="120"></canvas>

  <script>
    const canvas = document.getElementById('shapesCanvas');
    const ctx = canvas.getContext('2d');
    
    // Rectangle
    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(10, 10, 100, 80);
    
    // Circle
    ctx.beginPath();
    ctx.arc(200, 50, 40, 0, Math.PI * 2);
    ctx.fillStyle = '#10b981';
    ctx.fill();
    
    // Line
    ctx.beginPath();
    ctx.moveTo(300, 10);
    ctx.lineTo(400, 90);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 5;
    ctx.stroke();
  </script>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<canvas id="shapesCanvas" width="450" height="120"></canvas>

<script>
  const canvas = document.getElementById('shapesCanvas');
  const ctx = canvas.getContext('2d');
  
  // Rectangle
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(10, 10, 100, 80);
  
  // Circle
  ctx.beginPath();
  ctx.arc(200, 50, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#10b981';
  ctx.fill();
  
  // Line
  ctx.beginPath();
  ctx.moveTo(300, 10);
  ctx.lineTo(400, 90);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 5;
  ctx.stroke();
</script>`, "shapes canvas")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "shapes canvas" ? (
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
                  value={`<canvas id="shapesCanvas" width="450" height="120"></canvas>

<script>
  const canvas = document.getElementById('shapesCanvas');
  const ctx = canvas.getContext('2d');
  
  // Rectangle
  ctx.fillStyle = '#4f46e5';
  ctx.fillRect(10, 10, 100, 80);
  
  // Circle
  ctx.beginPath();
  ctx.arc(200, 50, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#10b981';
  ctx.fill();
  
  // Line
  ctx.beginPath();
  ctx.moveTo(300, 10);
  ctx.lineTo(400, 90);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 5;
  ctx.stroke();
</script>`}
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

            {/* Example 3: Text and Styles */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">3. Drawing Text and Styles</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Add text and apply different styles to your canvas drawings.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <canvas 
                    id="textCanvas"
                    width="400" 
                    height="150"
                    className="border border-gray-300 bg-white"
                  ></canvas>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Canvas Text and Styles</title>
</head>
<body>
  <canvas id="textCanvas" width="400" height="150"></canvas>

  <script>
    const canvas = document.getElementById('textCanvas');
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Text with shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.font = '30px Arial';
    ctx.fillStyle = '#4f46e5';
    ctx.fillText('Hello Canvas!', 50, 50);
    
    // Styled text
    ctx.shadowColor = 'transparent';
    ctx.font = 'italic 24px Georgia';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.strokeText('Styled Text', 50, 100);
    
    // Gradient text
    const gradient = ctx.createLinearGradient(0, 120, 300, 120);
    gradient.addColorStop(0, '#10b981');
    gradient.addColorStop(1, '#3b82f6');
    ctx.fillStyle = gradient;
    ctx.font = 'bold 28px Verdana';
    ctx.fillText('Gradient Text', 50, 140);
  </script>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<canvas id="textCanvas" width="400" height="150"></canvas>

<script>
  const canvas = document.getElementById('textCanvas');
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Text with shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.font = '30px Arial';
  ctx.fillStyle = '#4f46e5';
  ctx.fillText('Hello Canvas!', 50, 50);
  
  // Styled text
  ctx.shadowColor = 'transparent';
  ctx.font = 'italic 24px Georgia';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.strokeText('Styled Text', 50, 100);
  
  // Gradient text
  const gradient = ctx.createLinearGradient(0, 120, 300, 120);
  gradient.addColorStop(0, '#10b981');
  gradient.addColorStop(1, '#3b82f6');
  ctx.fillStyle = gradient;
  ctx.font = 'bold 28px Verdana';
  ctx.fillText('Gradient Text', 50, 140);
</script>`, "text canvas")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "text canvas" ? (
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
                  value={`<canvas id="textCanvas" width="400" height="150"></canvas>

<script>
  const canvas = document.getElementById('textCanvas');
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Text with shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
  ctx.font = '30px Arial';
  ctx.fillStyle = '#4f46e5';
  ctx.fillText('Hello Canvas!', 50, 50);
  
  // Styled text
  ctx.shadowColor = 'transparent';
  ctx.font = 'italic 24px Georgia';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.strokeText('Styled Text', 50, 100);
  
  // Gradient text
  const gradient = ctx.createLinearGradient(0, 120, 300, 120);
  gradient.addColorStop(0, '#10b981');
  gradient.addColorStop(1, '#3b82f6');
  ctx.fillStyle = gradient;
  ctx.font = 'bold 28px Verdana';
  ctx.fillText('Gradient Text', 50, 140);
</script>`}
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

      {/* Drawing Methods */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Canvas Drawing Methods
          </h2>
          <button
            onClick={() => toggleSection("drawing")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.drawing ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.drawing && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Method
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
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        fillRect(x, y, width, height)
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Draws a filled rectangle
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.fillRect(10, 10, 100, 50);
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        strokeRect(x, y, width, height)
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Draws a rectangular outline
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.strokeRect(10, 10, 100, 50);
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        clearRect(x, y, width, height)
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Clears the specified rectangular area
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        beginPath()
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Begins a new path
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.beginPath();
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        moveTo(x, y)
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Moves the path to the specified point
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.moveTo(10, 10);
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        lineTo(x, y)
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Adds a line to the path
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.lineTo(100, 100);
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        arc(x, y, radius, startAngle, endAngle)
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Adds an arc to the path
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.arc(50, 50, 40, 0, Math.PI * 2);
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        fill()
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Fills the current path
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.fill();
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        stroke()
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Strokes the current path
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.stroke();
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        fillText(text, x, y)
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Draws filled text
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.fillText('Hello', 10, 50);
                      </code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded text-sm">
                        strokeText(text, x, y)
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Draws text outline
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
                        ctx.strokeText('Hello', 10, 50);
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
            Advanced Canvas Techniques
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
            {/* Example 1: Animation */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">1. Canvas Animation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create smooth animations using requestAnimationFrame.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <canvas 
                    ref={animationCanvasRef}
                    width="400" 
                    height="100"
                    className="border border-gray-300 bg-white"
                  ></canvas>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Canvas Animation</title>
</head>
<body>
  <canvas id="animationCanvas" width="400" height="100"></canvas>

  <script>
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    let posX = 0;
    let speed = 2;
    
    function animate() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(posX, 50, 30, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      
      // Update position
      posX += speed;
      
      // Reverse direction at edges
      if (posX > canvas.width || posX < 0) {
        speed = -speed;
      }
      
      // Continue animation
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
  </script>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<canvas id="animationCanvas" width="400" height="100"></canvas>

<script>
  const canvas = document.getElementById('animationCanvas');
  const ctx = canvas.getContext('2d');
  let posX = 0;
  let speed = 2;
  
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(posX, 50, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    
    // Update position
    posX += speed;
    
    // Reverse direction at edges
    if (posX > canvas.width || posX < 0) {
      speed = -speed;
    }
    
    // Continue animation
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
</script>`, "animation canvas")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "animation canvas" ? (
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
                  value={`<canvas id="animationCanvas" width="400" height="100"></canvas>

<script>
  const canvas = document.getElementById('animationCanvas');
  const ctx = canvas.getContext('2d');
  let posX = 0;
  let speed = 2;
  
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(posX, 50, 30, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    
    // Update position
    posX += speed;
    
    // Reverse direction at edges
    if (posX > canvas.width || posX < 0) {
      speed = -speed;
    }
    
    // Continue animation
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
</script>`}
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

            {/* Example 2: Image Manipulation */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">2. Image Manipulation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Load and manipulate images on canvas.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex justify-center">
                  <canvas 
                    id="imageCanvas"
                    width="300" 
                    height="200"
                    className="border border-gray-300 bg-white"
                  ></canvas>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Canvas Image Manipulation</title>
</head>
<body>
  <canvas id="imageCanvas" width="300" height="200"></canvas>

  <script>
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    
    // Create an image object
    const img = new Image();
    img.src = 'https://via.placeholder.com/300x200';
    
    // When image loads, draw it to canvas
    img.onload = function() {
      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Apply grayscale filter
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
      }
      
      ctx.putImageData(imageData, 0, 0);
    };
  </script>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<canvas id="imageCanvas" width="300" height="200"></canvas>

<script>
  const canvas = document.getElementById('imageCanvas');
  const ctx = canvas.getContext('2d');
  
  // Create an image object
  const img = new Image();
  img.src = 'https://via.placeholder.com/300x200';
  
  // When image loads, draw it to canvas
  img.onload = function() {
    // Draw original image
    ctx.drawImage(img, 0, 0);
    
    // Apply grayscale filter
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;     // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    
    ctx.putImageData(imageData, 0, 0);
  };
</script>`, "image canvas")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "image canvas" ? (
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
                  value={`<canvas id="imageCanvas" width="300" height="200"></canvas>

<script>
  const canvas = document.getElementById('imageCanvas');
  const ctx = canvas.getContext('2d');
  
  // Create an image object
  const img = new Image();
  img.src = 'https://via.placeholder.com/300x200';
  
  // When image loads, draw it to canvas
  img.onload = function() {
    // Draw original image
    ctx.drawImage(img, 0, 0);
    
    // Apply grayscale filter
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;     // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    
    ctx.putImageData(imageData, 0, 0);
  };
</script>`}
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

            {/* Example 3: Simple Game */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">3. Simple Game Example</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  A basic game loop with keyboard controls.
                </p>
                
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded flex flex-col items-center">
                  <canvas 
                    ref={gameCanvasRef}
                    width="400" 
                    height="300"
                    className="border border-gray-300 bg-white mb-4"
                  ></canvas>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    (Game would be implemented with JavaScript - use arrow keys to move)
                  </p>
                </div>
                
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Simple Canvas Game</title>
  <style>
    body { margin: 0; overflow: hidden; }
    canvas { display: block; background: #f0f0f0; }
  </style>
</head>
<body>
  <canvas id="gameCanvas" width="400" height="300"></canvas>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Game state
    const player = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 30,
      speed: 5,
      color: '#4f46e5'
    };
    
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    };
    
    // Event listeners for keyboard
    window.addEventListener('keydown', (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
      }
    });
    
    window.addEventListener('keyup', (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
      }
    });
    
    // Game loop
    function gameLoop() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update player position
      if (keys.ArrowUp && player.y > 0) player.y -= player.speed;
      if (keys.ArrowDown && player.y < canvas.height - player.size) player.y += player.speed;
      if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
      if (keys.ArrowRight && player.x < canvas.width - player.size) player.x += player.speed;
      
      // Draw player
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.size, player.size);
      
      // Draw instructions
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.fillText('Use arrow keys to move', 10, 20);
      
      // Continue game loop
      requestAnimationFrame(gameLoop);
    }
    
    // Start game
    gameLoop();
  </script>
</body>
</html>`)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() => copyToClipboard(`<!DOCTYPE html>
<html>
<head>
  <title>Simple Canvas Game</title>
  <style>
    body { margin: 0; overflow: hidden; }
    canvas { display: block; background: #f0f0f0; }
  </style>
</head>
<body>
  <canvas id="gameCanvas" width="400" height="300"></canvas>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Game state
    const player = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 30,
      speed: 5,
      color: '#4f46e5'
    };
    
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    };
    
    // Event listeners for keyboard
    window.addEventListener('keydown', (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
      }
    });
    
    window.addEventListener('keyup', (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
      }
    });
    
    // Game loop
    function gameLoop() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update player position
      if (keys.ArrowUp && player.y > 0) player.y -= player.speed;
      if (keys.ArrowDown && player.y < canvas.height - player.size) player.y += player.speed;
      if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
      if (keys.ArrowRight && player.x < canvas.width - player.size) player.x += player.speed;
      
      // Draw player
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.size, player.size);
      
      // Draw instructions
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.fillText('Use arrow keys to move', 10, 20);
      
      // Continue game loop
      requestAnimationFrame(gameLoop);
    }
    
    // Start game
    gameLoop();
  </script>
</body>
</html>`, "game canvas")}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "game canvas" ? (
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
  <title>Simple Canvas Game</title>
  <style>
    body { margin: 0; overflow: hidden; }
    canvas { display: block; background: #f0f0f0; }
  </style>
</head>
<body>
  <canvas id="gameCanvas" width="400" height="300"></canvas>

  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Game state
    const player = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: 30,
      speed: 5,
      color: '#4f46e5'
    };
    
    const keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false
    };
    
    // Event listeners for keyboard
    window.addEventListener('keydown', (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
      }
    });
    
    window.addEventListener('keyup', (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
      }
    });
    
    // Game loop
    function gameLoop() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update player position
      if (keys.ArrowUp && player.y > 0) player.y -= player.speed;
      if (keys.ArrowDown && player.y < canvas.height - player.size) player.y += player.speed;
      if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
      if (keys.ArrowRight && player.x < canvas.width - player.size) player.x += player.speed;
      
      // Draw player
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.size, player.size);
      
      // Draw instructions
      ctx.fillStyle = '#000';
      ctx.font = '16px Arial';
      ctx.fillText('Use arrow keys to move', 10, 20);
      
      // Continue game loop
      requestAnimationFrame(gameLoop);
    }
    
    // Start game
    gameLoop();
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
      <section className="mb-8 bg-green-50 dark:bg-gray-800 p-6 rounded-lg border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
          Canvas Best Practices
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-lg mb-2">Performance</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">requestAnimationFrame</code> for animations</li>
              <li>Minimize canvas state changes (save/restore)</li>
              <li>Use multiple canvases for complex UIs</li>
              <li>Clear only the area that changed, not the whole canvas</li>
              <li>Consider using offscreen canvas for complex drawings</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Code Organization</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Separate drawing logic from game/app logic</li>
              <li>Use object-oriented approach for complex projects</li>
              <li>Implement a proper game loop for games</li>
              <li>Use helper functions for common drawing operations</li>
              <li>Consider using canvas libraries for complex projects</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Libraries and Frameworks */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          Canvas Libraries and Frameworks
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="font-bold mb-2">p5.js</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              A JavaScript library for creative coding, with a focus on making coding accessible.
            </p>
            <a href="https://p5js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              https://p5js.org/
            </a>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Fabric.js</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              A powerful and simple JavaScript HTML5 canvas library with SVG parsing capabilities.
            </p>
            <a href="http://fabricjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              http://fabricjs.com/
            </a>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Konva.js</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              2D canvas library with object model, event handling, and animations.
            </p>
            <a href="https://konvajs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
              https://konvajs.org/
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="flex justify-between items-center px-4 py-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/html/youtube"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded shadow flex items-center gap-2"
        >
          &lt; Previous: YouTube Embeds
        </Link>
        <Link
          href="/html/svg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded shadow flex items-center gap-2"
        >
          Next: HTML SVG &gt;
        </Link>
      </section>
    </div>
  );
}