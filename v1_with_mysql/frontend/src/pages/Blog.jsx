import React, { useState } from 'react';
import { Search, Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ContentModal from '../components/ContentModal';

const articles = [
  {
    id: 1,
    title: 'Architecting Scalable Multi-Agent AI Systems for Enterprise Operations',
    summary: 'A deep dive into orchestration frameworks, memory synchronization protocols, and custom retrieval pipelines to eliminate agent hallucinations in high-throughput database networks.',
    content: 'Full article text regarding orchestration details...',
    author: 'Dr. Aris Thorne',
    date: 'May 28, 2026',
    readTime: '8 min read',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'Deploying Real-Time Telemetry Anomaly Detection in Auto Pipelines',
    summary: 'How we implemented Time-Series Transformer models to monitor assembly sensors and forecast manufacturing faults 48 hours in advance.',
    author: 'Sarah Jenkins',
    date: 'May 15, 2026',
    readTime: '6 min read',
    category: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    featured: false,
  },
  {
    id: 3,
    title: 'A Guide to Custom Computer Vision Models in Visual Manufacturing QC',
    summary: 'Evaluating YOLO architectures versus custom CNN classifiers for detecting board microfractures on high-speed factory conveyor belts.',
    author: 'David Vance',
    date: 'Apr 22, 2026',
    readTime: '5 min read',
    category: 'Computer Vision',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
    featured: false,
  },
  {
    id: 4,
    title: 'Designing Minimalist SaaS User Interfaces for Executive Audits',
    summary: 'Best practices for implementing glassmorphic cards, Outfit typography, and responsive chart elements to maximize operational intelligence.',
    author: 'Elena Rostova',
    date: 'Mar 18, 2026',
    readTime: '4 min read',
    category: 'Design Systems',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
    featured: false,
  },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleNextArticle = () => {
    const filteredArticles = articles.filter((art) => {
      const query = searchQuery.toLowerCase();
      return (
        art.title.toLowerCase().includes(query) ||
        art.summary.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query)
      );
    });
    const currentIndex = filteredArticles.findIndex((art) => art.id === selectedArticle?.id);
    if (currentIndex < filteredArticles.length - 1) {
      setSelectedArticle(filteredArticles[currentIndex + 1]);
    }
  };

  const handlePrevArticle = () => {
    const filteredArticles = articles.filter((art) => {
      const query = searchQuery.toLowerCase();
      return (
        art.title.toLowerCase().includes(query) ||
        art.summary.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query)
      );
    });
    const currentIndex = filteredArticles.findIndex((art) => art.id === selectedArticle?.id);
    if (currentIndex > 0) {
      setSelectedArticle(filteredArticles[currentIndex - 1]);
    }
  };

  const filteredArticles = articles.filter((art) => {
    const query = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(query) ||
      art.summary.toLowerCase().includes(query) ||
      art.category.toLowerCase().includes(query)
    );
  });

  const featuredArticle = articles.find(art => art.featured);
  const regularArticles = filteredArticles.filter(art => !art.featured);

  return (
    <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm tracking-wider uppercase">Insights & Analysis</span>
        <h1 className="font-outfit font-extrabold text-navy-900 text-4xl md:text-5xl mt-1 tracking-tight">
          Company Blog
        </h1>
        <p className="text-navy-500 text-base max-w-md mx-auto mt-3">
          Deep dives into artificial intelligence architectures, UI designs, and system metrics.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-16 relative">
        <div className="flex bg-white rounded-full p-1 border border-navy-100 focus-within:border-primary shadow-sm shadow-navy-900/5 transition-all">
          <input
            type="text"
            placeholder="Search articles, topics, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-navy-900 text-sm outline-none px-4 py-2 placeholder-navy-400"
          />
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
            <Search size={18} />
          </div>
        </div>
      </div>

      {/* Articles Display */}
      {searchQuery === '' && featuredArticle && (
        /* Featured Section */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl overflow-hidden border border-navy-100 mb-12 hover:shadow-lg transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-navy-950 min-h-[260px]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover opacity-90"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-between text-left">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
                  Featured / {featuredArticle.category}
                </span>
                
                <h2 className="font-outfit font-extrabold text-navy-900 text-2xl md:text-3xl leading-snug mb-4 hover:text-primary transition-colors cursor-pointer" onClick={() => handleArticleClick(featuredArticle)}>
                  {featuredArticle.title}
                </h2>
                
                <p className="text-navy-500 text-sm leading-relaxed mb-6">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-navy-50 pt-4 text-xs text-navy-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><User size={14} /> {featuredArticle.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {featuredArticle.date}</span>
                </div>
                <span className="flex items-center gap-1 font-semibold text-primary"><Clock size={14} /> {featuredArticle.readTime}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Grid of Other Articles */}
      <div>
        <h3 className="font-outfit font-bold text-navy-900 text-xl text-left mb-6">
          {searchQuery !== '' ? `Search Results (${filteredArticles.length})` : 'Recent Articles'}
        </h3>

        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center text-navy-400 text-sm">
            No articles match your search parameters. Try broadening your keywords.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularArticles.map((art) => (
              <motion.div
                layout
                key={art.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-3xl overflow-hidden border border-navy-100 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-navy-950">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-navy-900 text-xs font-bold font-outfit shadow-sm">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 text-left flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="font-outfit font-bold text-navy-900 text-lg mb-2 hover:text-primary transition-colors cursor-pointer leading-snug" onClick={() => handleArticleClick(art)}>
                      {art.title}
                    </h4>
                    <p className="text-navy-500 text-xs leading-relaxed mb-4 line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-navy-50 pt-4 text-[10px] text-navy-400 mt-4">
                    <span className="flex items-center gap-1"><User size={12} /> {art.author}</span>
                    <span className="flex items-center gap-1 font-semibold text-primary"><Clock size={12} /> {art.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Content Modal */}
      <ContentModal
        isOpen={isModalOpen}
        item={selectedArticle}
        onClose={handleCloseModal}
        onNext={handleNextArticle}
        onPrev={handlePrevArticle}
        type="blog"
        totalItems={filteredArticles.length}
        currentIndex={selectedArticle ? filteredArticles.findIndex((art) => art.id === selectedArticle.id) : 0}
      />
    </div>
  );
};

export default Blog;
