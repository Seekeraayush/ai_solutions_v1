import { Upload, Loader2 } from 'lucide-react';

export const inputCls = 'w-full bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-[#F0F0FF] outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/20 transition placeholder-[#475569]';

export const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest font-grotesk">{label}</label>
    {children}
  </div>
);

export const SubmitBtn = ({ loading, label }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-glow-sm text-white text-sm font-grotesk font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
  >
    {loading ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : label}
  </button>
);

export const FilePicker = ({ file, onChange }) => (
  <label className="flex items-center gap-3 border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-violet-500/5 rounded-xl p-4 cursor-pointer transition-colors">
    <Upload size={18} className="text-[#94A3B8] shrink-0" />
    <span className="text-xs text-[#94A3B8] truncate">
      {file ? file.name : 'Click to select image (PNG / JPG / WEBP)'}
    </span>
    <input type="file" accept="image/*" onChange={e => onChange(e.target.files[0])} className="hidden" />
  </label>
);
