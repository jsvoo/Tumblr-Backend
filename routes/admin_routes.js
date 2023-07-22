const express = require("express");
const adminModel = require("../models/admin_model");
const router = express.Router();

//CREATE ADMIN
router.post("/create", async (req, res) => {
  const existingAdmin = await adminModel.findOne({ email: req.body.email });

  if (!existingAdmin) {
    const newAdmin = await adminModel.create(req.body);
    res
      .status(200)
      .json({ message: "admin created successfully", data: newAdmin });
  } else {
    res.send("admin with email already exists");
  }
});

router.get("/all", async (req, res) => {
  try {
    const allAdmins = await adminModel.find();
    res
      .status(200)
      .json({ message: "admins fetched successfully", data: allAdmins });
  } catch (error) {
    res.status(500).json({ message: "unknown server error" });
  }
});

router.get("/:adminId", async (req, res) => {
  const { adminId } = req.params;
  if (adminId) {
    try {
      const admin = await adminModel.findOne({ _id: adminId });
      if (admin) {
        res
          .status(200)
          .json({ message: "admin fetched successfully", data: admin });
      }
    } catch (error) {
      res.status(500).json({ message: "unknown server error" });
    }
  } else {
    res.status(403).json({ code: 403, message: "admin Id is required" });
  }
});

module.exports = router;
