const Equipment = require("../models/Equipment");

// GET /api/equipment
// Supports optional query params: ?search=&category=
const getAllEquipment = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const equipment = await Equipment.find(filter).sort({ createdAt: -1 });
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch equipment", error: error.message });
  }
};

// GET /api/equipment/:id
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    res.status(200).json(equipment);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid equipment ID" });
    }
    res.status(500).json({ message: "Failed to fetch equipment", error: error.message });
  }
};

module.exports = { getAllEquipment, getEquipmentById };
