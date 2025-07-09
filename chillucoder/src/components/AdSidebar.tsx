"use client";

export function AdSidebar() {
  return (
    <aside className="hidden md:block w-1/5 p-4 border-l dark:border-gray-700">
      {/* Scrollable container with fixed height */}
      <div className="sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="space-y-4 pb-4">
          {/* Advertisement Section */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-2 dark:text-white">ADVERTISEMENT</h3>
            <div className="flex flex-col items-center justify-center h-48">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Premium Course Ad (300x250)
                </p>
              </div>
            </div>
          </div>

          {/* News Section */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-3 dark:text-white">LATEST NEWS</h3>
            <div className="space-y-3">
              {[
                {
                  title: "HTML6 Draft Proposal",
                  date: "May 15, 2023",
                  excerpt: "New semantic elements coming soon"
                },
                {
                  title: "Web Components Update",
                  date: "April 28, 2023",
                  excerpt: "Better browser support announced"
                }
              ].map((item, index) => (
                <div key={index} className="border-b dark:border-gray-700 pb-3 last:border-0">
                  <h4 className="font-medium text-sm dark:text-gray-200">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {item.date}
                  </p>
                  <p className="text-xs dark:text-gray-300">
                    {item.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Try Editor CTA */}
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-sm mb-2 dark:text-green-200">TRY OUR EDITOR</h3>
            <p className="text-xs dark:text-green-100 mb-3">
              Practice with our online code editor
            </p>
            <a
              href="/try-editor"
              className="inline-block w-full bg-green-500 hover:bg-green-600 text-white text-center text-sm font-medium py-2 px-3 rounded"
            >
              Open Editor
            </a>
          </div>

          {/* Additional Ad Space (optional) */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold mb-2 dark:text-white">RECOMMENDED</h3>
            <div className="flex flex-col items-center justify-center h-48">
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-700 dark:to-gray-600 rounded flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Recommended Tool (300x250)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}