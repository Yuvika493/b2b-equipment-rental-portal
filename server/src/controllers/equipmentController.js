const Booking = require("../models/Booking");
const Equipment = require("../models/Equipment");

const ACTIVE_STATUSES = ["Pending", "Confirmed"];

const addEffectiveAvailability = async (equipment) => {
  const now = new Date();
  const activeBookings = await Booking.find({
    equipment: { $in: equipment.map((item) => item._id) },
    status: { $in: ACTIVE_STATUSES },
    startDate: { $lte: now },
    endDate: { $gte: now },
  }).select("equipment").lean();

  const rentedIds = new Set(activeBookings.map((booking) => String(booking.equipment)));
  return equipment.map((item) => ({
    ...item.toObject ? item.toObject() : item,
    availability: Boolean(item.availability) && !rentedIds.has(String(item._id)),
    currentRental: rentedIds.has(String(item._id)),
  }));
};

const getAllEquipment = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const equipment = await Equipment.find(filter).sort({ createdAt: -1 });
    res.status(200).json(await addEffectiveAvailability(equipment));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment", error: error.message });
  }
};

const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: "Equipment not found" });
    const [updated] = await addEffectiveAvailability([equipment]);
    res.status(200).json(updated);
  } catch (error) {
    if (error.kind === "ObjectId") return res.status(400).json({ message: "Invalid equipment ID" });
    res.status(500).json({ message: "Failed to fetch equipment", error: error.message });
  }
};

module.exports = { getAllEquipment, getEquipmentById };
