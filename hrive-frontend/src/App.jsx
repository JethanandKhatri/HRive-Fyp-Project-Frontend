import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/guard/PrivateRoute'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SectionPage from './pages/SectionPage'
import ChatPage from './pages/ChatPage'
import AskHRPage from './pages/AskHRPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import UserManagementPage from './pages/UserManagementPage'
import EmployeeManagementPage from './pages/EmployeeManagementPage'
import DepartmentManagementPage from './pages/DepartmentManagementPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/portal/:portalId"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/portal/admin/users"
          element={
            <PrivateRoute>
              <UserManagementPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/portal/:portalId/employees"
          element={
            <PrivateRoute>
              <EmployeeManagementPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/portal/admin/departments"
          element={
            <PrivateRoute>
              <DepartmentManagementPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/portal/:portalId/:section"
          element={
            <PrivateRoute>
              <SectionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/portal/:portalId/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/portal/:portalId/ask"
          element={
            <PrivateRoute>
              <AskHRPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
