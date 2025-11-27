import AllCourseCard from "./AllCourseCard";
import { ALL_COURSES } from "../../../utils/const";

function AllCourse() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {ALL_COURSES.map((course, index) => (
          <div key={index} className="w-full min-w-0">
            <AllCourseCard
              icon={course.icon}
              title={course.title}
              description={course.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCourse;
