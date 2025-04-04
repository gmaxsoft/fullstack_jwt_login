const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer Token

  if (!token) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // Authenticate token
  try {
    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user.email;
    next();
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid or expired access token",
        },
      ],
    });
  }
};

module.exports = authToken;