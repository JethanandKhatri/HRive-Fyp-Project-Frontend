import React, { useMemo, useState } from "react";
// HRive Frontend Mock – Single-file React component
// Tailwind-only (no external UI deps). Designed as a PWA-like dashboard preview.
// Screens: Dashboard, Employees, Attendance, Payroll, Cognitive AI, AskHR

const NAV = [
  { key: "dashboard", label: "Dashboard" },
  { key: "employees", label: "Employees" },
  { key: "attendance", label: "Attendance" },
  { key: "payroll", label: "Payroll" },
  { key: "cognitive", label: "Cognitive AI" },
  { key: "askhr", label: "AskHR" },
];

const BRAND = {
  name: "HRive",
  tagline: "Pakistan-first AI HRMS",
  primary: "#0ea5e9", // tailwind sky-500
};

// --- Dummy data (minimal, realistic) ---
const EMPLOYEES = [
  { id: "E-1001", name: "Bilal Ahmed", dept: "Engineering", grade: "G4", join: "2023-08-01", manager: "M. Khan" },
  { id: "E-1002", name: "Muquaddas Fatima", dept: "Data/ML", grade: "G4", join: "2024-02-15", manager: "M. Khan" },
  { id: "E-1003", name: "Jethanand Khatri", dept: "Frontend", grade: "G3", join: "2023-11-10", manager: "M. Khan" },
  { id: "E-1004", name: "Ayesha Siddiqui", dept: "HR", grade: "G3", join: "2022-05-20", manager: "S. Fatima" },
  { id: "E-1005", name: "Usman Iqbal", dept: "Finance", grade: "G3", join: "2021-03-10", manager: "S. Ali" },
];

const ATTENDANCE = [
  { id: "E-1001", date: "2025-10-28", in: "09:11", out: "18:04", status: "P", late: 11, ot: 30 },
  { id: "E-1002", date: "2025-10-28", in: "09:00", out: "18:06", status: "P", late: 0, ot: 36 },
  { id: "E-1003", date: "2025-10-28", in: "09:24", out: "18:01", status: "P", late: 24, ot: 0 },
  { id: "E-1004", date: "2025-10-28", in: "—", out: "—", status: "L (Sick)", late: 0, ot: 0 },
  { id: "E-1005", date: "2025-10-28", in: "—", out: "—", status: "A", late: 0, ot: 0 },
];

const PAYROLL = [
  { id: "E-1001", period: "2025-10", gross: 220000, tax: 42000, net: 178000 },
  { id: "E-1002", period: "2025-10", gross: 210000, tax: 40000, net: 170000 },
  { id: "E-1003", period: "2025-10", gross: 165000, tax: 26000, net: 139000 },
  { id: "E-1004", period: "2025-10", gross: 150000, tax: 22000, net: 128000 },
  { id: "E-1005", period: "2025-10", gross: 155000, tax: 23000, net: 132000 },
];

const RISK = [
  { id: "E-1003", name: "Jethanand Khatri", score: 0.71, topFactors: ["LateCount_30d", "Tenure<1y", "Low OT"] },
  { id: "E-1005", name: "Usman Iqbal", score: 0.58, topFactors: ["AbsenceRate", "ManagerChange_6m"] },
  { id: "E-1004", name: "Ayesha Siddiqui", score: 0.36, topFactors: ["LeaveBalanceLow"] },
];

function KPI({ label, value, sub }) {
  return (
    <div className="p-4 rounded-2xl shadow-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-800 dark:text-slate-100">{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">{sub}</div>}
    </div>
  );
}

function SimpleBarChart({ data, width = 320, height = 120 }) {
  // data: array of numbers 0..1
  const max = Math.max(...data, 1);
  const w = width;
  const h = height;
  const barW = Math.floor(w / (data.length * 1.5));
  const gap = Math.floor(barW / 2);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32">
      <rect x="0" y="0" width={w} height={h} fill="#ffffff" />
      {data.map((v, i) => {
        const bh = Math.round((v / max) * (h - 20));
        const x = i * (barW + gap) + gap;
        const y = h - bh - 10;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx="6" ry="6" fill="#0ea5e9" opacity={0.85} />
          </g>
        );
      })}
      <line x1="0" y1={h - 10} x2={w} y2={h - 10} stroke="#e2e8f0" />
    </svg>
  );
}

