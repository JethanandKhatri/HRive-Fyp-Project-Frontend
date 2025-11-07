export default function PageHero({ title, subtitle, actions }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-gradient-to-r from-sky-600 via-sky-500 to-blue-500 text-white">
      <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 20%, rgba(255,255,255,.3) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,.2) 0, transparent 35%)'}}></div>
      <div className="relative p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold leading-tight">{title}</h2>
          {subtitle && (<p className="text-sm/5 mt-1 text-white/80 max-w-prose">{subtitle}</p>)}
        </div>
        {actions && (
          <div className="flex flex-wrap gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

