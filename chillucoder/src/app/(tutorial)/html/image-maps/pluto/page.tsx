"use client";

import { useState } from "react";
import { FaSnowflake, FaHeart, FaMoon, FaRocket, FaGlobe, FaCamera, FaClock, FaAtom, FaCompass, FaMountain } from "react-icons/fa";

export default function PlutoBlog() {
  const articles = [
    {
      id: 1,
      title: "The Reclassified World",
      excerpt: "From ninth planet to dwarf planet - Pluto's controversial status change",
      icon: <FaGlobe className="text-purple-500" />,
      content: [
        "Discovered in 1930 by Clyde Tombaugh at Lowell Observatory, Pluto was the ninth planet for 76 years.",
        "In 2006, the International Astronomical Union reclassified Pluto as a 'dwarf planet' due to new criteria.",
        "The reclassification required planets to 'clear their orbital neighborhood' - something Pluto hasn't done.",
        "Pluto shares its orbital space with many other objects in the Kuiper Belt region.",
        "The decision remains controversial among astronomers and the public - some still consider it the ninth planet.",
        "Pluto is the largest known dwarf planet in the outer solar system and prototype of the Pluto-class objects."
      ]
    },
    {
      id: 2,
      title: "The Heart of Pluto",
      excerpt: "Tombaugh Regio - the famous heart-shaped feature that captured the world",
      icon: <FaHeart className="text-red-400" />,
      content: [
        "The heart-shaped Tombaugh Regio is Pluto's most famous surface feature, spanning 1,590 km across.",
        "Named after Pluto's discoverer Clyde Tombaugh, it's a nitrogen-rich plain with active geology.",
        "The western lobe 'Sputnik Planitia' is a 3-4 km deep impact basin filled with nitrogen ice.",
        "Convection cells in the nitrogen ice create polygonal patterns 10-40 km across, constantly renewing the surface.",
        "The heart's bright appearance comes from relatively fresh nitrogen, methane, and carbon monoxide ices.",
        "Computer models suggest the heart may have formed from a massive impact that also created Charon."
      ]
    },
    {
      id: 3,
      title: "Charon: The Giant Moon",
      excerpt: "Pluto's largest moon and the most extreme double planet system",
      icon: <FaMoon className="text-blue-300" />,
      content: [
        "Charon is half the size of Pluto (1,212 km diameter) - the largest moon relative to its planet in our solar system.",
        "The Pluto-Charon system is often called a 'double dwarf planet' due to their similar sizes.",
        "They are tidally locked, always showing the same face to each other - like cosmic dance partners.",
        "Charon orbits Pluto every 6.4 Earth days at a distance of just 19,640 km.",
        "Charon's surface is mostly water ice with a dark polar cap of organic compounds called 'Mordor Macula'.",
        "The moon has a massive canyon system called Serenity Chasma, stretching over 1,800 km."
      ]
    },
    {
      id: 4,
      title: "New Horizons: The Historic Flyby",
      excerpt: "How a piano-sized spacecraft revolutionized our understanding of Pluto",
      icon: <FaRocket className="text-orange-500" />,
      content: [
        "NASA's New Horizons spacecraft launched in 2006 and flew by Pluto on July 14, 2015.",
        "The flyby occurred at 49,600 km/h, coming within 12,500 km of Pluto's surface.",
        "New Horizons took over 16 months to transmit all flyby data back to Earth due to vast distance.",
        "The mission revealed Pluto as a geologically active world with mountains, plains, and possible subsurface ocean.",
        "Images showed nitrogen glaciers, methane dunes, and evidence of recent geological activity.",
        "The spacecraft continues its mission in the Kuiper Belt, studying other distant objects like Arrokoth."
      ]
    },
    {
      id: 5,
      title: "Extreme Seasons and Climate",
      excerpt: "Pluto's 248-year orbit creates the most extreme seasons in the solar system",
      icon: <FaClock className="text-green-400" />,
      content: [
        "Pluto takes 248 Earth years to orbit the Sun, creating seasons lasting over 60 Earth years each.",
        "Its highly elliptical orbit varies from 30 AU to 49 AU from the Sun (1 AU = Earth-Sun distance).",
        "During closest approach (perihelion), Pluto's thin atmosphere expands as ices sublimate.",
        "At farthest distance (aphelion), most of the atmosphere freezes out onto the surface.",
        "Pluto's axial tilt of 122° means it essentially rolls along its orbital path like Uranus.",
        "The extreme tilt causes each pole to experience 124 years of continuous sunlight, then 124 years of darkness."
      ]
    },
    {
      id: 6,
      title: "A Complex Atmosphere",
      excerpt: "Pluto's thin but dynamic atmosphere full of surprises",
      icon: <FaSnowflake className="text-cyan-300" />,
      content: [
        "Pluto has a thin atmosphere composed primarily of nitrogen with traces of methane and carbon monoxide.",
        "Surface pressure is about 100,000 times thinner than Earth's - roughly equivalent to 160 km altitude on Earth.",
        "The atmosphere extends surprisingly high - over 1,600 km above the surface in multiple haze layers.",
        "Blue haze particles form when methane breaks down in sunlight, creating complex organic compounds called tholins.",
        "Atmospheric escape rate is about 500 tons per hour, but it's replenished by sublimating surface ices.",
        "Computer models suggest the atmosphere may collapse entirely when Pluto moves farther from the Sun."
      ]
    },
    {
      id: 7,
      title: "The Kuiper Belt World",
      excerpt: "Pluto's home in the outer solar system's debris disk",
      icon: <FaCompass className="text-indigo-400" />,
      content: [
        "Pluto resides in the Kuiper Belt, a disk of icy objects beyond Neptune's orbit.",
        "The Kuiper Belt contains thousands of objects, many similar in composition to Pluto.",
        "Pluto is classified as a 'plutoid' - a subcategory of dwarf planets in the outer solar system.",
        "Other large Kuiper Belt objects include Eris, Makemake, Haumea, and hundreds of smaller bodies.",
        "Pluto's orbit is in a 3:2 resonance with Neptune, completing exactly 2 orbits for every 3 of Neptune's.",
        "This resonance prevents close encounters between Pluto and Neptune despite crossing orbits."
      ]
    },
    {
      id: 8,
      title: "Geological Wonders",
      excerpt: "Active geology on a world smaller than Earth's Moon",
      icon: <FaMountain className="text-amber-500" />,
      content: [
        "Pluto has water-ice mountains up to 3.5 km high, comparable to the Rocky Mountains on Earth.",
        "The mountains are geologically young (less than 100 million years) indicating recent activity.",
        "Nitrogen glaciers flow across the surface, similar to glacial activity on Earth.",
        "Possible cryovolcanoes may erupt water, ammonia, and methane instead of molten rock.",
        "Wright Mons and Piccard Mons are large dome-like features possibly formed by cryovolcanic activity.",
        "The surface shows evidence of tectonic activity despite Pluto's small size and distance from the Sun."
      ]
    },
    {
      id: 9,
      title: "The Five Moons of Pluto",
      excerpt: "Charon and four smaller irregular satellites in chaotic orbits",
      icon: <FaAtom className="text-pink-400" />,
      content: [
        "Pluto has five known moons: Charon (largest), Styx, Nix, Kerberos, and Hydra.",
        "The four smaller moons are thought to be debris from the impact that created Charon.",
        "Nix and Hydra are elongated and tumble chaotically due to complex gravitational interactions.",
        "Styx is the smallest known moon, only about 7-25 km across, discovered in 2012.",
        "All moons except Charon have highly reflective surfaces, suggesting they're covered in water ice.",
        "The moons are named after underworld deities and creatures from Greek and Roman mythology."
      ]
    },
    {
      id: 10,
      title: "Future Exploration and Mysteries",
      excerpt: "What we still don't know about the most distant explored world",
      icon: <FaCamera className="text-teal-400" />,
      content: [
        "Many questions remain: Does Pluto have a subsurface ocean? What drives its geological activity?",
        "Future missions could include orbital missions or surface landers to study long-term changes.",
        "Pluto's complex organic chemistry makes it interesting for astrobiology research.",
        "The dwarf planet's interaction with solar wind and its atmospheric evolution remain poorly understood.",
        "Seasonal changes over its 248-year orbit have never been fully observed.",
        "Pluto serves as a prototype for understanding thousands of similar objects in the outer solar system.",
        "Advanced telescopes like the James Webb Space Telescope continue studying Pluto's atmosphere and surface."
      ]
    }
  ];

  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-purple-50/30 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 mb-4">
          Pluto: The Beloved Dwarf Planet
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Exploring the most distant world ever visited by humanity - a complex, active, and surprising dwarf planet at the edge of our solar system
        </p>
        <div className="mt-6 inline-block bg-gradient-to-r from-purple-400 to-indigo-500 h-1 w-24 rounded"></div>
      </header>

      <div className="space-y-6">
        {articles.map((article) => (
          <article 
            key={article.id} 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-200/30 dark:border-gray-700"
          >
            <button
              className="w-full text-left p-6 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 dark:hover:from-gray-700/50 dark:hover:to-purple-800/30 transition-all duration-200"
              onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-1 p-3 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-700 dark:to-purple-800/50 rounded-xl shadow-sm">
                  {article.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {article.excerpt}
                  </p>
                  <div className="mt-3 flex items-center text-purple-500 font-medium">
                    <span className="mr-2">{expandedArticle === article.id ? '↑' : '↓'}</span>
                    <span>{expandedArticle === article.id ? 'Collapse' : 'Expand'}</span>
                  </div>
                </div>
              </div>
            </button>

            {expandedArticle === article.id && (
              <div className="px-6 pb-6 bg-gradient-to-br from-purple-25/50 to-blue-25/50 dark:from-gray-800/50 dark:to-purple-800/20">
                <div className="border-t border-purple-200/30 dark:border-gray-600 pt-6">
                  <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                    {article.content.map((paragraph, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 mt-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex-shrink-0"></span>
                        <span className="leading-relaxed">{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
                    Source: NASA New Horizons Mission, Johns Hopkins APL, Southwest Research Institute
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-br from-purple-100/60 to-blue-100/60 dark:from-gray-800/60 dark:to-purple-800/30 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-200/40 dark:border-gray-600">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Pluto Quick Facts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-purple-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">0.18</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Earth Masses</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-purple-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-blue-500 mb-2">-230°C</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Surface Temperature</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-purple-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-indigo-400 mb-2">6.4d</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Day Length</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-purple-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-pink-500 mb-2">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Known Moons</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-purple-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-green-500 mb-2">248</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Earth Years/Orbit</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-purple-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-orange-500 mb-2">39.5</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">AU from Sun (avg)</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-purple-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-red-500 mb-2">2,374</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Diameter (km)</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-purple-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-cyan-500 mb-2">1930</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Discovery Year</div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-indigo-900/10 dark:from-gray-800/60 dark:to-purple-800/30 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-200/30 dark:border-gray-600">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Amazing Pluto Facts</h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-purple-200/30 dark:border-gray-600">
            <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Tiny but Mighty</h4>
            <p>Pluto is smaller than Earth&apos;s Moon but has five moons of its own and a complex, active geology that rivals much larger worlds.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-purple-200/30 dark:border-gray-600">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Extreme Distance</h4>
            <p>Sunlight takes over 5 hours to reach Pluto. From Pluto&apos;s surface, the Sun appears as just a bright star in the sky.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-purple-200/30 dark:border-gray-600">
            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Historic Discovery</h4>
            <p>Pluto was discovered by comparing photographic plates - a 24-year-old astronomer spotted it moving against the background stars.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-purple-200/30 dark:border-gray-600">
            <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Naming Contest</h4>
            <p>Pluto was named by an 11-year-old English schoolgirl, Venetia Burney, who suggested the Roman god of the underworld.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-purple-200/30 dark:border-gray-600">
            <h4 className="font-bold text-pink-600 dark:text-pink-400 mb-2">Double Planet</h4>
            <p>Pluto and Charon orbit around a point in space between them - they&apos;re more like a double planet than a planet and moon.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-purple-200/30 dark:border-gray-600">
            <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">Changing Seasons</h4>
            <p>A person born during Pluto&apos;s winter would be 62 years old before experiencing spring - each season lasts over 60 Earth years!</p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-br from-indigo-100/60 to-purple-100/60 dark:from-gray-800/60 dark:to-indigo-800/30 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-indigo-200/40 dark:border-gray-600">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">The New Horizons Legacy</h3>
        <div className="text-center space-y-4 text-gray-700 dark:text-gray-300">
          <p className="text-lg">The New Horizons mission transformed Pluto from a fuzzy dot into a real, complex world with mountains, plains, weather, and five moons.</p>
          <p>It showed us that even the most distant worlds in our solar system can be geologically active and full of surprises.</p>
          <p className="font-semibold text-purple-600 dark:text-purple-400">Pluto reminded us that exploration reveals wonders we never imagined possible.</p>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl">
        <p className="mb-2">Data from NASA New Horizons Mission, Johns Hopkins Applied Physics Laboratory, Southwest Research Institute</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}