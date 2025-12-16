import React, { useEffect, useState } from 'react'
import DashboardShell from '../components/layout/DashboardShell'
import ChartCard from '../components/ui/ChartCard'
import { useAuth } from '../context/AuthContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { portalMeta } from '../data/portalData'

const SUPABASE_FUNCTIONS_BASE = '/functions/v1'
// Backend handles GET/POST/PUT on the same function (create-employee)
const EMPLOYEE_ENDPOINT = `${SUPABASE_FUNCTIONS_BASE}/create-employee`

function EmployeeManagementPage() {
  const { role, logout } = useAuth()
  const navigate = useNavigate()
  const { portalId } = useParams()
  const allowedPortals = ['admin', 'hr']
  const normalizedPortalId = (portalId || '').toLowerCase()
  const normalizedRole = (role || '').toLowerCase()
  const portal = allowedPortals.includes(normalizedPortalId) ? normalizedPortalId : 'admin'
  
  // Data State
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [users, setUsers] = useState([])
  const [userLoadError, setUserLoadError] = useState('')
  
  // UI State
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [formError, setFormError] = useState('')
  // Inline user creation (for HR when no unlinked users exist)
  const [inlineUserEmail, setInlineUserEmail] = useState('')
  const [inlineUserRole, setInlineUserRole] = useState('EMPLOYEE')
  const [inlineCreating, setInlineCreating] = useState(false)
  const [inlineUserError, setInlineUserError] = useState('')
  const [inlineUserSuccess, setInlineUserSuccess] = useState('')
  const [inlineTempPassword, setInlineTempPassword] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    user_id: '',
    full_name: '',
    phone: '',
    cnic: '',
    department_id: '',
    designation: '',
    manager_id: ''
  })

  // Auth Helper
  const getToken = () => localStorage.getItem('hrive_access_token')
  const handleLogout = () => { logout(); navigate('/login'); }

  // Fetch Data
  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const token = getToken()
      const headers = { 'Authorization': `Bearer ${token}` }
      setUserLoadError('')

      // Parallel fetch for dependencies
      const empPromise = fetch(`${EMPLOYEE_ENDPOINT}`, { headers })
      const deptPromise = fetch(`${SUPABASE_FUNCTIONS_BASE}/departments`, { headers })
      const userPromise = fetch(`${SUPABASE_FUNCTIONS_BASE}/create-user`, { headers })

      const [empRes, deptRes, userRes] = await Promise.all([empPromise, deptPromise, userPromise])

      let empData = {}
      let empText = ''

      if (empRes.ok) {
        empData = await empRes.json()
      } else {
        empText = await empRes.text()
        console.warn('Employees fetch failed', empRes.status, empText)
      }

      // Handle responses
      if (!empRes.ok) {
        console.warn('Employees fetch failed', empRes.status, empText)
      }
      
      // For Departments, handle if endpoint doesn't exist yet
      let deptData = { departments: [] }
      if (deptRes.ok) {
        deptData = await deptRes.json()
      } else {
         console.warn('Departments endpoint failed')
      }

      const employeesFromApi = empData.employees 
        || empData.data 
        || (empData.data && empData.data.employees)
        || empData.list 
        || empData // fallback to raw

      if (!empRes.ok) {
        setError(`Failed to load employees (status ${empRes.status}). ${empText?.slice(0, 120)}`)
      } else {
        setError('')
      }

      const normalizedEmployees = Array.isArray(employeesFromApi)
        ? employeesFromApi.map(e => ({
            ...e,
            // Ensure user_id is present even if the API nests or renames it
            user_id: e.user_id || e.userId || e.user_uuid || e.user?.id || e.user?.user_id || e.user?.uuid,
          }))
        : []

      setEmployees(normalizedEmployees)
      setDepartments(deptData.departments || deptData || [])
      if (userRes.ok && userRes.status !== 204) {
        try {
          const userData = await userRes.json()
          setUsers(userData.users || userData || [])
        } catch (e) {
          console.error('Users parse error', e)
          setUserLoadError('Unable to parse users list.')
          setUsers([])
        }
      } else {
        const userText = await userRes.text()
        setUserLoadError(`Unable to load users (status ${userRes.status}).`)
        console.warn('Users fetch failed', userRes.status, userText)
        setUsers([])
      }

    } catch (err) {
      console.error(err)
      setError('Failed to load data. Ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [portalId])

  // State for editing
  const [editingId, setEditingId] = useState(null)

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEdit = (employee) => {
    setEditingId(employee.id)
    setFormData({
      user_id: employee.user_id || employee.userId || employee.user?.id || employee.user?.user_id || employee.id || '',
      full_name: employee.full_name || '',
      phone: employee.phone || '',
      cnic: employee.cnic || '',
      department_id: employee.department_id || '',
      designation: employee.designation || '',
      manager_id: employee.manager_id || ''
    })
    setSuccessMsg('')
    setFormError('')
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({
      user_id: '',
      full_name: '',
      phone: '',
      cnic: '',
      department_id: '',
      designation: '',
      manager_id: ''
    })
    setFormError('')
    setSuccessMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCreating(true)
    setFormError('')
    setSuccessMsg('')

    try {
      const token = getToken()
      const userId = formData.user_id || formData.userId || (editingId ? editingId : '')
      if (!userId) throw new Error('Please select an existing user account before saving.')
      
      // Build payload; for updates we omit user_id (backend uses path id)
      const basePayload = {
        full_name: formData.full_name,
        phone: formData.phone,
        cnic: formData.cnic,
        department_id: formData.department_id,
        designation: formData.designation,
        manager_id: formData.manager_id || null,
      }

      const payload = editingId
        ? basePayload // backend uses path id; no user_id column
        : { ...basePayload, user_id: userId }

      // Backend: create/update via create-employee (supports POST/PUT)
      let url = `${EMPLOYEE_ENDPOINT}`
      let method = 'POST'

      if (editingId) {
        url = `${EMPLOYEE_ENDPOINT}?id=${editingId}`
        method = 'PUT'
      }

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      let data = {}
      const text = await res.text()
      try {
        data = text ? JSON.parse(text) : {}
      } catch (e) {
        console.error('Failed to parse response:', text)
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || `Failed to ${editingId ? 'update' : 'create'} employee (Status: ${res.status})`)
      }

      setSuccessMsg(`Employee ${editingId ? 'updated' : 'created'} successfully!`)
      if (editingId) handleCancelEdit() // Reset form after edit
      else {
        // Reset form after create
        setFormData({
          user_id: '',
          full_name: '',
          phone: '',
          cnic: '',
          department_id: '',
          designation: '',
          manager_id: ''
        })
      }
      fetchData() // Refresh list
    } catch (err) {
      console.error('Employee submit error:', err)
      setFormError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleInlineUserCreate = async () => {
    if (normalizedRole !== 'admin') {
      setInlineUserError('Only admin can create users. Please ask an admin to add the user first.')
      return
    }
    setInlineCreating(true)
    setInlineUserError('')
    setInlineUserSuccess('')
    setInlineTempPassword('')
    try {
      const token = getToken()
      if (!token) throw new Error('Auth token missing. Please login again.')
      if (!inlineUserEmail) throw new Error('User email is required to create a new user.')

      const res = await fetch(`${SUPABASE_FUNCTIONS_BASE}/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email: inlineUserEmail, role: (inlineUserRole || '').toUpperCase() }),
      })

      let data = {}
      const text = await res.text()
      try { data = text ? JSON.parse(text) : {} } catch (e) { console.error('Parse user error', text) }
      if (!res.ok) throw new Error(data.error || data.message || `Failed to create user (Status: ${res.status})`)

      const createdUser = data.user || { id: data.id, email: inlineUserEmail, role: inlineUserRole }
      setUsers(prev => {
        const exists = prev.some(u => u.id === createdUser.id)
        return exists ? prev : [...prev, createdUser]
      })
      if (createdUser.id) {
        setFormData(prev => ({ ...prev, user_id: createdUser.id }))
      }
      setInlineTempPassword(data.temp_password || '')
      setInlineUserSuccess('User created and ready to link.')
      setInlineUserEmail('')
      setInlineUserRole('EMPLOYEE')
    } catch (err) {
      console.error('Inline user create error:', err)
      setInlineUserError(err.message)
    } finally {
      setInlineCreating(false)
    }
  }

  const handleToggleStatus = async (employee) => {
    const action = employee.is_active !== false ? 'disable' : 'enable' // Default to active if undefined
    if (!window.confirm(`Are you sure you want to ${action} this employee?`)) return

    try {
        const token = getToken()
        const newStatus = action === 'enable' ? 'ACTIVE' : 'INACTIVE'
        
        const res = await fetch(`${EMPLOYEE_ENDPOINT}?id=${employee.id}`, {
            method: 'PUT',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              status: newStatus,
              is_active: newStatus === 'ACTIVE'
            })
        })
        
        let data = {}
        const text = await res.text()
        try {
          data = text ? JSON.parse(text) : {}
        } catch (e) {
          console.error('Failed to parse response:', text)
        }

        if (!res.ok) {
          throw new Error(data.error || data.message || `Failed to ${action} employee (Status: ${res.status})`)
        }
        
        setSuccessMsg(`Employee ${action}d successfully`)
        fetchData()
    } catch(err) {
        console.error('Toggle status error:', err)
        setFormError(err.message)
    }
  }

  if (!portalId || !allowedPortals.includes(normalizedPortalId)) {
    return <Navigate to={`/portal/${normalizedRole || 'admin'}`} replace />
  }
  if (role && normalizedPortalId !== normalizedRole) {
    return <Navigate to={`/portal/${normalizedRole || 'admin'}`} replace />
  }

  return (
    <DashboardShell portal={portal} onLogout={handleLogout}>
      <div className="portal-tabs">
        <span className="portal-tab active">Employee Management</span>
      </div>

      <div className="hero-banner">
        <div>
          <p className="tag">{portalMeta[portal]?.label || 'Portal'} Portal</p>
          <h2>Manage Employees</h2>
          <p className="muted">Add, view, and update employee profiles.</p>
        </div>
      </div>

      <div className="content-grid">
        {/* CREATE/EDIT FORM */}
        <ChartCard title={editingId ? "Edit Employee" : "New Employee Onboarding"}>
          {(() => {
            const usedUserIds = new Set(
              employees
                .map(e => e.user_id || e.userId || e.user?.id || e.user?.user_id || e.user?.uuid)
                .filter(Boolean)
            )
            const availableUsers = userLoadError
              ? []
              : users.filter(u => !usedUserIds.has(u.id) || (editingId && formData.user_id === u.id))
            // If filtering leaves none, fall back to showing all users so HR can still pick (may include already-linked users)
            const displayUsers = availableUsers.length > 0 ? availableUsers : users
            const noAvailableUsers = !userLoadError && availableUsers.length === 0
            const userSelectDisabled = editingId || (!!userLoadError && normalizedRole !== 'admin')
            const currentEmployee = editingId ? employees.find(e => e.id === editingId) : null
            const linkedUserId = formData.user_id || currentEmployee?.user_id || currentEmployee?.user?.id || currentEmployee?.user?.user_id
            const linkedUserEmail = currentEmployee?.user?.email || displayUsers.find(u => u.id === linkedUserId)?.email
            const linkedUserRole = currentEmployee?.user?.role || displayUsers.find(u => u.id === linkedUserId)?.role
            const currentUserOption = linkedUserId ? { id: linkedUserId, email: linkedUserEmail, role: linkedUserRole } : null
            const finalUserOptions = [...displayUsers]
            if (currentUserOption && !finalUserOptions.some(u => u.id === currentUserOption.id)) {
              finalUserOptions.unshift(currentUserOption)
            }
            return (
          <form onSubmit={handleSubmit} className="auth-form" style={{ maxWidth: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <label style={{gridColumn: '1 / -1'}}>
              Link User Account
              <select
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                required={!userSelectDisabled}
                disabled={userSelectDisabled}
                style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)'}}
              >
                <option value="">Select existing user (create in User Management first)</option>
                {!userSelectDisabled && finalUserOptions.map(u => (
                    <option key={u.id} value={u.id}>{u.email || u.id} ({u.role || 'linked'})</option>
                ))}
              </select>
              <small className="muted">
                {editingId
                  ? 'User account is locked while editing; it was already linked.'
                  : 'Create the user in User Management first, then link it here. Already-linked users are hidden. If none are available, we temporarily show all users so you can still link.'}
              </small>
              {userLoadError && normalizedRole !== 'admin' && !editingId && (
                <div style={{ marginTop: '0.5rem', padding: '0.75rem', border: '1px solid #ffd7d7', borderRadius: '8px', background: '#fff7f7', color: '#d32f2f' }}>
                  Users cannot be listed for this role ({userLoadError}). Ask an Admin to provide the user ID and enter it below.
                </div>
              )}
              {userSelectDisabled && (
                <div style={{ marginTop: '0.5rem' }}>
                  <label>
                    User ID (provided by Admin)
                    <input
                      name="user_id"
                      value={formData.user_id}
                      onChange={handleChange}
                      required
                      placeholder="Paste user ID from admin"
                      style={{ width: '100%', marginTop: '0.25rem' }}
                    />
                  </label>
                  <small className="muted">Admin must create the user and share the user ID. Paste it here to link.</small>
                </div>
              )}
              {noAvailableUsers && !userSelectDisabled && (
                <div style={{ marginTop: '0.5rem', padding: '0.75rem', border: '1px solid #ffd7d7', borderRadius: '8px', background: '#fff7f7' }}>
                  {normalizedRole === 'admin' ? (
                    <>
                      <p style={{ color: '#d32f2f', marginBottom: '0.5rem' }}>No unlinked users found. Create a user now:</p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.5rem' }}>
                        <label>
                          New User Email
                          <input
                            type="email"
                            value={inlineUserEmail}
                            onChange={(e) => setInlineUserEmail(e.target.value)}
                            placeholder="user@example.com"
                            style={{ width: '100%' }}
                          />
                        </label>
                        <label>
                          Role
                          <select
                            value={inlineUserRole}
                            onChange={(e) => setInlineUserRole(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
                          >
                            <option value="ADMIN">Admin</option>
                            <option value="HR">HR</option>
                            <option value="MANAGER">Manager</option>
                            <option value="EMPLOYEE">Employee</option>
                          </select>
                        </label>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button type="button" className="primary" onClick={handleInlineUserCreate} disabled={inlineCreating}>
                          {inlineCreating ? 'Creating user...' : 'Create User & Link'}
                        </button>
                      </div>
                      {inlineUserError && <p style={{ color: '#d32f2f', marginTop: '0.25rem' }}>{inlineUserError}</p>}
                      {inlineUserSuccess && (
                        <div style={{ marginTop: '0.25rem', color: 'var(--primary)' }}>
                          {inlineUserSuccess}
                          {inlineTempPassword && (
                            <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace' }}>
                              <span>{inlineTempPassword}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <p style={{ color: '#d32f2f', margin: 0 }}>
                      No unlinked users found. Ask an Admin to create a user in User Management, then return here to link it.
                    </p>
                  )}
                </div>
              )}
            </label>
 
            <label>
              Full Name
              <input name="full_name" value={formData.full_name} onChange={handleChange} required placeholder="John Doe" style={{width: '100%'}} />
            </label>

            <label>
              Phone
              <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="0300..." style={{width: '100%'}} />
            </label>

            <label>
              CNIC
              <input name="cnic" value={formData.cnic} onChange={handleChange} required placeholder="42101..." style={{width: '100%'}} />
            </label>

            <label>
              Designation
              <input name="designation" value={formData.designation} onChange={handleChange} required placeholder="HR Executive" style={{width: '100%'}} />
            </label>

            <label>
              Department
              <select name="department_id" value={formData.department_id} onChange={handleChange} required style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)'}}>
                <option value="">Select Department</option>
                {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </label>

            <label>
              Manager (Optional)
              <select name="manager_id" value={formData.manager_id} onChange={handleChange} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)'}}>
                <option value="">No Manager</option>
                {employees.map(e => (
                    <option key={e.id} value={e.id}>{e.full_name}</option>
                ))}
              </select>
            </label>
            {/* For new employees we link to an existing user created from User Management */}

            <div style={{gridColumn: '1 / -1', display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <button type="submit" className="primary" disabled={creating}>
                    {creating ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Employee' : 'Create Employee')}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} style={{background: 'none', border: '1px solid var(--text-muted)', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer'}}>
                    Cancel
                  </button>
                )}
            </div>
          </form>
            )
          })()}

          {formError && <p style={{color: 'red', marginTop: '1rem'}}>{formError}</p>}
          {successMsg && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(30, 202, 195, 0.1)', borderRadius: 'var(--radius)', border: '1px solid var(--primary)' }}>
              <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom:'0.5rem' }}>{successMsg}</p>
            </div>
          )}
        </ChartCard>

        {/* LIST */}
        <ChartCard title="Employee Directory" subtitle={`${employees.length} employees`}>
            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #ffcdd2' }}>
                {error}
              </div>
            )}
            
            {loading ? <p>Loading...</p> : (
                 <div style={{ overflowX: 'auto' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                   <thead>
                     <tr style={{ borderBottom: '1px solid var(--border)' }}>
                       <th style={{ padding: '0.5rem' }}>Name</th>
                       <th style={{ padding: '0.5rem' }}>Designation</th>
                       <th style={{ padding: '0.5rem' }}>Phone</th>
                       <th style={{ padding: '0.5rem' }}>Status</th>
                       <th style={{ padding: '0.5rem', textAlign: 'right' }}>Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {[...employees]
                       .sort((a, b) => {
                         const aActive = a.is_active !== false
                         const bActive = b.is_active !== false
                         return Number(bActive) - Number(aActive)
                       })
                       .map(e => {
                         const isActive = e.is_active !== false
                         return (
                       <tr key={e.id} style={{ borderBottom: '1px solid var(--border-light)', opacity: isActive ? 1 : 0.6, background: isActive ? 'transparent' : '#f9f9f9' }}>
                         <td style={{ padding: '0.5rem' }}>
                            <strong>{e.full_name}</strong><br/>
                            <span className="muted">{e.cnic}</span>
                         </td>
                         <td style={{ padding: '0.5rem' }}>{e.designation}</td>
                         <td style={{ padding: '0.5rem' }}>{e.phone}</td>
                         <td style={{ padding: '0.5rem' }}>
                           {isActive ? (
                             <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Active</span>
                           ) : (
                             <span style={{ color: 'var(--text-muted)' }}>Inactive</span>
                           )}
                         </td>
                         <td style={{ padding: '0.5rem', textAlign: 'right' }}>
                            <button onClick={() => handleEdit(e)} style={{color: 'var(--primary)', background: 'none', border:'none', cursor:'pointer', marginRight: '1rem'}}>Edit</button>
                            <button 
                              onClick={() => handleToggleStatus(e)}
                              style={{
                                color: isActive ? '#ff9800' : 'var(--primary)',
                                background: 'none',
                                border: '1px solid ' + (isActive ? '#ff9800' : 'var(--primary)'),
                                borderRadius: '4px',
                                padding: '0.25rem 0.75rem',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                minWidth: '80px'
                              }}
                            >
                              {isActive ? 'Disable' : 'Enable'}
                            </button>
                         </td>
                       </tr>
                     )})
                     }
                   </tbody>
                 </table>
               </div>
            )}
        </ChartCard>
      </div>
    </DashboardShell>
  )
}

export default EmployeeManagementPage
