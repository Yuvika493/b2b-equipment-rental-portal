const jwt = require("jsonwebtoken");

const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Administrator authentication required" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Administrator authentication is not configured on the server" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Administrator access required" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired administrator session" });
  }
};

module.exports = requireAdmin;
