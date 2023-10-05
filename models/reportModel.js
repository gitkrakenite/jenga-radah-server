const mongoose = require("mongoose");

const reportSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    location: { type: String, required: true },
    desc: { type: String, required: true },
    phone: { type: String, required: true },
    progress: { type: String, default: "received" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("report", reportSchema);
