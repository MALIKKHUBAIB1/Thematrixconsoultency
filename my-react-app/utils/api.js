import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://thematrixconsoultency.vercel.app/api",
  timeout: 10000,
  withCredentials: false, // ✅ IMPORTANT (JWT localStorage me hai)
});
// Attach token for admin requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken"); // Admin token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] =
      config.headers["Content-Type"] || "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Application endpoints
export const applicationApi = {
  submitApplication: async (data) => {
    const response = await api.post("/applications", data);
    return response.data;
  },

  getAllApplications: async () => {
    const response = await api.get("/applications");
    return response.data;
  },
  deleteApplication: async (id) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  },
};

// Admin endpoints
export const adminApi = {
  // GET all testimonials
  getTestimonials: async () => {
    const response = await api.get("/testimonials");
    return {
      success: response.data.success,
      data: Object.entries(response.data.testimonials || {}).map(([id, t]) => ({
        id,
        ...t,
      })),
    };
  },

  // ADD testimonial
  addTestimonial: async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value)
        formData.append("image", value); // file object
      else formData.append(key, value);
    });

    const response = await api.post("/testimonials", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  // DELETE testimonial
  deleteTestimonial: async (id) => {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  },
};

export default api;
