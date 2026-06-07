import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Calendar, Award, Rocket, CheckCircle } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '2024',
      title: 'Founding & Inception',
      description: 'AI-Solutions founded in Palo Alto by a group of AI researchers and veteran software architects aiming to close the gap between enterprise legacy tech and state-of-the-art neural networks.',
      icon: Rocket,
    },
    {
      year: '2025',
      title: 'Expansion & 10+ Enterprise Clients',
      description: 'Deployed predictive telemetry frameworks for automotive clients in Germany and transaction fraud classifiers for finance hubs in Singapore. Doubled the core engineering team.',
      icon: Award,
    },
    {
      year: '2026',
      title: '25+ Deployed Systems & SaaS Release',
      description: 'Delivered our 25th production system, registering a 99% satisfaction rating. Launched the unified startup SaaS dashboard to streamline client analytics and inquiries.',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Journey</span>
        <h1 className="font-outfit font-extrabold text-navy-900 text-4xl md:text-5xl mt-1 tracking-tight">
          Who We Are
        </h1>
        <p className="text-navy-500 text-base max-w-md mx-auto mt-3">
          Bridging advanced AI engineering and premium corporate operations.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-3xl border border-white/50 bg-gradient-to-br from-blue-500/5 to-transparent flex gap-5"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Target size={22} />
          </div>
          <div>
            <h3 className="font-outfit font-bold text-navy-900 text-lg mb-2">Our Mission</h3>
            <p className="text-navy-500 text-sm leading-relaxed">
              To engineer secure, highly performant, and reliable autonomous intelligence systems that seamlessly automate complex workflows for corporate clients, yielding tangible latency and efficiency gains.
            </p>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-3xl border border-white/50 bg-gradient-to-br from-indigo-500/5 to-transparent flex gap-5"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0">
            <Eye size={22} />
          </div>
          <div>
            <h3 className="font-outfit font-bold text-navy-900 text-lg mb-2">Our Vision</h3>
            <p className="text-navy-500 text-sm leading-relaxed">
              To establish a global standard in enterprise-grade AI architecture, where machine learning safety, lightning-fast execution, and visual dashboard interfaces are standard across all corporate operations.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="relative mt-12">
        <div className="text-center mb-16">
          <h2 className="font-outfit font-extrabold text-navy-900 text-3xl">Timeline of Growth</h2>
          <p className="text-navy-500 text-sm mt-1">Reflecting on our rapid scale and client successes.</p>
        </div>

        {/* Vertical Timeline Center Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-navy-100 transform md:-translate-x-1/2" />

        {/* Milestone Entries */}
        <div className="flex flex-col gap-16 md:gap-12 relative">
          {milestones.map((m, idx) => {
            const Icon = m.icon;
            const isEven = idx % 2 === 0;
            return (
              <div key={m.year} className="flex flex-col md:flex-row relative">
                {/* Timeline Dot with Icon */}
                <div className="absolute left-0 md:left-1/2 top-2 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white border-4 border-white shadow-md transform -translate-x-0 md:-translate-x-1/2 z-10">
                  <Icon size={14} />
                </div>

                {/* Left side node */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 text-left md:text-right ${isEven ? 'md:block' : 'md:invisible'}`}>
                  {isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6 }}
                      className="glass-card p-6 rounded-3xl border border-navy-100 hover:shadow-md transition-shadow"
                    >
                      <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 font-outfit">
                        {m.year}
                      </span>
                      <h4 className="font-outfit font-bold text-navy-900 text-base mb-2">{m.title}</h4>
                      <p className="text-navy-500 text-xs leading-relaxed">{m.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Right side node */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-12 text-left ${!isEven ? 'md:block' : 'md:invisible'}`}>
                  {!isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6 }}
                      className="glass-card p-6 rounded-3xl border border-navy-100 hover:shadow-md transition-shadow"
                    >
                      <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 font-outfit">
                        {m.year}
                      </span>
                      <h4 className="font-outfit font-bold text-navy-900 text-base mb-2">{m.title}</h4>
                      <p className="text-navy-500 text-xs leading-relaxed">{m.description}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
