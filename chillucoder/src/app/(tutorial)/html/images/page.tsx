"use client";

import {
  FaImage,
  FaCamera,
  FaPalette,
  FaMobileAlt,
  FaGlobe,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaPlay,
  FaArrowLeft,
  FaArrowRight,
  FaInfoCircle,
  FaCode,
  FaHashtag,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Using Unsplash images for reliable responsive examples
const IMAGE_PATHS = {
  landscape: "/images/html/ABeautifulLandscape.png",
  portrait: "/images/html/APortraitImage.png",
  product: "/images/html/ProductShot.png",
  abstract: "/images/AbstractArt.png",
  logo: "/images/html/CompanyLogo.png",
  small: "/images/html/SmallImage.png ",
  medium: "/images/html/MediumImage.png ",
  large: "/images/html/LargeImage.png ",
  desktop: "/images/html/DesktopVersion.png ",
  mobile: "/images/html/MobileVersion.png ",
};

export default function HTMLImagesPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    responsive: true,
    optimization: true,
    advanced: true,
    bestPractices: true,
  });
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [readingTime, setReadingTime] = useState(0);

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
    jsCode = "",
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

  // Image examples data with multiple images
  const imageBasics = [
    {
      title: "Basic Image Gallery",
      description: "Display multiple images in a responsive grid",
      html: `<!-- Image gallery with multiple images -->
<div class="gallery">
  <img src="${IMAGE_PATHS.landscape}" alt="Beautiful landscape">
  <img src="${IMAGE_PATHS.portrait}" alt="Portrait photo">
  <img src="${IMAGE_PATHS.product}" alt="Product shot">
  <img src="${IMAGE_PATHS.abstract}" alt="Abstract art">
</div>`,
      css: `/* Gallery styling */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s;
}

.gallery img:hover {
  transform: scale(1.03);
}`,
      usage: "Use CSS Grid to create responsive image layouts",
    },
    {
      title: "Image with Captions",
      description: "Add descriptive captions to your images",
      html: `<!-- Image with caption -->
<figure>
  <img src="${IMAGE_PATHS.landscape}" alt="Scenic mountain view">
  <figcaption>A beautiful mountain landscape at sunset</figcaption>
</figure>

<!-- Multiple images with captions -->
<div class="image-grid">
  <figure>
    <img src="${IMAGE_PATHS.portrait}" alt="Professional portrait">
    <figcaption>Professional headshot</figcaption>
  </figure>
  <figure>
    <img src="${IMAGE_PATHS.product}" alt="Product display">
    <figcaption>Our featured product</figcaption>
  </figure>
</div>`,
      css: `/* Caption styling */
figure {
  margin: 0;
  padding: 10px;
  background: #f8fafc;
  border-radius: 8px;
}

figcaption {
  text-align: center;
  margin-top: 8px;
  font-size: 0.9em;
  color: #4b5563;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}`,
      usage: "Use <figure> and <figcaption> for semantic image captions",
    },
  ];

  const responsiveImages = [
    {
      title: "Responsive Images with srcset",
      description: "Serve different resolution images based on viewport width",
      html: `<!-- Responsive image with srcset -->
<div class="responsive-example">
  <img 
    src="${IMAGE_PATHS.small}"
    srcset="
      ${IMAGE_PATHS.small} 480w,
      ${IMAGE_PATHS.medium} 768w,
      ${IMAGE_PATHS.large} 1200w
    "
    sizes="(max-width: 600px) 480px, (max-width: 1000px) 768px, 1200px"
    alt="Responsive landscape image"
    class="responsive-image"
  >
</div>`,
      css: `/* Responsive image styling */
.responsive-example {
  margin: 20px 0;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
}

.responsive-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}`,
      features: [
        "Automatic image selection",
        "Bandwidth optimization",
        "Retina display support",
      ],
      usage: "Browser selects best image based on viewport and device resolution",
    },
    {
      title: "Art Direction with Picture Element",
      description: "Serve completely different images at different breakpoints",
      html: `<!-- Art direction with picture element -->
<div class="art-direction-example">
  <picture>
    <source media="(min-width: 1200px)" srcset="${IMAGE_PATHS.desktop}">
    <source media="(min-width: 768px)" srcset="${IMAGE_PATHS.medium}">
    <source media="(max-width: 767px)" srcset="${IMAGE_PATHS.mobile}">
    <img src="${IMAGE_PATHS.landscape}" alt="Art directed image" class="responsive-image">
  </picture>
</div>`,
      css: `/* Art direction styling */
.art-direction-example {
  margin: 20px 0;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
}

.responsive-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}`,
      features: [
        "Different crops/compositions",
        "Mobile-first approach",
        "Fallback support",
      ],
      usage: "Use for images that need different crops at different viewports",
    },
  ];

  const imageOptimization = [
    {
      title: "Lazy Loading",
      description: "Defer offscreen images to improve performance",
      html: `<!-- Lazy loaded image gallery -->
<div class="lazy-gallery">
  <img 
    src="${IMAGE_PATHS.small}" 
    data-src="${IMAGE_PATHS.landscape}" 
    alt="Lazy loaded landscape"
    loading="lazy"
    class="lazy"
  >
  <img 
    src="${IMAGE_PATHS.small}" 
    data-src="${IMAGE_PATHS.portrait}" 
    alt="Lazy loaded portrait"
    loading="lazy"
    class="lazy"
  >
</div>`,
      css: `/* Lazy loading styles */
.lazy-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 20px 0;
}

.lazy {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.5s;
}

.lazy.loaded {
  opacity: 1;
}`,
      js: `// Optional: Fade-in effect when loaded
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
  if ("IntersectionObserver" in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.add("loaded");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(function(lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.classList.add("loaded");
    });
  }
});`,
      explanation: "Lazy loading improves page load performance significantly by only loading images when they enter the viewport",
    },
  ];

  const advancedTechniques = [
    {
      title: "Image Maps",
      description: "Create clickable regions on an image",
      html: `<!-- Image with clickable areas -->
<div class="image-map-container">
  <img src="${IMAGE_PATHS.abstract}" alt="Abstract art" usemap="#abstractmap">
  
  <map name="abstractmap">
    <area shape="rect" coords="0,0,200,200" href="#section1" alt="Top left section">
    <area shape="circle" coords="300,300,100" href="#section2" alt="Center circle">
    <area shape="poly" coords="400,50,450,150,400,250,350,150" href="#section3" alt="Diamond shape">
  </map>
</div>`,
      css: `/* Image map styling */
.image-map-container {
  margin: 20px 0;
  position: relative;
}

.image-map-container img {
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
}`,
      useCase: "Useful for diagrams, interactive infographics, and complex image navigation",
    },
    {
      title: "CSS Image Effects",
      description: "Apply visual effects to images with CSS",
      html: `<!-- Image for effects -->
<div class="image-effects">
  <img src="${IMAGE_PATHS.landscape}" alt="Landscape with effects">
</div>`,
      css: `/* Various image effects */
.image-effects {
  width: 100%;
  max-width: 600px;
  margin: 20px 0;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  position: relative;
}

.image-effects img {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.3s ease;
  filter: grayscale(30%);
}

.image-effects:hover img {
  transform: scale(1.05);
  filter: grayscale(0%) brightness(1.1) contrast(1.1);
}

/* Optional overlay effect */
.image-effects::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
  opacity: 0;
  transition: opacity 0.3s;
}

.image-effects:hover::after {
  opacity: 1;
}`,
      useCase: "Enhance visual appeal with hover effects and transitions",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          HTML Images Guide
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Master image display with multiple examples and techniques
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-2">⏱️ Reading time: {readingTime} min</span>
            <span className="px-2">•</span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      {/* Introduction with image collage */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaHashtag className="text-blue-500" />
              HTML Image Gallery Guide
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                This comprehensive guide covers all aspects of working with images in HTML,
                from basic embedding to advanced responsive techniques and optimization.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create beautiful, responsive image galleries</li>
                <li>Implement modern loading techniques</li>
                <li>Optimize for performance and accessibility</li>
                <li>Apply visual effects and enhancements</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img 
              src={IMAGE_PATHS.landscape} 
              alt="Landscape example" 
              className="rounded-lg h-full object-cover"
            />
            <div className="grid gap-2">
              <img 
                src={IMAGE_PATHS.portrait} 
                alt="Portrait example" 
                className="rounded-lg h-32 object-cover"
              />
              <img 
                src={IMAGE_PATHS.product} 
                alt="Product example" 
                className="rounded-lg h-32 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Basics section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("basics")}
          aria-expanded={expandedSections["basics"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaImage className="text-blue-500" />
            Image Basics & Galleries
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["basics"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["basics"] && (
          <div className="space-y-8">
            {imageBasics.map((item, index) => (
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
                  {renderCodeExample(item.html, item.css, "", item.title)}
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

      {/* Responsive Images section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("responsive")}
          aria-expanded={expandedSections["responsive"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaMobileAlt className="text-purple-500" />
            Responsive Image Techniques
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["responsive"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["responsive"] && (
          <div className="space-y-8">
            {responsiveImages.map((example, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{example.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {example.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {example.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {renderCodeExample(
                    example.html,
                    example.css,
                    "",
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

      {/* Image Optimization section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("optimization")}
          aria-expanded={expandedSections["optimization"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaGlobe className="text-orange-500" />
            Image Optimization
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["optimization"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["optimization"] && (
          <div className="space-y-8">
            {imageOptimization.map((practice, index) => (
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
                    practice.js,
                    practice.title
                  )}
                  <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                    <strong>Why this matters:</strong> {practice.explanation}
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

      {/* Advanced Techniques section */}
      <section className="mb-12">
        <button
          className="flex items-center justify-between w-full cursor-pointer mb-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => toggleSection("advanced")}
          aria-expanded={expandedSections["advanced"]}
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaCode className="text-blue-500" />
            Advanced Image Techniques
          </h2>
          <FaChevronDown
            className={`transition-transform ${expandedSections["advanced"] ? "rotate-180" : ""}`}
          />
        </button>

        {expandedSections["advanced"] && (
          <div className="space-y-8">
            {advancedTechniques.map((item, index) => (
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
                  {renderCodeExample(item.html, item.css, item.js, item.title)}
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    <strong>Use Case:</strong> {item.useCase}
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

      {/* Interactive Playground */}
      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                Image Playground
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experiment with different image techniques in our live editor
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
              <div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                  Multiple Image Examples
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Try different gallery layouts and responsive techniques
                </p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                Live Preview
              </span>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-medium mb-2">Basic Gallery</h4>
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
    }
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .gallery img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s;
    }
    .gallery img:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>
  <h1>Image Gallery Example</h1>
  
  <div class="gallery">
    <img src="${IMAGE_PATHS.landscape}" alt="Landscape">
    <img src="${IMAGE_PATHS.portrait}" alt="Portrait">
    <img src="${IMAGE_PATHS.product}" alt="Product">
    <img src="${IMAGE_PATHS.abstract}" alt="Abstract">
  </div>
</body>
</html>`)
                    }
                    className="w-full text-sm px-4 py-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Try Basic Gallery
                  </button>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Responsive Gallery</h4>
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
    }
    .responsive-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .responsive-gallery img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h1>Responsive Image Gallery</h1>
  
  <div class="responsive-gallery">
    <img 
      src="${IMAGE_PATHS.small}"
      srcset="
        ${IMAGE_PATHS.small} 480w,
        ${IMAGE_PATHS.medium} 768w,
        ${IMAGE_PATHS.large} 1200w
      "
      sizes="(max-width: 600px) 480px, (max-width: 1000px) 768px, 1200px"
      alt="Responsive image 1"
    >
    <img 
      src="${IMAGE_PATHS.small}"
      srcset="
        ${IMAGE_PATHS.small} 480w,
        ${IMAGE_PATHS.medium} 768w,
        ${IMAGE_PATHS.large} 1200w
      "
      sizes="(max-width: 600px) 480px, (max-width: 1000px) 768px, 1200px"
      alt="Responsive image 2"
    >
  </div>
</body>
</html>`)
                    }
                    className="w-full text-sm px-4 py-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    Try Responsive Gallery
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
          href="/html/link-bookmarks"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        <Link
          href="/html/image-maps"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </div>
  );
}