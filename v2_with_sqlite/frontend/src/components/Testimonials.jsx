import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import api from '../services/api';

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

const imgSrc = (url) =>
  url ? (url.startsWith('http') ? url : `http://localhost:8000${url}`) : null;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    api.get('testimonials/')
      .then(({ data }) => setTestimonials(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 6000);
  }, [nextSlide]);

  useEffect(() => {
    if (testimonials.length < 2) return;
    timerRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timerRef.current);
  }, [testimonials.length, nextSlide]);

  if (loading) {
    return (
      <div className="py-20 px-6 max-w-4xl mx-auto text-center">
        <div className="mb-10">
          <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">Testimonials</span>
          <h2 className="font-grotesk font-bold text-[#F0F0FF] text-3xl md:text-4xl mt-2">What Our Clients Say</h2>
        </div>
        <div className="flex justify-center gap-3 py-16">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-violet-500/30 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  const active = testimonials[index];

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto text-center relative">
      <div className="mb-10">
        <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">Testimonials</span>
        <h2 className="font-grotesk font-bold text-[#F0F0FF] text-3xl md:text-4xl mt-2">
          What Our Clients Say
        </h2>
      </div>

      <div className="relative min-h-[360px] md:min-h-[280px] flex items-center justify-center">
        {/* Navigation Buttons */}
        <button
          onClick={() => { prevSlide(); resetAutoplay(); }}
          className="absolute left-0 md:-left-8 p-3 rounded-full bg-white/[0.05] border border-white/10 text-[#94A3B8] hover:border-violet-500/40 hover:text-[#F0F0FF] cursor-pointer transition-all z-10"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => { nextSlide(); resetAutoplay(); }}
          className="absolute right-0 md:-right-8 p-3 rounded-full bg-white/[0.05] border border-white/10 text-[#94A3B8] hover:border-violet-500/40 hover:text-[#F0F0FF] cursor-pointer transition-all z-10"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Slide */}
        <div className="w-[85%] overflow-hidden relative py-4">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={active.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -50) { nextSlide(); resetAutoplay(); }
                else if (offset.x > 50) { prevSlide(); resetAutoplay(); }
              }}
              className="glass-card p-8 md:p-10 rounded-2xl cursor-grab active:cursor-grabbing text-left relative"
            >
              <Quote className="absolute right-8 top-8 text-violet-500/20 w-16 h-16 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#94A3B8] text-base md:text-lg leading-relaxed mb-6 italic">
                "{active.content}"
              </p>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                {imgSrc(active.image) && (
                  <img
                    src={imgSrc(active.image)}
                    alt={active.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-violet-500/30 shrink-0"
                  />
                )}
                <div>
                  <h4 className="font-grotesk font-bold text-[#F0F0FF] text-sm">{active.name}</h4>
                  <p className="text-xs text-violet-400">{active.company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { resetAutoplay(); setDirection(i > index ? 1 : -1); setIndex(i); }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === index
                  ? 'w-6 bg-gradient-to-r from-violet-500 to-cyan-400'
                  : 'w-2 bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Testimonials;
