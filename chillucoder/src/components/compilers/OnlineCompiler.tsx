// components/OnlineCompiler.tsx
"use client";

import { useState, useEffect } from 'react';

type Language = 'c' | 'cpp' | 'python' | 'javascript' | 'java';

const defaultCode: Record<Language, string> = {
  c: `#include <stdio.h>

int main() {
    // Write C code here
    printf("Hello, World!");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}`,
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}`
};

export default function OnlineCompiler() {
  const [language, setLanguage] = useState<Language>('c');
  const [code, setCode] = useState<string>(defaultCode.c);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    setCode(defaultCode[language]);
    setOutput('');
  }, [language]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Mock execution - replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput('Hello, World!\nProgram executed successfully.');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => setOutput('');

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800">Online Compiler</h1>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          disabled={isRunning}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>
      </div>

      {/* Code Editor */}
      <div className="flex-grow mb-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isRunning}
          className="w-full h-full p-4 font-mono text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white"
          spellCheck="false"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className={`px-4 py-2 rounded-md font-medium text-white ${isRunning ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {isRunning ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running...
            </span>
          ) : 'Run'}
        </button>
        <button
          onClick={handleClear}
          disabled={isRunning || !output}
          className={`px-4 py-2 rounded-md font-medium text-white ${(!output || isRunning) ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
        >
          Clear
        </button>
      </div>

      {/* Output */}
      <div className="border border-gray-300 rounded-md bg-white">
        <div className="px-4 py-2 bg-gray-100 border-b border-gray-300 font-medium">Output</div>
        <pre className={`p-4 font-mono text-sm min-h-[100px] max-h-60 overflow-y-auto ${!output ? 'text-gray-400' : 'text-gray-800'}`}>
          {output || 'Run code to see output here...'}
        </pre>
      </div>
    </div>
  );
}