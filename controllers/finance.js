const User = require("../models/User");

// Add a finance record
exports.addFinance = async (req, res) => {
  try {
    const { userId, type, amount, description } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newFinance = {
      type,
      amount,
      description,
      date: new Date(),
    };

    user.finance.push(newFinance);
    await user.save();

    res.status(201).json({ message: "Finance record added", finance: user.finance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all finance records for a user
exports.getFinance = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ finance: user.finance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a finance record
exports.updateFinance = async (req, res) => {
  try {
    const { userId, financeId } = req.params;
    const { type, amount, description, date } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const financeItem = user.finance.id(financeId);

    if (!financeItem) {
      return res.status(404).json({ message: "Finance record not found" });
    }

    financeItem.type = type || financeItem.type;
    financeItem.amount = amount !== undefined ? amount : financeItem.amount;
    financeItem.description = description || financeItem.description;
    financeItem.date = date || financeItem.date;

    await user.save();

    res.status(200).json({ message: "Finance record updated", finance: user.finance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a finance record
exports.deleteFinance = async (req, res) => {
  try {
    const { userId, financeId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const financeItem = user.finance.id(financeId);

    if (!financeItem) {
      return res.status(404).json({ message: "Finance record not found" });
    }

    financeItem.remove();
    await user.save();

    res.status(200).json({ message: "Finance record deleted", finance: user.finance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
