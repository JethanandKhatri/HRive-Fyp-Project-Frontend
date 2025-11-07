import KPI from "../../components/KPI";
import Card from "../../components/Card";
import PageHero from "../../components/PageHero";
import SimpleBarChart from "../../components/SimpleBarChart";
import Table from "../../components/Table";
import { EMPLOYEES, PAYROLL, RISK } from "../../data/mockData";

export default function AdminDashboard({ onQuickAction }) {
  const attendanceRate = 0.92;
  const lateRate = 0.08;
  const data = [0.8, 0.6, 1, 0.7, 0.9, 0.75, 0.95];
  const highRisk = RISK.filter((r) => r.score >= 0.6).length;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-3">
        <PageHero
          title="Admin Portal"
          subtitle="Monitor workforce health, payroll, and take actions swiftly across the company."
          actions={(
            <>
              <button onClick={() => onQuickAction?.("addEmployee")} className="h-9 px-3 rounded-xl bg-white/90 text-sky-700 hover:bg-white font-medium text-sm">
                + Add Employee
              </button>
              <button onClick={() => onQuickAction?.("employees")} className="h-9 px-3 rounded-xl bg-sky-700/40 hover:bg-sky-700/50 text-white text-sm">
                View Employees
              </button>
              <button onClick={() => onQuickAction?.("askhr")} className="h-9 px-3 rounded-xl bg-sky-700/40 hover:bg-sky-700/50 text-white text-sm">
                AskHR
              </button>
            </>
          )}
        />
      </div>
      <div className="xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <KPI label="Total Headcount" value={EMPLOYEES.length} sub="All employees" />
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
                <div className="text-xs text-slate-400 dark:text-slate-500">{r.id} - Factors: {r.topFactors.join(", ")}</div>
              </div>
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-100">Score {Math.round(r.score * 100)}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

