"use client";

import { useState } from "react";
import { FaGlobeAmericas, FaLayerGroup, FaWater, FaMountain, FaCloud, FaLeaf } from "react-icons/fa";

export default function EarthBlog() {
  const [activeTab, setActiveTab] = useState<"structure" | "systems" | "facts">("structure");

  const earthData = {
    structure: [
      {
        title: "Crust",
        icon: <FaLayerGroup className="text-amber-600" />,
        thickness: "5-70 km",
        composition: "Oxygen, Silicon, Aluminum",
        description: "Earth's thin outer shell where all life exists. Continental crust is thicker but less dense than oceanic crust."
      },
      {
        title: "Mantle",
        icon: <FaMountain className="text-orange-600" />,
        thickness: "2,900 km",
        composition: "Silicate rocks rich in iron/magnesium",
        description: "A slowly flowing solid that drives plate tectonics through convection currents."
      },
      {
        title: "Outer Core",
        icon: <FaWater className="text-yellow-500" />,
        thickness: "2,200 km",
        composition: "Liquid iron/nickel",
        description: "Creates Earth's magnetic field through its movement around the inner core."
      },
      {
        title: "Inner Core",
        icon: <FaGlobeAmericas className="text-red-600" />,
        thickness: "1,220 km radius",
        composition: "Solid iron/nickel",
        description: "Despite 5,400°C temperatures, immense pressure keeps it solid."
      }
    ],
    systems: [
      {
        title: "Hydrosphere",
        icon: <FaWater className="text-blue-500" />,
        coverage: "71% of surface",
        keyFact: "Contains 1.4 billion km³ of water",
        description: "All of Earth's water including oceans, glaciers, and atmospheric vapor."
      },
      {
        title: "Atmosphere",
        icon: <FaCloud className="text-sky-400" />,
        layers: "5 main layers",
        composition: "78% N₂, 21% O₂",
        description: "Protective gas envelope extending 10,000 km into space."
      },
      {
        title: "Biosphere",
        icon: <FaLeaf className="text-green-600" />,
        depth: "20 km range",
        biodiversity: "8.7 million species",
        description: "All living organisms and their environments on Earth."
      }
    ],
    facts: [
      {
        category: "Dimensions",
        items: [
          "Equatorial diameter: 12,756 km",
          "Polar diameter: 12,714 km",
          "Circumference: 40,075 km"
        ]
      },
      {
        category: "Movement",
        items: [
          "Orbital speed: 107,000 km/h",
          "Axial tilt: 23.5° (causes seasons)",
          "Day length: 23h 56m 4s (sidereal day)"
        ]
      },
      {
        category: "Composition",
        items: [
          "Mass: 5.97 × 10²⁴ kg",
          "Density: 5.51 g/cm³",
          "Surface gravity: 9.8 m/s²"
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-600 mb-4">
          Our Planet Earth
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          The only known planet with life in the universe
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
        <button
          className={`px-6 py-3 font-medium ${activeTab === "structure" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("structure")}
        >
          Structure
        </button>
        <button
          className={`px-6 py-3 font-medium ${activeTab === "systems" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("systems")}
        >
          Systems
        </button>
        <button
          className={`px-6 py-3 font-medium ${activeTab === "facts" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("facts")}
        >
          Quick Facts
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === "structure" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {earthData.structure.map((layer, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">{layer.icon}</div>
              <h3 className="text-xl font-bold mb-2">{layer.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p><span className="font-medium">Thickness:</span> {layer.thickness}</p>
                <p><span className="font-medium">Main Elements:</span> {layer.composition}</p>
                <p className="mt-3">{layer.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "systems" && (
        <div className="grid md:grid-cols-3 gap-6">
          {earthData.systems.map((system, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">{system.icon}</div>
              <h3 className="text-xl font-bold mb-2">{system.title}</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                {system.coverage && <p><span className="font-medium">Coverage:</span> {system.coverage}</p>}
                {system.layers && <p><span className="font-medium">Layers:</span> {system.layers}</p>}
                {system.keyFact && <p><span className="font-medium">Volume:</span> {system.keyFact}</p>}
                <p className="mt-3">{system.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "facts" && (
        <div className="grid md:grid-cols-3 gap-6">
          {earthData.facts.map((category, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">{category.category}</h3>
              <ul className="space-y-3">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Earth Visualization */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-8">Earth's Layers Visualization</h2>
        <div className="max-w-md mx-auto relative">
          <div className="relative w-full aspect-square">
            {/* Crust */}
            <div className="absolute inset-0 rounded-full border-8 border-amber-300"></div>
            {/* Mantle */}
            <div className="absolute inset-8 rounded-full border-8 border-orange-400"></div>
            {/* Outer Core */}
            <div className="absolute inset-16 rounded-full border-8 border-yellow-500"></div>
            {/* Inner Core */}
            <div className="absolute inset-24 rounded-full bg-red-500"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-amber-300 rounded-full mr-2"></div>
              <span>Crust</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-400 rounded-full mr-2"></div>
              <span>Mantle</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span>Outer Core</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span>Inner Core</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Did You Know?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Water World</h3>
            <p className="text-gray-600 dark:text-gray-300">
              If Earth's surface were perfectly smooth, water would cover it uniformly to a depth of 2.7 km.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-bold text-green-600 dark:text-green-400 mb-2">Ancient Earth</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Some zircon crystals from Australia are 4.4 billion years old - almost as old as Earth itself.
            </p>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Dense Core</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Earth's inner core is as hot as the Sun's surface but remains solid due to extreme pressure.
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
            <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Magnetic Shield</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Without our magnetic field, solar winds would strip away the atmosphere like what happened to Mars.
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Earth science data from NASA and USGS. Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}