const colors = {
  blue:    'bg-blue-50 text-blue-600',
  indigo:  'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  pink:    'bg-pink-50 text-pink-600',
  amber:   'bg-amber-50 text-amber-600',
  violet:  'bg-violet-50 text-violet-600',
};

const Badge = ({ children, color = 'blue' }) => (
  <span className={`inline-block text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${colors[color]}`}>
    {children}
  </span>
);

export default Badge;
