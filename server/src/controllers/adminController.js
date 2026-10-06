const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");

const getDashboardStats = async (req, res) => {
  try {
    const [equipment, bookings] = await Promise.all([
      Equipment.find().lean(),
      Booking.find().populate("equipment", "name category dailyRate").sort({ createdAt: -1 }).lean(),
    ]);

    const now = new Date();
    const activeBookings = bookings.filter((booking) => {
      const starts = new Date(booking.startDate);
      const ends = new Date(booking.endDate);
      return ["Pending", "Confirmed"].includes(booking.status) && starts <= now && ends >= now;
    });

    const activeEquipmentIds = new Set(activeBookings.map((booking) => String(booking.equipment?._id || booking.equipment)));
    const availableEquipment = equipment.filter(
      (item) => item.availability && !activeEquipmentIds.has(String(item._id))
    ).length;

    const stats = {
      totalEquipment: equipment.length,
      availableEquipment,
      activeRentals: activeBookings.length,
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === "Pending").length,
      confirmedBookings: bookings.filter((b) => b.status === "Confirmed").length,
      completedBookings: bookings.filter((b) => b.status === "Completed").length,
      totalBookingValue: bookings.reduce((sum, b) => sum + Number(b.totalCost || 0), 0),
      recentBookings: bookings.slice(0, 5),
      equipmentStatus: equipment.map((item) => ({
        _id: item._id,
        name: item.name,
        category: item.category,
        dailyRate: item.dailyRate,
        availability: Boolean(item.availability) && !activeEquipmentIds.has(String(item._id)),
        activeRental: activeEquipmentIds.has(String(item._id)),
      })),
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard statistics", error: error.message });
  }
};

module.exports = { getDashboardStats };
