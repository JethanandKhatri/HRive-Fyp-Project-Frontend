import { EMPLOYEES, ADMIN_IDS, MANAGER_IDS } from "../data/mockData";

export const USER_ID_KEY = "HRIVE_USER_ID";

export const getCurrentUserId = () => {
  try {
    return localStorage.getItem(USER_ID_KEY);
  } catch (_) {
    return null;
  }
};

export const setCurrentUserId = (userId) => {
  try {
    localStorage.setItem(USER_ID_KEY, userId);
  } catch (_) {}
};

export const clearCurrentUserId = () => {
  try {
    localStorage.removeItem(USER_ID_KEY);
  } catch (_) {}
};

// Get user role based on employee ID
export const getUserRole = (userId) => {
  // Admin users
  if (ADMIN_IDS.includes(userId)) return "admin";
  
  // HR users - typically from HR department
  const hrUser = EMPLOYEES.find(emp => emp.id === userId && emp.role === "hr");
  if (hrUser) return "hr";
  
  // Manager users - check if ID is in manager list
  if (MANAGER_IDS.includes(userId)) return "manager";
  
  // Default to staff for all other employees
  return "staff";
};

// Get user info
export const getUserInfo = (userId) => {
  return EMPLOYEES.find(emp => emp.id === userId) || null;
};

// Check if user can perform action
export const canPerformAction = (currentUserId, action, targetUserId = null) => {
  const userRole = getUserRole(currentUserId);
  const targetUser = targetUserId ? getUserInfo(targetUserId) : null;
  const targetRole = targetUser ? targetUser.role : null;
  
  // Admin can do everything
  if (userRole === "admin") return true;
  
  // HR can add/drop/replace but not drop themselves
  if (userRole === "hr") {
    if (action === "drop_employee") {
      return targetUserId !== currentUserId && targetRole !== "hr";
    }
    return action === "add_employee" || action === "replace_employee";
  }
  
  // Manager can only view candidates
  if (userRole === "manager") {
    return action === "view_candidates";
  }
  
  // Staff can only mark attendance
  if (userRole === "staff") {
    return action === "mark_attendance";
  }
  
  return false;
};

// For demo, login is stored in localStorage via helpers above.
// No default user to force going through Login screen.
export const CURRENT_USER_ID = null;

