const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  url: { type: String },
  wisher: { type: String },
  cameTrue: { type: Boolean },
});

module.exports = mongoose.model("Item", ItemSchema);
