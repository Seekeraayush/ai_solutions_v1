import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const Counter = ({ value, suffix = '', prefix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    
    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(value); // Ensure exact final value
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-outfit font-extrabold text-navy-900 text-4xl md:text-5xl tracking-tight text-primary">
      {prefix}{count}{suffix}
    </span>
  );
};

const MetricsSection = () => {
  const metrics = [
    {
      title: 'Projects Delivered',
      subtitle: 'Enterprise-grade deployments',
      value: '25',
      suffix: '+',
      prefix: '',
      color: 'from-blue-500/10 to-indigo-500/5',
    },
    {
      title: 'Delivery Cycle',
      subtitle: 'Fast-paced execution speed',
      value: '28',
      suffix: ' Days',
      prefix: '3–',
      color: 'from-emerald-500/10 to-teal-500/5',
    },
    {
      title: 'Client Satisfaction',
      subtitle: 'Outstanding net promoter score',
      value: '99',
      suffix: '%',
      prefix: '',
      color: 'from-amber-500/10 to-orange-500/5',
    },
  ];

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((m, idx) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`glass-card p-8 rounded-3xl text-center relative overflow-hidden group hover:shadow-glass-hover transition-all duration-500 border border-white/50 bg-gradient-to-br ${m.color}`}
          >
            {/* Hover decorative shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            <div className="mb-4">
              <Counter value={m.value} suffix={m.suffix} prefix={m.prefix} />
            </div>
            
            <h3 className="font-outfit font-bold text-navy-900 text-lg mb-1 group-hover:text-primary transition-colors">
              {m.title}
            </h3>
            
            <p className="text-navy-500 text-sm">
              {m.subtitle}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MetricsSection;
