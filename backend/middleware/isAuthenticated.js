require("dotenv").config({});
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(201).json({
        message: "User not authenticated",
        success: false,
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(201).json({
          message: err.name === 'TokenExpiredError'
          ? 'Token has expired. Please login again.' : "Invalid token.",
          success: false
        })
      }
      req.id = decode.userId;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      message: "Internal server error during authentication.",
      success: false,
    });
  }
};

module.exports = isAuthenticated;
