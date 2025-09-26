import React, { useEffect, useState } from "react";
import api from "../api/client";
import { Link } from "react-router-dom";
import PriorityBadge, {
  getPriorityCardClass,
} from "../components/PriorityBadge";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const load = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/task/all");
      setTasks(res.data.tasks || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesPriority = priorityFilter
      ? task.priority === priorityFilter
      : true;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="py-12">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
        <Link
          to="/admin/tasks/create"
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md"
        >
          + Create Task
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
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

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500 font-medium">Loading all tasks...</div>
        </div>
      ) : filteredTasks.length > 0 ? (
        <ul className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTasks.map((t) => (
            <li
              key={t._id}
              className={`border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-8 space-y-5 h-auto max-w-3xl ${
                t.priority === "low"
                  ? "bg-green-50 border-green-200"
                  : t.priority === "medium"
                  ? "bg-yellow-50 border-yellow-200"
                  : t.priority === "high"
                  ? "bg-red-50 border-red-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {t.title}
                </h2>
                <PriorityBadge priority={t.priority} />
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Due: {new Date(t.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {t.assignedTo?.name || "Unassigned"}
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Status:{" "}
                  <span
                    className={`capitalize font-medium ${
                      t.status === "completed"
                        ? "text-green-600"
                        : t.status === "in-progress"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Link
                  to={`/tasks/${t._id}`}
                  className="px-4 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  View
                </Link>
                <Link
                  to={`/admin/tasks/${t._id}/edit`}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-xl shadow-sm">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.75 17h4.5m2.25 4.5l-1.125-1.5h-6.75l-1.125 1.5m8.25 0H6.375c-.621 0-1.125-.504-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125h11.25c.621 0 1.125.504 1.125 1.125v14.75c0 .621-.504 1.125-1.125 1.125z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700">
            No tasks found
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Try adjusting filters or search.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminTasks;
