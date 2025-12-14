import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import TestimonialCard from "../Testimonals/TestimonalCard";
import api from "../../../utils/api"; // 👈 axios instance

function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH REAL DATA
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get("/testimonials");
        if (res.data.success) {
          const list = Object.entries(res.data.testimonials || {}).map(
            ([id, t]) => ({
              id,
              ...t,
            })
          );
          setTestimonials(list);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev >= testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Auto slide
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const timer = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timer);
  }, [current, isAutoPlaying, testimonials.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: { x: 0, opacity: 1, scale: 1, zIndex: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <div className="w-full py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-70 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Quote className="w-4 h-4" />
            <span className="text-sm font-semibold">Client Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Clients Say</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Trusted by forward-thinking companies worldwide
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={testimonials[current].id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
            >
              <TestimonialCard data={testimonials[current]} />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="p-3 rounded-full bg-white shadow-lg hover:scale-110 transition"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => goToSlide(i)}>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      current === i ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
              className="p-3 rounded-full bg-white shadow-lg hover:scale-110 transition"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-8 max-w-md mx-auto">
            <motion.div
              key={current}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
