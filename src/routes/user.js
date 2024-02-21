const express = require("express");
const router = express.Router();

const User = require("../model/usersSchema");

router.post("/register", async (req, res) => {
    try {
      const newUser = new User({
        ...req.body,
      });
    await newUser.save();
    res.send('New User Created');
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
