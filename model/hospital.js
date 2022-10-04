const mongoose = require("mongoose");
const HospitalSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hospital_name: { type: String, required: true },
    email: { type: String, required: true, unqiue: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("hospitals", HospitalSchema);
