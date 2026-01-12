const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { createGig, getGigs } = require("../controllers/gigController");

// Public
router.get("/", getGigs);

// Protected
router.post("/", protect, createGig);

module.exports = router;
