const jwt = require("jsonwebtoken"),
  doctor = require("../../model/doctor"),
  hospital = require("../../model/hospital");

const loginCheck = async (req, res) => {
  if (!req?.cookies || !req.cookies?.[process.env.COOKIE_NAME])
    return res.json({ status: 0, message: "Login Again" });
  const user = jwt.verify(
    req.cookies[process.env.COOKIE_NAME],
    process.env.JWT_SECRET_KEY,
    (err, decoded) => (err ? null : decoded)
  );
  if (!user) return res.json({ status: 0, message: "Login Again" });

  const FindDoc = await doctor.findOne({ _id: user.id });
  const FindHos = await hospital.findOne({ _id: user.id });
  const valid = FindDoc ? 1 : FindHos ? 2 : 0;
  if (!valid) return res.json({ status: 0, message: "Not logged in" });
  res.json({
    status: 1,
    message: valid,
  });
};
module.exports = loginCheck;
