import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MyTasks from './pages/MyTasks'
import TaskDetails from './pages/TaskDetails'
import AdminTasks from './pages/AdminTasks'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import Profile from './pages/Profile'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
            <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetails /></ProtectedRoute>} />
            <Route path="/admin/tasks" element={<ProtectedRoute><AdminTasks /></ProtectedRoute>} />
            <Route path="/admin/tasks/create" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
            <Route path="/admin/tasks/:id/edit" element={<ProtectedRoute><EditTask /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
