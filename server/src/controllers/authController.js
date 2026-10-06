const jwt = require("jsonwebtoken");

const adminLogin = (req, res) => {
  const { email, password } = req.body || {};

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(500).json({
      message: "Administrator authentication is not configured on the server",
    });
  }

  if (email?.trim().toLowerCase() !== process.env.ADMIN_EMAIL.trim().toLowerCase() || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid administrator email or password" });
  }

  const token = jwt.sign(
    { role: "admin", email: process.env.ADMIN_EMAIL },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    admin: { email: process.env.ADMIN_EMAIL },
    expiresIn: "8h",
  });
};

module.exports = { adminLogin };
