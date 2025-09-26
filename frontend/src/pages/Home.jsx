import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import img from "../assects/img1.jpeg";
import img1 from "../assects/img2.jpg";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="py-2 px-2 max-w-7xl mx-auto space-y-28">
      <section className="bg-gradient-to-br from-rose-500 to-orange-400 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Plan, assign, and track work without friction
            </h1>
            <p className="text-lg text-orange-100">
              A minimal task manager for fast-moving teams. Keep everyone
              aligned with assignments, priorities, and due dates that actually
              stick.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/tasks"
                className="px-6 py-3 rounded-lg bg-white text-rose-700 font-semibold shadow hover:bg-rose-50 transition"
              >
                {user ? "Go to My Tasks" : "Get Started"}
              </Link>
              <Link
                to="/profile"
                className="px-6 py-3 rounded-lg border border-white/70 text-white font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center">
            <img
              src={img1}
              alt="Team Collaboration Illustration"
              className="rounded-2xl shadow-lg w-3/4 max-w-md"
            />
          </div>
        </div>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Assign & Prioritize",
            desc: "Clear owners, priorities, and due dates keep work moving.",
          },
          {
            title: "Stay on Track",
            desc: "Update status in one click and keep momentum visible.",
          },
          {
            title: "Admin Controls",
            desc: "Create, edit, and manage tasks across the organization.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-white border border-gray-100 rounded-2xl p-8 shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
            <p className="text-gray-600 mt-3">{f.desc}</p>
          </div>
        ))}
      </section>

      <section
        id="security"
        className="bg-white border border-orange-100 rounded-3xl p-12 md:p-16 shadow-xl"
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Privacy and security by default
            </h2>
            <p className="text-gray-600 text-lg">
              We use secure, httpOnly cookies for session management. Your data
              stays protected while you collaborate.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
              >
                Contact sales
              </a>
              <Link
                to="/register"
                className="px-6 py-3 rounded-lg border border-orange-200 text-gray-700 hover:bg-orange-50 transition"
              >
                Start free
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <img
              src={img}
              alt="Team Collaboration Illustration"
              className="w-48 md:w-56 lg:w-64 rounded-xl shadow-lg border border-white/20"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
