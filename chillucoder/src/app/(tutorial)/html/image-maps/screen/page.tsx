"use client";

import { useState } from "react";
import { 
  FaMobileAlt,
  FaExpand,
  FaCompress,
  FaBatteryFull,
  FaWifi,
  FaSignal,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaHome,
  FaUser,
  FaCog,
  FaBell
} from "react-icons/fa";

interface MobileFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface MobileScreen {
  id: number;
  name: string;
  component: React.ReactNode;
}

export default function MobileScreenArticle() {
  const [fullScreen, setFullScreen] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);

  const mobileFeatures: MobileFeature[] = [
    {
      title: "Display Technology",
      description: "AMOLED, LCD, OLED, and Retina displays with high refresh rates up to 120Hz",
      icon: <FaMobileAlt className="text-2xl" />,
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Resolution",
      description: "From HD to 4K resolutions with pixel densities over 500 PPI",
      icon: <FaExpand className="text-2xl" />,
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Touch Sensitivity",
      description: "Multi-touch support with 120Hz touch sampling rates for ultra-responsive interfaces",
      icon: <FaCompress className="text-2xl" />,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Durability",
      description: "Gorilla Glass Victus 2, IP68 water resistance, and military-grade durability",
      icon: <FaMobileAlt className="text-2xl" />,
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  const mobileScreens: MobileScreen[] = [
    {
      id: 0,
      name: "Home Screen",
      component: (
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center px-4 py-1 bg-gray-800 text-white text-xs">
            <span>9:41</span>
            <div className="flex gap-2">
              <FaSignal />
              <FaWifi />
              <FaBatteryFull />
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-4 gap-6 p-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white mb-1">
                  {i + 1}
                </div>
                <span className="text-xs">App {i + 1}</span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-around p-4 bg-gray-100 dark:bg-gray-700">
            <FaHome className="text-xl" />
            <FaSearch className="text-xl" />
            <FaUser className="text-xl" />
            <FaCog className="text-xl" />
          </div>
        </div>
      )
    },
    {
      id: 1,
      name: "Lock Screen",
      component: (
        <div className="h-full flex flex-col bg-gradient-to-b from-blue-500 to-purple-600 text-white">
          <div className="flex justify-between items-center px-4 py-1 text-white text-xs">
            <span>9:41</span>
            <div className="flex gap-2">
              <FaSignal />
              <FaWifi />
              <FaBatteryFull />
            </div>
          </div>
          
          <div className="mt-8 px-4">
            <div className="bg-black bg-opacity-30 rounded-xl p-3 mb-2">
              <div className="flex items-center gap-2">
                <FaBell />
                <span className="font-medium">New Message</span>
              </div>
              <p className="text-sm mt-1">You have 3 unread messages</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-thin">9:41</h1>
            <p className="text-lg">Thursday, June 15</p>
          </div>
          
          <div className="flex justify-center pb-8">
            <div className="w-16 h-1 rounded-full bg-white bg-opacity-50"></div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      name: "Settings",
      component: (
        <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center px-4 py-1 bg-gray-800 text-white text-xs">
            <span>9:41</span>
            <div className="flex gap-2">
              <FaSignal />
              <FaWifi />
              <FaBatteryFull />
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">Settings</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {['Wi-Fi', 'Bluetooth', 'Mobile Data', 'Notifications', 'Sounds', 'Display', 'Wallpaper', 'Accessibility'].map((item, i) => (
              <div 
                key={i} 
                className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
              >
                <span>{item}</span>
                <FaChevronRight className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  const nextScreen = () => {
    setActiveScreen((prev) => (prev === mobileScreens.length - 1 ? 0 : prev + 1));
  };

  const prevScreen = () => {
    setActiveScreen((prev) => (prev === 0 ? mobileScreens.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 mb-2">
          Mobile Screen Technology
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore the evolution and technology behind modern smartphone displays
        </p>
      </header>

      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative">
            <div className={`relative ${fullScreen ? 'fixed inset-0 z-50 bg-black flex items-center justify-center' : 'w-72 mx-auto'}`}>
              <div 
                className={`bg-black rounded-3xl p-2 shadow-xl ${fullScreen ? 'h-[90vh] w-auto aspect-[9/19.5]' : 'w-full'}`}
                style={{
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-gray-900">
                  {mobileScreens[activeScreen].component}
                </div>
              </div>
              
              <button 
                onClick={() => setFullScreen(!fullScreen)}
                className={`absolute ${fullScreen ? 'top-4 right-4 bg-white p-2 rounded-full' : 'top-0 right-0 mt-2 mr-2 bg-black bg-opacity-50 text-white p-1 rounded'}`}
              >
                {fullScreen ? <FaCompress /> : <FaExpand />}
              </button>
              
              {fullScreen && (
                <>
                  <button 
                    onClick={prevScreen}
                    className="absolute left-4 bg-white p-3 rounded-full shadow-lg"
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={nextScreen}
                    className="absolute right-4 bg-white p-3 rounded-full shadow-lg"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
            
            {!fullScreen && (
              <div className="flex justify-center gap-2 mt-4">
                {mobileScreens.map((screen, i) => (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreen(i)}
                    className={`w-3 h-3 rounded-full ${activeScreen === i ? 'bg-blue-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{mobileScreens[activeScreen].name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {activeScreen === 0 && "The home screen is your gateway to all apps and features with customizable layouts and widgets."}
              {activeScreen === 1 && "Lock screens provide quick information at a glance with notifications, time, and security features."}
              {activeScreen === 2 && "Settings screen organizes all device configurations in an intuitive hierarchical structure."}
            </p>
            
            <div className="flex gap-2 mb-6">
              <button 
                onClick={prevScreen}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={nextScreen}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
              >
                <FaChevronRight />
              </button>
            </div>
            
            <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {activeScreen === 0 && "Customizable app icons and widgets"}
                {activeScreen === 1 && "Instant notifications with privacy controls"}
                {activeScreen === 2 && "Search functionality for quick settings access"}
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {activeScreen === 0 && "App library for automatic organization"}
                {activeScreen === 1 && "Biometric authentication options"}
                {activeScreen === 2 && "Personalization options for themes and layouts"}
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {activeScreen === 0 && "Dynamic wallpapers and dark mode support"}
                {activeScreen === 1 && "Emergency information access"}
                {activeScreen === 2 && "System updates and backup management"}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Mobile Screen Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mobileFeatures.map((feature, index) => (
            <div 
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Evolution of Mobile Screens</h2>
        <div className="relative">
          <div className="absolute left-4 h-full w-0.5 bg-blue-500 transform -translate-x-1/2"></div>
          
          <div className="space-y-8 pl-12">
            {[
              { year: "2007", event: "First capacitive touchscreen (iPhone)", detail: "Revolutionized mobile interaction with multi-touch" },
              { year: "2010", event: "Retina Display", detail: "Introduced high pixel density (326 PPI)" },
              { year: "2014", event: "QHD Screens", detail: "1440p resolution becoming standard for flagships" },
              { year: "2017", event: "OLED Adoption", detail: "Wider color gamuts and true blacks" },
              { year: "2020", event: "120Hz Refresh Rates", detail: "Smoother scrolling and animations" },
              { year: "2023", event: "LTPO 2.0", detail: "Dynamic refresh rates from 1Hz to 120Hz" }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-4 border-blue-200 -left-12 top-1/2 transform -translate-y-1/2"></div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <div className="font-bold text-blue-600 dark:text-blue-400">{item.year}</div>
                  <h3 className="text-lg font-semibold mb-1">{item.event}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Future of Mobile Screens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">Foldable Displays</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The next frontier in mobile screens with flexible OLED technology that can bend without damage, 
              enabling devices that transform from phone to tablet sizes.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Ultra-thin glass substrates for durability
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Multi-axis folding capabilities
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Self-healing polymer layers
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-400">Under-Display Cameras</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Completely bezel-less designs with cameras and sensors hidden beneath the display surface, 
              enabled by transparent OLED pixels and advanced image processing.
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                Special pixel arrangements for light transmission
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                AI-powered image correction algorithms
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                Multi-layer display stack optimization
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}