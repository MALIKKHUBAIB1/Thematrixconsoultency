import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#001a4d] text-white py-10 relative overflow-hidden">
      {/* BACKGROUND STRIPES */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(90deg,#002766_4px,transparent_4px)] bg-[length:60px_60px]"></div>

      {/* MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Column 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-12 h-12 bg-blue-500 rounded-lg flex justify-center items-center text-xl font-bold shadow-lg"
            >
              🧩
            </motion.div>
            <h2 className="font-semibold text-lg leading-tight">
              THE MATRIX <br /> CONSULTING SERVICE
            </h2>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Your Trusted Partner in Banking Career Development. With years of
            experience in private banking placements, Matrix Services has helped
            hundreds of candidates build successful careers.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex bg-white rounded-lg overflow-hidden mb-4 shadow-md"
          >
            <input
              type="text"
              placeholder="Your email"
              className="flex-1 px-3 py-2 text-black outline-none text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 bg-green-600 hover:bg-green-700 transition text-white text-sm font-semibold"
            >
              Subscribe
            </motion.button>
          </motion.div>

          <p className="font-semibold mb-1">Address</p>
          <p className="text-sm text-gray-300 mb-3">
            Behind Krishna Mandir, NH 105B
            <br />
            Darbhanga, Bihar
          </p>

          <p className="font-semibold mb-1">Email</p>
          <p className="text-sm text-gray-300 mb-3">
            matrixcounsltingco@gmail.com
          </p>

          <p className="font-semibold mb-1">Phone</p>
          <p className="text-sm text-gray-300">6204140560</p>
        </motion.div>

        {/* Column 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/services" className="hover:underline">
                Banking Placement Training
              </Link>
            </li>
            <li>
              <Link to="/interview-prep" className="hover:underline">
                Interview Preparation
              </Link>
            </li>
            <li>
              <Link to="/counselling" className="hover:underline">
                Career Counselling
              </Link>
            </li>
            <li>
              <Link to="/resume" className="hover:underline">
                Resume Building
              </Link>
            </li>
            <li>
              <Link to="/skills" className="hover:underline">
                Soft Skills Training
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Column 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:underline">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/apply" className="hover:underline">
                Apply Now
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Column 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-semibold mb-2">About Us</h3>
          <p className="text-sm text-gray-300 mb-3">
            We empower India's youth with the right knowledge, skills, and
            confidence to secure high-growth careers in the private banking
            sector.
          </p>

          <Link
            to="/apply"
            className="block w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg text-sm font-semibold mb-2 transition text-center"
          >
            Apply Now
          </Link>
          <Link
            to="/contact"
            className="block w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold mb-2 transition text-center"
          >
            Email Application
          </Link>
          <a
            href="https://wa.me/6204140560"
            target="_blank"
            className="block w-full bg-green-500 hover:bg-green-600 py-2 rounded-lg text-sm font-semibold transition text-center"
          >
            WhatsApp Us
          </a>
        </motion.div>
      </div>

      {/* COPYRIGHT */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center text-gray-400 text-sm mt-6"
      >
        © 2024 The Matrix Consulting Service. All rights reserved.
      </motion.p>
    </footer>
  );
}

export default Footer;
