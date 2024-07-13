const Collar = require("../models/Collar");
const axios = require("axios");
const collarReadings = require("./../constants/collarReadings");

module.exports.addCollar = async (req, res) => {
  //   const { data } = req.body;
  const newCollar = new Collar();
  await newCollar.save();
  res.status(201).json({ message: "Collar added", collar: newCollar });
};

module.exports.getCollar = async (req, res) => {
  const { collarId } = req.params;
  const collar = await Collar.findById(collarId);

  if (!collar) {
    return res.status(404).json({ message: "Collar not found" });
  }
  const response = await axios.post(process.env.AI_URL, collarReadings);
  // console.log({ response });
  //   ________________
  if (!collarId) {
    return res.status(404).json({ message: "Collar not found" });
  }

  res.status(200).json({ data: response.data });
};
