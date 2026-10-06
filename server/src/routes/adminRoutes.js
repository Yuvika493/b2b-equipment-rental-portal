const express = require("express");
const { getDashboardStats } = require("../controllers/adminController");
const requireAdmin = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/dashboard", requireAdmin, getDashboardStats);

module.exports = router;
