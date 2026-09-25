const express = require("express");
const {
  createBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;
