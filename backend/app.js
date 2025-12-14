const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("./routes/upload");
const testimonialRoutes = require("./routes/testimonial");
const applicationRoutes = require("./routes/application");

const app = express();

/* ✅ VERY IMPORTANT CORS FIX */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://thematrixconsoultency.vercel.app",
      "https://thematrixconsoultency-p0s32qy2l-khubaibtechs-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ✅ Handle preflight manually */
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Matrix Consultancy Backend Running");
});

app.use("/api/services", uploadRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/testimonials", testimonialRoutes);

module.exports = app;
