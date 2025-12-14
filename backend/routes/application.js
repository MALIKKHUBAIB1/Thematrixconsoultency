const express = require("express");
const { body, validationResult } = require("express-validator");
const { getDatabase } = require("firebase-admin/database");

const router = express.Router();
const db = getDatabase();
const applicationsRef = db.ref("applications");


router.post(
  "/",
  [
    body("personalDetails.name").notEmpty().withMessage("Name is required"),

    body("personalDetails.email")
      .isEmail()
      .withMessage("Valid email is required"),

    body("personalDetails.age")
      .isInt({ min: 18, max: 65 })
      .withMessage("Age must be between 18 and 65"),

    body("personalDetails.gender")
      .isIn(["male", "female", "other"])
      .withMessage("Gender is invalid"),

    body("personalDetails.phone")
      .isString()
      .matches(/^\d{10}$/)
      .withMessage("Phone must be 10 digits"),

    body("professionalDetails.isGraduated")
      .isIn(["yes", "no"])
      .withMessage("Graduation status required"),

    body("professionalDetails.graduationType")
      .if(body("professionalDetails.isGraduated").equals("yes"))
      .notEmpty()
      .withMessage("Graduation type required"),

    body("professionalDetails.experience")
      .notEmpty()
      .withMessage("Experience is required"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((e) => ({
          field: e.param,
          message: e.msg,
        })),
      });
    }

    try {
      const id = Date.now().toString();

      const data = {
        id,
        ...req.body,
        createdAt: new Date().toISOString(),
      };

      await applicationsRef.child(id).set(data);

      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        data,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to submit application",
      });
    }
  }
);

/* =========================
   GET – ALL APPLICATIONS
========================= */
router.get("/", async (req, res) => {
  try {
    const snapshot = await applicationsRef.once("value");
    const data = snapshot.val();

    const applications = data ? Object.values(data) : [];

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
});

/* =========================
   DELETE – APPLICATION
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await applicationsRef.child(req.params.id).remove();

    res.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });
  }
});

module.exports = router;
