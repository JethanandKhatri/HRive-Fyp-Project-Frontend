import { useState } from "react";
import { BRAND } from "../data/constants";

const RoleIcon = ({ name }) => {
  const cls = "w-4 h-4";
  switch (name) {
    case "Admin":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l7 4v5c0 5-3 9-7 11-4-2-7-6-7-11V6l7-4z"/></svg>);
    case "HR":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0113 0"/></svg>);
    case "Manager":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 4h18v12H3z"/><path d="M7 20h10"/><path d="M9 16v4M15 16v4"/></svg>);
    case "Staff":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/><path d="M8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z"/></svg>);
    default:
      return null;
  }
};

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState("");

  const quickUsers = [
    { label: "Admin", id: "A-0001", hint: "Full access" },
    { label: "HR", id: "E-1004", hint: "HR Portal" },
    { label: "Manager", id: "M-2001", hint: "Manager Portal" },
    { label: "Staff", id: "E-1001", hint: "Employee Portal" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId.trim()) return;
    onLogin?.(userId.trim());
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-sky-50 dark:from-slate-900 dark:to-slate-900">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative p-4 sm:p-6 grid place-items-center">
        <div className="w-full max-w-lg space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3 justify-center">
            <div className="w-10 h-10 rounded-xl shadow-inner" style={{ background: BRAND.primary }} />
            <div className="text-center">
              <div className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{BRAND.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{BRAND.tagline}</div>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-5 sm:p-6 shadow-md">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">Sign in</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Choose a role to explore dashboards, or enter a user ID.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {quickUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => onLogin?.(u.id)}
                  className="px-3 py-2 rounded-xl border border-slate-200/70 dark:border-slate-600/70 bg-white/70 dark:bg-slate-700/40 hover:bg-sky-50/80 dark:hover:bg-slate-700/60 text-left transition shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200">
                      <RoleIcon name={u.label} />
                    </span>
                    <div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{u.label}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{u.id} • {u.hint}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <label className="block text-xs text-slate-500 dark:text-slate-400">Enter User ID</label>
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="e.g., A-0001, E-1004, M-2001"
                className="w-full h-11 px-3 rounded-xl bg-slate-50/90 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-400/40 placeholder:text-slate-400 dark:placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 shadow"
              >
                Continue
              </button>
            </form>
          </div>

          <div className="text-center text-[11px] text-slate-400 dark:text-slate-500">
            Demo login only • No password required
          </div>
        </div>
      </div>
    </div>
  );
}

