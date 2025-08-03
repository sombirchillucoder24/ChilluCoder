"use client"
import React, { useState } from 'react';

interface SaturnFact {
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

const SaturnArticle: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedMoon, setSelectedMoon] = useState<Moon | null>(null);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleMoonSelect = (moon: Moon) => {
    setSelectedMoon(selectedMoon?.name === moon.name ? null : moon);
  };

  const saturnFacts: SaturnFact[] = [
    {
      title: "Mass",
      description: "Second most massive planet in our solar system",
      value: "5.683 × 10²⁶ kg"
    },
    {
      title: "Diameter",
      description: "Could fit 764 Earths inside",
      value: "116,460 km"
    },
    {
      title: "Distance from Sun",
      description: "Average distance in its elliptical orbit",
      value: "1.4 billion km"
    },
    {
      title: "Day Length",
      description: "Fast rotation creates an oblate shape",
      value: "10.7 Earth hours"
    },
    {
      title: "Year Length",
      description: "One orbit around the Sun",
      value: "29.4 Earth years"
    },
    {
      title: "Moons",
      description: "Known moons as of 2023",
      value: "146 confirmed"
    }
  ];

  const majorMoons: Moon[] = [
    {
      name: "Titan",
      discoveredBy: "Christiaan Huygens",
      year: 1655,
      diameter: "5,150 km",
      description: "The second-largest moon in the solar system and the only one with a substantial atmosphere. Titan has lakes of liquid methane and ethane, and may harbor prebiotic chemistry in its subsurface ocean."
    },
    {
      name: "Enceladus",
      discoveredBy: "William Herschel",
      year: 1789,
      diameter: "504 km",
      description: "A small, icy moon with geysers of water vapor erupting from its south polar region. These plumes suggest the presence of a subsurface ocean that could potentially support microbial life."
    },
    {
      name: "Rhea",
      discoveredBy: "Giovanni Cassini",
      year: 1672,
      diameter: "1,528 km",
      description: "Saturn's second-largest moon with a heavily cratered surface and possible rings of its own. Rhea is composed mostly of water ice with a small rocky core."
    },
    {
      name: "Iapetus",
      discoveredBy: "Giovanni Cassini",
      year: 1671,
      diameter: "1,471 km",
      description: "Known for its dramatic two-tone coloration, with one hemisphere much darker than the other. Iapetus has an equatorial ridge that gives it a walnut-like appearance."
    }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'composition', label: 'Composition' },
    { id: 'moons', label: 'Moons' },
    { id: 'rings', label: 'Ring System' },
    { id: 'exploration', label: 'Exploration' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent mb-6">
              SATURN
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">
              The Ringed Jewel
            </p>
            <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-400 rounded-full shadow-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120%] h-8 bg-gradient-to-b from-amber-200/50 to-transparent rounded-full rotate-45"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[150%] h-6 bg-gradient-to-b from-amber-200/40 to-transparent rounded-full rotate-12"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[180%] h-4 bg-gradient-to-b from-amber-200/30 to-transparent rounded-full rotate-30"></div>
              </div>
            </div>
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
                    ? 'bg-amber-500 text-white shadow-lg transform scale-105'
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
                    Saturn, the sixth planet from the Sun, is the crown jewel of our solar system with its spectacular ring system. This gas giant, named after the Roman god of agriculture, is a world of stunning beauty and fascinating complexity.
                  </p>
                  <p>
                    Second only to Jupiter in size, Saturn is famous for its bright, extensive rings that are visible even through small telescopes. The planet&apos;s low density means it would float in water if you could find a bathtub large enough.
                  </p>
                  <p>
                    Saturn&apos;s atmosphere features subtle bands of clouds and occasional giant storms, though less dramatic than Jupiter&apos;s. The planet&apos;s rapid rotation causes it to bulge at the equator and flatten at the poles, giving it a distinct oblate shape.
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
                      Saturn is primarily composed of hydrogen (96%) and helium (3%), with traces of other elements like methane, ammonia, and water vapor. The planet&apos;s composition is similar to Jupiter&apos;s but with a lower proportion of helium.
                    </p>
                    <p>
                      Deep within Saturn, hydrogen becomes metallic under the extreme pressure, creating a conductive layer that generates the planet&apos;s magnetic field. At the center likely lies a dense core of rock and ice, about 10-20 times Earth&apos;s mass.
                    </p>
                    <p>
                      Saturn&apos;s upper atmosphere features ammonia ice clouds, with layers of ammonium hydrosulfide and water clouds below. The planet&apos;s distinctive golden hue comes from ammonia crystals in its upper atmosphere interacting with ultraviolet light.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-amber-400 mb-4">Atmospheric Composition</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Hydrogen: ~96%</li>
                      <li>• Helium: ~3%</li>
                      <li>• Methane: ~0.4%</li>
                      <li>• Ammonia: ~0.01%</li>
                      <li>• Water vapor: traces</li>
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
                <h2 className="text-4xl font-bold text-white mb-6">Saturn&apos;s Moons</h2>
                <p className="text-gray-300 mb-8">
                  Saturn boasts an impressive system of 146 confirmed moons, ranging from tiny moonlets to massive Titan, which is larger than the planet Mercury. These diverse worlds include some of the most scientifically interesting bodies in the solar system.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {majorMoons.map((moon, index) => (
                    <button
                      key={index}
                      onClick={() => handleMoonSelect(moon)}
                      className={`bg-gray-700/50 rounded-lg p-4 text-left transition-all duration-300 border ${
                        selectedMoon?.name === moon.name
                          ? 'bg-amber-500/30 border-amber-500 transform scale-105'
                          : 'border-gray-600 hover:border-amber-500 hover:bg-amber-500/20'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-amber-400 mb-2">{moon.name}</h3>
                      <p className="text-gray-300 text-sm">Diameter: {moon.diameter}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {selectedMoon?.name === moon.name ? 'Click to close' : 'Click to learn more'}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedMoon && (
                  <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl p-6 border border-amber-500/30 animate-in fade-in duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-bold text-amber-400">{selectedMoon.name}</h3>
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
                          <p><span className="text-amber-400 font-semibold">Discovered by:</span> <span className="text-gray-300">{selectedMoon.discoveredBy}</span></p>
                          <p><span className="text-amber-400 font-semibold">Discovery year:</span> <span className="text-gray-300">{selectedMoon.year}</span></p>
                          <p><span className="text-amber-400 font-semibold">Diameter:</span> <span className="text-gray-300">{selectedMoon.diameter}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className={`w-32 h-32 rounded-full shadow-2xl ${
                          selectedMoon.name === 'Titan' ? 'bg-gradient-to-br from-orange-400 to-gray-600' :
                          selectedMoon.name === 'Enceladus' ? 'bg-gradient-to-br from-blue-100 to-gray-300' :
                          selectedMoon.name === 'Rhea' ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                          'bg-gradient-to-br from-gray-400 to-gray-700'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeSection === 'rings' && (
            <section>
              <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6">The Ring System</h2>
                <div className="space-y-8">
                  <div className="space-y-6 text-gray-300">
                    <p>
                      Saturn&apos;s rings are the most extensive and complex in the solar system, extending up to 282,000 km from the planet yet being only about 10 meters thick in most places. The rings are composed primarily of water ice particles, ranging in size from tiny grains to boulders several meters across.
                    </p>
                    <p>
                      The main rings are labeled A, B, and C, with the Cassini Division being the largest gap between A and B. Fainter rings extend outward, and intricate structures like spokes and braids appear within the rings. The rings are continually shaped by Saturn&apos;s moons through gravitational interactions.
                    </p>
                    <p>
                      Saturn&apos;s rings may be remnants of a destroyed moon or unformed material from the planet&apos;s formation. They orbit the planet at different speeds, with inner particles moving faster than outer ones, following Kepler&apos;s laws of planetary motion.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-amber-400 mb-3">Ring Characteristics</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Main rings: A, B, C (from outermost to innermost)</li>
                        <li>• Composition: 99% water ice with rocky material</li>
                        <li>• Thickness: Typically 10-100 meters</li>
                        <li>• Total mass: About 1/2000th of Earth&apos;s Moon</li>
                        <li>• Temperature: -163°C to -203°C</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-amber-400 mb-3">Ring Formation Theories</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Remnants of a destroyed icy moon</li>
                        <li>• Leftover material from Saturn&apos;s formation</li>
                        <li>• Result of tidal disruption of comets or asteroids</li>
                        <li>• Possibly young (~100 million years) or ancient (~4 billion years)</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
                      Saturn has been visited by four spacecraft: Pioneer 11, Voyager 1, Voyager 2, and most extensively by Cassini-Huygens. The Cassini mission (2004-2017) revolutionized our understanding of the Saturn system, delivering the Huygens probe to Titan&apos;s surface.
                    </p>
                    <p>
                      Cassini&apos;s discoveries included plumes on Enceladus, methane lakes on Titan, and detailed studies of Saturn&apos;s atmosphere and rings. The mission ended with a dramatic &quot;Grand Finale&quot; where Cassini plunged into Saturn&apos;s atmosphere, sending back data until its final moments.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-amber-400 mb-3">Key Discoveries</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Complex ring structures and moon interactions</li>
                        <li>• Liquid methane cycle on Titan resembling Earth&apos;s water cycle</li>
                        <li>• Water plumes from Enceladus&apos; subsurface ocean</li>
                        <li>• Hexagonal storm at Saturn&apos;s north pole</li>
                        <li>• Vertical structures in the rings</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-amber-400 mb-3">Future Missions</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Dragonfly (NASA): Titan rotorcraft lander (launch 2027)</li>
                        <li>• Proposed missions to Enceladus to search for life</li>
                        <li>• Possible Saturn atmospheric probes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

         {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 mt-15">
          {saturnFacts.map((fact, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-amber-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-amber-400 mb-2">{fact.title}</h3>
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
              Explore the beauty and mysteries of the ringed planet
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-amber-400">♄</span>
              <span className="text-yellow-400">🪐</span>
              <span className="text-amber-300">💍</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SaturnArticle;