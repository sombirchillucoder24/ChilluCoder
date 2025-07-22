"use client";

import { useState } from "react";
import { FaTemperatureHigh, FaClock, FaWind, FaMountain, FaCloud, FaRocket, FaEye, FaSnowflake, FaBolt, FaGlobe } from "react-icons/fa";

export default function VenusBlog() {
  const articles = [
    {
      id: 1,
      title: "The Hottest Planet in Our Solar System",
      excerpt: "Why Venus is hotter than Mercury despite being farther from the Sun",
      icon: <FaTemperatureHigh className="text-red-500" />,
      content: [
        "Venus has an average surface temperature of 464°C (867°F), hot enough to melt lead, zinc, and tin.",
        "This extreme heat comes from its thick CO₂ atmosphere (96.5% carbon dioxide) that traps heat via the greenhouse effect.",
        "Surface pressure is 92 times Earth's - equivalent to being 900m underwater on Earth.",
        "The greenhouse effect is so extreme that temperatures barely vary between day and night, or between poles and equator.",
        "Even at the cloud tops (50-70km altitude), temperatures still reach 0°C to 60°C."
      ]
    },
    {
      id: 2,
      title: "A Day Longer Than a Year",
      excerpt: "Venus' bizarre rotation and orbital characteristics",
      icon: <FaClock className="text-blue-400" />,
      content: [
        "Venus takes 243 Earth days to complete one rotation (longest day in the solar system).",
        "It orbits the Sun every 225 Earth days - making its day longer than its year!",
        "Venus rotates backwards (retrograde rotation) compared to most planets - the Sun rises in the west.",
        "This retrograde rotation may result from a massive ancient collision that flipped the planet.",
        "One Venus solar day (sunrise to sunrise) actually takes 117 Earth days due to its orbital motion.",
        "Venus has the most circular orbit of any planet, with an eccentricity of only 0.007."
      ]
    },
    {
      id: 3,
      title: "Super-Rotating Atmosphere",
      excerpt: "The strange winds of Venus' upper atmosphere",
      icon: <FaWind className="text-gray-300" />,
      content: [
        "Upper atmosphere winds circle Venus every 4 Earth days at 300-400 km/h (super-rotation).",
        "These winds are 60 times faster than the planet's rotation - a phenomenon still not fully understood.",
        "Surface winds are slow (few km/h) but atmospheric density makes them incredibly powerful.",
        "Sulfuric acid clouds complete a full rotation every 4-5 days at altitudes of 50-70km.",
        "The atmosphere exhibits mysterious Y-shaped cloud patterns visible in UV light.",
        "Wind speeds decrease dramatically with altitude - from 400 km/h at cloud tops to walking pace at surface."
      ]
    },
    {
      id: 4,
      title: "Volcanic Landscape",
      excerpt: "Venus' young, active surface features",
      icon: <FaMountain className="text-amber-600" />,
      content: [
        "Venus has over 1,600 major volcanoes and possibly millions of smaller ones - more than any other planet.",
        "Maxwell Montes is its highest mountain (11 km - taller than Everest) located in Ishtar Terra.",
        "Surface appears geologically young (300-600 million years old) with few impact craters.",
        "Evidence suggests volcanic activity may still be occurring today based on atmospheric sulfur variations.",
        "Unique volcanic features include 'coronae' - large circular volcanic structures up to 2,100km across.",
        "The entire surface may have been resurfaced by massive volcanic activity 300-500 million years ago."
      ]
    },
    {
      id: 5,
      title: "The Veiled Planet",
      excerpt: "Why we can't see Venus' surface from space",
      icon: <FaCloud className="text-yellow-200" />,
      content: [
        "Thick clouds of sulfuric acid completely obscure the surface from visible light.",
        "Cloud layers extend from 50-70km altitude with droplets so corrosive they'd destroy metal.",
        "Radar mapping is required to study surface features - first accomplished by Magellan probe.",
        "Cloud tops reflect 75% of sunlight, making Venus the brightest natural object in our night sky after the Moon.",
        "Below the clouds lies a crystal-clear atmosphere of CO₂ with 15km visibility at surface level.",
        "The atmospheric pressure creates a strong greenhouse effect that distributes heat globally."
      ]
    },
    {
      id: 6,
      title: "Space Exploration Challenges",
      excerpt: "Why Venus missions are among the most difficult",
      icon: <FaRocket className="text-purple-500" />,
      content: [
        "Only about 40% of Venus missions have been successful due to extreme conditions.",
        "Soviet Venera probes were the first to land, but survived only 23 minutes to 2 hours on surface.",
        "Spacecraft must withstand crushing pressure, corrosive atmosphere, and lead-melting temperatures.",
        "Electronics fail rapidly in Venus conditions - special cooling and pressure-resistant designs needed.",
        "Recent missions include Japan's Akatsuki orbiter and proposed NASA VERITAS and DAVINCI+ missions.",
        "Future missions may use balloons in the upper atmosphere where conditions are more Earth-like."
      ]
    },
    {
      id: 7,
      title: "Venus vs Earth: The Twin Planets",
      excerpt: "Comparing our planetary neighbor to home",
      icon: <FaGlobe className="text-green-400" />,
      content: [
        "Venus is often called Earth's twin due to similar size (95% of Earth's diameter) and mass (82% of Earth's).",
        "Both planets likely formed from similar materials in the inner solar system.",
        "However, Venus lacks plate tectonics, magnetic field, and water - key differences from Earth.",
        "Venus may have had oceans billions of years ago before a runaway greenhouse effect boiled them away.",
        "The lack of a magnetic field allows solar wind to strip away atmospheric hydrogen.",
        "Venus serves as a cautionary example of how greenhouse effects can make planets uninhabitable."
      ]
    },
    {
      id: 8,
      title: "Lightning and Electrical Activity",
      excerpt: "The shocking electrical phenomena on Venus",
      icon: <FaBolt className="text-yellow-300" />,
      content: [
        "Venus experiences constant lightning activity, possibly more frequent than on Earth.",
        "Lightning occurs primarily in the lower cloud layers around 30-40km altitude.",
        "The electrical activity may be linked to volcanic outgassing and chemical reactions in clouds.",
        "Radio signals from Venus lightning have been detected by multiple spacecraft.",
        "The dense atmosphere makes lightning propagation different from Earth's thinner air.",
        "Some scientists theorize the lightning could help explain Venus's atmospheric chemistry."
      ]
    },
    {
      id: 9,
      title: "The Mystery of Venus Snow",
      excerpt: "Metallic snow in Venus's high mountains",
      icon: <FaSnowflake className="text-blue-300" />,
      content: [
        "Venus's highest peaks are covered in a metallic 'snow' made of lead sulfide and bismuth sulfide.",
        "This metallic frost forms at high altitudes where temperatures drop enough for metals to condense.",
        "The phenomenon is unique in the solar system - no other planet has metallic precipitation.",
        "Radar observations show these mountain peaks are highly reflective due to metal coatings.",
        "The process is similar to how water condenses into snow on Earth, but with heavy metals instead.",
        "This discovery was made by analyzing radar reflectivity data from the Magellan spacecraft."
      ]
    },
    {
      id: 10,
      title: "Observing Venus from Earth",
      excerpt: "How to spot and study our planetary neighbor",
      icon: <FaEye className="text-indigo-400" />,
      content: [
        "Venus shows phases like the Moon when viewed through telescopes - a key proof of heliocentrism.",
        "Best viewing times are during greatest elongation - when Venus appears farthest from the Sun.",
        "Venus can be seen in daylight with the naked eye if you know exactly where to look.",
        "Transit events, when Venus crosses the Sun's face, occur in pairs separated by over 100 years.",
        "The last transit was in 2012; the next pair will occur in 2117 and 2125.",
        "Ancient civilizations tracked Venus as both morning and evening 'star' before realizing it was one object."
      ]
    }
  ];

  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-orange-50/30 to-yellow-50/30 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4">
          Venus: Earth's Mysterious Twin
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Unveiling the secrets of our planetary neighbor - the hottest, most volcanic, and most mysterious world in our solar system
        </p>
        <div className="mt-6 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 h-1 w-24 rounded"></div>
      </header>

      <div className="space-y-6">
        {articles.map((article) => (
          <article 
            key={article.id} 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-orange-200/30 dark:border-gray-700"
          >
            <button
              className="w-full text-left p-6 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-yellow-50/50 dark:hover:from-gray-700/50 dark:hover:to-gray-600/50 transition-all duration-200"
              onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-1 p-3 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-sm">
                  {article.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {article.excerpt}
                  </p>
                  <div className="mt-3 flex items-center text-orange-500 font-medium">
                    <span className="mr-2">{expandedArticle === article.id ? '↑' : '↓'}</span>
                    <span>{expandedArticle === article.id ? 'Collapse' : 'Expand'}</span>
                  </div>
                </div>
              </div>
            </button>

            {expandedArticle === article.id && (
              <div className="px-6 pb-6 bg-gradient-to-br from-orange-25/50 to-yellow-25/50 dark:from-gray-800/50 dark:to-gray-700/50">
                <div className="border-t border-orange-200/30 dark:border-gray-600 pt-6">
                  <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                    {article.content.map((paragraph, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 mt-2 w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex-shrink-0"></span>
                        <span className="leading-relaxed">{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
                    Source: NASA/JPL Venus Fact Sheet, ESA Venus Express, JAXA Akatsuki Mission Data
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-br from-orange-100/60 to-yellow-100/60 dark:from-gray-800/60 dark:to-gray-700/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-orange-200/40 dark:border-gray-600">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Venus Quick Facts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-orange-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">4.87</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Earth Masses</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-orange-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-red-500 mb-2">464°C</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Surface Temperature</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-orange-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-blue-400 mb-2">243d</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Day Length</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-orange-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-green-500 mb-2">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Moons</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-orange-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-purple-500 mb-2">92x</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Earth's Pressure</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-orange-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-orange-500 mb-2">96.5%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">CO₂ Atmosphere</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-orange-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-cyan-500 mb-2">225d</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Orbital Period</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-orange-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-indigo-500 mb-2">1,600+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Major Volcanoes</div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-r from-red-900/10 via-orange-900/10 to-yellow-900/10 dark:from-gray-800/60 dark:to-gray-700/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-red-200/30 dark:border-gray-600">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Did You Know?</h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-orange-200/30 dark:border-gray-600">
            <h4 className="font-bold text-orange-600 dark:text-orange-400 mb-2">Ancient Mystery</h4>
            <p>Ancient civilizations thought Venus was two different objects - the morning star (Phosphoros) and evening star (Hesperos).</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-orange-200/30 dark:border-gray-600">
            <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">Hellish Surface</h4>
            <p>Venus's surface conditions are so extreme they would crush, melt, and dissolve a human in seconds.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-orange-200/30 dark:border-gray-600">
            <h4 className="font-bold text-yellow-600 dark:text-yellow-400 mb-2">Bright Beauty</h4>
            <p>Venus is so bright it can cast shadows on Earth and be seen in broad daylight if you know where to look.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-orange-200/30 dark:border-gray-600">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Time Warp</h4>
            <p>If you lived on Venus, you'd experience only 1.92 Venus days per Venus year - time moves strangely there!</p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl">
        <p className="mb-2">Planetary science data from NASA, ESA, JAXA, and Roscosmos missions</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}