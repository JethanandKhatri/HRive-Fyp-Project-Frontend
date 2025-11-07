import { useState } from "react";
import Card from "../../components/Card";
import PageHero from "../../components/PageHero";

export default function AdminAddEmployee() {
  const [formData, setFormData] = useState({
    name: "", dept: "", grade: "", join: "", manager: "", role: "staff", email: "", phone: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dept) {
      alert("Please fill required fields");
      return;
    }
    alert("Employee added successfully (mock)");
    setFormData({ name: "", dept: "", grade: "", join: "", manager: "", role: "staff", email: "", phone: "" });
  };

  return (
    <div className="space-y-4">
      <PageHero title="Add New Employee" subtitle="Create a new employee record and assign a role, manager and basic details." />
      <Card title="Employee Details">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Name *</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Department *</label>
            <input
              value={formData.dept}
              onChange={(e) => setFormData({...formData, dept: e.target.value})}
              className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Grade</label>
            <input
              value={formData.grade}
              onChange={(e) => setFormData({...formData, grade: e.target.value})}
              className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Join Date</label>
            <input
              type="date"
              value={formData.join}
              onChange={(e) => setFormData({...formData, join: e.target.value})}
              className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Manager</label>
            <input
              value={formData.manager}
              onChange={(e) => setFormData({...formData, manager: e.target.value})}
              className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
            >
              <option value="staff">Staff</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Phone</label>
            <input
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full h-9 px-3 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 h-10 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium"
          >
            Save Employee
          </button>
          <button
            type="button"
            onClick={() => setFormData({ name: "", dept: "", grade: "", join: "", manager: "", role: "staff", email: "", phone: "" })}
            className="px-4 h-10 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-sm"
          >
            Reset
          </button>
        </div>
      </form>
      </Card>
    </div>
  );
}

