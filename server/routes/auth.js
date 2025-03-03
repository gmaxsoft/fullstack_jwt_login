const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { users } = require("../database");

require("dotenv").config();

// http://localhost:5000/auth/signup
router.post(
  "/signup",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password must be at least 4 chars long").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    
    let user = users.find((user) => {
      return user.email === email;
    });

    if (user) {
      // 200 Ok: 
      return res.status(200).json({
        errors: [
          {
            email: user.email,
            msg: "The user already exists",
          },
        ],
      });
    }
   
    const salt = await bcrypt.genSalt(10);
    console.log("salt:", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password:", hashedPassword);

    // "Save" to database
    users.push({
      email,
      password: hashedPassword,
    });

    const accessToken = await JWT.sign(
      { data: email, exp: Math.floor(Date.now() / 1000) + (60 * 60) },
      process.env.ACCESS_TOKEN_SECRET
    );

    const refreshToken = await JWT.sign(
      { data: email, exp: Math.floor(Date.now() / 1000) + (60 * 60) },
      process.env.REFRESH_TOKEN_SECRET
    );
    
    res.json({
      accessToken,
      refreshToken,
    });
  }
);

// Get users
router.get("/users", (req, res) => {
  res.json(users);
});

// Log in
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = users.find((user) => {
    return user.email === email;
  });


  if (!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
    });
  }
  let isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      errors: [
        {
          msg: "Email or password is invalid",
        },
      ],
    });
  }

  // Send JWT
  const accessToken = await JWT.sign(
    { data: email, exp: Math.floor(Date.now() / 1000) + (60 * 60) },
    process.env.ACCESS_TOKEN_SECRET
  );

  // Refresh
  const refreshToken = await JWT.sign(
    { data: email, exp: Math.floor(Date.now() / 1000) + (60 * 60) },
    process.env.REFRESH_TOKEN_SECRET
  );

  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
  });
});

let refreshTokens = [];


router.post("/token", async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid refresh token",
        },
      ],
    });
  }

  try {
    const user = await JWT.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, function(err, decoded) {
      if (err) {
        console.log(err);
      }
    });

    const { email } = user;
    const accessToken = await JWT.sign(
      { data: email, exp: Math.floor(Date.now() / 1000) + (60 * 60) },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    /*
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
    */
  }
});

router.delete("/logout", (req, res) => {
  const authHeader = req.headers["authorization"];
  const refreshToken = authHeader.split(" ")[1]
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
  
});

module.exports = router;