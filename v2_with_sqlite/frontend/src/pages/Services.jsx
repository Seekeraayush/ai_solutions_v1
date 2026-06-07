import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, BarChart3, Eye, FileText, Database, Compass, Plus, Minus, ArrowRight } from 'lucide-react';

const servicesData = [
  {
    id: 1,
    title: 'Autonomous AI Agents',
    description: 'Ship chatbots and workflow agents in days, not months.',
    details: [
      'Multi-agent systems with LangGraph and AutoGen frameworks',
      'RAG pipelines that reference your documents, databases, and APIs without hallucination',
      'Integrates with Slack, Teams, CRM, and custom enterprise systems',
      'Built-in memory, tool-use, and structured output handling',
    ],
    icon: Bot,
    color: 'bg-violet-500/15 text-violet-400',
  },
  {
    id: 2,
    title: 'Predictive Analytics',
    description: 'Turn your data into decisions before your competitors do.',
    details: [
      'Time-series regression, classification, and anomaly detection',
      'XGBoost, LSTM, and transformer-based forecasting models',
      'Real-time telemetry monitoring with custom alert pipelines',
      'Load forecasting and predictive maintenance for industrial systems',
    ],
    icon: BarChart3,
    color: 'bg-cyan-500/15 text-cyan-400',
  },
  {
    id: 3,
    title: 'Computer Vision',
    description: 'Eyes for your machines. Defect detection, classification, inspection.',
    details: [
      'YOLO-based object detection and custom CNN architectures',
      'Real-time quality control for manufacturing assembly lines',
      'Product cataloging, safety equipment verification, and anomaly flagging',
      'Optimized inference for edge deployment or cloud scale',
    ],
    icon: Eye,
    color: 'bg-violet-500/15 text-violet-400',
  },
  {
    id: 4,
    title: 'Natural Language Processing',
    description: 'LLM-powered pipelines that actually understand context.',
    details: [
      'Named entity recognition for legal, financial, and logistics documents',
      'Automated contract parsing and ERP population workflows',
      'Fine-tuned domain-specific models for classification and extraction',
      'Structured output pipelines from messy unstructured text',
    ],
    icon: FileText,
    color: 'bg-cyan-500/15 text-cyan-400',
  },
  {
    id: 5,
    title: 'Data Engineering',
    description: 'Clean, structured, scalable pipelines from chaos to clarity.',
    details: [
      'ETL and ELT pipelines with Airflow, dbt, and custom orchestration',
      'Data lake and warehouse architecture on AWS, GCP, or Azure',
      'Real-time streaming ingestion with Kafka and Flink',
      'Schema validation, data quality monitoring, and alerting',
    ],
    icon: Database,
    color: 'bg-violet-500/15 text-violet-400',
  },
  {
    id: 6,
    title: 'AI Consulting',
    description: 'Strategic roadmapping from proof-of-concept to production.',
    details: [
      'Technical feasibility assessment for your AI use cases',
      'Architecture design and model selection for your constraints',
      'Build vs. buy analysis and vendor evaluation',
      'ML ops setup, monitoring, and model lifecycle management',
    ],
    icon: Compass,
    color: 'bg-cyan-500/15 text-cyan-400',
  },
];

const Services = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">Our Capabilities</span>
        <h1 className="font-grotesk font-bold text-[#F0F0FF] text-4xl md:text-5xl mt-2 tracking-tight">
          Services We <span className="gradient-text">Offer</span>
        </h1>
        <p className="text-[#94A3B8] text-base max-w-md mx-auto mt-3">
          Production-tier AI solutions, engineered to scale. No fluff — just systems that work.
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
              className="glass-card p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>

                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="p-1.5 rounded-full hover:bg-white/[0.06] text-[#94A3B8] hover:text-[#F0F0FF] cursor-pointer transition-colors"
                  >
                    {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </div>

                <h3 className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-3">
                  {service.title}
                </h3>

                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
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
                      <ul className="space-y-2 bg-violet-500/[0.05] border border-violet-500/20 rounded-xl p-4">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-[#94A3B8] text-xs leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-4 border-t border-white/[0.06] pt-4">
                <button
                  onClick={() => toggleExpand(service.id)}
                  className="text-xs text-[#94A3B8] hover:text-[#F0F0FF] font-grotesk font-medium flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isExpanded ? 'Show less' : 'Learn technical details'}
                </button>
                <Link
                  to="/contact"
                  className="text-violet-400 font-grotesk font-bold text-xs flex items-center gap-1 hover:text-violet-300 transition-colors"
                >
                  Request Integration <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,214,214,0.15) 100%)', border: '1px solid rgba(124,58,237,0.3)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent)] pointer-events-none" />
        <h2 className="font-grotesk font-bold text-[#F0F0FF] text-2xl md:text-3xl mb-4">
          Ready to Architect Your AI Solution?
        </h2>
        <p className="text-[#94A3B8] text-sm max-w-lg mx-auto mb-8">
          Get in touch with our advisory team to coordinate a technical feasibility assessment and receive a tailored implementation plan.
        </p>
        <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5">
          Schedule a Tech Audit <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Services;
