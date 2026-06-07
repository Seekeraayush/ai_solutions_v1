import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Mail,
  Image as ImageIcon,
  Calendar,
  Zap,
  Star,
  CheckCircle2,
  Eye,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useOverview } from "../../../hooks/useOverview";
import Card from "../ui/Card";
import InquiryDetailModal from "../modals/InquiryDetailModal";

const STAT_CARDS = [
  {
    label: "Total Inquiries",
    key: "total_inquiries",
    icon: Mail,
    ring: "bg-blue-50 text-blue-600",
  },
  {
    label: "Gallery Items",
    key: "total_gallery_items",
    icon: ImageIcon,
    ring: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Events",
    key: "total_events",
    icon: Calendar,
    ring: "bg-pink-50 text-pink-600",
  },
  {
    label: "Testimonials",
    key: "total_testimonials",
    icon: Star,
    ring: "bg-violet-50 text-violet-600",
  },
];

const OverviewTab = () => {
  const { stats, loading } = useOverview();
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
        <Loader2 size={28} className="animate-spin text-blue-500" />
        <p className="text-xs font-semibold uppercase tracking-widest">
          Loading…
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {STAT_CARDS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Card className="p-5 flex flex-col gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.ring}`}
                >
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                    {s.label}
                  </p>
                  {s.isStatus ? (
                    <p className="font-outfit font-bold text-emerald-600 text-sm flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                      Live
                    </p>
                  ) : (
                    <p className="font-outfit font-extrabold text-slate-900 text-2xl">
                      {stats[s.key] ?? 0}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Chart + Recent Inquiries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2">
          <h3 className="font-outfit font-bold text-slate-900 text-sm mb-0.5">
            Inquiry Activity — Last 7 Days
          </h3>
          <p className="text-slate-400 text-xs mb-5">
            Submission volume by day.
          </p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.inquiry_trend || []}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E2E8F0"
                />
                <XAxis
                  dataKey="date"
                  stroke="#94A3B8"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #E2E8F0",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Inquiries"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fill="url(#grad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-outfit font-bold text-slate-900 text-sm mb-0.5">
            Recent Inquiries
          </h3>
          <p className="text-slate-400 text-xs mb-4">
            Latest incoming client requests.
          </p>
          <div className="flex flex-col gap-2.5">
            {(stats.recent_inquiries || []).length === 0 ? (
              <p className="text-slate-400 text-xs py-6 text-center">
                No inquiries yet.
              </p>
            ) : (
              (stats.recent_inquiries || []).map((inc) => (
                <div
                  key={inc.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="overflow-hidden mr-2">
                    <p className="font-outfit font-bold text-slate-900 text-xs truncate">
                      {inc.full_name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">
                      {inc.company_name} · {inc.country}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(inc)}
                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    <Eye size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <InquiryDetailModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
      />
    </div>
  );
};

export default OverviewTab;
