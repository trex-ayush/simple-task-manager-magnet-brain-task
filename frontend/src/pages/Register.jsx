import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // <-- Add this

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({
        name,
        email,
        password,
        role,
        adminKey: role === "admin" ? adminKey : undefined,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div className="hidden md:block bg-gradient-to-br from-rose-400 to-orange-500 text-white rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold">Create your account</h2>
          <p className="mt-3 text-orange-100">
            Join your team and start organizing work with priorities, due dates,
            and status at a glance.
          </p>
          <div className="mt-6 space-y-2 text-orange-100">
            <div>• Assign tasks and set priorities</div>
            <div>• Admins can manage teams at scale</div>
            <div>• Fast and secure cookie sessions</div>
          </div>
        </div>
        <div className="w-full bg-white border-2 border-orange-100 rounded-3xl shadow-xl p-12">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Register
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                className="w-full border border-orange-200 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className="w-full border border-orange-200 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password input with toggle button */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                className="w-full border border-orange-200 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors pr-16"
                placeholder="Enter a strong password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform translate-y-2 flex items-center px-3 text-orange-500 hover:text-orange-600 font-medium text-sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                className="w-full border border-orange-200 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {role === "admin" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Key
                </label>
                <input
                  className="w-full border border-orange-200 rounded-xl px-5 py-3 text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-colors"
                  placeholder="Enter admin secret key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 text-white font-semibold py-3 text-base hover:bg-orange-600 transition-all shadow-md disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-rose-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
