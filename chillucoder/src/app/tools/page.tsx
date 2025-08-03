import Link from "next/link";
import React from "react";

const ToolsHomePage = () => {
  const tools = [
    {
      name: "Image Map Generator",
      href: "/tools/image-map-generator",
    },
    {
      name: "QR Code Generator",
      href: "/tools/qr-code-generator",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Developer Tools
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="block bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition border border-gray-200"
          >
            <h2 className="text-2xl font-semibold text-blue-700">{tool.name}</h2>
            <p className="mt-2 text-gray-600">Open the {tool.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsHomePage;
