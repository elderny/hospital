const jwt = require("jsonwebtoken"),
  doctor = require("../../model/doctor"),
  fs = require("fs");
const newPrescription = async (req, res) => {
  if (!req?.cookies || !req.cookies?.[process.env.COOKIE_NAME])
    return res.json({ status: 0, message: "Login Again" });
  const user = jwt.verify(
    req.cookies[process.env.COOKIE_NAME],
    process.env.JWT_SECRET_KEY,
    (err, decoded) => (err ? null : decoded)
  );
  if (!user) return res.json({ status: 0, message: "Login Again" });
  let r = () => (Math.random() + 1).toString(36).substring(6);
  let fname = r() + r() + r() + r() + ".pdf";
  const data = Buffer.from(req.body.data, "base64");
  fs.writeFileSync("uploads/" + fname, data);
  res.json({
    status: 1,
    message: { link: process.env.DEV_SERVER + "/prescription/" + fname },
  });
};
module.exports = newPrescription;
