import { motion } from 'framer-motion';
import { Search, Eye, Trash2, Loader2 } from 'lucide-react';
import { useInquiries } from '../../../hooks/useInquiries';
import Card from '../ui/Card';
import InquiryDetailModal from '../modals/InquiryDetailModal';

const InquiriesTab = () => {
  const {
    filteredInquiries, loading, search, setSearch,
    selectedInquiry, setSelectedInquiry, handleDelete,
  } = useInquiries();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-[#94A3B8]">
        <Loader2 size={28} className="animate-spin text-violet-400" />
        <p className="text-xs font-grotesk font-semibold uppercase tracking-widest">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <Card>
        <div className="px-6 py-4 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-grotesk font-bold text-[#F0F0FF] text-base">Inquiries Log</h2>
            <p className="text-[#94A3B8] text-xs mt-0.5">
              {filteredInquiries.length} record{filteredInquiries.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2 w-full sm:w-64 focus-within:border-violet-500/40 transition-colors">
            <Search size={13} className="text-[#94A3B8] shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search inquiries…"
              className="bg-transparent text-xs text-[#F0F0FF] outline-none placeholder-[#475569] w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-white/[0.03] text-[#64748B] font-grotesk font-bold uppercase tracking-widest text-[10px] border-b border-white/[0.06]">
                {['Name', 'Company', 'Job Title', 'Country', 'Received', 'Actions'].map(h => (
                  <th key={h} className="py-3.5 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-[#94A3B8]">
                    No inquiries match your search.
                  </td>
                </tr>
              ) : filteredInquiries.map(inc => (
                <motion.tr
                  key={inc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-3.5 px-5 font-grotesk font-bold text-[#F0F0FF]">{inc.full_name}</td>
                  <td className="py-3.5 px-5 text-[#94A3B8]">{inc.company_name}</td>
                  <td className="py-3.5 px-5 text-[#94A3B8]">{inc.job_title || 'N/A'}</td>
                  <td className="py-3.5 px-5 text-[#94A3B8]">{inc.country || 'N/A'}</td>
                  <td className="py-3.5 px-5 text-[#94A3B8]">{new Date(inc.created_at).toLocaleDateString()}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex gap-1.5 justify-start">
                      <button
                        onClick={() => setSelectedInquiry(inc)}
                        className="p-1.5 bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 rounded-lg transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(inc.id)}
                        className="p-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <InquiryDetailModal inquiry={selectedInquiry} onClose={() => setSelectedInquiry(null)} />
    </>
  );
};

export default InquiriesTab;
