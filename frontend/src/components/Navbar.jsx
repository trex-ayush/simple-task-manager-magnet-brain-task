import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="font-extrabold text-rose-600 text-xl tracking-tight"
          >
            TaskFlow
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-12 hidden md:flex items-center gap-6">
            {user && (
              <Link
                to="/tasks"
                className="text-gray-700 hover:text-rose-600 transition"
              >
                My Tasks
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin/tasks"
                className="text-gray-700 hover:text-rose-600 transition"
              >
                All Tasks
              </Link>
            )}
            {user && (
              <Link
                to="/profile"
                className="text-gray-700 hover:text-rose-600 transition"
              >
                Profile
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-rose-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg border border-orange-200 text-gray-700 hover:bg-orange-50 transition shadow-sm"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 pb-4 border-t border-orange-200">
            <div className="flex flex-col gap-3 pt-4">
              {user && (
                <Link
                  to="/tasks"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-rose-600 transition"
                >
                  My Tasks
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin/tasks"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-rose-600 transition"
                >
                  All Tasks
                </Link>
              )}
              {user && (
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="text-gray-700 hover:text-rose-600 transition"
                >
                  Profile
                </Link>
              )}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="text-gray-700 hover:text-rose-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-sm w-fit"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="px-4 py-2 rounded-lg border border-orange-200 text-gray-700 hover:bg-orange-50 transition shadow-sm w-fit"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
