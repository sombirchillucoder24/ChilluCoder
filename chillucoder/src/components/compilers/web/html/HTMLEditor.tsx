"use client";

import { useEffect, useState } from "react";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Swal from "sweetalert2";
import Head from "next/head";

export default function HTMLEditor({ htmlCode }: { htmlCode?: string }) {
  const [code, setCode] = useState("");
  const [formatted, setFormatted] = useState("");
  const [isFormatting, setIsFormatting] = useState(false);
  const [isLiveBlinking, setIsLiveBlinking] = useState(true);
  const [showAds, setShowAds] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const defaultHTML =
    htmlCode ||
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hi My Love ❤️</title>
  <style>
    body {
      background: linear-gradient(135deg, #ffecd2, #fcb69f);
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      text-align: center;
      max-width: 400px;
      width: 100%;
    }
    .btn {
      margin-top: 1.2rem;
      background: linear-gradient(to right, #ff758c, #ff7eb3);
      color: white;
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 2rem;
      cursor: pointer;
      font-size: 1rem;
      font-weight: bold;
    }
    #msg3 {
      display: none;
      margin-top: 1rem;
      color: #d63384;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hey <span style="color: #ff5c8a;">Sweetheart 💖</span></h1>
    <p>I just wanted to say... you're amazing, and I love you! 💕</p>
    <button class="btn" id="showBtn">Tap Me 😘</button>
    <p id="msg3">Aww! I knew you'd click. You're the cutest! 🥰</p>
  </div>

  <script>
    document.getElementById('showBtn').addEventListener('click', function () {
      document.getElementById('msg3').style.display = 'block';
    });
  </script>
</body>
</html>
`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLiveBlinking((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("html-code") || defaultHTML;
    formatHTML(stored);
  }, []);

  const formatHTML = async (rawCode: string) => {
    setIsFormatting(true);
    try {
      const pretty = await prettier.format(rawCode, {
        parser: "html",
        plugins: [parserHtml],
        printWidth: 80,
        tabWidth: 2,
      });
      setCode(pretty);
      setFormatted(pretty);
      localStorage.setItem("html-code", pretty);
    } catch (e) {
      setCode(rawCode);
      setFormatted(rawCode);
    } finally {
      setIsFormatting(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = e.target.value;
    setCode(updated);
    setFormatted(updated);
    localStorage.setItem("html-code", updated);
  };

  const resetEditor = async () => {
    const result = await Swal.fire({
      title: "Reset Editor?",
      text: "This will reset your current HTML code.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reset",
    });
    if (result.isConfirmed) {
      formatHTML(defaultHTML);
      Swal.fire("Reset!", "Your editor is reset.", "success");
    }
  };

  const exportHTML = () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `editor-${new Date().toISOString().slice(0, 10)}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>HTML Live Editor | ChilluCoder</title>
        <meta
          name="description"
          content="Free responsive HTML editor with live preview and export feature by ChilluCoder."
        />
        <meta
          name="keywords"
          content="HTML editor, live preview, responsive code, ChilluCoder"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="bg-[#282A35] text-white p-4 sticky top-0 z-50 text-center">
        <a href="/" className="text-xl font-bold">
          Another compilor (Click here!)
        </a>
      </div>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50 overflow-auto">
        <div
          id="google-ads-slot"
          className="h-[120px] w-full p-4 m-1 bg-white border rounded shadow-inner flex items-center justify-center text-gray-400 text-sm"
          aria-label="Advertisement space"
        ></div>
        <div className="max-h-[200px] text-center border-l bg-amber-50 p-4 text-xl font-semibold text-purple-900 shadow-inner rounded">
          🌐 HTML Editor
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-2 bg-purple-100 border-b text-sm gap-2">
          {/* Button Group */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => formatHTML(code)}
              disabled={isFormatting}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
            >
              {isFormatting ? "✨ Formatting..." : "✨ Format"}
            </button>

            <button
              onClick={resetEditor}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
            >
              🔄 Reset
            </button>

            <button
              onClick={exportHTML}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              💾 Download
            </button>

            {/* {!isMobile && (
              <button
                onClick={() => setShowAds(!showAds)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
              >
                {showAds ? "📢 Hide Ads" : "📢 Show Ads"}
              </button>
            )} */}
          </div>

          {/* Character & Line Count (optional, move inside or outside based on design) */}
          <div className="text-purple-700 sm:mt-0 mt-1">
            {code.length} chars | {code.split("\n").length} lines
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div
            className={`${showAds && !isMobile ? "w-3/4" : "w-full"} flex flex-col`}
          >
            <div className="flex-1 overflow-auto p-4 bg-white max-h-150">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-purple-700 font-semibold">🛠️ Editor</h2>
                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                  HTML
                </span>
              </div>
              <CodeEditor
                value={code}
                language="html"
                placeholder="Type your HTML code here..."
                onChange={handleCodeChange}
                padding={12}
                style={{
                  fontSize: 14,
                  backgroundColor: "white",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Consolas, monospace",
                  minHeight: 350,
                }}
                className="w-full resize-none border border-purple-300 rounded shadow-inner focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>

            <div className="flex-1 p-4 pb-20 bg-gray-50 border-t border-purple-200 max-h-1500 ">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-purple-700 font-semibold">
                  🖥️ Live Preview
                </h2>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-bold ${isLiveBlinking ? "bg-red-500" : "bg-red-600"} text-white`}
                >
                  ⚡ LIVE
                </span>
              </div>
              <iframe
                title="Live Preview"
                srcDoc={formatted}
                className="w-full h-full min-h-[200px] border border-purple-300 rounded-lg shadow"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
          {!isMobile && (
            <div className="w-1/4 overflow-auto p-4 bg-white">
              {/* You can place ad or any content here */}
            </div>
          )}
        </div>

        <div
          id="google-ads-slot"
          className="max-h-[400px] min-h-[250px] w-full p-4 bg-white flex items-center justify-center text-gray-400 text-sm"
          aria-label="Advertisement space"
        ></div>

        <footer className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-purple-100 to-pink-100 border-t text-xxs md:text-xs text-purple-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-1 md:mb-0">
            <span>🚀 HTML Editor v1.0 by ChilluCoder</span>
            <span className="h-1 w-1 rounded-full bg-purple-600 hidden md:block"></span>
            <span className="text-purple-600 hidden md:block">Ready</span>
          </div>
        </footer>
      </div>
    </>
  );
}
