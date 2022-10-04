const joi = require("joi");
const DoctorSchema = joi.object({
  username: joi.string().required().min(1),
  email: joi.string().email().required().min(1),
  password: joi.string().required().min(1),
  address: joi.string().required().min(1),
  mobile: joi.string().required().min(1),
  specialization: joi.string().required().min(1),
  type: joi.number().min(0).max(1),
  temp: joi.number().min(1).max(3).required(),
});
const HospitalSchema = joi.object({
  username: joi.string().required().min(1),
  hospital_name: joi.string().required().min(1),
  email: joi.string().email().required().min(1),
  password: joi.string().required().min(1),
  address: joi.string().required().min(1),
  city: joi.string().required().min(1),
  state: joi.string().required().min(1),
  pinCode: joi.string().required().min(1),
  mobile: joi.string().required().min(1),
  type: joi.number().min(0).max(1),
});

const DoctorValidate = (data) => {
  const { error } = DoctorSchema.validate(data);
  if (error) return error.details[0].message.replaceAll('"', "");
};

const HospitalValidate = (data) => {
  const { error } = HospitalSchema.validate(data);
  if (error) return error.details[0].message.replaceAll('"', "");
};

module.exports = { DoctorValidate, HospitalValidate };
