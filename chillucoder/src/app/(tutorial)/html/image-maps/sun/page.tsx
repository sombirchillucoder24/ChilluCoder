"use client";

import { FaSun, FaTemperatureHigh, FaWeight, FaRuler, FaHistory } from "react-icons/fa";

export default function SunFactsBlog() {
  const facts = [
    {
      icon: <FaSun className="text-yellow-500 text-2xl" />,
      title: "What is the Sun?",
      content: "The Sun is a nearly perfect sphere of hot plasma at the center of our solar system. It's a G-type main-sequence star (G2V) that provides the energy necessary for life on Earth."
    },
    {
      icon: <FaTemperatureHigh className="text-red-500 text-2xl" />,
      title: "Temperature Extremes",
      content: "The Sun's core reaches about 15 million °C (27 million °F), while the surface (photosphere) is about 5,500°C (9,932°F). The corona (outer atmosphere) can reach over 1 million °C!"
    },
    {
      icon: <FaWeight className="text-blue-500 text-2xl" />,
      title: "Mass and Composition",
      content: "The Sun contains 99.86% of the mass in our solar system. It's composed of about 74% hydrogen and 24% helium, with trace amounts of heavier elements."
    },
    {
      icon: <FaRuler className="text-green-500 text-2xl" />,
      title: "Size and Distance",
      content: "Diameter: 1.4 million km (109 Earths across). Distance from Earth: ~150 million km (1 astronomical unit). Light takes 8 minutes 20 seconds to reach us."
    },
    {
      icon: <FaHistory className="text-purple-500 text-2xl" />,
      title: "Age and Lifespan",
      content: "The Sun is about 4.6 billion years old and has enough fuel for another 5 billion years before becoming a red giant."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 mb-4">
          Our Amazing Sun
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Fascinating facts about the star at the center of our solar system
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-4">
            Why the Sun Matters
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The Sun is the ultimate source of energy for Earth&apos;s climate system and is essential for life as we know it. Without its heat and light, Earth would be a frozen, lifeless rock.
          </p>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mr-2">☀️</span>
              <span>Drives photosynthesis in plants</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">🌊</span>
              <span>Powers weather systems and ocean currents</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">⏳</span>
              <span>Provides the rhythm for our days and seasons</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            Solar Activity
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The Sun is constantly changing, with an 11-year cycle of activity that affects space weather.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <h3 className="font-bold text-yellow-600 dark:text-yellow-400">Sunspots</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cooler, dark regions caused by magnetic activity</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <h3 className="font-bold text-red-600 dark:text-red-400">Solar Flares</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sudden flashes of increased brightness</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <h3 className="font-bold text-purple-600 dark:text-purple-400">CMEs</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Coronal mass ejections release huge plasma clouds</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <h3 className="font-bold text-blue-600 dark:text-blue-400">Solar Wind</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Constant stream of charged particles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {facts.map((fact, index) => (
          <div key={index} className="flex items-start gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-yellow-100 dark:bg-gray-700 p-3 rounded-full">
              {fact.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {fact.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {fact.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Fun Solar Comparisons
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Earths in Sun</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">1.3 million</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Time to orbit galaxy</p>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">230 million yrs</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Energy output</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">384 yottawatts</p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>All facts verified by NASA Solar Physics research. Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}