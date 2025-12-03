import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";

function Contact() {
  return (
    <div className="bg-white text-[#000D51] py-26 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="text-gray-600 mt-3 text-lg">
            We're here to help you build a successful career in banking.
          </p>
        </motion.div>

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Address */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#000D51] text-white rounded-xl p-6 shadow-lg"
          >
            <MapPin size={35} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-blue-100">
              Behind Krishna Mandir, NH 105B <br />
              Darbhanga, Bihar
            </p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#000D51] text-white rounded-xl p-6 shadow-lg"
          >
            <Phone size={35} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-blue-100">6204140560</p>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="bg-[#000D51] text-white rounded-xl p-6 shadow-lg"
          >
            <Mail size={35} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-blue-100">matrixcounsltingco@gmail.com</p>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#000D51] text-white rounded-xl p-6 shadow-lg"
          >
            <Clock size={35} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
            <p className="text-blue-100">Mon - Sat</p>
            <p className="text-blue-100">10:00 AM - 6:00 PM</p>
          </motion.div>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap mt-12 gap-4 justify-center">
          <button className="bg-[#000D51] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transition">
            Apply Now
          </button>

          <button className="border border-[#000D51] text-[#000D51] px-6 py-3 rounded-lg hover:bg-[#000D51] hover:text-white transition">
            Email Application
          </button>

          <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">
            <MessageCircle size={20} />
            WhatsApp Us
          </button>
        </div>

        {/* MAP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-xl overflow-hidden shadow-lg"
        >
          <iframe
            title="Google Map"
            width="100%"
            height="350"
            loading="lazy"
            className="rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28571.76654806881!2d85.889!3d26.154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eddf4d774b!2sDarbhanga%2C%20Bihar!5e0!3m2!1sen!2sin!4v1700000000000"
          ></iframe>
        </motion.div>

        {/* SOCIAL LINKS */}
        <div className="text-center mt-10">
          <p className="text-gray-700 mb-4">Follow us on</p>
          <div className="flex justify-center gap-6">
            <Facebook
              size={28}
              className="cursor-pointer hover:text-gray-700 transition"
            />
            <Instagram
              size={28}
              className="cursor-pointer hover:text-gray-700 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
