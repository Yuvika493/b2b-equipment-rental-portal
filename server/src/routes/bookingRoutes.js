const express = require("express");
const requireAdmin = require("../middleware/authMiddleware");
const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", requireAdmin, getAllBookings);
router.patch("/:id/status", requireAdmin, updateBookingStatus);

module.exports = router;
