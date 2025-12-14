const express = require("express");
const multer = require("multer");
const cloudinary = require("../cloudinary");
const db = require("../firebase");
const verifyAdmin = require("../middleware/auth");
const { v4: uuid } = require("uuid");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// GET all services (Public)
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.ref("services").once("value");
    res.json({
      success: true,
      services: snapshot.val() || {},
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single service by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.ref(`services/${id}`).once("value");
    const service = snapshot.val();

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      service: {
        ...service,
        id: id,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create service (Admin)
router.post("/", verifyAdmin, upload.single("icon"), async (req, res) => {
  try {
    const {
      title,
      subtitle,
      description,
      features,
      banks,
      serviceType,
      eligibility,
      duration,
      metaTitle,
      metaDescription,
      bankDetails,
    } = req.body;

   

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Title & description required" });
    }

    // 🔐 Safe JSON parsing for all fields that may contain JSON
    let parsedFeatures = [];
    let parsedBanks = [];
    let parsedBankDetails = [];

    try {
      parsedFeatures = features ? JSON.parse(features) : [];
      parsedBanks = banks ? JSON.parse(banks) : [];

      // Parse bankDetails if provided
      if (bankDetails) {
        parsedBankDetails = JSON.parse(bankDetails);

        // Ensure bankDetails is an array and process each bank
        if (Array.isArray(parsedBankDetails)) {
          parsedBankDetails = parsedBankDetails.map((bank) => ({
            name: bank.name || "",
            seats: parseInt(bank.seats) || 0,
            location: bank.location || "",
            salary: bank.salary || "",
            deadline: bank.deadline || "",
            requirements: Array.isArray(bank.requirements)
              ? bank.requirements.filter((r) => r.trim())
              : [],
            highlights: Array.isArray(bank.highlights)
              ? bank.highlights.filter((h) => h.trim())
              : [],
            type: bank.type || "Full-time",
            experience: bank.experience || "Fresher",
            applicationFee: bank.applicationFee || "",
            selectionProcess: Array.isArray(bank.selectionProcess)
              ? bank.selectionProcess.filter((s) => s.trim())
              : [],
            benefits: Array.isArray(bank.benefits)
              ? bank.benefits.filter((b) => b.trim())
              : [],
            createdAt: Date.now(),
          }));
        }
      }
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid JSON in data fields" });
    }

    const id = uuid();
    let iconUrl = "";

    // ☁️ Upload icon if exists
    if (req.file) {
      try {
        iconUrl = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "matrix-consultancy/services",
              public_id: id,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          stream.end(req.file.buffer);
        });
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
        });
      }
    }

    // 💾 Save service with all fields
    const serviceData = {
      title,
      subtitle: subtitle || "",
      description,
      features: parsedFeatures,
      banks: parsedBanks,
      iconUrl,
      createdAt: Date.now(),
      uploadedBy: req.admin.email,
      // New fields
      serviceType: serviceType || "Placement",
      eligibility: eligibility || "",
      duration: duration || "",
      metaTitle: metaTitle || "",
      metaDescription: metaDescription || "",
      bankDetails: parsedBankDetails,
      lastUpdated: Date.now(),
    };

    await db.ref(`services/${id}`).set(serviceData);

    res.json({
      success: true,
      message: "Service created successfully",
      id,
      iconUrl,
      service: serviceData,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update service (Admin) - Full update with image
router.put("/:id", verifyAdmin, upload.single("icon"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      subtitle,
      description,
      features,
      banks,
      serviceType,
      eligibility,
      duration,
      metaTitle,
      metaDescription,
      bankDetails,
    } = req.body;


    // Check if service exists
    const snapshot = await db.ref(`services/${id}`).once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Parse JSON data safely
    let parsedFeatures = [];
    let parsedBanks = [];
    let parsedBankDetails = [];
    let updateData = {};

    try {
      parsedFeatures = features ? JSON.parse(features) : [];
      parsedBanks = banks ? JSON.parse(banks) : [];

      if (bankDetails) {
        parsedBankDetails = JSON.parse(bankDetails);

        if (Array.isArray(parsedBankDetails)) {
          parsedBankDetails = parsedBankDetails.map((bank) => ({
            name: bank.name || "",
            seats: parseInt(bank.seats) || 0,
            location: bank.location || "",
            salary: bank.salary || "",
            deadline: bank.deadline || "",
            requirements: Array.isArray(bank.requirements)
              ? bank.requirements.filter((r) => r.trim())
              : [],
            highlights: Array.isArray(bank.highlights)
              ? bank.highlights.filter((h) => h.trim())
              : [],
            type: bank.type || "Full-time",
            experience: bank.experience || "Fresher",
            applicationFee: bank.applicationFee || "",
            selectionProcess: Array.isArray(bank.selectionProcess)
              ? bank.selectionProcess.filter((s) => s.trim())
              : [],
            benefits: Array.isArray(bank.benefits)
              ? bank.benefits.filter((b) => b.trim())
              : [],
            updatedAt: Date.now(),
          }));
        }
      }
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid JSON in data fields" });
    }

    // Handle icon upload if new icon provided
    let iconUrl = snapshot.val().iconUrl;
    if (req.file) {
      try {
        // Delete old image from Cloudinary if exists
        if (iconUrl) {
          const publicId = iconUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(
            `matrix-consultancy/services/${publicId}`
          );
        }

        // Upload new image
        iconUrl = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "matrix-consultancy/services",
              public_id: id,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          stream.end(req.file.buffer);
        });
      } catch (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image",
        });
      }
    }

    // Prepare update data
    updateData = {
      title: title || snapshot.val().title,
      subtitle: subtitle || snapshot.val().subtitle || "",
      description: description || snapshot.val().description,
      features:
        parsedFeatures.length > 0
          ? parsedFeatures
          : snapshot.val().features || [],
      banks: parsedBanks.length > 0 ? parsedBanks : snapshot.val().banks || [],
      serviceType: serviceType || snapshot.val().serviceType || "Placement",
      eligibility: eligibility || snapshot.val().eligibility || "",
      duration: duration || snapshot.val().duration || "",
      metaTitle: metaTitle || snapshot.val().metaTitle || "",
      metaDescription: metaDescription || snapshot.val().metaDescription || "",
      bankDetails:
        parsedBankDetails.length > 0
          ? parsedBankDetails
          : snapshot.val().bankDetails || [],
      iconUrl,
      lastUpdated: Date.now(),
      updatedBy: req.admin.email,
    };

    // Update service
    await db.ref(`services/${id}`).update(updateData);

    res.json({
      success: true,
      message: "Service updated successfully",
      id,
      iconUrl,
      service: updateData,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH update service (Admin) - Partial update without image
router.patch("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if service exists
    const snapshot = await db.ref(`services/${id}`).once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Parse JSON fields if present
    if (updateData.features) {
      try {
        updateData.features = JSON.parse(updateData.features);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in features",
        });
      }
    }

    if (updateData.banks) {
      try {
        updateData.banks = JSON.parse(updateData.banks);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in banks",
        });
      }
    }

    if (updateData.bankDetails) {
      try {
        updateData.bankDetails = JSON.parse(updateData.bankDetails);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid JSON in bankDetails",
        });
      }
    }

    updateData.lastUpdated = Date.now();
    updateData.updatedBy = req.admin.email;

    await db.ref(`services/${id}`).update(updateData);

    res.json({
      success: true,
      message: "Service updated",
      id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE service (Admin)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Get service to delete image from Cloudinary
    const snapshot = await db.ref(`services/${id}`).once("value");
    const service = snapshot.val();

    if (service && service.iconUrl) {
      try {
        const publicId = service.iconUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(
          `matrix-consultancy/services/${publicId}`
        );
      } catch (cloudinaryError) {
        // Continue with service deletion even if image deletion fails
      }
    }

    await db.ref(`services/${id}`).remove();
    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
