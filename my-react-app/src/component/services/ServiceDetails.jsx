import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaRegClock,
  FaBuilding,
  FaGraduationCap,
  FaCalendarAlt,
  FaUserTie,
  FaClipboardCheck,
  FaStar,
  FaChevronLeft,
  FaDatabase,
  FaBriefcase,
} from "react-icons/fa";
import api from "../../../utils/api";

function ServiceDetail() {
  const { id } = useParams();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  // Fetch ALL services from API
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get("/services");

        if (!response.data.success) {
          throw new Error("Failed to fetch services");
        }

        const servicesData = response.data.services || {};

        // Convert object to array
        const servicesArray = Object.entries(servicesData).map(
          ([serviceId, service]) => ({
            id: serviceId,
            title: service.title || "Untitled Service",
            subtitle: service.subtitle || "",
            description: service.description || "No description available",
            iconUrl: service.iconUrl || null,
            serviceType: service.serviceType || "Service",
            duration: service.duration || "",
            features: service.features || [],
            banks: service.banks || [],
            bankDetails: service.bankDetails || [],
            eligibility: service.eligibility || "",
            createdAt: service.createdAt || Date.now(),
            ...service,
          })
        );

        setAllServices(servicesArray);

        // If URL has an ID, find that specific service
        if (id) {
          const foundService = servicesArray.find(
            (service) =>
              service.id === id ||
              service.title
                .toLowerCase()
                .includes(id.toLowerCase().replace(/-/g, " ")) ||
              id
                .toLowerCase()
                .replace(/-/g, " ")
                .includes(service.title.toLowerCase())
          );
          setSelectedService(foundService);
        }
      } catch (err) {
        setError("Failed to load services data from server");
      } finally {
        setLoading(false);
      }
    };

    fetchAllServices();
  }, [id]);

  // Process ALL bank details from ALL services
  const getAllBanksData = () => {
    const allBanks = [];

    allServices.forEach((service) => {
      // If service has bankDetails, add them
      if (
        service.bankDetails &&
        Array.isArray(service.bankDetails) &&
        service.bankDetails.length > 0
      ) {
        service.bankDetails.forEach((bank) => {
          allBanks.push({
            ...bank,
            serviceTitle: service.title,
            serviceId: service.id,
            serviceType: service.serviceType,
            serviceIconUrl: service.iconUrl, // Add service icon URL
          });
        });
      }
      // If service has banks array, add them too
      else if (
        service.banks &&
        Array.isArray(service.banks) &&
        service.banks.length > 0
      ) {
        service.banks.forEach((bankName) => {
          allBanks.push({
            name: bankName,
            seats: Math.floor(Math.random() * 15) + 5,
            location: "PAN India",
            salary: `₹${(2 + Math.random() * 3).toFixed(1)}L – ₹${(
              3 +
              Math.random() * 2
            ).toFixed(1)}L`,
            serviceTitle: service.title,
            serviceId: service.id,
            serviceType: service.serviceType,
            serviceIconUrl: service.iconUrl, // Add service icon URL
          });
        });
      }
    });

    return allBanks;
  };

  // Helper function to get bank brand color
  const getBankBrand = (bankName) => {
    if (!bankName)
      return {
        color: "#3B82F6",
        overlay:
          "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.7))",
      };

    const bankBrands = [
      { name: "HDFC", color: "#004C8E" },
      { name: "ICICI", color: "#E54D34" },
      { name: "Axis", color: "#6F2C91" },
      { name: "Kotak", color: "#00AEEF" },
      { name: "SBI", color: "#2D5F2E" },
      { name: "PNB", color: "#D41E2E" },
      { name: "BOB", color: "#005BAC" },
      { name: "Canara", color: "#FF6600" },
    ];

    const brand = bankBrands.find((b) =>
      bankName.toLowerCase().includes(b.name.toLowerCase())
    );

    if (brand) {
      return {
        color: brand.color,
        overlay: `linear-gradient(135deg, ${brand.color}CC, ${brand.color}99)`,
      };
    }

    return {
      color: "#3B82F6",
      overlay:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(59, 130, 246, 0.7))",
    };
  };

  // Format bank data for display
  const formatBankData = (bank) => {
    const brand = getBankBrand(bank.name);

    // Format date
    let formattedDeadline = "Open";
    if (bank.deadline) {
      try {
        const deadlineDate = new Date(bank.deadline);
        if (!isNaN(deadlineDate.getTime())) {
          formattedDeadline = deadlineDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        }
      } catch (e) {
        formattedDeadline = bank.deadline;
      }
    }

    return {
      name: bank.name || "Bank",
      seats: bank.seats || 0,
      location: bank.location || "Multiple Locations",
      salary: bank.salary || "Not Specified",
      deadline: formattedDeadline,
      requirements: Array.isArray(bank.requirements)
        ? bank.requirements
        : ["Graduation Degree"],
      type: bank.type || "Full-time",
      experience: bank.experience || "Fresher",
      applicationFee: bank.applicationFee || "₹500",
      selectionProcess: Array.isArray(bank.selectionProcess)
        ? bank.selectionProcess
        : ["Written Test", "Interview"],
      benefits: Array.isArray(bank.benefits)
        ? bank.benefits
        : ["Health Insurance", "PF", "Bonus"],
      highlights: Array.isArray(bank.highlights)
        ? bank.highlights
        : ["Career Growth", "Training Program"],
      serviceTitle: bank.serviceTitle || "Service",
      serviceType: bank.serviceType || "Service",
      serviceIconUrl: bank.serviceIconUrl || null,
      ...brand,
    };
  };

  const allBanksData = getAllBanksData().map(formatBankData);
  const totalSeats = allBanksData.reduce(
    (total, bank) => total + (bank.seats || 0),
    0
  );
  const uniqueServices = [
    ...new Set(allBanksData.map((bank) => bank.serviceTitle)),
  ];
  const uniqueBanks = [...new Set(allBanksData.map((bank) => bank.name))];

  // Function to handle image errors
  const handleImageError = (
    e,
    fallbackIcon = <FaBuilding className="text-white" />
  ) => {
    e.target.style.display = "none";
    const parent = e.target.parentElement;
    parent.innerHTML = "";
    parent.appendChild(document.createTextNode(""));
    parent.className = "w-full h-full flex items-center justify-center";
    parent.appendChild(fallbackIcon);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading all bank positions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-14 mt-28 text-center"
      >
        <div className="inline-block p-8 bg-red-50 rounded-2xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <FaChevronLeft />
            Back to Services
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 mt-28">
      {/* HEADER - Showing ALL services data with background image */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-8 md:p-12 mb-16 shadow-2xl"
      >
        {/* Background Image from first service */}
        {allServices.length > 0 && allServices[0].iconUrl && (
          <div className="absolute inset-0 z-0">
            <img
              src={allServices[0].iconUrl}
              alt="Service Background"
              className="w-full h-full object-contain opacity-20"
              onError={(e) =>
                handleImageError(
                  e,
                  <FaDatabase className="text-white/20 text-6xl" />
                )
              }
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-800/80 to-purple-900/80"></div>
          </div>
        )}

        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            {/* Show icon from first service */}
            {allServices.length > 0 && allServices[0].iconUrl ? (
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                <img
                  src={allServices[0].iconUrl}
                  alt="Service Icon"
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    handleImageError(
                      e,
                      <FaDatabase className="text-white text-2xl mx-auto my-auto" />
                    )
                  }
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                <FaDatabase className="text-white text-3xl" />
              </div>
            )}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                All Available Positions
              </h1>
              <p className="text-blue-200 text-lg">
                Complete database of banking opportunities
              </p>
            </div>
          </div>

          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Explore all banking career opportunities across our complete service
            portfolio. Find your perfect match from hundreds of available
            positions.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {allServices.length}
              </div>
              <div className="text-blue-200 text-sm">Total Services</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {allBanksData.length}
              </div>
              <div className="text-blue-200 text-sm">Total Positions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{totalSeats}</div>
              <div className="text-blue-200 text-sm">Available Seats</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {uniqueBanks.length}
              </div>
              <div className="text-blue-200 text-sm">Partner Banks</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Overview with Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <FaBuilding className="text-blue-600" />
          Services Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-5 shadow border hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Service Icon */}
                {service.iconUrl ? (
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <img
                      src={service.iconUrl}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) =>
                        handleImageError(
                          e,
                          <FaBriefcase className="text-blue-500 text-lg mx-auto my-auto" />
                        )
                      }
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <FaBriefcase className="text-blue-500 text-xl" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-1 truncate">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="text-gray-500 text-xs mb-2 truncate">
                      {service.subtitle}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium text-blue-600">
                      {service.bankDetails?.length ||
                        service.banks?.length ||
                        0}{" "}
                      positions
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      {service.serviceType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ALL BANK CARDS SECTION */}
      {allBanksData.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  All Available Positions
                </h2>
                <p className="text-gray-600">
                  {allBanksData.length} positions across {uniqueServices.length}{" "}
                  services
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 font-semibold">
                    {totalSeats}
                  </span>
                  <span className="text-gray-600 text-sm ml-2">
                    Total Seats
                  </span>
                </div>
                <div className="px-4 py-2 bg-green-50 rounded-lg">
                  <span className="text-green-600 font-semibold">
                    {uniqueBanks.length}
                  </span>
                  <span className="text-gray-600 text-sm ml-2">Banks</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ALL BANK CARDS GRID */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {allBanksData.map((bank, index) => (
              <motion.div
                key={`${bank.serviceId}-${bank.name}-${index}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Card Background */}
                <div
                  className="absolute inset-0 z-0 transition-opacity duration-500"
                  style={{
                    background: bank.overlay,
                    opacity: hoveredCard === index ? 0.9 : 0.7,
                  }}
                />

                <div className="relative z-10 p-6">
                  {/* Service Badge with Icon */}
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                    {bank.serviceIconUrl ? (
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/30">
                        <img
                          src={bank.serviceIconUrl}
                          alt={bank.serviceTitle}
                          className="w-full h-full object-cover"
                          onError={(e) =>
                            handleImageError(
                              e,
                              <FaBuilding className="text-white text-sm" />
                            )
                          }
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                        <FaBuilding className="text-white text-sm" />
                      </div>
                    )}

                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                      {bank.serviceTitle}
                    </span>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">
                      {bank.serviceType}
                    </span>
                  </div>

                  {/* Bank Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">
                        {bank.name}
                      </h3>
                      <div className="flex items-center gap-3 text-white/80 text-sm mt-2">
                        <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                          <FaUserTie size={12} />
                          {bank.type}
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                          <FaCalendarAlt size={12} />
                          {bank.deadline}
                        </span>
                        <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                          <FaRegClock size={12} />
                          {bank.experience}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={
                        hoveredCard === index ? { rotate: 360 } : { rotate: 0 }
                      }
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center ml-4 flex-shrink-0"
                    >
                      <FaBuilding className="text-white text-xl" />
                    </motion.div>
                  </div>

                  {/* Bank Image Section with Service Icon Overlay */}
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden bg-gray-900">
                    {/* Background Image - Using bank.serviceIconUrl with contain to show full image */}
                    {bank.serviceIconUrl ? (
                      <img
                        src={bank.serviceIconUrl}
                        alt={bank.name}
                        className={`absolute inset-0 w-full h-full object-contain transition-transform duration-600 ${
                          hoveredCard === index ? "scale-110" : "scale-100"
                        }`}
                        onError={(e) => {
                          e.target.style.display = "none";
                          // Show fallback background if image fails to load
                          e.target.parentElement.className +=
                            " bg-gradient-to-r from-blue-500 to-purple-600";
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <FaBuilding className="text-white/30 text-6xl" />
                      </div>
                    )}

                    {/* Service Icon Overlay */}
                    {bank.serviceIconUrl && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white/40 shadow-lg bg-white/20 backdrop-blur-sm">
                          <img
                            src={bank.serviceIconUrl}
                            alt={bank.serviceTitle}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.className =
                                "w-12 h-12 rounded-lg bg-white/30 flex items-center justify-center border-2 border-white/40 shadow-lg";
                              e.target.parentElement.innerHTML =
                                '<FaBriefcase class="text-white text-lg" />';
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Gradient overlay to ensure text is readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Seats Badge */}
                    <motion.div
                      animate={
                        hoveredCard === index ? { scale: 1.1 } : { scale: 1 }
                      }
                      className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 z-10"
                    >
                      <FaUsers size={16} />
                      {bank.seats} Seats
                    </motion.div>

                    {/* Application Fee Badge */}
                    {bank.applicationFee && bank.applicationFee !== "Free" && (
                      <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium z-10">
                        Fee: {bank.applicationFee}
                      </div>
                    )}
                  </div>

                  {/* Bank Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                    >
                      <FaMapMarkerAlt className="text-blue-300 text-xl mx-auto mb-2" />
                      <p className="text-white font-semibold text-sm mb-1">
                        Location
                      </p>
                      <p className="text-white/90 text-sm">{bank.location}</p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                    >
                      <FaMoneyBillWave className="text-green-300 text-xl mx-auto mb-2" />
                      <p className="text-white font-semibold text-sm mb-1">
                        Annual Salary
                      </p>
                      <p className="text-white/90 text-sm font-medium">
                        {bank.salary}
                      </p>
                    </motion.div>
                  </div>

                  {/* Requirements */}
                  {bank.requirements && bank.requirements.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <FaGraduationCap className="text-white" />
                        <h4 className="text-white font-semibold text-sm">
                          Requirements
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {bank.requirements.slice(0, 4).map((req, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-xs text-white"
                          >
                            {req}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Highlights */}
                  {bank.highlights && bank.highlights.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                        <FaStar className="text-yellow-300" />
                        Why Choose {bank.name}?
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {bank.highlights.slice(0, 3).map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-lg text-xs text-white"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Apply Button */}
                  <Link
                    to={`/form?service=${
                      bank.serviceId
                    }&bank=${encodeURIComponent(bank.name)}`}
                    className="block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 group hover:shadow-lg transition-shadow"
                      style={{ color: bank.color }}
                    >
                      <span>Apply for {bank.name}</span>
                      <motion.span
                        animate={hoveredCard === index ? { x: 5 } : { x: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FaArrowRight />
                      </motion.span>
                    </motion.button>
                  </Link>
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">
                  {allServices.length}
                </div>
                <div className="text-sm opacity-90">Active Services</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  {allBanksData.length}
                </div>
                <div className="text-sm opacity-90">Total Positions</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{totalSeats}</div>
                <div className="text-sm opacity-90">Available Seats</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  {uniqueBanks.length}
                </div>
                <div className="text-sm opacity-90">Partner Banks</div>
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
          <div className="inline-block p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl max-w-2xl">
            <FaDatabase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No Positions Available Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Bank positions haven't been added to any service yet. Please add
              bank details in the admin panel.
            </p>
            <div className="border-t pt-6">
              <p className="text-gray-500 text-sm mb-6">
                Services in database: {allServices.length}
              </p>
              <Link
                to={{
                  pathname: "/form",
                  state: {
                    serviceId: bank.serviceId,
                    serviceTitle: bank.serviceTitle,
                    serviceType: bank.serviceType,
                    bankName: bank.name,
                    bankDetails: {
                      name: bank.name,
                      salary: bank.salary,
                      location: bank.location,
                      seats: bank.seats,
                      deadline: bank.deadline,
                      requirements: bank.requirements,
                      type: bank.type,
                      experience: bank.experience,
                      applicationFee: bank.applicationFee,
                    },
                  },
                }}
                className="block"
              >
                <FaArrowRight className="rotate-180" />
                Back to Services
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Back to Services Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center"
      >
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          <FaArrowRight className="rotate-180" />
          Back to Services List
        </Link>
      </motion.div>
    </div>
  );
}

export default ServiceDetail;
