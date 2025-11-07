// Navigation menus for each role
export const NAV_ADMIN = [
  { key: "dashboard", label: "Dashboard" },
  { key: "employees", label: "All Employees" },
  { key: "addEmployee", label: "Add Employee" },
  { key: "attendance", label: "Attendance" },
  { key: "payroll", label: "Payroll" },
  { key: "cognitive", label: "Cognitive AI" },
  { key: "askhr", label: "AskHR" },
];

export const NAV_HR = [
  { key: "dashboard", label: "Dashboard" },
  { key: "employees", label: "Employees" },
  { key: "addEmployee", label: "Add Employee" },
  { key: "attendance", label: "Attendance" },
  { key: "payroll", label: "Payroll" },
  { key: "cognitive", label: "Cognitive AI" },
  { key: "askhr", label: "AskHR" },
];

export const NAV_MANAGER = [
  { key: "dashboard", label: "Team Overview" },
  { key: "team", label: "My Team" },
  { key: "candidates", label: "Candidates" },
  { key: "attendance", label: "Team Attendance" },
  { key: "leaves", label: "Leave Approvals" },
  { key: "performance", label: "Team Performance" },
  { key: "askhr", label: "AskHR" },
];

export const NAV_STAFF = [
  { key: "dashboard", label: "My Dashboard" },
  { key: "attendance", label: "Mark Attendance" },
  { key: "leaves", label: "Leave Balance" },
  { key: "payslips", label: "My Payslips" },
  { key: "profile", label: "My Profile" },
  { key: "askhr", label: "AskHR" },
];

export const BRAND = {
  name: "HRive",
  tagline: "Pakistan-first AI HRMS",
  primary: "#0ea5e9", // tailwind sky-500
};

// Role hierarchy and permissions
export const ROLE_HIERARCHY = {
  admin: { level: 4, label: "Admin Portal" },
  hr: { level: 3, label: "HR Portal" },
  manager: { level: 2, label: "Manager Portal" },
  staff: { level: 1, label: "Staff Portal" },
};

// Permission checks
export const hasPermission = (userRole, action, targetRole = null) => {
  const userLevel = ROLE_HIERARCHY[userRole]?.level || 0;
  
  switch (action) {
    case "add_employee":
      return userRole === "admin" || userRole === "hr";
    case "drop_employee":
      if (userRole === "admin") return true;
      if (userRole === "hr") {
        // HR can drop anyone except themselves
        return targetRole !== "hr";
      }
      return false;
    case "replace_employee":
      return userRole === "admin" || userRole === "hr";
    case "view_candidates":
      return userRole === "admin" || userRole === "hr" || userRole === "manager";
    case "mark_attendance":
      return userRole === "staff" || userRole === "admin" || userRole === "hr";
    case "view_all_employees":
      return userRole === "admin" || userRole === "hr";
    case "view_payroll":
      return userRole === "admin" || userRole === "hr";
    default:
      return false;
  }
};

