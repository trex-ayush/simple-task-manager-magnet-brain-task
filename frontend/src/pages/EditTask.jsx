import React, { useEffect, useState } from "react";
import api from "../api/client";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [taskRes, usersRes] = await Promise.all([
          api.get(`/task/${id}`),
          api.get("/user/list?limit=1000"),
        ]);
        const t = taskRes.data.task;
        setTitle(t.title);
        setDescription(t.description);
        setPriority(t.priority);
        setDueDate(t.dueDate?.slice(0, 10) || "");
        setAssignedTo(t.assignedTo?._id || t.assignedTo);
        setUsers(usersRes.data.users || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!dueDate) {
      setError("Please select a due date");
      return;
    }
    const selected = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      setError("Due date cannot be before today");
      return;
    }
    try {
      await api.put(`/task/update/${id}`, {
        title,
        description,
        priority,
        dueDate,
        assignedTo,
      });
      navigate(`/tasks/${id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  const onDelete = async () => {
    if (!confirm("Delete this task?")) return;
    try {
      await api.delete(`/task/delete/${id}`);
      navigate("/admin/tasks");
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 font-medium">Loading...</div>
      </div>
    );

  return (
    <div className="py-14">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-lg p-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h1>
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
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="Enter task description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().slice(0, 10)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Assignee</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg bg-gray-200 text-gray-700 px-5 py-2.5 font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2.5 font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md"
            >
              Delete Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
