const mongoose = require('mongoose');

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
  timestamp: { type: Date, default: Date.now },
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
