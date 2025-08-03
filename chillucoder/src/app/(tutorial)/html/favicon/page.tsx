"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import Link from "next/link";
import { Globe, Code, Image, Smartphone, Monitor, Settings, Star, ChevronDown, ChevronUp } from 'lucide-react';

const HTMLFaviconsPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const basicHTML = `<!-- Basic favicon -->
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">

<!-- PNG alternatives -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`;

  const comprehensiveHTML = `<!-- Standard favicons -->
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">

<!-- Android Chrome -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">

<!-- Windows Metro -->
<meta name="msapplication-TileImage" content="/mstile-144x144.png">
<meta name="msapplication-TileColor" content="#ffffff">

<!-- Web App Manifest -->
<link rel="manifest" href="/site.webmanifest">`;

  const svgFavicon = `<!-- SVG Favicon (Modern browsers) -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">

<!-- Fallback for older browsers -->
<link rel="icon" href="/favicon.ico" type="image/x-icon">`;

  const dynamicFavicon = `<!-- Dynamic favicon with JavaScript -->
<script>
  function changeFavicon(theme) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (theme === 'dark') {
      favicon.href = '/favicon-dark.png';
    } else {
      favicon.href = '/favicon-light.png';
    }
  }
  
  // Auto-detect system theme
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    changeFavicon('dark');
  }
</script>`;

  const faviconTypes = [
    {
      name: 'ICO',
      extension: '.ico',
      sizes: '16x16, 32x32, 48x48',
      support: 'Universal',
      pros: 'Compact, multi-size',
      cons: 'Limited colors'
    },
    {
      name: 'PNG',
      extension: '.png',
      sizes: '16x16 to 512x512',
      support: 'All modern',
      pros: 'High quality',
      cons: 'Larger files'
    },
    {
      name: 'SVG',
      extension: '.svg',
      sizes: 'Scalable',
      support: 'Modern only',
      pros: 'Scalable, small',
      cons: 'Limited support'
    }
  ];

  const platformRequirements = [
    {
      platform: 'Desktop',
      icon: <Monitor className="w-4 h-4" />,
      sizes: ['16x16', '32x32'],
      format: 'ICO/PNG'
    },
    {
      platform: 'iOS',
      icon: <Smartphone className="w-4 h-4" />,
      sizes: ['180x180'],
      format: 'PNG'
    },
    {
      platform: 'Android',
      icon: <Globe className="w-4 h-4" />,
      sizes: ['192x192'],
      format: 'PNG'
    },
    {
      platform: 'Windows',
      icon: <Settings className="w-4 h-4" />,
      sizes: ['144x144'],
      format: 'PNG'
    }
  ];

  const bestPractices = [
    {
      title: 'Size',
      description: 'Keep under 10KB',
      tip: 'Use compression tools'
    },
    {
      title: 'Format',
      description: 'Use ICO for compatibility',
      tip: 'Provide multiple formats'
    },
    {
      title: 'Design',
      description: 'Recognizable at 16x16',
      tip: 'High contrast'
    }
  ];

  return (
    <>
      <Head>
        <title>HTML Favicons Guide | Implementation & Best Practices</title>
        <meta name="description" content="Complete guide to HTML favicons - implementation, best practices, and cross-platform compatibility." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
            <div className="flex justify-center mb-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl">
                <Image className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              HTML Favicons
            </h1>
            <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto">
              Comprehensive guide to HTML favicon implementation and optimization
            </p>
          </div>

          {/* Quick Start */}
          <div className="mb-6 bg-white/95 rounded-xl p-4 shadow-md border border-white/30">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-1.5 rounded-md">
                <Star className="w-5 h-5 text-white" />
              </div>
              Quick Start
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2">Basic Implementation</h3>
                <div className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                  <pre><code>{basicHTML}</code></pre>
                </div>
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2">File Requirements</h3>
                <div className="space-y-1 text-xs md:text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span><code className="bg-gray-100 px-1 py-0.5 rounded">favicon.ico</code> - 16x16, 32x32</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span><code className="bg-gray-100 px-1 py-0.5 rounded">favicon-32x32.png</code></span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span><code className="bg-gray-100 px-1 py-0.5 rounded">favicon-16x16.png</code></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Favicon Types */}
          <div className="mb-6 bg-white/95 rounded-xl p-4 shadow-md border border-white/30">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-1.5 rounded-md">
                <Code className="w-5 h-5 text-white" />
              </div>
              Formats
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {faviconTypes.map((type, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all">
                  <h3 className="text-sm md:text-base font-bold text-gray-800 mb-1">{type.name}</h3>
                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="font-medium text-gray-700">Ext:</span>
                      <code className="ml-1 bg-gray-100 px-1 py-0.5 rounded">{type.extension}</code>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Sizes:</span>
                      <span className="ml-1 text-gray-600">{type.sizes}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Support:</span>
                      <span className="ml-1 text-gray-600">{type.support}</span>
                    </div>
                    <div className="pt-1 border-t border-gray-200 text-xs">
                      <div className="text-green-600 font-medium">✓ {type.pros}</div>
                      <div className="text-red-500 font-medium">✗ {type.cons}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Requirements */}
          <div className="mb-6 bg-white/95 rounded-xl p-4 shadow-md border border-white/30">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-1.5 rounded-md">
                <Globe className="w-5 h-5 text-white" />
              </div>
              Platforms
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {platformRequirements.map((platform, index) => (
                <div key={index} className="text-center border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 text-white">
                    {platform.icon}
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-gray-800">{platform.platform}</h3>
                  <div className="text-xs space-y-1 mt-1">
                    <div>
                      <span className="font-medium">Sizes:</span>
                      <div className="text-gray-600">{platform.sizes.join(', ')}</div>
                    </div>
                    <div>
                      <span className="font-medium">Format:</span>
                      <div className="text-gray-600">{platform.format}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Code Sections */}
          <div className="space-y-3 mb-6">
            
            {/* Comprehensive HTML */}
            <div className="bg-white/95 rounded-xl shadow-md border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleSection('comprehensive')}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-sm md:text-base font-bold text-gray-800 flex items-center gap-2">
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-1.5 rounded-md">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  Complete Implementation
                </h2>
                {expandedSection === 'comprehensive' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSection === 'comprehensive' && (
                <div className="px-3 pb-3">
                  <div className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                    <pre><code>{comprehensiveHTML}</code></pre>
                  </div>
                </div>
              )}
            </div>

            {/* SVG Favicon */}
            <div className="bg-white/95 rounded-xl shadow-md border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleSection('svg')}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-sm md:text-base font-bold text-gray-800 flex items-center gap-2">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-1.5 rounded-md">
                    <Image className="w-4 h-4 text-white" />
                  </div>
                  SVG Favicons
                </h2>
                {expandedSection === 'svg' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSection === 'svg' && (
                <div className="px-3 pb-3">
                  <div className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                    <pre><code>{svgFavicon}</code></pre>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Favicon */}
            <div className="bg-white/95 rounded-xl shadow-md border border-white/30 overflow-hidden">
              <button
                onClick={() => toggleSection('dynamic')}
                className="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-sm md:text-base font-bold text-gray-800 flex items-center gap-2">
                  <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-1.5 rounded-md">
                    <Settings className="w-4 h-4 text-white" />
                  </div>
                  Dynamic Favicons
                </h2>
                {expandedSection === 'dynamic' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {expandedSection === 'dynamic' && (
                <div className="px-3 pb-3">
                  <div className="bg-gray-800 text-gray-100 p-3 rounded-lg overflow-x-auto text-xs md:text-sm">
                    <pre><code>{dynamicFavicon}</code></pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-white/95 rounded-xl p-4 shadow-md border border-white/30">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-1.5 rounded-md">
                <Star className="w-5 h-5 text-white" />
              </div>
              Best Practices
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {bestPractices.map((practice, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all">
                  <h3 className="text-sm font-bold text-gray-800">{practice.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{practice.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded p-2">
                    <p className="text-blue-800 text-xs font-medium">💡 {practice.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

           

          {/* Footer */}
          <div className="text-center mt-6 text-white/70 text-sm">
            <p>Ready to implement perfect favicons? Start with the basic HTML!</p>
          </div>

        </div>
      </div>
           {/* Navigation Footer */}
      <section className="flex justify-between items-center px-4 py-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/html/image-maps"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous
        </Link>

        <Link
          href="/html/ordered-list" 
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next &gt;
        </Link>
      </section>
    </>
  );
};

export default HTMLFaviconsPage;