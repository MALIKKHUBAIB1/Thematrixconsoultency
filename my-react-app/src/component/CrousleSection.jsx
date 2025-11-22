import { ChevronRight } from "lucide-react";

function CrousleSection() {
  return (
    <div className="mt-10 h-auto  flex flex-col md:flex-row justify-between gap-10">
      {/* LEFT SECTION */}
      <div className="md:w-1/2 space-y-4">
        <p className="text-sm text-gray-300 uppercase tracking-widest">
          The Matrix Consultancy
        </p>

        <h1 className="text-4xl font-bold leading-tight">
          Ultimate Solutions for
        </h1>
        <h1 className="text-4xl font-bold leading-tight">Modern Businesses</h1>

        <p className="text-gray-300">
          Suscipit feugiat purus ac nunc amet. Id pulvinar arcu nibh orci non
          rhoncus lobortis id neque.
        </p>

        {/* FEATURE LIST */}
        <div className="mt-10 space-y-4">
          {["Strategic Excellence", "Business Consulting", "Innovation"].map(
            (item, index) => (
              <div key={index} className="flex items-center gap-3">
                <ChevronRight size={20} className="text-white" />
                <p className="font-semibold">{item}</p>
              </div>
            )
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 bg-white text-[#000D51] font-semibold rounded">
            Get Started
          </button>
          <button className="px-6 py-2 border border-white rounded">
            Learn More
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="md:w-1/2 rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"
          alt="business team"
          className="w-full h-[350px] md:h-[450px] object-cover"
        />
      </div>
    </div>
  );
}

export default CrousleSection;