function TopBar({ onSearch, dark, setDark, onMenuToggle }) {
  return (
    <div className="h-14 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuToggle}
          className="md:hidden mr-1 inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
          aria-label="Open navigation"
        >
          {/* hamburger */}
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="w-8 h-8 rounded-xl" style={{ background: BRAND.primary }} />
        <div className="leading-tight">
          <div className="font-semibold text-slate-800 dark:text-slate-100">{BRAND.name}</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">{BRAND.tagline}</div>
        </div>
      </div>
      <div className="flex-1 max-w-xl mx-4">
        <input
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-400/40 placeholder:text-slate-400 dark:placeholder:text-slate-400"
          placeholder="AskHR: e.g., 'Show Oct 2025 payroll for Engineering'"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark?.(!dark)}
          className="h-9 px-3 rounded-xl text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-100"
          title="Toggle theme"
        >
          {dark ? 'Light' : 'Dark'}
        </button>
        <span className="text-sm text-slate-500 dark:text-slate-300">Bilal</span>
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600" />
      </div>
    </div>
  );
}

function SideNav({ current, setCurrent }) {
  return (
    <div className="w-60 border-r border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 h-full p-3">
      {NAV.map((n) => (
        <button
          key={n.key}
          onClick={() => setCurrent(n.key)}
          className={
            "w-full text-left px-3 py-2 rounded-xl mb-1 text-sm " +
            (current === n.key
              ? "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
              : "hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-200")
          }
        >
          {n.label}
        </button>
      ))}
    </div>
  );
}

