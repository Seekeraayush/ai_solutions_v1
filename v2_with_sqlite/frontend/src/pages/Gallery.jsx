import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import api from '../services/api';
import ImageLightbox from '../components/ImageLightbox';

const staticGalleryItems = [
  {
    id: 's1',
    title: 'AI Summit 2026 Keynote',
    category: 'events',
    category_display: 'Events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    uploaded_at: '2026-06-01T10:00:00Z',
  },
  {
    id: 's2',
    title: 'AI-Solutions HQ Silicon Valley',
    category: 'office',
    category_display: 'Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    uploaded_at: '2026-06-03T14:30:00Z',
  },
  {
    id: 's3',
    title: 'Client Collaboration Session',
    category: 'clients',
    category_display: 'Clients',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    uploaded_at: '2026-06-05T09:15:00Z',
  },
];

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get('gallery/');
        if (response.data && response.data.length > 0) {
          setItems(response.data);
        } else {
          setItems(staticGalleryItems);
        }
      } catch (error) {
        console.error('Failed to load gallery items, using local fallbacks:', error);
        setItems(staticGalleryItems);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = filter === 'all'
    ? items
    : items.filter(item => item.category === filter);

  return (
    <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">Visual Records</span>
        <h1 className="font-grotesk font-bold text-[#F0F0FF] text-4xl md:text-5xl mt-2 tracking-tight">
          Company <span className="gradient-text">Gallery</span>
        </h1>
        <p className="text-[#94A3B8] text-base max-w-md mx-auto mt-3">
          A visual look inside our events, office workspaces, and client sessions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          { key: 'all', label: 'All Items' },
          { key: 'events', label: 'Events' },
          { key: 'office', label: 'Office' },
          { key: 'clients', label: 'Clients' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-5 py-2 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filter === tab.key
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-glow-sm'
                : 'bg-white/[0.05] text-[#94A3B8] border border-white/10 hover:border-violet-500/40 hover:text-[#F0F0FF]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#94A3B8] gap-2">
          <Loader2 size={32} className="animate-spin text-violet-400" />
          <span className="text-xs font-grotesk font-semibold uppercase tracking-widest">Loading visual records...</span>
        </div>
      ) : (
        <motion.div
          layout
          className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className="break-inside-avoid glass-card rounded-2xl overflow-hidden hover:border-violet-500/40 hover:shadow-glow group transition-all duration-300 cursor-zoom-in relative"
              >
                <img
                  src={item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07070F]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-left text-white pointer-events-none">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-violet-500/20 backdrop-blur-sm px-2 py-0.5 rounded-full w-max mb-2 border border-violet-500/30 text-violet-300">
                    {item.category_display || item.category}
                  </span>
                  <h4 className="font-grotesk font-bold text-sm md:text-base leading-tight text-[#F0F0FF]">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox Trigger */}
      {selectedItem && (
        <ImageLightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
