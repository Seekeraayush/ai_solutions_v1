import React from "react";
import { Link } from "react-router-dom";
import { Cpu, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-950 text-white pt-16 pb-8 px-6 mt-20 relative overflow-hidden border-t border-navy-900">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <Cpu size={18} />
            </div>
            <span className="font-outfit font-extrabold text-white text-lg tracking-tight">
              AI<span className="text-primary">-Solutions</span>
            </span>
          </Link>
          <p className="text-navy-300 text-sm leading-relaxed max-w-xs">
            Deploying intelligent workflows, scalable architectures, and custom
            digital agents for the world's most innovative enterprises.
          </p>
        </div>

        {/* Navigation columns */}
        <div>
          <h4 className="font-outfit font-semibold text-white text-base mb-5">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-navy-300">
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-primary transition-colors"
              >
                Our Services
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className="hover:text-primary transition-colors"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="hover:text-primary transition-colors"
              >
                Company Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="hover:text-primary transition-colors"
              >
                Events
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-primary transition-colors">
                Insights Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <h4 className="font-outfit font-semibold text-white text-base mb-5">
            Contact Details
          </h4>
          <ul className="flex flex-col gap-3 text-sm text-navy-300">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-primary shrink-0" />
              <span>partner@ai-solutions.io</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-primary shrink-0" />
              <span>+977980123456</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-primary shrink-0" />
              <span>AI-Solutions Inc., Sanepa, Lalitpur, Nepal</span>
            </li>
          </ul>
        </div>

        {/* Newsletter column */}
        <div>
          <h4 className="font-outfit font-semibold text-white text-base mb-5">
            About AI-Solutions
          </h4>
          <p className="text-navy-300 text-sm leading-relaxed max-w-xs">
            We specialize in crafting cutting-edge AI solutions that transform
            businesses. From intelligent automation to advanced data analytics,
            we empower organizations with technology that drives growth and
            innovation.
          </p>
        </div>
      </div>

      {/* Lower Footer */}
      <div className="max-w-6xl mx-auto border-t border-navy-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs text-navy-500">
          © {new Date().getFullYear()} AI-Solutions Inc. All rights reserved.
        </span>
        <div className="flex gap-6 text-xs text-navy-500">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Security Audit Report
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
