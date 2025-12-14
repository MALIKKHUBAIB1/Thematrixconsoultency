import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, MessageSquare } from "lucide-react";
import api, { applicationApi, adminApi } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

function StatCard({ title, value, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl transition"
    >
      <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </motion.div>
  );
}

function NavCard({ title, desc, icon: Icon, link, delay }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => navigate(link)}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition flex items-center gap-4"
    >
      <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
        <Icon size={26} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </motion.div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    applications: 0,
    services: 0,
    testimonials: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const appsRes = await applicationApi.getAllApplications();
      const testimonialRes = await adminApi.getTestimonials();
      const servicesRes = await api.get("/services");

      setStats({
        applications: appsRes?.data?.length || 0,
        testimonials: testimonialRes?.data?.length || 0,
        services: Object.keys(servicesRes.data.services || {}).length,
      });
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-[#001a4d] mb-6"
      >
        Admin Dashboard
      </motion.h1>

      {/* TOP STATS (REAL DATA) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Total Applications"
          value={stats.applications}
          icon={FileText}
          delay={0.1}
        />

        <StatCard
          title="Total Testimonials"
          value={stats.testimonials}
          icon={MessageSquare}
          delay={0.2}
        />

        <StatCard
          title="Active Services"
          value={stats.services}
          icon={Briefcase}
          delay={0.3}
        />
      </div>

      {/* QUICK NAVIGATION */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold mb-4 text-gray-800"
      >
        Quick Actions
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NavCard
          title="Manage Services"
          desc="Add, edit or delete services"
          icon={Briefcase}
          link="/admin/services"
          delay={0.1}
        />

        <NavCard
          title="Testimonials"
          desc="Approve or remove testimonials"
          icon={MessageSquare}
          link="/admin/testimonials"
          delay={0.2}
        />

        <NavCard
          title="Applications"
          desc="View applied users"
          icon={FileText}
          link="/admin/applied-users"
          delay={0.3}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
