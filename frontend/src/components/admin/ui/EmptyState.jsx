import { AlertCircle } from 'lucide-react';

const EmptyState = ({ label }) => (
  <div className="col-span-full py-14 flex flex-col items-center gap-2 text-slate-400">
    <AlertCircle size={28} className="text-slate-300" />
    <p className="text-xs">{label}</p>
  </div>
);

export default EmptyState;
