import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'
import PriorityBadge, { getPriorityCardClass } from '../components/PriorityBadge'

const TaskDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusLoading, setStatusLoading] = useState(false)

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await api.get(`/task/${id}`)
      setTask(res.data.task)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  const updateStatus = async (status) => {
    setStatusLoading(true)
    try {
      await api.patch(`/task/status/${id}`, { status })
      await load()
    } catch (e) {
      setError(e.message)
    } finally {
      setStatusLoading(false)
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 font-medium">Loading task details...</div>
      </div>
    )

  if (!task)
    return (
      <div className="py-12 text-center text-gray-600">Task not found</div>
    )

  return (
    <div className="py-14">
      <div
        className={`max-w-5xl mx-auto border rounded-2xl shadow-lg p-12 space-y-5 transition-colors min-h-[320px] ${getPriorityCardClass(
          task.priority
        )} ${
          task.status === 'pending'
            ? '!bg-slate-50 !border-slate-200'
            : task.status === 'in-progress'
            ? '!bg-amber-50 !border-amber-200'
            : task.status === 'completed'
            ? '!bg-emerald-50 !border-emerald-200'
            : '!bg-gray-50 !border-gray-200'
        }`}
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          {task.title} <PriorityBadge priority={task.priority} />
        </h1>

        <p className="text-gray-700 mt-2">{task.description}</p>

        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-700">Priority:</span>{' '}
            {task.priority}
          </div>
          <div>
            <span className="font-medium text-gray-700">Due Date:</span>{' '}
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium text-gray-700">Status:</span>{' '}
            <span
              className={`capitalize font-medium ${
                task.status === 'completed'
                  ? 'text-green-600'
                  : task.status === 'in-progress'
                  ? 'text-yellow-600'
                  : 'text-gray-600'
              }`}
            >
              {task.status}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Assigned To:</span>{' '}
            {task.assignedTo?.name || task.assignedTo}
          </div>
          <div>
            <span className="font-medium text-gray-700">Assigned By:</span>{' '}
            {task.assignedBy?.name || task.assignedBy}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6 justify-end">
          <button
            disabled={statusLoading}
            onClick={() => updateStatus('pending')}
            className="rounded-lg bg-slate-100 text-gray-800 px-4 py-2 text-sm font-medium hover:bg-slate-200 transition"
          >
            Mark as Pending
          </button>
          <button
            disabled={statusLoading}
            onClick={() => updateStatus('in-progress')}
            className="rounded-lg bg-amber-100 text-amber-900 px-4 py-2 text-sm font-medium hover:bg-amber-200 transition"
          >
            Mark as In Progress
          </button>
          <button
            disabled={statusLoading}
            onClick={() => updateStatus('completed')}
            className="rounded-lg bg-emerald-100 text-emerald-900 px-4 py-2 text-sm font-medium hover:bg-emerald-200 transition"
          >
            Mark as Completed
          </button>

          {isAdmin && (
            <button
              onClick={() => navigate(`/admin/tasks/${id}/edit`)}
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-4 py-2 text-sm font-medium hover:from-indigo-600 hover:to-blue-700 transition-all shadow-sm"
            >
              Edit Task
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskDetails
