import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaRegClock,
  FaBuilding,
  FaGraduationCap,
} from "react-icons/fa";

// Use the single image you have
import bankImage from "../../assets/bank.jpeg";

function ServiceDetail() {
  const { id } = useParams();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Bank brand colors for overlays
  const bankBrands = [
    {
      name: "HDFC Bank",
      color: "#004C8E",
      overlay:
        "linear-gradient(135deg, rgba(0, 76, 142, 0.9), rgba(0, 76, 142, 0.7))",
    },
    {
      name: "ICICI Bank",
      color: "#E54D34",
      overlay:
        "linear-gradient(135deg, rgba(229, 77, 52, 0.9), rgba(229, 77, 52, 0.7))",
    },
    {
      name: "Axis Bank",
      color: "#6F2C91",
      overlay:
        "linear-gradient(135deg, rgba(111, 44, 145, 0.9), rgba(111, 44, 145, 0.7))",
    },
    {
      name: "Kotak Mahindra Bank",
      color: "#00AEEF",
      overlay:
        "linear-gradient(135deg, rgba(0, 174, 239, 0.9), rgba(0, 174, 239, 0.7))",
    },
  ];

  // Enhanced service data
  const serviceData = {
    "private-bank-placements": {
      title: "Private Bank Placements",
      subtitle:
        "Direct opportunities in India's top private-sector banks with guaranteed placement support and mentorship.",
      description:
        "We partner with leading private banks to provide exclusive placement opportunities. Our program includes interview preparation, skill assessment, and continuous support until you secure your position.",
      features: [
        "Guaranteed Interview Calls",
        "Personalized Bank Matching",
        "Post-placement Support (3 months)",
        "Documentation Assistance",
      ],
      banks: [
        {
          name: "HDFC Bank",
          seats: 12,
          location: "PAN India",
          salary: "₹2.4L – ₹3.8L",
          deadline: "15 June 2024",
          requirements: ["Graduation", "Basic Computer", "Good Communication"],
          duration: "Full-time",
          highlights: [
            "Fast-track Growth",
            "Best Training",
            "Employee Benefits",
          ],
        },
        {
          name: "ICICI Bank",
          seats: 18,
          location: "Bihar, Jharkhand",
          salary: "₹2.6L – ₹4.2L",
          deadline: "20 June 2024",
          requirements: ["Any Graduate", "Age 21-28", "Local Language"],
          duration: "Full-time",
          highlights: [
            "Leadership Program",
            "International Exposure",
            "Performance Bonus",
          ],
        },
        {
          name: "Axis Bank",
          seats: 10,
          location: "PAN India",
          salary: "₹2.4L – ₹3.5L",
          deadline: "25 June 2024",
          requirements: ["Graduation", "Sales Aptitude", "Flexible Shift"],
          duration: "Full-time",
          highlights: [
            "Work-Life Balance",
            "Skill Development",
            "Career Progression",
          ],
        },
        {
          name: "Kotak Mahindra Bank",
          seats: 8,
          location: "Metro Cities",
          salary: "₹2.8L – ₹4.5L",
          deadline: "30 June 2024",
          requirements: ["MBA/BBA Preferred", "Age 22-30", "Leadership Skills"],
          duration: "Full-time",
          highlights: ["Premium Brand", "Innovative Culture", "High Growth"],
        },
      ],
    },

    "career-counseling": {
      title: "Career Counseling",
      subtitle:
        "Personalized guidance from top banking experts to shape your future career path.",
      description:
        "One-on-one sessions with industry veterans to help you understand banking careers, identify your strengths, and create a personalized career roadmap.",
      features: [
        "Career Path Analysis",
        "Skill Gap Assessment",
        "Banking Domain Selection",
        "Long-term Career Planning",
      ],
      banks: [],
    },

    "resume-building": {
      title: "Resume Building",
      subtitle:
        "ATS-optimized banking resumes crafted by industry professionals with 100% interview guarantee.",
      description:
        "Our experts create bank-specific resumes that pass through Applicant Tracking Systems and highlight your most relevant skills for banking roles.",
      features: [
        "ATS Friendly Format",
        "Bank-specific Keywords",
        "Achievement Oriented",
        "Professional Templates",
      ],
      banks: [],
    },

    "interview-preparation": {
      title: "Interview Preparation",
      subtitle:
        "Mock interviews, HR rounds, and professional grooming for confidence & success.",
      description:
        "Comprehensive interview preparation covering technical questions, HR rounds, group discussions, and personal presentation skills.",
      features: [
        "Mock Interviews (Video Recorded)",
        "Body Language Coaching",
        "Bank-specific Q&A",
        "Stress Interview Training",
      ],
      banks: [],
    },
  };

  const content = serviceData[id];

  if (!content) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-10 text-center mt-32"
      >
        <h1 className="text-2xl font-bold text-red-600">Service Not Found</h1>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.15,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 mt-28">
      {/* Hero Section with Animated Background */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-8 md:p-12 mb-16 shadow-2xl"
      >
        {/* Floating Elements */}
        <motion.div
          animate={floatAnimation}
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 1 },
          }}
          className="absolute bottom-10 right-10 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"
        />

        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 mb-4"
          >
            <span className="px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
              Exclusive Opportunity
            </span>
            <span className="px-4 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-sm font-semibold text-green-200">
              Guaranteed Placement
            </span>
          </motion.div>

          <motion.h1
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {content.title}
            <span className="block text-2xl md:text-3xl text-blue-200 mt-3 font-normal">
              Your Banking Career Starts Here
            </span>
          </motion.h1>

          <motion.p
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-blue-100 mb-8 leading-relaxed"
          >
            {content.subtitle}
          </motion.p>

          {/* Features List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {content.features.map((feature, idx) => (
              <motion.span
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white"
              >
                <FaCheckCircle className="text-green-300" />
                <span className="text-sm font-medium">{feature}</span>
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bank Cards Section */}
      {content.banks.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Available Positions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select from our exclusive bank partnerships. Each opportunity
              comes with dedicated placement support.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {content.banks.map((bank, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Card Background with Brand Color Overlay */}
                <div
                  className="absolute inset-0 z-0 transition-opacity duration-500"
                  style={{
                    background: bankBrands[index].overlay,
                    opacity: hoveredCard === index ? 0.9 : 0.7,
                  }}
                />

                {/* Bank Logo/Name Header */}
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {bank.name}
                      </h3>
                      <p className="text-white/80 text-sm mt-1">
                        {bank.duration} • Closes: {bank.deadline}
                      </p>
                    </div>
                    <motion.div
                      animate={
                        hoveredCard === index ? { rotate: 360 } : { rotate: 0 }
                      }
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <FaBuilding className="text-white text-xl" />
                    </motion.div>
                  </div>

                  {/* Image Container with Parallax Effect */}
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        backgroundImage: `url(${bankImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transform:
                          hoveredCard === index ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.6s ease-out",
                      }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Seats Badge */}
                    <motion.div
                      animate={
                        hoveredCard === index ? { scale: 1.1 } : { scale: 1 }
                      }
                      className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                    >
                      {bank.seats} Seats Left
                    </motion.div>
                  </div>

                  {/* Bank Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                    >
                      <FaMapMarkerAlt className="text-blue-300 text-xl mx-auto mb-2" />
                      <p className="text-white font-semibold">Location</p>
                      <p className="text-white/90 text-sm">{bank.location}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                    >
                      <FaMoneyBillWave className="text-green-300 text-xl mx-auto mb-2" />
                      <p className="text-white font-semibold">Annual Salary</p>
                      <p className="text-white/90 text-sm">{bank.salary}</p>
                    </motion.div>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <FaGraduationCap className="text-white" />
                      <h4 className="text-white font-semibold">Requirements</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bank.requirements.map((req, idx) => (
                        <motion.span
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
                        >
                          {req}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <h4 className="text-white font-semibold mb-3">
                      Why Choose {bank.name}?
                    </h4>
                    <ul className="space-y-2">
                      {bank.highlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + idx * 0.1 }}
                          className="flex items-center space-x-2 text-white/90"
                        >
                          <FaCheckCircle className="text-green-300 flex-shrink-0" />
                          <span className="text-sm">{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 group"
                    style={{ color: bankBrands[index].color }}
                  >
                    <span>Apply Now</span>
                    <motion.span
                      animate={hoveredCard === index ? { x: 5 } : { x: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FaArrowRight />
                    </motion.span>
                  </motion.button>

                  {/* Quick Apply Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      hoveredCard === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-2 rounded-full font-bold shadow-lg rotate-12"
                  >
                    Fast-track
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Statistics Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-sm opacity-90">Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">48+</div>
                <div className="text-sm opacity-90">Partner Banks</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">3000+</div>
                <div className="text-sm opacity-90">Placed Candidates</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Support Available</div>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-16 text-center py-16"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Service Details Coming Soon
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're preparing detailed content for this service. Check back soon
              for comprehensive information and features.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default ServiceDetail;
