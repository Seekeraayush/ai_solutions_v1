import { Link } from 'react-router-dom';
import { Zap, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#07070F] border-t border-violet-500/20 pt-16 pb-8 px-6 mt-20 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-glow-sm">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-grotesk font-bold text-lg text-[#F0F0FF] tracking-tight">AI-Solutions</span>
          </Link>
          <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
            Engineering the future of AI-powered business. Production-grade systems for enterprises that refuse to stay average.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-grotesk font-semibold text-[#F0F0FF] text-sm mb-5 uppercase tracking-widest">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-[#94A3B8]">
            <li><Link to="/about" className="hover:text-violet-400 transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-violet-400 transition-colors">Our Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-violet-400 transition-colors">Portfolio</Link></li>
            <li><Link to="/gallery" className="hover:text-violet-400 transition-colors">Company Gallery</Link></li>
            <li><Link to="/events" className="hover:text-violet-400 transition-colors">Events</Link></li>
            <li><Link to="/blog" className="hover:text-violet-400 transition-colors">Insights Blog</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-grotesk font-semibold text-[#F0F0FF] text-sm mb-5 uppercase tracking-widest">
            Services
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-[#94A3B8]">
            <li><Link to="/services" className="hover:text-violet-400 transition-colors">AI Agents</Link></li>
            <li><Link to="/services" className="hover:text-violet-400 transition-colors">Predictive Analytics</Link></li>
            <li><Link to="/services" className="hover:text-violet-400 transition-colors">Computer Vision</Link></li>
            <li><Link to="/services" className="hover:text-violet-400 transition-colors">Data Pipelines</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-grotesk font-semibold text-[#F0F0FF] text-sm mb-5 uppercase tracking-widest">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-[#94A3B8]">
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-violet-400 shrink-0" />
              <span>partner@ai-solutions.io</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-violet-400 shrink-0" />
              <span>+977980123456</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto border-t border-violet-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-[#94A3B8]">
          © {new Date().getFullYear()} AI-Solutions Inc. All rights reserved.
        </span>
        <span className="text-xs text-[#94A3B8]">
          Built with ❤️ by AI-Solutions
        </span>
      </div>
    </footer>
  );
};

export default Footer;
