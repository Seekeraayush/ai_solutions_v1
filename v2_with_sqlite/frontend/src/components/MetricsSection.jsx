import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
        setCount(value);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="gradient-text font-grotesk font-bold text-5xl">
      {prefix}{count}{suffix}
    </span>
  );
};

const MetricsSection = () => {
  const metrics = [
    {
      title: 'Projects Shipped',
      subtitle: 'Enterprise-grade deployments',
      value: '25',
      suffix: '+',
      prefix: '',
    },
    {
      title: 'Delivery Cycle',
      subtitle: 'Fast-paced execution speed',
      value: '28',
      suffix: ' Days',
      prefix: '3–',
    },
    {
      title: 'Client Retention',
      subtitle: 'Outstanding net promoter score',
      value: '99',
      suffix: '%',
      prefix: '',
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#07070F] dot-grid relative">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card p-8 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="mb-4">
                <Counter value={m.value} suffix={m.suffix} prefix={m.prefix} />
              </div>

              <h3 className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-1">
                {m.title}
              </h3>

              <p className="text-[#94A3B8] text-sm">
                {m.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
