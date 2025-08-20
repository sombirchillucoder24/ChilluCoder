"use client";

import {
  FaMicrochip,
  // FaServer,
  // FaDesktop,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  // FaCode,
  // FaHashtag,
  FaThermometerHalf,
  FaBolt,
  FaClock,
  FaGamepad,
  FaChartLine,
  FaMemory,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface GPUSpec {
  name: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

interface GPUExample {
  title: string;
  description: string;
  html: string;
  css: string;
  js?: string;
  usage: string;
  features?: string[];
}

export default function GPUArticle() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    architecture: true,
    performance: true,
    cooling: true,
    programming: true,
  });
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [readingTime, setReadingTime] = useState(0);
  const [selectedGPU, setSelectedGPU] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const text = document.querySelector("main")?.textContent || "";
    const words = text.trim().split(/\s+/).length;
    setReadingTime(Math.ceil(words / 200));
  }, []);

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

  const renderCodeExample = (
    htmlCode: string,
    cssCode: string,
    jsCode: string = "",
    name: string
  ) => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "html"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "css"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
          {jsCode && (
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "js"
                  ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("js")}
            >
              JavaScript
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-auto">
          <CodeEditor
            value={
              activeTab === "html"
                ? htmlCode
                : activeTab === "css"
                ? cssCode
                : jsCode
            }
            language={
              activeTab === "html"
                ? "html"
                : activeTab === "css"
                ? "css"
                : "javascript"
            }
            padding={12}
            style={{
              fontSize: 13,
              backgroundColor: "#f8fafc",
              fontFamily:
                "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
            }}
            className="dark:bg-gray-900 dark:text-gray-200"
            readOnly
          />
        </div>

        <div className="flex justify-end gap-2 p-3 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() =>
              handleOpenEditor(
                `${htmlCode}\n\n<style>${cssCode}</style>\n\n<script>${jsCode}</script>`
              )
            }
            className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            <FaPlay size={10} className="inline mr-1" /> Try
          </button>
          <button
            onClick={() =>
              copyToClipboard(
                activeTab === "html"
                  ? htmlCode
                  : activeTab === "css"
                  ? cssCode
                  : jsCode,
                name
              )
            }
            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {copied === name ? (
              <FaCheck size={10} className="inline mr-1 text-green-500" />
            ) : (
              <FaCopy size={10} className="inline mr-1" />
            )}
            Copy
          </button>
        </div>
      </div>
    );
  };

  const gpuSpecs: GPUSpec[] = [
    {
      name: "CUDA Cores",
      value: "1,000 - 18,000+",
      description: "Parallel processors for graphics and compute tasks",
      icon: <FaMicrochip className="text-blue-500" />,
    },
    {
      name: "Memory",
      value: "4GB - 48GB GDDR6",
      description: "High-speed video memory for textures and buffers",
      icon: <FaMemory className="text-purple-500" />,
    },
    {
      name: "Memory Bus",
      value: "64-bit - 384-bit",
      description: "Width of memory interface affecting bandwidth",
      icon: <FaChartLine className="text-green-500" />,
    },
    {
      name: "Clock Speed",
      value: "1.0 - 2.5 GHz",
      description: "Processing frequency of GPU cores",
      icon: <FaClock className="text-yellow-500" />,
    },
    {
      name: "TDP",
      value: "75W - 450W",
      description: "Thermal Design Power - maximum heat generated under load",
      icon: <FaThermometerHalf className="text-red-500" />,
    },
    {
      name: "Architecture",
      value: "RDNA, Ampere, Ada",
      description: "Microarchitecture design generation",
      icon: <FaBolt className="text-indigo-500" />,
    },
  ];

  const gpuTypes = [
    {
      name: "NVIDIA RTX 4090",
      category: "High-End Gaming",
      specs: "16,384 CUDA cores, 24GB GDDR6X",
      color: "from-green-500 to-green-700",
    },
    {
      name: "AMD RX 7900 XTX",
      category: "High-End Gaming",
      specs: "6,144 Stream Processors, 24GB GDDR6",
      color: "from-red-500 to-red-700",
    },
    {
      name: "NVIDIA RTX A6000",
      category: "Workstation",
      specs: "10,752 CUDA cores, 48GB GDDR6",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Intel Arc A770",
      category: "Mainstream",
      specs: "4,096 Xe cores, 16GB GDDR6",
      color: "from-purple-500 to-purple-700",
    },
  ];

  const overviewExamples: GPUExample[] = [
    {
      title: "GPU Architecture Diagram",
      description: "Interactive visualization of GPU components and rendering pipeline",
      html: `<div class="gpu-diagram">
  <div class="gpu-container">
    <div class="gpu-component shader-cores" data-info="Shader Cores: Parallel processors for graphics/compute">
      <div class="component-label">Shader Cores</div>
      <div class="core-grid">
        <div class="core"></div><div class="core"></div><div class="core"></div>
        <div class="core"></div><div class="core"></div><div class="core"></div>
      </div>
    </div>
    <div class="gpu-component rt-cores" data-info="RT Cores: Dedicated hardware for ray tracing">
      <div class="component-label">RT Cores</div>
      <div class="rt-core"></div>
    </div>
    <div class="gpu-component tensor-cores" data-info="Tensor Cores: AI acceleration for DLSS and more">
      <div class="component-label">Tensor Cores</div>
      <div class="tensor-core"></div>
    </div>
    <div class="gpu-component vram" data-info="VRAM: High-speed memory for textures and buffers">
      <div class="component-label">24GB GDDR6X</div>
    </div>
    <div class="gpu-component memory-controller" data-info="Memory Controller: Manages VRAM access">
      <div class="component-label">Memory Controller</div>
    </div>
    <div class="gpu-component display-engine" data-info="Display Engine: Outputs video signal to monitors">
      <div class="component-label">Display Engine</div>
    </div>
  </div>
  <div class="info-panel">
    <h4>Component Information</h4>
    <p id="component-info">Hover over components to learn more</p>
  </div>
</div>`,
      css: `.gpu-diagram {
  max-width: 900px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.gpu-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 120px);
  gap: 15px;
  padding: 25px;
  background: linear-gradient(135deg, #434343 0%, #000000 100%);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.gpu-component {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.gpu-component:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 20px rgba(255,255,255,0.1);
}

.component-label {
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
  font-size: 0.9em;
  text-align: center;
}

.shader-cores {
  grid-column: 1 / 3;
  grid-row: 1;
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
}

.core-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
}

.core {
  height: 15px;
  background: rgba(255,255,255,0.7);
  border-radius: 2px;
}

.rt-cores {
  grid-column: 3;
  grid-row: 1;
  background: linear-gradient(45deg, #f12711, #f5af19);
}

.rt-core {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.7);
  border-radius: 50%;
}

.tensor-cores {
  grid-column: 3;
  grid-row: 2;
  background: linear-gradient(45deg, #56ab2f, #a8e063);
}

.tensor-core {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.7);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.vram {
  grid-column: 1;
  grid-row: 2 / 4;
  background: linear-gradient(45deg, #8e2de2, #4a00e0);
  justify-content: flex-start;
}

.memory-controller {
  grid-column: 2;
  grid-row: 2;
  background: linear-gradient(45deg, #f46b45, #eea849);
}

.display-engine {
  grid-column: 2 / 4;
  grid-row: 3;
  background: linear-gradient(45deg, #0052d9, #4364f7);
}

.info-panel {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.info-panel h4 {
  margin: 0 0 10px 0;
  color: #333;
}

#component-info {
  margin: 0;
  color: #666;
  font-size: 0.9em;
}`,
      js: `document.addEventListener('DOMContentLoaded', function() {
  const components = document.querySelectorAll('[data-info]');
  const infoDisplay = document.getElementById('component-info');
  
  components.forEach(component => {
    component.addEventListener('mouseenter', function() {
      const info = this.getAttribute('data-info');
      infoDisplay.textContent = info;
      infoDisplay.style.color = '#2563eb';
    });
    
    component.addEventListener('mouseleave', function() {
      infoDisplay.textContent = 'Hover over components to learn more';
      infoDisplay.style.color = '#666';
    });
  });
});`,
      usage: "Interactive diagram showing GPU architecture and component relationships",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-2">
          GPU (Graphics Processing Unit) Guide
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Master GPU architecture, performance, and optimization with interactive examples
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-2">⏱️ Reading time: {readingTime} min</span>
            <span className="px-2">•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      <section className="mb-8 bg-purple-50 dark:bg-gray-800 p-6 rounded-xl border border-purple-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaGamepad className="text-purple-500" />
              GPU Architecture & Performance Guide
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Explore GPU technology, from rendering pipelines to parallel computing.
                Learn how graphics processors work and how to optimize their performance
                for gaming, content creation, and scientific computing.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Understanding GPU architecture and rendering pipelines</li>
                <li>Performance benchmarking and comparison tools</li>
                <li>Thermal management and cooling solutions</li>
                <li>Programming techniques for GPU optimization</li>
                <li>Ray tracing and AI acceleration features</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {gpuTypes.map((gpu, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg bg-gradient-to-br ${gpu.color} text-white cursor-pointer transform hover:scale-105 transition-all`}
                onClick={() => setSelectedGPU(selectedGPU === gpu.name ? null : gpu.name)}
              >
                <h4 className="font-bold text-sm mb-1">{gpu.name}</h4>
                <p className="text-xs opacity-90">{gpu.category}</p>
                {selectedGPU === gpu.name && (
                  <p className="text-xs mt-2 opacity-80">{gpu.specs}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaMicrochip className="text-blue-500" />
          GPU Key Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gpuSpecs.map((spec, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                {spec.icon}
                <h3 className="text-xl font-bold text-blue-400">{spec.name}</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{spec.value}</p>
              <p className="text-gray-300 text-sm">{spec.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("overview")}
          aria-expanded={expandedSections["overview"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaMicrochip className="text-purple-500" />
            GPU Architecture & Design
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["overview"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["overview"] && (
          <div className="space-y-8">
            {overviewExamples.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
                <div className="p-4">
                  {renderCodeExample(item.html, item.css, item.js || "", item.title)}
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <strong>Usage:</strong> {item.usage}
                  </div>
                  <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Live Preview</h4>
                    <div 
                      dangerouslySetInnerHTML={{ __html: item.html }}
                      className="preview-container"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="flex justify-between items-center px-4 py-6 border-t">
        <Link
          href="/hardware/cpu"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        <Link
          href="/hardware/ram"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}