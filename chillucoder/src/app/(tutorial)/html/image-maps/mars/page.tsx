"use client"
import React, { useState } from 'react';

interface MarsFact {
  title: string;
  description: string;
  value: string;
}

interface Moon {
  name: string;
  discoveredBy: string;
  year: number;
  diameter: string;
  description: string;
}

const MarsArticle: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedMoon, setSelectedMoon] = useState<Moon | null>(null);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleMoonSelect = (moon: Moon) => {
    setSelectedMoon(selectedMoon?.name === moon.name ? null : moon);
  };

  const marsFacts: MarsFact[] = [
    {
      title: "Mass",
      description: "About one-tenth the mass of Earth",
      value: "6.39 × 10²³ kg"
    },
    {
      title: "Diameter",
      description: "About half the size of Earth",
      value: "6,779 km"
    },
    {
      title: "Distance from Sun",
      description: "Average distance in its elliptical orbit",
      value: "227.9 million km"
    },
    {
      title: "Day Length",
      description: "Similar to Earth's day length",
      value: "24.6 Earth hours"
    },
    {
      title: "Year Length",
      description: "One orbit around the Sun",
      value: "687 Earth days"
    },
    {
      title: "Moons",
      description: "Natural satellites",
      value: "2 (Phobos & Deimos)"
    }
  ];

  const majorMoons: Moon[] = [
    {
      name: "Phobos",
      discoveredBy: "Asaph Hall",
      year: 1877,
      diameter: "22.2 km",
      description: "The larger and closer of Mars' two moons, Phobos orbits Mars three times a day and is gradually spiraling inward, destined to either crash into Mars or break up into a ring in about 50 million years."
    },
    {
      name: "Deimos",
      discoveredBy: "Asaph Hall",
      year: 1877,
      diameter: "12.6 km",
      description: "The smaller and more distant moon, Deimos has a smoother appearance than Phobos and orbits Mars every 30 hours. Its name means 'dread' in Greek."
    }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'composition', label: 'Composition' },
    { id: 'moons', label: 'Moons' },
    { id: 'exploration', label: 'Exploration' },
    { id: 'significance', label: 'Significance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent mb-6">
              MARS
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">
              The Red Planet
            </p>
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-gradient-to-br from-red-600 via-orange-500 to-red-700 rounded-full shadow-2xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-red-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
       
        {/* Dynamic Content Sections */}
        <div className="space-y-16">
          
          {activeSection === 'overview' && (
            <section className="prose prose-invert prose-lg max-w-none">
              <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6">Overview</h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p>
                    Mars, the fourth planet from the Sun, has captivated human imagination for centuries with its rusty red appearance and potential for harboring life. Named after the Roman god of war, Mars presents a fascinating world of extremes—with the solar system&apos;s largest volcano and deepest canyon.
                  </p>
                  <p>
                    This terrestrial planet has surface features reminiscent of both Earth and the Moon, including valleys, deserts, and polar ice caps. Mars&apos; thin atmosphere and cold temperatures create an environment that is harsh yet potentially habitable with future human intervention.
                  </p>
                  <p>
                    The planet&apos;s reddish hue comes from iron oxide (rust) in its soil, giving it the nickname &quot;the Red Planet.&quot; Mars has seasons, weather patterns, and even dust storms that can engulf the entire planet, lasting for months.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'composition' && (
            <section>
              <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6">Composition & Structure</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6 text-gray-300">
                    <p>
                      Mars is a terrestrial planet with a core composed primarily of iron, nickel, and sulfur. The planet&apos;s crust is mostly volcanic basalt rock, similar to Earth&apos;s oceanic crust, with iron oxide giving the surface its characteristic red color.
                    </p>
                    <p>
                      Unlike Earth, Mars doesn&apos;t have active plate tectonics today, though evidence suggests it may have had tectonic activity in the past. The planet&apos;s mantle is silicate-rich, and its core is thought to be partially liquid, though it doesn&apos;t generate a global magnetic field like Earth&apos;s.
                    </p>
                    <p>
                      Mars&apos; thin atmosphere is composed mostly of carbon dioxide (95%), with nitrogen (3%) and argon (1.6%) making up most of the remainder. Trace amounts of oxygen and water vapor are also present.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Atmospheric Composition</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Carbon dioxide: ~95%</li>
                      <li>• Nitrogen: ~3%</li>
                      <li>• Argon: ~1.6%</li>
                      <li>• Oxygen: ~0.13%</li>
                      <li>• Water vapor: ~0.03%</li>
                      <li>• Other gases: traces</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'moons' && (
            <section>
              <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6">Mars&apos; Moons</h2>
                <p className="text-gray-300 mb-8">
                  Mars has two small, irregularly shaped moons—Phobos and Deimos—that are thought to be captured asteroids. These moons are among the smallest in the solar system and orbit much closer to their planet than Earth&apos;s Moon.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {majorMoons.map((moon, index) => (
                    <button
                      key={index}
                      onClick={() => handleMoonSelect(moon)}
                      className={`bg-gray-700/50 rounded-lg p-4 text-left transition-all duration-300 border ${
                        selectedMoon?.name === moon.name
                          ? 'bg-red-500/30 border-red-500 transform scale-105'
                          : 'border-gray-600 hover:border-red-500 hover:bg-red-500/20'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-red-400 mb-2">{moon.name}</h3>
                      <p className="text-gray-300 text-sm">Diameter: {moon.diameter}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {selectedMoon?.name === moon.name ? 'Click to close' : 'Click to learn more'}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedMoon && (
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl p-6 border border-red-500/30 animate-in fade-in duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-bold text-red-400">{selectedMoon.name}</h3>
                      <button
                        onClick={() => setSelectedMoon(null)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{selectedMoon.description}</p>
                        <div className="space-y-2 text-sm bg-gray-800/30 rounded-lg p-4">
                          <p><span className="text-red-400 font-semibold">Discovered by:</span> <span className="text-gray-300">{selectedMoon.discoveredBy}</span></p>
                          <p><span className="text-red-400 font-semibold">Discovery year:</span> <span className="text-gray-300">{selectedMoon.year}</span></p>
                          <p><span className="text-red-400 font-semibold">Diameter:</span> <span className="text-gray-300">{selectedMoon.diameter}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className={`w-32 h-32 rounded-full shadow-2xl ${
                          selectedMoon.name === 'Phobos' ? 'bg-gradient-to-br from-gray-600 to-gray-800' :
                          'bg-gradient-to-br from-gray-500 to-gray-700'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeSection === 'exploration' && (
            <section>
              <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6">Space Exploration</h2>
                <div className="space-y-8">
                  <div className="space-y-6 text-gray-300">
                    <p>
                      Mars has been the most explored planet beyond Earth, with numerous missions from multiple space agencies. The exploration of Mars began with flybys in the 1960s and has progressed to sophisticated rovers and orbiters studying the planet&apos;s surface and atmosphere.
                    </p>
                    <p>
                      Recent missions like NASA&apos;s Perseverance rover and China&apos;s Zhurong rover are searching for signs of ancient life and preparing for future human missions. The Mars Reconnaissance Orbiter has been mapping the planet in unprecedented detail since 2006.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-red-400 mb-3">Notable Missions</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Mariner 4 (1965): First successful flyby</li>
                        <li>• Viking 1 & 2 (1976): First successful landers</li>
                        <li>• Mars Pathfinder (1997): First rover (Sojourner)</li>
                        <li>• Spirit & Opportunity (2004): Long-duration rovers</li>
                        <li>• Curiosity (2012): Nuclear-powered rover</li>
                        <li>• Perseverance (2021): Current rover with helicopter</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-red-400 mb-3">Future Missions</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Mars Sample Return: Returning samples to Earth</li>
                        <li>• ExoMars (ESA): Searching for signs of life</li>
                        <li>• Human missions: Planned for 2030s by NASA and SpaceX</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'significance' && (
            <section>
              <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6">Scientific Significance</h2>
                <div className="space-y-8">
                  <div className="space-y-6 text-gray-300">
                    <p>
                      Mars holds unique importance in our solar system as the most Earth-like planet and the most accessible target for future human colonization. Its study helps scientists understand planetary evolution, climate change, and the potential for life beyond Earth.
                    </p>
                    <p>
                      Evidence suggests Mars once had flowing water and a thicker atmosphere, making it a prime location to search for signs of past microbial life. The planet&apos;s geological record preserves a history that has been largely erased on Earth by plate tectonics and erosion.
                    </p>
                    <p>
                      Mars serves as a testing ground for technologies that will enable human exploration of the solar system. Its proximity and relatively hospitable environment make it the most viable candidate for establishing the first permanent human presence beyond Earth.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-red-400 mb-3">Astrobiology</h3>
                      <p className="text-gray-300 text-sm">Mars may have hosted life in its wet past and could still harbor microbial life underground today.</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-yellow-400 mb-3">Human Colonization</h3>
                      <p className="text-gray-300 text-sm">Mars is the most viable planet for establishing a permanent human settlement beyond Earth.</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-400 mb-3">Climate Studies</h3>
                      <p className="text-gray-300 text-sm">Mars&apos; climate history helps us understand Earth&apos;s climate system and long-term changes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

         {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 pt-10">
          {marsFacts.map((fact, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-red-400 mb-2">{fact.title}</h3>
              <p className="text-3xl font-bold text-white mb-2">{fact.value}</p>
              <p className="text-gray-300 text-sm">{fact.description}</p>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              Explore our neighboring world and future second home
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-red-400">♂️</span>
              <span className="text-orange-400">🪐</span>
              <span className="text-yellow-400">🔴</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarsArticle;