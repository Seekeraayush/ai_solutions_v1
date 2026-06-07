import { motion } from 'framer-motion';
import { ArrowRight, Bot, BarChart3, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricsSection from '../components/MetricsSection';
import ParticleBackground from '../components/ParticleBackground';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="relative overflow-hidden bg-[#0D0D1A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6 dot-grid">
        <ParticleBackground />

        {/* Glow orbs */}
        <div className="glow-orb w-[500px] h-[500px] bg-violet-600/20 -top-40 -right-40" />
        <div className="glow-orb w-[400px] h-[400px] bg-cyan-500/10 bottom-10 -left-20" />

        <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-grotesk text-xs font-semibold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Next-Gen AI Consulting
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-grotesk font-bold text-4xl sm:text-5xl md:text-6xl text-[#F0F0FF] leading-[1.1] mb-6 tracking-tight max-w-3xl"
          >
            Build Smarter.<br />Scale Faster.<br />
            <span className="gradient-text">Deploy AI.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#94A3B8] text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            We engineer production-grade AI systems for enterprises that refuse to stay average. From autonomous agents to predictive analytics — we ship fast.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center">
              Start a Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio" className="btn-secondary w-full sm:w-auto justify-center flex items-center">
              See Our Work
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Services Preview Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">What We Offer</span>
            <h2 className="font-grotesk font-bold text-[#F0F0FF] text-3xl md:text-4xl mt-2">
              Engineered <span className="gradient-text">AI Capability</span>
            </h2>
            <p className="text-[#94A3B8] text-sm max-w-md mx-auto mt-3">
              We translate cutting-edge research into secure, production-ready systems that actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 mb-6">
                  <Bot size={24} />
                </div>
                <h3 className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-3">Autonomous Agents</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                  Ship chatbots and workflow agents in days, not months. Multi-agent systems with RAG, memory, and tool-use built in.
                </p>
              </div>
              <Link to="/services" className="text-violet-400 font-grotesk font-semibold text-xs flex items-center gap-1 hover:text-violet-300 transition-colors">
                Explore Agent Solutions <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 mb-6">
                  <BarChart3 size={24} />
                </div>
                <h3 className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-3">Predictive Analytics</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                  Turn your data into decisions before your competitors do. High-performance ML models for anomaly detection and forecasting.
                </p>
              </div>
              <Link to="/services" className="text-cyan-400 font-grotesk font-semibold text-xs flex items-center gap-1 hover:text-cyan-300 transition-colors">
                Explore Analytics Systems <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="glass-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 mb-6">
                  <Eye size={24} />
                </div>
                <h3 className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-3">Computer Vision</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                  Eyes for your machines. Defect detection, product classification, and safety inspection at production speed.
                </p>
              </div>
              <Link to="/services" className="text-violet-400 font-grotesk font-semibold text-xs flex items-center gap-1 hover:text-violet-300 transition-colors">
                Explore Vision Capabilities <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Metrics Section */}
      <MetricsSection />

      {/* Section divider */}
      <div className="section-divider" />

      {/* Testimonials Carousel Section */}
      <Testimonials />
    </div>
  );
};

export default Home;
