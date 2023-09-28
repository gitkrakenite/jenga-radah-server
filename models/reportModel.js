const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    location: { type: String, required: true },
    handle: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("report", reportSchema);
