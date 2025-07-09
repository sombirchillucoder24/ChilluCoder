import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaPython, 
  FaDatabase,
  FaPhp,
  FaCode
} from 'react-icons/fa'

export function LanguageBar() {
  const pathname = usePathname()
  
  const languages = [
    { name: 'HTML', path: '/html', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS', path: '/css', icon: <FaCss3Alt className="text-blue-500" /> },
    { name: 'JavaScript', path: '/js', icon: <FaJs className="text-yellow-400" /> },
    { name: 'Python', path: '/python', icon: <FaPython className="text-blue-400" /> },
    { name: 'SQL', path: '/sql', icon: <FaDatabase className="text-gray-500" /> },
    { name: 'PHP', path: '/php', icon: <FaPhp className="text-purple-500" /> },
    { name: 'jQuery', path: '/jquery', icon: <FaCode className="text-blue-300" /> }
  ]

  const isLanguagePage = languages.some(lang => pathname.startsWith(lang.path))

  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 py-2 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {isLanguagePage && (
            <Link 
              href="/" 
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
            >
              <span className="mr-1">❮</span> Home
            </Link>
          )}
          
          {languages.map((lang) => (
            <Link
              key={lang.path}
              href={lang.path}
              className={`flex items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                pathname.startsWith(lang.path) 
                  ? 'bg-gray-100 dark:bg-gray-700 font-medium text-green-500' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <span className="mr-2 text-lg">{lang.icon}</span>
              {lang.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}