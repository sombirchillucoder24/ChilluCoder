"use client";

import { useState } from "react";
import { FaSync, FaSnowflake, FaRing, FaMoon, FaRocket, FaWind, FaClock, FaAtom, FaEye, FaGem } from "react-icons/fa";

export default function UranusBlog() {
  const articles = [
    {
      id: 1,
      title: "The Tilted Giant",
      excerpt: "Why Uranus rolls on its side through the solar system",
      icon: <FaSync className="text-cyan-500" />,
      content: [
        "Uranus rotates on its side with an axial tilt of 98°, essentially rolling along its orbital path.",
        "This extreme tilt means each pole experiences 42 years of continuous sunlight followed by 42 years of darkness.",
        "The unusual rotation likely resulted from a massive collision with an Earth-sized object early in solar system history.",
        "Unlike other planets that spin like tops, Uranus spins like a rolling ball around the Sun.",
        "The collision may have also contributed to Uranus's unusual magnetic field configuration.",
        "During equinoxes, Uranus appears to spin normally, but this only happens twice per 84-year orbit."
      ]
    },
    {
      id: 2,
      title: "The Ice Giant's Composition",
      excerpt: "A world made of water, methane, and ammonia ices under crushing pressure",
      icon: <FaSnowflake className="text-blue-300" />,
      content: [
        "Uranus is an 'ice giant' - its interior contains water, methane, and ammonia ices rather than just hydrogen and helium.",
        "The planet is about 80% water, methane, and ammonia ice surrounding a small rocky core.",
        "Interior temperatures reach 5,000°C despite the planet's cold exterior appearance.",
        "Pressures inside Uranus reach millions of times Earth's atmospheric pressure.",
        "The ice giant classification distinguishes Uranus and Neptune from the gas giants Jupiter and Saturn.",
        "Exotic forms of hot ice may exist in the interior that remain solid despite extreme temperatures."
      ]
    },
    {
      id: 3,
      title: "The Faint Ring System",
      excerpt: "Dark rings discovered centuries after the planet itself",
      icon: <FaRing className="text-gray-400" />,
      content: [
        "Uranus has 13 known rings, discovered in 1977 - nearly 200 years after the planet itself.",
        "The rings are extremely dark (reflecting only 2% of sunlight) and made of organic compounds and rock particles.",
        "Most rings are narrow (1-10 km wide) and separated by large gaps, unlike Saturn's broad ring system.",
        "The epsilon ring is the brightest and most massive, varying in width from 20-100 km.",
        "Ring particles range from dust-sized to house-sized boulders orbiting close to the planet.",
        "The rings may be relatively young (less than 600 million years old) formed from destroyed moons."
      ]
    },
    {
      id: 4,
      title: "27 Mysterious Moons",
      excerpt: "A diverse collection of satellites named after Shakespeare and Pope characters",
      icon: <FaMoon className="text-purple-300" />,
      content: [
        "Uranus has 27 known moons, all named after characters from Shakespeare and Alexander Pope works.",
        "The five major moons are Miranda, Ariel, Umbriel, Titania, and Oberon - discovered before 1950.",
        "Miranda shows the most dramatic geology with massive canyons up to 20 km deep.",
        "Titania is the largest Uranian moon (1,578 km diameter) with evidence of past geological activity.",
        "The smaller inner moons are likely captured asteroids or formed from ring material.",
        "Many moons show signs of past resurfacing events and possible subsurface oceans."
      ]
    },
    {
      id: 5,
      title: "Voyager 2's Historic Encounter",
      excerpt: "The only spacecraft to visit the ice giant",
      icon: <FaRocket className="text-orange-400" />,
      content: [
        "Voyager 2 is the only spacecraft to visit Uranus, flying by on January 24, 1986.",
        "The encounter occurred during Uranus's solstice when one pole faced the Sun continuously.",
        "Voyager 2 discovered 10 new moons and confirmed the ring system's existence.",
        "The spacecraft found that Uranus's magnetic field is tilted 59° from its rotation axis.",
        "Images revealed a remarkably bland appearance with few visible cloud features.",
        "The flyby provided 90% of our detailed knowledge about the Uranus system."
      ]
    },
    {
      id: 6,
      title: "Extreme Weather and Atmosphere",
      excerpt: "Winds faster than hurricanes on the coldest planetary atmosphere",
      icon: <FaWind className="text-teal-300" />,
      content: [
        "Uranus has the coldest planetary atmosphere in the solar system with temperatures reaching -224°C.",
        "Wind speeds reach up to 560 km/h - faster than the strongest hurricanes on Earth.",
        "The atmosphere is 83% hydrogen, 15% helium, and 2% methane, water, and ammonia.",
        "Methane in the upper atmosphere absorbs red light, giving Uranus its blue-green color.",
        "Cloud bands rotate at different speeds, indicating complex atmospheric dynamics.",
        "Seasonal storms appear as bright spots that can be larger than continents on Earth."
      ]
    },
    {
      id: 7,
      title: "The 84-Year Journey",
      excerpt: "Uranus's long orbital period creates extreme seasonal changes",
      icon: <FaClock className="text-green-400" />,
      content: [
        "Uranus takes 84 Earth years to complete one orbit around the Sun.",
        "Each season lasts about 21 Earth years due to the planet's extreme axial tilt.",
        "During solstices, one hemisphere experiences continuous daylight while the other is in darkness.",
        "The planet receives 400 times less sunlight than Earth due to its distance from the Sun.",
        "Seasonal temperature variations are surprisingly small due to the planet's slow heat redistribution.",
        "Equinoxes occur every 42 years when the Sun shines equally on both hemispheres."
      ]
    },
    {
      id: 8,
      title: "The Bizarre Magnetic Field",
      excerpt: "A magnetic field unlike any other planet in the solar system",
      icon: <FaAtom className="text-violet-400" />,
      content: [
        "Uranus's magnetic field is tilted 59° from its rotational axis - the most extreme tilt of any planet.",
        "The magnetic field center is offset from the planet's center by about 0.3 Uranian radii.",
        "This suggests the magnetic field originates in the planet's mantle rather than its core.",
        "The unusual configuration may result from the same collision that tilted the planet.",
        "The magnetic field strength is about 50 times stronger than Earth's.",
        "The field's geometry creates complex interactions with the solar wind and radiation environment."
      ]
    },
    {
      id: 9,
      title: "Discovery and Observation",
      excerpt: "The first planet discovered in modern times and how we study it today",
      icon: <FaEye className="text-amber-400" />,
      content: [
        "Uranus was discovered by William Herschel in 1781, doubling the known size of our solar system.",
        "It's barely visible to the naked eye (magnitude 5.3) and appears as a blue-green disk in telescopes.",
        "The planet was initially named 'Georgium Sidus' (George's Star) after King George III.",
        "Modern observations use infrared and radio telescopes to penetrate the planet's atmosphere.",
        "The Hubble Space Telescope monitors seasonal changes and atmospheric dynamics.",
        "Ground-based adaptive optics systems can now resolve details of moons and rings."
      ]
    },
    {
      id: 10,
      title: "Future Missions and Mysteries",
      excerpt: "What we still need to learn about the ice giant",
      icon: <FaGem className="text-pink-400" />,
      content: [
        "No dedicated missions to Uranus are currently scheduled, but several are proposed for the 2030s.",
        "Key questions include the source of internal heat and the nature of the magnetic field.",
        "Scientists want to understand how the extreme tilt affects atmospheric circulation.",
        "The composition and structure of the interior remain poorly understood.",
        "Potential subsurface oceans in major moons could harbor conditions for life.",
        "Seasonal monitoring over a complete Uranian year would reveal long-term atmospheric changes.",
        "Future missions might include atmospheric probes and long-term orbital studies."
      ]
    }
  ];

  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-cyan-50/30 via-blue-50/20 to-teal-50/30 dark:from-gray-900 dark:via-cyan-900/20 dark:to-blue-900/20 min-h-screen">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-600 mb-4">
          Uranus: The Sideways Ice Giant
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Discover the most unusual planet in our solar system - a tilted world of ice, rings, and extreme seasons rolling through space
        </p>
        <div className="mt-6 inline-block bg-gradient-to-r from-cyan-400 to-teal-500 h-1 w-24 rounded"></div>
      </header>

      <div className="space-y-6">
        {articles.map((article) => (
          <article 
            key={article.id} 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-cyan-200/30 dark:border-gray-700"
          >
            <button
              className="w-full text-left p-6 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-blue-50/50 dark:hover:from-gray-700/50 dark:hover:to-cyan-800/30 transition-all duration-200"
              onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl mt-1 p-3 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-gray-700 dark:to-cyan-800/50 rounded-xl shadow-sm">
                  {article.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {article.excerpt}
                  </p>
                  <div className="mt-3 flex items-center text-cyan-500 font-medium">
                    <span className="mr-2">{expandedArticle === article.id ? '↑' : '↓'}</span>
                    <span>{expandedArticle === article.id ? 'Collapse' : 'Expand'}</span>
                  </div>
                </div>
              </div>
            </button>

            {expandedArticle === article.id && (
              <div className="px-6 pb-6 bg-gradient-to-br from-cyan-25/50 to-blue-25/50 dark:from-gray-800/50 dark:to-cyan-800/20">
                <div className="border-t border-cyan-200/30 dark:border-gray-600 pt-6">
                  <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                    {article.content.map((paragraph, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3 mt-2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex-shrink-0"></span>
                        <span className="leading-relaxed">{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 italic">
                    Source: NASA Voyager 2 Mission, Hubble Space Telescope, Ground-based Observations
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-br from-cyan-100/60 to-blue-100/60 dark:from-gray-800/60 dark:to-cyan-800/30 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-cyan-200/40 dark:border-gray-600">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Uranus Quick Facts</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-cyan-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">14.5</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Earth Masses</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-cyan-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-blue-500 mb-2">-224°C</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Atmosphere Temp</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-cyan-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-teal-400 mb-2">17.2h</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Day Length</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-cyan-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-purple-500 mb-2">27</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Known Moons</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-cyan-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-green-500 mb-2">84</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Earth Years/Orbit</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-cyan-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-orange-500 mb-2">98°</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Axial Tilt</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-cyan-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-red-500 mb-2">19.2</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">AU from Sun</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm p-6 rounded-xl text-center shadow-md border border-cyan-200/30 dark:border-gray-600">
            <div className="text-3xl font-bold text-indigo-500 mb-2">13</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Known Rings</div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-r from-cyan-900/10 via-blue-900/10 to-teal-900/10 dark:from-gray-800/60 dark:to-cyan-800/30 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-cyan-200/30 dark:border-gray-600">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Fascinating Uranus Facts</h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-cyan-200/30 dark:border-gray-600">
            <h4 className="font-bold text-cyan-600 dark:text-cyan-400 mb-2">Sideways World</h4>
            <p>Uranus literally rolls along its orbital path like a ball, with each pole experiencing 42 years of continuous daylight followed by 42 years of darkness.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-cyan-200/30 dark:border-gray-600">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Diamond Rain</h4>
            <p>The extreme pressure and temperature inside Uranus may create diamond rain, with carbon compressed into diamonds that fall toward the core.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-cyan-200/30 dark:border-gray-600">
            <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2">Invisible Rings</h4>
            <p>Uranus&apos;s rings are so dark they reflect only 2% of sunlight - they&apos;re nearly invisible and were only discovered in 1977.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-cyan-200/30 dark:border-gray-600">
            <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Literary Moons</h4>
            <p>All 27 moons are named after characters from Shakespeare and Alexander Pope - the only planet with moons named after literary characters.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-cyan-200/30 dark:border-gray-600">
            <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">Magnetic Mystery</h4>
            <p>Uranus&apos;s magnetic field is tilted 59° from its rotation axis and offset from the center - completely unlike any other planet&apos;s magnetic field.</p>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-cyan-200/30 dark:border-gray-600">
            <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Ice Giant</h4>
            <p>Despite being called an ice giant, Uranus&apos;s interior reaches 5,000°C - hotter than the Sun&apos;s surface, but still considered &quot;icy&quot; by planetary standards.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-br from-blue-100/60 to-cyan-100/60 dark:from-gray-800/60 dark:to-blue-800/30 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-blue-200/40 dark:border-gray-600">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">The Voyager 2 Legacy</h3>
        <div className="text-center space-y-4 text-gray-700 dark:text-gray-300">
          <p className="text-lg">Voyager 2&apos;s 1986 flyby remains our only close-up look at Uranus, providing nearly all our detailed knowledge of this ice giant.</p>
          <p>The spacecraft discovered 10 new moons, confirmed the ring system, and revealed the planet&apos;s unusual magnetic field configuration.</p>
          <p className="font-semibold text-cyan-600 dark:text-cyan-400">Despite being visited only once, Uranus continues to surprise us with its unique sideways orientation and extreme seasonal changes.</p>
        </div>
      </div>

      <div className="mt-12 bg-gradient-to-br from-teal-100/60 to-cyan-100/60 dark:from-gray-800/60 dark:to-teal-800/30 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-teal-200/40 dark:border-gray-600">
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Extreme Seasons of Uranus</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <h4 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">Summer/Winter Solstice</h4>
            <p className="text-gray-700 dark:text-gray-300">One pole faces the Sun continuously for 42 years while the other pole remains in complete darkness. Temperature differences between hemispheres are surprisingly small due to slow atmospheric circulation.</p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">Spring/Fall Equinox</h4>
            <p className="text-gray-700 dark:text-gray-300">The Sun shines equally on both hemispheres, and Uranus appears to spin &quot;normally&quot; like other planets. This occurs only twice during the 84-year orbital period.</p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl">
        <p className="mb-2">Data from NASA Voyager 2 Mission, Hubble Space Telescope, Keck Observatory, and ground-based observations</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </div>
  );
}