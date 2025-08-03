"use client";

import { FaCopy, FaCheck, FaChevronDown, FaCode, FaPlay } from "react-icons/fa";
import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HTMLWebStorageTutorial() {
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

    // Basic Example Preview
    const BasicExamplePreview = () => {
        const [value, setValue] = useState("");
        const [storedValue, setStoredValue] = useState("");

        const handleSave = () => {
            localStorage.setItem("demoKey", value);
            setStoredValue(value);
            setValue("");
        };

        const handleClear = () => {
            localStorage.removeItem("demoKey");
            setStoredValue("");
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="mb-4">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter value to store"
                        className="p-2 border rounded w-full"
                    />
                </div>
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Save to localStorage
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                        Clear
                    </button>
                </div>
                <div>
                    <p className="font-bold">Stored Value:</p>
                    <p className="bg-white dark:bg-gray-800 p-2 rounded">
                        {storedValue || "(empty)"}
                    </p>
                </div>
            </div>
        );
    };

    // Session Storage Example
    const SessionStorageExample = () => {
        const [sessionValue, setSessionValue] = useState("");
        const [inputValue, setInputValue] = useState("");

        const handleSave = () => {
            sessionStorage.setItem("sessionDemo", inputValue);
            setSessionValue(inputValue);
            setInputValue("");
        };

        const handleClear = () => {
            sessionStorage.removeItem("sessionDemo");
            setSessionValue("");
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter value to store"
                        className="p-2 border rounded w-full"
                    />
                </div>
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save to sessionStorage
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                        Clear
                    </button>
                </div>
                <div>
                    <p className="font-bold">Stored Value:</p>
                    <p className="bg-white dark:bg-gray-800 p-2 rounded">
                        {sessionValue || "(empty)"}
                    </p>
                </div>
            </div>
        );
    };

    // Complex Data Example
    const ComplexDataExample = () => {
        const [userData, setUserData] = useState({
            name: "",
            email: "",
            preferences: {
                theme: "light",
                notifications: true,
            },
        });

        const [storedData, setStoredData] = useState("");

        const handleSave = () => {
            localStorage.setItem("userData", JSON.stringify(userData));
            setStoredData(JSON.stringify(userData, null, 2));
        };

        const handleLoad = () => {
            const data = localStorage.getItem("userData");
            if (data) {
                setStoredData(data);
            }
        };

        const handleClear = () => {
            localStorage.removeItem("userData");
            setStoredData("");
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <div className="mb-4 space-y-2">
                    <div>
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            value={userData.name}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    name: e.target.value,
                                })
                            }
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email:</label>
                        <input
                            type="email"
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    email: e.target.value,
                                })
                            }
                            className="p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Theme:</label>
                        <select
                            value={userData.preferences.theme}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    preferences: {
                                        ...userData.preferences,
                                        theme: e.target.value,
                                    },
                                })
                            }
                            className="p-2 border rounded w-full"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={userData.preferences.notifications}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    preferences: {
                                        ...userData.preferences,
                                        notifications: e.target.checked,
                                    },
                                })
                            }
                            className="mr-2"
                        />
                        <label>Enable Notifications</label>
                    </div>
                </div>
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Save Complex Data
                    </button>
                    <button
                        onClick={handleLoad}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Load Data
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                        Clear
                    </button>
                </div>
                <div>
                    <p className="font-bold">Stored Data:</p>
                    <pre className="bg-white dark:bg-gray-800 p-2 rounded overflow-x-auto">
                        {storedData || "(empty)"}
                    </pre>
                </div>
            </div>
        );
    };

    // Storage Event Example
    const StorageEventExample = () => {
        const [eventLog, setEventLog] = useState<string[]>([]);

        const handleAddListener = () => {
            window.addEventListener("storage", (e) => {
                const logEntry = `Storage event: key=${e.key}, oldValue=${e.oldValue}, newValue=${e.newValue}`;
                setEventLog((prev) => [...prev, logEntry]);
            });
            setEventLog((prev) => [
                ...prev,
                "Storage event listener added. Open another tab/window and modify storage to see events.",
            ]);
        };

        return (
            <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <button
                    onClick={handleAddListener}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mb-4"
                >
                    Add Storage Event Listener
                </button>
                <div>
                    <p className="font-bold mb-2">Event Log:</p>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded max-h-40 overflow-y-auto">
                        {eventLog.length > 0 ? (
                            eventLog.map((log, i) => (
                                <p key={i} className="text-sm mb-1">
                                    {log}
                                </p>
                            ))
                        ) : (
                            <p>(no events yet)</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    HTML Web Storage Tutorial
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Learn how to use localStorage and sessionStorage to persist data in the browser
                </p>
            </header>

            {/* Introduction */}
            <section className="mb-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">
                    Introduction to Web Storage
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The Web Storage API provides mechanisms for browsers to store key/value pairs in a much more intuitive fashion than using cookies. There are two main types of web storage:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 text-blue-600 dark:text-blue-400">localStorage</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            <li>Data persists even when the browser is closed and reopened</li>
                            <li>Stored data has no expiration time</li>
                            <li>Storage limit is typically 5MB per origin</li>
                            <li>Accessible from any window/tab from the same origin</li>
                        </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 text-blue-600 dark:text-blue-400">sessionStorage</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            <li>Data is cleared when the page session ends (when tab is closed)</li>
                            <li>Useful for temporary data that shouldn't persist</li>
                            <li>Storage limit is typically 5MB per origin</li>
                            <li>Only accessible from the tab that created it</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg mb-4">
                    <h3 className="font-bold mb-2">Basic localStorage Example:</h3>
                    <BasicExamplePreview />
                    <CodeEditor
                        value={`// Save data to localStorage
localStorage.setItem('key', 'value');

// Get saved data from localStorage
const data = localStorage.getItem('key');

// Remove saved data from localStorage
localStorage.removeItem('key');

// Clear all localStorage
localStorage.clear();`}
                        language="javascript"
                        style={{
                            fontSize: 14,
                            backgroundColor: "#f8fafc",
                            fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                        }}
                        className="rounded-lg"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => copyToClipboard(`// Save data to localStorage
localStorage.setItem('key', 'value');

// Get saved data from localStorage
const data = localStorage.getItem('key');

// Remove saved data from localStorage
localStorage.removeItem('key');

// Clear all localStorage
localStorage.clear();`, "basic storage")}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                            {copied === "basic storage" ? (
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
                            onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Basic localStorage Example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    input {
      padding: 8px;
      width: 100%;
      margin-bottom: 10px;
    }
    button {
      padding: 8px 16px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }
    #output {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      min-height: 20px;
    }
  </style>
</head>
<body>
  <h1>localStorage Demo</h1>
  
  <input type="text" id="storageInput" placeholder="Enter value to store">
  
  <button onclick="saveToStorage()">Save to localStorage</button>
  <button onclick="loadFromStorage()">Load from localStorage</button>
  <button onclick="clearStorage()">Clear</button>
  
  <div id="output"></div>
  
  <script>
    function saveToStorage() {
      const value = document.getElementById('storageInput').value;
      localStorage.setItem('demoKey', value);
      document.getElementById('output').textContent = \`Saved: \${value}\`;
      document.getElementById('storageInput').value = '';
    }
    
    function loadFromStorage() {
      const value = localStorage.getItem('demoKey');
      document.getElementById('output').textContent = value 
        ? \`Loaded: \${value}\` 
        : 'No data found';
    }
    
    function clearStorage() {
      localStorage.removeItem('demoKey');
      document.getElementById('output').textContent = 'Storage cleared';
    }
    
    // Load any existing value on page load
    window.onload = loadFromStorage;
  </script>
</body>
</html>`)}
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
                        Web Storage Examples
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
                        {/* Example 1: Session Storage */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">1. sessionStorage Example</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Demonstrates how sessionStorage works (data is cleared when tab is closed)
                                </p>

                                <SessionStorageExample />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>sessionStorage Example</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    input {
      padding: 8px;
      width: 100%;
      margin-bottom: 10px;
    }
    button {
      padding: 8px 16px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
    }
    #output {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      min-height: 20px;
    }
  </style>
</head>
<body>
  <h1>sessionStorage Demo</h1>
  
  <input type="text" id="sessionInput" placeholder="Enter value to store">
  
  <button onclick="saveToSession()">Save to sessionStorage</button>
  <button onclick="loadFromSession()">Load from sessionStorage</button>
  <button onclick="clearSession()">Clear</button>
  
  <div id="output"></div>
  
  <script>
    function saveToSession() {
      const value = document.getElementById('sessionInput').value;
      sessionStorage.setItem('sessionKey', value);
      document.getElementById('output').textContent = \`Saved: \${value}\`;
      document.getElementById('sessionInput').value = '';
    }
    
    function loadFromSession() {
      const value = sessionStorage.getItem('sessionKey');
      document.getElementById('output').textContent = value 
        ? \`Loaded: \${value}\` 
        : 'No data found';
    }
    
    function clearSession() {
      sessionStorage.removeItem('sessionKey');
      document.getElementById('output').textContent = 'Session storage cleared';
    }
    
    // Load any existing value on page load
    window.onload = loadFromSession;
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`// Save data to sessionStorage
sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
const data = sessionStorage.getItem('key');

// Remove saved data from sessionStorage
sessionStorage.removeItem('key');

// Clear all sessionStorage
sessionStorage.clear();`, "session storage")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "session storage" ? (
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

                        {/* Example 2: Storing Objects */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">2. Storing Complex Data</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    How to store and retrieve objects and arrays using JSON serialization
                                </p>

                                <ComplexDataExample />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Storing Complex Data</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    input, select {
      padding: 8px;
      width: 100%;
      margin-bottom: 10px;
    }
    button {
      padding: 8px 16px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    #output {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      min-height: 20px;
      white-space: pre-wrap;
      font-family: monospace;
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <h1>Storing Complex Data</h1>
  
  <div>
    <label>Name:</label>
    <input type="text" id="userName">
  </div>
  
  <div>
    <label>Email:</label>
    <input type="email" id="userEmail">
  </div>
  
  <div>
    <label>Theme Preference:</label>
    <select id="userTheme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </div>
  
  <div class="checkbox-container">
    <input type="checkbox" id="userNotifications">
    <label for="userNotifications">Enable Notifications</label>
  </div>
  
  <button onclick="saveUserData()">Save User Data</button>
  <button onclick="loadUserData()">Load User Data</button>
  <button onclick="clearUserData()">Clear</button>
  
  <div id="output"></div>
  
  <script>
    function saveUserData() {
      const userData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        preferences: {
          theme: document.getElementById('userTheme').value,
          notifications: document.getElementById('userNotifications').checked
        }
      };
      
      localStorage.setItem('userData', JSON.stringify(userData));
      document.getElementById('output').textContent = 'User data saved!';
    }
    
    function loadUserData() {
      const data = localStorage.getItem('userData');
      if (data) {
        const userData = JSON.parse(data);
        
        // Update form fields
        document.getElementById('userName').value = userData.name || '';
        document.getElementById('userEmail').value = userData.email || '';
        document.getElementById('userTheme').value = userData.preferences?.theme || 'light';
        document.getElementById('userNotifications').checked = 
          userData.preferences?.notifications || false;
        
        // Show the data
        document.getElementById('output').textContent = 
          JSON.stringify(userData, null, 2);
      } else {
        document.getElementById('output').textContent = 'No user data found';
      }
    }
    
    function clearUserData() {
      localStorage.removeItem('userData');
      document.getElementById('output').textContent = 'User data cleared';
      
      // Clear form fields
      document.getElementById('userName').value = '';
      document.getElementById('userEmail').value = '';
      document.getElementById('userTheme').value = 'light';
      document.getElementById('userNotifications').checked = false;
    }
    
    // Load any existing data on page load
    window.onload = loadUserData;
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`// Storing an object
const user = {
  name: 'John',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

// Convert to JSON string and store
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const storedUser = JSON.parse(localStorage.getItem('user'));

// Example with arrays
const items = ['apple', 'banana', 'orange'];
localStorage.setItem('items', JSON.stringify(items));

const storedItems = JSON.parse(localStorage.getItem('items'));`, "complex data")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "complex data" ? (
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
                        Advanced Web Storage Techniques
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
                        {/* Example 1: Storage Events */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">1. Storage Events</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Listen for storage changes across browser tabs/windows
                                </p>

                                <StorageEventExample />
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Storage Events</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    button {
      padding: 8px 16px;
      background: #7c3aed;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    #eventLog {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      min-height: 100px;
      max-height: 200px;
      overflow-y: auto;
    }
    .log-entry {
      margin-bottom: 5px;
      font-size: 14px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <h1>Storage Events Demo</h1>
  
  <p>Open this page in another tab to see storage events when data changes.</p>
  
  <button onclick="updateStorage()">Update Storage</button>
  <button onclick="clearLog()">Clear Log</button>
  
  <div id="eventLog"></div>
  
  <script>
    // Add storage event listener
    window.addEventListener('storage', (event) => {
      const logEntry = document.createElement('div');
      logEntry.className = 'log-entry';
      logEntry.textContent = \`Storage event: key="\${event.key}", oldValue="\${event.oldValue}", newValue="\${event.newValue}"\`;
      document.getElementById('eventLog').prepend(logEntry);
    });
    
    function updateStorage() {
      const timestamp = new Date().toLocaleTimeString();
      localStorage.setItem('demoEvent', timestamp);
      
      const logEntry = document.createElement('div');
      logEntry.className = 'log-entry';
      logEntry.textContent = \`[This tab] Updated storage at \${timestamp}\`;
      document.getElementById('eventLog').prepend(logEntry);
    }
    
    function clearLog() {
      document.getElementById('eventLog').innerHTML = '';
    }
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`// Listen for storage changes in other tabs/windows
window.addEventListener('storage', (event) => {
  console.log(\`Storage changed for key: \${event.key}\`);
  console.log(\`Old value: \${event.oldValue}\`);
  console.log(\`New value: \${event.newValue}\`);
  console.log(\`URL of page that made the change: \${event.url}\`);
});

// Note: The event only fires in other tabs/windows, not in the tab
// that made the change`, "storage events")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "storage events" ? (
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

                        {/* Example 2: Storage Limits and Quota */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="p-4 bg-white dark:bg-gray-800">
                                <h3 className="font-bold text-lg mb-2">2. Storage Limits and Quota</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Understanding and handling storage limits
                                </p>

                                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                                    <div className="mb-4">
                                        <button
                                            onClick={() => {
                                                try {
                                                    // Test storage quota by trying to store a large string
                                                    const largeString = 'a'.repeat(5 * 1024 * 1024); // ~5MB
                                                    localStorage.setItem('quotaTest', largeString);
                                                    alert('Successfully stored ~5MB of data');
                                                } catch (e) {
                                                    alert(`Error: ${e.message}`);
                                                }
                                            }}
                                            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                                        >
                                            Test Storage Quota (~5MB)
                                        </button>
                                    </div>
                                    <div>
                                        <p className="font-bold">Storage Usage:</p>
                                        <p className="bg-white dark:bg-gray-800 p-2 rounded">
                                            {(() => {
                                                try {
                                                    let total = 0;
                                                    for (let i = 0; i < localStorage.length; i++) {
                                                        const key = localStorage.key(i);
                                                        if (key) {
                                                            const value = localStorage.getItem(key);
                                                            total += key.length + (value ? value.length : 0);
                                                        }
                                                    }
                                                    return `${(total / 1024).toFixed(2)} KB used`;
                                                } catch (e) {
                                                    return "Could not calculate storage usage";
                                                }
                                            })()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mb-2">
                                    <button
                                        onClick={() => handleOpenEditor(`<!DOCTYPE html>
<html>
<head>
  <title>Storage Quota Test</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    button {
      padding: 8px 16px;
      background: #d97706;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    #output {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      min-height: 20px;
    }
  </style>
</head>
<body>
  <h1>Storage Quota Test</h1>
  
  <button onclick="testQuota()">Test Storage Quota (~5MB)</button>
  <button onclick="calculateUsage()">Calculate Usage</button>
  <button onclick="clearAll()">Clear All Storage</button>
  
  <div id="output"></div>
  
  <script>
    function testQuota() {
      try {
        // Create a string of approximately 5MB
        const largeString = 'a'.repeat(5 * 1024 * 1024);
        
        // Try to store it
        localStorage.setItem('quotaTest', largeString);
        
        document.getElementById('output').textContent = 
          'Successfully stored ~5MB of data in localStorage';
      } catch (e) {
        document.getElementById('output').textContent = 
          \`Error: \${e.message}\`;
      }
    }
    
    function calculateUsage() {
      try {
        let total = 0;
        
        // Calculate total storage used
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            const value = localStorage.getItem(key);
            total += key.length + (value ? value.length : 0);
          }
        }
        
        document.getElementById('output').textContent = 
          \`Approximate storage used: \${(total / 1024).toFixed(2)} KB\`;
      } catch (e) {
        document.getElementById('output').textContent = 
          \`Error calculating storage: \${e.message}\`;
      }
    }
    
    function clearAll() {
      localStorage.clear();
      document.getElementById('output').textContent = 
        'All localStorage data cleared';
    }
  </script>
</body>
</html>`)}
                                        className="flex items-center gap-1 px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
                                    >
                                        <FaPlay size={12} /> Try it
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(`// Function to estimate storage usage
function getLocalStorageUsage() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key);
      total += key.length + (value ? value.length : 0);
    }
  }
  return total; // Returns size in bytes
}

// Handling quota exceeded errors
try {
  localStorage.setItem('largeData', largeDataString);
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    console.error('Storage limit exceeded');
    // Handle the error (e.g., clear old data)
  }
}`, "storage quota")}
                                        className="flex items-center gap-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                                    >
                                        {copied === "storage quota" ? (
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
                        Web Storage API Reference
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
                                                localStorage.setItem(key, value)
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Stores a key/value pair in localStorage
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                localStorage.getItem(key)
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Retrieves a value by key from localStorage
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                localStorage.removeItem(key)
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Removes a key/value pair from localStorage
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                localStorage.clear()
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Clears all localStorage data for the origin
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                localStorage.key(index)
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Returns the key at the given index
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                localStorage.length
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Returns the number of stored items
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                sessionStorage.setItem(key, value)
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Stores a key/value pair in sessionStorage
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                sessionStorage.getItem(key)
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Retrieves a value by key from sessionStorage
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                sessionStorage.removeItem(key)
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Removes a key/value pair from sessionStorage
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                sessionStorage.clear()
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Clears all sessionStorage data for the origin
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm">
                                                window.addEventListener('storage', callback)
                                            </code>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            Listens for storage changes in other tabs/windows
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
                <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">Best Practices</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold text-lg mb-2">1. Use JSON for Complex Data</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Always serialize objects and arrays with JSON.stringify() before storing, and parse with JSON.parse() when retrieving.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">2. Handle Storage Limits</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Implement error handling for QuotaExceededError and consider periodically cleaning up old data.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">3. Be Mindful of Sensitive Data</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Never store sensitive information like passwords or tokens in web storage as it's accessible via JavaScript.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">4. Choose the Right Storage Type</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Use sessionStorage for temporary data that should disappear when the session ends, and localStorage for persistent data.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">5. Implement Fallbacks</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                            Provide fallback mechanisms for browsers that don't support web storage or when storage is disabled.
                        </p>
                    </div>
                </div>
            </section>

            {/* Conclusion */}
            <section className="bg-blue-50 dark:bg-gray-800 p-6 rounded-lg border border-blue-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-400">Conclusion</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                    The Web Storage API provides a simple and effective way to persist data in the browser. With localStorage for long-term persistence and sessionStorage for session-based storage, you can enhance user experiences by maintaining state, preferences, and other data between page visits.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/compilers/html-editor" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        Try HTML Editor
                    </Link>
                    <Link href="/tutorials/html" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                        More HTML Tutorials
                    </Link>
                </div>
            </section>
        </div>
    );
}