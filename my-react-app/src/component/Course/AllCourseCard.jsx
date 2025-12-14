import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function AllCourseCard({ icon, title, description, id }) {
  return (
    <motion.div
      className="w-full max-w-[330px] min-h-[380px] bg-[#000D51] text-white p-6 rounded-2xl shadow-lg border border-transparent flex flex-col items-center justify-between transition-all duration-300 hover:bg-white hover:text-[#000D51] hover:border-[#000D51] hover:shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* ICON */}
      <div className="text-5xl mb-4 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-center leading-snug">
        {title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-center opacity-90 mt-2 leading-relaxed">
        {description}
      </p>

      {/* BUTTON */}
      <Link to={`/services/${id}`}>
        <button className="mt-4 bg-white text-[#000D51] px-5 py-2 text-sm font-medium rounded-md shadow-sm hover:bg-[#000D51] hover:text-white transition-all duration-300">
          Details →
        </button>
      </Link>
    </motion.div>
  );
}

export default AllCourseCard;
