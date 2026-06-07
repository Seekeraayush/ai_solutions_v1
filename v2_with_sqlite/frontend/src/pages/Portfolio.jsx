import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldAlert, FileSearch, HelpCircle, ArrowUpRight } from 'lucide-react';
import ContentModal from '../components/ContentModal';

const projects = [
  {
    id: 1,
    title: 'Zenith Customer Advisor Agent',
    category: 'agents',
    categoryName: 'AI Agents',
    description: 'An autonomous multi-agent advisor solving user inquiries using local product manuals and real-time inventory data.',
    client: 'Zenith Retail Group',
    tech: ['React', 'Django REST', 'LangChain', 'OpenAI'],
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Telemetry Anomaly Engine',
    category: 'analytics',
    categoryName: 'Analytics',
    description: 'A predictive monitoring dashboard identifying mechanical anomalies 48 hours before failure — deployed across 200+ sensors.',
    client: 'Bayerische Auto',
    tech: ['Python', 'XGBoost', 'Django', 'PyMySQL'],
    icon: ShieldAlert,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'InsightEye Visual Inspector',
    category: 'vision',
    categoryName: 'Computer Vision',
    description: 'A high-speed camera QC detector cataloging circuit board microfractures at 99.2% accuracy on production lines.',
    client: 'Innovate Electronics',
    tech: ['React', 'PyTorch', 'OpenCV', 'FastAPI'],
    icon: FileSearch,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'ContractSift PDF Parser',
    category: 'agents',
    categoryName: 'AI Agents',
    description: 'Automated contract processing pipeline extracting legal parameters to structure ERP database rows — 10x faster than manual review.',
    client: 'Fintech Capital Inc',
    tech: ['Python', 'BERT', 'Django', 'PostgreSQL'],
    icon: HelpCircle,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
  },
];

const FILTER_LABELS = {
  all: 'All Systems',
  agents: 'AI Agents',
  analytics: 'Analytics',
  vision: 'Computer Vision',
};

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    const filtered = filteredProjects;
    const currentIndex = filtered.findIndex((p) => p.id === selectedProject?.id);
    if (currentIndex < filtered.length - 1) {
      setSelectedProject(filtered[currentIndex + 1]);
    }
  };

  const handlePrevProject = () => {
    const filtered = filteredProjects;
    const currentIndex = filtered.findIndex((p) => p.id === selectedProject?.id);
    if (currentIndex > 0) {
      setSelectedProject(filtered[currentIndex - 1]);
    }
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">Our Successes</span>
        <h1 className="font-grotesk font-bold text-[#F0F0FF] text-4xl md:text-5xl mt-2 tracking-tight">
          Client <span className="gradient-text">Portfolio</span>
        </h1>
        <p className="text-[#94A3B8] text-base max-w-md mx-auto mt-3">
          Production systems we have custom-built and deployed for enterprise clients worldwide.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {Object.entries(FILTER_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-5 py-2 rounded-full text-xs font-grotesk font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filter === key
                ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-glow-sm'
                : 'bg-white/[0.05] text-[#94A3B8] border border-white/10 hover:border-violet-500/40 hover:text-[#F0F0FF]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Gradient top border accent */}
                <div className="h-px bg-gradient-to-r from-violet-500 to-cyan-400 opacity-60" />

                {/* Image */}
                <div className="relative overflow-hidden aspect-video bg-[#07070F]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-60"
                  />

                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-violet-500/20 backdrop-blur-sm rounded-full text-violet-300 text-xs font-grotesk font-bold border border-violet-500/30">
                    {p.categoryName}
                  </div>

                  <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-white flex items-center justify-center shadow-glow-sm">
                    <Icon size={18} />
                  </div>

                  <div className="absolute inset-0 bg-[#07070F]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ArrowUpRight size={20} className="text-violet-300" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 text-left flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs text-[#94A3B8] font-grotesk font-semibold mb-1 block">
                      Client: {p.client}
                    </span>
                    <h3
                      className="font-grotesk font-bold text-[#F0F0FF] text-lg mb-2 group-hover:text-violet-300 transition-colors cursor-pointer"
                      onClick={() => handleProjectClick(p)}
                    >
                      {p.title}
                    </h3>
                    <p className="text-[#94A3B8] text-xs leading-relaxed mb-6">
                      {p.description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-md text-[10px] font-grotesk font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Content Modal */}
      <ContentModal
        isOpen={isModalOpen}
        item={selectedProject}
        onClose={handleCloseModal}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
        type="portfolio"
        totalItems={filteredProjects.length}
        currentIndex={selectedProject ? filteredProjects.findIndex((p) => p.id === selectedProject.id) : 0}
      />
    </div>
  );
};

export default Portfolio;
