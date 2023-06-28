const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: false,
  },
  count: {
    type: Number,
    require: true,
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
