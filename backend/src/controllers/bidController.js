const mongoose = require("mongoose");
const Bid = require("../models/Bid");
const Gig = require("../models/Gig");

// ✅ POST /api/bids  (submit bid)
exports.createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.status !== "open") {
      return res.status(400).json({ message: "Gig is not open for bidding" });
    }

    // owner cannot bid on own gig
    if (gig.ownerId.toString() === req.user.id) {
      return res.status(403).json({ message: "You cannot bid on your own gig" });
    }

    // prevent duplicate bid
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user.id,
    });

    if (existingBid) {
      return res.status(409).json({ message: "You already bid on this gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price,
    });

    return res.status(201).json({
      message: "Bid submitted successfully ✅",
      bid,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ GET /api/bids/:gigId (only gig owner can view bids)
exports.getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    // only gig owner can view bids
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(bids);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ PATCH /api/bids/:bidId/hire
exports.hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Bid not found" });
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Gig not found" });
    }

    // only gig owner can hire
    if (gig.ownerId.toString() !== req.user.id) {
      await session.abortTransaction();
      return res.status(403).json({ message: "Not allowed" });
    }

    // already assigned?
    if (gig.status !== "open") {
      await session.abortTransaction();
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // 1) set gig assigned
    gig.status = "assigned";
    await gig.save({ session });

    // 2) mark selected bid hired
    bid.status = "hired";
    await bid.save({ session });

    // 3) reject other bids automatically
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { $set: { status: "rejected" } },
      { session }
    );

    await session.commitTransaction();

    return res.status(200).json({
      message: "Freelancer hired successfully ✅",
      hiredBid: bid,
    });
  } catch (err) {
    await session.abortTransaction();
    return res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    session.endSession();
  }
};
