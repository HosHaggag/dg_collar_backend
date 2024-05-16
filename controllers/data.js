const moment = require("moment-timezone");
const Data = require("../models/data");

const { addDataSchema, getDataSchema } = require("../validators/data");

// Function to get data within a time range
const getDataInTimeRange = async (req, res) => {
  try {
    await getDataSchema.validate(req.body);
    let { startTime, endTime, limit, skip } = req.body;
    // Validate and parse limit and skip parameters
    limit = parseInt(limit);
    skip = parseInt(skip);

    // Calculate start and end times if not provided
    if (!startTime) {
      startTime = moment().tz("Africa/Cairo").subtract(1, "week").toDate();
    }
    if (!endTime) {
      endTime = moment().tz("Africa/Cairo").toDate(); // Current time
    }

    console.log({ startTime, endTime });

    let query = {
      createdAt: { $gte: startTime, $lte: endTime },
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

function isValidDate(dateString, format) {
  return moment(dateString, format, true).isValid();
}
