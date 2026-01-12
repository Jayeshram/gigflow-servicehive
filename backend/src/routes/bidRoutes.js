const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const bidController = require("../controllers/bidController");

router.post("/", protect, bidController.createBid);
router.get("/:gigId", protect, bidController.getBidsForGig);
router.patch("/:bidId/hire", protect, bidController.hireBid);

module.exports = router;
