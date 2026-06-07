import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ContentModal = ({
  isOpen,
  item,
  onClose,
  onNext,
  onPrev,
  type = 'default',
  totalItems = 0,
  currentIndex = 0
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!item) return null;

  const showNavigation = totalItems > 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#0F0F1E] rounded-2xl overflow-hidden shadow-glow border border-violet-500/20"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#94A3B8] hover:text-[#F0F0FF] transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={20} />
            </motion.button>

            {type === 'blog' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
                {/* Image */}
                <div className="md:col-span-2 flex items-center justify-center bg-[#07070F] rounded-xl overflow-hidden min-h-[300px] md:min-h-[400px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-violet-500/15 text-violet-300 text-xs font-grotesk font-bold rounded-full mb-3 uppercase tracking-wider border border-violet-500/25">
                      {item.category}
                    </span>
                    <h2 className="text-2xl font-grotesk font-bold text-[#F0F0FF] mb-4">{item.title}</h2>
                    <p className="text-[#94A3B8] text-sm mb-6">{item.summary || item.description}</p>

                    <div className="space-y-3 text-sm text-[#94A3B8]">
                      {item.author && (
                        <div><strong className="text-[#F0F0FF]">By:</strong> {item.author}</div>
                      )}
                      {item.date && (
                        <div><strong className="text-[#F0F0FF]">Date:</strong> {item.date}</div>
                      )}
                      {item.readTime && (
                        <div><strong className="text-[#F0F0FF]">Read Time:</strong> {item.readTime}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'event' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
                {/* Image */}
                <div className="md:col-span-2 flex items-center justify-center bg-[#07070F] rounded-xl overflow-hidden min-h-[300px] md:min-h-[400px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-grotesk font-bold text-[#F0F0FF] mb-4">{item.title}</h2>
                    <p className="text-[#94A3B8] text-sm mb-6">{item.description}</p>

                    <div className="space-y-3 text-sm text-[#94A3B8] bg-violet-500/[0.05] border border-violet-500/20 p-4 rounded-xl">
                      {item.date && <div><strong className="text-[#F0F0FF]">Date:</strong> {item.date}</div>}
                      {item.time && <div><strong className="text-[#F0F0FF]">Time:</strong> {item.time}</div>}
                      {item.location && <div><strong className="text-[#F0F0FF]">Location:</strong> {item.location}</div>}
                      {item.attendees && <div><strong className="text-[#F0F0FF]">Attendees:</strong> {item.attendees}</div>}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full btn-primary py-2.5"
                  >
                    Register Now
                  </motion.button>
                </div>
              </div>
            )}

            {type === 'portfolio' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
                {/* Image */}
                <div className="md:col-span-2 flex items-center justify-center bg-[#07070F] rounded-xl overflow-hidden min-h-[300px] md:min-h-[400px]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-violet-500/15 text-violet-300 text-xs font-grotesk font-bold rounded-full mb-3 uppercase tracking-wider border border-violet-500/25">
                      {item.categoryName}
                    </span>
                    <h2 className="text-2xl font-grotesk font-bold text-[#F0F0FF] mb-3">{item.title}</h2>
                    <p className="text-[#94A3B8] text-sm mb-4">{item.description}</p>

                    <div className="mb-6">
                      <p className="text-sm font-grotesk font-semibold text-[#F0F0FF] mb-1">Client:</p>
                      <p className="text-[#94A3B8]">{item.client}</p>
                    </div>

                    {item.tech && (
                      <div>
                        <p className="text-sm font-grotesk font-semibold text-[#F0F0FF] mb-2">Technologies:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-grotesk font-semibold rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 w-full btn-primary py-2.5"
                  >
                    View Case Study
                  </motion.button>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            {showNavigation && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#94A3B8] hover:text-[#F0F0FF] transition-colors duration-200 shadow-lg z-10"
                  aria-label="Previous item"
                >
                  <ChevronLeft size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#94A3B8] hover:text-[#F0F0FF] transition-colors duration-200 shadow-lg z-10"
                  aria-label="Next item"
                >
                  <ChevronRight size={20} />
                </motion.button>

                {/* Item counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#0D0D1A]/80 backdrop-blur-md rounded-full text-[#94A3B8] text-sm font-grotesk font-medium border border-violet-500/20">
                  {currentIndex + 1} / {totalItems}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContentModal;
