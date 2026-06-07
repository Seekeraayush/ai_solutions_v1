import Modal from '../ui/Modal';
import Badge from '../ui/Badge';

const InquiryDetailModal = ({ inquiry, onClose }) => (
  <Modal open={!!inquiry} onClose={onClose} title="Inquiry Details">
    {inquiry && (
      <div className="flex flex-col gap-5">
        <div>
          <Badge color="blue">Incoming Request</Badge>
          <h3 className="font-outfit font-extrabold text-slate-900 text-xl mt-2">{inquiry.full_name}</h3>
          <p className="text-slate-500 text-xs mt-0.5">
            {inquiry.job_title} at <span className="text-blue-600 font-semibold">{inquiry.company_name}</span>
            {inquiry.country && ` · ${inquiry.country}`}
          </p>
        </div>
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 flex flex-col gap-3 text-xs">
          {[
            { label: 'Email',    value: inquiry.email },
            { label: 'Phone',    value: inquiry.phone_number || 'N/A' },
            { label: 'Received', value: new Date(inquiry.created_at).toLocaleString() },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
              <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">{row.label}</span>
              <span className="font-semibold text-slate-700">{row.value}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Project Description</p>
          <p className="text-slate-600 text-xs leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap">
            {inquiry.job_details}
          </p>
        </div>
      </div>
    )}
  </Modal>
);

export default InquiryDetailModal;
