const JWT = require("jsonwebtoken");
exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = JWT.verify(token, "secret");
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Unauthorised",
      error: error,
    });
  }
};
