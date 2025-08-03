"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaImage,
  FaCopy,
  FaCheck,
  FaRuler,
  FaChevronDown,
  FaPlay,
  FaInfoCircle,
  FaCode,
  FaEdit,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface Coordinates {
  center: { x: number; y: number };
  edge: { x: number; y: number };
  radius: number;
  step: number;
}

interface ExpandedSections {
  solarSystem: boolean;
  computerParts: boolean;
  smartphone: boolean;
  [key: string]: boolean;
}

interface EditableCoordinates {
  centerX: string;
  centerY: string;
  radius: string;
}

interface ClickableArea {
  coords: string;
  shape: "circle" | "rect";
  title: string;
  href: string;
}

export default function ImageMapExamples() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    solarSystem: true,
    computerParts: true,
    smartphone: true,
  });
  const [activeTab, setActiveTab] = useState<"html" | "css">("html");
  const [isMapping, setIsMapping] = useState(false);
  const [showAreas, setShowAreas] = useState(true);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    center: { x: 0, y: 0 },
    edge: { x: 0, y: 0 },
    radius: 0,
    step: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editableCoords, setEditableCoords] = useState<EditableCoordinates>({
    centerX: "0",
    centerY: "0",
    radius: "0",
  });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isMapping || !imgRef.current || isEditing) return;

    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    if (coordinates.step === 0) {
      const newCoords = {
        center: { x, y },
        edge: { x, y },
        radius: 0,
        step: 1,
      };
      setCoordinates(newCoords);
      setEditableCoords({
        centerX: x.toString(),
        centerY: y.toString(),
        radius: "0",
      });
    } else if (coordinates.step === 1) {
      const radius = Math.round(
        Math.sqrt(
          Math.pow(x - coordinates.center.x, 2) +
            Math.pow(y - coordinates.center.y, 2)
        )
      );
      const newCoords = {
        center: coordinates.center,
        edge: { x, y },
        radius,
        step: 2,
      };
      setCoordinates(newCoords);
      setEditableCoords({
        centerX: coordinates.center.x.toString(),
        centerY: coordinates.center.y.toString(),
        radius: radius.toString(),
      });
    }
  };

  const toggleMapping = () => {
    setIsMapping(!isMapping);
    setIsEditing(false);
    setCoordinates({
      center: { x: 0, y: 0 },
      edge: { x: 0, y: 0 },
      radius: 0,
      step: 0,
    });
    setEditableCoords({
      centerX: "0",
      centerY: "0",
      radius: "0",
    });
  };

  const handleEditToggle = () => {
    if (coordinates.step < 2) return;

    if (isEditing) {
      const centerX = parseInt(editableCoords.centerX) || 0;
      const centerY = parseInt(editableCoords.centerY) || 0;
      const radius = parseInt(editableCoords.radius) || 0;

      setCoordinates({
        ...coordinates,
        center: { x: centerX, y: centerY },
        radius: radius,
      });
    } else {
      setEditableCoords({
        centerX: coordinates.center.x.toString(),
        centerY: coordinates.center.y.toString(),
        radius: coordinates.radius.toString(),
      });
    }

    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    field: keyof EditableCoordinates,
    value: string
  ) => {
    if (value === "" || /^\d+$/.test(value)) {
      setEditableCoords((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (value !== "") {
        const centerX =
          parseInt(field === "centerX" ? value : editableCoords.centerX) || 0;
        const centerY =
          parseInt(field === "centerY" ? value : editableCoords.centerY) || 0;
        const radius =
          parseInt(field === "radius" ? value : editableCoords.radius) || 0;

        setCoordinates((prev) => ({
          ...prev,
          center: { x: centerX, y: centerY },
          radius: radius,
        }));
      }
    }
  };

  const resetCoordinates = () => {
    setCoordinates({
      center: { x: 0, y: 0 },
      edge: { x: 0, y: 0 },
      radius: 0,
      step: 0,
    });
    setEditableCoords({
      centerX: "0",
      centerY: "0",
      radius: "0",
    });
    setIsEditing(false);
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

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getCurrentCoordinates = () => {
    if (isEditing) {
      return `${editableCoords.centerX},${editableCoords.centerY},${editableCoords.radius}`;
    }
    return `${coordinates.center.x},${coordinates.center.y},${coordinates.radius}`;
  };

  // Define clickable areas for each example
  const clickableAreas = {
    solarSystem: [
      {
        coords: "403,335,80",
        shape: "circle" as const,
        title: "Sun - Our star",
        href: "/html/image-maps/sun",
      },
      {
        coords: "514,568,38",
        shape: "circle" as const,
        title: "Mercury",
        href: "/html/image-maps/mercury",
      },
      {
        coords: "470,130,38",
        shape: "circle" as const,
        title: "Venus",
        href: "/html/image-maps/venus",
      },
      {
        coords: "210,338,41",
        shape: "circle" as const,
        title: "Earth",
        href: "/html/image-maps/earth",
      },
      {
        coords: "100,526,35",
        shape: "circle" as const,
        title: "Mars",
        href: "/html/image-maps/mars",
      },
      {
        coords: "606,408,75",
        shape: "circle" as const,
        title: "Jupiter",
        href: "/html/image-maps/jupiter",
      },
      {
        coords: "335,540,55",
        shape: "circle" as const,
        title: "Saturn",
        href: "/html/image-maps/saturn",
      },
      {
        coords: "665,215,50",
        shape: "circle" as const,
        title: "Uranus",
        href: "/html/image-maps/uranus",
      },
      {
        coords: "242,155,40",
        shape: "circle" as const,
        title: "Neptune",
        href: "/html/image-maps/neptune",
      },
      {
        coords: "552,185,18",
        shape: "circle" as const,
        title: "Pluto",
        href: "/html/image-maps/pluto",
      },
    ],
    computerParts: [
      {
        coords: "130,95,320,280",
        shape: "rect" as const,
        title: "CPU",
        href: "/html/image-maps/cpu",
      },
      {
        coords: "590,75,687,330",
        shape: "rect" as const,
        title: "RAM",
        href: "/html/image-maps/ram",
      },
      {
        coords: "145,360,525,560",
        shape: "rect" as const,
        title: "GPU",
        href: "/html/image-maps/gpu",
      },
      {
        coords: "140,650,680,1125",
        shape: "rect" as const,
        title: "Motherboard",
        href: "/html/image-maps/motherboard",
      },
    ],
    smartphone: [
      {
        coords: "250,290,610,875",
        shape: "rect" as const,
        title: "Screen",
        href: "/html/image-maps/screen",
      },
      {
        coords: "430,920,35",
        shape: "circle" as const,
        title: "Home Button",
        href: "/html/image-maps/home",
      },
      {
        coords: "440,140,620,170",
        shape: "rect" as const,
        title: "Speaker",
        href: "/html/image-maps/speaker",
      },
      {
        coords: "215,160,35",
        shape: "circle" as const,
        title: "Camera",
        href: "/html/image-maps/camera",
      },
    ],
  };

  const renderClickableArea = (
    area: ClickableArea,
  ) => {
    const scaleX = 1;
    const scaleY = 1;

    if (area.shape === "circle") {
      const [cx, cy, r] = area.coords.split(",").map(Number);
      return (
        <a
          key={area.title}
          href={area.href}
          className="absolute border-2 border-blue-400 bg-blue-200 bg-opacity-20 rounded-full transition-opacity duration-300 hover:bg-opacity-40"
          style={{
            left: `${cx * scaleX - r * scaleX}px`,
            top: `${cy * scaleY - r * scaleY}px`,
            width: `${r * 2 * scaleX}px`,
            height: `${r * 2 * scaleY}px`,
            opacity: showAreas ? 0.6 : 0,
          }}
          title={area.title}
          onClick={(e) => {
            if (isMapping) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
      );
    } else {
      const [x1, y1, x2, y2] = area.coords.split(",").map(Number);
      return (
        <a
          key={area.title}
          href={area.href}
          className="absolute border-2 border-green-400 bg-green-200 bg-opacity-20 transition-opacity duration-300 hover:bg-opacity-40"
          style={{
            left: `${x1 * scaleX}px`,
            top: `${y1 * scaleY}px`,
            width: `${(x2 - x1) * scaleX}px`,
            height: `${(y2 - y1) * scaleY}px`,
            opacity: showAreas ? 0.6 : 0,
          }}
          title={area.title}
          onClick={(e) => {
            if (isMapping) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
      );
    }
  };

  const renderCodeExample = (
    htmlCode: string,
    cssCode: string,
    name: string
  ) => {
    return (
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === "html" ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
            onClick={() => setActiveTab("html")}
          >
            HTML
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === "css" ? "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`}
            onClick={() => setActiveTab("css")}
          >
            CSS
          </button>
        </div>

        <div className="max-h-96 overflow-auto">
          <CodeEditor
            value={activeTab === "html" ? htmlCode : cssCode}
            language={activeTab === "html" ? "html" : "css"}
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
              handleOpenEditor(`${htmlCode}\n\n<style>${cssCode}</style>`)
            }
            className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center"
          >
            <FaPlay className="inline mr-1" size={10} /> Try
          </button>
          <button
            onClick={() =>
              copyToClipboard(activeTab === "html" ? htmlCode : cssCode, name)
            }
            className="text-xs px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
          >
            {copied === name ? (
              <FaCheck className="inline mr-1 text-green-500" size={10} />
            ) : (
              <FaCopy className="inline mr-1" size={10} />
            )}
            Copy
          </button>
        </div>
      </div>
    );
  };

  const examples = [
    {
      id: "solarSystem",
      title: "Solar System Map",
      description: "Interactive map of our solar system with clickable planets",
      html: `<!-- Solar System Image Map -->
<div class="relative mx-auto max-w-[800px] my-8">
  <img
    src="/images/html/Solar-system.png"
    alt="Solar system diagram"
    usemap="#solarsystem"
    class="border-2 border-white rounded-lg w-full h-auto"
    width="800"
    height="600"
  />
  
  <map name="solarsystem">
    <area alt="Sun - Our star" title="Sun - Our star" href="/html/image-maps/sun" coords="403,335,80" shape="circle" />
    <area alt="Mercury" title="Mercury - Smallest planet" href="/html/image-maps/mercury" coords="514,568,38" shape="circle" />
    <area alt="Venus" title="Venus - Hottest planet" href="/html/image-maps/venus" coords="470,130,38" shape="circle" />
    <area alt="Earth" title="Earth - Our home" href="/html/image-maps/earth" coords="210,338,41" shape="circle" />
    <area alt="Mars" title="Mars - The red planet" href="/html/image-maps/mars" coords="100,526,35" shape="circle" />
    <area alt="Jupiter" title="Jupiter - Gas giant" href="/html/image-maps/jupiter" coords="606,408,75" shape="circle" />
    <area alt="Saturn" title="Saturn - Ringed planet" href="/html/image-maps/saturn" coords="335,540,55" shape="circle" />
    <area alt="Uranus" title="Uranus - Icy gas giant" href="/html/image-maps/uranus" coords="665,215,50" shape="circle" />
    <area alt="Neptune" title="Neptune - Farthest planet" href="/html/image-maps/neptune" coords="242,155,40" shape="circle" />
    <area alt="Neptune" title="Pluto - Farthest planet" href="/html/image-maps/Pluto" coords="552,185,18" shape="circle" />
  </map>
</div>`,
      css: `/* Solar System Image Map Styling */
area {
  cursor: pointer;
  outline: none;
}

area:hover {
  opacity: 0.7;
}

/* Clickable area visual indicators */
.clickable-area {
  position: absolute;
  border: 2px solid rgba(59, 130, 246, 0.6);
  background-color: rgba(59, 130, 246, 0.1);
  transition: opacity 0.3s ease;
}

.clickable-area.circle {
  border-radius: 50%;
}

.clickable-area:hover {
  background-color: rgba(59, 130, 246, 0.2);
}`,
    },
    {
      id: "computerParts",
      title: "Computer Parts Map",
      description: "Interactive diagram of computer components",
      html: `<!-- Computer Parts Image Map -->
<div class="relative mx-auto max-w-[600px] my-8">
  <img
    src="/images/html/ComputerParts.png"
    alt="Computer parts diagram"
    usemap="#computerparts"
    class="border-2 border-white rounded-lg w-full h-auto"
    width="600"
    height="500"
  />
  
  <map name="computerparts">
    <area alt="CPU" title="Central Processing Unit" href="#cpu" coords="130,95,320,280" shape="rect" />
    <area alt="RAM" title="Random Access Memory" href="#ram" coords="590,75,687,330" shape="rect" />
    <area alt="GPU" title="Graphics Processing Unit" href="#gpu" coords="145,360,525,560" shape="rect" />
    <area alt="Motherboard" title="Main Circuit Board" href="#motherboard" coords="140,650,680,1125" shape="rect" />
  </map>
</div>`,
      css: `/* Computer Parts Image Map Styling */
area {
  cursor: pointer;
  outline: none;
}

area:hover {
  opacity: 0.8;
}`,
    },
    {
      id: "smartphone",
      title: "Smartphone Map",
      description: "Interactive smartphone interface map",
      html: `<!-- Smartphone Image Map -->
<div class="relative mx-auto max-w-[300px] my-8">
  <img
    src="/images/html/Smartphone.png"
    alt="Smartphone diagram"
    usemap="#smartphone"
    class="border-2 border-white rounded-lg w-full h-auto"
    width="300"
    height="600"
  />
  
  <map name="smartphone">
    <area alt="Screen" title="Touch Screen Display" href="#screen" coords="50,150,250,500" shape="rect" />
    <area alt="Home Button" title="Home Button" href="#home" coords="150,520,30" shape="circle" />
    <area alt="Speaker" title="Earpiece Speaker" href="#speaker" coords="120,80,180,100" shape="rect" />
    <area alt="Camera" title="Front Camera" href="#camera" coords="90,60,20" shape="circle" />
  </map>
</div>`,
      css: `/* Smartphone Image Map Styling */  
area {
  cursor: pointer;
  outline: none;
}

area:hover {
  opacity: 0.9;
}`,
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Image Maps Guide
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Create interactive image maps with clickable areas
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center mr-3">
              <FaInfoCircle className="mr-1" /> Interactive Examples
            </span>
            <span className="flex items-center">
              <FaCode className="mr-1" /> HTML & CSS
            </span>
          </div>
        </div>
      </header>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={toggleMapping}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isMapping ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            <FaRuler />
            {isMapping ? "Exit Coordinate Finder" : "Enable Coordinate Finder"}
          </button>

          <button
            onClick={() => setShowAreas(!showAreas)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${showAreas ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-500 hover:bg-gray-600 text-white"}`}
          >
            {showAreas ? <FaEye /> : <FaEyeSlash />}
            {showAreas ? "Hide Clickable Areas" : "Show Clickable Areas"}
          </button>

          {isMapping && coordinates.step === 2 && (
            <button
              onClick={resetCoordinates}
              className="px-4 py-2 rounded-lg flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white"
            >
              <FaTimes />
              Reset
            </button>
          )}
        </div>

        {isMapping && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {coordinates.step === 0 &&
                "Click on the image to set circle center"}
              {coordinates.step === 1 && "Now click to set the edge point"}
              {coordinates.step === 2 &&
                "Circle coordinates defined! You can edit them below."}
            </p>

            {coordinates.step === 2 && (
              <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Circle Coordinates
                  </h4>
                  <button
                    onClick={handleEditToggle}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${isEditing ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-500 hover:bg-gray-600 text-white"}`}
                  >
                    {isEditing ? <FaSave /> : <FaEdit />}
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Center X
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableCoords.centerX}
                        onChange={(e) =>
                          handleInputChange("centerX", e.target.value)
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <div className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-gray-100">
                        {coordinates.center.x}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Center Y
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableCoords.centerY}
                        onChange={(e) =>
                          handleInputChange("centerY", e.target.value)
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <div className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-gray-100">
                        {coordinates.center.y}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Radius
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editableCoords.radius}
                        onChange={(e) =>
                          handleInputChange("radius", e.target.value)
                        }
                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <div className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded text-gray-900 dark:text-gray-100">
                        {coordinates.radius}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Coordinates:</span>
                    <code className="ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-green-600 dark:text-green-400 font-mono">
                      {getCurrentCoordinates()}
                    </code>
                  </div>

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-blue-600"
                    onClick={() =>
                      copyToClipboard(getCurrentCoordinates(), "coords")
                    }
                  >
                    {copied === "coords" ? (
                      <>
                        <FaCheck /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {examples.map((example) => (
        <section key={example.id} className="mb-12">
          <button
            className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => toggleSection(example.id as keyof ExpandedSections)}
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaImage className="text-blue-500" />
              {example.title}
            </h2>
            <FaChevronDown
              className={`transition-transform ${expandedSections[example.id] ? "rotate-180" : ""}`}
            />
          </button>

          {expandedSections[example.id] && (
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-medium">{example.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {example.description}
                </p>
              </div>
              <div className="p-4">
                {renderCodeExample(example.html, example.css, example.title)}

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3 px-2">
                    Live Preview
                  </h4>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 relative">
                    {example.id === "solarSystem" && (
                      <div className="relative">
                        <Image
                          src="/images/html/Solar-system.png"
                          alt="Solar system diagram"
                          useMap="#solarsystem"
                          width={800}
                          height={600}
                          onClick={handleImageClick}
                          ref={imgRef}
                          className={`border-2 border-white rounded-lg w-full h-auto ${isMapping && !isEditing ? "cursor-crosshair" : "cursor-default"}`}
                        />

                        {/* Render clickable areas */}
                        {clickableAreas.solarSystem.map((area) =>
                          renderClickableArea(area)
                        )}
                      </div>
                    )}

                    {example.id === "computerParts" && (
                      <div className="relative">
                        <Image
                          src="/images/html/ComputerParts.png"
                          alt="Computer parts diagram"
                          useMap="#computerparts"
                          className={`border-2 border-white rounded-lg w-full h-auto ${isMapping && !isEditing ? "cursor-crosshair" : "cursor-default"}`}
                          width="600"
                          height="500"
                        />

                        {/* Render clickable areas */}
                        {clickableAreas.computerParts.map((area) =>
                          renderClickableArea(area)
                        )}
                      </div>
                    )}

                    {example.id === "smartphone" && (
                      <div className="relative">
                        <Image
                          src="/images/html/Smartphone.png"
                          alt="Smartphone diagram"
                          useMap="#smartphone"
                          className={`border-2 border-white rounded-lg w-full h-auto ${isMapping && !isEditing ? "cursor-crosshair" : "cursor-default"}`}
                          width="300"
                          height="600"
                        />

                        {/* Render clickable areas */}
                        {clickableAreas.smartphone.map((area) =>
                          renderClickableArea(area)
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        
      ))}

        {/* Navigation Footer */}
      <section className="flex justify-between items-center px-4 py-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/html/images"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        <Link
          href="/html/favicon"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}
