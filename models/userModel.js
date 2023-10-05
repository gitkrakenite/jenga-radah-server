const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: String, required: true, default: "false" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
