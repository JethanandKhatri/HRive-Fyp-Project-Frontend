import { BRAND, ROLE_HIERARCHY } from "../data/constants";
import { getUserInfo } from "../utils/roleUtils";

export default function TopBar({ onSearch, dark, setDark, onMenuToggle, role, currentUser, onLogout }) {
  const userInfo = getUserInfo(currentUser) || { name: "User", dept: "" };
  const roleLabel = ROLE_HIERARCHY[role]?.label || "Portal";
  
  const getPlaceholder = () => {
    if (role === "admin" || role === "hr") return "AskHR: e.g., 'Show Oct 2025 payroll for Engineering'";
    if (role === "manager") return "Search team members...";
    return "AskHR: e.g., 'Show my leave balance'";
  };
  
  return (
    <div className="sticky top-0 z-30 h-14 flex items-center justify-between px-4 border-b border-slate-200/60 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuToggle}
          className="md:hidden mr-1 inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-100"
          aria-label="Open navigation"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="w-8 h-8 rounded-xl shadow-inner" style={{ background: BRAND.primary }} />
        <div className="leading-tight">
          <div className="font-semibold text-slate-800 dark:text-slate-100">{BRAND.name}</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">{BRAND.tagline}</div>
        </div>
      </div>
      <div className="flex-1 max-w-xl mx-2 sm:mx-4">
        {/* Hide full search on very small screens to avoid crowding */}
        <div className="relative hidden sm:block">
          <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full h-9 pl-8 pr-3 rounded-xl bg-slate-50/80 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-400/40 placeholder:text-slate-400 dark:placeholder:text-slate-400"
            placeholder={getPlaceholder()}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-700/80 text-slate-600" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        {/* Mobile logout icon */}
        <button
          onClick={onLogout}
          className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-700/80 text-slate-600"
          aria-label="Logout"
          title="Sign out"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
        </button>
        <div className="hidden sm:block px-3 py-1 rounded-xl text-xs border border-slate-200 dark:border-slate-600 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 font-medium">
          {roleLabel}
        </div>
        <button
          onClick={() => setDark?.(!dark)}
          className="h-9 px-3 rounded-xl text-sm border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-100"
          title="Toggle theme"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
        <button
          onClick={onLogout}
          className="hidden sm:inline-flex h-9 px-3 rounded-xl text-sm border border-slate-200 dark:border-slate-600 bg-white/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-100"
          title="Sign out"
        >
          Logout
        </button>
        <span className="hidden sm:inline text-sm text-slate-500 dark:text-slate-300">{userInfo.name}</span>
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600" />
      </div>
    </div>
  );
}

