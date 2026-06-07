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
          className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-zoom-out"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative max-w-4xl w-full bg-[#0F0F1E] rounded-2xl overflow-hidden shadow-glow z-10 border border-violet-500/20"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-[#94A3B8] hover:text-[#F0F0FF] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Image section */}
            <div className="md:col-span-2 bg-[#07070F] flex items-center justify-center p-2 min-h-[300px] max-h-[500px]">
              <img
                src={item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`}
                alt={item.title}
                className="max-w-full max-h-[480px] object-contain select-none"
              />
            </div>

            {/* Info details section */}
            <div className="p-6 md:p-8 flex flex-col justify-between text-left border-l border-violet-500/10">
              <div>
                <span className="inline-block px-3 py-1 bg-violet-500/15 text-violet-300 text-xs font-grotesk font-semibold rounded-full mb-3 uppercase tracking-wider border border-violet-500/25">
                  {item.category_display || item.category}
                </span>

                <h3 className="font-grotesk font-bold text-[#F0F0FF] text-xl md:text-2xl leading-snug mb-4">
                  {item.title}
                </h3>

                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                  This image represents a core operational milestone for AI-Solutions, reflecting our visual culture and client collaboration standards.
                </p>
              </div>

              <div className="border-t border-white/[0.06] pt-4 text-xs text-[#94A3B8]">
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
