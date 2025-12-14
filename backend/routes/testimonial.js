// routes/testimonials.js
const express = require("express");
const multer = require("multer");
const cloudinary = require("../cloudinary");
const db = require("../firebase");
const verifyAdmin = require("../middleware/auth");
const { v4: uuid } = require("uuid");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

// -------------------- GET all testimonials --------------------
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.ref("testimonials").once("value");
    const testimonials = snapshot.val() || {};
    res.json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------- POST add testimonial (Admin only) --------------------
router.post("/", verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, position, feedback, rating, imageUrl } = req.body;

    if (!name || !position || !feedback || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }

    let finalImageUrl = "";

    // ✅ CASE 1: Image File Upload
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "matrix-consultancy/testimonials",
            public_id: uuid(),
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      finalImageUrl = uploadResult.secure_url;
    }

    // ✅ CASE 2: Image URL provided
    else if (imageUrl) {
      finalImageUrl = imageUrl;
    }

    // ❌ No image provided
    else {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const id = uuid();

    const testimonial = {
      name,
      position,
      feedback,
      rating: Number(rating),
      image: finalImageUrl,
      createdAt: Date.now(),
      uploadedBy: req.admin.email,
    };

    await db.ref(`testimonials/${id}`).set(testimonial);

    res.json({ success: true, testimonial });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------- PATCH update testimonial --------------------
router.patch("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    delete updates.createdAt;
    delete updates.uploadedBy;

    await db.ref(`testimonials/${id}`).update(updates);

    res.json({ success: true, message: "Testimonial updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------- DELETE testimonial --------------------
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const snapshot = await db.ref(`testimonials/${id}`).once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await db.ref(`testimonials/${id}`).remove();

    res.json({ success: true, message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
