import { Plus } from 'lucide-react';

const SectionHeader = ({ title, sub, onAdd, addLabel }) => (
  <div className="flex items-center justify-between">
    <div>
      <h2 className="font-outfit font-bold text-slate-900 text-lg">{title}</h2>
      <p className="text-slate-400 text-xs mt-0.5">{sub}</p>
    </div>
    <button
      onClick={onAdd}
      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-sm"
    >
      <Plus size={14} /> {addLabel}
    </button>
  </div>
);

export default SectionHeader;
