import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Rocket, Award, CheckCircle, Zap, Crosshair, Handshake } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '2024',
      title: 'Founding & Inception',
      description: 'AI-Solutions founded by a team of AI researchers and veteran software architects with one goal: close the gap between enterprise legacy tech and state-of-the-art neural networks.',
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
      description: 'Delivered our 25th production system with a 99% satisfaction rating. Launched the unified startup SaaS dashboard to streamline client analytics and inquiries.',
      icon: CheckCircle,
    },
  ];

  const values = [
    {
      icon: Zap,
      title: 'Speed',
      description: 'We ship in days, not quarters. Every engagement has a clear timeline and measurable milestone.',
    },
    {
      icon: Crosshair,
      title: 'Precision',
      description: 'Production-grade code, rigorous testing, zero shortcuts. Your system works the first time.',
    },
    {
      icon: Handshake,
      title: 'Partnership',
      description: 'We are not a vendor. We are your AI engineering team — embedded, accountable, and aligned with your goals.',
    },
  ];

  return (
    <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">Our Journey</span>
        <h1 className="font-grotesk font-bold text-[#F0F0FF] text-4xl md:text-5xl mt-2 tracking-tight">
          We Don't Just Consult.<br />
          <span className="gradient-text">We Build.</span>
        </h1>
        <p className="text-[#94A3B8] text-base max-w-md mx-auto mt-3">
          Frontier AI technology, engineered for businesses ready to compete at the highest level.
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
          className="glass-card p-8 rounded-2xl flex gap-5"
        >
          <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 shrink-0">
            <Target size={22} />
          </div>
          <div>
            <h3 className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-2">Our Mission</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              To make frontier AI technology accessible to businesses that are ready to compete at the highest level. We build secure, performant, and reliable autonomous intelligence systems.
            </p>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 rounded-2xl flex gap-5"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0">
            <Eye size={22} />
          </div>
          <div>
            <h3 className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-2">Our Vision</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              To establish a global standard in enterprise-grade AI architecture where machine learning safety, lightning-fast execution, and intuitive interfaces are the baseline.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="section-divider mb-16" />

      {/* Timeline Section */}
      <div className="relative">
        <div className="text-center mb-16">
          <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">History</span>
          <h2 className="font-grotesk font-bold text-[#F0F0FF] text-3xl mt-2">Timeline of Growth</h2>
          <p className="text-[#94A3B8] text-sm mt-1">Reflecting on our rapid scale and client successes.</p>
        </div>

        {/* Timeline entries with violet left-border */}
        <div className="flex flex-col gap-8 relative pl-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/60 via-violet-500/20 to-transparent" />

          {milestones.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Cyan dot indicator */}
                <div className="absolute -left-[2.15rem] top-5 w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#0D0D1A] shadow-glow-cyan z-10" />

                <div className="glass-card p-6 rounded-2xl">
                  <span className="inline-block px-3 py-1 bg-violet-500/15 text-violet-300 text-xs font-bold rounded-full mb-3 font-grotesk border border-violet-500/25">
                    {m.year}
                  </span>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-grotesk font-bold text-[#F0F0FF] text-base mb-2">{m.title}</h4>
                      <p className="text-[#94A3B8] text-xs leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Section divider */}
      <div className="section-divider my-16" />

      {/* Team Values */}
      <div>
        <div className="text-center mb-12">
          <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">How We Work</span>
          <h2 className="font-grotesk font-bold text-[#F0F0FF] text-3xl mt-2">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white mx-auto mb-4 shadow-glow-sm">
                  <Icon size={22} />
                </div>
                <h3 className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-2">{v.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
