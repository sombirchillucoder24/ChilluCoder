import { Navbar } from '@/components/Navbar'
import { Topbar } from '@/components/Topbar'

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  // Mock search results
  const results = [
    { id: 1, title: 'HTML Introduction', url: '/html', excerpt: 'Learn HTML basics' },
    { id: 2, title: 'CSS Styling', url: '/css', excerpt: 'Style your HTML' },
    { id: 3, title: 'JavaScript Basics', url: '/js', excerpt: 'Learn JS fundamentals' },
  ].filter(item => 
    item.title.toLowerCase().includes(searchParams.q?.toLowerCase()) || 
    item.excerpt.toLowerCase().includes(searchParams.q?.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Navbar />
      
      <main className="flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">
          Search Results for: <span className="text-green-500">"{searchParams.q}"</span>
        </h1>
        
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map(result => (
              <div key={result.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <a href={result.url} className="block">
                  <h2 className="text-xl font-semibold text-green-500">{result.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{result.excerpt}</p>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg">
            <p className="dark:text-yellow-100">No results found for "{searchParams.q}"</p>
          </div>
        )}
      </main>
    </div>
  )
}