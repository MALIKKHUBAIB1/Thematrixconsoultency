import { useEffect, useRef, useState, useCallback } from "react";
import {
  Landmark,
  Banknote,
  Building,
  CreditCard,
  CircleDollarSign,
  Building2,
  Wallet,
  ChevronRight,
  Shield,
  TrendingUp,
  Handshake,
} from "lucide-react";
import { motion } from "framer-motion";

function Partner() {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const animationFrameRef = useRef(null);

  const BANKS = [
    { name: "Axis Bank", icon: <Landmark size={40} />, color: "#FF0000" },
    { name: "HDFC Bank", icon: <Building size={40} />, color: "#004C8F" },
    { name: "ICICI Bank", icon: <Banknote size={40} />, color: "#FF6F61" },
    { name: "Kotak Bank", icon: <CreditCard size={40} />, color: "#00A3A1" },
    {
      name: "AU Small Finance Bank",
      icon: <CircleDollarSign size={40} />,
      color: "#FF8C00",
    },
    { name: "IndusInd Bank", icon: <Building2 size={40} />, color: "#004B87" },
    { name: "Other Banks", icon: <Wallet size={40} />, color: "#6A5ACD" },
  ];

  const LOOP_BANKS = [...BANKS, ...BANKS, ...BANKS]; // Triple loop for smoother infinite effect

  // Fixed infinite scroll with smooth reset
  const scrollAnimation = useCallback(() => {
    if (!scrollRef.current || isHovering) {
      animationFrameRef.current = requestAnimationFrame(scrollAnimation);
      return;
    }

    const container = scrollRef.current;
    const scrollWidth = container.scrollWidth / 3; // Since we have 3 copies
    const itemWidth = 250; // Approximate width of each item + gap
    const scrollSpeed = 0.5;

    container.scrollLeft += scrollSpeed;
    setScrollPosition(container.scrollLeft);

    // When we've scrolled through one full set of banks, jump back seamlessly
    if (container.scrollLeft >= scrollWidth) {
      container.scrollLeft = container.scrollLeft - scrollWidth;
    }

    animationFrameRef.current = requestAnimationFrame(scrollAnimation);
  }, [isHovering]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(scrollAnimation);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollAnimation]);

  // Handle manual scroll to reset position if user scrolls manually
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= scrollWidth * 2) {
      container.scrollLeft = scrollWidth;
    }
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
            <Handshake className="w-4 h-4" />
            <span className="text-sm font-semibold">Trusted Partnerships</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Banking Partners</span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            Collaborating with India's leading financial institutions to provide
            you with the best services
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">20+</div>
              <div className="text-gray-600">Partner Banks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">₹100Cr+</div>
              <div className="text-gray-600">Processed</div>
            </div>
          </div>
        </motion.div>

        {/* Scrolling Banks Section */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div
            ref={scrollRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-hidden py-8 px-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {LOOP_BANKS.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="
                  min-w-[240px]
                  h-[200px]
                  bg-white
                  shadow-lg
                  rounded-2xl
                  p-6
                  border-2
                  border-transparent
                  hover:border-blue-200
                  hover:shadow-2xl
                  transform-gpu
                  transition-all
                  duration-300
                  flex
                  flex-col
                  items-center
                  justify-center
                  relative
                  overflow-hidden
                  group
                  cursor-pointer
                  shrink-0
                "
              >
                {/* Background gradient effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundColor: item.color }}
                ></div>

                {/* Icon with color */}
                <div
                  className="mb-4 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300"
                  style={{
                    color: item.color,
                    backgroundColor: `${item.color}10`,
                  }}
                >
                  {item.icon}
                </div>

                {/* Bank name */}
                <p className="font-bold text-gray-900 text-xl text-center mb-2">
                  {item.name}
                </p>

                {/* Subtext */}
                <p className="text-gray-500 text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Official Partner
                </p>

                {/* Hover indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "80%" }}
                  className="absolute bottom-4 h-1 rounded-full bg-blue-500"
                ></motion.div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="text-sm text-gray-500">
              {isHovering ? "Scroll paused" : "Auto scrolling"}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Secure Transactions
              </h3>
            </div>
            <p className="text-gray-600">
              Bank-grade security with 256-bit encryption for all your
              transactions
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Instant Processing
              </h3>
            </div>
            <p className="text-gray-600">
              Real-time processing with 99.9% uptime across all partner banks
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Handshake className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Seamless Integration
              </h3>
            </div>
            <p className="text-gray-600">
              Easy integration with all major banking APIs and platforms
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button
            className="
            inline-flex
            items-center
            gap-2
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            text-white
            px-8
            py-4
            rounded-xl
            font-semibold
            text-lg
            hover:shadow-2xl
            hover:scale-105
            active:scale-95
            transition-all
            duration-300
            shadow-lg
          "
          >
            Partner With Us
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Hide scrollbar globally */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Partner;
