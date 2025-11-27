function TestimonialCard({ data }) {
  return (
    <div className="w-full bg-[#e8f3ff] py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={data.image}
            alt={data.name}
            className="w-[350px] md:w-[450px] h-[350px] md:h-[450px] object-cover object-center shadow-xl rounded-lg"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full md:w-1/2 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0c2d59] mb-4">
            Testimonials
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">{data.feedback}</p>

          <div className="mb-6">
            <p className="font-semibold text-lg text-gray-900">{data.name}</p>
            <p className="text-sm text-gray-500">{data.position}</p>
          </div>

          {/* QUOTE ICON */}
          <div className="absolute bottom-0 right-0 text-[#001b66] text-6xl font-bold">
            “”
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
