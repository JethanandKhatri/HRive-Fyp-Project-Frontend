import { NAV_ADMIN, NAV_HR, NAV_MANAGER, NAV_STAFF } from "../data/constants";

const Icon = ({ name }) => {
  const cls = "w-4 h-4";
  switch (name) {
    case "dashboard":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>);
    case "employees":
    case "team":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/><path d="M8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z"/><path d="M8 13c-2.67 0-8 1.34-8 4v3h10"/><path d="M16 13c2.67 0 8 1.34 8 4v3H12"/></svg>);
    case "addEmployee":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/><path d="M6 22v-2a4 4 0 014-4h0"/><path d="M19 21v-6"/><path d="M16 18h6"/></svg>);
    case "attendance":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);
    case "payroll":
    case "payslips":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6"/></svg>);
    case "cognitive":
    case "performance":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18"/><path d="M4 12h16"/><circle cx="12" cy="12" r="9"/></svg>);
    case "leaves":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C7 2 3 6 3 11c0 5 4 9 9 9s9-4 9-9C21 6 17 2 12 2z"/><path d="M8 13s1-3 4-3 4 3 4 3"/></svg>);
    case "askhr":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4z"/></svg>);
    case "profile":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0113 0"/></svg>);
    case "candidates":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 4h18v12H3z"/><path d="M7 20h10"/><path d="M9 16v4M15 16v4"/></svg>);
    default:
      return null;
  }
};

export default function SideNav({ current, setCurrent, role }) {
  const getNav = () => {
    if (role === "admin") return NAV_ADMIN;
    if (role === "hr") return NAV_HR;
    if (role === "manager") return NAV_MANAGER;
    return NAV_STAFF;
  };
  
  const nav = getNav();
  
  return (
    <div className="w-60 border-r border-slate-100 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm h-full p-3">
      {nav.map((n) => (
        <button
          key={n.key}
          onClick={() => setCurrent(n.key)}
          className={
            "w-full flex items-center gap-2 text-left px-3 py-2 rounded-xl mb-1 text-sm transition-colors " +
            (current === n.key
              ? "bg-gradient-to-r from-sky-50 to-sky-100 dark:from-sky-900/30 dark:to-sky-900/10 text-sky-700 dark:text-sky-300 border border-sky-200/70 dark:border-sky-800/60"
              : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-200")
          }
        >
          <span className={"inline-flex items-center justify-center w-6 h-6 rounded-md " + (current === n.key ? "bg-sky-500 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300") }>
            <Icon name={n.key} />
          </span>
          <span>{n.label}</span>
        </button>
      ))}
    </div>
  );
}

