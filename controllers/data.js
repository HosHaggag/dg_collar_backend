const moment = require("moment-timezone");
const Data = require("../models/data");
const { isValidDate, sortDates } = require("../utils/date");

const { addDataSchema, getDataSchema } = require("../validators/data");

// Function to get data within a time range
const getDataInTimeRange = async (req, res) => {
  try {
    await getDataSchema.validate(req.body);
    let { startDate, endDate, limit, skip } = req.body;
    // Validate and parse limit and skip parameters
    limit = parseInt(limit);
    skip = parseInt(skip);

    // Calculate start and end times if not provided

    if (!startDate || !isValidDate(startDate, "YYYY-MM-DD")) {
      const now = moment().tz("Africa/Cairo").format();
      startDate = moment(now.slice(0, 10)).add(1, "day").format("YYYY-MM-DD");
    }
    if (!endDate || !isValidDate(endDate, "YYYY-MM-DD")) {
      const now = moment().tz("Africa/Cairo").format();
      const startDate = now.slice(0, 10);
      endDate = moment(startDate).subtract(1, "week").format("YYYY-MM-DD");
    }
    console.log({ startDate, endDate });

    let query = {
      createdAt: sortDates(startDate, endDate),
    };
    let findQuery = Data.find(query);
    if (!isNaN(limit)) {
      findQuery = findQuery.limit(limit);
    } else {
      findQuery = findQuery.limit(20);
    }
    if (!isNaN(skip)) {
      findQuery = findQuery.skip(skip);
    }

    const data = await findQuery.exec();

    res.json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to add new data
const addData = async (req, res) => {
  await addDataSchema.validate(req.body);
  const newData = new Data(req.body);
  await newData.save();
  res.json({ message: "Data added successfully", data: newData });
};

module.exports = {
  getDataInTimeRange,
  addData,
};
