// Mock data for the application

export const EMPLOYEES = [
  { id: "E-1001", name: "Bilal Ahmed", dept: "Engineering", grade: "G4", join: "2023-08-01", manager: "M. Khan", role: "staff", email: "bilal.ahmed@company.com", phone: "+92 300 1234567" },
  { id: "E-1002", name: "Muquaddas Fatima", dept: "Data/ML", grade: "G4", join: "2024-02-15", manager: "M. Khan", role: "staff", email: "muquaddas@company.com", phone: "+92 300 1234568" },
  { id: "E-1003", name: "Jethanand Khatri", dept: "Frontend", grade: "G3", join: "2023-11-10", manager: "M. Khan", role: "staff", email: "jethanand@company.com", phone: "+92 300 1234569" },
  { id: "E-1004", name: "Ayesha Siddiqui", dept: "HR", grade: "G3", join: "2022-05-20", manager: "S. Fatima", role: "hr", email: "ayesha@company.com", phone: "+92 300 1234570" },
  { id: "E-1005", name: "Usman Iqbal", dept: "Finance", grade: "G3", join: "2021-03-10", manager: "S. Ali", role: "staff", email: "usman@company.com", phone: "+92 300 1234571" },
];

// Admin IDs
export const ADMIN_IDS = ["A-0001"];

// Manager IDs
export const MANAGER_IDS = ["M-2001"];

// Candidates (for manager view)
export const CANDIDATES = [
  { id: "C-001", name: "Ahmed Ali", position: "Senior Developer", status: "Interview Scheduled", date: "2025-11-05" },
  { id: "C-002", name: "Fatima Khan", position: "Data Analyst", status: "Under Review", date: "2025-11-03" },
  { id: "C-003", name: "Hassan Raza", position: "Frontend Developer", status: "Pending", date: "2025-11-01" },
];

export const ATTENDANCE = [
  { id: "E-1001", date: "2025-10-28", in: "09:11", out: "18:04", status: "P", late: 11, ot: 30 },
  { id: "E-1002", date: "2025-10-28", in: "09:00", out: "18:06", status: "P", late: 0, ot: 36 },
  { id: "E-1003", date: "2025-10-28", in: "09:24", out: "18:01", status: "P", late: 24, ot: 0 },
  { id: "E-1004", date: "2025-10-28", in: "—", out: "—", status: "L (Sick)", late: 0, ot: 0 },
  { id: "E-1005", date: "2025-10-28", in: "—", out: "—", status: "A", late: 0, ot: 0 },
];

export const PAYROLL = [
  { id: "E-1001", period: "2025-10", gross: 220000, tax: 42000, net: 178000 },
  { id: "E-1002", period: "2025-10", gross: 210000, tax: 40000, net: 170000 },
  { id: "E-1003", period: "2025-10", gross: 165000, tax: 26000, net: 139000 },
  { id: "E-1004", period: "2025-10", gross: 150000, tax: 22000, net: 128000 },
  { id: "E-1005", period: "2025-10", gross: 155000, tax: 23000, net: 132000 },
];

export const RISK = [
  { id: "E-1003", name: "Jethanand Khatri", score: 0.71, topFactors: ["LateCount_30d", "Tenure<1y", "Low OT"] },
  { id: "E-1005", name: "Usman Iqbal", score: 0.58, topFactors: ["AbsenceRate", "ManagerChange_6m"] },
  { id: "E-1004", name: "Ayesha Siddiqui", score: 0.36, topFactors: ["LeaveBalanceLow"] },
];

// Manager's team data
export const TEAM_MEMBERS = [
  { id: "E-1001", name: "Bilal Ahmed", dept: "Engineering", grade: "G4", join: "2023-08-01", status: "Active", attendance: "95%", lateCount: 2 },
  { id: "E-1002", name: "Muquaddas Fatima", dept: "Data/ML", grade: "G4", join: "2024-02-15", status: "Active", attendance: "98%", lateCount: 0 },
  { id: "E-1003", name: "Jethanand Khatri", dept: "Frontend", grade: "G3", join: "2023-11-10", status: "Active", attendance: "88%", lateCount: 5 },
];

// Leave requests for manager approval
export const LEAVE_REQUESTS = [
  { id: "L-001", empId: "E-1001", name: "Bilal Ahmed", type: "Annual", from: "2025-11-05", to: "2025-11-07", days: 3, reason: "Family event", status: "Pending" },
  { id: "L-002", empId: "E-1003", name: "Jethanand Khatri", type: "Sick", from: "2025-11-01", to: "2025-11-01", days: 1, reason: "Medical appointment", status: "Pending" },
  { id: "L-003", empId: "E-1002", name: "Muquaddas Fatima", type: "Casual", from: "2025-11-10", to: "2025-11-10", days: 1, reason: "Personal work", status: "Approved" },
];

// Staff personal data
export const STAFF_ATTENDANCE = [
  { date: "2025-10-28", in: "09:11", out: "18:04", status: "P", late: 11, ot: 30 },
  { date: "2025-10-27", in: "09:00", out: "18:06", status: "P", late: 0, ot: 36 },
  { date: "2025-10-26", in: "09:24", out: "18:01", status: "P", late: 24, ot: 0 },
  { date: "2025-10-25", in: "—", out: "—", status: "L (Sick)", late: 0, ot: 0 },
  { date: "2025-10-24", in: "09:05", out: "17:55", status: "P", late: 5, ot: 0 },
];

export const STAFF_LEAVES = {
  annual: { total: 20, used: 8, remaining: 12 },
  sick: { total: 10, used: 3, remaining: 7 },
  casual: { total: 5, used: 2, remaining: 3 },
};

export const STAFF_PAYSLIPS = [
  { period: "2025-10", gross: 220000, tax: 42000, net: 178000, status: "Paid" },
  { period: "2025-09", gross: 220000, tax: 42000, net: 178000, status: "Paid" },
  { period: "2025-08", gross: 220000, tax: 42000, net: 178000, status: "Paid" },
];

