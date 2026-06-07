import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';

const EMPTY_FORM = {
  full_name: '',
  email: '',
  phone_number: '',
  company_name: '',
  country: '',
  job_title: '',
  job_details: '',
};

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.full_name || !formData.email || !formData.company_name || !formData.job_details) {
      toast.error('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    try {
      await api.post('inquiries/', formData);
      toast.success('Your inquiry has been submitted! An AI consultant will review your request shortly.');
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error('Submission error:', error);
      const errMsg = error.response?.data
        ? Object.values(error.response.data).join(' ')
        : 'An unexpected error occurred. Please try again.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto relative">

      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-1.5">
          Partner with Us
        </span>
        <h1 className="font-outfit font-extrabold text-navy-900 text-4xl md:text-5xl mt-1 tracking-tight">
          Book Consultation
        </h1>
        <p className="text-navy-500 text-base max-w-md mx-auto mt-3">
          Coordinate an engineering audit of your workflows with our AI advisors.
        </p>
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-10 rounded-3xl border border-navy-100 shadow-xl shadow-navy-950/5 relative overflow-hidden bg-white/70"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="full_name" className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                type="text" id="full_name" name="full_name"
                value={formData.full_name} onChange={handleChange}
                placeholder="e.g. Bob Smith"
                className="w-full bg-white/50 border border-navy-150 rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                placeholder="e.g. bob@innovate.io"
                className="w-full bg-white/50 border border-navy-150 rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone_number" className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Phone Number
              </label>
              <input
                type="tel" id="phone_number" name="phone_number"
                value={formData.phone_number} onChange={handleChange}
                placeholder="e.g. +977980123456"
                className="w-full bg-white/50 border border-navy-150 rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="company_name" className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Company Name <span className="text-primary">*</span>
              </label>
              <input
                type="text" id="company_name" name="company_name"
                value={formData.company_name} onChange={handleChange}
                placeholder="e.g. Innovate LLC"
                className="w-full bg-white/50 border border-navy-150 rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="country" className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Country
              </label>
              <input
                type="text" id="country" name="country"
                value={formData.country} onChange={handleChange}
                placeholder="e.g. Nepal"
                className="w-full bg-white/50 border border-navy-150 rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="job_title" className="text-xs font-bold text-navy-800 uppercase tracking-wider">
                Job Title
              </label>
              <input
                type="text" id="job_title" name="job_title"
                value={formData.job_title} onChange={handleChange}
                placeholder="e.g. VP of AI Strategy"
                className="w-full bg-white/50 border border-navy-150 rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-primary focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="job_details" className="text-xs font-bold text-navy-800 uppercase tracking-wider">
              Project Requirements & Details <span className="text-primary">*</span>
            </label>
            <textarea
              id="job_details" name="job_details"
              value={formData.job_details} onChange={handleChange}
              rows={4}
              placeholder="Please describe the machine learning workflows, chatbot capabilities, or visual models you require..."
              className="w-full bg-white/50 border border-navy-150 rounded-xl px-4 py-3 text-sm text-navy-900 outline-none focus:border-primary focus:bg-white transition-all resize-none shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-4 flex items-center justify-center gap-2 w-full py-4 text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="animate-spin" size={20} /> Submitting Inquiry...</>
            ) : (
              <><Send size={18} /> Submit Inquiry Request</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
