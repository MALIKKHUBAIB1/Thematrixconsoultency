import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  UserCheck,
  FileText,
  Mic,
  BookOpen,
  Handshake,
} from "lucide-react";
function Service() {
  const services = [
    {
      id: "private-bank-placements",
      title: "Private Bank Placements",
      description:
        "Direct placement opportunities in top private sector banks including Axis, HDFC, ICICI & more.",
      icon: <Briefcase size={32} />,
    },
    {
      id: "career-counseling",
      title: "Career Counseling",
      description:
        "Professional guidance to choose the right banking career path.",
      icon: <UserCheck size={32} />,
    },
    {
      id: "resume-building",
      title: "Resume Building",
      description:
        "Banking-focused resume writing & ATS optimization services.",
      icon: <FileText size={32} />,
    },
    {
      id: "interview-preparation",
      title: "Interview Preparation",
      description:
        "Mock interviews & training to improve confidence & knowledge.",
      icon: <Mic size={32} />,
    },
    {
      id: "skill-development",
      title: "Skill Development",
      description: "Customer service, sales & product knowledge training.",
      icon: <BookOpen size={32} />,
    },
    {
      id: "job-placement-support",
      title: "Job Placement Support",
      description: "Application assistance, follow-ups & salary negotiation.",
      icon: <Handshake size={32} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-16 my-10">
      {/* HEADER */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#001a4d]"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-sm md:text-lg mt-3"
        >
          Everything you need to build a successful career in private banking.
        </motion.p>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {services.map((s, index) => (
          <Link to={`/services/${s.id}`} key={s.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-2xl transition cursor-pointer group"
            >
              <div className="text-blue-600 mb-4 group-hover:scale-110 transition">
                {s.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {s.description}
              </p>

              <motion.span
                whileHover={{ x: 5 }}
                className="text-blue-600 mt-4 inline-block text-sm font-semibold"
              >
                Details →
              </motion.span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Service;
