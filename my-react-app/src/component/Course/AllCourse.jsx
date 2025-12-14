import { motion } from "framer-motion";
import AllCourseCard from "./AllCourseCard";
import { ALL_COURSES } from "../../../utils/const";

function AllCourse() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {ALL_COURSES.map((course, index) => (
        <AllCourseCard
          key={course.id}
          id={course.id}
          icon={course.icon}
          title={course.title}
          description={course.description}
        />
      ))}
    </motion.div>
  );
}

export default AllCourse;
