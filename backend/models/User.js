const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date },
    contactNo: { type: String, required: true }, // <-- required
    status: { type: String, enum: ["single", "married", "divorced", "other"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
