import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Bot, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricsSection from '../components/MetricsSection';
import ParticleBackground from '../components/ParticleBackground';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-6">
        <ParticleBackground />
        
        <div className="max-w-4xl mx-auto text-center z-10 flex flex-col items-center">
          {/* Social Proof Badge */}
         

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-outfit font-extrabold text-4xl sm:text-5xl md:text-6xl text-navy-900 leading-[1.1] mb-6 tracking-tight max-w-3xl"
          >
            Your Strategic Partner for <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI Digital Solutions</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-navy-500 text-base md:text-lg max-w-xl leading-relaxed mb-10"
          >
            Empowering enterprise organizations with custom autonomous agents, high-performance predictive analytics, and seamless full-stack implementations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-2 group w-full sm:w-auto justify-center">
              Book Free Consultation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="btn-secondary w-full sm:w-auto justify-center flex items-center">
              Our Journey
            </Link>
          </motion.div>
        </div>

        {/* Floating background graphic shapes */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-20 pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl -z-20 pointer-events-none" />
      </section>

      {/* Services Preview Grid */}
      <section className="py-24 px-6 bg-slate-50 relative border-t border-b border-navy-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">What We Offer</span>
            <h2 className="font-outfit font-extrabold text-navy-900 text-3xl md:text-4xl mt-1">
              Engineered AI Capability
            </h2>
            <p className="text-navy-500 text-sm max-w-md mx-auto mt-2">
              We translate cutting-edge research into secure, production-ready corporate systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl border border-navy-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-primary mb-6">
                  <Bot size={24} />
                </div>
                <h3 className="font-outfit font-bold text-navy-900 text-lg mb-3">Autonomous AI Agents</h3>
                <p className="text-navy-500 text-sm leading-relaxed mb-6">
                  Multi-agent conversational workflows configured for automated operations, customer support, and system monitoring.
                </p>
              </div>
              <Link to="/services" className="text-primary font-semibold text-xs flex items-center gap-1 hover:underline">
                Explore Agent Solutions <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Service 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl border border-navy-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-6">
                  <BarChart3 size={24} />
                </div>
                <h3 className="font-outfit font-bold text-navy-900 text-lg mb-3">Predictive Analytics</h3>
                <p className="text-navy-500 text-sm leading-relaxed mb-6">
                  High-performance machine learning models built for telemetry anomaly detection, predictive maintenance, and auditing.
                </p>
              </div>
              <Link to="/services" className="text-indigo-600 font-semibold text-xs flex items-center gap-1 hover:underline">
                Explore Analytics Systems <ArrowRight size={12} />
              </Link>
            </motion.div>

            {/* Service 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-3xl border border-navy-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-6">
                  <Shield size={24} />
                </div>
                <h3 className="font-outfit font-bold text-navy-900 text-lg mb-3">Computer Vision Systems</h3>
                <p className="text-navy-500 text-sm leading-relaxed mb-6">
                  Intelligent visual processing systems deployed for manufacturing quality control, design indexing, and safety analysis.
                </p>
              </div>
              <Link to="/services" className="text-emerald-600 font-semibold text-xs flex items-center gap-1 hover:underline">
                Explore Vision Capabilities <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <MetricsSection />

      {/* Testimonials Carousel Section */}
      <Testimonials />
    </div>
  );
};

export default Home;
