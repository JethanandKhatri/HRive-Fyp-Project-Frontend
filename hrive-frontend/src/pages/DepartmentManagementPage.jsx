import React, { useEffect, useState } from 'react'
import DashboardShell from '../components/layout/DashboardShell'
import ChartCard from '../components/ui/ChartCard'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { SUPABASE_FUNCTIONS_BASE } from '../lib/supabaseClient'

function DepartmentManagementPage() {
  const { role, logout } = useAuth()
  const navigate = useNavigate()
  
  // Data State
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([]) // [NEW] Store employees for finding head
  const [users, setUsers] = useState([]) // Store app users to assign as head
  
  // UI State
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [creating, setCreating] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [formError, setFormError] = useState('')
  
  // Edit & Dropdown State
  const [editingId, setEditingId] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    head_id: '' // [NEW]
  })

  // Auth Helper
  const getToken = () => localStorage.getItem('hrive_access_token')
  const handleLogout = () => { logout(); navigate('/login'); }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.action-menu-container')) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('click', closeDropdown)
    return () => document.removeEventListener('click', closeDropdown)
  }, [])

  // Fetch Data
  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const token = getToken()
      if (!token) {
        console.error("No auth token found in localStorage")
        setError("Authentication token missing. Please login again.")
        return
      }
      
      const headers = { 'Authorization': `Bearer ${token}` }

      console.log("Fetching data...")
      // Fetch both departments and employees (to select head)
      const deptPromise = fetch(`${SUPABASE_FUNCTIONS_BASE}/departments`, { headers })
      // Employees: use create-employee (GET) to avoid 404s on get-employees
      const empPromise = fetch(`${SUPABASE_FUNCTIONS_BASE}/create-employee`, { headers })
      const userPromise = fetch(`${SUPABASE_FUNCTIONS_BASE}/create-user`, { headers })

      const [deptRes, empRes, userRes] = await Promise.all([deptPromise, empPromise, userPromise])

      let empData = { employees: [] }
      if (empRes.ok) {
        empData = await empRes.json()
      }
      
      let deptData = { departments: [] }
      let userData = { users: [] }

      if (deptRes.ok) {
        deptData = await deptRes.json()
        console.log("Departments fetched:", deptData)
      } else {
         console.error('Departments endpoint failed:', deptRes.status)
      }

      if (!empRes.ok) {
         console.warn('Employees fetch failed (Department Head selection may be empty)')
      }

      if (userRes.ok) {
         userData = await userRes.json()
      } else {
         console.warn('Users fetch failed (Department Head selection may be empty)')
      }

      setDepartments(deptData.departments || [])
      setEmployees(empData.employees || empData || [])
      setUsers(userData.users || [])

    } catch (err) {
      console.error("Fetch error:", err)
      setError(err.message || 'Failed to load data. Ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEdit = (dept) => {
    setEditingId(dept.id)
    setFormData({
      name: dept.name || dept.department_name || '',
      description: dept.description || '',
      head_id: dept.head_id || dept.manager_id || '' // Try to map existing head
    })
    setActiveDropdown(null)
    setFormError('')
    setSuccessMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormData({ name: '', description: '', head_id: '' })
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCreating(true)
    setFormError('')
    setSuccessMsg('')

    try {
      const token = getToken()
      // Backend validation requires a head_id when updating an existing department
      if (editingId && !formData.head_id) {
        setCreating(false)
        setFormError('Please select a Department Head before updating.')
        return
      }
      
      // Build payload - always include head_id, use null if empty
      const payload = {
        name: formData.name,
        description: formData.description,
        head_id: formData.head_id || null
      }
      
      console.log('Submitting department:', { editingId, payload })

      let url = `${SUPABASE_FUNCTIONS_BASE}/departments`
      let method = 'POST'

      if (editingId) {
        url = `${SUPABASE_FUNCTIONS_BASE}/departments?id=${editingId}`
        method = 'PATCH' 
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
      try { data = await res.json() } catch (e) { console.error("Non-JSON", e) }
      
      console.log('Backend response:', { status: res.status, data })

      if (!res.ok) {
        throw new Error(data.error || data.message || `Failed to ${editingId ? 'update' : 'create'} department`)
      }

      setSuccessMsg(`Department ${editingId ? 'updated' : 'created'} successfully!`)
      
      if (editingId) {
        handleCancelEdit()
      } else {
        setFormData({ name: '', description: '', head_id: '' })
      }
      
      fetchData() // Refresh list
    } catch (err) {
      setFormError(err.message)
    } finally {
      setCreating(false)
    }
  }

  const handleToggleStatus = async (dept) => {
    const isActive = dept.is_active !== false
    const action = isActive ? 'deactivate' : 'activate'
    if (!window.confirm(`Are you sure you want to ${action} this department?`)) return
    setActiveDropdown(null)

    try {
      const token = getToken()
      const res = await fetch(`${SUPABASE_FUNCTIONS_BASE}/departments?id=${dept.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: !isActive })
      })

      let data = {}
      const text = await res.text()
      try {
         data = text ? JSON.parse(text) : {}
      } catch (e) { /* ignore parse error */ }

      if (!res.ok) {
        throw new Error(data.error || data.message || `Failed to ${action} (Status: ${res.status}) - ${text.substring(0, 80)}...`)
      }

      setSuccessMsg(`Department ${action}d`)
      fetchData()
    } catch (err) {
      console.error(err)
      setFormError(err.message)
    }
  }

  const handleDelete = async (dept) => {
    if (!window.confirm('Delete this department permanently? This cannot be undone.')) return
    setActiveDropdown(null)

    try {
      const token = getToken()
      const res = await fetch(`${SUPABASE_FUNCTIONS_BASE}/departments?id=${dept.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      let data = {}
      const text = await res.text()
      try {
         data = text ? JSON.parse(text) : {}
      } catch (e) { /* ignore parse error */ }

      if (!res.ok) {
        throw new Error(data.error || data.message || `Failed to delete (Status: ${res.status}) - ${text.substring(0, 80)}...`)
      }

      setSuccessMsg('Department deleted')
      fetchData()
    } catch (err) {
      console.error(err)
      setFormError(err.message)
    }
  }

  const toggleDropdown = (id) => {
    if (activeDropdown === id) setActiveDropdown(null)
    else setActiveDropdown(id)
  }

  return (
    <DashboardShell portal="admin" onLogout={handleLogout}>
      <div className="portal-tabs">
        <span className="portal-tab active">Department Management</span>
      </div>

      <div className="hero-banner">
        <div>
          <p className="tag">Admin Portal</p>
          <h2>Manage Departments</h2>
          <p className="muted">Add, update, and disable departments.</p>
        </div>
      </div>

      <div className="content-grid">
        {/* CREATE/EDIT FORM */}
        <ChartCard title={editingId ? "Edit Department" : "New Department"}>
          <form onSubmit={handleSubmit} className="auth-form" style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            <label>
              Department Name
              <input name="name" value={formData.name} onChange={handleChange} required placeholder="Engineering" style={{width: '100%'}} />
            </label>

            <label>
              Description (Optional)
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Department description..." style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)'}} rows={3} />
            </label>

            <label>
              Department Head (Required when editing)
              <select name="head_id" value={formData.head_id} onChange={handleChange} required={Boolean(editingId)} style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)'}}>
                 <option value="">Select Department Head</option>
                 {employees.map(e => {
                    const u = users.find(u => u.id === e.user_id)
                    const label = u ? `${e.full_name} - ${u.email}` : e.full_name
                    return (
                      <option key={e.id} value={e.id}>{label}</option>
                    )
                 })}
              </select>
              <small className="muted">Shows employee name with linked user email for clarity.</small>
            </label>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button type="submit" className="primary" disabled={creating}>
                    {creating ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Department' : 'Create Department')}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} style={{ background: 'none', border: '1px solid var(--text-muted)', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                )}
            </div>
          </form>

          {formError && <p style={{color: 'red', marginTop: '1rem'}}>{formError}</p>}
          {successMsg && <p style={{color: 'green', marginTop: '1rem'}}>{successMsg}</p>}
        </ChartCard>

        {/* LIST */}
        <ChartCard title="All Departments" subtitle={`${departments.length} departments`}>
            {loading ? <p>Loading...</p> : (
                 <div style={{ overflowX: 'auto', minHeight: '300px' }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                   <thead>
                     <tr style={{ borderBottom: '1px solid var(--border)' }}>
                       <th style={{ padding: '0.5rem' }}>Name</th>
                       <th style={{ padding: '0.5rem' }}>Description</th>
                       <th style={{ padding: '0.5rem' }}>Status</th>
                       <th style={{ padding: '0.5rem', width: '100px' }}>Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {departments.map((d, i) => {
                       const isActive = d.is_active !== false // Default to active if undefined
                       return (
                       <tr key={d.id || i} style={{ borderBottom: '1px solid var(--border-light)', opacity: isActive ? 1 : 0.6, background: isActive ? 'transparent' : '#f9f9f9' }}>
                         <td style={{ padding: '0.5rem' }}><strong>{d.name || d.department_name}</strong></td>
                         <td style={{ padding: '0.5rem' }}>{d.description || '-'}</td>
                         <td style={{ padding: '0.5rem' }}>
                           {isActive ? (
                             <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Active</span>
                           ) : (
                             <span style={{ color: 'var(--text-muted)' }}>Inactive</span>
                           )}
                         </td>
                                                  <td style={{ padding: '0.5rem', position: 'relative' }}>
                           <div className="action-menu-container">
                             <button 
                               onClick={(e) => { e.stopPropagation(); toggleDropdown(d.id); }}
                               style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--text-muted)', padding: '4px' }}
                             >
                               ...
                             </button>
                             {activeDropdown === d.id && (
                               <div style={{
                                 position: 'absolute',
                                 right: '0',
                                 top: '100%',
                                 background: '#fff',
                                 border: '1px solid var(--border)',
                                 borderRadius: '8px',
                                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                 zIndex: 100,
                                 minWidth: '140px',
                                 display: 'flex',
                                 flexDirection: 'column',
                                 overflow: 'hidden'
                               }}>
                                 <button 
                                   onClick={() => handleEdit(d)}
                                   style={{ padding: '10px 12px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid var(--border-light)', fontSize: '0.9rem' }}
                                   onMouseEnter={(e) => e.target.style.background = '#f7fafc'}
                                   onMouseLeave={(e) => e.target.style.background = 'none'}
                                 >
                                   Edit
                                 </button>
                                 <button 
                                   onClick={() => handleToggleStatus(d)}
                                   style={{ padding: '10px 12px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid var(--border-light)', fontSize: '0.9rem', color: d.is_active === false ? 'var(--primary)' : '#ff9800' }}
                                   onMouseEnter={(e) => e.target.style.background = '#f7fafc'}
                                   onMouseLeave={(e) => e.target.style.background = 'none'}
                                 >
                                   {d.is_active === false ? 'Activate' : 'Deactivate'}
                                 </button>
                                 <button 
                                   onClick={() => handleDelete(d)}
                                   style={{ padding: '10px 12px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'red', fontSize: '0.9rem' }}
                                   onMouseEnter={(e) => e.target.style.background = '#fff5f5'}
                                   onMouseLeave={(e) => e.target.style.background = 'none'}
                                 >
                                   Delete
                                 </button>
                               </div>
                             )}
                           </div>
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

export default DepartmentManagementPage

