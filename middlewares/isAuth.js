const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers.Authorization;
  if (!authHeader) return res.status(401).send("No Access Token - Not Authorized");
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      return res.status(401).send("Not Authorized - Expired Access Token");
    } else {
      const user = await User.findById(data.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;

      next();
    }
  });
};
