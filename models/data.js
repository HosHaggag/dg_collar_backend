const mongoose = require("mongoose");
const moment = require("moment-timezone");

const Schema = mongoose.Schema;

const DataSchema = new Schema({
  ambientTemperature: { type: Schema.Types.Mixed, required: true },
  forwardAcceleration: { type: Schema.Types.Mixed, required: true },
  heartRate: { type: Schema.Types.Mixed, required: true },
  horizontalAcceleration: { type: Schema.Types.Mixed, required: true },
  objectTemperature: { type: Schema.Types.Mixed, required: true },
  rotationX: { type: Schema.Types.Mixed, required: true },
  rotationY: { type: Schema.Types.Mixed, required: true },
  rotationZ: { type: Schema.Types.Mixed, required: true },
  verticalAcceleration: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Schema.Types.Date, default: moment().tz("Africa/Cairo").toDate() }, 
});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;
