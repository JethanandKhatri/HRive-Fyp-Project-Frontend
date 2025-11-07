import { NAV_ADMIN, NAV_HR, NAV_MANAGER, NAV_STAFF } from "../data/constants";

const Icon = ({ name, active }) => {
  const cls = "w-5 h-5";
  const stroke = active ? "currentColor" : "currentColor";
  switch (name) {
    case "dashboard":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>);
    case "employees":
    case "team":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z"/><path d="M8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z"/><path d="M8 13c-2.67 0-8 1.34-8 4v3h10"/><path d="M16 13c2.67 0 8 1.34 8 4v3H12"/></svg>);
    case "addEmployee":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/><path d="M6 22v-2a4 4 0 014-4h0"/><path d="M19 21v-6"/><path d="M16 18h6"/></svg>);
    case "attendance":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);
    case "payroll":
    case "payslips":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6"/></svg>);
    case "cognitive":
    case "performance":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><path d="M12 3v18"/><path d="M4 12h16"/><circle cx="12" cy="12" r="9"/></svg>);
    case "leaves":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><path d="M12 2C7 2 3 6 3 11c0 5 4 9 9 9s9-4 9-9C21 6 17 2 12 2z"/><path d="M8 13s1-3 4-3 4 3 4 3"/></svg>);
    case "askhr":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4z"/></svg>);
    case "profile":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0113 0"/></svg>);
    case "candidates":
      return (<svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2"><path d="M3 4h18v12H3z"/><path d="M7 20h10"/><path d="M9 16v4M15 16v4"/></svg>);
    default:
      return null;
  }
};

export default function BottomNav({ current, setCurrent, role }) {
  const getNav = () => {
    if (role === "admin") return NAV_ADMIN;
    if (role === "hr") return NAV_HR;
    if (role === "manager") return NAV_MANAGER;
    return NAV_STAFF;
  };
  const nav = getNav();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}>
      <div className="grid grid-cols-5 gap-1 px-2 py-2">
        {nav.slice(0,5).map((n) => {
          const active = current === n.key;
          return (
            <button
              key={n.key}
              onClick={() => setCurrent(n.key)}
              className={"flex flex-col items-center justify-center h-12 rounded-xl text-[11px] " +
                (active ? "text-sky-600 bg-sky-50 dark:text-sky-300 dark:bg-sky-900/20" : "text-slate-500 dark:text-slate-300")}
            >
              <Icon name={n.key} active={active} />
              <span className="mt-0.5 leading-none">{n.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

