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
      <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
        <Loader2 size={28} className="animate-spin text-blue-500" />
        <p className="text-xs font-semibold uppercase tracking-widest">Loading…</p>
      </div>
    );
  }

  return (
    <>
      <Card>
        <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-outfit font-bold text-slate-900 text-base">Inquiries Log</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              {filteredInquiries.length} record{filteredInquiries.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 w-full sm:w-64 focus-within:border-blue-400 transition-colors">
            <Search size={13} className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search inquiries…"
              className="bg-transparent text-xs text-slate-900 outline-none placeholder-slate-400 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-slate-100">
                {['Name', 'Company', 'Job Title', 'Country', 'Received', 'Actions'].map(h => (
                  <th key={h} className="py-3.5 px-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-14 text-center text-slate-400">
                    No inquiries match your search.
                  </td>
                </tr>
              ) : filteredInquiries.map(inc => (
                <motion.tr
                  key={inc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-3.5 px-5 font-outfit font-bold text-slate-900">{inc.full_name}</td>
                  <td className="py-3.5 px-5 text-slate-600">{inc.company_name}</td>
                  <td className="py-3.5 px-5 text-slate-600">{inc.job_title || 'N/A'}</td>
                  <td className="py-3.5 px-5 text-slate-600">{inc.country || 'N/A'}</td>
                  <td className="py-3.5 px-5 text-slate-500">{new Date(inc.created_at).toLocaleDateString()}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex gap-1.5 justify-start">
                      <button
                        onClick={() => setSelectedInquiry(inc)}
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(inc.id)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors cursor-pointer"
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
