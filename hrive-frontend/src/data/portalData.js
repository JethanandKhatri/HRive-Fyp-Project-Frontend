export const portalKeys = ['admin', 'hr', 'manager', 'employee']

export const portalMeta = {
  admin: {
    label: 'Admin',
    greeting: 'Welcome, Admin',
    description: 'System oversight and configuration',
  },
  hr: {
    label: 'HR',
    greeting: 'Welcome, Jessica Doe',
    description: 'People analytics and engagement',
  },
  manager: {
    label: 'Manager',
    greeting: 'Welcome, Team Lead',
    description: 'Team performance and delivery',
  },
  employee: {
    label: 'Employee',
    greeting: 'Welcome back',
    description: 'Your work hub and requests',
  },
}

export const metrics = {
  admin: [
    { label: 'Systems Online', value: '16' },
    { label: 'Teams', value: '42' },
    { label: 'Policies', value: '18' },
    { label: 'Avg. Response', value: '2.4h' },
  ],
  hr: [
    { label: 'New Employee', value: '22' },
    { label: 'Total Employee', value: '425' },
    { label: 'Total Salary', value: '$2.8M' },
    { label: 'Avg. Salary', value: '$1,250' },
  ],
  manager: [
    { label: 'Projects Active', value: '12' },
    { label: 'Squads', value: '8' },
    { label: 'Risks', value: '3' },
    { label: 'Hiring Needs', value: '4' },
  ],
  employee: [
    { label: 'Open Tasks', value: '9' },
    { label: 'Approvals Pending', value: '3' },
    { label: 'Trainings', value: '2' },
    { label: 'Leave Balance', value: '14d' },
  ],
}

export const salaryStacked = {
  admin: [
    { month: 'Jan', compliance: 40, audit: 55, ops: 35 },
    { month: 'Feb', compliance: 42, audit: 58, ops: 40 },
    { month: 'Mar', compliance: 48, audit: 60, ops: 45 },
  ],
  hr: [
    { month: 'Jan', developer: 40, marketing: 65, sales: 55 },
    { month: 'Feb', developer: 45, marketing: 55, sales: 50 },
    { month: 'Mar', developer: 50, marketing: 70, sales: 60 },
    { month: 'Apr', developer: 60, marketing: 80, sales: 65 },
  ],
  manager: [
    { month: 'Jan', delivery: 60, qa: 40, ux: 30 },
    { month: 'Feb', delivery: 70, qa: 42, ux: 32 },
    { month: 'Mar', delivery: 68, qa: 44, ux: 35 },
  ],
  employee: [
    { month: 'Jan', tasks: 10, meetings: 6, learning: 4 },
    { month: 'Feb', tasks: 12, meetings: 5, learning: 5 },
    { month: 'Mar', tasks: 14, meetings: 7, learning: 3 },
  ],
}

export const incomeSlices = [
  { name: 'Design', value: 84.6, color: '#0d5b6c' },
  { name: 'Dev', value: 15.4, color: '#1ecac3' },
  { name: 'SEO', value: 5.1, color: '#f4c542' },
]

export const todoItems = ['New Employee intro', 'Schedule product demo', 'Approve travel requests', 'Share salary summary']

export const hrDepartmentStats = [
  { label: 'Engineering', value: 92, color: '#0d5b6c' },
  { label: 'Design', value: 76, color: '#1ecac3' },
  { label: 'Marketing', value: 58, color: '#f4c542' },
  { label: 'Operations', value: 46, color: '#7ca964' },
]

export const hrStatusBreakdown = [
  { label: 'Active', value: 312, color: '#22c55e' },
  { label: 'Remote', value: 64, color: '#0ea5e9' },
  { label: 'On Leave', value: 28, color: '#f59e0b' },
  { label: 'Exit', value: 8, color: '#ef4444' },
]

export const hrAttendanceStats = [
  { label: 'On Time', value: 82, color: '#22c55e' },
  { label: 'Late', value: 11, color: '#f59e0b' },
  { label: 'Absent', value: 7, color: '#ef4444' },
]

export const hrApplicants = [
  { name: 'Irene Velasco', role: 'UI Designer', stage: 'Interview' },
  { name: 'Olivia James', role: 'HR Analyst', stage: 'Review' },
  { name: 'Ethan Brooks', role: 'Recruiter', stage: 'Offer' },
  { name: 'Sophia Patel', role: 'Compensation Lead', stage: 'Screening' },
]

export const hrEvents = [
  { title: 'Orientation: New Joiners', time: 'Today - 3:00 PM' },
  { title: 'Benefits Q&A', time: 'Tomorrow - 11:00 AM' },
  { title: 'Policy Update Briefing', time: 'Fri - 2:30 PM' },
]

export const hrActivities = [
  { title: 'Aaron Lee approved leave request', time: '10 mins ago' },
  { title: 'Benefits enrollment completed', time: '1 hour ago' },
  { title: 'New job post published', time: '2 hours ago' },
]

