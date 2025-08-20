"use client";

import { FaCopy, FaCheck, FaChevronDown, FaPlay } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLGeolocationTutorial() {
  const router = useRouter();
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    basics: true,
    examples: true,
    advanced: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleOpenEditor = (code: string) => {
    try {
      localStorage.setItem("html-code", code);
      router.push("/compilers/html-editor");
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      alert("Could not open editor. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
          HTML Geolocation API Tutorial
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn how to access a user&apos;s geographical location using the browser&apos;s
          Geolocation API
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          Introduction to Geolocation
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The Geolocation API allows web applications to access the geographical
          location of the user (with their permission). This can be used to
          provide location-aware content, maps, and more.
        </p>

        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
          <h3 className="font-bold mb-2">Basic Geolocation Example:</h3>
          <CodeEditor
            value={`if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}`}
            language="javascript"
            style={{
              fontSize: 14,
              backgroundColor: "#f8fafc",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
            className="rounded-lg"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() =>
                copyToClipboard(
                  `if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}`,
                  "basic geolocation"
                )
              }
              className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {copied === "basic geolocation" ? (
                <>
                  <FaCheck className="text-green-500" /> Copied!
                </>
              ) : (
                <>
                  <FaCopy /> Copy
                </>
              )}
            </button>
            <button
              onClick={() =>
                handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Basic Geolocation Example</title>
</head>
<body>
  <h1>Geolocation Example</h1>
  <button onclick="getLocation()">Get My Location</button>
  <p id="demo"></p>
  
  <script>
    function getLocation() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        document.getElementById("demo").innerHTML = 
          "Geolocation is not supported by this browser.";
      }
    }
    
    function showPosition(position) {
      document.getElementById("demo").innerHTML = 
        "Latitude: " + position.coords.latitude + "<br>" +
        "Longitude: " + position.coords.longitude;
    }
  </script>
</body>
</html>`)
              }
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              <FaPlay size={12} /> Try it
            </button>
          </div>
        </div>
      </section>

      {/* Basic Examples */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Basic Geolocation Examples
          </h2>
          <button
            onClick={() => toggleSection("basics")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.basics ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.basics && (
          <div className="space-y-6">
            {/* Example 1: Get Current Position */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  1. Get Current Position
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The most common use of the Geolocation API is to get the
                  user&apos;s current position.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <CodeEditor
                    value={`function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  console.log(\`Your position: \${latitude}, \${longitude}\`);
  
  // Display on a map or use in your application
  document.getElementById("location").innerHTML = \`
    <p>Latitude: \${latitude}</p>
    <p>Longitude: \${longitude}</p>
    <p>Accuracy: \${position.coords.accuracy} meters</p>
  \`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showPosition,
      (error) => {
        console.error("Error getting location:", error.message);
        alert("Error getting location: " + error.message);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}`}
                    language="javascript"
                    style={{
                      fontSize: 14,
                      backgroundColor: "#f8fafc",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Get Current Position</title>
</head>
<body>
  <button onclick="getLocation()">Get My Location</button>
  <div id="location"></div>
  
  <script>
    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      document.getElementById("location").innerHTML = \`
        <p>Latitude: \${latitude}</p>
        <p>Longitude: \${longitude}</p>
        <p>Accuracy: \${position.coords.accuracy} meters</p>
      \`;
    }

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition,
          (error) => {
            alert("Error getting location: " + error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  </script>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  console.log(\`Your position: \${latitude}, \${longitude}\`);
  
  // Display on a map or use in your application
  document.getElementById("location").innerHTML = \`
    <p>Latitude: \${latitude}</p>
    <p>Longitude: \${longitude}</p>
    <p>Accuracy: \${position.coords.accuracy} meters</p>
  \`;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showPosition,
      (error) => {
        console.error("Error getting location:", error.message);
        alert("Error getting location: " + error.message);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}`,
                        "get position"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "get position" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Example 2: Watch Position */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">2. Watch Position</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Use <code>watchPosition()</code> to continuously track the
                  user&apos;s position as they move.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <CodeEditor
                    value={`let watchId = null;

function startTracking() {
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        document.getElementById("tracking").innerHTML = \`
          <p>Current position:</p>
          <p>Latitude: \${latitude}</p>
          <p>Longitude: \${longitude}</p>
          <p>Speed: \${position.coords.speed || 0} m/s</p>
          <p>Heading: \${position.coords.heading || 0}° from north</p>
        \`;
      },
      (error) => {
        console.error("Error watching position:", error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    document.getElementById("tracking").innerHTML = "Tracking stopped.";
  }
}`}
                    language="javascript"
                    style={{
                      fontSize: 14,
                      backgroundColor: "#f8fafc",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Watch Position</title>
</head>
<body>
  <button onclick="startTracking()">Start Tracking</button>
  <button onclick="stopTracking()">Stop Tracking</button>
  <div id="tracking"></div>
  
  <script>
    let watchId = null;

    function startTracking() {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            document.getElementById("tracking").innerHTML = \`
              <p>Current position:</p>
              <p>Latitude: \${latitude}</p>
              <p>Longitude: \${longitude}</p>
              <p>Speed: \${position.coords.speed || 0} m/s</p>
              <p>Heading: \${position.coords.heading || 0}° from north</p>
            \`;
          },
          (error) => {
            alert("Error watching position: " + error.message);
          },
          {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    function stopTracking() {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        document.getElementById("tracking").innerHTML = "Tracking stopped.";
      }
    }
  </script>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `let watchId = null;

function startTracking() {
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        document.getElementById("tracking").innerHTML = \`
          <p>Current position:</p>
          <p>Latitude: \${latitude}</p>
          <p>Longitude: \${longitude}</p>
          <p>Speed: \${position.coords.speed || 0} m/s</p>
          <p>Heading: \${position.coords.heading || 0}° from north</p>
        \`;
      },
      (error) => {
        console.error("Error watching position:", error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    document.getElementById("tracking").innerHTML = "Tracking stopped.";
  }
}`,
                        "watch position"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "watch position" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Example 3: Error Handling */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">3. Error Handling</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Proper error handling is essential for a good user experience
                  with geolocation.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <CodeEditor
                    value={`function handleLocationError(error) {
  let errorMessage = "Unknown error occurred";
  
  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorMessage = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      errorMessage = "An unknown error occurred.";
      break;
  }
  
  document.getElementById("error").innerHTML = errorMessage;
  console.error("Geolocation error:", errorMessage);
}

function getLocationWithErrorHandling() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        document.getElementById("location").innerHTML = \`
          Latitude: \${position.coords.latitude}<br>
          Longitude: \${position.coords.longitude}
        \`;
      },
      handleLocationError,
      {
        timeout: 10000,
        maximumAge: 0,
        enableHighAccuracy: true
      }
    );
  } else {
    document.getElementById("error").innerHTML = 
      "Geolocation is not supported by this browser.";
  }
}`}
                    language="javascript"
                    style={{
                      fontSize: 14,
                      backgroundColor: "#f8fafc",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Geolocation Error Handling</title>
</head>
<body>
  <button onclick="getLocationWithErrorHandling()">Get Location</button>
  <div id="location"></div>
  <div id="error" style="color: red;"></div>
  
  <script>
    function handleLocationError(error) {
      let errorMessage = "Unknown error occurred";
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          errorMessage = "An unknown error occurred.";
          break;
      }
      
      document.getElementById("error").innerHTML = errorMessage;
    }

    function getLocationWithErrorHandling() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            document.getElementById("location").innerHTML = \`
              Latitude: \${position.coords.latitude}<br>
              Longitude: \${position.coords.longitude}
            \`;
          },
          handleLocationError,
          {
            timeout: 10000,
            maximumAge: 0,
            enableHighAccuracy: true
          }
        );
      } else {
        document.getElementById("error").innerHTML = 
          "Geolocation is not supported by this browser.";
      }
    }
  </script>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `function handleLocationError(error) {
  let errorMessage = "Unknown error occurred";
  
  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorMessage = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorMessage = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorMessage = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      errorMessage = "An unknown error occurred.";
      break;
  }
  
  document.getElementById("error").innerHTML = errorMessage;
  console.error("Geolocation error:", errorMessage);
}

function getLocationWithErrorHandling() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        document.getElementById("location").innerHTML = \`
          Latitude: \${position.coords.latitude}<br>
          Longitude: \${position.coords.longitude}
        \`;
      },
      handleLocationError,
      {
        timeout: 10000,
        maximumAge: 0,
        enableHighAccuracy: true
      }
    );
  } else {
    document.getElementById("error").innerHTML = 
      "Geolocation is not supported by this browser.";
  }
}`,
                        "error handling"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "error handling" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Advanced Techniques */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Advanced Geolocation Techniques
          </h2>
          <button
            onClick={() => toggleSection("advanced")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.advanced ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.advanced && (
          <div className="space-y-6">
            {/* Example 1: Geolocation with Maps */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  1. Geolocation with Maps
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Combine the Geolocation API with mapping libraries like Google
                  Maps or Leaflet.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <CodeEditor
                    value={`function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Create a map centered at the user's location
        const map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 15
        });
        
        // Add a marker at the user's location
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location"
        });
      },
      (error) => {
        console.error("Error getting location for map:", error);
        // Default to a known location if geolocation fails
        const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York
        const map = new google.maps.Map(document.getElementById("map"), {
          center: defaultLocation,
          zoom: 10
        });
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Load the Google Maps API and then call initMap
function loadGoogleMaps() {
  const script = document.createElement("script");
  script.src = \`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap\`;
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
}`}
                    language="javascript"
                    style={{
                      fontSize: 14,
                      backgroundColor: "#f8fafc",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Geolocation with Google Maps</title>
  <style>
    #map { height: 400px; width: 100%; }
  </style>
</head>
<body>
  <h1>My Location on Map</h1>
  <div id="map"></div>
  
  <script>
    function initMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            // Create a map centered at the user's location
            const map = new google.maps.Map(document.getElementById("map"), {
              center: userLocation,
              zoom: 15
            });
            
            // Add a marker at the user's location
            new google.maps.Marker({
              position: userLocation,
              map: map,
              title: "Your Location"
            });
          },
          (error) => {
            console.error("Error getting location for map:", error);
            // Default to a known location if geolocation fails
            const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York
            const map = new google.maps.Map(document.getElementById("map"), {
              center: defaultLocation,
              zoom: 10
            });
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  </script>
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Create a map centered at the user's location
        const map = new google.maps.Map(document.getElementById("map"), {
          center: userLocation,
          zoom: 15
        });
        
        // Add a marker at the user's location
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location"
        });
      },
      (error) => {
        console.error("Error getting location for map:", error);
        // Default to a known location if geolocation fails
        const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // New York
        const map = new google.maps.Map(document.getElementById("map"), {
          center: defaultLocation,
          zoom: 10
        });
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Load the Google Maps API and then call initMap
function loadGoogleMaps() {
  const script = document.createElement("script");
  script.src = \`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap\`;
  script.defer = true;
  script.async = true;
  document.head.appendChild(script);
}`,
                        "maps"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "maps" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Example 2: Calculating Distance */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  2. Calculating Distance Between Points
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Calculate the distance between two geographic points using the
                  Haversine formula.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <CodeEditor
                    value={`function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  
  return distance;
}

function toRad(degrees) {
  return degrees * Math.PI / 180;
}

// Example usage:
function showDistanceToLocation(targetLat, targetLon) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          targetLat,
          targetLon
        );
        
        document.getElementById("distance").innerHTML = \`
          You are \${distance.toFixed(2)} km from the target location.
        \`;
      },
      (error) => {
        console.error("Error getting location for distance calculation:", error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}`}
                    language="javascript"
                    style={{
                      fontSize: 14,
                      backgroundColor: "#f8fafc",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Distance Calculator</title>
</head>
<body>
  <button onclick="showDistanceToLocation(40.7128, -74.0060)">Distance to New York</button>
  <div id="distance"></div>
  
  <script>
    function calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Earth's radius in km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      
      return distance;
    }

    function toRad(degrees) {
      return degrees * Math.PI / 180;
    }

    function showDistanceToLocation(targetLat, targetLon) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const distance = calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              targetLat,
              targetLon
            );
            
            document.getElementById("distance").innerHTML = \`
              You are \${distance.toFixed(2)} km from the target location.
            \`;
          },
          (error) => {
            alert("Error getting location: " + error.message);
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  </script>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  
  return distance;
}

function toRad(degrees) {
  return degrees * Math.PI / 180;
}

// Example usage:
function showDistanceToLocation(targetLat, targetLon) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          targetLat,
          targetLon
        );
        
        document.getElementById("distance").innerHTML = \`
          You are \${distance.toFixed(2)} km from the target location.
        \`;
      },
      (error) => {
        console.error("Error getting location for distance calculation:", error);
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}`,
                        "distance"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "distance" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Example 3: Geolocation Permissions */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-lg mb-2">
                  3. Managing Permissions
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Check and manage geolocation permissions for better user
                  experience.
                </p>

                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                  <CodeEditor
                    value={`// Check if geolocation is supported and permissions
async function checkGeolocationPermission() {
  if (!navigator.geolocation) {
    return "unsupported";
  }
  
  // The Permissions API is not universally supported
  if (!navigator.permissions) {
    return "unknown";
  }
  
  try {
    const permissionStatus = await navigator.permissions.query({
      name: "geolocation"
    });
    
    return permissionStatus.state;
  } catch (error) {
    console.error("Error checking permission:", error);
    return "unknown";
  }
}

// Example usage
async function handleGeolocationRequest() {
  const permission = await checkGeolocationPermission();
  
  switch (permission) {
    case "granted":
      // Permission already granted, proceed with geolocation
      getLocation();
      break;
    case "prompt":
      // Will prompt the user when getCurrentPosition is called
      getLocation();
      break;
    case "denied":
      // Permission denied, show alternative content
      document.getElementById("message").innerHTML = 
        "Please enable geolocation permissions in your browser settings.";
      break;
    case "unsupported":
      document.getElementById("message").innerHTML = 
        "Geolocation is not supported by your browser.";
      break;
    default:
      // Unknown state, proceed but handle potential errors
      getLocation();
  }
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Handle position
    },
    (error) => {
      // Handle error
    }
  );
}`}
                    language="javascript"
                    style={{
                      fontSize: 14,
                      backgroundColor: "#f8fafc",
                      fontFamily:
                        "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    }}
                    className="rounded-lg"
                  />
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Geolocation Permissions</title>
</head>
<body>
  <button onclick="handleGeolocationRequest()">Check My Location</button>
  <div id="message"></div>
  <div id="location"></div>
  
  <script>
    // Check if geolocation is supported and permissions
    async function checkGeolocationPermission() {
      if (!navigator.geolocation) {
        return "unsupported";
      }
      
      // The Permissions API is not universally supported
      if (!navigator.permissions) {
        return "unknown";
      }
      
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation"
        });
        
        return permissionStatus.state;
      } catch (error) {
        console.error("Error checking permission:", error);
        return "unknown";
      }
    }

    // Example usage
    async function handleGeolocationRequest() {
      const permission = await checkGeolocationPermission();
      const messageEl = document.getElementById("message");
      
      switch (permission) {
        case "granted":
          messageEl.innerHTML = "Permission already granted. Getting location...";
          getLocation();
          break;
        case "prompt":
          messageEl.innerHTML = "Please allow location access when prompted.";
          getLocation();
          break;
        case "denied":
          messageEl.innerHTML = 
            "Permission denied. Please enable geolocation in your browser settings.";
          break;
        case "unsupported":
          messageEl.innerHTML = "Geolocation is not supported by your browser.";
          break;
        default:
          messageEl.innerHTML = "Checking your location...";
          getLocation();
      }
    }

    function getLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.getElementById("location").innerHTML = \`
            Latitude: \${position.coords.latitude}<br>
            Longitude: \${position.coords.longitude}
          \`;
        },
        (error) => {
          document.getElementById("message").innerHTML = 
            "Error getting location: " + error.message;
        }
      );
    }
  </script>
</body>
</html>`)
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    <FaPlay size={12} /> Try it
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `// Check if geolocation is supported and permissions
async function checkGeolocationPermission() {
  if (!navigator.geolocation) {
    return "unsupported";
  }
  
  // The Permissions API is not universally supported
  if (!navigator.permissions) {
    return "unknown";
  }
  
  try {
    const permissionStatus = await navigator.permissions.query({
      name: "geolocation"
    });
    
    return permissionStatus.state;
  } catch (error) {
    console.error("Error checking permission:", error);
    return "unknown";
  }
}

// Example usage
async function handleGeolocationRequest() {
  const permission = await checkGeolocationPermission();
  
  switch (permission) {
    case "granted":
      // Permission already granted, proceed with geolocation
      getLocation();
      break;
    case "prompt":
      // Will prompt the user when getCurrentPosition is called
      getLocation();
      break;
    case "denied":
      // Permission denied, show alternative content
      document.getElementById("message").innerHTML = 
        "Please enable geolocation permissions in your browser settings.";
      break;
    case "unsupported":
      document.getElementById("message").innerHTML = 
        "Geolocation is not supported by your browser.";
      break;
    default:
      // Unknown state, proceed but handle potential errors
      getLocation();
  }
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      // Handle position
    },
    (error) => {
      // Handle error
    }
  );
}`,
                        "permissions"
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {copied === "permissions" ? (
                      <>
                        <FaCheck className="text-green-500" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* API Reference */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Geolocation API Reference
          </h2>
          <button
            onClick={() => toggleSection("reference")}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaChevronDown
              className={`transition-transform ${expandedSections.reference ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {expandedSections.reference && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Method/Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        navigator.geolocation.getCurrentPosition()
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Gets the device&apos;s current location (one-time request)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        navigator.geolocation.watchPosition()
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Watches the device&apos;s location and calls a callback when it
                      changes
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        navigator.geolocation.clearWatch()
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Stops watching the device&apos;s location
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        Position.coords.latitude
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      The latitude in decimal degrees
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        Position.coords.longitude
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      The longitude in decimal degrees
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        Position.coords.accuracy
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      The accuracy of position in meters
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        Position.coords.altitude
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      The altitude in meters above sea level (if available)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        Position.coords.speed
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      The speed in meters per second (if available)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        Position.coords.heading
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      The heading as degrees clockwise from North (if available)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        Position.timestamp
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      The time when the position was acquired
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                        PositionError
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      Error object returned when geolocation fails
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Best Practices */}
      <section className="mb-8 bg-green-50 dark:bg-gray-800 p-6 rounded-lg border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
          Best Practices
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2">
              1. Request Permission Appropriately
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Only request geolocation access when the user expects it (e.g.,
              after clicking a &quot;Find Near Me&quot; button). Don&apos;t request it on page
              load without context.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">2. Provide Fallbacks</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Always handle cases where geolocation is denied or unavailable.
              Provide manual location input options when possible.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">
              3. Optimize for Accuracy vs Battery
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Use <code>enableHighAccuracy: true</code> only when needed (e.g.,
              for navigation). For general location purposes, the default is
              usually sufficient and better for battery life.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">
              4. Handle Errors Gracefully
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Provide clear error messages when location access fails and
              explain how the user can enable it if they want to.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">5. Consider Privacy</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Be transparent about how you&apos;ll use location data and consider
              implementing a privacy policy that addresses location tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
          Conclusion
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The Geolocation API is a powerful tool for creating location-aware web
          applications. With proper implementation and consideration for user
          privacy, you can create engaging experiences that respond to the
          user&apos;s physical location.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/compilers/html-editor"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try HTML Editor
          </Link>
          <Link
            href="/tutorials/html"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            More HTML Tutorials
          </Link>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="flex justify-between items-center px-4 py-6 border-t mt-5">
        <Link
          href="/html/svg"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          &lt; Previous (Svg)
        </Link>
        <Link
          href="/html/drag-drop"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded shadow"
        >
          Next (Drag-Drop) &gt;
        </Link>
      </section>
    </div>
  );
}
