import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Loader,
} from "lucide-react";

function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    occupation: "",
    education: "",
    experience: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.age) newErrors.age = "Age is required";
    else if (form.age < 18 || form.age > 65)
      newErrors.age = "Age must be between 18-65";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!form.occupation && currentStep >= 2)
      newErrors.occupation = "Occupation is required";
    if (!form.education && currentStep >= 2)
      newErrors.education = "Education is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form Data:", form);
    setIsLoading(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setForm({
        name: "",
        email: "",
        age: "",
        gender: "",
        phone: "",
        occupation: "",
        education: "",
        experience: "",
        message: "",
      });
      setCurrentStep(1);
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center
              ${
                step <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400"
              }
              ${step === currentStep ? "ring-4 ring-blue-200" : ""}
              transition-all duration-300
            `}
            >
              {step < currentStep ? <CheckCircle size={20} /> : step}
            </div>
            <span className="text-sm mt-2 text-gray-600">Step {step}</span>
          </div>
          {step < totalSteps && (
            <div
              className={`
              w-24 h-1 mx-4
              ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}
              transition-all duration-300
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const InputField = ({ label, name, type = "text", icon: Icon, ...props }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
        <Icon size={16} className="mr-2" />
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className={`
            w-full px-4 py-3 pl-10 border rounded-xl outline-none
            transition-all duration-200
            ${
              errors[name]
                ? "border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            }
          `}
          {...props}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon
            size={18}
            className={errors[name] ? "text-red-400" : "text-gray-400"}
          />
        </div>
      </div>
      <AnimatePresence>
        {errors[name] && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center mt-1 text-red-600 text-sm"
          >
            <AlertCircle size={14} className="mr-1" />
            {errors[name]}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6 mt-10">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={40} className="text-green-600" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-6">
              Your application has been submitted successfully. We'll contact
              you within 24 hours.
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
            />
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 w-full max-w-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <User size={28} className="text-white" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Application Form
              </h1>
              <p className="text-gray-600 mt-2">
                Complete the form to apply for exclusive banking opportunities
              </p>
            </div>

            {/* Progress Steps */}
            <StepIndicator />

            {/* Form Content */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-1"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Personal Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      name="name"
                      icon={User}
                      placeholder="John Doe"
                      required
                    />

                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      icon={Mail}
                      placeholder="john@example.com"
                      required
                    />

                    <InputField
                      label="Age"
                      name="age"
                      type="number"
                      icon={Calendar}
                      placeholder="25"
                      min="18"
                      max="65"
                      required
                    />

                    <div className="mb-6">
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Calendar size={16} className="mr-2" />
                        Gender *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["Male", "Female", "Other"].map((option) => (
                          <motion.button
                            key={option}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setForm({
                                ...form,
                                gender: option.toLowerCase(),
                              });
                              if (errors.gender)
                                setErrors({ ...errors, gender: "" });
                            }}
                            className={`
                              py-3 rounded-xl border transition-all duration-200
                              ${
                                form.gender === option.toLowerCase()
                                  ? "border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-200"
                                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                              }
                            `}
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                      {errors.gender && (
                        <div className="flex items-center mt-1 text-red-600 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.gender}
                        </div>
                      )}
                    </div>
                  </div>

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    icon={Phone}
                    placeholder="9876543210"
                    required
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-1"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Professional Details
                  </h3>

                  <InputField
                    label="Current Occupation"
                    name="occupation"
                    icon={User}
                    placeholder="e.g., Student, Working Professional"
                    required
                  />

                  <InputField
                    label="Highest Education"
                    name="education"
                    icon={CheckCircle}
                    placeholder="e.g., B.Com, MBA, Graduation"
                    required
                  />

                  <div className="mb-6">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="mr-2" />
                      Work Experience (if any)
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {["Fresher", "0-2 yrs", "2-5 yrs", "5+ yrs"].map(
                        (exp) => (
                          <motion.button
                            key={exp}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setForm({ ...form, experience: exp })
                            }
                            className={`
                            py-3 rounded-xl border transition-all duration-200
                            ${
                              form.experience === exp
                                ? "border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-200"
                                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                            }
                          `}
                          >
                            {exp}
                          </motion.button>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-1"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Additional Information
                  </h3>

                  <div className="mb-6">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Mail size={16} className="mr-2" />
                      Why are you interested in banking?
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none transition-all duration-200"
                      placeholder="Tell us about your career aspirations..."
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      📋 What happens next?
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>✓ Profile verification within 24 hours</li>
                      <li>✓ Career counseling session</li>
                      <li>✓ Bank-specific interview calls</li>
                      <li>✓ Placement assistance</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ x: -5 }}
                  className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Back
                </motion.button>
              )}

              {currentStep < totalSteps ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold flex items-center"
                >
                  Continue
                  <ChevronRight size={20} className="ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.05 }}
                  className="ml-auto px-10 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center"
                >
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <CheckCircle size={20} className="ml-2" />
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* Form Progress */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Form Progress</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                />
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Form;
