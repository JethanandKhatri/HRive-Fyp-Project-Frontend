export default function Table({ columns, rows }) {
  return (
    <div className="w-full">
      {/* Desktop/tablet table */}
      <div className="hidden md:block overflow-auto rounded-xl border border-slate-100 dark:border-slate-700">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50/60 dark:bg-slate-700/40 sticky top-0 backdrop-blur-sm">
            <tr className="text-left text-slate-500 dark:text-slate-300">
              {columns.map((c) => (
                <th key={c.key} className="py-2 px-3 font-medium">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-100">
            {rows.map((r, i) => (
              <tr key={i} className={(i % 2 === 0 ? "bg-white/60 dark:bg-slate-800/40" : "") + " border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"}>
                {columns.map((c) => (
                  <td key={c.key} className="py-2 px-3">
                    {typeof c.render === "function" ? c.render(r[c.key], r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="md:hidden space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 shadow-sm">
            <div className="grid grid-cols-1 gap-2">
              {columns.map((c) => (
                <div key={c.key} className="flex items-start justify-between gap-3 text-sm">
                  <div className="min-w-[5.5rem] sm:min-w-[7rem] text-slate-500 dark:text-slate-400">{c.label}</div>
                  <div className="font-medium text-slate-700 dark:text-slate-100 break-words">
                    {typeof c.render === "function" ? c.render(r[c.key], r) : r[c.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

