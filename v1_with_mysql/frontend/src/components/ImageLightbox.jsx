import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ImageLightbox = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy-950/80 backdrop-blur-md cursor-zoom-out"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/20"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-navy-900/60 hover:bg-navy-900 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Image section */}
            <div className="md:col-span-2 bg-navy-950 flex items-center justify-center p-2 min-h-[300px] max-h-[500px]">
              <img
                src={item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`}
                alt={item.title}
                className="max-w-full max-h-[480px] object-contain select-none"
              />
            </div>

            {/* Info details section */}
            <div className="p-6 md:p-8 flex flex-col justify-between bg-white text-left">
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
                  {item.category_display || item.category}
                </span>
                
                <h3 className="font-outfit font-extrabold text-navy-900 text-xl md:text-2xl leading-snug mb-4">
                  {item.title}
                </h3>
                
                <p className="text-navy-500 text-sm leading-relaxed mb-6">
                  This image represents a core operational milestone for AI-Solutions, reflecting our visual culture and client collaboration standards.
                </p>
              </div>

              <div className="border-t border-navy-100 pt-4 text-xs text-navy-400">
                Uploaded: {new Date(item.uploaded_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageLightbox;
