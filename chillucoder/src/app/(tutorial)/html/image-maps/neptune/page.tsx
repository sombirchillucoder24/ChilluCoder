'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiExternalLink } from 'react-icons/fi';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  readTime: string;
};

export default function NeptuneBlog() {
  const [activePost, setActivePost] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate API fetch
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const blogPosts: BlogPost[] = [
    {
      id: 'blue-giant',
      title: 'Neptune: The Blue Giant',
      excerpt: 'Discover why Neptune appears blue and what makes this ice giant unique in our solar system.',
      content: `Neptune's vivid blue color comes from methane in its atmosphere absorbing red light. Despite being the farthest planet from the Sun, it has extremely active weather patterns with winds reaching 1,300 mph. The planet radiates 2.6 times more heat than it receives from the Sun, driving its dynamic atmosphere.`,
      tags: ['atmosphere', 'discovery'],
      date: '2023-11-15',
      readTime: '3 min'
    },
    {
      id: 'triton',
      title: 'Triton: Neptune\'s Captured Moon',
      excerpt: 'Exploring Neptune\'s largest moon with its backward orbit and icy geysers.',
      content: `Triton orbits Neptune in the opposite direction of the planet's rotation, suggesting it was captured from the Kuiper Belt. This moon has active nitrogen geysers and a surface temperature of -391°F (-235°C). Voyager 2 revealed cantaloupe-like terrain and a thin nitrogen atmosphere. Triton is slowly spiraling inward and will eventually be torn apart by Neptune's gravity.`,
      tags: ['moons', 'geology'],
      date: '2023-10-22',
      readTime: '4 min'
    },
    {
      id: 'voyager',
      title: 'Voyager 2\'s Historic Flyby',
      excerpt: 'The only spacecraft to visit Neptune and its revelations about the distant planet.',
      content: `In 1989, Voyager 2 made its closest approach to Neptune, coming within 3,000 miles of the north pole. The flyby discovered six new moons, confirmed incomplete rings, and imaged the Great Dark Spot storm system. The spacecraft measured Neptune's bizarre magnetic field, which is offset from the planet's center and tilted at 47 degrees.`,
      tags: ['exploration', 'missions'],
      date: '2023-09-05',
      readTime: '5 min'
    }
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const togglePost = (postId: string) => {
    setActivePost(activePost === postId ? null : postId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 text-blue-50">
      <header className="py-12 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 mb-2"
        >
          Neptune Chronicles
        </motion.h1>
        <p className="text-blue-200 max-w-2xl mx-auto">
          Exploring the mysteries of our solar system&apos;s most distant planet
        </p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search Neptune topics..."
              className="w-full bg-blue-900/50 border border-blue-700 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-2.5 text-blue-400">
              <FiChevronDown className="transform rotate-90" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-600' : 'bg-blue-900/50'}`}
            >
              List View
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-blue-900/50'}`}
            >
              Grid View
            </button>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-blue-300">No articles found matching your search</p>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-blue-900/20 backdrop-blur-sm border border-blue-800/50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => togglePost(post.id)}
                  className="w-full text-left p-6 focus:outline-none"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-blue-100 mb-2">{post.title}</h2>
                      <p className="text-blue-300">{post.excerpt}</p>
                    </div>
                    <FiChevronDown className={`text-blue-400 transition-transform duration-200 ${activePost === post.id ? 'transform rotate-180' : ''}`} />
                  </div>
                  <div className="flex gap-4 mt-4 text-sm text-blue-400">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime} read</span>
                    <div className="flex gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-800/30 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {activePost === post.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-blue-800/50">
                        <div className="prose prose-invert max-w-none">
                          <p>{post.content}</p>
                        </div>
                        <button className="mt-4 flex items-center text-blue-400 hover:text-blue-300">
                          Read full article <FiExternalLink className="ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-blue-900/20 backdrop-blur-sm border border-blue-800/50 rounded-xl overflow-hidden h-full flex flex-col"
              >
                <div className="h-48 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                  <div className="text-5xl">♆</div>
                </div>
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-bold text-blue-100 mb-2">{post.title}</h2>
                  <p className="text-blue-300 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-800/30 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-6 pb-6 pt-4 border-t border-blue-800/50 flex justify-between text-sm text-blue-400">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime} read</span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-blue-400 border-t border-blue-900/50">
        <p>{new Date().getFullYear()} Neptune Chronicles</p>
        <p className="mt-1 text-sm">Exploring the outer reaches of our solar system</p>
      </footer>
    </div>
  );
}