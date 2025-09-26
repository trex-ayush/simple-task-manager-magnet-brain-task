import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute




