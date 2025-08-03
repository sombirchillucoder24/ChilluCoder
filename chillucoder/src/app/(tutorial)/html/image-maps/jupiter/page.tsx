"use client"
import React, { useState } from 'react';

interface JupiterFact {
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

const JupiterArticle: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [selectedMoon, setSelectedMoon] = useState<Moon | null>(null);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleMoonSelect = (moon: Moon) => {
    setSelectedMoon(selectedMoon?.name === moon.name ? null : moon);
  };

  const jupiterFacts: JupiterFact[] = [
    {
      title: "Mass",
      description: "More than twice the mass of all other planets combined",
      value: "1.898 × 10²⁷ kg"
    },
    {
      title: "Diameter",
      description: "Could fit 1,321 Earths inside",
      value: "142,984 km"
    },
    {
      title: "Distance from Sun",
      description: "Average distance varies in its elliptical orbit",
      value: "778.5 million km"
    },
    {
      title: "Day Length",
      description: "Fastest rotating planet in our solar system",
      value: "9.9 Earth hours"
    },
    {
      title: "Year Length",
      description: "One orbit around the Sun",
      value: "11.8 Earth years"
    },
    {
      title: "Moons",
      description: "Known moons as of 2023",
      value: "95 confirmed"
    }
  ];

  const majorMoons: Moon[] = [
    {
      name: "Io",
      discoveredBy: "Galileo Galilei",
      year: 1610,
      diameter: "3,643 km",
      description: "The most volcanically active body in the solar system, with over 400 active volcanoes."
    },
    {
      name: "Europa",
      discoveredBy: "Galileo Galilei",
      year: 1610,
      diameter: "3,122 km",
      description: "An icy moon with a subsurface ocean that may harbor conditions suitable for life."
    },
    {
      name: "Ganymede",
      discoveredBy: "Galileo Galilei",
      year: 1610,
      diameter: "5,268 km",
      description: "The largest moon in the solar system, larger than Mercury, with its own magnetic field."
    },
    {
      name: "Callisto",
      discoveredBy: "Galileo Galilei",
      year: 1610,
      diameter: "4,821 km",
      description: "The most heavily cratered body in the solar system, providing a record of ancient impacts."
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent mb-6">
              JUPITER
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">
              The King of Planets
            </p>
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 rounded-full shadow-2xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

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
                    Jupiter stands as the undisputed giant of our solar system, a magnificent gas giant that has captivated astronomers and space enthusiasts for centuries. Named after the king of the Roman gods, Jupiter truly lives up to its regal designation as the largest planet in our cosmic neighborhood.
                  </p>
                  <p>
                    This colossal world is a testament to the incredible diversity and scale of planetary formation. With a mass greater than all other planets in our solar system combined, Jupiter plays a crucial role as a gravitational shepherd, protecting the inner planets from potential asteroid and comet impacts while maintaining the delicate balance of our solar system&apos;s architecture.
                  </p>
                  <p>
                    From its iconic Great Red Spot—a storm larger than Earth that has raged for centuries—to its complex system of rings and numerous moons, Jupiter represents a miniature solar system unto itself. The planet&apos;s rapid rotation creates distinctive cloud bands that stretch across its atmosphere, painting beautiful streaks of orange, brown, and white across its face.
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
                      Jupiter is primarily composed of hydrogen and helium, similar to the Sun, earning it the classification as a gas giant. The planet&apos;s atmosphere consists of approximately 89% hydrogen and 10% helium, with trace amounts of methane, water vapor, and ammonia.
                    </p>
                    <p>
                      The planet&apos;s structure is layered, beginning with a dense core that may be solid or liquid, surrounded by metallic hydrogen under extreme pressure. Above this lies molecular hydrogen, transitioning gradually into the visible atmosphere we observe from space.
                    </p>
                    <p>
                      Jupiter&apos;s famous bands and zones are created by powerful jet streams and convection currents. The lighter-colored zones are areas where gas rises and cools, while the darker bands represent descending, warmer gas.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-orange-400 mb-4">Atmospheric Composition</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Hydrogen: ~89%</li>
                      <li>• Helium: ~10%</li>
                      <li>• Methane: ~0.3%</li>
                      <li>• Water vapor: ~0.1%</li>
                      <li>• Ammonia: traces</li>
                      <li>• Hydrogen sulfide: traces</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'moons' && (
            <section>
              <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
                <h2 className="text-4xl font-bold text-white mb-6">Jupiter&apos;s Moons</h2>
                <p className="text-gray-300 mb-8">
                  Jupiter hosts an incredible family of 95 confirmed moons, ranging from tiny irregular satellites to world-sized bodies. The four largest moons, discovered by Galileo in 1610, are known as the Galilean moons.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {majorMoons.map((moon, index) => (
                    <button
                      key={index}
                      onClick={() => handleMoonSelect(moon)}
                      className={`bg-gray-700/50 rounded-lg p-4 text-left transition-all duration-300 border ${
                        selectedMoon?.name === moon.name
                          ? 'bg-orange-500/30 border-orange-500 transform scale-105'
                          : 'border-gray-600 hover:border-orange-500 hover:bg-orange-500/20'
                      }`}
                    >
                      <h3 className="text-xl font-bold text-orange-400 mb-2">{moon.name}</h3>
                      <p className="text-gray-300 text-sm">Diameter: {moon.diameter}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {selectedMoon?.name === moon.name ? 'Click to close' : 'Click to learn more'}
                      </p>
                    </button>
                  ))}
                </div>

                {selectedMoon && (
                  <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-xl p-6 border border-orange-500/30 animate-in fade-in duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-bold text-orange-400">{selectedMoon.name}</h3>
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
                          <p><span className="text-orange-400 font-semibold">Discovered by:</span> <span className="text-gray-300">{selectedMoon.discoveredBy}</span></p>
                          <p><span className="text-orange-400 font-semibold">Discovery year:</span> <span className="text-gray-300">{selectedMoon.year}</span></p>
                          <p><span className="text-orange-400 font-semibold">Diameter:</span> <span className="text-gray-300">{selectedMoon.diameter}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className={`w-32 h-32 rounded-full shadow-2xl ${
                          selectedMoon.name === 'Io' ? 'bg-gradient-to-br from-yellow-400 to-red-500' :
                          selectedMoon.name === 'Europa' ? 'bg-gradient-to-br from-blue-300 to-white' :
                          selectedMoon.name === 'Ganymede' ? 'bg-gradient-to-br from-gray-400 to-brown-600' :
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
                      Jupiter has been the target of numerous space missions, each revealing new secrets about this magnificent giant. The journey of exploration began with the Pioneer program in the 1970s and continues today with advanced orbital missions.
                    </p>
                    <p>
                      The Galileo mission (1995-2003) was particularly groundbreaking, spending eight years studying Jupiter and its moons in unprecedented detail. It discovered evidence of subsurface oceans on Europa and provided detailed images of the Galilean moons.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-400 mb-3">Notable Missions</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Pioneer 10 & 11 (1973-1974): First close-up images</li>
                        <li>• Voyager 1 & 2 (1979): Discovered Jupiter&apos;s rings</li>
                        <li>• Galileo (1995-2003): Long-term orbital study</li>
                        <li>• Juno (2016-present): Studying Jupiter&apos;s core and magnetosphere</li>
                      </ul>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-orange-400 mb-3">Future Missions</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li>• Europa Clipper: Detailed study of Europa&apos;s ocean</li>
                        <li>• JUICE (ESA): Multiple Galilean moon flybys</li>
                        <li>• Proposed missions to study atmospheric composition</li>
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
                      Jupiter&apos;s significance extends far beyond its impressive size. As a gas giant, it serves as a natural laboratory for understanding planetary formation, atmospheric dynamics, and the evolution of our solar system.
                    </p>
                    <p>
                      The planet acts as a &quot;cosmic vacuum cleaner,&quot; using its massive gravitational field to capture asteroids and comets that might otherwise threaten the inner planets, including Earth. This protective role has been crucial in allowing life to develop and thrive on our planet.
                    </p>
                    <p>
                      Jupiter&apos;s moon Europa has become a prime target in the search for extraterrestrial life, with its subsurface ocean potentially harboring the conditions necessary for life as we know it.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-blue-400 mb-3">Planetary Protection</h3>
                      <p className="text-gray-300 text-sm">Jupiter&apos;s gravity deflects potentially dangerous asteroids and comets away from the inner solar system.</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-green-400 mb-3">Astrobiology</h3>
                      <p className="text-gray-300 text-sm">Europa and other moons may harbor conditions suitable for life in their subsurface oceans.</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-purple-400 mb-3">Climate Studies</h3>
                      <p className="text-gray-300 text-sm">Jupiter&apos;s complex atmospheric dynamics help scientists understand weather patterns and climate systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 pt-5">
          {jupiterFacts.map((fact, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-orange-400 mb-2">{fact.title}</h3>
              <p className="text-3xl font-bold text-white mb-2">{fact.value}</p>
              <p className="text-gray-300 text-sm">{fact.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-700 mt-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              Explore the wonders of our solar system&apos;s greatest giant
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <span className="text-orange-400">🪐</span>
              <span className="text-yellow-400">⭐</span>
              <span className="text-blue-400">🌙</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JupiterArticle;