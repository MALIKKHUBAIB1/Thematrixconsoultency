import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Briefcase,
  Award,
  FileText,
  Clock,
  TrendingUp,
  Shield,
  Globe,
  Target,
  Heart,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../../../utils/api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileError, setFileError] = useState("");
  const [editingService, setEditingService] = useState(null);

  // Initial form state with ALL fields
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    features: [""],
    banks: [""],
    serviceType: "Placement",
    eligibility: "",
    duration: "",
    // SEO fields
    metaTitle: "",
    metaDescription: "",
    // Bank details array
    bankDetails: [
      {
        name: "",
        seats: "",
        location: "",
        salary: "",
        deadline: "",
        requirements: [""],
        highlights: [""],
        type: "Full-time",
        experience: "Fresher",
        applicationFee: "",
        selectionProcess: [""],
        benefits: [""],
      },
    ],
  });

  const [icon, setIcon] = useState(null);

  /* ---------------- LOAD SERVICES ---------------- */
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/services");
      setServices(Object.entries(res.data.services || {}));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ---------------- FORM HELPERS ---------------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleArrayChange = (field, index, value) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm({ ...form, [field]: arr });
  };

  const handleBankDetailChange = (bankIndex, field, value) => {
    const bankDetails = [...form.bankDetails];
    bankDetails[bankIndex][field] = value;
    setForm({ ...form, bankDetails });
  };

  const handleBankArrayChange = (bankIndex, field, itemIndex, value) => {
    const bankDetails = [...form.bankDetails];
    const arr = [...bankDetails[bankIndex][field]];
    arr[itemIndex] = value;
    bankDetails[bankIndex][field] = arr;
    setForm({ ...form, bankDetails });
  };

  const addItem = (field) =>
    setForm({ ...form, [field]: [...form[field], ""] });

  const addBankArrayItem = (bankIndex, field) => {
    const bankDetails = [...form.bankDetails];
    bankDetails[bankIndex][field] = [...bankDetails[bankIndex][field], ""];
    setForm({ ...form, bankDetails });
  };

  const removeItem = (field, index) =>
    setForm({
      ...form,
      [field]: form[field].filter((_, i) => i !== index),
    });

  const removeBankArrayItem = (bankIndex, field, itemIndex) => {
    const bankDetails = [...form.bankDetails];
    bankDetails[bankIndex][field] = bankDetails[bankIndex][field].filter(
      (_, i) => i !== itemIndex
    );
    setForm({ ...form, bankDetails });
  };

  const addBankDetail = () => {
    setForm({
      ...form,
      bankDetails: [
        ...form.bankDetails,
        {
          name: "",
          seats: "",
          location: "",
          salary: "",
          deadline: "",
          requirements: [""],
          highlights: [""],
          type: "Full-time",
          experience: "Fresher",
          applicationFee: "",
          selectionProcess: [""],
          benefits: [""],
        },
      ],
    });
  };

  const removeBankDetail = (index) => {
    if (form.bankDetails.length > 1) {
      setForm({
        ...form,
        bankDetails: form.bankDetails.filter((_, i) => i !== index),
      });
    }
  };

  /* ---------------- IMAGE HANDLING ---------------- */
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError("Image size should be less than 5MB");
      setIcon(null);
      setImagePreview(null);
      e.target.value = "";
      return;
    }

    setFileError("");
    setIcon(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setIcon(null);
    setImagePreview(null);
    setFileError("");
  };

  /* ---------------- EDIT FUNCTIONALITY ---------------- */
  const editService = (id, service) => {
    setEditingService(id);
    setForm({
      title: service.title || "",
      subtitle: service.subtitle || "",
      description: service.description || "",
      features: service.features?.length > 0 ? service.features : [""],
      banks: service.banks?.length > 0 ? service.banks : [""],
      serviceType: service.serviceType || "Placement",
      eligibility: service.eligibility || "",
      duration: service.duration || "",
      metaTitle: service.metaTitle || "",
      metaDescription: service.metaDescription || "",
      bankDetails:
        service.bankDetails?.length > 0
          ? service.bankDetails
          : [
              {
                name: "",
                seats: "",
                location: "",
                salary: "",
                deadline: "",
                requirements: [""],
                highlights: [""],
                type: "Full-time",
                experience: "Fresher",
                applicationFee: "",
                selectionProcess: [""],
                benefits: [""],
              },
            ],
    });

    if (service.icon) {
      setImagePreview(service.icon);
    }

    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingService(null);
    resetForm();
    setShowForm(false);
  };

  /* ---------------- RESET FORM ---------------- */
  const resetForm = () => {
    setForm({
      title: "",
      subtitle: "",
      description: "",
      features: [""],
      banks: [""],
      serviceType: "Placement",
      eligibility: "",
      duration: "",
      metaTitle: "",
      metaDescription: "",
      bankDetails: [
        {
          name: "",
          seats: "",
          location: "",
          salary: "",
          deadline: "",
          requirements: [""],
          highlights: [""],
          type: "Full-time",
          experience: "Fresher",
          applicationFee: "",
          selectionProcess: [""],
          benefits: [""],
        },
      ],
    });
    clearImage();
  };

  /* ---------------- SUBMIT ---------------- */
  const submit = async (e) => {
    e.preventDefault();

    if (icon && icon.size > 5 * 1024 * 1024) {
      setFileError("Image size should be less than 5MB");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());

      if (form.subtitle.trim())
        formData.append("subtitle", form.subtitle.trim());
      if (form.serviceType) formData.append("serviceType", form.serviceType);
      if (form.eligibility)
        formData.append("eligibility", form.eligibility.trim());
      if (form.duration) formData.append("duration", form.duration.trim());
      if (form.metaTitle) formData.append("metaTitle", form.metaTitle.trim());
      if (form.metaDescription)
        formData.append("metaDescription", form.metaDescription.trim());

      const features = form.features.filter((f) => f.trim());
      const banks = form.banks.filter((b) => b.trim());

      if (features.length)
        formData.append("features", JSON.stringify(features));
      if (banks.length) formData.append("banks", JSON.stringify(banks));

      // Process bank details
      const processedBankDetails = form.bankDetails
        .map((bank) => ({
          ...bank,
          seats: parseInt(bank.seats) || 0,
          requirements: bank.requirements.filter((r) => r.trim()),
          highlights: bank.highlights.filter((h) => h.trim()),
          selectionProcess: bank.selectionProcess.filter((s) => s.trim()),
          benefits: bank.benefits.filter((b) => b.trim()),
        }))
        .filter((bank) => bank.name.trim()); // Only include banks with names

      if (processedBankDetails.length > 0) {
        formData.append("bankDetails", JSON.stringify(processedBankDetails));
      }

      if (icon) formData.append("icon", icon);

      let response;
      if (editingService) {
        // Update existing service
        response = await api.put(`/services/${editingService}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create new service
        response = await api.post("/services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      setEditingService(null);
      setShowForm(false);
      load();
    } catch (err) {
      alert(
        editingService ? "Failed to update service" : "Failed to add service"
      );
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this service?")) return;
    await api.delete(`/services/${id}`);
    load();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Services</h1>
          <p className="text-gray-600 mt-1">Manage your services</p>
        </div>
        <button
          onClick={() => {
            if (showForm) {
              cancelEdit();
            } else {
              setShowForm(true);
            }
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close" : "Add Service"}
        </button>
      </div>

      {/* ADD/EDIT SERVICE FORM */}
      {showForm && (
        <form
          onSubmit={submit}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {editingService ? "Edit Service" : "Add New Service"}
          </h2>

          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Service Title *
              </label>
              <input
                required
                name="title"
                placeholder="e.g., Private Bank Placements"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Subtitle
              </label>
              <input
                name="subtitle"
                placeholder="e.g., Direct opportunities in top private banks"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.subtitle}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Service Type & Duration */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Service Type
              </label>
              <select
                name="serviceType"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.serviceType}
                onChange={handleChange}
              >
                <option value="Placement">Placement</option>
                <option value="Counseling">Career Counseling</option>
                <option value="Training">Training Program</option>
                <option value="Resume">Resume Building</option>
                <option value="Interview">Interview Preparation</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                name="duration"
                placeholder="e.g., 3 months"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.duration}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Eligibility
              </label>
              <input
                name="eligibility"
                placeholder="e.g., Graduation, Age 21-28"
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.eligibility}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              required
              rows={4}
              name="description"
              placeholder="Detailed description of the service..."
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* SEO Fields */}
          <div className="border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
              <Globe size={18} />
              SEO Settings
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <input
                  name="metaTitle"
                  placeholder="SEO title for search engines"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={form.metaTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  name="metaDescription"
                  placeholder="SEO description for search engines"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={form.metaDescription}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* IMAGE UPLOAD WITH PREVIEW */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">
                Service Icon
              </label>
              <span className="text-xs text-gray-500">Max 5MB</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Upload Area */}
              <label
                className={`block border-2 ${
                  fileError ? "border-red-300" : "border-dashed border-gray-300"
                } rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors`}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  {imagePreview ? (
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          clearImage();
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload
                        className="mx-auto mb-3 text-gray-400"
                        size={24}
                      />
                      <span className="text-sm font-medium text-gray-600">
                        Click to upload icon
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </span>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageSelect}
                />
              </label>

              {/* Preview Sidebar */}
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
                  <ImageIcon size={16} />
                  Image Preview
                </h3>

                {imagePreview ? (
                  <div className="space-y-4">
                    <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-4">
                      <img
                        src={imagePreview}
                        alt="Selected"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium">
                        {icon?.name || "Service Icon"}
                      </p>
                      {icon && (
                        <p className="text-xs">
                          Size: {(icon?.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      )}
                      <p className="text-xs text-green-600">✓ Image selected</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-50 rounded-lg flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon size={48} className="mb-2" />
                    <p className="text-sm">No image selected</p>
                  </div>
                )}

                {fileError && (
                  <p className="text-red-600 text-sm mt-4 flex items-center gap-2">
                    <X size={14} />
                    {fileError}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <Award size={16} />
                Key Features
              </h3>
              <button
                type="button"
                onClick={() => addItem("features")}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g., Guaranteed Interview Calls"
                    value={f}
                    onChange={(e) =>
                      handleArrayChange("features", i, e.target.value)
                    }
                  />
                  {form.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem("features", i)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* BANKS (Simple List) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <Briefcase size={16} />
                Bank Names
              </h3>
              <button
                type="button"
                onClick={() => addItem("banks")}
                className="text-blue-600 hover:text-blue-800"
              >
                <Plus size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {form.banks.map((b, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g., HDFC Bank"
                    value={b}
                    onChange={(e) =>
                      handleArrayChange("banks", i, e.target.value)
                    }
                  />
                  {form.banks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem("banks", i)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DETAILED BANK INFORMATION */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                <Bank size={18} />
                Detailed Bank Information
              </h3>
              <button
                type="button"
                onClick={addBankDetail}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Bank
              </button>
            </div>

            {form.bankDetails.map((bank, bankIndex) => (
              <div
                key={bankIndex}
                className="border border-gray-200 rounded-xl p-6 space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-700">
                    Bank {bankIndex + 1}
                  </h4>
                  {form.bankDetails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBankDetail(bankIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {/* Bank Basic Info */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Name *
                    </label>
                    <input
                      required
                      value={bank.name}
                      onChange={(e) =>
                        handleBankDetailChange(
                          bankIndex,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="HDFC Bank"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Users size={14} />
                      Available Seats
                    </label>
                    <input
                      type="number"
                      value={bank.seats}
                      onChange={(e) =>
                        handleBankDetailChange(
                          bankIndex,
                          "seats",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <MapPin size={14} />
                      Location
                    </label>
                    <input
                      value={bank.location}
                      onChange={(e) =>
                        handleBankDetailChange(
                          bankIndex,
                          "location",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="PAN India"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <DollarSign size={14} />
                      Salary Package
                    </label>
                    <input
                      value={bank.salary}
                      onChange={(e) =>
                        handleBankDetailChange(
                          bankIndex,
                          "salary",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="₹2.4L – ₹3.8L"
                    />
                  </div>
                </div>

                {/* Bank Additional Info */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Calendar size={14} />
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      value={bank.deadline}
                      onChange={(e) =>
                        handleBankDetailChange(
                          bankIndex,
                          "deadline",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Job Type
                    </label>
                    <select
                      value={bank.type}
                      onChange={(e) =>
                        handleBankDetailChange(
                          bankIndex,
                          "type",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Experience Required
                    </label>
                    <select
                      value={bank.experience}
                      onChange={(e) =>
                        handleBankDetailChange(
                          bankIndex,
                          "experience",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    >
                      <option value="Fresher">Fresher</option>
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Application Fee
                    </label>
                    <input
                      value={bank.applicationFee}
                      onChange={(e) =>
                        handleBankDetailChange(
                          bankIndex,
                          "applicationFee",
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="₹500 or Free"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      <FileText size={14} />
                      Requirements
                    </h5>
                    <button
                      type="button"
                      onClick={() =>
                        addBankArrayItem(bankIndex, "requirements")
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {bank.requirements.map((req, reqIndex) => (
                    <div key={reqIndex} className="flex gap-3">
                      <input
                        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="e.g., Graduation degree"
                        value={req}
                        onChange={(e) =>
                          handleBankArrayChange(
                            bankIndex,
                            "requirements",
                            reqIndex,
                            e.target.value
                          )
                        }
                      />
                      {bank.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeBankArrayItem(
                              bankIndex,
                              "requirements",
                              reqIndex
                            )
                          }
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      <Zap size={14} />
                      Key Highlights
                    </h5>
                    <button
                      type="button"
                      onClick={() => addBankArrayItem(bankIndex, "highlights")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {bank.highlights.map((highlight, highlightIndex) => (
                    <div key={highlightIndex} className="flex gap-3">
                      <input
                        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="e.g., Fast-track Growth"
                        value={highlight}
                        onChange={(e) =>
                          handleBankArrayChange(
                            bankIndex,
                            "highlights",
                            highlightIndex,
                            e.target.value
                          )
                        }
                      />
                      {bank.highlights.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeBankArrayItem(
                              bankIndex,
                              "highlights",
                              highlightIndex
                            )
                          }
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Selection Process */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      <Target size={14} />
                      Selection Process
                    </h5>
                    <button
                      type="button"
                      onClick={() =>
                        addBankArrayItem(bankIndex, "selectionProcess")
                      }
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {bank.selectionProcess.map((process, processIndex) => (
                    <div key={processIndex} className="flex gap-3">
                      <input
                        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="e.g., Written Test → GD → Interview"
                        value={process}
                        onChange={(e) =>
                          handleBankArrayChange(
                            bankIndex,
                            "selectionProcess",
                            processIndex,
                            e.target.value
                          )
                        }
                      />
                      {bank.selectionProcess.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeBankArrayItem(
                              bankIndex,
                              "selectionProcess",
                              processIndex
                            )
                          }
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium text-gray-700 flex items-center gap-2">
                      <Heart size={14} />
                      Employee Benefits
                    </h5>
                    <button
                      type="button"
                      onClick={() => addBankArrayItem(bankIndex, "benefits")}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  {bank.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex gap-3">
                      <input
                        className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="e.g., Health Insurance"
                        value={benefit}
                        onChange={(e) =>
                          handleBankArrayChange(
                            bankIndex,
                            "benefits",
                            benefitIndex,
                            e.target.value
                          )
                        }
                      />
                      {bank.benefits.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeBankArrayItem(
                              bankIndex,
                              "benefits",
                              benefitIndex
                            )
                          }
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-lg flex-1 transition-colors"
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  {editingService ? "Updating..." : "Saving..."}
                </span>
              ) : editingService ? (
                "Update Service"
              ) : (
                "Save Service"
              )}
            </button>
          </div>
        </form>
      )}

      {/* SERVICES LIST - Updated with new fields */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
              <ImageIcon size={32} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No services yet
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Start by adding your first service. Services help showcase what
              you offer to customers.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Plus size={18} />
              Add Your First Service
            </button>
          </div>
        ) : (
          services.map(([id, s]) => (
            <motion.div
              key={id}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                {s.icon ? (
                  <img
                    src={s.icon}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${s.title}&background=3B82F6&color=fff&size=256`;
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm mb-4">
                        <ImageIcon size={28} className="text-white" />
                      </div>
                      <p className="text-white/90 text-sm font-medium">
                        No Image
                      </p>
                    </div>
                  </div>
                )}

                {/* Service Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {s.serviceType || "Service"}
                  </span>
                </div>

                {/* Duration Badge */}
                {s.duration && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow flex items-center gap-1">
                      <Clock size={10} />
                      {s.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title and Subtitle */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h3>
                  {s.subtitle && (
                    <p className="text-gray-600 text-sm">{s.subtitle}</p>
                  )}
                </div>

                {/* Description Preview */}
                {s.description && (
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {s.description}
                  </p>
                )}

                {/* Eligibility */}
                {s.eligibility && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Shield size={12} />
                      Eligibility
                    </h4>
                    <p className="text-gray-600 text-xs">{s.eligibility}</p>
                  </div>
                )}

                {/* Features Preview */}
                {s.features && s.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Award size={12} />
                      Key Features
                    </h4>
                    <div className="space-y-1">
                      {s.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          </div>
                          <span className="text-gray-600 text-xs">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {s.features.length > 3 && (
                        <p className="text-blue-600 text-xs font-medium mt-2">
                          +{s.features.length - 3} more features
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Banks Preview */}
                {s.banks && s.banks.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Briefcase size={12} />
                      Partner Banks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {s.banks.slice(0, 3).map((bank, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium"
                        >
                          {bank}
                        </span>
                      ))}
                      {s.banks.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                          +{s.banks.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Detailed Bank Count */}
                {s.bankDetails && s.bankDetails.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Bank size={10} />
                        {s.bankDetails.length} detailed positions
                      </span>
                      <span className="text-blue-600 font-medium">
                        {s.bankDetails.reduce(
                          (total, bank) => total + (parseInt(bank.seats) || 0),
                          0
                        )}{" "}
                        seats
                      </span>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <TrendingUp size={10} />
                      {s.features?.length || 0} features
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={10} />
                      {s.banks?.length || 0} banks
                    </span>
                  </div>
                  <span className="text-gray-400">ID: {id.slice(0, 6)}...</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <button
                  onClick={() => editService(id, s)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // Navigate to service detail page
                      window.open(`/services/${id}`, "_blank");
                    }}
                    className="text-gray-600 hover:text-gray-800 p-2 transition-colors rounded-lg hover:bg-gray-100"
                    title="View details"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => remove(id)}
                    className="text-red-600 hover:text-red-800 p-2 transition-colors rounded-lg hover:bg-red-50"
                    title="Delete service"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Add missing Bank icon component
function Bank(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6" y2="18"></line>
      <line x1="12" y1="6" x2="12" y2="18"></line>
      <line x1="18" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}

export default Services;
