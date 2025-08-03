"use client"
import { Topbar } from '@/components/Topbar'
import { Navbar } from '@/components/Navbar'
import LanguageBar from '@/components/LanguageBar'
import { FaCode, FaLaptopCode, FaServer, FaDatabase } from 'react-icons/fa'

export default function Home() {
  const features = [
    {
      icon: <FaCode className="text-4xl mb-4 text-green-500" />,
      title: "HTML Tutorials",
      description: "Learn the building blocks of web development with our comprehensive HTML guides."
    },
    {
      icon: <FaLaptopCode className="text-4xl mb-4 text-blue-500" />,
      title: "CSS Styling",
      description: "Make your websites beautiful with our CSS tutorials and examples."
    },
    {
      icon: <FaServer className="text-4xl mb-4 text-yellow-500" />,
      title: "JavaScript",
      description: "Bring interactivity to your sites with our JavaScript courses."
    },
    {
      icon: <FaDatabase className="text-4xl mb-4 text-purple-500" />,
      title: "Backend",
      description: "Learn server-side programming with Node.js and databases."
    }
  ]

  const languages = ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL', 'PHP', 'jQuery']

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />
      <LanguageBar /> 
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn With ChilluCoder</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            With the world&apos;s largest web developer site. Start coding today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/html" 
              className="bg-white text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              Get Started
            </a>
            <a 
              href="#tutorials" 
              className="bg-transparent border-2 border-white py-3 px-6 rounded-lg hover:bg-white hover:text-gray-800 transition"
            >
              Browse Tutorials
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Learn With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language Navigation */}
      <section id="tutorials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Tutorials</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((language) => (
              <a
                key={language}
                href={`/${language.toLowerCase()}`}
                className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 px-6 py-3 rounded-lg shadow-sm transition-colors font-medium"
              >
                {language}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl">
            <div className="bg-gray-800 text-white px-4 py-2 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm">index.html</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="language-html">
{`<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
  <style>
    body { font-family: Arial; }
    h1 { color: #4CAF50; }
  </style>
</head>
<body>
  <h1>Hello World!</h1>
  <script>
    document.querySelector('h1').addEventListener('click', () => {
      alert('You clicked the heading!');
    });
  </script>
</body>
</html>`}
              </code>
            </pre>
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 text-right">
              <a 
                href="/html" 
                className="text-green-600 dark:text-green-400 hover:underline font-medium"
              >
                Try it Yourself →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">chillucoder<span className="text-green-400">.com</span></h2>
              <p className="text-gray-400 mt-2">The world&apos;s largest web developer site</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-green-400">About</a>
              <a href="#" className="hover:text-green-400">Contact</a>
              <a href="#" className="hover:text-green-400">Privacy</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} chillucoder.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}