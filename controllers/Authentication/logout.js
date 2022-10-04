const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  return res.json({ status: 1 });
};
module.exports = logout;
