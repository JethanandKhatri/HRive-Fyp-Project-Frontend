import Card from "../../components/Card";
import Table from "../../components/Table";
import { CANDIDATES } from "../../data/mockData";

export default function ManagerCandidates() {
  return (
    <Card title="Candidates (View Only)">
      <div className="mb-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Note:</strong> Managers can only view candidate information. Contact HR for candidate management actions.
        </p>
      </div>
      <Table
        columns={[
          { key: "id", label: "Candidate ID" },
          { key: "name", label: "Name" },
          { key: "position", label: "Position" },
          { key: "status", label: "Status", render: (v) => (
            <span className={`text-xs px-2 py-1 rounded-lg ${
              v === "Interview Scheduled" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
              v === "Under Review" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300" :
              "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            }`}>{v}</span>
          )},
          { key: "date", label: "Date" },
        ]}
        rows={CANDIDATES}
      />
    </Card>
  );
}

