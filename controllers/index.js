const router = require("express").Router();

// Authentication
const {
  register,
  login,
  docInfo,
  newPrescription,
  loginCheck,
  logout,
} = require("./imports");
router.post("/register", register);
router.post("/login", login);
router.get("/login-check", loginCheck);
router.get("/sign-out", logout);

// Doctor
router.get("/get-doctor-info", docInfo);
router.post("/new-prescription", newPrescription);
module.exports = router;
