const bcrypt = require("bcryptjs"),
  doctor = require("../../model/doctor"),
  hospital = require("../../model/hospital"),
  { DoctorValidate, HospitalValidate } = require("../../validation/User");

const register = async (req, res) => {
  const { type, email } = req.body;
  // Validate form
  const invalid = type ? DoctorValidate(req.body) : HospitalValidate(req.body);
  if (invalid) return res.json({ status: 0, message: invalid });

  // if already registered
  const exists = type
    ? await doctor.findOne({ email })
    : await hospital.findOne({ email });

  if (exists) return res.json({ status: 0, message: "Already registered" });

  const password = await bcrypt.hash(req.body.password, 10);

  delete req.body.type;
  type
    ? await doctor.create({ ...req.body, password })
    : await hospital.create({ ...req.body, password });

  res.json({ status: 1, message: "Registered successfully" });
};

module.exports = register;
