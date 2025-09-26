import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  if (!user) return <div className="p-6 text-center text-gray-500 text-lg">No profile</div>

  return (
    <div className="py-14">
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50">
            <span className="text-gray-500 font-medium">Name</span>
            <span className="text-gray-900 font-semibold">{user.name}</span>
          </div>

          <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50">
            <span className="text-gray-500 font-medium">Email</span>
            <span className="text-gray-900 font-semibold">{user.email}</span>
          </div>

          <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50">
            <span className="text-gray-500 font-medium">Role</span>
            <span className="capitalize text-sm font-medium bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
