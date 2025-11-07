import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { EMPLOYEES } from "../../data/mockData";
import { canPerformAction, getCurrentUserId } from "../../utils/roleUtils";

export default function AdminEmployees() {
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "", dept: "", grade: "", join: "", manager: "", role: "staff", email: "", phone: ""
  });

  const handleAdd = () => {
    if (!newEmployee.name || !newEmployee.dept) {
      alert("Please fill required fields");
      return;
    }
    const id = `E-${String(1000 + employees.length + 1).slice(1)}`;
    setEmployees([...employees, { ...newEmployee, id }]);
    setNewEmployee({ name: "", dept: "", grade: "", join: "", manager: "", role: "staff", email: "", phone: "" });
    setShowAddForm(false);
    alert("Employee added successfully (mock)");
  };

  const handleDrop = (empId) => {
    if (canPerformAction(getCurrentUserId(), "drop_employee", empId)) {
      if (confirm("Are you sure you want to remove this employee?")) {
        setEmployees(employees.filter(emp => emp.id !== empId));
        alert("Employee removed (mock)");
      }
    } else {
      alert("You don't have permission to drop this employee");
    }
  };

  const handleReplace = (oldEmpId) => {
    const oldEmp = employees.find(e => e.id === oldEmpId);
    if (!oldEmp) return;
    
    const newName = prompt(`Replace ${oldEmp.name} with:`, "");
    if (newName) {
      setEmployees(employees.map(emp => 
        emp.id === oldEmpId ? { ...emp, name: newName } : emp
      ));
      alert("Employee replaced (mock)");
    }
  };

  const filtered = employees.filter(e => {
    const matchesQuery = !query || (e.name + " " + e.dept + " " + e.id).toLowerCase().includes(query.toLowerCase());
    const matchesDept = deptFilter === "all" || e.dept.toLowerCase() === deptFilter.toLowerCase();
    return matchesQuery && matchesDept;
  });

  const departments = Array.from(new Set(employees.map(e => e.dept)));

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 text-white">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 20%, rgba(255,255,255,.3) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,.2) 0, transparent 35%)'}}></div>
        <div className="relative p-5 sm:p-6">
          <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">All Employees</h2>
              <p className="text-sm text-white/80">Total: {employees.length}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAddForm(true)} className="h-9 px-3 rounded-xl bg-white/90 text-sky-700 hover:bg-white font-medium text-sm">+ Add Employee</button>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-white/70">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </span>
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search name, dept, ID" className="w-full h-10 pl-8 pr-3 rounded-xl bg-white/15 text-white placeholder:text-white/70 border border-white/20 outline-none focus:ring-2 focus:ring-white/40"/>
            </div>
            <div className="flex gap-2 overflow-auto">
              <button onClick={()=>setDeptFilter("all")} className={(deptFilter==="all"?"bg-white/90 text-sky-700":"bg-white/15 text-white")+" h-10 px-3 rounded-xl border border-white/20 text-sm whitespace-nowrap"}>All</button>
              {departments.map(d=> (
                <button key={d} onClick={()=>setDeptFilter(d)} className={(deptFilter===d?"bg-white/90 text-sky-700":"bg-white/15 text-white")+" h-10 px-3 rounded-xl border border-white/20 text-sm whitespace-nowrap"}>{d}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Card title="Employee Management">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">Showing {filtered.length} of {employees.length}</div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 h-9 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm"
          >
            {showAddForm ? "Cancel" : "Add Employee"}
          </button>
        </div>
        
        {showAddForm && (
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                className="h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                placeholder="Name *"
              />
              <input
                value={newEmployee.dept}
                onChange={(e) => setNewEmployee({...newEmployee, dept: e.target.value})}
                className="h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                placeholder="Department *"
              />
              <input
                value={newEmployee.grade}
                onChange={(e) => setNewEmployee({...newEmployee, grade: e.target.value})}
                className="h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                placeholder="Grade"
              />
              <input
                type="date"
                value={newEmployee.join}
                onChange={(e) => setNewEmployee({...newEmployee, join: e.target.value})}
                className="h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                placeholder="Join Date"
              />
              <input
                value={newEmployee.manager}
                onChange={(e) => setNewEmployee({...newEmployee, manager: e.target.value})}
                className="h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                placeholder="Manager"
              />
              <select
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                className="h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
              >
                <option value="staff">Staff</option>
                <option value="hr">HR</option>
                <option value="manager">Manager</option>
              </select>
              <input
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                className="h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                placeholder="Email"
              />
              <input
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                className="h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                placeholder="Phone"
              />
            </div>
            <button
              onClick={handleAdd}
              className="mt-3 px-4 h-9 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm"
            >
              Add Employee
            </button>
          </div>
        )}
      </Card>
      
      <Card title="All Employees">
        <Table
          columns={[
            { key: "id", label: "Emp ID" },
            { key: "name", label: "Name" },
            { key: "dept", label: "Department" },
            { key: "grade", label: "Grade" },
            { key: "role", label: "Role" },
            { key: "join", label: "Join Date" },
            { key: "manager", label: "Manager" },
            { key: "actions", label: "Actions", render: (_, row) => (
              <div className="flex gap-2">
                <button
                  onClick={() => handleReplace(row.id)}
                  className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Replace
                </button>
                <button
                  onClick={() => handleDrop(row.id)}
                  className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Drop
                </button>
              </div>
            )},
          ]}
          rows={filtered}
        />
      </Card>
      {/* Floating add button on mobile */}
      {!showAddForm && (
        <button onClick={()=>setShowAddForm(true)} className="md:hidden fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700">+
        </button>
      )}
    </div>
  );
}

