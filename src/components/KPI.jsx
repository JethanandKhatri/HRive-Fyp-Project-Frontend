export default function KPI({ label, value, sub }) {
  return (
    <div className="group relative p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-sky-50/0 to-sky-50/40 dark:from-sky-900/0 dark:to-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-800 dark:text-slate-100">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">{sub}</div>}
      <div className="mt-3 h-1.5 rounded-full bg-gradient-to-r from-sky-500/20 via-sky-400/30 to-sky-500/20 group-hover:from-sky-500/30 group-hover:to-sky-500/30 transition-colors" />
    </div>
  );
}

