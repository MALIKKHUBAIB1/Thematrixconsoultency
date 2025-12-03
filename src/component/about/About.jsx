import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

function About() {
  return (
    <>
      {/* TOP ABOUT SECTION */}
      <section className="bg-white text-[#000D51] py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-14">
          {/* LEFT IMAGE */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80"
              alt="about matrix services"
              className="rounded-xl shadow-xl object-cover w-full h-[350px] md:h-[450px]"
            />
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            className="w-full md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase text-gray-500 tracking-widest">
              About Matrix Services
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Trusted Partner in Banking Career Development
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
              With years of experience in the private banking placement
              industry, Matrix Services has helped hundreds of candidates build
              successful careers. We provide training, guidance, and guaranteed
              placement support to help you grow professionally.
            </p>

            {/* FEATURES */}
            <div className="space-y-4 mt-6">
              {[
                "Expert Guidance from Banking Professionals",
                "Partnerships with Top Private Banks",
                "Hundreds of Successful Job Placements",
                "Personalized Support Throughout the Journey",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <ChevronRight size={24} className="text-[#000D51]" />
                  <p className="font-medium">{feature}</p>
                </motion.div>
              ))}
            </div>

            {/* BUTTONS */}
            <motion.div
              className="flex gap-4 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button className="px-6 py-3 bg-[#000D51] text-white font-semibold rounded-md shadow hover:bg-[#001573] transition">
                Learn More
              </button>
              <button className="px-6 py-3 border border-[#000D51] text-[#000D51] rounded-md shadow hover:bg-[#000D51] hover:text-white transition">
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="bg-[#F5F7FF] text-[#505155] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              At Matrix Services, our mission is to empower India’s youth with
              the right knowledge, skills, and confidence to secure high-growth
              careers in the private banking sector. Our vision is to become
              India's most trusted platform for guaranteed placements.
            </p>
          </motion.div>

          {/* Three Boxes */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Journey",
                desc: "Matrix Services started to bridge the gap between job seekers and the banking industry. Today, we proudly guide hundreds toward successful careers.",
              },
              {
                title: "Our Commitment",
                desc: "Every student is different — we provide one-on-one mentorship, resume building, grooming, and interview preparation.",
              },
              {
                title: "Our Expertise",
                desc: "With partnerships in leading banks and expert trainers, we ensure you receive real industry exposure and training.",
              },
            ].map((box, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-bold mb-3">{box.title}</h3>
                <p className="text-gray-600 leading-relaxed">{box.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-[#000D51]"
          >
            Our Achievements
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Students Trained" },
              { number: "300+", label: "Successful Placements" },
              { number: "25+", label: "Banking Partners" },
              { number: "5+ Years", label: "Industry Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <h3 className="text-5xl font-extrabold text-[#000D51]">
                  {stat.number}
                </h3>
                <p className="text-gray-600 mt-3 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="bg-[#d2d6ea]  text-[#000D51] py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6"
          >
            Meet The Matrix Services Team
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto  text-[#000D51] text-lg leading-relaxed mb-12"
          >
            A dedicated team committed to shaping the future of students through
            banking career mentorship, professional training, and placement
            excellence.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Rahul Verma",
                role: "Career Mentor & Trainer",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Priya Sharma",
                role: "Placement Coordinator",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Ankit Gupta",
                role: "Banking Expert",
                img: "https://randomuser.me/api/portraits/men/45.jpg",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white text-[#000D51] rounded-xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-md"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
