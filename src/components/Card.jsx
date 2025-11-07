export default function Card({ title, children, right }) {
  return (
    <div className="rounded-2xl p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-100">{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

