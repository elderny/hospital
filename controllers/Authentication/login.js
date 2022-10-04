const bcrypt = require("bcryptjs"),
  doctor = require("../../model/doctor"),
  hospital = require("../../model/hospital"),
  jwt = require("jsonwebtoken");

const login = async (req, res) => {
  if (!req.body?.email || !req.body?.password)
    return res.json({
      status: 0,
      message: "Incorrect fields",
    });
  const { password, email } = req.body;

  // if already registered
  const FindDoc = await doctor.findOne({ email });
  const FindHos = await hospital.findOne({ email });
  const exists = FindDoc ? FindDoc : FindHos;
  const type = FindDoc ? 1 : 0;

  if (!exists || !(await bcrypt.compare(password, exists.password)))
    return res.json({ status: 0, message: "Email or password is incorrect" });

  const token = jwt.sign({ id: exists._id, type }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  const options = {
    expiresIn: new Date(
      Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 ** 2 * 1000
    ),
    httpOnly: true,
  };


  res.cookie(process.env.COOKIE_NAME, token, options);
  res.json({ status: 1, message: "User Logged In" });
};

module.exports = login;
