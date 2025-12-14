import React, { useState } from "react";
import { Plus } from "lucide-react";
import TestimonialForm from "./TestimonialForm";
import TestimonialList from "./TestimonialList";

function AdminTestimonials() {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#001a4d]">Testimonials</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* FORM (ONLY WHEN CLICKED) */}
      {showForm && (
        <TestimonialForm
          onAdded={() => {
            setShowForm(false);
            setRefresh(!refresh);
          }}
        />
      )}

      {/* LIST */}
      <TestimonialList refresh={refresh} />
    </div>
  );
}

export default AdminTestimonials;
