import { Plus } from 'lucide-react';

const SectionHeader = ({ title, sub, onAdd, addLabel }) => (
  <div className="flex items-center justify-between">
    <div>
      <h2 className="font-grotesk font-bold text-[#F0F0FF] text-lg">{title}</h2>
      <p className="text-[#94A3B8] text-xs mt-0.5">{sub}</p>
    </div>
    <button
      onClick={onAdd}
      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-glow-sm text-white text-xs font-grotesk font-semibold rounded-xl transition-all cursor-pointer"
    >
      <Plus size={14} /> {addLabel}
    </button>
  </div>
);

export default SectionHeader;
