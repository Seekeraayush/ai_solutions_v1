import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../constants/routes";
import {
  BarChart3,
  Mail,
  Image as ImageIcon,
  Calendar,
  Star,
  Sparkles,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import OverviewTab from "../components/admin/tabs/OverviewTab";
import InquiriesTab from "../components/admin/tabs/InquiriesTab";
import GalleryTab from "../components/admin/tabs/GalleryTab";
import EventsTab from "../components/admin/tabs/EventsTab";
import TestimonialsTab from "../components/admin/tabs/TestimonialsTab";

const TABS = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "inquiries", label: "Inquiries", icon: Mail },
  { key: "gallery", label: "Gallery", icon: ImageIcon },
  { key: "events", label: "Events", icon: Calendar },
  { key: "testimonials", label: "Testimonials", icon: Star },
];

const TAB_COMPONENTS = {
  overview: <OverviewTab />,
  inquiries: <InquiriesTab />,
  gallery: <GalleryTab />,
  events: <EventsTab />,
  testimonials: <TestimonialsTab />,
};

const AdminDashboard = () => {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate(ROUTES.ADMIN_LOGIN);
  }, [isAuthenticated, authLoading, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-outfit font-bold text-slate-900 text-lg tracking-tight">
              Admin Portal
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border border-red-200 text-red-600 text-xs font-semibold hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>

        {/* Mobile tab bar */}
        <div className="md:hidden overflow-x-auto flex gap-1 px-4 pb-2.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 bg-slate-100"
                }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {TAB_COMPONENTS[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
