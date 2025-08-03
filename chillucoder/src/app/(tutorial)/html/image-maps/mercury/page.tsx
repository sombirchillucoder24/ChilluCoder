"use client"
import React, { useState } from 'react';

interface MercuryFact {
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

const MercuryArticle: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedMoon, setSelectedMoon] = useState<Moon | null>(null);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleMoonSelect = (moon: Moon) => {
    setSelectedMoon(selectedMoon?.name === moon.name ? null : moon);
  };

  const mercuryFacts: MercuryFact[] = [
    {
      title: "Mass",
      description: "Smallest planet in our solar system",
      value: "3.30 × 10²³ kg"
    },
    {
      title: "Diameter",
      description: "Only slightly larger than Earth's Moon",
      value: "4,880 km"
    },
    {
      title: "Distance from Sun",
      description: "Closest planet to our star",
      value: "57.9 million km"
    },
    {
      title: "Day Length",
      description: "Long day due to slow rotation",
      value: "1,408 Earth hours"
    },
    {
      title: "Year Length",
      description: "Fastest orbital period",
      value: "88 Earth days"
    },
    {
      title: "Moons",
      description: "Natural satellites",
      value: "0"
    }
  ];

  const majorMoons: Moon[] = [
    {
      name: "No Moons",
      discoveredBy: "N/A",
      year: 0,
      diameter: "N/A",
      description: "Mercury has no natural satellites, making it one of only two planets in our solar system without moons (the other being Venus)."
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-400/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent mb-6">
              MERCURY
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">
              The Swift Planet
            </p>
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-gradient-to-br from-gray-500 via-gray-400 to-gray-600 rounded-full shadow-2xl animate-pulse"></div>
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
                    ? 'bg-gray-500 text-white shadow-lg transform scale-105'
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
                    Mercury, the smallest and innermost planet in our solar system, is a world of extremes. Named after the Roman messenger god for its rapid movement across the sky, Mercury completes its orbit around the Sun in just 88 Earth days—the shortest year of any planet.
                  </p>
                  <p>
                    This rocky planet experiences the most extreme temperature variations in the solar system, ranging from -173°C (-280°F) at night to 427°C (800°F) during the day. Mercury&apos;s surface resembles Earth&apos;s Moon, pockmarked with craters from countless impacts over billions of years.
                  </p>
                  <p>
                    Despite its proximity to the Sun, Mercury may harbor water ice in permanently shadowed craters at its poles. The planet has a surprisingly large iron core, making up about 85% of its radius, which generates a weak magnetic field—unique among the solar system&apos;s small, rocky planets.
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
                      Mercury has an unusually large metallic core that makes up about 85% of the planet&apos;s radius. This massive core is composed primarily of iron and nickel, surrounded by a relatively thin silicate mantle and crust.
                    </p>
                    <p>
                      The planet&apos;s surface is dominated by plains and heavily cratered terrain, with evidence of ancient volcanic activity. Mercury&apos;s crust is rich in minerals like plagioclase feldspar and pyroxene, similar to lunar highland rocks.
                    </p>
                    <p>
                      Mercury&apos; extremely thin atmosphere, called an exosphere, consists of atoms blasted off its surface by solar radiation and micrometeoroid impacts. This tenuous envelope contains oxygen, sodium, hydrogen, helium, and potassium.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-500/20 to-gray-400/20 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-400 mb-4">Atmospheric Composition</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Oxygen: ~42%</li>
                      <li>• Sodium: ~29%</li>
                      <li>• Hydrogen: ~22%</li>
                      <li>• Helium: ~6%</li>
                      <li>• Potassium: ~0.5%</li>
                      <li>• Trace gases: ~0.5%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'moons' && (
            <section>
              <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6">Mercury&apos;s Moons</h2>
                <p className="text-gray-300 mb-8">
                  Mercury has no natural satellites, making it one of only two planets in our solar system without moons (the other being Venus). Its proximity to the Sun makes it unlikely to have captured or maintained any moons over its history.
                </p>
                
                <div className="grid md:grid-cols-1 gap-4 mb-8">
                  {majorMoons.map((moon, index) => (
                    <button
                      key={index}
                      onClick={() => handleMoonSelect(moon)}
                      className={`bg-gray-700/50 rounded-lg p-4 text-left transition-all duration-300 border ${
                        selectedMoon?.name === moon.name
                          ? 'bg-gray-500/30 border-gray-500 transform scale-105'
                          : 'border-gray-600 hover:border-gray-500 hover:bg-gray-500/20'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-gray-400 mb-2">{moon.name}</h3>
                      <p className="text-gray-300 text-sm">Diameter: {moon.diameter}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {selectedMoon?.name === moon.name ? 'Click to close' : 'Click to learn more'}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedMoon && (
                  <div className="bg-gradient-to-br from-gray-500/10 to-gray-400/10 rounded-xl p-6 border border-gray-500/30 animate-in fade-in duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-bold text-gray-400">{selectedMoon.name}</h3>
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
                          <p><span className="text-gray-400 font-semibold">Discovered by:</span> <span className="text-gray-300">{selectedMoon.discoveredBy}</span></p>
                          <p><span className="text-gray-400 font-semibold">Discovery year:</span> <span className="text-gray-300">{selectedMoon.year}</span></p>
                          <p><span className="text-gray-400 font-semibold">Diameter:</span> <span className="text-gray-300">{selectedMoon.diameter}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full shadow-2xl bg-gradient-to-br from-gray-600 to-gray-800"></div>
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
                      Mercury has been visited by only two spacecraft to date: Mariner 10 in the 1970s and MESSENGER in the 2000s. Its proximity to the Sun makes missions challenging due to the intense gravitational pull and heat.
                    </p>
                    <p>
                      The MESSENGER mission (2011-2015) revolutionized our understanding of Mercury, mapping nearly the entire planet and discovering water ice in polar craters. The BepiColombo mission, launched in 2018, is currently en route to study Mercury in unprecedented detail.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-400 mb-3">Notable Missions</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Mariner 10 (1974-1975): First flybys, mapped 45% of surface</li>
                        <li>• MESSENGER (2011-2015): First orbiter, mapped entire planet</li>
                        <li>• BepiColombo (2018): ESA/JAXA joint mission arriving 2025</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-400 mb-3">Future Missions</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• BepiColombo science phase begins 2025</li>
                        <li>• Proposed lander missions to study surface composition</li>
                        <li>• Potential sample return missions in distant future</li>
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
                      Mercury&apos;s extreme environment and unusual composition make it a valuable laboratory for understanding planetary formation and evolution. Its large iron core challenges theories of how terrestrial planets form and evolve.
                    </p>
                    <p>
                      Studying Mercury helps scientists understand the conditions at the inner edge of the solar system and provides insights into how planets form close to their stars—relevant to understanding exoplanetary systems.
                    </p>
                    <p>
                      Mercury&apos;s surface preserves a record of the early solar system&apos;s bombardment history, less altered by geological processes than larger planets. Its proximity to the Sun also makes it an ideal location for studying solar physics and space weather effects.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-400 mb-3">Planetary Formation</h3>
                      <p className="text-gray-300 text-sm">Mercury&apos;s large core challenges our understanding of how terrestrial planets form and evolve.</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-600/20 to-gray-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-400 mb-3">Solar Physics</h3>
                      <p className="text-gray-300 text-sm">Mercury&apos;s proximity to the Sun makes it an ideal solar observatory.</p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-400/20 to-gray-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-400 mb-3">Exoplanet Analog</h3>
                      <p className="text-gray-300 text-sm">Mercury helps us understand hot, close-orbiting exoplanets around other stars.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

         {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 pt-15">
          {mercuryFacts.map((fact, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-400 mb-2">{fact.title}</h3>
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
              Explore the smallest and swiftest planet in our solar system
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-gray-400">☿</span>
              <span className="text-gray-300">🪐</span>
              <span className="text-gray-200">🌑</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MercuryArticle;