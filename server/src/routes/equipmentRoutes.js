const express = require("express");
const { getAllEquipment, getEquipmentById } = require("../controllers/equipmentController");

const router = express.Router();

router.get("/", getAllEquipment);
router.get("/:id", getEquipmentById);

module.exports = router;
