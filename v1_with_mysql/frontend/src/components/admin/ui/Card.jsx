const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm ${className}`}>
    {children}
  </div>
);

export default Card;
