import Modal from '../ui/Modal';
import Badge from '../ui/Badge';

const InquiryDetailModal = ({ inquiry, onClose }) => (
  <Modal open={!!inquiry} onClose={onClose} title="Inquiry Details">
    {inquiry && (
      <div className="flex flex-col gap-5">
        <div>
          <Badge color="blue">Incoming Request</Badge>
          <h3 className="font-grotesk font-extrabold text-[#F0F0FF] text-xl mt-2">{inquiry.full_name}</h3>
          <p className="text-[#94A3B8] text-xs mt-0.5">
            {inquiry.job_title} at <span className="text-violet-400 font-semibold">{inquiry.company_name}</span>
            {inquiry.country && ` · ${inquiry.country}`}
          </p>
        </div>
        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-4 flex flex-col gap-3 text-xs">
          {[
            { label: 'Email',    value: inquiry.email },
            { label: 'Phone',    value: inquiry.phone_number || 'N/A' },
            { label: 'Received', value: new Date(inquiry.created_at).toLocaleString() },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between border-b border-white/[0.06] pb-2 last:border-0 last:pb-0">
              <span className="font-grotesk font-bold text-[#64748B] uppercase tracking-widest text-[10px]">{row.label}</span>
              <span className="font-semibold text-[#F0F0FF]">{row.value}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-grotesk font-bold text-[#64748B] uppercase tracking-widest mb-1.5">Project Description</p>
          <p className="text-[#94A3B8] text-xs leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap">
            {inquiry.job_details}
          </p>
        </div>
      </div>
    )}
  </Modal>
);

export default InquiryDetailModal;
