import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

function CrousleSection() {
  return (
    <section className="bg-[#000D51] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
        {/* LEFT SECTION */}
        <motion.div
          className="md:w-1/2 space-y-5"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-300 uppercase tracking-widest">
            The Matrix Consultancy
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your Gateway to Banking Careers
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            Unlock opportunities in top private sector banks including{" "}
            <span className="font-semibold">
              Axis, HDFC, ICICI, Kotak, Yes Bank
            </span>{" "}
            and more.
            <br />
            Get expert guidance, career support, and training for a successful
            future in banking.
          </p>

          {/* FEATURE LIST */}
          <div className="mt-8 space-y-3">
            {[
              "Banking Job Assistance",
              "Professional Career Guidance",
              "Skill Development Programs",
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <ChevronRight size={22} className="text-white" />
                <p className="font-medium">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* BUTTONS */}
          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="px-6 py-3 bg-white text-[#000D51] font-semibold rounded-md shadow hover:scale-105 transition-transform">
              Apply Now
            </button>
            <button className="px-6 py-3 border border-white rounded-md shadow hover:bg-white hover:text-[#000D51] transition">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT SECTION */}
        <motion.div
          className="md:w-1/2 w-full rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=80"
            alt="banking career"
            className="w-full h-auto md:h-[450px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default CrousleSection;
