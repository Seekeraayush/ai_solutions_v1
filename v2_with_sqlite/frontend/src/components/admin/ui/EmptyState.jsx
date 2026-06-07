import { AlertCircle } from 'lucide-react';

const EmptyState = ({ label }) => (
  <div className="col-span-full py-14 flex flex-col items-center gap-2 text-[#475569]">
    <AlertCircle size={28} className="text-white/10" />
    <p className="text-xs">{label}</p>
  </div>
);

export default EmptyState;
