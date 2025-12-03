// Testimonial.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialCard from "./TestimonalCard";

const TESTIMONIAL_DATA = [
  {
    name: "Lorene Hudson",
    position: "CEO / Ritchie Group",
    feedback:
      "Suscipit feugiat purus ac nunc amet. Id pulvinar arcu nibh orci non rhoncus lobortis id neque.",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=900&q=80",
  },
  {
    name: "John Carter",
    position: "Software Engineer / TechNova",
    feedback:
      "Integer malesuada curabitur vel interdum leo justo at ultricies. Sit aliquet tempus elementum ac.",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=900&q=80",
  },
  {
    name: "Priya Sharma",
    position: "UI/UX Designer / CreativeHub",
    feedback:
      "Laoreet sed aliquam sed dui, justo eu condimentum. Proin et urna magna fusce eu malesuada sapien.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80",
  },
];

function Testimonial() {
  const [current, setCurrent] = useState(0);

  // Auto slide logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) =>
        prev >= TESTIMONIAL_DATA.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 4s delay for better readability

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="w-[90%] md:w-[80%] mx-auto my-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <TestimonialCard data={TESTIMONIAL_DATA[current]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Testimonial;
