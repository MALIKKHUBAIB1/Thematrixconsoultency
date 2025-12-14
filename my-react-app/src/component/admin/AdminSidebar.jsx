import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  Users,
  LogOut,
} from "lucide-react";

function AdminSidebar() {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-[#001a4d] text-white p-6 flex flex-col"
    >
      <h1 className="text-2xl font-bold mb-10 text-center">Matrix Admin</h1>

      <nav className="flex flex-col gap-4 flex-1">
        {/* Dashboard */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-700" : "hover:bg-blue-800"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {/* Services */}
        <NavLink
          to="/admin/services"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-700" : "hover:bg-blue-800"
            }`
          }
        >
          <Briefcase size={20} />
          Services
        </NavLink>

        {/* Testimonials */}
        <NavLink
          to="/admin/testimonials"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-700" : "hover:bg-blue-800"
            }`
          }
        >
          <MessageSquare size={20} />
          Testimonials
        </NavLink>

        {/* Applied Users */}
        <NavLink
          to="/admin/applied-users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-700" : "hover:bg-blue-800"
            }`
          }
        >
          <Users size={20} />
          Applied Users
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin/login";
        }}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </motion.aside>
  );
}

export default AdminSidebar;
