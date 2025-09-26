import React, { useEffect, useState } from 'react'
import api from '../api/client'
import { useNavigate } from 'react-router-dom'

const CreateTask = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get('/user/list?limit=1000')
        setUsers(res.data.users || [])
      } catch (e) {
        // handle silently
      }
    }
    loadUsers()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!dueDate) {
      setError('Please select a due date')
      return
    }
    const selected = new Date(dueDate)
    const today = new Date()
    today.setHours(0,0,0,0)
    if (selected < today) {
      setError('Due date cannot be before today')
      return
    }
    setLoading(true)
    try {
      await api.post('/task/create', { title, description, priority, dueDate, assignedTo })
      navigate('/admin/tasks')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 rounded-2xl shadow-lg p-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create a New Task</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              placeholder="Task title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              placeholder="Write task details..." 
              rows={4} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              min={new Date().toISOString().slice(0,10)} 
            />
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
            <select 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
              value={assignedTo} 
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Assignee</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-4">
            <button 
              disabled={loading} 
              className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-60"
            >
              {loading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask