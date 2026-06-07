import { Upload, Loader2 } from 'lucide-react';

export const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition placeholder-slate-400';

export const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

export const SubmitBtn = ({ loading, label }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
  >
    {loading ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : label}
  </button>
);

export const FilePicker = ({ file, onChange }) => (
  <label className="flex items-center gap-3 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 rounded-2xl p-4 cursor-pointer transition-colors">
    <Upload size={18} className="text-slate-400 shrink-0" />
    <span className="text-xs text-slate-500 truncate">
      {file ? file.name : 'Click to select image (PNG / JPG / WEBP)'}
    </span>
    <input type="file" accept="image/*" onChange={e => onChange(e.target.files[0])} className="hidden" />
  </label>
);
