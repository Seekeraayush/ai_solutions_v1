const colors = {
  blue:    'bg-violet-500/15 text-violet-300 border border-violet-500/25',
  indigo:  'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25',
  emerald: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
  pink:    'bg-pink-500/15 text-pink-300 border border-pink-500/25',
  amber:   'bg-amber-500/15 text-amber-300 border border-amber-500/25',
  violet:  'bg-violet-500/15 text-violet-300 border border-violet-500/25',
};

const Badge = ({ children, color = 'blue' }) => (
  <span className={`inline-block text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${colors[color]}`}>
    {children}
  </span>
);

export default Badge;
