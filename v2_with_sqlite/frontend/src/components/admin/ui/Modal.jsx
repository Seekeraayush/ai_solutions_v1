import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative bg-[#0F0F1E] rounded-2xl shadow-glow w-full max-w-md border border-violet-500/20 my-8 z-10"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h3 className="font-grotesk font-bold text-[#F0F0FF] text-base">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/[0.06] text-[#94A3B8] hover:text-[#F0F0FF] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
          <div className="px-6 py-5">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default Modal;
