import AllCourse from "./AllCourse";

function CourseContainer() {
  return (
    <div className="w-full md:w-[80%] max-w-6xl mx-auto mt-40 md:mt-2.5 p-4 text-black">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10">
        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">
          Our Available Services
        </h2>

        {/* DESCRIPTION */}
        <p className="text-black max-w-full md:max-w-2xl text-sm md:text-base leading-relaxed">
          Explore our curated services designed to guide you toward a stable and
          rewarding career in the private banking sector. From interview
          preparation to job placement support, we offer complete assistance at
          every step.
        </p>
      </div>

      {/* COURSES LIST */}
      <div className="mt-10">
        <AllCourse />
      </div>
    </div>
  );
}

export default CourseContainer;
