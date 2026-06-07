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

const inputCls = 'w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#F0F0FF] outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition placeholder-[#475569]';
const labelCls = 'text-[#94A3B8] font-grotesk text-xs uppercase tracking-widest font-semibold';

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
    <div className="pt-28 pb-16 px-6 max-w-3xl mx-auto relative dot-grid min-h-screen">

      {/* Glow orb */}
      <div className="glow-orb w-[400px] h-[400px] bg-violet-600/15 top-0 left-1/2 -translate-x-1/2" />

      {/* Page Header */}
      <div className="text-center mb-12 relative z-10">
        <span className="text-violet-400 font-grotesk text-xs font-semibold uppercase tracking-widest">Partner with Us</span>
        <h1 className="font-grotesk font-bold text-[#F0F0FF] text-4xl md:text-5xl mt-2 tracking-tight">
          Let's Build Something <span className="gradient-text">Exceptional</span>
        </h1>
        <p className="text-[#94A3B8] text-base max-w-md mx-auto mt-3">
          Tell us about your project. We'll respond within 24 hours.
        </p>
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-10 rounded-2xl relative z-10 hover:border-violet-500/30 hover:shadow-glow"
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="full_name" className={labelCls}>
                Full Name <span className="text-violet-400">*</span>
              </label>
              <input
                type="text" id="full_name" name="full_name"
                value={formData.full_name} onChange={handleChange}
                placeholder="e.g. Bob Smith"
                className={inputCls}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelCls}>
                Email Address <span className="text-violet-400">*</span>
              </label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                placeholder="e.g. bob@innovate.io"
                className={inputCls}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone_number" className={labelCls}>
                Phone Number
              </label>
              <input
                type="tel" id="phone_number" name="phone_number"
                value={formData.phone_number} onChange={handleChange}
                placeholder="e.g. +977980123456"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="company_name" className={labelCls}>
                Company Name <span className="text-violet-400">*</span>
              </label>
              <input
                type="text" id="company_name" name="company_name"
                value={formData.company_name} onChange={handleChange}
                placeholder="e.g. Innovate LLC"
                className={inputCls}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="country" className={labelCls}>
                Country
              </label>
              <input
                type="text" id="country" name="country"
                value={formData.country} onChange={handleChange}
                placeholder="e.g. Nepal"
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="job_title" className={labelCls}>
                Job Title
              </label>
              <input
                type="text" id="job_title" name="job_title"
                value={formData.job_title} onChange={handleChange}
                placeholder="e.g. VP of AI Strategy"
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="job_details" className={labelCls}>
              Project Requirements & Details <span className="text-violet-400">*</span>
            </label>
            <textarea
              id="job_details" name="job_details"
              value={formData.job_details} onChange={handleChange}
              rows={4}
              placeholder="Please describe the machine learning workflows, chatbot capabilities, or visual models you require..."
              className={`${inputCls} resize-none`}
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
