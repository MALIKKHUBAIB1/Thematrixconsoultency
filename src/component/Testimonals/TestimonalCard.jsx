// TestimonialCard.jsx
import { motion } from "framer-motion";

function TestimonialCard({ data }) {
  return (
    <motion.div
      className="w-full bg-[#e8f3ff] py-16 px-6 md:px-16 rounded-xl shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* LEFT IMAGE */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={data.image}
            alt={data.name}
            className="w-[280px] md:w-[400px] h-[280px] md:h-[400px] object-cover object-center shadow-xl rounded-lg"
          />
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="w-full md:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0c2d59] mb-4">
            Testimonials
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">{data.feedback}</p>

          <div className="mb-6">
            <p className="font-semibold text-lg text-gray-900">{data.name}</p>
            <p className="text-sm text-gray-500">{data.position}</p>
          </div>

          {/* QUOTE ICON */}
          <div className="absolute bottom-0 right-0 text-[#001b66] text-6xl font-bold">
            “”
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;
