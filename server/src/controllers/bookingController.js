const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");
const calculateCost = require("../utils/calculateCost");

const VALID_STATUSES = ["Pending", "Confirmed", "Completed"];
const ACTIVE_STATUSES = ["Pending", "Confirmed"];

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
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });
    if (!equipment.availability) {
      return res.status(400).json({ message: "This equipment is currently unavailable" });
    }

    let totalDays, totalCost;
    try {
      ({ totalDays, totalCost } = calculateCost(startDate, endDate, equipment.dailyRate));
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }

    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(endDate);
    if (Number.isNaN(requestedStart.getTime()) || Number.isNaN(requestedEnd.getTime())) {
      return res.status(400).json({ message: "Invalid rental dates" });
    }

    const overlap = await Booking.findOne({
      equipment: equipment._id,
      status: { $in: ACTIVE_STATUSES },
      startDate: { $lte: requestedEnd },
      endDate: { $gte: requestedStart },
    });

    if (overlap) {
      return res.status(409).json({
        message: "This equipment is already reserved for part or all of the selected dates. Please choose different dates.",
      });
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
    if (error.kind === "ObjectId") return res.status(400).json({ message: "Invalid equipment ID" });
    res.status(500).json({ message: "Failed to create booking", error: error.message });
  }
};

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

const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${VALID_STATUSES.join(", ")}` });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("equipment", "name category dailyRate");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    if (error.kind === "ObjectId") return res.status(400).json({ message: "Invalid booking ID" });
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
};

module.exports = { createBooking, getAllBookings, updateBookingStatus };
