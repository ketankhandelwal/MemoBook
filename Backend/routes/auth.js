const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const router = express.Router();

const { body, validationResult } = require("express-validator");

// API to create user.

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Phle se hai yeh ID" });
    }

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
      name: req.body.name,
      password: secpass,
      email: req.body.email,
    });
    

    const data = {
      user: {
        id: user.id,
      },
    };
    
    const authToken = jwt.sign(data, "shhhh");
    console.log(success, authToken);
  }
);

//API to authenticate login user

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists(),
    
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }

      const ComparePassword = await bcrypt.compare(password, user.password);
      if (!ComparePassword) {
        success=false;
        return res.status(400).json({success, error: "Wrong Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, "shhhh");
      success = true
      console.log(success,authToken);
      res.send({success,authToken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error");
    }
  }
);

// API to get user details.

router.post(
  "/getUser",
  fetchUser,

  async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId ).select("-password");
      res.send(user);


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error");
    }
  }
);

module.exports = router;
