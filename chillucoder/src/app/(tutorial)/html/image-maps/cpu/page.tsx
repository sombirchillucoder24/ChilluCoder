"use client";

import {
  FaMicrochip,
  FaServer,
  FaDesktop,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaCode,
  FaHashtag,
  FaThermometerHalf,
  FaBolt,
  FaClock,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CPUSpec {
  name: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

interface CPUExample {
  title: string;
  description: string;
  html: string;
  css: string;
  js?: string;
  usage: string;
  features?: string[];
}

export default function CPUArticle() {
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
  const [selectedCPU, setSelectedCPU] = useState<string | null>(null);

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

  const cpuSpecs: CPUSpec[] = [
    {
      name: "Clock Speed",
      value: "3.2 - 5.8 GHz",
      description: "Processing frequency measured in billions of cycles per second",
      icon: <FaClock className="text-blue-500" />
    },
    {
      name: "Cores",
      value: "2 - 128+",
      description: "Independent processing units that can execute instructions",
      icon: <FaMicrochip className="text-green-500" />
    },
    {
      name: "Cache",
      value: "8MB - 256MB",
      description: "High-speed memory for storing frequently accessed data",
      icon: <FaServer className="text-purple-500" />
    },
    {
      name: "TDP",
      value: "15W - 280W",
      description: "Thermal Design Power - maximum heat generated under load",
      icon: <FaThermometerHalf className="text-red-500" />
    },
    {
      name: "Architecture",
      value: "7nm - 3nm",
      description: "Manufacturing process node size affecting performance and efficiency",
      icon: <FaBolt className="text-yellow-500" />
    },
    {
      name: "Socket",
      value: "LGA, PGA, BGA",
      description: "Physical interface connecting CPU to motherboard",
      icon: <FaDesktop className="text-indigo-500" />
    }
  ];

  const cpuTypes = [
    {
      name: "Intel Core i9-13900K",
      category: "High-End Desktop",
      specs: "24 cores, 32 threads, 5.8 GHz boost",
      color: "from-blue-500 to-blue-700"
    },
    {
      name: "AMD Ryzen 9 7950X",
      category: "High-End Desktop", 
      specs: "16 cores, 32 threads, 5.7 GHz boost",
      color: "from-red-500 to-red-700"
    },
    {
      name: "Apple M2 Ultra",
      category: "ARM System-on-Chip",
      specs: "24 cores, unified memory, 3.49 GHz",
      color: "from-gray-500 to-gray-700"
    },
    {
      name: "Intel Xeon Platinum",
      category: "Server/Workstation",
      specs: "56 cores, 112 threads, enterprise features",
      color: "from-purple-500 to-purple-700"
    }
  ];

  const overviewExamples: CPUExample[] = [
    {
      title: "CPU Architecture Diagram",
      description: "Interactive visualization of CPU components and data flow",
      html: `<!-- CPU Architecture Interactive Diagram -->
<div class="cpu-diagram">
  <div class="cpu-container">
    <div class="cpu-core core-1" data-info="Core 1: Arithmetic Logic Unit">
      <div class="core-label">Core 1</div>
      <div class="alu">ALU</div>
    </div>
    <div class="cpu-core core-2" data-info="Core 2: Control Unit">
      <div class="core-label">Core 2</div>
      <div class="cu">CU</div>
    </div>
    <div class="cache l1" data-info="L1 Cache: Fastest, smallest cache">L1 Cache</div>
    <div class="cache l2" data-info="L2 Cache: Medium speed and size">L2 Cache</div>
    <div class="cache l3" data-info="L3 Cache: Shared between cores">L3 Cache</div>
    <div class="memory-controller" data-info="Memory Controller: Manages RAM access">
      Memory Controller
    </div>
  </div>
  <div class="info-panel">
    <h4>Component Information</h4>
    <p id="component-info">Hover over components to learn more</p>
  </div>
</div>`,
      css: `.cpu-diagram {
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}

.cpu-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 80px);
  gap: 10px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.cpu-core {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.cpu-core:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255,107,107,0.4);
}

.core-label {
  font-size: 0.8em;
  margin-bottom: 5px;
}

.alu, .cu {
  font-size: 0.7em;
  padding: 2px 6px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
}

.cache {
  background: linear-gradient(45deg, #48cae4, #0096c7);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cache:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(72,202,228,0.4);
}

.l1 { grid-column: 1; grid-row: 2; }
.l2 { grid-column: 2; grid-row: 2; }
.l3 { grid-column: 3 / 5; grid-row: 2; }

.memory-controller {
  grid-column: 1 / 5;
  grid-row: 3;
  background: linear-gradient(45deg, #845ec2, #b39bc8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.memory-controller:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 15px rgba(132,94,194,0.4);
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
      js: `// Interactive CPU diagram functionality
document.addEventListener('DOMContentLoaded', function() {
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
      usage: "Interactive diagram showing CPU architecture and component relationships"
    },
    {
      title: "CPU Performance Monitor",
      description: "Real-time CPU usage visualization with animated charts",
      html: `<!-- CPU Performance Monitor -->
<div class="performance-monitor">
  <div class="monitor-header">
    <h3>CPU Performance Monitor</h3>
    <div class="status-indicator">
      <span class="status-dot"></span>
      <span>Live Monitoring</span>
    </div>
  </div>
  
  <div class="metrics-grid">
    <div class="metric-card">
      <div class="metric-icon">🔥</div>
      <div class="metric-info">
        <div class="metric-label">CPU Usage</div>
        <div class="metric-value" id="cpu-usage">45%</div>
        <div class="metric-bar">
          <div class="metric-fill" id="cpu-bar"></div>
        </div>
      </div>
    </div>
    
    <div class="metric-card">
      <div class="metric-icon">🌡️</div>
      <div class="metric-info">
        <div class="metric-label">Temperature</div>
        <div class="metric-value" id="cpu-temp">68°C</div>
        <div class="metric-bar">
          <div class="metric-fill temp-fill" id="temp-bar"></div>
        </div>
      </div>
    </div>
    
    <div class="metric-card">
      <div class="metric-icon">⚡</div>
      <div class="metric-info">
        <div class="metric-label">Clock Speed</div>
        <div class="metric-value" id="cpu-clock">3.2 GHz</div>
        <div class="metric-bar">
          <div class="metric-fill clock-fill" id="clock-bar"></div>
        </div>
      </div>
    </div>
    
    <div class="metric-card">
      <div class="metric-icon">💾</div>
      <div class="metric-info">
        <div class="metric-label">Cache Hit Rate</div>
        <div class="metric-value" id="cache-hit">94%</div>
        <div class="metric-bar">
          <div class="metric-fill cache-fill" id="cache-bar"></div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="core-status">
    <h4>Core Status</h4>
    <div class="cores-grid">
      <div class="core-item" data-core="0">Core 0</div>
      <div class="core-item" data-core="1">Core 1</div>
      <div class="core-item" data-core="2">Core 2</div>
      <div class="core-item" data-core="3">Core 3</div>
    </div>
  </div>
</div>`,
      css: `.performance-monitor {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 15px;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.monitor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.monitor-header h3 {
  margin: 0;
  font-size: 1.5em;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff00;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

.metric-card {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  gap: 15px;
}

.metric-icon {
  font-size: 2em;
}

.metric-info {
  flex: 1;
}

.metric-label {
  font-size: 0.8em;
  opacity: 0.8;
  margin-bottom: 5px;
}

.metric-value {
  font-size: 1.4em;
  font-weight: bold;
  margin-bottom: 8px;
}

.metric-bar {
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.2);
  border-radius: 3px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
  background: linear-gradient(90deg, #00ff88, #00cc6a);
}

.temp-fill {
  background: linear-gradient(90deg, #ff6b6b, #ff5252);
}

.clock-fill {
  background: linear-gradient(90deg, #4ecdc4, #44a08d);
}

.cache-fill {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.core-status h4 {
  margin: 0 0 15px 0;
}

.cores-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.core-item {
  padding: 10px;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  text-align: center;
  font-size: 0.9em;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.core-item:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

.core-item.active {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border-color: #ff6b6b;
}`,
      js: `// CPU Performance Monitor Simulation
document.addEventListener('DOMContentLoaded', function() {
  const cpuUsage = document.getElementById('cpu-usage');
  const cpuBar = document.getElementById('cpu-bar');
  const cpuTemp = document.getElementById('cpu-temp');
  const tempBar = document.getElementById('temp-bar');
  const cpuClock = document.getElementById('cpu-clock');
  const clockBar = document.getElementById('clock-bar');
  const cacheHit = document.getElementById('cache-hit');
  const cacheBar = document.getElementById('cache-bar');
  const cores = document.querySelectorAll('.core-item');
  
  function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function updateMetrics() {
    // CPU Usage (0-100%)
    const usage = getRandomValue(20, 85);
    cpuUsage.textContent = usage + '%';
    cpuBar.style.width = usage + '%';
    
    // Temperature (40-85°C)
    const temp = getRandomValue(45, 80);
    cpuTemp.textContent = temp + '°C';
    tempBar.style.width = ((temp - 40) / 45) * 100 + '%';
    
    // Clock Speed (2.8-4.2 GHz)
    const clock = (getRandomValue(28, 42) / 10).toFixed(1);
    cpuClock.textContent = clock + ' GHz';
    clockBar.style.width = ((parseFloat(clock) - 2.8) / 1.4) * 100 + '%';
    
    // Cache Hit Rate (85-98%)
    const cache = getRandomValue(88, 97);
    cacheHit.textContent = cache + '%';
    cacheBar.style.width = ((cache - 85) / 13) * 100 + '%';
    
    // Randomly activate cores
    cores.forEach((core, index) => {
      if (Math.random() > 0.3) {
        core.classList.add('active');
      } else {
        core.classList.remove('active');
      }
    });
  }
  
  // Update metrics every 2 seconds
  updateMetrics();
  setInterval(updateMetrics, 2000);
  
  // Core click handlers
  cores.forEach(core => {
    core.addEventListener('click', function() {
      const coreNum = this.getAttribute('data-core');
      alert('Core ' + coreNum + ' details:\\nStatus: Active\\nUsage: ' + getRandomValue(20, 90) + '%\\nTemp: ' + getRandomValue(50, 75) + '°C');
    });
  });
});`,
      usage: "Live monitoring dashboard for CPU performance metrics and core status"
    }
  ];

  const architectureExamples: CPUExample[] = [
    {
      title: "CPU Instruction Pipeline",
      description: "Visualization of instruction execution stages",
      html: `<!-- CPU Pipeline Visualization -->
<div class="pipeline-container">
  <h3>CPU Instruction Pipeline</h3>
  <div class="pipeline-stages">
    <div class="stage fetch">
      <div class="stage-name">Fetch</div>
      <div class="stage-desc">Get instruction from memory</div>
      <div class="instruction" id="fetch-inst">MOV AX, BX</div>
    </div>
    <div class="pipeline-arrow">→</div>
    
    <div class="stage decode">
      <div class="stage-name">Decode</div>
      <div class="stage-desc">Interpret instruction</div>
      <div class="instruction" id="decode-inst">ADD CX, DX</div>
    </div>
    <div class="pipeline-arrow">→</div>
    
    <div class="stage execute">
      <div class="stage-name">Execute</div>
      <div class="stage-desc">Perform operation</div>
      <div class="instruction" id="execute-inst">JMP 100h</div>
    </div>
    <div class="pipeline-arrow">→</div>
    
    <div class="stage writeback">
      <div class="stage-name">Write Back</div>
      <div class="stage-desc">Store result</div>
      <div class="instruction" id="writeback-inst">CMP AL, 0</div>
    </div>
  </div>
  
  <div class="pipeline-controls">
    <button onclick="startPipeline()" class="control-btn">Start Pipeline</button>
    <button onclick="stepPipeline()" class="control-btn">Step Forward</button>
    <button onclick="resetPipeline()" class="control-btn">Reset</button>
  </div>
  
  <div class="pipeline-info">
    <div class="info-item">
      <strong>Clock Cycle:</strong> <span id="cycle-count">0</span>
    </div>
    <div class="info-item">
      <strong>Instructions/sec:</strong> <span id="inst-per-sec">0</span>
    </div>
  </div>
</div>`,
      css: `.pipeline-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 25px;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
  border-radius: 15px;
  color: white;
  font-family: 'Courier New', monospace;
}

.pipeline-container h3 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8em;
}

.pipeline-stages {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 10px;
}

.stage {
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  flex: 1;
  min-width: 150px;
  border: 2px solid transparent;
  transition: all 0.5s ease;
  backdrop-filter: blur(10px);
}

.stage.active {
  border-color: #f39c12;
  background: rgba(243,156,18,0.2);
  transform: scale(1.05);
}

.stage-name {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 8px;
  color: #ecf0f1;
}

.stage-desc {
  font-size: 0.8em;
  margin-bottom: 12px;
  opacity: 0.8;
}

.instruction {
  background: rgba(0,0,0,0.3);
  padding: 8px;
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: bold;
  color: #2ecc71;
  min-height: 20px;
}

.pipeline-arrow {
  font-size: 2em;
  color: #f39c12;
  font-weight: bold;
  margin: 0 10px;
}

.pipeline-controls {
  text-align: center;
  margin-bottom: 20px;
}

.control-btn {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 12px 20px;
  margin: 0 8px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.control-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(231,76,60,0.4);
}

.pipeline-info {
  display: flex;
  justify-content: space-around;
  background: rgba(255,255,255,0.1);
  padding: 15px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.info-item {
  text-align: center;
}

@media (max-width: 768px) {
  .pipeline-stages {
    flex-direction: column;
  }
  
  .pipeline-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
  }
}`,
      js: `// CPU Pipeline Simulation
let pipelineRunning = false;
let currentCycle = 0;
let pipelineInterval;

const instructions = [
  'MOV AX, BX',
  'ADD CX, DX', 
  'JMP 100h',
  'CMP AL, 0',
  'SUB EAX, EBX',
  'PUSH ECX',
  'POP EDX',
  'AND AL, 0Fh'
];

let instructionQueue = [...instructions];

function startPipeline() {
  if (pipelineRunning) return;
  
  pipelineRunning = true;
  pipelineInterval = setInterval(stepPipeline, 1000);
  
  document.querySelector('.control-btn').textContent = 'Running...';
  document.querySelector('.control-btn').disabled = true;
}

function stepPipeline() {
  currentCycle++;
  
  // Move instructions through pipeline stages
  const stages = ['writeback-inst', 'execute-inst', 'decode-inst', 'fetch-inst'];
  const stageElements = ['writeback', 'execute', 'decode', 'fetch'];
  
  // Clear previous active states
  document.querySelectorAll('.stage').forEach(stage => {
    stage.classList.remove('active');
  });
  
  // Move instructions
  for (let i = stages.length - 1; i > 0; i--) {
    const current = document.getElementById(stages[i]);
    const next = document.getElementById(stages[i-1]);
    next.textContent = current.textContent;
  }
  
  // Add new instruction to fetch stage
  if (instructionQueue.length > 0) {
    document.getElementById('fetch-inst').textContent = instructionQueue.shift();
    document.querySelector('.fetch').classList.add('active');
  }
  
  // Add active state to stages with instructions
  stageElements.forEach((stageName, index) => {
    const inst = document.getElementById(stages[index]);
    if (inst.textContent && inst.textContent.trim()) {
      document.querySelector('.' + stageName).classList.add('active');
    }
  });
  
  // Update cycle counter
  document.getElementById('cycle-count').textContent = currentCycle;
  document.getElementById('inst-per-sec').textContent = Math.round(currentCycle / (currentCycle * 0.001));
  
  // Stop if no more instructions
  if (instructionQueue.length === 0 && !hasInstructions()) {
    clearInterval(pipelineInterval);
    pipelineRunning = false;
    document.querySelector('.control-btn').textContent = 'Start Pipeline';
    document.querySelector('.control-btn').disabled = false;
  }
}

function resetPipeline() {
  clearInterval(pipelineInterval);
  pipelineRunning = false;
  currentCycle = 0;
  instructionQueue = [...instructions];
  
  // Clear all instructions
  ['fetch-inst', 'decode-inst', 'execute-inst', 'writeback-inst'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
  
  // Remove active states
  document.querySelectorAll('.stage').forEach(stage => {
    stage.classList.remove('active');
  });
  
  // Reset UI
  document.getElementById('cycle-count').textContent = '0';
  document.getElementById('inst-per-sec').textContent = '0';
  document.querySelector('.control-btn').textContent = 'Start Pipeline';
  document.querySelector('.control-btn').disabled = false;
}

function hasInstructions() {
  return ['fetch-inst', 'decode-inst', 'execute-inst', 'writeback-inst'].some(id => {
    return document.getElementById(id).textContent.trim() !== '';
  });
}`,
      usage: "Interactive CPU instruction pipeline demonstrating parallel processing stages"
    }
  ];

  const performanceExamples: CPUExample[] = [
    {
      title: "CPU Benchmark Comparison",
      description: "Interactive performance comparison between different CPU models",
      html: `<!-- CPU Benchmark Comparison -->
<div class="benchmark-container">
  <h3>CPU Performance Benchmark</h3>
  
  <div class="cpu-selector">
    <label for="cpu-select">Select CPU to Compare:</label>
    <select id="cpu-select" onchange="updateBenchmark()">
      <option value="i9-13900k">Intel i9-13900K</option>
      <option value="ryzen-7950x">AMD Ryzen 9 7950X</option>
      <option value="m2-ultra">Apple M2 Ultra</option>
      <option value="xeon-platinum">Intel Xeon Platinum</option>
    </select>
  </div>
  
  <div class="benchmark-charts">
    <div class="chart-container">
      <h4>Single-Core Performance</h4>
      <div class="performance-bar">
        <div class="bar single-core" id="single-core-bar">
          <span class="score" id="single-core-score">0</span>
        </div>
      </div>
    </div>
    
    <div class="chart-container">
      <h4>Multi-Core Performance</h4>
      <div class="performance-bar">
        <div class="bar multi-core" id="multi-core-bar">
          <span class="score" id="multi-core-score">0</span>
        </div>
      </div>
    </div>
    
    <div class="chart-container">
      <h4>Gaming Performance</h4>
      <div class="performance-bar">
        <div class="bar gaming" id="gaming-bar">
          <span class="score" id="gaming-score">0</span>
        </div>
      </div>
    </div>
    
    <div class="chart-container">
      <h4>Power Efficiency</h4>
      <div class="performance-bar">
        <div class="bar efficiency" id="efficiency-bar">
          <span class="score" id="efficiency-score">0</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="cpu-specs" id="cpu-specs">
    <h4>Specifications</h4>
    <div class="specs-grid">
      <div class="spec-item">
        <span class="spec-label">Cores/Threads:</span>
        <span class="spec-value" id="cores-threads">-</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Base/Boost Clock:</span>
        <span class="spec-value" id="clock-speeds">-</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">Cache:</span>
        <span class="spec-value" id="cache-size">-</span>
      </div>
      <div class="spec-item">
        <span class="spec-label">TDP:</span>
        <span class="spec-value" id="tdp">-</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.benchmark-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 25px;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  border-radius: 15px;
  color: white;
  font-family: 'Segoe UI', sans-serif;
}

.benchmark-container h3 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.8em;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cpu-selector {
  margin-bottom: 30px;
  text-align: center;
}

.cpu-selector label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

.cpu-selector select {
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 1em;
  cursor: pointer;
}

.benchmark-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-container h4 {
  margin: 0 0 15px 0;
  text-align: center;
  font-size: 1.1em;
}

.performance-bar {
  background: rgba(255,255,255,0.1);
  border-radius: 25px;
  height: 50px;
  position: relative;
  overflow: hidden;
}

.bar {
  height: 100%;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 1s ease;
  position: relative;
  width: 0%;
}

.single-core {
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
}

.multi-core {
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
}

.gaming {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.efficiency {
  background: linear-gradient(45deg, #f093fb, #f5576c);
}

.score {
  color: white;
  font-weight: bold;
  z-index: 2;
  position: relative;
}

.cpu-specs {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.cpu-specs h4 {
  margin: 0 0 15px 0;
  text-align: center;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: rgba(255,255,255,0.05);
  border-radius: 8px;
}

.spec-label {
  font-weight: bold;
  opacity: 0.8;
}

.spec-value {
  color: #4ecdc4;
  font-weight: bold;
}`,
      js: `// CPU Benchmark Data
const cpuData = {
  'i9-13900k': {
    name: 'Intel i9-13900K',
    singleCore: 95,
    multiCore: 90,
    gaming: 92,
    efficiency: 75,
    specs: {
      coresThreads: '24C/32T',
      clockSpeeds: '3.0/5.8 GHz',
      cache: '36MB L3',
      tdp: '125W'
    }
  },
  'ryzen-7950x': {
    name: 'AMD Ryzen 9 7950X',
    singleCore: 90,
    multiCore: 95,
    gaming: 88,
    efficiency: 80,
    specs: {
      coresThreads: '16C/32T',
      clockSpeeds: '4.5/5.7 GHz',
      cache: '64MB L3',
      tdp: '170W'
    }
  },
  'm2-ultra': {
    name: 'Apple M2 Ultra',
    singleCore: 85,
    multiCore: 88,
    gaming: 70,
    efficiency: 95,
    specs: {
      coresThreads: '24C/24T',
      clockSpeeds: '3.49 GHz',
      cache: 'Unified',
      tdp: '60W'
    }
  },
  'xeon-platinum': {
    name: 'Intel Xeon Platinum',
    singleCore: 70,
    multiCore: 100,
    gaming: 60,
    efficiency: 85,
    specs: {
      coresThreads: '56C/112T',
      clockSpeeds: '2.1/4.0 GHz',
      cache: '77MB L3',
      tdp: '270W'
    }
  }
};

function updateBenchmark() {
  const selectedCPU = document.getElementById('cpu-select').value;
  const data = cpuData[selectedCPU];
  
  // Animate performance bars
  setTimeout(() => {
    document.getElementById('single-core-bar').style.width = data.singleCore + '%';
    document.getElementById('single-core-score').textContent = data.singleCore;
  }, 100);
  
  setTimeout(() => {
    document.getElementById('multi-core-bar').style.width = data.multiCore + '%';
    document.getElementById('multi-core-score').textContent = data.multiCore;
  }, 300);
  
  setTimeout(() => {
    document.getElementById('gaming-bar').style.width = data.gaming + '%';
    document.getElementById('gaming-score').textContent = data.gaming;
  }, 500);
  
  setTimeout(() => {
    document.getElementById('efficiency-bar').style.width = data.efficiency + '%';
    document.getElementById('efficiency-score').textContent = data.efficiency;
  }, 700);
  
  // Update specifications
  document.getElementById('cores-threads').textContent = data.specs.coresThreads;
  document.getElementById('clock-speeds').textContent = data.specs.clockSpeeds;
  document.getElementById('cache-size').textContent = data.specs.cache;
  document.getElementById('tdp').textContent = data.specs.tdp;
}

// Initialize with first CPU
document.addEventListener('DOMContentLoaded', function() {
  updateBenchmark();
});`,
      usage: "Compare CPU performance across different metrics and specifications"
    }
  ];

  const coolingExamples: CPUExample[] = [
    {
      title: "CPU Cooling System Simulator",
      description: "Interactive thermal management visualization",
      html: `<!-- CPU Cooling Simulator -->
<div class="cooling-simulator">
  <h3>CPU Cooling System</h3>
  
  <div class="cooling-controls">
    <button onclick="setCoolingType('air')" class="cooling-btn" id="air-btn">Air Cooling</button>
    <button onclick="setCoolingType('liquid')" class="cooling-btn" id="liquid-btn">Liquid Cooling</button>
    <button onclick="setCoolingType('passive')" class="cooling-btn" id="passive-btn">Passive Cooling</button>
  </div>
  
  <div class="thermal-display">
    <div class="cpu-chip">
      <div class="cpu-die" id="cpu-die">
        <span class="temp-reading" id="cpu-temp-display">45°C</span>
      </div>
      <div class="heat-spreader"></div>
    </div>
    
    <div class="cooling-system" id="cooling-system">
      <div class="heat-sink">
        <div class="fin"></div>
        <div class="fin"></div>
        <div class="fin"></div>
        <div class="fin"></div>
      </div>
      <div class="fan" id="cooling-fan">
        <div class="fan-blade"></div>
        <div class="fan-blade"></div>
        <div class="fan-blade"></div>
      </div>
    </div>
  </div>
  
  <div class="thermal-controls">
    <div class="control-group">
      <label for="workload-slider">CPU Workload:</label>
      <input type="range" id="workload-slider" min="0" max="100" value="50" oninput="updateWorkload(this.value)">
      <span id="workload-value">50%</span>
    </div>
    
    <div class="control-group">
      <label for="fan-speed">Fan Speed:</label>
      <input type="range" id="fan-speed" min="0" max="100" value="70" oninput="updateFanSpeed(this.value)">
      <span id="fan-speed-value">70%</span>
    </div>
  </div>
  
  <div class="thermal-info">
    <div class="info-card">
      <h4>Current Status</h4>
      <div class="status-item">
        <span>Temperature:</span>
        <span id="temp-status" class="temp-good">Normal</span>
      </div>
      <div class="status-item">
        <span>Cooling Type:</span>
        <span id="cooling-type">Air Cooling</span>
      </div>
      <div class="status-item">
        <span>Thermal Throttling:</span>
        <span id="throttle-status" class="status-good">No</span>
      </div>
    </div>
  </div>
</div>`,
      css: `.cooling-simulator {
  max-width: 900px;
  margin: 20px auto;
  padding: 25px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  border-radius: 15px;
  color: white;
  font-family: 'Roboto', sans-serif;
}

.cooling-simulator h3 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.8em;
  color: #4ecdc4;
}

.cooling-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.cooling-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.cooling-btn:hover {
  background: rgba(255,255,255,0.2);
  transform: translateY(-2px);
}

.cooling-btn.active {
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  box-shadow: 0 4px 15px rgba(78,205,196,0.3);
}

.thermal-display {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  gap: 30px;
  flex-wrap: wrap;
}

.cpu-chip {
  position: relative;
  background: #2c3e50;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.cpu-die {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.5s ease;
}

.cpu-die.hot {
  background: linear-gradient(45deg, #ff4757, #ff3742);
  box-shadow: 0 0 20px rgba(255,71,87,0.5);
}

.cpu-die.cool {
  background: linear-gradient(45deg, #2ecc71, #27ae60);
}

.temp-reading {
  font-weight: bold;
  font-size: 0.9em;
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.heat-spreader {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: linear-gradient(45deg, #95a5a6, #7f8c8d);
  border-radius: 12px;
  z-index: -1;
}

.cooling-system {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.heat-sink {
  display: flex;
  gap: 5px;
  align-items: flex-end;
}

.fin {
  width: 8px;
  height: 40px;
  background: linear-gradient(to top, #34495e, #2c3e50);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.fin:nth-child(2n) {
  height: 50px;
}

.fan {
  width: 60px;
  height: 60px;
  border: 3px solid #34495e;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fan.spinning {
  animation: spin 0.5s linear infinite;
}

.fan.spinning.fast {
  animation-duration: 0.2s;
}

.fan-blade {
  position: absolute;
  width: 20px;
  height: 4px;
  background: #34495e;
  border-radius: 2px;
  transform-origin: center;
}

.fan-blade:nth-child(1) { transform: rotate(0deg) translateX(15px); }
.fan-blade:nth-child(2) { transform: rotate(120deg) translateX(15px); }
.fan-blade:nth-child(3) { transform: rotate(240deg) translateX(15px); }

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.thermal-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.control-group {
  background: rgba(255,255,255,0.05);
  padding: 15px;
  border-radius: 10px;
}

.control-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.control-group input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

.thermal-info {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
}

.info-card h4 {
  margin: 0 0 15px 0;
  text-align: center;
  color: #4ecdc4;
}

.status-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
}

.temp-good { color: #2ecc71; }
.temp-warm { color: #f39c12; }
.temp-hot { color: #e74c3c; }
.status-good { color: #2ecc71; }
.status-warning { color: #f39c12; }`,
      js: `// Cooling System Simulation
let currentCoolingType = 'air';
let currentWorkload = 50;
let currentFanSpeed = 70;
let baseTemp = 35;

function setCoolingType(type) {
  currentCoolingType = type;
  
  // Update button states
  document.querySelectorAll('.cooling-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(type + '-btn').classList.add('active');
  
  // Update cooling system display
  const coolingSystem = document.getElementById('cooling-system');
  const fan = document.getElementById('cooling-fan');
  
  switch(type) {
    case 'air':
      coolingSystem.style.display = 'flex';
      fan.style.display = 'flex';
      document.getElementById('cooling-type').textContent = 'Air Cooling';
      break;
    case 'liquid':
      coolingSystem.style.display = 'flex';
      fan.style.display = 'flex';
      coolingSystem.style.background = 'linear-gradient(45deg, rgba(52,152,219,0.2), rgba(41,128,185,0.2))';
      document.getElementById('cooling-type').textContent = 'Liquid Cooling';
      break;
    case 'passive':
      fan.style.display = 'none';
      document.getElementById('cooling-type').textContent = 'Passive Cooling';
      break;
  }
  
  updateTemperature();
}

function updateWorkload(value) {
  currentWorkload = parseInt(value);
  document.getElementById('workload-value').textContent = value + '%';
  updateTemperature();
}

function updateFanSpeed(value) {
  currentFanSpeed = parseInt(value);
  document.getElementById('fan-speed-value').textContent = value + '%';
  
  const fan = document.getElementById('cooling-fan');
  fan.classList.remove('spinning', 'fast');
  
  if (value > 0) {
    fan.classList.add('spinning');
    if (value > 80) {
      fan.classList.add('fast');
    }
  }
  
  updateTemperature();
}

function updateTemperature() {
  let temperature = baseTemp;
  
  // Add heat based on workload
  temperature += (currentWorkload / 100) * 45;
  
  // Reduce heat based on cooling efficiency
  let coolingEfficiency = 1;
  
  switch(currentCoolingType) {
    case 'air':
      coolingEfficiency = 0.7 + (currentFanSpeed / 100) * 0.3;
      break;
    case 'liquid':
      coolingEfficiency = 0.8 + (currentFanSpeed / 100) * 0.2;
      break;
    case 'passive':
      coolingEfficiency = 0.4;
      break;
  }
  
  temperature = temperature * (2 - coolingEfficiency);
  temperature = Math.round(temperature);
  
  // Update display
  const cpuDie = document.getElementById('cpu-die');
  const tempDisplay = document.getElementById('cpu-temp-display');
  const tempStatus = document.getElementById('temp-status');
  const throttleStatus = document.getElementById('throttle-status');
  
  tempDisplay.textContent = temperature + '°C';
  
  // Update visual state based on temperature
  cpuDie.classList.remove('hot', 'cool');
  
  if (temperature < 60) {
    cpuDie.classList.add('cool');
    tempStatus.textContent = 'Normal';
    tempStatus.className = 'temp-good';
    throttleStatus.textContent = 'No';
    throttleStatus.className = 'status-good';
  } else if (temperature < 80) {
    tempStatus.textContent = 'Warm';
    tempStatus.className = 'temp-warm';
    throttleStatus.textContent = 'No';
    throttleStatus.className = 'status-good';
  } else {
    cpuDie.classList.add('hot');
    tempStatus.textContent = 'Hot';
    tempStatus.className = 'temp-hot';
    throttleStatus.textContent = 'Yes';
    throttleStatus.className = 'status-warning';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  setCoolingType('air');
  updateTemperature();
});`,
      usage: "Interactive thermal management system showing cooling effects on CPU temperature"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          CPU (Central Processing Unit) Guide
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Master CPU architecture, performance, and optimization with interactive examples
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-2">⏱️ Reading time: {readingTime} min</span>
            <span className="px-2">•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      {/* Introduction with CPU visualization */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaHashtag className="text-blue-500" />
              CPU Architecture & Performance Guide
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Dive deep into CPU technology, from basic architecture to advanced performance 
                optimization. Learn how processors work and how to maximize their potential.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Understanding CPU architecture and instruction pipelines</li>
                <li>Performance benchmarking and comparison tools</li>
                <li>Thermal management and cooling solutions</li>
                <li>Programming techniques for CPU optimization</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {cpuTypes.map((cpu, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg bg-gradient-to-br ${cpu.color} text-white cursor-pointer transform hover:scale-105 transition-all`}
                onClick={() => setSelectedCPU(selectedCPU === cpu.name ? null : cpu.name)}
              >
                <h4 className="font-bold text-sm mb-1">{cpu.name}</h4>
                <p className="text-xs opacity-90">{cpu.category}</p>
                {selectedCPU === cpu.name && (
                  <p className="text-xs mt-2 opacity-80">{cpu.specs}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPU Specifications Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaMicrochip className="text-green-500" />
          CPU Key Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cpuSpecs.map((spec, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-3">
                {spec.icon}
                <h3 className="text-xl font-bold text-green-400">{spec.name}</h3>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{spec.value}</p>
              <p className="text-gray-300 text-sm">{spec.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview Section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("overview")}
          aria-expanded={expandedSections["overview"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaMicrochip className="text-blue-500" />
            CPU Architecture & Design
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
                  {/* Live preview */}
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

      {/* Architecture Section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("architecture")}
          aria-expanded={expandedSections["architecture"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaServer className="text-purple-500" />
            Instruction Pipeline & Processing
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["architecture"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["architecture"] && (
          <div className="space-y-8">
            {architectureExamples.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{example.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {example.description}
                  </p>
                </div>
                <div className="p-4">
                  {renderCodeExample(
                    example.html,
                    example.css,
                    example.js || "",
                    example.title
                  )}
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <strong>Usage:</strong> {example.usage}
                  </div>
                  {/* Live preview */}
                  <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Live Preview</h4>
                    <div 
                      dangerouslySetInnerHTML={{ __html: example.html }}
                      className="preview-container"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Performance Section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("performance")}
          aria-expanded={expandedSections["performance"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaBolt className="text-orange-500" />
            Performance Benchmarking
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["performance"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["performance"] && (
          <div className="space-y-8">
            {performanceExamples.map((practice, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium">{practice.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {practice.description}
                  </p>
                </div>
                <div className="p-4">
                  {renderCodeExample(
                    practice.html,
                    practice.css,
                    practice.js || "",
                    practice.title
                  )}
                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    <strong>Features:</strong> {practice.usage}
                  </div>
                  {/* Live preview */}
                  <div className="mt-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium mb-2">Live Preview</h4>
                    <div 
                      dangerouslySetInnerHTML={{ __html: practice.html }}
                      className="preview-container"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Cooling Section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("cooling")}
          aria-expanded={expandedSections["cooling"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaThermometerHalf className="text-red-500" />
            Thermal Management & Cooling
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["cooling"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["cooling"] && (
          <div className="space-y-8">
            {coolingExamples.map((item, index) => (
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
                    <strong>Use Case:</strong> {item.usage}
                  </div>
                  {/* Live preview */}
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

      {/* Programming Section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("programming")}
          aria-expanded={expandedSections["programming"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-indigo-500" />
            CPU Programming & Optimization
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["programming"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["programming"] && (
          <div className="space-y-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium">CPU Performance Optimization Techniques</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Learn programming techniques to maximize CPU performance
                </p>
              </div>
              <div className="p-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Cache Optimization</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Minimize cache misses with data locality</li>
                      <li>• Use cache-friendly data structures</li>
                      <li>• Implement cache blocking techniques</li>
                      <li>• Avoid false sharing in multi-threading</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Instruction Optimization</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li>• Utilize SIMD instructions (SSE, AVX)</li>
                      <li>• Minimize branch mispredictions</li>
                      <li>• Use loop unrolling strategically</li>
                      <li>• Leverage CPU pipelining</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Interactive Playground */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                CPU Interactive Lab
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with CPU simulations and visualizations
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  CPU Simulation Examples
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Try different CPU architecture demonstrations
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Interactive
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-medium mb-2">CPU Architecture Diagram</h4>
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #1a1a2e;
      color: white;
    }
    .cpu-diagram {
      max-width: 800px;
      margin: 20px auto;
    }
    .cpu-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 80px);
      gap: 10px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 15px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }
    .cpu-core {
      background: linear-gradient(45deg, #ff6b6b, #feca57);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .cpu-core:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(255,107,107,0.4);
    }
  </style>
</head>
<body>
  <h1>CPU Architecture Interactive Diagram</h1>
  
  <div class="cpu-diagram">
    <div class="cpu-container">
      <div class="cpu-core">
        <div>Core 1</div>
        <div style="font-size: 0.7em;">ALU</div>
      </div>
      <div class="cpu-core">
        <div>Core 2</div>
        <div style="font-size: 0.7em;">CU</div>
      </div>
      <div class="cpu-core">
        <div>L1 Cache</div>
      </div>
      <div class="cpu-core">
        <div>L2 Cache</div>
      </div>
    </div>
  </div>
</body>
</html>`)
                    }
                    className="w-full text-sm px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Try CPU Architecture
                  </button>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Performance Monitor</h4>
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      min-height: 100vh;
    }
    .performance-monitor {
      max-width: 900px;
      margin: 20px auto;
      padding: 25px;
      background: rgba(255,255,255,0.1);
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 25px;
    }
    .metric-card {
      background: rgba(255,255,255,0.1);
      border-radius: 10px;
      padding: 15px;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .metric-value {
      font-size: 1.4em;
      font-weight: bold;
      margin: 10px 0;
      color: #4ecdc4;
    }
  </style>
</head>
<body>
  <h1>CPU Performance Monitor</h1>
  
  <div class="performance-monitor">
    <div class="metrics-grid">
      <div class="metric-card">
        <div>🔥 CPU Usage</div>
        <div class="metric-value">45%</div>
      </div>
      <div class="metric-card">
        <div>🌡️ Temperature</div>
        <div class="metric-value">68°C</div>
      </div>
      <div class="metric-card">
        <div>⚡ Clock Speed</div>
        <div class="metric-value">3.2 GHz</div>
      </div>
      <div class="metric-card">
        <div>💾 Cache Hit Rate</div>
        <div class="metric-value">94%</div>
      </div>
    </div>
  </div>
</body>
</html>`)
                    }
                    className="w-full text-sm px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    Try Performance Monitor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="flex justify-between items-center px-4 py-6 border-t">
        <Link
          href="/hardware/motherboard"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        <Link
          href="/hardware/gpu"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}