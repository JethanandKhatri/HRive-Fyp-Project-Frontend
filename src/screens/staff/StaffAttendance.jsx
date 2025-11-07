import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { STAFF_ATTENDANCE } from "../../data/mockData";
import { canPerformAction, getCurrentUserId } from "../../utils/roleUtils";

export default function StaffAttendance() {
  const [attendance, setAttendance] = useState(STAFF_ATTENDANCE);
  const [showMarkForm, setShowMarkForm] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    date: new Date().toISOString().split('T')[0],
    in: "",
    out: "",
    status: "P"
  });

  const handleMarkAttendance = () => {
    if (!attendanceData.in || !attendanceData.out) {
      alert("Please fill in check-in and check-out times");
      return;
    }
    
    if (!canPerformAction(getCurrentUserId(), "mark_attendance")) {
      alert("You don't have permission to mark attendance");
      return;
    }
    
    const newEntry = {
      ...attendanceData,
      late: 0,
      ot: 0
    };
    setAttendance([newEntry, ...attendance]);
    setAttendanceData({ date: new Date().toISOString().split('T')[0], in: "", out: "", status: "P" });
    setShowMarkForm(false);
    alert("Attendance marked successfully (mock)");
  };

  return (
    <div className="space-y-4">
      <Card title="Mark Attendance">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">Your attendance records</div>
          {canPerformAction(getCurrentUserId(), "mark_attendance") && (
            <button
              onClick={() => setShowMarkForm(!showMarkForm)}
              className="px-4 h-9 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm"
            >
              {showMarkForm ? "Cancel" : "Mark Attendance"}
            </button>
          )}
        </div>
        
        {showMarkForm && canPerformAction(getCurrentUserId(), "mark_attendance") && (
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Date</label>
                <input
                  type="date"
                  value={attendanceData.date}
                  onChange={(e) => setAttendanceData({...attendanceData, date: e.target.value})}
                  className="w-full h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Check In (HH:MM)</label>
                <input
                  type="time"
                  value={attendanceData.in}
                  onChange={(e) => setAttendanceData({...attendanceData, in: e.target.value})}
                  className="w-full h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Check Out (HH:MM)</label>
                <input
                  type="time"
                  value={attendanceData.out}
                  onChange={(e) => setAttendanceData({...attendanceData, out: e.target.value})}
                  className="w-full h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Status</label>
                <select
                  value={attendanceData.status}
                  onChange={(e) => setAttendanceData({...attendanceData, status: e.target.value})}
                  className="w-full h-9 px-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm"
                >
                  <option value="P">Present</option>
                  <option value="A">Absent</option>
                  <option value="L">Leave</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleMarkAttendance}
              className="mt-3 px-4 h-9 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm"
            >
              Submit Attendance
            </button>
          </div>
        )}
      </Card>
      
      <Card title="My Attendance History">
        <Table
          columns={[
            { key: "date", label: "Date" },
            { key: "in", label: "Check In" },
            { key: "out", label: "Check Out" },
            { key: "status", label: "Status" },
            { key: "late", label: "Late (m)" },
            { key: "ot", label: "OT (m)" },
          ]}
          rows={attendance}
        />
      </Card>
    </div>
  );
}

