// src/components/admin/AddServiceModal.jsx
import { useState } from "react";
import { X, Upload, Plus, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../utils/api";

const AddServiceModal = ({ onClose, refresh }) => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    features: [""],
    banks: [""],
  });

  const [icon, setIcon] = useState(null);
  const [iconPreview, setIconPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Select image file");
    if (file.size > 5 * 1024 * 1024) return setError("File > 5MB");
    setIcon(file);
    setIconPreview(URL.createObjectURL(file));
    setError("");
  };

  const removeIcon = () => {
    setIcon(null);
    if (iconPreview) URL.revokeObjectURL(iconPreview);
    setIconPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      if (form.subtitle.trim())
        formData.append("subtitle", form.subtitle.trim());
      formData.append(
        "features",
        JSON.stringify(form.features.filter((f) => f.trim() !== ""))
      );
      formData.append(
        "banks",
        JSON.stringify(form.banks.filter((b) => b.trim() !== ""))
      );
      if (icon) formData.append("icon", icon);

      const res = await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setSuccess("Service added!");
        setForm({
          title: "",
          subtitle: "",
          description: "",
          features: [""],
          banks: [""],
        });
        removeIcon();
        setTimeout(() => {
          refresh();
          onClose();
        }, 1200);
      } else {
        setError(res.data.message || "Failed to add service");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (iconPreview) URL.revokeObjectURL(iconPreview);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Add New Service</h2>
            <button
              onClick={handleClose}
              disabled={loading}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto max-h-[calc(90vh-180px)]"
          >
            <div className="p-6 space-y-4">
              {success && (
                <div className="p-3 bg-green-50 text-green-700 rounded border border-green-200">
                  {success}
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200">
                  {error}
                </div>
              )}

              {/* Title */}
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="input"
                disabled={loading}
              />

              {/* Subtitle */}
              <input
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Subtitle"
                className="input"
                disabled={loading}
              />

              {/* Description */}
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="input resize-none"
                disabled={loading}
                rows={4}
              />

              {/* Icon */}
              <div className="flex items-center gap-4">
                {iconPreview ? (
                  <div className="relative">
                    <img
                      src={iconPreview}
                      alt="icon"
                      className="h-24 w-24 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeIcon}
                      className="absolute -top-2 -right-2 bg-red-500 p-1.5 rounded-full text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload size={24} />
                    <span className="text-sm text-gray-500 mt-1">
                      Upload Icon
                    </span>
                  </label>
                )}
              </div>

              {/* Features */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Key Features</span>
                  <button
                    type="button"
                    onClick={() => addArrayItem("features")}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                {form.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={f}
                      onChange={(e) =>
                        handleArrayChange("features", i, e.target.value)
                      }
                      placeholder="Feature"
                      className="input flex-1"
                      disabled={loading}
                    />
                    {form.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("features", i)}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Banks */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Partner Banks</span>
                  <button
                    type="button"
                    onClick={() => addArrayItem("banks")}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
                {form.banks.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={b}
                      onChange={(e) =>
                        handleArrayChange("banks", i, e.target.value)
                      }
                      placeholder="Bank"
                      className="input flex-1"
                      disabled={loading}
                    />
                    {form.banks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("banks", i)}
                        className="text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3 bg-gray-50">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Add Service"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddServiceModal;
