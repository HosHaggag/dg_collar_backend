const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CollarSchema = new Schema({
  data: Schema.Types.Mixed,
});

const Collar = mongoose.model("Collar", CollarSchema);

module.exports = Collar;
