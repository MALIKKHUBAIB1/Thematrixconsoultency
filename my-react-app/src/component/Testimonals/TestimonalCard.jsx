// TestimonialCard.jsx
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

function TestimonialCard({ data }) {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < data.rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <motion.div
      className="w-full bg-gradient-to-br from-white to-blue-50 py-12 px-6 md:px-12 rounded-3xl shadow-2xl relative overflow-hidden border border-white/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100/20 to-indigo-100/20 rounded-full translate-y-32 -translate-x-32"></div>

      {/* Floating sparkles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-6 right-6 text-blue-200/50"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative">
        {/* LEFT IMAGE */}
        <motion.div
          className="w-full lg:w-2/5 flex justify-center relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-xl opacity-30 animate-pulse"></div>

            {/* Image container with decorative border */}
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-500 p-1 rounded-2xl">
              <img
                src={data.image}
                alt={data.name}
                className="w-64 h-64 md:w-80 md:h-80 object-cover object-center rounded-2xl border-4 border-white shadow-2xl"
              />
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg"
            >
              <Quote className="w-6 h-6 text-blue-600" />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="w-full lg:w-3/5 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Rating stars */}
          <div className="flex items-center gap-1 mb-6">
            {renderStars()}
            <span className="ml-2 text-sm font-medium text-gray-600">
              {data.rating}.0 rating
            </span>
          </div>

          {/* Feedback text */}
          <div className="relative mb-10">
            <Quote className="absolute -top-8 -left-4 w-12 h-12 text-blue-100" />
            <p className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed italic">
              "{data.feedback}"
            </p>
            <Quote className="absolute -bottom-8 -right-4 w-12 h-12 text-blue-100 transform rotate-180" />
          </div>

          {/* Client info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="border-t border-gray-100 pt-6"
          >
            <p className="text-xl font-bold text-gray-900">{data.name}</p>
            <p className="text-blue-600 font-medium">{data.position}</p>

            {/* Company badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mt-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
              <span className="text-sm font-medium">Verified Client</span>
            </div>
          </motion.div>

          {/* Quote icon decoration */}
          <div className="absolute -bottom-8 -right-8 text-blue-50 text-9xl font-bold select-none">
            "
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default TestimonialCard;