export const hrBirthdays = [
  { name: 'Aisha Khan', role: 'People Ops', date: 'Today' },
  { name: 'Marcus Doyle', role: 'Recruiter', date: 'Tomorrow' },
  { name: 'Nina Patel', role: 'HR Analyst', date: 'Fri' },
]

export const navByPortal = {
  hr: [
    { label: 'HR Dashboard', path: '' },
    { label: 'Chat HR', path: 'chat' },
    { label: 'Holidays', path: 'holidays' },
    { label: 'Events', path: 'events' },
    { label: 'Activities', path: 'activities' },
    { label: 'HR Social', path: 'social' },
    { label: 'Employees', path: 'employees' },
    { label: 'Accounts', path: 'accounts' },
    { label: 'Payroll', path: 'payroll' },
  ],
  admin: [
    { label: 'Admin Dashboard', path: '' },
    { label: 'User Management', path: 'users' },
    { label: 'Employees', path: 'employees' },
    { label: 'Departments', path: 'departments' },
    { label: 'Systems', path: 'systems' },
    { label: 'Policies', path: 'policies' },
    { label: 'Audit', path: 'audit' },
    { label: 'Billing', path: 'billing' },
    { label: 'Security', path: 'security' },
  ],
  manager: [
    { label: 'Manager Dashboard', path: '' },
    { label: 'Chat HR', path: 'chat' },
    { label: 'Ask HR Bot', path: 'ask' },
    { label: 'Projects', path: 'projects' },
    { label: 'Squads', path: 'squads' },
    { label: 'Risks', path: 'risks' },
    { label: 'Approvals', path: 'approvals' },
  ],
  employee: [
    { label: 'My Dashboard', path: '' },
    { label: 'Chat HR', path: 'chat' },
    { label: 'Ask HR Bot', path: 'ask' },
    { label: 'Tasks', path: 'tasks' },
    { label: 'Approvals', path: 'approvals' },
    { label: 'Payslips', path: 'payslips' },
    { label: 'Time Off', path: 'timeoff' },
    { label: 'Growth', path: 'growth' },
  ],
}

const buildNavSections = (items, sections) => {
  const byLabel = items.reduce((acc, item) => {
    acc[item.label] = item
    return acc
  }, {})

  return sections
    .map((section) => ({
      title: section.title,
      items: section.labels.map((label) => byLabel[label]).filter(Boolean),
    }))
    .filter((section) => section.items.length)
}

export const navSectionsByPortal = {
  hr: buildNavSections(navByPortal.hr, [
    { title: 'Overview', labels: ['HR Dashboard'] },
    { title: 'Communication', labels: ['Chat HR', 'HR Social'] },
    { title: 'Calendar', labels: ['Holidays', 'Events', 'Activities'] },
    { title: 'People', labels: ['Employees', 'Accounts'] },
    { title: 'Payroll', labels: ['Payroll'] },
  ]),
  admin: buildNavSections(navByPortal.admin, [
    { title: 'Overview', labels: ['Admin Dashboard'] },
    { title: 'People', labels: ['User Management', 'Employees', 'Departments'] },
    { title: 'Operations', labels: ['Systems', 'Policies'] },
    { title: 'Risk', labels: ['Audit', 'Security'] },
    { title: 'Finance', labels: ['Billing'] },
  ]),
  manager: buildNavSections(navByPortal.manager, [
    { title: 'Overview', labels: ['Manager Dashboard'] },
    { title: 'Communication', labels: ['Chat HR', 'Ask HR Bot'] },
    { title: 'Delivery', labels: ['Projects', 'Squads'] },
    { title: 'Risk', labels: ['Risks'] },
    { title: 'Approvals', labels: ['Approvals'] },
  ]),
  employee: buildNavSections(navByPortal.employee, [
    { title: 'Overview', labels: ['My Dashboard'] },
    { title: 'Communication', labels: ['Chat HR', 'Ask HR Bot'] },
    { title: 'Work', labels: ['Tasks', 'Approvals'] },
    { title: 'Finance', labels: ['Payslips'] },
    { title: 'Time', labels: ['Time Off'] },
    { title: 'Growth', labels: ['Growth'] },
  ]),
}

export const chatSeeds = {
  admin: [{ from: 'bot', text: 'Chat is available for HR, Manager, and Employees.' }],
  manager: [
    { from: 'bot', text: 'You can direct-message employees here. Type to start.' },
    { from: 'employee', text: 'Hi, can we review sprint allocations?' },
    { from: 'manager', text: 'Yes, let’s sync at 3 PM.' },
  ],
  hr: [
    { from: 'bot', text: 'Hi! Need the list of new joiners or attrition?' },
    { from: 'user', text: 'Show the new employees this month.' },
    { from: 'bot', text: '22 new employees joined. 14 in Dev, 8 in Design.' },
  ],
  employee: [
    { from: 'bot', text: 'Hello! Ask HR questions or message your manager.' },
    { from: 'manager', text: 'Reminder: submit your status update today.' },
    { from: 'employee', text: 'Got it, will do by 5 PM.' },
  ],
}

export const highlight = '#1ecac3'
export const deepBlue = '#0d5b6c'
export const activityPills = ['W', 'M', 'Y']
