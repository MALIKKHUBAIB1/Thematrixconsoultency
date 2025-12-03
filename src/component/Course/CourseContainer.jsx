import { motion } from "framer-motion";
import AllCourse from "./AllCourse";

function CourseContainer() {
  return (
    <section className="w-full md:w-[90%] max-w-7xl mx-auto mt-20 px-4 md:px-0">
      {/* HEADER */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10 mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#000D51] leading-tight">
          Our Available Services
        </h2>
        <p className="text-gray-700 max-w-full md:max-w-2xl text-sm md:text-base leading-relaxed">
          Explore our curated services designed to guide you toward a stable and
          rewarding career in the private banking sector. From interview
          preparation to job placement support, we offer complete assistance at
          every step.
        </p>
      </motion.div>

      {/* COURSES */}
      <AllCourse />
    </section>
  );
}

export default CourseContainer;
