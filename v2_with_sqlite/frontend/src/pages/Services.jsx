import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, BarChart3, Shield, FileText, Cpu, Layout, Plus, Minus, ArrowRight } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: 'Autonomous AI Agents',
    description: 'Custom autonomous agent systems designed for support desks, multi-system data coordination, and active operations monitoring.',
    details: 'Our agents integrate with Slack, Microsoft Teams, and custom CRM systems. Built using robust LangGraph or AutoGen frameworks, they utilize retrieval augmented generation (RAG) to reference local documents, databases, and APIs without hallucination.',
    icon: Bot,
    color: 'bg-blue-500/10 text-primary',
  },
  {
    id: 2,
    title: 'Predictive Data Analytics',
    description: 'Machine learning systems for real-time telemetry anomaly detection, load forecasting, and industrial predictive maintenance.',
    details: 'Deploying high-speed time-series regression and classification algorithms (XGBoost, LSTM, transformers) to forecast pipeline capacity bottlenecks and detect sensor degradation before mechanical failure occurs.',
    icon: BarChart3,
    color: 'bg-indigo-500/10 text-indigo-600',
  },
  {
    id: 3,
    title: 'Computer Vision Pipelines',
    description: 'Intelligent visual inspectors optimized for assembly line QC, catalog labeling, and security compliance.',
    details: 'Utilizing YOLO-based object detection and custom convolutional neural network (CNN) architectures to categorize products, detect structural defects, and verify protective equipment usage in real-time.',
    icon: Shield,
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    id: 4,
    title: 'NLP Document Extractors',
    description: 'Automated document processing pipelines to ingest, validate, and structure text from messy corporate files.',
    details: 'Extract and structure key terms from legal contracts, financial ledgers, and shipping manifests. Uses NER models to populate enterprise databases and trigger downstream ERP workflows.',
    icon: FileText,
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    id: 5,
    title: 'Reinforcement Simulators',
    description: 'Action-planning simulator environments to train defensive agents in cyber incident responses.',
    details: 'Constructing custom gymnasium-based environments. Defensive AI agents learn network traffic rerouting and firewall rule activation strategies during mock intrusion attacks.',
    icon: Cpu,
    color: 'bg-pink-500/10 text-pink-600',
  },
  {
    id: 6,
    title: 'Full-Stack SaaS Dashboards',
    description: 'Sleek visual telemetry panels and databases integrating client AI endpoints into responsive UIs.',
    details: 'Beautiful React dashboards constructed with Recharts and Tailwind CSS, backed by high-performance Django REST endpoints. Full support for JWT auth, file uploads, and role permission sets.',
    icon: Layout,
    color: 'bg-violet-500/10 text-violet-600',
  },
];

const Services = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  return (
    <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Capabilities</span>
        <h1 className="font-outfit font-extrabold text-navy-900 text-4xl md:text-5xl mt-1 tracking-tight">
          Services We Offer
        </h1>
        <p className="text-navy-500 text-base max-w-md mx-auto mt-3">
          Explore our professional-tier AI solutions, engineered to scale.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {servicesData.map((service) => {
          const Icon = service.icon;
          const isExpanded = expandedCard === service.id;
          
          return (
            <motion.div
              layout
              key={service.id}
              className="glass-card p-8 rounded-3xl border border-navy-100/60 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                  
                  {/* Expand Toggle Button */}
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="p-1.5 rounded-full hover:bg-navy-50 text-navy-400 hover:text-navy-900 cursor-pointer transition-colors"
                  >
                    {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </div>

                <h3 className="font-outfit font-bold text-navy-900 text-lg mb-3">
                  {service.title}
                </h3>
                
                <p className="text-navy-500 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mb-6"
                    >
                      <p className="text-navy-600 text-xs leading-relaxed bg-navy-50/50 p-4 rounded-2xl border border-navy-100">
                        {service.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-4 border-t border-navy-50 pt-4">
                <button
                  onClick={() => toggleExpand(service.id)}
                  className="text-xs text-navy-500 hover:text-navy-950 font-medium flex items-center gap-1 cursor-pointer"
                >
                  {isExpanded ? 'Show less' : 'Learn technical details'}
                </button>
                <Link
                  to="/contact"
                  className="text-primary font-bold text-xs flex items-center gap-1 hover:underline"
                >
                  Request Integration <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Consultation Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl shadow-blue-500/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        <h2 className="font-outfit font-extrabold text-2xl md:text-3xl mb-4">
          Ready to Architect Your AI Solution?
        </h2>
        <p className="text-blue-100 text-sm max-w-lg mx-auto mb-8">
          Get in touch with our advisory team to coordinate a technical feasibility assessment and receive a tailored implementation plan.
        </p>
        <Link to="/contact" className="btn-secondary bg-white hover:bg-blue-50 text-primary border-none shadow-lg px-8 py-3.5 inline-block">
          Schedule Tech Audit
        </Link>
      </motion.div>
    </div>
  );
};

export default Services;
