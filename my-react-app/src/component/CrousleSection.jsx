import { ChevronRight } from "lucide-react";

function CrousleSection() {
  return (
    <div className="mt-10 flex flex-col md:flex-row justify-between gap-10">
      {/* LEFT SECTION */}
      <div className="md:w-1/2 space-y-4">
        <p className="text-sm text-gray-300 uppercase tracking-widest">
          The Matrix Consultancy
        </p>

        <h1 className="text-4xl font-bold leading-tight">
          Your Gateway to Banking Careers
        </h1>

        <p className="text-gray-300 text-lg">
          Unlock opportunities in top private sector banks including
          <span className="font-semibold">
            Axis, HDFC, ICICI, Kotak, Yes Bank
          </span>
          and more.
          <br />
          Get expert guidance, career support, and training for a successful
          future in banking.
        </p>

        {/* FEATURE LIST */}
        <div className="mt-10 space-y-4">
          {[
            "Banking Job Assistance",
            "Professional Career Guidance",
            "Skill Development Programs",
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <ChevronRight size={20} className="text-white" />
              <p className="font-semibold">{item}</p>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-2 bg-white text-[#000D51] font-semibold rounded">
            Apply Now
          </button>
          <button className="px-6 py-2 border border-white rounded">
            Learn More
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}

      <div className="md:w-1/2 w-full mt-6 md:mt-0 rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=80"
          alt="banking career"
          className="w-full h-auto md:h-[450px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default CrousleSection;
