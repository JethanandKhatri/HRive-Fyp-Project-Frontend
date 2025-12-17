import React, { useEffect, useState } from 'react'
import DashboardShell from '../components/layout/DashboardShell'
import ChartCard from '../components/ui/ChartCard'
import { portalMeta } from '../data/portalData'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { SUPABASE_FUNCTIONS_BASE } from '../lib/supabaseClient'

function UserManagementPage() {
  const { role, logout } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  
  // Form state
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserRole, setNewUserRole] = useState('EMPLOYEE')
  const [formError, setFormError] = useState('')
  const [successMsg, setSuccessMsg] = useState('') // Missing state causing crash
  const [tempPassword, setTempPassword] = useState('') // New state for password copying

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getToken = () => localStorage.getItem('hrive_access_token')

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const token = getToken()
      console.log('Fetching users with token:', token ? 'Present' : 'Missing')

      // USER CONFIRMED: GET /create-user returns the list of users
      const res = await fetch(`${SUPABASE_FUNCTIONS_BASE}/create-user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      let data = {}
      try {
          data = await res.json()
      } catch(e) { console.error('JSON parse error', e) }
      
      console.log('Fetch Users Response:', res.status, res.statusText, data)

      if (!res.ok) throw new Error(data.error || `Failed to fetch users (${res.status})`)
      setUsers(data.users || [])
    } catch (err) {
      console.error('Fetch Users Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword)
      alert("Password copied to clipboard!")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreateUser = async (e) => {
    e.preventDefault()
    setCreating(true)
    setFormError('')
    setSuccessMsg('')
    setTempPassword('')

    try {
      const token = getToken()
      console.log('Creating user with token:', token ? 'Present' : 'Missing')
      if (!token) throw new Error('Auth token missing. Please login again.')
      
      // Changed endpoint to /create-user
      const res = await fetch(`${SUPABASE_FUNCTIONS_BASE}/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: newUserEmail, role: (newUserRole || '').toUpperCase() }),
      })
      
      let data = {}
      try {
        data = await res.json()
      } catch (e) {
        console.error('Failed to parse response JSON', e)
      }

      console.log('Create User Response:', res.status, res.statusText, data)

      if (!res.ok) throw new Error(data.error || data.message || `Failed to create user (${res.status})`)

      setSuccessMsg('User created successfully!')
      setTempPassword(data.temp_password)
      
      setNewUserEmail('')
      setNewUserRole('EMPLOYEE')
      fetchUsers() // Refresh list
    } catch (err) {
      console.error('Create User Error:', err)
      setFormError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This cannot be undone.')) return

    try {
      const token = getToken()
      const res = await fetch(`${SUPABASE_FUNCTIONS_BASE}/manage-app-users?id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete user')
      
      fetchUsers() // Refresh list
    } catch (err) {
      alert(err.message)
    }
  }

  const handleToggleStatus = async (user) => {
    const action = user.is_active ? 'disable' : 'enable'
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return

    try {
      const token = getToken()
      // Send is_active boolean instead of action string
      const isActive = action === 'enable'
      
      const res = await fetch(`${SUPABASE_FUNCTIONS_BASE}/create-user?id=${user.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          is_active: isActive
        }),
      })

      let data = {}
      try { data = await res.json() } catch(e) {
        console.error('Failed to parse response:', e)
      }

      if (!res.ok) throw new Error(data.error || data.message || `Failed to ${action} user`)
      
      setSuccessMsg(`User ${action}d successfully`)
      fetchUsers() // Refresh list
    } catch (err) {
      console.error('Toggle status error:', err)
      alert(err.message)
    }
  }

  return (
    <DashboardShell portal="admin" onLogout={handleLogout}>
      <div className="portal-tabs">
        <span className="portal-tab active">User Management</span>
      </div>

      <div className="hero-banner">
        <div>
          <p className="tag">Admin Portal</p>
          <h2>Manage Users</h2>
          <p className="muted">Create, view, and remove system users.</p>
        </div>
      </div>

      <div className="content-grid">
        {/* Create User */}
        <ChartCard title="Add New User" subtitle="Create the account before linking it to an employee.">
          <form onSubmit={handleCreateUser} className="auth-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <label>
              Email
              <input
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                required
                placeholder="user@example.com"
                style={{ width: '100%' }}
              />
            </label>
            <label>
              Role
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
              >
                <option value="ADMIN">Admin</option>
                <option value="HR">HR</option>
                <option value="MANAGER">Manager</option>
                <option value="EMPLOYEE">Employee</option>
              </select>
            </label>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
              <button type="submit" className="primary" disabled={creating}>
                {creating ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </form>
          {formError && <p style={{ color: 'red', marginTop: '0.75rem' }}>{formError}</p>}
          {successMsg && (
            <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(30, 202, 195, 0.1)', borderRadius: 'var(--radius)', border: '1px solid var(--primary)' }}>
              <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{successMsg}</p>
              {tempPassword && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '1.05rem', color: '#333' }}>{tempPassword}</span>
                  <button type="button" onClick={copyToClipboard} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'var(--primary)' }}>
                    Copy
                  </button>
                </div>
              )}
              <p className="muted" style={{ marginTop: '0.35rem' }}>Then go to Employee Management to link this user to an employee profile.</p>
            </div>
          )}
        </ChartCard>

        {/* User List */}
        <ChartCard title="All Users" subtitle={`${users.length} records found`}>
          {loading ? (
            <p className="muted">Loading users...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Email</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Role</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500 }}>Status</th>
                    <th style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...users]
                    .sort((a, b) => Number(b.is_active) - Number(a.is_active)) // Active first
                    .map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border-light)', opacity: user.is_active ? 1 : 0.6, background: user.is_active ? 'transparent' : '#f9f9f9' }}>
                      <td style={{ padding: '1rem 0.5rem' }}>{user.email}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>
                        <span className="pill soft" style={{ fontSize: '0.8rem' }}>{user.role}</span>
                      </td>
                      <td style={{ padding: '1rem 0.5rem' }}>
                        {user.is_active ? (
                          <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Active</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>Inactive</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleToggleStatus(user)}
                          style={{ 
                            background: 'none', 
                            border: '1px solid ' + (user.is_active ? '#orange' : 'var(--primary)'), 
                            color: user.is_active ? '#ff9800' : 'var(--primary)', 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            minWidth: '80px',
                            borderColor: user.is_active ? '#ff9800' : 'var(--primary)'
                          }}
                        >
                          {user.is_active ? 'Disable' : 'Enable'}
                        </button>
                        {/* Delete button removed as per request */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ChartCard>
      </div>
    </DashboardShell>
  )
}

export default UserManagementPage
