const User = require(`./../models/User`);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.secret_key;

module.exports = {
  login: async (req, res) => {
    let { email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(401).json({ error: "Invalid Email" });
    }
    const isPasswordValid = await bcrypt.compare(password, existedUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid  password" });
    }
    const token = jwt.sign({ id: existedUser._id, email }, SECRET_KEY);
    return res.json({ token, user: existedUser });
  },
  signUp: async (req, res) => {
    const { email, password, phoneNumber, address, full_name, postal_code } = req.body;
    const existedUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existedUser) {
      return res.status(401).json({ error: "User With Same Email or Phone Number Already Exists" });
    }
    const hPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      name: full_name,
      postal_code,
      email,
      password: hPassword,
      phoneNumber,
      address,
    });
    //
    const token = jwt.sign({ id: createdUser._id, email }, SECRET_KEY);
    res.status(201).json({ token, user: createdUser });
  },
  checkAuth: async (req, res) => {
    const { token } = req.body;
    if (!token) {
      return res.status(403).json({ error: "Access forbidden. Token missing." });
    }
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized. Invalid token." });
      } else {
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ error: "Unauthorized. Invalid token." });
        return res.status(200).json({ token, user });
      }
    });
  },
};
