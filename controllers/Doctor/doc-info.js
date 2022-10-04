const jwt = require("jsonwebtoken"),
  doctor = require("../../model/doctor");

const docInfo = async (req, res) => {
  if (!req?.cookies || !req.cookies?.[process.env.COOKIE_NAME])
    return res.json({ status: 0, message: "Login Again" });
  const user = jwt.verify(
    req.cookies[process.env.COOKIE_NAME],
    process.env.JWT_SECRET_KEY,
    (err, decoded) => (err ? null : decoded)
  );
  if (!user) return res.json({ status: 0, message: "Login Again" });

  const doc = await doctor.findOne({ _id: user.id });
  res.json({
    status: 1,
    message: {
      name: doc.username,
      specialization: doc.specialization,
      address: doc.address,
      mobile: doc.mobile,
      temp: doc.temp,
    },
  });
};
module.exports = docInfo;
