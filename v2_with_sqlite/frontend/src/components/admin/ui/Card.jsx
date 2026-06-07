const Card = ({ children, className = '' }) => (
  <div className={`bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-violet-500/30 transition-colors ${className}`}>
    {children}
  </div>
);

export default Card;
