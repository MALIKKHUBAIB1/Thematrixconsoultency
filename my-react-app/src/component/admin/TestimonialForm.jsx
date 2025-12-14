import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image, Link2 } from "lucide-react";
import { adminApi } from "../../../utils/api";

function TestimonialForm({ onAdded }) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    feedback: "",
    image: null, 
    imageUrl: "", 
    rating: 5,
  });

  const [imageType, setImageType] = useState("file"); // file | url
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.length > 0) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.position || !form.feedback) {
      alert("Please fill all required fields.");
      return;
    }

    if (imageType === "file" && !form.image) {
      alert("Please select an image file.");
      return;
    }

    if (imageType === "url" && !form.imageUrl) {
      alert("Please provide image URL.");
      return;
    }

    setLoading(true);

    try {
      const payload =
        imageType === "file"
          ? form
          : {
              name: form.name,
              position: form.position,
              feedback: form.feedback,
              rating: form.rating,
              imageUrl: form.imageUrl,
            };

      const res = await adminApi.addTestimonial(payload);

      if (res.success) {
        alert("Testimonial added successfully!");
        setForm({
          name: "",
          position: "",
          feedback: "",
          image: null,
          imageUrl: "",
          rating: 5,
        });
        if (onAdded) onAdded();
      } else {
        alert(res.message || "Failed to add testimonial");
      }
    } catch (err) {
      alert("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mb-8"
    >
      <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-3 p-3 border rounded-xl"
        required
      />

      {/* Position */}
      <input
        type="text"
        name="position"
        placeholder="Position / Company"
        value={form.position}
        onChange={handleChange}
        className="w-full mb-3 p-3 border rounded-xl"
        required
      />

      {/* Image Type Switch */}
      <div className="flex gap-3 mb-3">
        <button
          type="button"
          onClick={() => setImageType("file")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
            imageType === "file" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          <Image size={18} /> Upload Image
        </button>

        <button
          type="button"
          onClick={() => setImageType("url")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
            imageType === "url" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          <Link2 size={18} /> Image URL
        </button>
      </div>

      {/* Image Input */}
      {imageType === "file" ? (
        <>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full mb-3 p-3 border rounded-xl"
          />

          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-xl mb-3"
            />
          )}
        </>
      ) : (
        <input
          type="text"
          name="imageUrl"
          placeholder="Paste image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-xl"
        />
      )}

      {/* Feedback */}
      <textarea
        name="feedback"
        placeholder="Feedback"
        value={form.feedback}
        onChange={handleChange}
        className="w-full mb-3 p-3 border rounded-xl"
        required
      />

      {/* Rating */}
      <select
        name="rating"
        value={form.rating}
        onChange={handleChange}
        className="w-full mb-4 p-3 border rounded-xl"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} Star{n > 1 && "s"}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        {loading ? "Adding..." : "Add Testimonial"}
      </button>
    </motion.form>
  );
}

export default TestimonialForm;
