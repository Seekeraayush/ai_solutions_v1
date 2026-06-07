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
    description: 'An autonomous multi-agent advisor solving user inquiries using local product manuals.',
    client: 'Zenith Retail Group',
    tech: ['React', 'Django REST', 'LangChain', 'OpenAI'],
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Telemetry anomaly engine',
    category: 'analytics',
    categoryName: 'Analytics',
    description: 'A predictive monitoring dashboard identifying mechanical anomalies 48 hours before failure.',
    client: 'Bayerische Auto',
    tech: ['Python', 'XGBoost', 'Django', 'PyMySQL'],
    icon: ShieldAlert,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'InsightEye visual inspector',
    category: 'vision',
    categoryName: 'Computer Vision',
    description: 'A high-speed camera QC detector cataloging circuit board microfractures.',
    client: 'Innovate Electronics',
    tech: ['React', 'PyTorch', 'OpenCV', 'FastAPI'],
    icon: FileSearch,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'ContractSift PDF parser',
    category: 'agents',
    categoryName: 'AI Agents',
    description: 'Automated contract processing pipeline extracting legal parameters to structure ERP database rows.',
    client: 'Fintech Capital Inc',
    tech: ['Python', 'BERT', 'Django', 'PostgreSQL'],
    icon: HelpCircle,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
  },
];

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
        <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Successes</span>
        <h1 className="font-outfit font-extrabold text-navy-900 text-4xl md:text-5xl mt-1 tracking-tight">
          Client Portfolio
        </h1>
        <p className="text-navy-500 text-base max-w-md mx-auto mt-3">
          Explore production systems we have custom built and deployed.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {['all', 'agents', 'analytics', 'vision'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              filter === cat
                ? 'bg-primary text-white shadow-md shadow-blue-500/10'
                : 'bg-white text-navy-700 border border-navy-100 hover:bg-navy-50'
            }`}
          >
            {cat === 'all' ? 'All Systems' : cat === 'agents' ? 'AI Agents' : cat === 'analytics' ? 'Analytics' : 'Computer Vision'}
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
                className="glass-card rounded-3xl overflow-hidden border border-navy-100 hover:shadow-lg group transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image and Overlay container */}
                <div className="relative overflow-hidden aspect-video bg-navy-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-75"
                  />
                  
                  {/* Hover visual tag */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-navy-900 text-xs font-bold font-outfit shadow-sm">
                    {p.categoryName}
                  </div>

                  {/* Icon floating on right */}
                  <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                    <Icon size={18} />
                  </div>

                  {/* Action Link Overlay */}
                  <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white text-navy-950 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ArrowUpRight size={20} className="text-primary" />
                    </div>
                  </div>
                </div>

                {/* Details container */}
                <div className="p-6 text-left flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-xs text-navy-400 font-semibold mb-1 block">
                      Client: {p.client}
                    </span>
                    <h3 className="font-outfit font-bold text-navy-900 text-lg mb-2 group-hover:text-primary transition-colors cursor-pointer" onClick={() => handleProjectClick(p)}>
                      {p.title}
                    </h3>
                    <p className="text-navy-500 text-xs leading-relaxed mb-6">
                      {p.description}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 border-t border-navy-50 pt-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-navy-50 border border-navy-100 text-navy-600 rounded-md text-[10px] font-semibold"
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
