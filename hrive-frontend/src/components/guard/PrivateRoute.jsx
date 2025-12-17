import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const auth = useAuth()
  if (auth.loading) return <div className="centered">Loading...</div>
  if (!auth.isAuthed) return <Navigate to="/login" replace />
  return children
}

export default PrivateRoute
