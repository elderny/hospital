const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    specialization: { type: String, required: true },
    email: { type: String, required: true, unqiue: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    temp: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("doctors", DoctorSchema);
