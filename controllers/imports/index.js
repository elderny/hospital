const register = require("../Authentication/register");
const login = require("../Authentication/login");
const loginCheck = require("../Authentication/login-check");
const logout = require("../Authentication/logout");
const docInfo = require("../Doctor/doc-info");
const newPrescription = require("../Doctor/new-prescription");
module.exports = { register, login, docInfo, newPrescription, loginCheck,logout };
