"use client"
import {
  FaMemory,
  FaMicrochip,
  FaBolt,
  FaCopy,
  FaCheck,
  // FaChevronDown,
  FaPlay,
  FaCode,
  FaHashtag,
  FaClock,
  FaServer,
  FaDesktop,
  FaThermometerHalf,
} from "react-icons/fa";
import { useState, useEffect } from "react";

interface RAMSpec {
  name: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

interface RAMExample {
  title: string;
  description: string;
  html: string;
  css: string;
  js?: string;
  usage: string;
  features?: string[];
}

export default function RAMArticle() {
  const [copied, setCopied] = useState<string | null>(null);
  // const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
  //   overview: true,
  //   types: true,
  //   performance: true,
  //   optimization: true,
  //   troubleshooting: true,
  // });
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [readingTime, setReadingTime] = useState(0);
  const [selectedRAM, setSelectedRAM] = useState<string | null>(null);

  useEffect(() => {
    const text = document.querySelector("main")?.textContent || "";
    const words = text.trim().split(/\s+/).length;
    setReadingTime(Math.ceil(words / 200));
  }, []);

  const handleOpenEditor = (code: string) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(code);
      newWindow.document.close();
    }
  };

  // const toggleSection = (section: string) => {
  //   setExpandedSections((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],
  //   }));
  // };

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
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "html"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "css"
                ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
          {jsCode && (
            <button
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === "js"
                  ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("js")}
            >
              JavaScript
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-auto">
          <pre className="p-4 text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-x-auto font-mono">
            <code>
              {activeTab === "html"
                ? htmlCode
                : activeTab === "css"
                  ? cssCode
                  : jsCode}
            </code>
          </pre>
        </div>

        <div className="flex justify-end gap-2 p-3 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() =>
              handleOpenEditor(
                `<!DOCTYPE html>
<html>
<head>
<style>${cssCode}</style>
</head>
<body>
${htmlCode}
<script>${jsCode}</script>
</body>
</html>`
              )
            }
            className="text-xs px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-1"
          >
            <FaPlay size={10} /> Try
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
            className="text-xs px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
          >
            {copied === name ? (
              <FaCheck size={10} className="text-green-500" />
            ) : (
              <FaCopy size={10} />
            )}
            Copy
          </button>
        </div>
      </div>
    );
  };

  const ramSpecs: RAMSpec[] = [
    {
      name: "Capacity",
      value: "4GB - 128GB+",
      description: "Total amount of data that can be stored in memory",
      icon: <FaMemory className="text-blue-500" />
    },
    {
      name: "Speed",
      value: "2133 - 6400 MHz",
      description: "Data transfer rate measured in megatransfers per second",
      icon: <FaBolt className="text-yellow-500" />
    },
    {
      name: "Latency",
      value: "CL14 - CL40",
      description: "Delay between memory request and data availability (CAS Latency)",
      icon: <FaClock className="text-red-500" />
    },
    {
      name: "Voltage",
      value: "1.2V - 1.65V",
      description: "Electrical power requirement for memory operation",
      icon: <FaThermometerHalf className="text-green-500" />
    },
    {
      name: "Form Factor",
      value: "DIMM, SO-DIMM",
      description: "Physical size and pin configuration of memory modules",
      icon: <FaDesktop className="text-purple-500" />
    },
    {
      name: "Channels",
      value: "Single, Dual, Quad",
      description: "Number of parallel data pathways to memory controller",
      icon: <FaServer className="text-indigo-500" />
    }
  ];

  const ramTypes = [
    {
      name: "DDR4-3200",
      category: "Mainstream",
      specs: "32GB, CL16, 1.35V",
      color: "from-blue-500 to-blue-700",
      description: "Most common for current systems"
    },
    {
      name: "DDR5-5600",
      category: "High Performance", 
      specs: "32GB, CL36, 1.25V",
      color: "from-purple-500 to-purple-700",
      description: "Latest generation with improved efficiency"
    },
    {
      name: "DDR4-4000",
      category: "Gaming/Enthusiast",
      specs: "16GB, CL18, 1.4V",
      color: "from-red-500 to-red-700",
      description: "Optimized for gaming performance"
    },
    {
      name: "ECC DDR4",
      category: "Server/Workstation",
      specs: "64GB, CL22, 1.2V",
      color: "from-gray-500 to-gray-700",
      description: "Error-correcting for mission-critical applications"
    }
  ];

  const overviewExamples: RAMExample[] = [
    {
      title: "RAM Memory Visualization",
      description: "Interactive memory allocation and access pattern simulator",
      html: `<div class="memory-container">
  <div class="memory-header">
    <h3>RAM Memory Simulator</h3>
    <div class="memory-stats">
      <span>Total: <span id="total-memory">8GB</span></span>
      <span>Used: <span id="used-memory">3.2GB</span></span>
      <span>Free: <span id="free-memory">4.8GB</span></span>
    </div>
  </div>
  
  <div class="memory-grid" id="memory-grid">
    <!-- Memory blocks will be generated by JavaScript -->
  </div>
  
  <div class="memory-controls">
    <button onclick="allocateMemory()" class="btn-primary">Allocate Memory</button>
    <button onclick="deallocateMemory()" class="btn-secondary">Free Memory</button>
    <button onclick="clearMemory()" class="btn-danger">Clear All</button>
    <button onclick="fragmentMemory()" class="btn-warning">Fragment</button>
  </div>
  
  <div class="memory-info">
    <div class="info-card">
      <h4>Memory Types</h4>
      <div class="legend">
        <div class="legend-item">
          <div class="color-box free"></div>
          <span>Free</span>
        </div>
        <div class="legend-item">
          <div class="color-box allocated"></div>
          <span>Allocated</span>
        </div>
        <div class="legend-item">
          <div class="color-box system"></div>
          <span>System</span>
        </div>
        <div class="legend-item">
          <div class="color-box cache"></div>
          <span>Cache</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.memory-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 25px;
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  border-radius: 15px;
  color: white;
  font-family: 'Segoe UI', sans-serif;
}

.memory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.memory-header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #4fd1c7;
}

.memory-stats {
  display: flex;
  gap: 20px;
  font-size: 0.9em;
}

.memory-stats span {
  padding: 5px 10px;
  background: rgba(255,255,255,0.1);
  border-radius: 5px;
}

.memory-grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 4px;
  margin-bottom: 25px;
  padding: 20px;
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
}

.memory-block {
  width: 100%;
  height: 30px;
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7em;
  font-weight: bold;
}

.memory-block.free {
  background: linear-gradient(45deg, #68d391, #48bb78);
}

.memory-block.allocated {
  background: linear-gradient(45deg, #fc8181, #f56565);
}

.memory-block.system {
  background: linear-gradient(45deg, #63b3ed, #4299e1);
}

.memory-block.cache {
  background: linear-gradient(45deg, #fbb6ce, #f687b3);
}

.memory-block:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.memory-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary, .btn-danger, .btn-warning {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.btn-primary {
  background: linear-gradient(45deg, #4299e1, #3182ce);
  color: white;
}

.btn-secondary {
  background: linear-gradient(45deg, #68d391, #48bb78);
  color: white;
}

.btn-danger {
  background: linear-gradient(45deg, #fc8181, #f56565);
  color: white;
}

.btn-warning {
  background: linear-gradient(45deg, #f6ad55, #ed8936);
  color: white;
}

.btn-primary:hover, .btn-secondary:hover, .btn-danger:hover, .btn-warning:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.memory-info {
  background: rgba(255,255,255,0.05);
  border-radius: 10px;
  padding: 20px;
}

.info-card h4 {
  margin: 0 0 15px 0;
  color: #4fd1c7;
}

.legend {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid rgba(255,255,255,0.2);
}

.color-box.free {
  background: linear-gradient(45deg, #68d391, #48bb78);
}

.color-box.allocated {
  background: linear-gradient(45deg, #fc8181, #f56565);
}

.color-box.system {
  background: linear-gradient(45deg, #63b3ed, #4299e1);
}

.color-box.cache {
  background: linear-gradient(45deg, #fbb6ce, #f687b3);
}`,
      js: `let memoryBlocks = [];
let totalBlocks = 128;
let usedBlocks = 0;

function initializeMemory() {
  const grid = document.getElementById('memory-grid');
  grid.innerHTML = '';
  memoryBlocks = [];
  
  for (let i = 0; i < totalBlocks; i++) {
    const block = document.createElement('div');
    block.className = 'memory-block free';
    block.textContent = i.toString(16).toUpperCase().padStart(2, '0');
    block.onclick = () => toggleBlock(i);
    grid.appendChild(block);
    memoryBlocks.push('free');
  }
  
  // Initialize some system memory
  for (let i = 0; i < 16; i++) {
    memoryBlocks[i] = 'system';
    grid.children[i].className = 'memory-block system';
  }
  
  updateMemoryStats();
}

function toggleBlock(index) {
  const block = document.getElementById('memory-grid').children[index];
  
  if (memoryBlocks[index] === 'free') {
    memoryBlocks[index] = 'allocated';
    block.className = 'memory-block allocated';
  } else if (memoryBlocks[index] === 'allocated') {
    memoryBlocks[index] = 'free';
    block.className = 'memory-block free';
  }
  
  updateMemoryStats();
}

function allocateMemory() {
  let allocated = 0;
  const targetAllocation = Math.floor(Math.random() * 8) + 4;
  
  for (let i = 16; i < totalBlocks && allocated < targetAllocation; i++) {
    if (memoryBlocks[i] === 'free') {
      memoryBlocks[i] = 'allocated';
      document.getElementById('memory-grid').children[i].className = 'memory-block allocated';
      allocated++;
    }
  }
  
  updateMemoryStats();
}

function deallocateMemory() {
  const allocatedIndices = [];
  for (let i = 0; i < totalBlocks; i++) {
    if (memoryBlocks[i] === 'allocated') {
      allocatedIndices.push(i);
    }
  }
  
  const toFree = Math.min(Math.floor(Math.random() * 6) + 2, allocatedIndices.length);
  
  for (let i = 0; i < toFree; i++) {
    const randomIndex = allocatedIndices[Math.floor(Math.random() * allocatedIndices.length)];
    memoryBlocks[randomIndex] = 'free';
    document.getElementById('memory-grid').children[randomIndex].className = 'memory-block free';
    allocatedIndices.splice(allocatedIndices.indexOf(randomIndex), 1);
  }
  
  updateMemoryStats();
}

function clearMemory() {
  for (let i = 16; i < totalBlocks; i++) {
    if (memoryBlocks[i] !== 'system') {
      memoryBlocks[i] = 'free';
      document.getElementById('memory-grid').children[i].className = 'memory-block free';
    }
  }
  updateMemoryStats();
}

function fragmentMemory() {
  // Create cache blocks randomly
  for (let i = 16; i < totalBlocks; i++) {
    if (memoryBlocks[i] === 'free' && Math.random() < 0.15) {
      memoryBlocks[i] = 'cache';
      document.getElementById('memory-grid').children[i].className = 'memory-block cache';
    }
  }
  updateMemoryStats();
}

function updateMemoryStats() {
  const systemBlocks = memoryBlocks.filter(block => block === 'system').length;
  const allocatedBlocks = memoryBlocks.filter(block => block === 'allocated').length;
  const cacheBlocks = memoryBlocks.filter(block => block === 'cache').length;
  const freeBlocks = memoryBlocks.filter(block => block === 'free').length;
  
  const totalGB = (totalBlocks * 64) / 1024; // Assuming 64MB per block
  const usedGB = ((systemBlocks + allocatedBlocks + cacheBlocks) * 64) / 1024;
  const freeGB = (freeBlocks * 64) / 1024;
  
  document.getElementById('total-memory').textContent = totalGB.toFixed(1) + 'GB';
  document.getElementById('used-memory').textContent = usedGB.toFixed(1) + 'GB';
  document.getElementById('free-memory').textContent = freeGB.toFixed(1) + 'GB';
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeMemory);`,
      usage: "Interactive memory allocation simulator showing how RAM is managed by the operating system"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaMemory className="text-4xl text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Understanding RAM Memory
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive guide to Random Access Memory (RAM) - the high-speed volatile storage that serves as your computer&apos;s working space
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaClock /> {readingTime} min read
            </span>
            <span className="flex items-center gap-1">
              <FaCode /> Interactive Examples
            </span>
          </div>
        </header>

        {/* RAM Specifications Overview */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaMicrochip className="text-blue-600" />
              RAM Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ramSpecs.map((spec, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedRAM(selectedRAM === spec.name ? null : spec.name)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {spec.icon}
                    <h3 className="font-semibold text-lg">{spec.name}</h3>
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{spec.value}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{spec.description}</p>
                  {selectedRAM === spec.name && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Click to learn more about {spec.name.toLowerCase()} specifications and how they impact system performance.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RAM Types */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">RAM Types & Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ramTypes.map((ram, index) => (
                <div key={index} className="relative overflow-hidden rounded-xl">
                  <div className={`absolute inset-0 bg-gradient-to-r ${ram.color} opacity-10`}></div>
                  <div className="relative p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{ram.name}</h3>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium">
                        {ram.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{ram.description}</p>
                    <div className="flex items-center gap-2">
                      <FaMicrochip className="text-gray-500" />
                      <span className="text-sm font-medium">{ram.specs}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FaPlay className="text-green-600" />
              Interactive RAM Demonstrations
            </h2>
            
            {overviewExamples.map((example, index) => (
              <div key={index} className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <FaHashtag className="text-blue-600" />
                  <h3 className="text-xl font-semibold">{example.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{example.description}</p>
                
                {renderCodeExample(example.html, example.css, example.js || "", example.title)}
                
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Usage:</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{example.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Key RAM Concepts</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold mb-2">Volatile vs Non-Volatile Memory</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  RAM is volatile memory, meaning it loses all data when power is removed. This is different from storage devices like SSDs or hard drives, which retain data without power.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold mb-2">Memory Hierarchy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  RAM sits between the CPU cache (faster, smaller) and storage (slower, larger) in the memory hierarchy, providing a balance of speed and capacity for active programs.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold mb-2">Virtual Memory</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  When RAM is full, the operating system uses virtual memory (swap space) on storage devices to extend available memory, though at significantly reduced performance.
                </p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-lg font-semibold mb-2">Memory Bandwidth vs Latency</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Bandwidth measures how much data can be transferred per second, while latency measures the delay before transfer begins. Both are crucial for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Impact */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">RAM Performance Impact</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaBolt className="text-yellow-500" />
                  Performance Factors
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <div>
                      <strong>Capacity:</strong> More RAM allows running more applications simultaneously without swapping to disk
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <div>
                      <strong>Speed:</strong> Higher MHz ratings provide faster data transfer rates
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <div>
                      <strong>Dual Channel:</strong> Using matched pairs enables parallel data access, doubling effective bandwidth
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <div>
                      <strong>Timings:</strong> Lower CAS latency (CL) values reduce memory access delays
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FaServer className="text-green-500" />
                  Optimization Tips
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <div>
                      <strong>XMP Profiles:</strong> Enable XMP in BIOS to run RAM at rated speeds
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <div>
                      <strong>Memory Testing:</strong> Use MemTest86 to verify RAM stability after overclocking
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <div>
                      <strong>Capacity Planning:</strong> Monitor RAM usage to determine if upgrades are needed
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <div>
                      <strong>Compatibility:</strong> Check motherboard QVL for supported RAM modules
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">RAM Troubleshooting</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">Common Issues</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">System Crashes/BSODs</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Often caused by faulty RAM modules or incompatible timings
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">Boot Failures</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      May indicate unseated modules or incompatible configurations
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">Performance Issues</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Could be due to single-channel mode or incorrect speeds
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 dark:text-red-300 mb-2">Memory Errors</h4>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Corrupted data or application crashes from failing memory
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">Diagnostic Steps</h3>
                <ol className="space-y-2 text-sm text-green-700 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>Run Windows Memory Diagnostic or MemTest86 for comprehensive testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>Check BIOS/UEFI for proper RAM detection and configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>Verify modules are properly seated in correct slots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">4.</span>
                    <span>Test each module individually to isolate faulty hardware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">5.</span>
                    <span>Reset BIOS settings to defaults if overclocking is suspected</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Future Technologies */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Future RAM Technologies</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">DDR5 Evolution</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
                  Next-generation DDR5 will push speeds beyond 6400 MHz with improved power efficiency and on-die ECC.
                </p>
                <ul className="text-xs text-purple-600 dark:text-purple-400 space-y-1">
                  <li>• Higher bandwidth capabilities</li>
                  <li>• Better power management</li>
                  <li>• Enhanced reliability features</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">3D Stacked Memory</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  HBM (High Bandwidth Memory) and other 3D technologies offer massive bandwidth increases for specialized applications.
                </p>
                <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                  <li>• Vertical memory stacking</li>
                  <li>• Ultra-high bandwidth</li>
                  <li>• Compact form factors</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-200">Non-Volatile RAM</h3>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                  Technologies like 3D XPoint aim to bridge the gap between RAM and storage with persistent memory.
                </p>
                <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                  <li>• Persistent across power cycles</li>
                  <li>• Near-RAM performance</li>
                  <li>• Storage-class memory</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">RAM Best Practices</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">For Gamers</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span>16GB DDR4-3200 or faster for modern games</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span>Dual-channel configuration for optimal performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span>Enable XMP profiles for rated speeds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span>Consider 32GB for content creation and future-proofing</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-purple-600">For Professionals</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span>32GB+ for video editing, 3D rendering, and CAD work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span>ECC memory for mission-critical applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span>Registered DIMMs for high-capacity configurations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={12} />
                    <span>Consider workstation-grade platforms for maximum capacity</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Understanding RAM is crucial for optimizing system performance. Whether you&apos;re building a gaming rig, workstation, or server, 
            choosing the right memory configuration can significantly impact your computing experience.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Top
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}