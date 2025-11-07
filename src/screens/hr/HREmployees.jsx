import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { EMPLOYEES } from "../../data/mockData";
import { canPerformAction, getCurrentUserId } from "../../utils/roleUtils";

export default function HREmployees() {
  const [employees, setEmployees] = useState(EMPLOYEES);
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
    // HR cannot drop themselves or other HR members
    if (!canPerformAction(getCurrentUserId(), "drop_employee", empId)) {
      alert("You don't have permission to drop this employee (HR cannot drop HR members or themselves)");
      return;
    }
    if (confirm("Are you sure you want to remove this employee?")) {
      setEmployees(employees.filter(emp => emp.id !== empId));
      alert("Employee removed (mock)");
    }
  };

  const handleReplace = (oldEmpId) => {
    const oldEmp = employees.find(e => e.id === oldEmpId);
    if (!oldEmp) return;
    
    if (!canPerformAction(getCurrentUserId(), "replace_employee", oldEmpId)) {
      alert("You don't have permission to replace this employee");
      return;
    }
    
    const newName = prompt(`Replace ${oldEmp.name} with:`, "");
    if (newName) {
      setEmployees(employees.map(emp => 
        emp.id === oldEmpId ? { ...emp, name: newName } : emp
      ));
      alert("Employee replaced (mock)");
    }
  };

  return (
    <div className="space-y-4">
      <Card title="Employee Management">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Employees: {employees.length}</div>
          {canPerformAction(getCurrentUserId(), "add_employee") && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 h-9 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm"
            >
              {showAddForm ? "Cancel" : "Add Employee"}
            </button>
          )}
        </div>
        
        {showAddForm && canPerformAction(getCurrentUserId(), "add_employee") && (
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
                <option value="manager">Manager</option>
              </select>
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
      
      <Card title="Employees">
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
                {canPerformAction(getCurrentUserId(), "replace_employee", row.id) && (
                  <button
                    onClick={() => handleReplace(row.id)}
                    className="text-xs px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Replace
                  </button>
                )}
                {canPerformAction(getCurrentUserId(), "drop_employee", row.id) && (
                  <button
                    onClick={() => handleDrop(row.id)}
                    className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Drop
                  </button>
                )}
              </div>
            )},
          ]}
          rows={employees}
        />
      </Card>
    </div>
  );
}

