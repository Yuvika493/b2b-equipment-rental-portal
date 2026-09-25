const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");
const calculateCost = require("../utils/calculateCost");

const VALID_STATUSES = ["Pending", "Confirmed", "Completed"];

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const { customerName, contact, equipmentId, startDate, endDate } = req.body;

    if (!customerName || !contact || !equipmentId || !startDate || !endDate) {
      return res.status(400).json({
        message: "customerName, contact, equipmentId, startDate and endDate are all required",
      });
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (!equipment.availability) {
      return res.status(400).json({ message: "This equipment is currently unavailable" });
    }

    let totalDays, totalCost;
    try {
      // Backend recalculates independently — never trusts a client-sent total.
      ({ totalDays, totalCost } = calculateCost(startDate, endDate, equipment.dailyRate));
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    const booking = await Booking.create({
      customerName,
      contact,
      equipment: equipment._id,
      startDate,
      endDate,
      totalDays,
      totalCost,
      status: "Pending",
    });

    const populatedBooking = await booking.populate("equipment", "name category dailyRate");

    res.status(201).json(populatedBooking);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid equipment ID" });
    }
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

// GET /api/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("equipment", "name category dailyRate")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// PATCH /api/bookings/:id/status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("equipment", "name category dailyRate");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid booking ID" });
    }
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
};

module.exports = { createBooking, getAllBookings, updateBookingStatus };
