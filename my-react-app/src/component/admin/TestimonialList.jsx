import React, { useEffect, useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { adminApi } from "../../../utils/api";

function TestimonialList() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const res = await adminApi.getTestimonials();
      if (res.success) setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      const res = await adminApi.deleteTestimonial(id);
      if (res.success) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      } else {
        alert(res.message || "Failed to delete testimonial");
      }
    } catch (err) {
      alert("Server error.");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading testimonials...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <div key={t.id} className="bg-white p-4 rounded-xl shadow relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">{t.name}</h3>
            <div className="flex gap-2">
              <Edit2 className="cursor-pointer text-gray-600 hover:text-blue-600" />
              <Trash2
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDelete(t.id)}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{t.position}</p>
          <p className="text-gray-700 mb-2 italic">"{t.feedback}"</p>
          <p className="text-yellow-500 font-semibold">Rating: {t.rating}⭐</p>
        </div>
      ))}
    </div>
  );
}

export default TestimonialList;
