import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { applicationApi } from "../../utils/api";
import { useNavigate } from "react-router-dom"; // Redirect ke liye react-router ka use

const InputField = React.memo(
  ({
    label,
    name,
    type = "text",
    icon: Icon,
    value,
    onChange,
    error,
    ...props
  }) => {
    return (
      <motion.div initial={false} className="mb-6">
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          <Icon size={16} className="mr-2" />
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <div className="relative">
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 pl-10 border rounded-xl outline-none
              ${
                error
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            {...props}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon size={18} className="text-gray-400" />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={14} /> {error}
          </p>
        )}
      </motion.div>
    );
  }
);

InputField.displayName = "InputField";

/* ---------------- MAIN FORM ---------------- */
function Form() {
  const navigate = useNavigate(); // redirect ke liye

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    isGraduate: "",
    graduationType: "",
    experience: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ------------ HANDLERS ------------ */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  }, []);

  const validateForm = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Enter a valid email";

    if (!form.age) err.age = "Age is required";
    else if (Number(form.age) <= 0) err.age = "Enter a valid age";

    if (!form.gender) err.gender = "Gender is required";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      err.phone = "Enter a valid 10-digit phone number";

    if (!form.isGraduate) err.isGraduate = "Select graduation status";
    if (form.isGraduate === "yes" && !form.graduationType.trim())
      err.graduationType = "Select graduation type";

    if (!form.experience) err.experience = "Select work experience";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      personalDetails: {
        name: form.name,
        email: form.email,
        age: Number(form.age),
        gender: form.gender,
        phone: form.phone,
      },
      professionalDetails: {
        isGraduated: form.isGraduate,
        graduationType: form.isGraduate === "yes" ? form.graduationType : "",
        experience: form.experience,
        message: form.message || "",
      },
    };

    try {
      const res = await applicationApi.submitApplication(payload);

      if (res.success) {
        // Redirect to previous page or home
        navigate(-1); // -1 means previous page in history
      } else {
        alert(res.message || "Submission failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------ UI ------------ */
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6 mt-24">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl"
      >
        <InputField
          label="Full Name"
          name="name"
          icon={User}
          value={form.name}
          error={errors.name}
          onChange={handleChange}
          required
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          value={form.email}
          error={errors.email}
          onChange={handleChange}
          required
        />

        <InputField
          label="Age"
          name="age"
          type="number"
          icon={Calendar}
          value={form.age}
          error={errors.age}
          onChange={handleChange}
          required
        />

        <InputField
          label="Phone"
          name="phone"
          type="tel"
          icon={Phone}
          value={form.phone}
          error={errors.phone}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Gender *</p>
          <div className="grid grid-cols-3 gap-3">
            {["male", "female", "other"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setForm((p) => ({ ...p, gender: g }))}
                className={`py-3 rounded-xl border ${
                  form.gender === g
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        {/* Graduation */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Graduation Completed? *</p>
          <div className="grid grid-cols-2 gap-4">
            {["yes", "no"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() =>
                  setForm((p) => ({ ...p, isGraduate: v, graduationType: "" }))
                }
                className={`py-3 rounded-xl border ${
                  form.isGraduate === v
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                {v.toUpperCase()}
              </button>
            ))}
          </div>
          {errors.isGraduate && (
            <p className="text-red-500 text-sm mt-1">{errors.isGraduate}</p>
          )}
        </div>

        {form.isGraduate === "yes" && (
          <InputField
            label="Graduation Type"
            name="graduationType"
            icon={CheckCircle}
            placeholder="B.Com, B.Sc, B.Tech, BA etc."
            value={form.graduationType}
            error={errors.graduationType}
            onChange={handleChange}
            required
          />
        )}

        {/* Experience */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Work Experience *</p>
          <div className="grid grid-cols-4 gap-3">
            {["Fresher", "0-1 yr", "1-3 yrs", "3+ yrs"].map((exp) => (
              <button
                key={exp}
                type="button"
                onClick={() => setForm((p) => ({ ...p, experience: exp }))}
                className={`py-3 rounded-xl border ${
                  form.experience === exp
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </motion.form>
    </div>
  );
}

export default Form;