function Card({ title, children, right }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-slate-700 dark:text-slate-100">{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}

function Table({ columns, rows }) {
  return (
    <div className="w-full">
      {/* Desktop/tablet table */}
      <div className="hidden md:block overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-300">
              {columns.map((c) => (
                <th key={c.key} className="py-2 pr-4 font-medium">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-100">
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-100 dark:border-slate-700">
                {columns.map((c) => (
                  <td key={c.key} className="py-2 pr-4">
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
          <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="grid grid-cols-1 gap-2">
              {columns.map((c) => (
                <div key={c.key} className="flex items-start justify-between gap-4 text-sm">
                  <div className="min-w-[7rem] text-slate-500 dark:text-slate-400">{c.label}</div>
                  <div className="font-medium text-slate-700 dark:text-slate-100">
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

// --- Screens ---
function ScreenDashboard() {
  const attendanceRate = 0.92;
  const lateRate = 0.08;
  const data = [0.8, 0.6, 1, 0.7, 0.9, 0.75, 0.95];
  const highRisk = RISK.filter((r) => r.score >= 0.6).length;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Headcount" value={EMPLOYEES.length} sub="Active employees" />
        <KPI label="Attendance" value={`${Math.round(attendanceRate * 100)}%`} sub="Last working day" />
        <KPI label="Late arrivals" value={`${Math.round(lateRate * 100)}%`} sub="Last working day" />
        <KPI label="High-risk (attrition)" value={highRisk} sub=">= 0.60 score" />
      </div>
      <Card title="Attendance Trend (7d)">
        <SimpleBarChart data={data} />
      </Card>
      <Card title="Recent Payroll (Oct 2025)" right={<a className="text-sky-600 text-xs" href="#">View all</a>}>
        <Table
          columns={[
            { key: "id", label: "Emp ID" },
            { key: "net", label: "Net (PKR)", render: (v) => v.toLocaleString() },
            { key: "tax", label: "Tax (PKR)", render: (v) => v.toLocaleString() },
          ]}
          rows={PAYROLL.slice(0, 4)}
        />
      </Card>
      <Card title="Attrition Watchlist (Top 3)">
        <div className="space-y-3">
          {RISK.map((r) => (
            <div key={r.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-700 dark:text-slate-100">{r.name}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{r.id} • Factors: {r.topFactors.join(", ")}</div>
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-100">Score {Math.round(r.score * 100)}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ScreenEmployees() {
  return (
    <Card title="Employees">
      <Table
        columns={[
          { key: "id", label: "Emp ID" },
          { key: "name", label: "Name" },
          { key: "dept", label: "Department" },
          { key: "grade", label: "Grade" },
          { key: "join", label: "Join Date" },
          { key: "manager", label: "Manager" },
        ]}
        rows={EMPLOYEES}
      />
    </Card>
  );
}

function ScreenAttendance() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query) return ATTENDANCE;
    return ATTENDANCE.filter((r) => r.id.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="space-y-4">
      <Card title="Filters">
        <div className="flex flex-wrap gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-400/40 placeholder:text-slate-400 dark:placeholder:text-slate-400"
            placeholder="Search by Emp ID"
          />
          <button className="px-4 h-9 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm">Export CSV</button>
        </div>
      </Card>
      <Card title="Attendance (Last Working Day)">
        <Table
          columns={[
            { key: "id", label: "Emp ID" },
            { key: "date", label: "Date" },
            { key: "in", label: "In" },
            { key: "out", label: "Out" },
            { key: "status", label: "Status" },
            { key: "late", label: "Late (m)" },
            { key: "ot", label: "OT (m)" },
          ]}
          rows={filtered}
        />
      </Card>
    </div>
  );
}

function ScreenPayroll() {
  return (
    <div className="space-y-4">
      <Card title="Run Status">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <KPI label="Period" value="Oct 2025" />
          <KPI label="Total Net (PKR)" value={PAYROLL.reduce((a, b) => a + b.net, 0).toLocaleString()} />
          <KPI label="Employees Paid" value={`${PAYROLL.length}`} />
        </div>
      </Card>
      <Card title="Payslips (Oct 2025)">
        <Table
          columns={[
            { key: "id", label: "Emp ID" },
            { key: "gross", label: "Gross", render: (v) => v.toLocaleString() },
            { key: "tax", label: "Tax", render: (v) => v.toLocaleString() },
            { key: "net", label: "Net", render: (v) => v.toLocaleString() },
          ]}
          rows={PAYROLL}
        />
      </Card>
    </div>
  );
}

function ScreenCognitive() {
  return (
    <div className="space-y-4">
      <Card title="Attrition Risk – SHAP Overview" right={<span className="text-xs text-slate-400">Mock view</span>}>
        <div className="text-sm text-slate-600 mb-3">Top factors driving risk (example):</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {RISK.map((r) => (
            <div key={r.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="font-medium text-slate-700 dark:text-slate-100">{r.name}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500">Score: {Math.round(r.score * 100)}%</div>
              <ul className="mt-2 text-sm list-disc ml-4 text-slate-600 dark:text-slate-200">
                {r.topFactors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ScreenAskHR() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! Ask me HR policy or payroll questions." },
  ]);
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { role: "user", text: draft }, { role: "assistant", text: "(Mock) I'll fetch leave balance from DB and summarize here." }]);
    setDraft("");
  };

  return (
    <div className="grid grid-rows-[1fr_auto] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl h-[70vh] md:h-[520px]">
      <div className="p-4 overflow-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={"max-w-[70%] px-3 py-2 rounded-xl text-sm " + (m.role === "user" ? "ml-auto bg-sky-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100")}>{m.text}</div>
        ))}
      </div>
      <div className="p-3 border-t border-slate-100 dark:border-slate-700 flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 h-10 px-3 rounded-xl bg-slate-50 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 text-sm outline-none focus:ring-2 focus:ring-sky-200 dark:focus:ring-sky-400/40 placeholder:text-slate-400 dark:placeholder:text-slate-400"
          placeholder="e.g., Show my leave balance"
        />
        <button onClick={send} className="px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm">Send</button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className={dark ? "dark min-h-screen w-full" : "min-h-screen w-full"}>
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 grid grid-rows-[auto_1fr]">
        <TopBar dark={dark} setDark={setDark} onMenuToggle={() => setNavOpen(true)} />
        <div className="grid md:grid-cols-[240px_1fr] grid-cols-1 gap-0 h-full relative">
          {/* Desktop/Tablet sidebar */}
          <aside className="hidden md:block h-full">
            <SideNav current={screen} setCurrent={setScreen} />
          </aside>

          {/* Mobile drawer */}
          {navOpen && (
            <>
              <div
                className="md:hidden fixed inset-0 bg-black/40 z-40"
                onClick={() => setNavOpen(false)}
              />
              <div className="md:hidden fixed inset-y-0 left-0 w-64 z-50 shadow-xl">
                <div className="h-full">
                  <SideNav current={screen} setCurrent={(k) => { setScreen(k); setNavOpen(false); }} />
                </div>
              </div>
            </>
          )}

          <main className="p-4 overflow-auto space-y-4 scrollbar-thin">
            <div className="flex items-start sm:items-center justify-between gap-2 flex-col sm:flex-row">
              <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{NAV.find(n => n.key === screen)?.label}</h1>
              <div className="text-xs text-slate-400 dark:text-slate-500">UI Prototype • Tailwind-only</div>
            </div>
            {screen === "dashboard" && <ScreenDashboard />}
            {screen === "employees" && <ScreenEmployees />}
            {screen === "attendance" && <ScreenAttendance />}
            {screen === "payroll" && <ScreenPayroll />}
            {screen === "cognitive" && <ScreenCognitive />}
            {screen === "askhr" && <ScreenAskHR />}
          </main>
        </div>
      </div>
    </div>
  );
}
