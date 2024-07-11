const Collar = require("../models/Collar");

modula.exports.addCollar = async (req, res) => {
  const { data } = req.body;
  const newCollar = new Collar({ data });
  await newCollar.save();
  res.status(201).json({ message: "Collar added", collar: newCollar });
};

module.exports.getCollar = async (req, res) => {
  const { collarId } = req.params;
  const collar = await Collar.findById(collarId);

  if (!collarId) {
    return res.status(404).json({ message: "Collar not found" });
  }

  

  res.status(200).json({ collar });
};
