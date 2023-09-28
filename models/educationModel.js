const mongoose = require("mongoose");

const educationSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Education", educationSchema);
