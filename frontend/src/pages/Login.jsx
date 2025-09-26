import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // new state for toggling password visibility
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div className="hidden md:block bg-gradient-to-br from-rose-400 to-orange-500 text-white rounded-3xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="mt-3 text-blue-100">
            Sign in to access your tasks, update progress, and stay aligned with
            your team.
          </p>
          <div className="mt-6 space-y-2 text-blue-100">
            <div>• Secure cookie-based authentication</div>
            <div>• Update task status in one click</div>
            <div>• Admin tools for managing work</div>
          </div>
        </div>
        <div className="bg-white border-2 border-orange-100 rounded-3xl shadow-xl p-12">
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                className="w-full border rounded-lg px-4 py-3 text-base"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                className="w-full border rounded-lg px-4 py-3 text-base pr-16"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 text-white px-5 py-3 text-base font-medium disabled:opacity-60 hover:bg-orange-600"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-700">
            No account?{" "}
            <Link className="text-rose-600" to="/register">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
