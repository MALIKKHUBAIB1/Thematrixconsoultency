import { motion } from "framer-motion";
import {
  ChevronRight,
  Target,
  Users,
  Award,
  Briefcase,
  Star,
  TrendingUp,
  CheckCircle,
  Handshake,
  Lightbulb,
  Shield,
  Globe,
  BookOpen,
  MessageSquare,
  PhoneCall,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function About() {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <>
      {/* HERO ABOUT SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* LEFT CONTENT */}
            <motion.div
              className="w-full lg:w-1/2 space-y-8"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                <span className="text-sm font-semibold">Since 2018</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Gateway to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Banking Careers
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                At Matrix Services, we bridge the gap between ambitious talent
                and India's leading private banks. With proven expertise and
                industry partnerships, we've transformed hundreds of careers.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    text: "95% Placement Rate",
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    text: "Verified Partners",
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5" />,
                    text: "Career Growth",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    text: "1:1 Mentorship",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                  >
                    <div className="text-blue-600">{feature.icon}</div>
                    <span className="font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              {/* <div className="flex flex-wrap gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  <PhoneCall className="w-5 h-5" />
                  Book Consultation
                </motion.button>
              </div> */}
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Main image */}
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80"
                  alt="Team collaboration"
                  className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                />

                {/* Floating stats card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        500+
                      </div>
                      <div className="text-gray-600 text-sm">
                        Successful Placements
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating icon */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-xl"
                >
                  <Briefcase className="w-8 h-8" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 p-1 rounded-xl">
              {[
                {
                  id: "mission",
                  label: "Our Mission",
                  icon: <Target className="w-5 h-5" />,
                },
                {
                  id: "vision",
                  label: "Our Vision",
                  icon: <Lightbulb className="w-5 h-5" />,
                },
                {
                  id: "values",
                  label: "Our Values",
                  icon: <Handshake className="w-5 h-5" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            {activeTab === "mission" && (
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  To empower India's youth with the skills, confidence, and
                  opportunities needed to build rewarding careers in the banking
                  sector. We bridge the gap between talent and opportunity
                  through comprehensive training, mentorship, and industry
                  partnerships.
                </p>
              </div>
            )}
            {activeTab === "vision" && (
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Vision
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  To become India's most trusted career development platform,
                  transforming the banking employment landscape by creating a
                  sustainable ecosystem of skilled professionals and satisfied
                  banking partners.
                </p>
              </div>
            )}
            {activeTab === "values" && (
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Our Core Values
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Integrity, Excellence, and Empowerment drive everything we do.
                  We believe in transparent processes, continuous improvement,
                  and creating lasting impact in every career we touch.
                </p>
              </div>
            )}
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: <Target className="w-10 h-10" />,
                title: "Goal-Oriented",
                desc: "We set clear career objectives and create actionable plans to achieve them.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Student-Centric",
                desc: "Every decision is made with our students' success as the top priority.",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: "Growth Focused",
                desc: "We believe in continuous improvement for both our students and organization.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${value.color} text-white mb-6`}
                >
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              initial={{ y: -100, x: Math.random() * 100 }}
              animate={{
                y: [0, 800],
                x: [Math.random() * 100, Math.random() * 100 + 100],
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Quantifying our commitment to transforming banking careers across
              India
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "1000+",
                label: "Students Trained",
                icon: <Users className="w-8 h-8" />,
                suffix: "",
              },
              {
                number: "750+",
                label: "Placements",
                icon: <Briefcase className="w-8 h-8" />,
                suffix: "",
              },
              {
                number: "98",
                label: "Success Rate",
                icon: <Award className="w-8 h-8" />,
                suffix: "%",
              },
              {
                number: "20+",
                label: "Bank Partners",
                icon: <Globe className="w-8 h-8" />,
                suffix: "",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-lg bg-white/10 text-white mb-4">
                  {stat.icon}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-bold text-white mb-2"
                >
                  {stat.number}
                  <span className="text-3xl">{stat.suffix}</span>
                </motion.div>
                <p className="text-blue-100 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">Expert Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A team of banking veterans and career experts dedicated to your
              success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Avinash malik",
                role: "Founder & Ceo",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                exp: "15+ Years in Banking",
                specialty: "Career Strategy",
                social: ["linkedin", "twitter"],
              },
              {
                name: "Priya Sharma",
                role: "Head of Placements",
                img: "https://images.unsplash.com/photo-1494790108755-2616b786d4b1?w=400&h=400&fit=crop",
                exp: "12+ Years in HR",
                specialty: "Banking Recruitment",
                social: ["linkedin", "instagram"],
              },
              {
                name: "Ankit Gupta",
                role: "Banking Relations Director",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
                exp: "18+ Years Experience",
                specialty: "Industry Partnerships",
                social: ["linkedin", "twitter"],
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Image container */}
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  {/* Badge */}
                  <div className="absolute bottom-4 right-1/4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full">
                    {member.exp}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full mb-4">
                    <Star className="w-4 h-4" />
                    <span className="text-sm">{member.specialty}</span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    With extensive experience in the banking sector,{" "}
                    {member.name.split(" ")[0]} brings invaluable insights and
                    industry connections.
                  </p>

                  {/* Social */}
                  <div className="flex justify-center gap-3">
                    {member.social.map((platform, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      >
                        {platform === "linkedin"
                          ? "in"
                          : platform[0].toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful banking professionals who started
              their journey with Matrix Services
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <button className="bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-all border border-white/20">
                  <PhoneCall className="w-5 h-5 inline mr-2" />
                  Contact us
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default About;
