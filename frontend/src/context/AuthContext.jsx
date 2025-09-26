import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import api from '../api/client'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get('/user/profile')
      setUser(res.data.user)
    } catch (_) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const login = useCallback(async (email, password) => {
    const res = await api.post('/user/login', { email, password })
    setUser(res.data.user)
    return res.data
  }, [])

  const register = useCallback(async ({ name, email, password, role, adminKey }) => {
    const res = await api.post('/user/register', { name, email, password, role, adminKey })
    return res.data
  }, [])

  const logout = useCallback(async () => {
    await api.post('/user/logout')
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, loading, login, register, logout, fetchProfile, isAdmin: user?.role === 'admin' }), [user, loading, login, register, logout, fetchProfile])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}





