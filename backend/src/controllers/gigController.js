const Gig = require("../models/Gig");

// ✅ CREATE GIG (Protected)
exports.createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id,
    });

    return res.status(201).json({
      message: "Gig created successfully ✅",
      gig,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ GET ALL OPEN GIGS (+ search)
exports.getGigs = async (req, res) => {
  try {
    const search = req.query.search || "";

    const gigs = await Gig.find({
      status: "open",
      title: { $regex: search, $options: "i" },
    }).sort({ createdAt: -1 });

    return res.status(200).json(gigs);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
